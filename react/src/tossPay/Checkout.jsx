import { useEffect, useRef, useState } from "react";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { generateUUID } from "three/src/math/MathUtils";
const customerKey = generateUUID();
const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);

export function CheckoutPage({
  totalPrice,
  orderName,
  ckInput,
  insertPgOrder,
}) {
  console.log(totalPrice);
  const paymentWidgetRef = useRef(null);
  const paymentMethodsWidgetRef = useRef(null);
  const agreementWidgetRef = useRef(null);
  const [price, setPrice] = useState(totalPrice);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(
        "test_gck_KNbdOvk5rkywLqnoyJl23n07xlzm",
        customerKey
      ); // 비회원 customerKey

      if (paymentWidgetRef.current == null) {
        paymentWidgetRef.current = paymentWidget;
      }

      /**
       * 결제창을 렌더링합니다.
       * @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods%EC%84%A0%ED%83%9D%EC%9E%90-%EA%B2%B0%EC%A0%9C-%EA%B8%88%EC%95%A1
       */
      const paymentMethodsWidget =
        paymentWidgetRef.current.renderPaymentMethods(
          "#payment-method",
          { value: totalPrice },
          { variantKey: "default-1" }
        );

      /**
       * 약관을 렌더링합니다.
       * @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement%EC%84%A0%ED%83%9D%EC%9E%90-%EC%98%B5%EC%85%98
       */
      agreementWidgetRef.current = paymentWidgetRef.current.renderAgreement(
        "#agreement",
        { variantKey: "default-1" }
      );

      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  async function confirmPayment(paymentKey, orderId, amount) {
    // TODO: API를 호출해서 서버에게 paymentKey, orderId, amount를 넘겨주세요.
    // 서버에선 해당 데이터를 가지고 승인 API를 호출하면 결제가 완료됩니다.
    // https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8
    const response = await fetch(
      process.env.REACT_APP_DB_HOST + "/api/tosspay/confirm",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount,
        }),
      }
    );

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="wrapper w-100">
      <div className="max-w-540 w-100">
        <div id="payment-method" className="w-100" />
        <div id="agreement" className="w-100" />
        <div className="btn-wrapper w-100">
          <button
            className="btn primary w-100"
            onClick={async () => {
              const input = ckInput();

              if (input === false) {
                alert("주문자 및 배송지 정보를 정확히 입력해주세요.");
                return false;
              }

              const paymentWidget = paymentWidgetRef.current;

              try {
                /**
                 * 결제 요청
                 * @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment%EA%B2%B0%EC%A0%9C-%EC%A0%95%EB%B3%B4
                 */

                await paymentWidget
                  ?.requestPayment({
                    orderId: generateRandomString(),
                    orderName: orderName,
                    customerName: "",
                    customerEmail: "",
                    // successUrl:
                    //   window.location.origin +
                    //   "/tosspay/success" +
                    //   window.location.search,
                    // failUrl:
                    //   window.location.origin +
                    //   "/tosspay/fail" +
                    //   window.location.search,
                  })
                  .then(async (res) => {
                    const confirm = await confirmPayment(
                      res.paymentKey,
                      res.orderId,
                      res.amount
                    );

                    if (confirm) {
                      insertPgOrder(
                        res.orderId,
                        res.paymentKey,
                        res.paymentType,
                        res.amount
                      );

                      window.location.href = "/orderlist";
                    } else {
                      alert("결제를 실패하였습니다.");
                    }
                  });
              } catch (error) {
                // TODO: 에러 처리
                console.log(error);

                if (error.message != "사용자가 결제를 취소하였습니다") {
                  alert(error.message);
                }
                // alert("결제를 실패하였습니다.2");
              }
            }}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
