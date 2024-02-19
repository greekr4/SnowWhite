import React from "react";
import * as S from "../../styles/new_styles";
import ReviewItem from "./ReviewItem";

const ReviewBoard = () => {
  return (
    <S.BoardBox>
      <S.BoardCateBox>
        <S.BoardCateBtn className="selected">전체 리뷰</S.BoardCateBtn>
        <S.BoardCateBtn>사진 리뷰</S.BoardCateBtn>
      </S.BoardCateBox>
      <S.BoardContentBox>
        <S.BoardContentList>
          <ReviewItem></ReviewItem>
          <ReviewItem></ReviewItem>
        </S.BoardContentList>
      </S.BoardContentBox>
      <S.BoardPageBox>
        <S.BoardPagePrev />
        <S.BoardPageNum className="selected">1</S.BoardPageNum>
        <S.BoardPageNum>2</S.BoardPageNum>
        <S.BoardPageNum>3</S.BoardPageNum>
        <S.BoardPageNext />
      </S.BoardPageBox>
    </S.BoardBox>
  );
};

export default ReviewBoard;
