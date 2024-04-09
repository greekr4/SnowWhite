import React, { useEffect, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import { formatDate, formatTime } from "../../hooks/Utill";
import axios from "axios";
import AdminOrderDetail from "./AdminOrderDetail";

const AdminOrder = ({ openPopup }) => {
  const [initOrderlist, setInitOrderlist] = useState([]);
  const [orderlist, setOrderlist] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderDetailVisible, setOrderDetailVisible] = useState(false);

  const allCheckbox = useRef(null);

  useEffect(() => {
    initdb();
  }, []);

  const initdb = async () => {
    const res = (await axios.post("/api/admin/orderlist")).data;

    const initSelectedItem = Array.from({ length: res?.length }, () => false);
    console.log(initSelectedItem);
    setSelectedItem(initSelectedItem);

    setInitOrderlist(res);
    setOrderlist(res);
  };

  const renderOrderStatus = (status) => {
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

  const statusFillter = (status) => {
    const fillerdata = initOrderlist.filter((el) => el.ORDER_STATUS === status);
    const initSelectedItem = Array.from(
      { length: fillerdata?.length },
      () => false
    );
    console.log(initSelectedItem);
    setSelectedItem(initSelectedItem);
    setOrderlist(fillerdata);
  };

  const statusFillter_cancle = () => {
    const initSelectedItem = Array.from(
      { length: initOrderlist?.length },
      () => false
    );
    console.log(initSelectedItem);
    setSelectedItem(initSelectedItem);
    setOrderlist(initOrderlist);
  };

  const updateStatus = async (value) => {
    const result = window.confirm("변경 하시겠습니까?");
    if (!result) {
      return false;
    }

    const order_sids = [];

    selectedItem.map((el, index) => {
      if (el) {
        order_sids.push(orderlist[index].ORDER_SID);
      }
    });

    console.log(order_sids);

    const res = await axios.put("/api/admin/order", {
      order_sid: order_sids,
      field: "ORDER_STATUS",
      order_status: value,
    });

    initdb();
    allCheckbox.current.checked = false;
  };

  return (
    <S.MainLayout>
      <S.AdminWrapper>
        <S.Btn margin="0 0.5em 0.5em 0" onClick={() => updateStatus(1)}>
          결제대기 처리
        </S.Btn>
        <S.Btn margin="0 0.5em 0.5em 0" onClick={() => updateStatus(2)}>
          결제완료 처리
        </S.Btn>
        <S.Btn margin="0 0.5em 0.5em 0" onClick={() => updateStatus(3)}>
          배송준비 처리
        </S.Btn>
        <S.Btn margin="0 0.5em 0.5em 0" onClick={() => updateStatus(4)}>
          배송중 처리
        </S.Btn>
        <S.Btn margin="0 0.5em 0.5em 0" onClick={() => updateStatus(5)}>
          배송완료 처리
        </S.Btn>
        <S.Btn margin="0 0.5em 0.5em 0" onClick={() => updateStatus(0)}>
          취소 처리
        </S.Btn>
        <S.AdminInfoBox>
          <div onClick={() => statusFillter_cancle()}>
            <span className="title">전체주문</span>
            <span className="number">{initOrderlist.length}</span>
          </div>
          <div onClick={() => statusFillter(1)}>
            <span className="title">신규주문</span>
            <span className="number">
              {initOrderlist.filter((el) => el.ORDER_STATUS === 1).length}
            </span>
          </div>
          <div onClick={() => statusFillter(2)}>
            <span className="title">결제완료</span>
            <span className="number">
              {initOrderlist.filter((el) => el.ORDER_STATUS === 2).length}
            </span>
          </div>
          <div onClick={() => statusFillter(3)}>
            <span className="title">배송준비</span>
            <span className="number">
              {initOrderlist.filter((el) => el.ORDER_STATUS === 3).length}
            </span>
          </div>
          <div onClick={() => statusFillter(4)}>
            <span className="title">배송중</span>
            <span className="number">
              {initOrderlist.filter((el) => el.ORDER_STATUS === 4).length}
            </span>
          </div>
          <div onClick={() => statusFillter(5)}>
            <span className="title">배송완료</span>
            <span className="number">
              {initOrderlist.filter((el) => el.ORDER_STATUS === 5).length}
            </span>
          </div>
        </S.AdminInfoBox>
        <S.AdminTable>
          <thead>
            <tr style={{ height: "30px" }}>
              <th style={{ width: "5%" }}>
                <input
                  ref={allCheckbox}
                  type="checkbox"
                  onChange={(e) => {
                    const updated = [...selectedItem];
                    updated.map((el, index) => {
                      el = updated[index] = e.target.checked;
                    });
                    setSelectedItem(updated);
                  }}
                />
              </th>
              <th style={{ width: "10%" }}>주문일 (결제일)</th>
              <th style={{ width: "10%" }}>주문번호</th>
              <th style={{ width: "10%" }}>주문자</th>
              <th style={{ width: "15%" }}>상품명</th>
              <th style={{ width: "10%" }}>결제금액</th>
              <th style={{ width: "5%" }}>결제수단</th>
              <th style={{ width: "10%" }}>결제상태</th>
              <th style={{ width: "5%" }}>취소</th>
              <th style={{ width: "10%" }}>요청사항</th>
              <th style={{ width: "10%" }}>비고</th>
            </tr>
          </thead>
          <tbody>
            {orderlist.length > 0 ? (
              orderlist.map((el, index) => (
                <tr key={index} style={{ height: "100px" }}>
                  <th>
                    <input
                      type="checkbox"
                      onChange={() => {
                        const updated = [...selectedItem];
                        updated[index] = !updated[index];
                        setSelectedItem(updated);
                        console.log(updated);
                      }}
                      checked={selectedItem[index]}
                    />
                  </th>
                  <th>
                    <p>{formatDate(el.ORDER_DATE)}</p>
                    <p>{formatTime(el.ORDER_DATE)}</p>
                    <p>------</p>
                    <p>{formatDate(el.ORDER_PAYMENT_DATE)}</p>
                    <p>{formatTime(el.ORDER_PAYMENT_DATE)}</p>
                  </th>
                  <th>{el.ORDER_SID}</th>
                  <th>
                    <p>
                      {el.USER_ID} ({el.ORDER_NM})
                    </p>
                    <p>{el.ORDER_TEL}</p>
                  </th>
                  <th>
                    <p>{el.ORDER_CORE_PROD}</p>
                    {el.ITEM_SIDS.split(",").length - 1 > 0 ? (
                      <p
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          fontSize: "0.8em",
                          paddingTop: "0.5em",
                        }}
                        onClick={() => {
                          openPopup("orderDetail", { ITEMS: el.ITEM_SIDS });
                        }}
                      >
                        외 {el.ITEM_SIDS.split(",").length - 1}건
                      </p>
                    ) : null}
                  </th>
                  <th>{el.ORDER_AMOUNT.toLocaleString("ko-kr")}</th>
                  <th>{el.ORDER_PAYMENT_TYPE}</th>
                  <th>{renderOrderStatus(el.ORDER_STATUS)}</th>
                  <th></th>
                  <th>{el.ORDER_REQ}</th>
                  <th>
                    <S.Btn
                      onClick={() => {
                        setOrderDetail(el);
                        setOrderDetailVisible(true);
                      }}
                    >
                      상세보기
                    </S.Btn>
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <th colSpan={"100%"} style={{ height: "100px" }}>
                  주문 건이 없습니다.
                </th>
              </tr>
            )}
          </tbody>
        </S.AdminTable>

        {orderDetailVisible && <AdminOrderDetail orderData={orderDetail} />}
      </S.AdminWrapper>
    </S.MainLayout>
  );
};

export default AdminOrder;
