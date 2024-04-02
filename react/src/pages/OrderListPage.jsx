import React, { useEffect, useState } from "react";
import * as S from "../styles/new_styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { useQuery } from "react-query";
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

const OrderListPage = () => {
  const [selectedDateStart, setSelectedDateStart] = useState(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());
  const { data } = useQuery("userinfo", { enabled: false });
  const [orderlist, setOrderlist] = useState([]);

  useEffect(() => {
    initdb();
  }, [data]);

  const initdb = async () => {
    setOrderlist(
      (await axios.post("/api/orderlist", { userid: data?.USER_ID })).data
    );

    console.log(orderlist);
    console.log(orderlist);
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
                  <th>주문번호</th>
                  <th>주문일</th>
                  <th>상품정보</th>
                  <th>가격</th>
                  <th>진행상태</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                {orderlist.map((el, index) => (
                  <tr>
                    <td>{el.ORDER_SID}</td>
                    <td>{formatDate(el.ORDER_DATE)}</td>
                    <td>
                      <S.Btn>자세히 보기</S.Btn>
                    </td>
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
                ))}
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
