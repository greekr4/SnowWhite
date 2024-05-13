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
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelIcon from "@mui/icons-material/Cancel";
import RateReviewIcon from "@mui/icons-material/RateReview";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Call } from "@mui/icons-material";

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
      case 9:
        return "취소";
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

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAmt, setDialogAmt] = useState(0);

  const updateStatus = async (order_sid) => {
    const result = window.confirm("취소 하시겠습니까?");
    if (!result) {
      return false;
    }
    const res = await axios.put(
      process.env.REACT_APP_DB_HOST + "/api/admin/order",
      {
        order_sid: order_sid,
        field: "ORDER_STATUS",
        order_status: 9,
      }
    );

    initdb();
  };
  return (
    <>
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
                                openPopup("orderDetail", {
                                  ITEMS: el.ITEM_SIDS,
                                })
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
                        <td>
                          {renderStatus(el.ORDER_STATUS)}
                          {el.ORDER_STATUS === 1 &&
                            el.ORDER_PAYMENT_TYPE === "pm2" && (
                              <div>
                                <Button
                                  variant="contained"
                                  color="info"
                                  size="small"
                                  sx={{
                                    fontSize: "10px",
                                    margin: "5px auto",
                                  }}
                                  onClick={() => {
                                    setDialogOpen(true);
                                    setDialogAmt(el.ORDER_AMOUNT);
                                  }}
                                >
                                  계좌확인
                                </Button>
                              </div>
                            )}
                        </td>
                        <td>
                          {el.ORDER_STATUS < 2 ? (
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<CancelIcon />}
                              onClick={() => {
                                updateStatus(el.ORDER_SID);
                              }}
                            >
                              취소하기
                            </Button>
                          ) : el.ORDER_STATUS === 4 ? (
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<LocalShippingIcon />}
                              onClick={() => {
                                openPopup("logisDetail", {
                                  ORDER_LOGIS_NM: el.ORDER_LOGIS_NM,
                                  ORDER_LOGIS_NO: el.ORDER_LOGIS_NO,
                                });
                              }}
                            >
                              배송추적
                            </Button>
                          ) : el.ORDER_STATUS === 5 &&
                            el.ORDER_REVIEW === "N" ? (
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<RateReviewIcon />}
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
                            </Button>
                          ) : el.ORDER_STATUS === 5 &&
                            el.ORDER_REVIEW === "Y" ? (
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<VisibilityIcon />}
                              onClick={() => {
                                openPopup("reviewDetail", {
                                  order_sid: el.ORDER_SID,
                                });
                              }}
                            >
                              리뷰확인
                            </Button>
                          ) : // ) : el.ORDER_STATUS === 2 ? (
                          //   <Button
                          //     variant="outlined"
                          //     size="small"
                          //     startIcon={<Call />}
                          //     onClick={() => {
                          //       openPopup("reviewDetail", {
                          //         order_sid: el.ORDER_SID,
                          //       });
                          //     }}
                          //   >
                          //     취소문의
                          //   </Button>
                          null}
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
                결제 주문후 2~4일 이내 발송 됩니다. (토, 일, 공휴일은
                배송기일에서 제외됩니다.)
              </p>
              <p>단, 도서 지역은 배송기일이 추가적으로 소요 될 수 있습니다.</p>
            </S.CartBotNotiBox>
          </S.CartBotWrapper>
        </S.MainSection>
      </S.MainLayout>
      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ textAlign: "center", width: "350px" }}
        >
          계좌번호 안내
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textAlign: "center" }}
          >
            기업은행 452-043731-04-021
            <br />
            예금주 : (주)스노우화이트
            <br />
            <b>{parseInt(dialogAmt).toLocaleString("ko-kr")}원</b> 입금
            부탁드립니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogOpen(false);
            }}
            autoFocus
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderListPage;
