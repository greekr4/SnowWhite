import React, { useEffect, useState } from "react";
import * as S from "../styles/new_styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { formatDate } from "../hooks/Utill";

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
  const [orderlist, setOrderlist] = useState([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    initdb();
  }, [data]);

  const initdb = async () => {
    if (data?.USER_ID) {
      const updated = (
        await axios.post("/api/orderlist", {
          userid: data?.USER_ID,
        })
      ).data;

      // await Promise.all(
      //   updated.map(async (el, index) => {
      //     const item_ary = el.ITEM_SIDS.split(",");

      //     updated[index].ITEMS = (
      //       await axios.post("/api/orderlist/item", {
      //         item_sids: item_ary,
      //       })
      //     ).data;
      //   })
      // );

      console.log(updated);

      setOrderlist(updated);
    }
  };

  useEffect(() => {
    console.log("오더리스트", orderlist);
  }, [orderlist]);

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

  return (
    <S.MainLayout>
      <S.MainSection>
        <S.CartTopWrapper>
          <S.CartTopTitleBox>
            <h1>주문 내역</h1>
            <p>내가 주문한 상품 확인이 가능해요.</p>
          </S.CartTopTitleBox>
          <S.OrderListTopAddtionBox>
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
          </S.OrderListTopAddtionBox>
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
                          <S.Btn>배송추적</S.Btn>
                        ) : el.ORDER_STATUS === 5 && el.ORDER_REVIEW === 0 ? (
                          <S.Btn
                            btnBgc="#469cff"
                            fontColor="#fff"
                            btnBgcHover="#7cb9ff"
                            borderCHover="none"
                            onClick={() => {
                              openPopup("reviewForm", {
                                ORDER_SID: el.ORDER_SID,
                                PROD_SID: el.ITEMS[0].PROD_SID,
                                PROD_NM: el.ITEMS[0].PROD_NM,
                                PROD_CATECODE: el.ITEMS[0].PROD_CATECODE,
                                ITEM_OPTION: el.ITEMS[0].ITEM_OPTION,
                                USER_ID: data?.USER_ID,
                              });
                            }}
                          >
                            리뷰작성
                          </S.Btn>
                        ) : (
                          <S.Btn>리뷰확인</S.Btn>
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
        </S.OrderListMidWrapper>
        <S.CartBotWrapper>
          <S.CartBotNotiBox>
            <h1>주문/배송 안내</h1>
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

export default OrderListPage;
