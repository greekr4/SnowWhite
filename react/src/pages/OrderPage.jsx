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

const OrderPage = () => {
  const { data } = useQuery("userinfo", { enabled: false });
  const [radioValue, SetRadioValue] = useState("pm3");
  const [ViewStep, SetViewStep] = useState(0);
  const { item_sids } = useParams();
  const [orderItem, setOrderItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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

  const ckRef = useRef(null);

  useEffect(() => {
    initdb();
  }, [data]);

  const initdb = async () => {
    const params = [];
    item_sids.split(",").forEach((el) => {
      params.push(el);
    });
    setOrderItem((await axios.post("/api/order", { item_sid: params })).data);
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

  const handleOrderBtn = async () => {
    console.log(
      userNm,
      userTel,
      userEmail,
      orderReceiver,
      orderTel,
      orderPostcode,
      orderAddress,
      orderAddAddress,
      orderReq,
      radioValue
    );

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

    if (!ckRef.current.checked) {
      alert("개인정보 수집 동의를 체크해주세요.");
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

    const res = await axios.put("/api/order", {
      userId: data?.USER_ID,
      userTel: userTel,
      userEmail: userEmail,
      item_sids: item_sids,
      orderAmount: totalPrice + 3000,
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
    });

    alert(res.data);
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
            <p>주문 상품 1개</p>
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
                            {el.ITEM_OPTION
                              ? el.ITEM_OPTION.map((option, index) =>
                                  index === el.ITEM_OPTION.length - 1
                                    ? `${option.OPTION_CATE}-${option.OPTION_NM}`
                                    : `${option.OPTION_CATE}-${option.OPTION_NM} / `
                                )
                              : "기본 옵션"}
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
                    <S.Btn onClick={handleSameBtn}>기본 배송지로</S.Btn>
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
                          우편번호 조회
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
                        <input type="text" id="" value="3,000" readOnly />원
                      </td>
                    </tr>
                  </table>
                </S.OBDeliPriceBox>
                <S.OBPaymentBox>
                  <S.OBPaymentSpan>
                    기본 배송비는 3,000원 입니다.
                  </S.OBPaymentSpan>
                </S.OBPaymentBox>
              </S.StepMenu>
              <S.OBTitleBox
                onClick={() => {
                  SetViewStep(2);
                }}
              >
                <span>결제 수단</span>
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
                      disabled
                    />
                    <label htmlFor="pm1">신용카드</label>
                  </S.OBRadioBox>
                  <S.OBRadioBox>
                    <input
                      type="radio"
                      name="payment"
                      id="pm2"
                      onChange={handleRadioValue}
                      disabled
                    />
                    <label htmlFor="pm2">실시간 계좌이체</label>
                  </S.OBRadioBox>
                  <S.OBRadioBox>
                    <input
                      type="radio"
                      name="payment"
                      id="pm3"
                      onChange={handleRadioValue}
                      checked
                    />
                    <label htmlFor="pm3">무통장 입금</label>
                  </S.OBRadioBox>
                  <S.OBRadioBox>
                    <input
                      type="radio"
                      name="payment"
                      id="pm4"
                      onChange={handleRadioValue}
                      disabled
                    />
                    <label htmlFor="pm4">휴대폰 결제</label>
                  </S.OBRadioBox>
                  <S.OBRadioBox>
                    <input
                      type="radio"
                      name="payment"
                      id="pm5"
                      onChange={handleRadioValue}
                      disabled
                    />
                    <label htmlFor="pm5">포인트 결제</label>
                  </S.OBRadioBox>
                </S.OBRadioGroup>
                <S.OBPaymentAddBox style={SlideDown}>
                  <div>
                    <label>카드 선택</label>
                    <select>
                      <option value="">신한</option>
                      <option value="">우리</option>
                    </select>
                    <select readOnly>
                      <option value="">일시불</option>
                    </select>
                  </div>
                </S.OBPaymentAddBox>

                <S.OBPaymentBox>
                  <S.OBPaymentSpan>결제 수단을 선택해주세요.</S.OBPaymentSpan>
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
                    {(totalPrice + 3000).toLocaleString("ko-kr")}
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
                  <div className="right">3,000</div>
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
                    <p>
                      <input type="checkbox" name="ck1" id="ck1" ref={ckRef} />
                      <label htmlFor="ck1">개인정보 수집 동의 (필수)</label>
                      <span>약관보기</span>
                    </p>
                    <S.Btn onClick={handleOrderBtn}>결제하기</S.Btn>
                    <S.Btn onClick={() => {}}>결제하기(PG테스트)</S.Btn>
                    <CheckoutPage />
                  </S.OBFinalPymentBoxAdd>
                </S.OBFinalPymentBoxAddWrapper>
              </S.OBFinalPaymentBox>
            </S.OBRightBox>
          </S.OrderBotWrapper>
        </S.OrderWrapper>
      </S.MainSection>
    </S.MainLayout>
  );
};

export default OrderPage;
