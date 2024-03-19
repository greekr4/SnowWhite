import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import * as S from "../../styles/new_styles";
import { useSpring } from "react-spring";

const PrintEstimate = ({ printVisible, handlePrintVisible, estimateData }) => {
  const [maxHeight, setMaxHeight] = useState(0);
  const [sumPrice, setSumPrice] = useState();
  const [sumTax, setSumTax] = useState();

  const Printref = useRef();
  const Btnsref = useRef();

  useEffect(() => {
    if (Printref.current && Btnsref.current) {
      setMaxHeight(
        Printref.current.offsetHeight + Btnsref.current.offsetHeight
      );
    }
    //소계 계산
    let subtotal = 0;
    let tax = 0;
    estimateData.forEach((el) => {
      const subtotalPerItem = Math.floor(
        el.ITEM_AMOUNT - (el.ITEM_AMOUNT * 10) / 110
      );
      const taxPerItem = Math.floor((el.ITEM_AMOUNT * 10) / 110);
      subtotal += subtotalPerItem;
      tax += taxPerItem;
    });
    setSumPrice(subtotal);
    setSumTax(tax);
  }, [printVisible]);

  const handlePrint = useReactToPrint({
    content: () => Printref.current,
    documentTitle: "견적서",
    // onAfterPrint: () => alert("파일 다운로드 후 알림창 생성 가능"),
  });

  const SlideDown = useSpring({
    height: printVisible ? maxHeight + "px" : 0 + "px",
    boxShadow: printVisible ? "2px 2px 8px #aaa" : "0px 0px 0px #aaa",
    border: printVisible ? "1px solid #eee" : "0px solid #eee",
  });

  return (
    <>
      <S.PrintWrapper
        style={SlideDown}
        // height={Printref.current.offsetHeight + Btnsref.current.offsetHeight}
      >
        <S.PrintBox ref={Printref}>
          <h1>견적서</h1>
          <table className="top">
            <thead>
              <tr>
                <td rowSpan={5}>
                  일자 : 2024년 03월 18일
                  <br />
                  김태균 귀하
                </td>
                <th rowSpan={5}>공급자</th>
                <th>등록번호</th>
                <td colSpan={3}>123-45-678</td>
              </tr>
              <tr>
                <th>상호명</th>
                <td>(주)스노우화이트</td>
                <th>성명</th>
                <td>김태균</td>
              </tr>
              <tr>
                <th>사업장주소</th>
                <td colSpan={3}>경기도 고양시 일산동구 장대길42-17</td>
              </tr>
              <tr>
                <th>업태</th>
                <td>인쇄기획사</td>
                <th>업종</th>
                <td>서비스업</td>
              </tr>
              <tr>
                <th>전화번호</th>
                <td>010-1234-5678</td>
                <th>팩스</th>
                <td>031-123-4567</td>
              </tr>
            </thead>
          </table>
          <table className="bottom">
            <tr>
              <th>no</th>
              <th>품명</th>
              <th>규격</th>
              <th>수량</th>
              <th>도</th>
              <th>단가</th>
              <th>공급가액</th>
              <th>세액</th>
              <th>비고</th>
            </tr>
            {estimateData.map((el, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{el.PROD_NM}</td>
                <td>{el.PROD_STANDARD}</td>
                <td>{el.ITEM_QUANTITY?.toLocaleString("ko-KR")}</td>
                <td>{el.PROD_DO}</td>
                <td>
                  {((el.ITEM_AMOUNT * 0.9) / el.ITEM_QUANTITY)?.toLocaleString(
                    "ko-KR"
                  )}
                </td>
                <td>
                  {Math.floor(
                    el.ITEM_AMOUNT - (el.ITEM_AMOUNT * 10) / 110
                  )?.toLocaleString("ko-KR")}
                </td>
                <td>
                  {Math.floor((el.ITEM_AMOUNT * 10) / 110)?.toLocaleString(
                    "ko-KR"
                  )}
                </td>
                <td></td>
              </tr>
            ))}
            <tr className="sum">
              <td colSpan={6}>소계</td>
              <td>{sumPrice?.toLocaleString("ko-KR")}</td>
              <td>{sumTax?.toLocaleString("ko-KR")}</td>
              <td></td>
            </tr>
            <tr>
              <th colSpan={9}>위와 같이 견적드립니다.</th>
            </tr>
          </table>
        </S.PrintBox>
        <S.PrintBtnBox ref={Btnsref}>
          <S.Btn
            btnBgc="#469cff"
            fontColor="#fff"
            btnBgcHover="#7cb9ff"
            borderCHover="none"
            margin="0 0.5rem 0 0"
            onClick={handlePrint}
          >
            인쇄하기
          </S.Btn>
          <S.Btn onClick={handlePrintVisible}>취소하기</S.Btn>
        </S.PrintBtnBox>
      </S.PrintWrapper>
    </>
  );
};

export default PrintEstimate;
