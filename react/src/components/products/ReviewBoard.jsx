import React from "react";
import * as S from "../../styles/new_styles";
import ReviewItem from "./ReviewItem";

const ReviewBoard = ({ reviewDatas }) => {
  console.log(reviewDatas);
  return (
    <S.BoardBox>
      <S.BoardCateBox>
        <S.BoardCateBtn className="selected">전체 리뷰</S.BoardCateBtn>
        <S.BoardCateBtn>사진 리뷰</S.BoardCateBtn>
      </S.BoardCateBox>
      <S.BoardContentBox>
        <S.BoardContentList>
          {reviewDatas?.length > 0 ? (
            reviewDatas?.map((el, index) => <ReviewItem reviewData={el} />)
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
      <S.BoardPageBox>
        <S.BoardPagePrev />
        <S.BoardPageNum className="selected">1</S.BoardPageNum>
        {/* <S.BoardPageNum>2</S.BoardPageNum>
        <S.BoardPageNum>3</S.BoardPageNum> */}
        <S.BoardPageNext />
      </S.BoardPageBox>
    </S.BoardBox>
  );
};

export default ReviewBoard;
