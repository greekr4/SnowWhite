import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { formatDateAndTime, formatNumber } from "../../hooks/Utill";
import { Padding } from "@mui/icons-material";

const AdminOrderDetail = () => {
  const { order_sid } = useParams();

  const [orderData, setOrderData] = useState();
  const [customProdData, setCustomProdData] = useState();

  const initdb = async () => {
    const res_order = await axios.get(
      process.env.REACT_APP_DB_HOST + "/api/order_detail",
      {
        params: {
          order_sid: order_sid,
        },
      }
    );
    const item_sids = res_order.data.ITEM_SIDS.split(",");
    console.log(res_order.data.ITEM_SIDS.split(","));

    const res_custom_prod = await axios.post(
      process.env.REACT_APP_DB_HOST + "/api/orderlist/item",
      {
        item_sids: item_sids,
      }
    );

    setCustomProdData(res_custom_prod.data);
    setOrderData(res_order.data);
  };

  useEffect(() => {
    initdb();
  }, []);

  const HeadCell = styled(TableCell)`
    font-weight: 550;
  `;

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
      case 9:
        return "취소";
      default:
        return "Code error";
    }
  };

  return (
    <>
      {orderData !== undefined && customProdData !== undefined ? (
        <>
          <Box
            sx={{
              textAlign: "center",
              backgroundColor: "#1976d2",
              color: "#fff",
              padding: "24px",
              fontSize: "24px",
            }}
          >
            주문 상세
          </Box>
          <Box sx={{}}>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "#fafafa" }}>
                  <TableRow>
                    <HeadCell>주문일</HeadCell>
                    <HeadCell>결제일</HeadCell>
                    <HeadCell>주문번호</HeadCell>
                    <HeadCell>주문자</HeadCell>
                    <HeadCell>상품명</HeadCell>
                    <HeadCell>결제금액</HeadCell>
                    <HeadCell>결제수단</HeadCell>
                    <HeadCell>결제상태</HeadCell>
                    <HeadCell>택배사</HeadCell>
                    <HeadCell>요청사항</HeadCell>
                    <HeadCell>비고</HeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {formatDateAndTime(orderData?.ORDER_DATE)}
                    </TableCell>
                    <TableCell>
                      {formatDateAndTime(orderData?.ORDER_PAYMENT_DATE)}
                    </TableCell>
                    <TableCell>{orderData?.ORDER_SID}</TableCell>
                    <TableCell>{orderData?.ORDER_NM}</TableCell>
                    <TableCell>
                      {orderData?.ORDER_CORE_PROD}{" "}
                      {customProdData?.length > 1
                        ? `외 ${customProdData?.length - 1}건`
                        : ""}
                    </TableCell>
                    <TableCell>
                      {formatNumber(orderData?.ORDER_AMOUNT)}
                    </TableCell>
                    <TableCell>
                      {orderData?.ORDER_PAYMENT_TYPE === "pm1"
                        ? "일반 결제"
                        : orderData?.ORDER_PAYMENT_TYPE === "pm2"
                        ? "무통장 결제"
                        : "?"}
                    </TableCell>
                    <TableCell>
                      {renderOrderStatus(orderData?.ORDER_STATUS)}
                    </TableCell>
                    <TableCell>
                      <p>{orderData?.ORDER_LOGIS_NM}</p>
                      <p>{orderData?.ORDER_LOGIS_NO}</p>
                    </TableCell>
                    <TableCell>{orderData?.ORDER_REQ}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              textAlign: "center",
              backgroundColor: "#fff",
              color: "#333",
              padding: "24px",
              fontSize: "24px",
            }}
          >
            상품 상세
          </Box>
          <Box sx={{}}>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "#fafafa" }}>
                  <TableRow>
                    <HeadCell>주문상품</HeadCell>
                    <HeadCell>옵션</HeadCell>
                    <HeadCell>디자인</HeadCell>
                    <HeadCell>수량</HeadCell>
                    <HeadCell>금액</HeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customProdData?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.PROD_NM}</TableCell>
                      <TableCell>{item.ITEM_OPTION}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => {
                            window.open(item.ITEM_FILE_LOCATION);
                          }}
                        >
                          시안 확인
                        </Button>
                      </TableCell>
                      <TableCell>{formatNumber(item.ITEM_QUANTITY)}</TableCell>
                      <TableCell>{formatNumber(item.ITEM_AMOUNT)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              textAlign: "center",
              backgroundColor: "#fff",
              color: "#333",
              padding: "24px",
              fontSize: "24px",
            }}
          >
            배송지 상세
          </Box>
          <Box sx={{}}>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "#fafafa" }}>
                  <TableRow>
                    <HeadCell>배송지 주소</HeadCell>
                    <HeadCell>받는분</HeadCell>
                    <HeadCell>받는분 전화번호</HeadCell>
                    <HeadCell>요청사항</HeadCell>
                    <HeadCell>택배사</HeadCell>
                    <HeadCell>송장번호</HeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {orderData?.ORDER_ADDRESS} {orderData?.ORDER_ADD_ADDRESS}{" "}
                      ({orderData?.ORDER_POSTCODE})
                    </TableCell>
                    <TableCell>{orderData?.ORDER_REC}</TableCell>
                    <TableCell>{orderData?.REC_TEL}</TableCell>
                    <TableCell>{orderData?.ORDER_REQ}</TableCell>
                    <TableCell>{orderData?.ORDER_LOGIS_NM}</TableCell>
                    <TableCell>{orderData?.ORDER_LOGIS_NO}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </>
      ) : (
        <>
          <CircularProgress />
        </>
      )}
    </>
  );
};

export default AdminOrderDetail;
