import React, { useEffect, useState } from "react";
import * as S from "../styles/new_styles";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

const CartPage = () => {
  const { data } = useQuery("userinfo", { enabled: false });
  const USER_ID = data?.USER_ID;

  const [cartData, setCartData] = useState();
  const [selectedItems, setSelectedItems] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios
      .post("/api/cart", { userid: USER_ID })
      .then((res) => {
        console.log(res);
        setCartData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [USER_ID]);

  useEffect(() => {
    console.log(cartData);
    const initialSelectedItems = Array.from(
      { length: cartData?.length },
      () => false
    );
    setSelectedItems(initialSelectedItems);
    console.log(initialSelectedItems);
  }, [cartData]);

  useEffect(() => {
    const hasTrue = selectedItems?.some((item) => item === true);

    let price = 0;
    selectedItems?.map((el, index) => {
      if (el) {
        price += cartData[index].ITEM_AMOUNT;
      }
      setTotalPrice(price);
    });
  }, [selectedItems]);

  const handleSeleted = (index) => {
    const updated = [...selectedItems];
    updated[index] = !updated[index];
    setSelectedItems(updated);
    console.log(updated);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const test = () => {
    console.log(cartData[0]);
  };

  return (
    <S.MainLayout>
      <S.MainSection>
        <S.CartTopWrapper>
          <S.CartTopTitleBox>
            <h1>장바구니</h1>
            <p>내가 담은 상품을 확인 및 주문이 가능해요.</p>
          </S.CartTopTitleBox>
          <S.CartTopAddtionBox>
            <p>상품 {cartData ? cartData.length : "0"}개</p>
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
              <S.CartMidText>선택 상품 0개</S.CartMidText>
              <S.CartMidText color="red">결제 예정 금액 0원</S.CartMidText>
              <Link to="/order">
                <S.Btn
                  btnBgc="#469cff"
                  fontColor="#fff"
                  btnBgcHover="#7cb9ff"
                  borderCHover="none"
                >
                  선택 주문하기
                </S.Btn>
              </Link>
            </div>
          </S.CartMidBtnBox>
          <S.CartMidProdBox>
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" name="" id="" />
                  </th>
                  <th></th>
                  <th>상품 정보</th>
                  <th>수량</th>
                  <th>가격</th>
                  <th>최종 편집일</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                {cartData?.length ? (
                  cartData.map((el, index) => (
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          onChange={() => {
                            handleSeleted(index);
                          }}
                          checked={selectedItems[index]}
                        />
                      </td>
                      <td>
                        <S.CartMidThumbnail img={el.IMAGE_LOCATION} />
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
                      <td>{formatDate(el.ITEM_MODIDATE)}</td>
                      <td>
                        <Link to="/order">
                          <S.Btn
                            btnBgc="#469cff"
                            fontColor="#fff"
                            btnBgcHover="#7cb9ff"
                            borderCHover="none"
                          >
                            주문하기
                          </S.Btn>
                        </Link>
                        <S.Btn>편집하기</S.Btn>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} style={{ height: "6rem" }}>
                      장바구니가 비었습니다.
                    </td>
                  </tr>
                )}
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
                <td>{totalPrice.toLocaleString("ko-KR")}</td>
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
                <td>{(totalPrice + 3000).toLocaleString("ko-KR")}</td>
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
