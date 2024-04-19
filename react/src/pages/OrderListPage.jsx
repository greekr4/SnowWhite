import React, { useEffect, useState } from "react";
import * as S from "../styles/new_styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { formatDate } from "../hooks/Utill";
import Pagination from "react-js-pagination";
import arrow_left from "../assets/icons/arrow_left.png";
import arrow_right from "../assets/icons/arrow_right.png";

const CustomDatePickerHeader = ({
  date,
  increaseMonth,
  decreaseMonth,
  increaseYear,
  decreaseYear,
}) => (
  <S.DatePickerHeader className="custom-header">
    <S.DatePickerHeaderBox>
      <div className="left">
        <button className="double-left" onClick={decreaseYear} />
        <button className="left" onClick={decreaseMonth} />
      </div>
      <span>{`${date.getFullYear()}년 ${date.toLocaleString("default", {
        month: "long",
      })}`}</span>
      <div className="right">
        <button className="right" onClick={increaseMonth} />
        <button className="double-right" onClick={increaseYear} />
      </div>
    </S.DatePickerHeaderBox>
  </S.DatePickerHeader>
);

const OrderListPage = ({ openPopup }) => {
  const [selectedDateStart, setSelectedDateStart] = useState(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());
  const { data } = useQuery("userinfo", { enabled: false });
  const [initOrderlist, setInitOrderlist] = useState([]);
  const [orderlist, setOrderlist] = useState([]);
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);

  useEffect(() => {
    initdb();
  }, [data]);

  const initdb = async () => {
    if (data?.USER_ID) {
      const orderData = (
        await axios.post(process.env.REACT_APP_DB_HOST + "/api/orderlist", {
          userid: data?.USER_ID,
        })
      ).data;

      setInitOrderlist(orderData);
      setOrderlist(orderData.slice(0, countPerPage));
    }
  };

  useEffect(() => {
    if (selectedDateEnd < selectedDateStart) {
      setSelectedDateStart(selectedDateEnd);
    }
  }, [selectedDateEnd]);

  useEffect(() => {
    if (selectedDateEnd < selectedDateStart) {
      setSelectedDateEnd(selectedDateStart);
    }
  }, [selectedDateStart]);

  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return "결제 대기";
      case 2:
        return "결제 완료";
      case 3:
        return "배송 준비 중";
      case 4:
        return "배송 중";
      case 5:
        return "배송 완료";
      default:
        return "error";
    }
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
    const pageItems = getPageItems(initOrderlist, e, countPerPage);
    setOrderlist(pageItems);
  };
  return (
    <S.MainLayout>
      <S.MainSection>
        <S.CartTopWrapper>
          <S.CartTopTitleBox>
            <h1>주문 내역</h1>
            <p>내가 주문한 상품 확인이 가능해요.</p>
          </S.CartTopTitleBox>
          <S.CartTopAddtionBox>
            <p>주문 상품 {initOrderlist ? initOrderlist.length : "0"}개</p>
          </S.CartTopAddtionBox>
          {/* <S.OrderListTopAddtionBox>
            <div className="left">
              <label>기간별 조회</label>
              <S.Btn>6개월</S.Btn>
              <S.Btn>12개월</S.Btn>
              <S.Btn>24개월</S.Btn>
            </div>
            <div className="right">
              <label>직접 입력 조회</label>
              <S.RightInner>
                <DatePicker
                  renderCustomHeader={CustomDatePickerHeader}
                  dateFormat="yyyy-MM-dd"
                  selected={selectedDateStart}
                  onChange={(date) => setSelectedDateStart(date)}
                  selectsStart
                  locale={ko}
                  maxDate={new Date()}
                />
              </S.RightInner>
              <S.RightInner>-</S.RightInner>
              <S.RightInner>
                <DatePicker
                  renderCustomHeader={CustomDatePickerHeader}
                  dateFormat="yyyy-MM-dd"
                  selected={selectedDateEnd}
                  onChange={(date) => setSelectedDateEnd(date)}
                  selectsStart
                  locale={ko}
                  maxDate={new Date()}
                />
              </S.RightInner>
              <S.RightInner>
                <S.Btn>조회</S.Btn>
              </S.RightInner>
            </div>
          </S.OrderListTopAddtionBox> */}
        </S.CartTopWrapper>
      </S.MainSection>
      <S.MainSection>
        <S.OrderListMidWrapper>
          <S.OrderListMidProdBox>
            <table>
              <thead>
                <tr>
                  <th>주문일</th>
                  <th>주문번호</th>
                  <th>상품정보</th>
                  <th>결제금액</th>
                  <th>진행상태</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* {orderlist?.map((el, index) => (
                  <tr key={index}>
                    <td>{el.ORDER_SID}</td>
                    <td>{formatDate(el.ORDER_DATE)}</td>
                    <td>{el.ITEMS?.toString()}</td>
                    <td>{el.ORDER_AMOUNT.toLocaleString("ko-kr")}</td>
                    <td>{renderStatus(el.ORDER_STATUS)}</td>
                    <td>
                      <S.Btn
                        btnBgc="#469cff"
                        fontColor="#fff"
                        btnBgcHover="#7cb9ff"
                        borderCHover="none"
                      >
                        리뷰쓰기
                      </S.Btn>
                      <S.Btn>취소요청</S.Btn>
                    </td>
                  </tr>
                ))} */}
                {orderlist?.length ? (
                  orderlist?.map((el, index) => (
                    <tr key={index}>
                      <td>{formatDate(el.ORDER_DATE)}</td>
                      <td style={{ fontSize: "0.75em" }}>{el.ORDER_SID}</td>
                      <td>
                        <p style={{ fontSize: "1.1em", fontWeight: "500" }}>
                          {el.ORDER_CORE_PROD}
                        </p>
                        <p
                          style={{
                            fontSize: "0.8em",
                            color: "#777",
                            padding: "0.25em",
                          }}
                        >
                          {el.ORDER_CORE_OPTION}
                        </p>
                        {el.ITEM_SIDS.split(",").length - 1 != 0 ? (
                          <p
                            style={{
                              fontSize: "0.8em",
                              padding: "0.25em",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              openPopup("orderDetail", { ITEMS: el.ITEM_SIDS })
                            }
                          >
                            {" "}
                            외 {el.ITEM_SIDS.split(",").length - 1} 건
                          </p>
                        ) : (
                          <></>
                        )}
                        <p></p>

                        {/* 외{" "}
                      {el.ITEM_SIDS.split(",").length - 1} 건 */}
                        {/* <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "space-around",
                          height: "150px",
                          overflowY: "scroll",
                        }}
                      >
                        {el.ITEMS.map((item, index) => (
                          <div
                            style={{
                              padding: "0.5em",
                              border: "1px solid #ccc",
                              borderRadius: "10px",
                              margin: "0 0 0.5rem 0",
                              width: "90%",
                            }}
                          >
                            <p style={{ fontSize: "1.2em" }}>{item.PROD_NM}</p>
                            <p style={{ fontSize: "0.75em", padding: "0.5em" }}>
                              {item.ITEM_OPTION.map((option, index) => (
                                <>
                                  {option.OPTION_CATE} - {option.OPTION_NM}
                                  {index != item.ITEM_OPTION.length - 1 &&
                                    " / "}
                                </>
                              ))}
                            </p>
                            <p style={{ padding: "0.25em" }}>
                              {item.ITEM_QUANTITY}개{" / "}
                              {item.ITEM_AMOUNT.toLocaleString("ko-kr")}원
                            </p>
                          </div>
                        ))}
                      </div> */}
                      </td>
                      <td>{el.ORDER_AMOUNT.toLocaleString("ko-kr")}</td>
                      <td>{renderStatus(el.ORDER_STATUS)}</td>
                      <td>
                        {el.ORDER_STATUS < 4 ? (
                          <S.Btn>취소요청</S.Btn>
                        ) : el.ORDER_STATUS === 4 ? (
                          <S.Btn
                            onClick={() => {
                              openPopup("logisDetail", {
                                ORDER_LOGIS_NM: el.ORDER_LOGIS_NM,
                                ORDER_LOGIS_NO: el.ORDER_LOGIS_NO,
                              });
                            }}
                          >
                            배송추적
                          </S.Btn>
                        ) : el.ORDER_STATUS === 5 && el.ORDER_REVIEW === "N" ? (
                          <S.Btn
                            btnBgc="#469cff"
                            fontColor="#fff"
                            btnBgcHover="#7cb9ff"
                            borderCHover="none"
                            onClick={() => {
                              openPopup("reviewForm", {
                                ORDER_SID: el.ORDER_SID,
                                PROD_SID: el.ORDER_CORE_PROD_SID,
                                PROD_NM: el.ORDER_CORE_PROD,
                                ITEM_OPTION: el.ORDER_CORE_OPTION,
                                USER_ID: data?.USER_ID,
                                PROD_CATECODE: el.ORDER_CORE_PROD_CATECODE,
                                initdb: initdb,
                              });
                            }}
                          >
                            리뷰작성
                          </S.Btn>
                        ) : (
                          <S.Btn
                            onClick={() => {
                              openPopup("reviewDetail", {
                                order_sid: el.ORDER_SID,
                              });
                            }}
                          >
                            리뷰확인
                          </S.Btn>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={"100%"} style={{ height: "6rem" }}>
                      주문내역이 비었습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </S.OrderListMidProdBox>
          <S.PaginationBox>
            <Pagination
              // 현제 보고있는 페이지
              activePage={currentPage}
              // 한페이지에 출력할 아이템수
              itemsCountPerPage={countPerPage}
              // 총 아이템수
              totalItemsCount={initOrderlist?.length}
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
        </S.OrderListMidWrapper>
        <S.CartBotWrapper>
          <S.CartBotNotiBox>
            <h1>주문/배송 안내</h1>
            <p>
              결제 주문후 2~4일 이내 발송 됩니다. (토, 일, 공휴일은 배송기일에서
              제외됩니다.)
            </p>
            <p>단, 도서 지역은 배송기일이 추가적으로 소요 될 수 있습니다.</p>
          </S.CartBotNotiBox>
        </S.CartBotWrapper>
      </S.MainSection>
    </S.MainLayout>
  );
};

export default OrderListPage;
