import React, { useEffect, useState } from "react";
import * as S from "../../styles/new_styles";
import { formatDate, formatTime } from "../../hooks/Utill";
import axios from "axios";

const AdminOrder = ({ openPopup }) => {
  const [orderlist, setOrderlist] = useState([]);

  useEffect(() => {
    initdb();
  }, []);

  const initdb = async () => {
    const updated = (await axios.post("/api/admin/orderlist")).data;

    await Promise.all(
      updated.map(async (el, index) => {
        const item_ary = el.ITEM_SIDS.split(",");

        updated[index].ITEMS = (
          await axios.post("/api/orderlist/item", {
            item_sids: item_ary,
          })
        ).data;
      })
    );

    console.log(updated);

    setOrderlist(updated);

    // setOrderlist((await axios.post("/api/admin/orderlist")).data);
  };

  formatTime("2024-04-03T00:34:05.000Z");

  return (
    <S.MainLayout>
      <S.AdminWrapper>
        <S.AdminTable>
          <thead>
            <tr>
              <th>주문일 (결제일)</th>
              <th>주문번호</th>
              <th>주문자</th>
              <th>상품명</th>
              <th>결제금액</th>
              <th>결제수단</th>
              <th>결제상태</th>
              <th>미배송</th>
              <th>배송중</th>
              <th>배송완료</th>
              <th>취소</th>
              <th>요청사항</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            {orderlist?.map((el, index) => (
              <tr key={index}>
                <th>
                  <p>{formatDate(el.ORDER_DATE)}</p>
                  <p>{formatTime(el.ORDER_DATE)}</p>
                  <p>------</p>
                  <p>{formatDate(el.ORDER_PAYMENT_DATE)}</p>
                  <p>{formatTime(el.ORDER_PAYMENT_DATE)}</p>
                </th>
                <th>{el.ORDER_SID}</th>
                <th>{el.USER_ID}</th>
                <th>
                  <p style={{ cursor: "pointer", textDecoration: "underline" }}>
                    {el.ITEMS.length > 1 ? (
                      <>
                        {el.ITEMS[0].PROD_NM} 외 {el.ITEMS.length - 1}건
                      </>
                    ) : (
                      <>{el.ITEMS[0].PROD_NM}</>
                    )}
                  </p>
                </th>
                <th>{el.ORDER_AMOUNT.toLocaleString("ko-kr")}</th>
                <th>{el.ORDER_PAYMENT_TYPE}</th>
                <th>{el.ORDER_STATUS}</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>{el.ORDER_REQ}</th>
                <th></th>
              </tr>
            ))}
          </tbody>
        </S.AdminTable>
      </S.AdminWrapper>
    </S.MainLayout>
  );
};

export default AdminOrder;
