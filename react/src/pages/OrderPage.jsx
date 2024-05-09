import React, { useEffect, useRef, useState } from "react";
import * as S from "../styles/new_styles";
import expand_arrow from "../assets/icons/expand-arrow.png";
import collapse_arrow from "../assets/icons/collapse-arrow.png";
import { useSpring } from "react-spring";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import DaumPostcodeEmbed from "react-daum-postcode";
import { CheckoutPage } from "../tossPay/Checkout";

const OrderPage = ({ openPopup }) => {
  const { data } = useQuery("userinfo", { enabled: false });
  const [radioValue, SetRadioValue] = useState();
  const [ViewStep, SetViewStep] = useState(0);
  const { item_sids } = useParams();
  const [orderItem, setOrderItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliPrice, setDeliPrice] = useState(3000);

  // 배송 정보 - 주문자
  const [userNm, setUserNm] = useState();
  const [userTel, setUserTel] = useState();
  const [userEmail, setUserEmail] = useState();

  // 배송 정보 - 배송지 정보
  const [orderReceiver, setOrderReceiver] = useState();
  const [orderTel, setOrderTel] = useState();
  const [orderPostcode, setOrderPostcode] = useState();
  const [orderAddress, setOrderAddress] = useState();
  const [orderAddAddress, setOrderAddAddress] = useState();
  const [orderReq, setOrderReq] = useState("");

  const [addressVisible, setAddressVisible] = useState(false);

  const [orderData, setOrderData] = useState();

  const ckRef = useRef(null);

  useEffect(() => {
    initdb();
    console.log("orderITEM", orderItem);
  }, [data]);

  const initdb = async () => {
    const params = [];
    item_sids.split(",").forEach((el) => {
      params.push(el);
    });
    setOrderItem(
      (
        await axios.post(process.env.REACT_APP_DB_HOST + "/api/order", {
          item_sid: params,
        })
      ).data
    );

    setUserNm(data?.USER_NM);
    setUserTel(data?.USER_TEL0);
    setUserEmail(data?.USER_ID);
  };

  const handleSameBtn = () => {
    setOrderReceiver(data?.DELI_REC);
    setOrderTel(data?.DELI_TEL0);
    setOrderPostcode(data?.DELI_POSTCODE);
    setOrderAddress(data?.DELI_ADDRESS);
    setOrderAddAddress(data?.DELI_ADD_ADDRESS);
  };

  const handleSetDeli = (REC, TEL, POSTCODE, ADDRESS, ADDADDRESS) => {
    setOrderReceiver(REC);
    setOrderTel(TEL);
    setOrderPostcode(POSTCODE);
    setOrderAddress(ADDRESS);
    setOrderAddAddress(ADDADDRESS);
  };

  useEffect(() => {
    setTotalPrice(orderItem.reduce((sum, item) => sum + item.ITEM_AMOUNT, 0));
  }, [orderItem]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleRadioValue = (e) => {
    console.log(e.target.id);
    SetRadioValue(e.target.id);
  };
  const SlideDown = useSpring({
    height: radioValue === "pm1" ? 42 + "px" : 0 + "px",
  });

  const StepSlideDown1 = useSpring({
    height: ViewStep === 0 ? 600 + "px" : 0 + "px",
  });
  const StepSlideDown2 = useSpring({
    height: ViewStep === 1 ? 250 + "px" : 0 + "px",
  });
  const StepSlideDown3 = useSpring({
    height: ViewStep === 2 ? 200 + "px" : 0 + "px",
  });

  const ckInput = async () => {
    if (
      !userEmail ||
      !orderReceiver ||
      !orderTel ||
      !orderPostcode ||
      !orderAddress ||
      !orderAddAddress ||
      !radioValue
    ) {
      return false;
    } else {
      return true;
    }
  };

  const insertPgOrder = async (
    pgOrderId,
    pgPaymentKey,
    pgPaymentType,
    pgPaymentAmount
  ) => {
    try {
      let optionNm = "";
      let coreNm = orderItem[0].PROD_NM;
      // console.log(orderItem[0].PROD_NM);
      orderItem[0].ITEM_OPTION.map((option, index) => {
        if (index < orderItem[0].ITEM_OPTION.length - 1) {
          optionNm += option.OPTION_NM + " / ";
        } else {
          optionNm += option.OPTION_NM;
        }
      });
      const res = await axios.put(
        process.env.REACT_APP_DB_HOST + "/api/order",
        {
          userId: data?.USER_ID,
          userTel: userTel,
          userEmail: userEmail,
          item_sids: item_sids,
          orderAmount: parseInt(totalPrice + deliPrice),
          orderReceiver: orderReceiver,
          orderTel: orderTel,
          orderPostcode: orderPostcode,
          orderAddress: orderAddress,
          orderAddAddress: orderAddAddress,
          orderReq: orderReq,
          radioValue: radioValue,
          order_core_prod: coreNm,
          order_core_option: optionNm,
          orderNm: userNm,
          pgOrderId: pgOrderId,
          pgPaymentKey: pgPaymentKey,
          pgPaymentType: pgPaymentType,
          pgPaymentAmount: pgPaymentAmount,
          orderStatus: 2,
          ORDER_CORE_PROD_SID: orderItem[0].PROD_SID,
          ORDER_CORE_PROD_CATECODE: orderItem[0].PROD_CATECODE,
        }
      );
      return true;
    } catch (e) {
      return false;
    }
  };

  const getorderNm = () => {
    const back = orderItem?.length > 1 ? ` 외 ${orderItem?.length - 1}개` : ``;
    return `${orderItem[0]?.PROD_NM}${back}`;
  };

  const handleOrderBtn = async () => {
    if (
      !userEmail ||
      !orderReceiver ||
      !orderTel ||
      !orderPostcode ||
      !orderAddress ||
      !orderAddAddress ||
      !radioValue
    ) {
      alert("주문자 혹은 배송지 정보를 정확히 입력해주세요.");
      return false;
    }

    let optionNm = "";
    let coreNm = orderItem[0].PROD_NM;
    // console.log(orderItem[0].PROD_NM);
    orderItem[0].ITEM_OPTION.map((option, index) => {
      if (index < orderItem[0].ITEM_OPTION.length - 1) {
        optionNm += option.OPTION_NM + " / ";
      } else {
        optionNm += option.OPTION_NM;
      }
    });

    const res = await axios.put(process.env.REACT_APP_DB_HOST + "/api/order", {
      userId: data?.USER_ID,
      userTel: userTel,
      userEmail: userEmail,
      item_sids: item_sids,
      orderAmount: parseInt(totalPrice + deliPrice),
      orderReceiver: orderReceiver,
      orderTel: orderTel,
      orderPostcode: orderPostcode,
      orderAddress: orderAddress,
      orderAddAddress: orderAddAddress,
      orderReq: orderReq,
      radioValue: radioValue,
      order_core_prod: coreNm,
      order_core_option: optionNm,
      orderNm: userNm,
      orderStatus: 1,
      ORDER_CORE_PROD_SID: orderItem[0].PROD_SID,
      ORDER_CORE_PROD_CATECODE: orderItem[0].PROD_CATECODE,
    });

    if (res.status === 200) {
      alert(
        `${getorderNm()}
          ${parseInt(totalPrice + deliPrice).toLocaleString("ko-kr")}원
          홍길동 123-567-8910 우리 은행`
      );
      window.location.href = "/orderlist";
    }
  };

  return (
    <S.MainLayout>
      <S.MainSection>
        <S.OrderTopWrapper>
          <S.CartTopTitleBox>
            <h1>주문 결제</h1>
            <p>주문할 상품을 확인하고 결제가 가능해요.</p>
          </S.CartTopTitleBox>
          <S.CartTopAddtionBox>
            <p>주문 상품 {orderItem?.length}개</p>
          </S.CartTopAddtionBox>
        </S.OrderTopWrapper>
        <S.OrderWrapper>
          <S.OrderMidWrapper>
            <S.OrderMidProdBox>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>상품 정보</th>
                    <th>수량</th>
                    <th>상품 금액</th>
                    <th>할인 금액</th>
                    <th>결제 예정액</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItem.map((el, index) => (
                    <tr>
                      <td>
                        <Link to={`/products/detail/${el.PROD_SID}`}>
                          <S.CartMidThumbnail img={el.IMAGE_LOCATION} />
                        </Link>
                      </td>
                      <td>
                        <S.CartMidProdInfoBox>
                          <h1>{el.PROD_NM}</h1>
                          <p>
                            {/* {el.ITEM_OPTION
                              ? el.ITEM_OPTION.map((option, index) =>
                                  index === el.ITEM_OPTION.length - 1
                                    ? `${option.OPTION_CATE}-${option.OPTION_NM}`
                                    : `${option.OPTION_CATE}-${option.OPTION_NM} / `
                                )
                              : "기본 옵션"} */}
                            {el.ITEM_OPTION}
                          </p>
                          <p>{formatDate(el.CART_REGDATE)}</p>
                        </S.CartMidProdInfoBox>
                      </td>
                      <td>{el.ITEM_QUANTITY.toLocaleString("ko-KR")}</td>
                      <td>{el.ITEM_AMOUNT.toLocaleString("ko-KR")}</td>
                      <td>0</td>
                      <td>{el.ITEM_AMOUNT.toLocaleString("ko-KR")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </S.OrderMidProdBox>
          </S.OrderMidWrapper>
          <S.OrderBotWrapper>
            <S.OBLeftBox>
              <S.OBTitleBox
                onClick={() => {
                  SetViewStep(0);
                }}
              >
                <span>배송 정보</span>
                <S.Arrow img={ViewStep === 0 ? collapse_arrow : expand_arrow} />
              </S.OBTitleBox>
              <S.StepMenu style={StepSlideDown1}>
                <S.OBDeliveryBox>
                  <h1>주문자</h1>
                  <table>
                    <tr>
                      <th>이름</th>
                      <td>
                        <input type="text" width="1000px" value={userNm} />
                      </td>
                    </tr>
                    <tr>
                      <th>연락처</th>
                      <td>
                        <input className="text" value={userTel}></input>
                      </td>
                    </tr>
                    <tr>
                      <th>이메일</th>
                      <td>
                        <input type="text" value={userEmail} />
                      </td>
                    </tr>
                  </table>
                  <S.OBTextAndBtnBox>
                    <h1>배송지 정보</h1>
                    <div>
                      <S.Btn onClick={handleSameBtn} margin={"0 0 0 0.5em"}>
                        기본 배송지
                      </S.Btn>
                      <S.Btn
                        onClick={() =>
                          openPopup("deliveryForm", {
                            handleSetDeli: handleSetDeli,
                          })
                        }
                        margin={"0 0 0 0.5em"}
                      >
                        나의 배송지
                      </S.Btn>
                      <S.Btn
                        onClick={() =>
                          openPopup("deliveryForm_Recent", {
                            handleSetDeli: handleSetDeli,
                          })
                        }
                        margin={"0 0 0 0.5em"}
                      >
                        최근 배송지
                      </S.Btn>
                    </div>
                  </S.OBTextAndBtnBox>

                  <table>
                    <tr>
                      <th>받으시는 분</th>
                      <td>
                        <input
                          type="text"
                          value={orderReceiver}
                          onChange={(e) => setOrderReceiver(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>연락처</th>
                      <td>
                        <input
                          className="text"
                          value={orderTel}
                          onChange={(e) => setOrderTel(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>주소</th>
                      <td>
                        <input type="text" value={orderPostcode} />
                        <S.Btn
                          onClick={() => {
                            setAddressVisible(true);
                          }}
                          margin="0 0 0 0.5rem"
                        >
                          주소찾기
                        </S.Btn>

                        {addressVisible && (
                          <div
                            className="postWrapper"
                            style={{
                              position: "absolute",
                              width: "550px",
                              left: "440px",
                              border: "1px solid #ccc",
                            }}
                          >
                            <DaumPostcodeEmbed
                              onComplete={(data) => {
                                setOrderAddress(data.address);
                                setOrderPostcode(data.zonecode);
                                setOrderAddAddress("");
                                setAddressVisible(false);
                              }}
                            />
                          </div>
                        )}

                        <br />
                        <input
                          type="text"
                          className="deli"
                          value={orderAddress}
                        />
                        <input
                          type="text"
                          className="deli"
                          placeholder="상세 주소를 입력해주세요."
                          value={orderAddAddress}
                          onChange={(e) => setOrderAddAddress(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>배송 요청 사항</th>
                      <td>
                        <input
                          type="text"
                          className="message"
                          placeholder="배송 요청 사항을 입력해주세요."
                          value={orderReq}
                          onChange={(e) => setOrderReq(e.target.value)}
                        />
                      </td>
                    </tr>
                  </table>
                </S.OBDeliveryBox>
              </S.StepMenu>
              <S.OBTitleBox
                onClick={() => {
                  SetViewStep(1);
                }}
              >
                <span>할인 / 배송비</span>
                <S.Arrow img={ViewStep === 1 ? collapse_arrow : expand_arrow} />
              </S.OBTitleBox>
              <S.StepMenu style={StepSlideDown2}>
                <S.OBDeliPriceBox>
                  <table>
                    <tr>
                      <th>할인 금액</th>
                      <td>
                        <input type="text" id="" readOnly />원
                      </td>
                    </tr>
                    <tr>
                      <th>포인트</th>
                      <td>
                        <input type="text" id="" readOnly />원
                      </td>
                    </tr>
                    <tr>
                      <th>배송비</th>
                      <td>
                        <input
                          type="text"
                          id=""
                          value={deliPrice.toLocaleString("ko-kr")}
                          readOnly
                        />
                        원
                      </td>
                    </tr>
                  </table>
                </S.OBDeliPriceBox>
                <S.OBPaymentBox>
                  <S.OBPaymentSpan>
                    기본 배송비는 {deliPrice.toLocaleString("ko-kr")}원 입니다.
                  </S.OBPaymentSpan>
                </S.OBPaymentBox>
              </S.StepMenu>
              <S.OBTitleBox
                onClick={() => {
                  SetViewStep(2);
                }}
              >
                <span>결제 방법</span>
                <S.Arrow img={ViewStep === 2 ? collapse_arrow : expand_arrow} />
              </S.OBTitleBox>
              <S.StepMenu style={StepSlideDown3}>
                <S.OBRadioGroup>
                  <S.OBRadioBox>
                    <input
                      type="radio"
                      name="payment"
                      id="pm1"
                      onChange={handleRadioValue}
                    />
                    <label htmlFor="pm1">일반 결제</label>
                  </S.OBRadioBox>
                  <S.OBRadioBox>
                    <input
                      type="radio"
                      name="payment"
                      id="pm2"
                      onChange={handleRadioValue}
                    />
                    <label htmlFor="pm2">무통장 입금</label>
                  </S.OBRadioBox>
                  {/* <S.OBRadioBox>
                    <input
                      type="radio"
                      name="payment"
                      id="pm3"
                      onChange={handleRadioValue}
                      disabled
                    />
                    <label htmlFor="pm3">포인트 결제</label>
                  </S.OBRadioBox> */}
                </S.OBRadioGroup>
                <S.OBPaymentBox>
                  <S.OBPaymentSpan>결제 방법을 선택해주세요.</S.OBPaymentSpan>
                </S.OBPaymentBox>
              </S.StepMenu>
            </S.OBLeftBox>
            <S.OBRightBox>
              <S.OBTitleBox>
                <h1>최종 결제 금액</h1>
              </S.OBTitleBox>
              <S.OBFinalPaymentBox>
                <S.OBFinalRowBox>
                  <div className="left">합계</div>
                  <div className="right">
                    {(totalPrice + deliPrice).toLocaleString("ko-kr")}
                  </div>
                </S.OBFinalRowBox>
                <S.OBFinalRowBox>
                  <div className="left">상품 금액</div>
                  <div className="right">
                    {totalPrice.toLocaleString("ko-kr")}
                  </div>
                </S.OBFinalRowBox>
                <S.OBFinalRowBox>
                  <div className="left">할인 금액</div>
                  <div className="right">0</div>
                </S.OBFinalRowBox>
                <S.OBFinalRowBox>
                  <div className="left">포인트</div>
                  <div className="right">0</div>
                </S.OBFinalRowBox>
                <S.OBFinalRowBox>
                  <div className="left">배송비</div>
                  <div className="right">
                    {deliPrice.toLocaleString("ko-kr")}
                  </div>
                </S.OBFinalRowBox>
                <S.OBFinalPymentBoxAddWrapper>
                  <S.OBFinalPymentBoxAdd>
                    <p>
                      ∙ 주문할 상품의 편집정보, 상품정보, 상품가격, 배송정보를
                      확인 하였습니다.
                    </p>
                    <p>
                      ∙ 주문취소 및 수정은 결제 후 1시간 이내에만 가능합니다.
                    </p>
                    {/* <p>
                      <input type="checkbox" name="ck1" id="ck1" ref={ckRef} />
                      <label htmlFor="ck1">개인정보 수집 동의 (필수)</label>
                      <span>약관보기</span>
                    </p> */}
                    {/* <S.Btn onClick={handleOrderBtn}>결제하기</S.Btn>
                    <S.Btn onClick={() => {}}>결제하기(PG테스트)</S.Btn> */}
                  </S.OBFinalPymentBoxAdd>
                </S.OBFinalPymentBoxAddWrapper>
                {radioValue === "pm1" ? (
                  <CheckoutPage
                    totalPrice={parseInt(totalPrice + deliPrice)}
                    orderName={getorderNm()}
                    ckInput={ckInput}
                    insertPgOrder={insertPgOrder}
                  />
                ) : radioValue === "pm2" ? (
                  <S.OBFinalPymentBoxAddWrapper>
                    <S.OBFinalPymentBoxAdd>
                      <S.Btn onClick={handleOrderBtn}>무통장 결제하기</S.Btn>
                    </S.OBFinalPymentBoxAdd>
                  </S.OBFinalPymentBoxAddWrapper>
                ) : (
                  <S.OBCheckoutBox>
                    <p className="nopm">결제 방법을 선택해주세요.</p>
                  </S.OBCheckoutBox>
                )}
              </S.OBFinalPaymentBox>
            </S.OBRightBox>
          </S.OrderBotWrapper>
        </S.OrderWrapper>
      </S.MainSection>
    </S.MainLayout>
  );
};

export default OrderPage;
