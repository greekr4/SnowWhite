import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import * as S from "../../styles/new_styles";

const PrintEstimate = () => {
  const ref = useRef();

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    documentTitle: "파일 다운로드 시 저장되는 이름 작성",
    onAfterPrint: () => alert("파일 다운로드 후 알림창 생성 가능"),
  });

  return (
    <>
      <S.PrintWrapper>
        <button onClick={handlePrint}>인쇄</button>
        <S.PrintBox ref={ref}>
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
            <tr>
              <td>1</td>
              <td>명함</td>
              <td>90*50</td>
              <td>50</td>
              <td></td>
              <td>{4546 / 50}</td>
              <td>4,546</td>
              <td>454</td>
              <td></td>
            </tr>
            <tr>
              <td>2</td>
              <td>명함</td>
              <td>90*50</td>
              <td>10,000</td>
              <td></td>
              <td>{2545455 / 10000}</td>
              <td>2,545,455</td>
              <td>254,545</td>
              <td></td>
            </tr>
            <tr className="sum">
              <td colSpan={6}>소계</td>
              <td>{(4546 + 2545455).toLocaleString("ko-KR")}</td>
              <td>{(454 + 254545).toLocaleString("ko-KR")}</td>
              <td></td>
            </tr>
            <tr>
              <th colSpan={9}>위와 같이 견적드립니다.</th>
            </tr>
          </table>
        </S.PrintBox>
      </S.PrintWrapper>
    </>
  );
};

export default PrintEstimate;
