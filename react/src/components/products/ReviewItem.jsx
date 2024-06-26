import React, { useState } from "react";
import * as S from "../../styles/new_styles";
import reviewImg from "../../assets/products/review.png";
import { useSpring } from "react-spring";
import expand_arrow from "../../assets/icons/expand-arrow.png";
import collapse_arrow from "../../assets/icons/collapse-arrow.png";
import { formatDate } from "../../hooks/Utill";

const ReviewItem = ({ reviewData }) => {
  const [isVisible, setIsVisible] = useState(false);

  const ToggleVisible = () => {
    isVisible ? setIsVisible(false) : setIsVisible(true);
  };

  const Animation = useSpring({
    opacity: isVisible ? 1 : 0,
  });

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < reviewData?.REVIEW_STAR; i++) {
      stars.push(<S.Star key={i} />);
    }
    for (let i = reviewData?.REVIEW_STAR; i < 5; i++) {
      stars.push(<S.StarEmpty key={i} />);
    }
    return stars;
  };

  const subTitle = () => {
    if (reviewData?.REVIEW_CONTENT.length > 50) {
      return reviewData?.REVIEW_CONTENT.slice(0, 50) + "...";
    }
    return reviewData?.REVIEW_CONTENT;
  };

  console.log(reviewData);
  return (
    <>
      <S.ReviewBox onClick={ToggleVisible}>
        <S.ReviewNum>{reviewData?.REVIEW_SID}</S.ReviewNum>
        <S.ReviewImg img={reviewData?.IMAGE_LOCATION}></S.ReviewImg>
        <S.ReviewContent>
          <h1>{reviewData?.REVIEW_TITLE}</h1>
          <span>{reviewData?.ORDER_CORE_OPTION}</span>
          <span>자세히 보기</span>
          <span>
            {formatDate(reviewData?.REVIEW_REGDATE)} | {reviewData?.USER_ID}
          </span>
        </S.ReviewContent>
        <S.ReviewStarBox>
          {renderStars()}
          {isVisible ? (
            <S.Arrow img={collapse_arrow} />
          ) : (
            <S.Arrow img={expand_arrow} />
          )}
        </S.ReviewStarBox>
        {isVisible ? (
          <S.ReviewDetailBox style={Animation}>
            <div
              dangerouslySetInnerHTML={{ __html: reviewData?.REVIEW_CONTENT }}
            />
          </S.ReviewDetailBox>
        ) : null}
      </S.ReviewBox>
    </>
  );
};

export default ReviewItem;
