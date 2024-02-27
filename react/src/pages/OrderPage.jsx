import React, { useState } from "react";
import * as S from "../styles/new_styles";
import expand_arrow from "../assets/icons/expand-arrow.png";
import collapse_arrow from "../assets/icons/collapse-arrow.png";
import { useSpring } from "react-spring";

const OrderPage = () => {
  const [radioValue, SetRadioValue] = useState();
  const [ViewStep, SetViewStep] = useState(0);

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
                  <tr>
                    <td>
                      <S.CartMidThumbnail></S.CartMidThumbnail>
                    </td>
                    <td>
                      <S.OrderMidProdInfoBox>
                        <h1>일반 명함</h1>
                        <p>90 x 50 / 스노우(비코팅) 250g</p>
                        <p>2024-02-15</p>
                      </S.OrderMidProdInfoBox>
                    </td>
                    <td>500</td>
                    <td>3,400</td>
                    <td>0</td>
                    <td>3,400</td>
                  </tr>
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
                        <input type="text" width="1000px" />
                      </td>
                    </tr>
                    <tr>
                      <th>연락처</th>
                      <td>
                        <input className="tel" value="010"></input>
                        <input className="tel" value="1234"></input>
                        <input className="tel" value="5678"></input>
                      </td>
                    </tr>
                    <tr>
                      <th>이메일</th>
                      <td>
                        <input type="text" />
                      </td>
                    </tr>
                  </table>
                  <S.OBTextAndBtnBox>
                    <h1>배송지 정보</h1>
                    <S.Btn>주문자와 동일</S.Btn>
                  </S.OBTextAndBtnBox>
                  <table>
                    <tr>
                      <th>받으시는 분</th>
                      <td>
                        <input type="text" />
                      </td>
                    </tr>
                    <tr>
                      <th>연락처</th>
                      <td>
                        <input className="tel" value=""></input>
                        <input className="tel" value=""></input>
                        <input className="tel" value=""></input>
                      </td>
                    </tr>
                    <tr>
                      <th>주소</th>
                      <td>
                        <input type="text" />
                        <S.Btn margin="0 0 0 0.5rem">우편번호 조회</S.Btn>
                        <br />
                        <input type="text" className="deli" />
                        <input
                          type="text"
                          className="deli"
                          placeholder="상세 주소를 입력해주세요."
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
                    />
                    <label htmlFor="pm1">신용카드</label>
                  </S.OBRadioBox>
                  <S.OBRadioBox>
                    <input
                      type="radio"
                      name="payment"
                      id="pm2"
                      onChange={handleRadioValue}
                    />
                    <label htmlFor="pm2">실시간 계좌이체</label>
                  </S.OBRadioBox>
                  <S.OBRadioBox>
                    <input
                      type="radio"
                      name="payment"
                      id="pm3"
                      onChange={handleRadioValue}
                    />
                    <label htmlFor="pm3">무통장 입금</label>
                  </S.OBRadioBox>
                  <S.OBRadioBox>
                    <input
                      type="radio"
                      name="payment"
                      id="pm4"
                      onChange={handleRadioValue}
                    />
                    <label htmlFor="pm4">휴대폰 결제</label>
                  </S.OBRadioBox>
                  <S.OBRadioBox>
                    <input
                      type="radio"
                      name="payment"
                      id="pm5"
                      onChange={handleRadioValue}
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
                  <div className="right">6,400</div>
                </S.OBFinalRowBox>
                <S.OBFinalRowBox>
                  <div className="left">상품 금액</div>
                  <div className="right">3,400</div>
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
                      <input type="checkbox" name="ck1" id="ck1" />
                      <label htmlFor="ck1">
                        개인정보 수집 동의 (필수)
                      </label>{" "}
                      <span>약관보기</span>
                    </p>
                    <S.Btn>결제하기</S.Btn>
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
