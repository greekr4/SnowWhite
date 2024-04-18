import React, { useEffect, useState } from "react";
import * as S from "../../styles/new_styles";
import ReviewItem from "./ReviewItem";
import Pagination from "react-js-pagination";
import arrow_left from "../../assets/icons/arrow_left.png";
import arrow_right from "../../assets/icons/arrow_right.png";

const ReviewBoard = ({ reviewData }) => {
  const [initReviewData, setInitReviewData] = useState([]);
  const [ReviewData, setReviewData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(5);

  useEffect(() => {
    console.log(reviewData);
    reviewData?.length
      ? setInitReviewData([...reviewData])
      : setInitReviewData([]);
    reviewData?.length
      ? setReviewData(reviewData.slice(0, countPerPage))
      : setReviewData([]);
  }, [reviewData]);

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
    const pageItems = getPageItems(initReviewData, e, countPerPage);
    setReviewData(pageItems);
  };
  return (
    <S.BoardBox>
      <S.BoardCateBox>
        {/* <S.BoardCateBtn className="selected"> */}
        <p>전체 리뷰 {(initReviewData?.length).toLocaleString("ko-kr")} 건</p>
        {/* </S.BoardCateBtn> */}
      </S.BoardCateBox>
      <S.BoardContentBox>
        <S.BoardContentList>
          {ReviewData?.length > 0 ? (
            ReviewData?.map((el, index) => <ReviewItem reviewData={el} />)
          ) : (
            <h1
              style={{
                fontSize: "1.5rem",
                textAlign: "center",
                padding: "2em",
              }}
            >
              아직 리뷰가 없습니다.
            </h1>
          )}
        </S.BoardContentList>
      </S.BoardContentBox>
      <S.PaginationBox>
        <Pagination
          // 현제 보고있는 페이지
          activePage={currentPage}
          // 한페이지에 출력할 아이템수
          itemsCountPerPage={countPerPage}
          // 총 아이템수
          totalItemsCount={initReviewData?.length}
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
    </S.BoardBox>
  );
};

export default ReviewBoard;
