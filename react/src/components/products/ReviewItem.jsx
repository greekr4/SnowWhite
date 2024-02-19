import React, { useState } from "react";
import * as S from "../../styles/new_styles";
import reviewImg from "../../assets/products/review.png";
import { useSpring } from "react-spring";
import expand_arrow from "../../assets/icons/expand-arrow.png";
import collapse_arrow from "../../assets/icons/collapse-arrow.png";

const ReviewItem = () => {
  const [isVisible, setIsVisible] = useState(false);

  const ToggleVisible = () => {
    isVisible ? setIsVisible(false) : setIsVisible(true);
  };

  const Animation = useSpring({
    opacity: isVisible ? 1 : 0,
  });

  return (
    <>
      <S.ReviewBox onClick={ToggleVisible}>
        <S.ReviewNum>1</S.ReviewNum>
        <S.ReviewImg img={reviewImg}></S.ReviewImg>
        <S.ReviewContent>
          <h1>제목</h1>
          <span>일반 명함 | 소프트 | 100매</span>
          <span>잘 받았습니다.</span>
          <span>2024.02.19 | admin</span>
        </S.ReviewContent>
        <S.ReviewStarBox>
          <S.Star></S.Star>
          <S.Star></S.Star>
          <S.Star></S.Star>
          <S.Star></S.Star>
          <S.StarEmpty></S.StarEmpty>
          {isVisible ? (
            <S.Arrow img={collapse_arrow} />
          ) : (
            <S.Arrow img={expand_arrow} />
          )}
        </S.ReviewStarBox>
        {isVisible ? (
          <S.ReviewDetailBox style={Animation}>
            <span>선명하게 잘 나왔습니다~잘 쓰겠습니다!</span>
          </S.ReviewDetailBox>
        ) : null}
      </S.ReviewBox>
    </>
  );
};

export default ReviewItem;
