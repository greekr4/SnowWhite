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
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { CheckoutPage_real } from "../tossPay/Checkout_real";
import { formatPhoneNumber } from "../hooks/Utill";

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
    if (!checkInfo()) {
      return false;
    } else {
      SetRadioValue(e.target.id);
    }
  };
  const SlideDown = useSpring({
    height: radioValue === "pm1" ? 42 + "px" : 0 + "px",
  });

  const StepSlideDown1 = useSpring({
    height: ViewStep === 0 ? 600 + "px" : 0 + "px",
  });
  const StepSlideDown2 = useSpring({
    height: ViewStep === 1 ? 350 + "px" : 0 + "px",
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
      let optionNm = orderItem[0].ITEM_OPTION;
      let coreNm = orderItem[0].PROD_NM;
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
      console.log(e);
      return false;
    }
  };

  const getorderNm = () => {
    const back = orderItem?.length > 1 ? ` 외 ${orderItem?.length - 1}개` : ``;
    return `${orderItem[0]?.PROD_NM}${back}`;
  };

  const checkInfo = () => {
    console.log(
      userEmail,
      orderReceiver,
      orderTel,
      orderPostcode,
      orderAddress,
      orderAddAddress
    );
    if (
      !userEmail ||
      !orderReceiver ||
      !orderTel ||
      !orderPostcode ||
      !orderAddress ||
      !orderAddAddress
    ) {
      setSnackbar({
        children: "주문자 혹은 배송지 정보를 정확히 입력해주세요.",
        severity: "info",
      });
      SetViewStep(0);
      return false;
    }
    return true;
  };

  const handleOrderBtn = async () => {
    if (!checkInfo()) {
      return false;
    }
    let optionNm = orderItem[0].ITEM_OPTION;
    let coreNm = orderItem[0].PROD_NM;
    // console.log(orderItem[0].PROD_NM);

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
      setDialogOpen(true);
    }
  };

  const [snackbar, setSnackbar] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
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
                  <S.Arrow
                    img={ViewStep === 0 ? collapse_arrow : expand_arrow}
                  />
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
                          <input
                            className="text"
                            value={userTel}
                            onChange={(e) => {
                              setUserTel(formatPhoneNumber(e.target.value));
                            }}
                          ></input>
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
                            onChange={(e) => {
                              setOrderTel(formatPhoneNumber(e.target.value));
                            }}
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
                  <S.Arrow
                    img={ViewStep === 1 ? collapse_arrow : expand_arrow}
                  />
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
                      <h1
                        style={{
                          fontSize: "16px",
                          fontWeight: "550",
                          paddingBottom: "12px",
                        }}
                      >
                        배송 안내
                      </h1>
                      <p>
                        <b style={{ paddingRight: "12px" }}>배송 업체</b>CJ택배,
                        롯데택배, 로젠택배
                      </p>
                      <p>
                        <b style={{ paddingRight: "12px" }}>배송 지역</b>
                        대한민국 전 지역
                      </p>
                      <p>
                        <b style={{ paddingRight: "12px" }}>배송 비용</b>
                        {deliPrice.toLocaleString("ko-kr")}원
                      </p>
                      <p>
                        <b style={{ paddingRight: "12px" }}>배송 기간</b>
                        주말·공휴일 제외 2-5일
                      </p>
                      <h1
                        style={{
                          fontSize: "16px",
                          fontWeight: "550",
                          paddingTop: "12px",
                          paddingBottom: "12px",
                        }}
                      >
                        유의 사항
                      </h1>
                      <p>
                        - 주문 폭주 및 공급 사정으로 인하여 지연 및 품절이
                        발생될 수 있습니다.
                      </p>
                      <p>
                        - 기본 배송기간 이상 소요되는 상품이거나, 품절 상품은
                        개별 연락을 드립니다.
                      </p>
                    </S.OBPaymentSpan>
                  </S.OBPaymentBox>
                </S.StepMenu>
                <S.OBTitleBox
                  onClick={() => {
                    SetViewStep(2);
                  }}
                >
                  <span>결제 방법</span>
                  <S.Arrow
                    img={ViewStep === 2 ? collapse_arrow : expand_arrow}
                  />
                </S.OBTitleBox>
                <S.StepMenu style={StepSlideDown3}>
                  <S.OBRadioGroup>
                    <S.OBRadioBox>
                      <input
                        type="radio"
                        name="payment"
                        id="pm1"
                        checked={radioValue === "pm1"}
                        onChange={handleRadioValue}
                      />
                      <label htmlFor="pm1">일반 결제</label>
                    </S.OBRadioBox>
                    <S.OBRadioBox>
                      <input
                        type="radio"
                        name="payment"
                        id="pm2"
                        checked={radioValue === "pm2"}
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
                      <p>∙ 기본 제작 기간 영업일 기준 2일~5일 소요됩니다.</p>
                      <p>
                        ∙ 주문 폭주 등에 의한 제작 지연 및 오류 주문 건의 경우
                        출고가 지연 될 수 있습니다.
                      </p>
                      <p
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          openPopup("refund");
                        }}
                      >
                        ∙ <b>환불 및 교환 정책</b> 을 확인 하였습니다.
                      </p>
                      <p></p>
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
                    process.env.REACT_APP_MODE === "PROD" ? (
                      <CheckoutPage_real
                        totalPrice={parseInt(totalPrice + deliPrice)}
                        orderName={getorderNm()}
                        ckInput={ckInput}
                        insertPgOrder={insertPgOrder}
                      />
                    ) : (
                      <CheckoutPage
                        totalPrice={parseInt(totalPrice + deliPrice)}
                        orderName={getorderNm()}
                        ckInput={ckInput}
                        insertPgOrder={insertPgOrder}
                      />
                    )
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

                  {/* {radioValue === "pm1" ? (

                    {(process.env.REACT_APP_MODE === "PROD") ? <CheckoutPage_real
                    totalPrice={parseInt(totalPrice + deliPrice)}
                    orderName={getorderNm()}
                    ckInput={ckInput}
                    insertPgOrder={insertPgOrder}
                  /> : <CheckoutPage
                  totalPrice={parseInt(totalPrice + deliPrice)}
                  orderName={getorderNm()}
                  ckInput={ckInput}
                  insertPgOrder={insertPgOrder}
                />}
                    
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
                  )} */}
                </S.OBFinalPaymentBox>
              </S.OBRightBox>
            </S.OrderBotWrapper>
          </S.OrderWrapper>
        </S.MainSection>
      </S.MainLayout>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setSnackbar(false)}
          autoHideDuration={3000}
        >
          <Alert {...snackbar} onClose={() => setSnackbar(false)} />
        </Snackbar>
      )}
      <Dialog
        open={dialogOpen}
        onClose={() => {
          window.location.href = "/orderlist";
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ textAlign: "center", width: "350px" }}
        >
          주문 완료!
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textAlign: "center" }}
          >
            기업은행 452-043731-04-021
            <br />
            예금주 : (주)스노우화이트
            <br />
            <b>
              {parseInt(totalPrice + deliPrice).toLocaleString("ko-kr")}원
            </b>{" "}
            입금 부탁드립니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              window.location.href = "/orderlist";
            }}
            autoFocus
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderPage;
