import React, { useEffect, useState } from "react";
import * as S from "../styles/new_styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { InfiniteQueryObserver, useQuery } from "react-query";
import PrintEstimate from "../components/products/PrintEstimate";
import arrow_left from "../assets/icons/arrow_left.png";
import arrow_right from "../assets/icons/arrow_right.png";
import Pagination from "react-js-pagination";

const CartPage = () => {
  const { data } = useQuery("userinfo", { enabled: false });
  const USER_ID = data?.USER_ID;
  const [initCartData, setInitCartData] = useState();
  const [cartData, setCartData] = useState();
  const [selectedItems, setSelectedItems] = useState();
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [printVisible, SetPrintVisible] = useState(false);
  const [estimateData, SetEstimateData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);

  const handlePrintVisible = () => {
    SetPrintVisible(!printVisible);
  };

  useEffect(() => {
    getCart();
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
    let price = 0;
    let qty = 0;
    selectedItems?.map((el, index) => {
      if (el) {
        price += cartData[index].ITEM_AMOUNT;
        qty++;
      }
    });
    setTotalQty(qty);
    setTotalPrice(price);

    const updated = [];

    selectedItems?.map((el, index) => {
      if (el) {
        updated.push(cartData[index]);
      }
    });
    SetEstimateData(updated);
  }, [selectedItems]);

  /**
   * 선택 시 true / false를 selectedItems[] 배열로
   * cartData[] 와 index 순서 동일
   *
   */

  const getCart = async () => {
    const res = (
      await axios.post(process.env.REACT_APP_DB_HOST + "/api/cart", {
        userid: USER_ID,
      })
    ).data;
    console.log(res);
    setInitCartData([...res]);
    setCartData(res.splice(0, countPerPage));
  };

  const handleSeleted = (index) => {
    const updated = [...selectedItems];
    updated[index] = !updated[index];
    setSelectedItems(updated);
    console.log(updated);
  };

  const handleAllSeleted = (e) => {
    const updated = [...selectedItems];
    updated.map((el, index) => {
      el = updated[index] = e.target.checked;
    });
    console.log(updated);
    setSelectedItems(updated);
  };

  const handelSelectedDel = () => {
    const hasTrue = selectedItems.some((item) => item === true);

    if (hasTrue) {
      alert("삭제합니다.");
    } else {
      alert("선택해주세요.");
      return false;
    }

    // delicode를 배열로 전송하면 IN 조건 삭제
    const cart_sids = [];
    selectedItems.map((el, index) => {
      if (el) {
        cart_sids.push(cartData[index].CART_SID);
      }
    });
    axios
      .post(process.env.REACT_APP_DB_HOST + "/api/cart/del", {
        cart_sid: cart_sids,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          getCart();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const navigate = useNavigate();
  const handleSeletedOrder = () => {
    const hasTrue = selectedItems.some((item) => item === true);

    if (!hasTrue) {
      alert("선택해주세요.");
      return false;
    }

    let item_sids = [];
    selectedItems.map((el, index) => {
      if (el) {
        item_sids.push(cartData[index].ITEM_SID);
      }
    });

    console.log(item_sids);

    navigate(`/order/${item_sids}`);
  };

  function getPageItems(array, page, pageSize) {
    // 페이지 인덱스 계산
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    console.log(page, startIndex, endIndex);
    // 배열에서 해당 페이지의 요소를 추출하여 반환
    return array.slice(startIndex, endIndex);
  }

  const handlePageChange = (e) => {
    setCurrentPage(e);
    const pageItems = getPageItems(initCartData, e, countPerPage);
    setCartData(pageItems);
  };

  const handleEditDesign = async (item_sid) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "pdf/*");
    input.click();
    input.addEventListener("change", async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "design");
      formData.append("userid", USER_ID);
      try {
        const result = await axios.post(
          process.env.REACT_APP_DB_HOST + "/api/upload_design",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const designUrl = result.data;

        const res_update = await axios.put(
          process.env.REACT_APP_DB_HOST + "/api/cart/design",
          {
            item_sid: item_sid,
            item_file_location: designUrl,
          }
        );

        alert("디자인이 등록되었습니다.");
      } catch (error) {
        console.log("실패");
      }
    });
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
            <p>상품 {initCartData ? initCartData.length : "0"}개</p>
          </S.CartTopAddtionBox>
        </S.CartTopWrapper>
      </S.MainSection>
      <S.MainSection>
        <S.CartMidWrapper>
          <S.CartMidBtnBox>
            <div>
              <S.Btn onClick={handelSelectedDel}>선택 삭제</S.Btn>
              <S.Btn onClick={handlePrintVisible}>선택 견적서</S.Btn>
              <PrintEstimate
                printVisible={printVisible}
                handlePrintVisible={handlePrintVisible}
                estimateData={estimateData}
              />
            </div>
            <div>
              <S.CartMidText>
                선택 상품 {totalQty.toLocaleString("ko-KR")}개
              </S.CartMidText>
              <S.CartMidText color="red">
                결제 예정 금액 {totalPrice.toLocaleString("ko-KR")}원
              </S.CartMidText>

              <S.Btn
                onClick={handleSeletedOrder}
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
                  <th style={{ width: "5%" }}>
                    <input type="checkbox" onClick={handleAllSeleted} />
                  </th>
                  <th style={{ width: "20%" }}></th>
                  <th style={{ width: "20%" }}>상품 정보</th>
                  <th style={{ width: "10%" }}>수량</th>
                  <th style={{ width: "15%" }}>가격</th>
                  <th style={{ width: "10%" }}>최종 편집일</th>
                  <th style={{ width: "10%" }}>디자인</th>
                  <th style={{ width: "10%" }}>비고</th>
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
                      <td>{formatDate(el.ITEM_MODIDATE)}</td>
                      <td>
                        <S.Btn
                          onClick={() => {
                            window.open(el.ITEM_FILE_LOCATION);
                          }}
                        >
                          디자인보기
                        </S.Btn>
                      </td>
                      <td>
                        <Link to={`/order/${el.ITEM_SID}`}>
                          <S.Btn
                            btnBgc="#469cff"
                            fontColor="#fff"
                            btnBgcHover="#7cb9ff"
                            borderCHover="none"
                          >
                            주문하기
                          </S.Btn>
                        </Link>
                        <S.Btn
                          onClick={() => {
                            handleEditDesign(el.ITEM_SID);
                          }}
                        >
                          편집하기
                        </S.Btn>
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
          <S.PaginationBox>
            <Pagination
              // 현제 보고있는 페이지
              activePage={currentPage}
              // 한페이지에 출력할 아이템수
              itemsCountPerPage={countPerPage}
              // 총 아이템수
              totalItemsCount={initCartData?.length}
              // 표시할 페이지수
              pageRangeDisplayed={10}
              // 마지막 버튼 숨기기
              hideFirstLastPages={true}
              // 버튼 커스텀
              prevPageText={
                <S.Glob_Icon
                  icon={arrow_left}
                  width="16px"
                  height="16px"
                  margin="3px 0 0 0"
                />
              }
              nextPageText={
                <S.Glob_Icon
                  icon={arrow_right}
                  width="16px"
                  height="16px"
                  margin="3px 0 0 0"
                />
              }
              // 함수
              onChange={handlePageChange}
            />
          </S.PaginationBox>
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
            <p>
              저장한 디자인과 상품은 영구적으로 보관할 수 있습니다. (휴면계정은
              별도 정책에 따름)
            </p>
            <p>
              효과나 칼선 옵션을 변경하면 편집화면을 확인 후 저장해야 주문
              가능합니다.
            </p>
            <p>
              [편집하기]를 클릭하여 언제든 디자인을 수정하고 재편집 할 수
              있습니다.
            </p>
            <p>
              상품의 옵션이나 디자인을 약간만 수정해서 유사한 상품을 주문하려면
              [복사하기]를 사용해보세요.
            </p>
            <p>
              삭제한 디자인은 복구할 수 없습니다. (단, 주문내역이 있는 경우
              재주문 가능)
            </p>
            <p>
              견적서는 선택한 상품의 결제 예정 금액으로 발급되며, 쿠폰/머니 등을
              사용하실 경우 주문 후 주문/배송 내역에서 할인 적용된 금액으로 발급
              받으실 수 있습니다.
            </p>
          </S.CartBotNotiBox>
        </S.CartBotWrapper>
      </S.MainSection>
    </S.MainLayout>
  );
};

export default CartPage;
