import React from "react";
import * as S from "../styles/new_styles";

const CartPage = () => {
  return (
    <S.MainLayout>
      <S.MainSection>
        <S.CartTopWrapper>
          <S.CartTopTitleBox>
            <h1>장바구니</h1>
            <p>내가 담은 상품을 확인 및 주문이 가능해요.</p>
          </S.CartTopTitleBox>
          <S.CartTopAddtionBox>
            <p>상품 2개</p>
          </S.CartTopAddtionBox>
        </S.CartTopWrapper>
      </S.MainSection>
      <S.MainSection>
        <S.CartMidWrapper>
          <S.CartMidBtnBox>
            <div>
              <S.Btn>선택 삭제</S.Btn>
              <S.Btn>선택 견적서</S.Btn>
            </div>
            <div>
              <S.CartMidText>선택 상품 1개</S.CartMidText>
              <S.CartMidText color="red">결제 예정 금액 3,400원</S.CartMidText>
              <S.Btn
                btnBgc="#469cff"
                fontColor="#fff"
                btnBgcHover="#7cb9ff"
                borderCHover="none"
              >
                선택 주문하기
              </S.Btn>
            </div>
          </S.CartMidBtnBox>
          <S.CartMidProdBox>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>상품 정보</th>
                  <th>수량</th>
                  <th>가격</th>
                  <th>최종 편집일</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <S.CartMidThumbnail></S.CartMidThumbnail>
                  </td>
                  <td>
                    <S.CartMidProdInfoBox>
                      <h1>일반 명함</h1>
                      <p>90 x 50 / 스노우(비코팅) 250g</p>
                      <p>2024-02-15</p>
                    </S.CartMidProdInfoBox>
                  </td>
                  <td>500</td>
                  <td>3,400</td>
                  <td>2024-02-15</td>
                  <td>
                    <S.Btn
                      btnBgc="#469cff"
                      fontColor="#fff"
                      btnBgcHover="#7cb9ff"
                      borderCHover="none"
                    >
                      주문하기
                    </S.Btn>
                    <S.Btn>편집하기</S.Btn>
                  </td>
                </tr>
                <tr>
                  <td>
                    <S.CartMidThumbnail></S.CartMidThumbnail>
                  </td>
                  <td>
                    <S.CartMidProdInfoBox>
                      <h1>일반 명함</h1>
                      <p>90 x 50 / 스노우(비코팅) 250g</p>
                      <p>2024-02-15</p>
                    </S.CartMidProdInfoBox>
                  </td>
                  <td>500</td>
                  <td>3,400</td>
                  <td>2024-02-15</td>
                  <td>
                    <S.Btn
                      btnBgc="#469cff"
                      fontColor="#fff"
                      btnBgcHover="#7cb9ff"
                      borderCHover="none"
                    >
                      주문하기
                    </S.Btn>
                    <S.Btn>편집하기</S.Btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </S.CartMidProdBox>
          <S.CartMidPriceBox>
            <table>
              <thead>
                <tr>
                  <th>상품 금액</th>
                  <th></th>
                  <th>상품 할인</th>
                  <th></th>
                  <th>배송비</th>
                  <th></th>
                  <th>결제 예정 금액</th>
                </tr>
              </thead>
              <tbody>
                <td>3,400</td>
                <td>
                  <span>-</span>
                </td>
                <td>0</td>
                <td>
                  <span>+</span>
                </td>
                <td>3,000</td>
                <td>
                  <span>=</span>
                </td>
                <td>6,400</td>
              </tbody>
            </table>
          </S.CartMidPriceBox>
        </S.CartMidWrapper>
        <S.CartBotWrapper>
          <S.CartBotNotiBox>
            <h1>이용안내</h1>
            <p>안내 문구를 작성해주세요.</p>
            <p>안내 문구를 작성해주세요.</p>
            <p>안내 문구를 작성해주세요.</p>
            <p>안내 문구를 작성해주세요.</p>
            <p>안내 문구를 작성해주세요.</p>
          </S.CartBotNotiBox>
        </S.CartBotWrapper>
      </S.MainSection>
    </S.MainLayout>
  );
};

export default CartPage;
