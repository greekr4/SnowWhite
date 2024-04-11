import React, { useEffect, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import axios from "axios";
import { formatDate, formatTime } from "../../hooks/Utill";

const AdminOrderDetail = ({ orderData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);

  const [selectedItem, setSelectedItem] = useState([]);
  const allCheckbox = useRef(null);

  useEffect(() => {
    initdb();
  }, [orderData]);

  useEffect(() => {
    const initSelectedItem = Array.from({ length: items?.length }, () => false);
    console.log(initSelectedItem);
    setSelectedItem(initSelectedItem);
  }, [items]);

  const initdb = async () => {
    getItem();
    allCheckbox.current.checked = false;
  };

  const getItem = async () => {
    const item_sids = [];
    orderData?.ITEM_SIDS.split(",").map((orderData) =>
      item_sids.push(orderData)
    );
    setIsLoading(true);
    const res = await axios.post("api/orderlist/item", {
      item_sids: item_sids,
    });
    setItems(res.data);
    console.log(res);
    setIsLoading(false);
  };

  const renderItemStatus = (status) => {
    switch (status) {
      case 1:
        return "미처리";
      case 2:
        return "준비중";
      case 3:
        return "준비완료";
      case 4:
        return "";

      default:
        return "??";
    }
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

  const updateStatus = async (value) => {
    const result = window.confirm("변경 하시겠습니까?");
    if (!result) {
      return false;
    }

    const item_sids = [];

    console.log(items);
    console.log(selectedItem);
    selectedItem.map((el, index) => {
      if (el) {
        item_sids.push(items[index].ITEM_SID);
      }
    });

    console.log(item_sids);

    const res = await axios.put("/api/admin/custom_item", {
      item_sid: item_sids,
      field: "ITEM_STATUS",
      item_status: value,
    });

    initdb();
    allCheckbox.current.checked = false;
  };

  return (
    <S.MainLayout>
      <S.AdminWrapper>
        주문 정보
        <S.AdminTable>
          <thead>
            <tr>
              <th style={{ width: "5%" }}></th>
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
            <tr style={{ height: "100px" }}>
              <th></th>
              <th>
                <p>{formatDate(orderData.ORDER_DATE)}</p>
                <p>{formatTime(orderData.ORDER_DATE)}</p>
                <p>------</p>
                <p>{formatDate(orderData.ORDER_PAYMENT_DATE)}</p>
                <p>{formatTime(orderData.ORDER_PAYMENT_DATE)}</p>
              </th>
              <th>{orderData.ORDER_SID}</th>
              <th>
                <p>
                  {orderData.USER_ID} ({orderData.ORDER_NM})
                </p>
                <p>{orderData.ORDER_TEL}</p>
              </th>
              <th>
                <p>{orderData.ORDER_CORE_PROD}</p>
                {orderData.ITEM_SIDS.split(",").length - 1 > 0 ? (
                  <p
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: "0.8em",
                      paddingTop: "0.5em",
                    }}
                    // onClick={() => {
                    //   openPopup("orderDetail", { ITEMS: orderData.ITEM_SIDS });
                    // }}
                  >
                    외 {orderData.ITEM_SIDS.split(",").length - 1}건
                  </p>
                ) : null}
              </th>
              <th>{orderData.ORDER_AMOUNT.toLocaleString("ko-kr")}</th>
              <th>{orderData.ORDER_PAYMENT_TYPE}</th>
              <th>{renderOrderStatus(orderData.ORDER_STATUS)}</th>
              <th></th>
              <th>{orderData.ORDER_REQ}</th>
              <th></th>
            </tr>
          </tbody>
        </S.AdminTable>
        주문 상품
        <div>
          <S.Btn margin="0 0.5em 0.5em 0" onClick={() => updateStatus(1)}>
            미처리
          </S.Btn>
          <S.Btn margin="0 0.5em 0.5em 0" onClick={() => updateStatus(2)}>
            준비중 처리
          </S.Btn>
          <S.Btn margin="0 0.5em 0.5em 0" onClick={() => updateStatus(3)}>
            준비완료 처리
          </S.Btn>
        </div>
        <S.AdminTable>
          <thead>
            <tr>
              <th style={{ width: "5%" }}>
                <input
                  type="checkbox"
                  ref={allCheckbox}
                  onChange={(e) => {
                    const updated = [...selectedItem];
                    updated.map((el, index) => {
                      el = updated[index] = e.target.checked;
                    });
                    setSelectedItem(updated);
                  }}
                />
              </th>
              <th style={{ width: "10%" }}>주문상품</th>
              <th style={{ width: "36%" }}>옵션</th>
              <th style={{ width: "8" }}>직접 디자인</th>
              <th style={{ width: "8%" }}>디자인 파일</th>
              <th style={{ width: "8%" }}>수량</th>
              <th style={{ width: "8%" }}>상품금액</th>
              <th style={{ width: "8%" }}>할인금액</th>
              <th style={{ width: "7%" }}>상태</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr style={{ height: "50px" }}>
                <th colSpan={"100%"}>Loading...</th>
              </tr>
            ) : (
              items.map((orderData, index) => (
                <tr style={{ height: "50px" }}>
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
                  <th>{orderData.PROD_NM}</th>
                  <th>
                    {orderData.ITEM_OPTION.map((option, index) =>
                      index < orderData.ITEM_OPTION.length - 1 ? (
                        <>
                          {option.OPTION_CATE}-{option.OPTION_NM} /{" "}
                        </>
                      ) : (
                        <>
                          {option.OPTION_CATE}-{option.OPTION_NM}
                        </>
                      )
                    )}
                  </th>
                  <th></th>
                  <th>
                    {orderData.ITEM_FILE_LOCATION && (
                      <S.Btn
                        onClick={() => {
                          window.open(orderData.ITEM_FILE_LOCATION);
                        }}
                      >
                        보기
                      </S.Btn>
                    )}
                  </th>
                  <th>{orderData.ITEM_QUANTITY.toLocaleString("ko-kr")}</th>
                  <th>{orderData.ITEM_AMOUNT.toLocaleString("ko-kr")}</th>
                  <th>{0}</th>
                  <th>{renderItemStatus(orderData.ITEM_STATUS)}</th>
                </tr>
              ))
            )}
          </tbody>
        </S.AdminTable>
        배송지 정보
        <S.AdminTable>
          <thead>
            <tr>
              <th style={{ width: "30%" }}>배송지 주소</th>
              <th style={{ width: "15%" }}>나머지 주소</th>
              <th style={{ width: "10%" }}>우편번호</th>
              <th style={{ width: "15%" }}>받는 분</th>
              <th style={{ width: "15%" }}>요청사항</th>
              <th style={{ width: "15%" }}>송장번호</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ height: "50px" }}>
              <th>{orderData.ORDER_ADDRESS}</th>
              <th>{orderData.ORDER_ADD_ADDRESS}</th>
              <th>{orderData.ORDER_POSTCODE}</th>
              <th>
                <p>{orderData.ORDER_REC}</p>
                <p>{orderData.ORDER_TEL}</p>
              </th>
              <th>{orderData.ORDER_REQ}</th>
              <th>{orderData.ORDER_INVOICE}</th>
            </tr>
          </tbody>
        </S.AdminTable>
      </S.AdminWrapper>
    </S.MainLayout>
  );
};

export default AdminOrderDetail;
