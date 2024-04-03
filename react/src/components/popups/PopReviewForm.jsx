import { useState } from "react";
import * as S from "../../styles/new_styles";
import { useSpring, animated } from "react-spring";

const PopReviewForm = ({ openPopup, closePopup, popupData }) => {
  const [reviewTitle, setReviewTitle] = useState();
  const [reviewContent, setReviewContent] = useState();
  const [reviewStar, setReviewStar] = useState(0);
  const [holdStar, setHoldStar] = useState(false);

  const fadeInAnimation = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { tension: 200, friction: 20 },
  });

  const handleReviewSend = async () => {
    console.log(
      popupData.PROD_SID,
      reviewTitle,
      reviewContent,
      popupData.PROD_CATECODE,
      popupData.ORDER_SID
    );
  };

  return (
    <>
      <S.Pop_overlay>
        <animated.div style={fadeInAnimation}>
          <S.Pop_Container widthValue="440" heightValue="300">
            <S.Pop_Close_btn onClick={closePopup}>
              <S.Pop_Close_span>×</S.Pop_Close_span>
            </S.Pop_Close_btn>
            <S.Pop_form>
              <S.Pop_Title>리뷰 작성하기</S.Pop_Title>
              <h1
                style={{
                  padding: "1em 0 0.5em 0",
                  fontSize: "1.25em",
                  fontWeight: "550",
                }}
              >
                {popupData?.PROD_NM}
              </h1>
              <p
                style={{
                  fontSize: "0.8em",
                  paddingBottom: "1em",
                  color: "#777",
                }}
              >
                {popupData?.ITEM_OPTION.map((option, index) => (
                  <>
                    {option.OPTION_CATE} - {option.OPTION_NM}
                    {index != popupData.ITEM_OPTION.length - 1 && " / "}
                  </>
                ))}
              </p>
              <div>
                <S.StarChanging
                  onMouseLeave={() => {
                    !holdStar && setReviewStar(0);
                  }}
                  onMouseOver={() => {
                    !holdStar && setReviewStar(1);
                  }}
                  onClick={() => {
                    setReviewStar(1);
                    setHoldStar(!holdStar);
                  }}
                  star={reviewStar > 0 && "on"}
                />
                <S.StarChanging
                  onMouseLeave={() => {
                    !holdStar && setReviewStar(0);
                  }}
                  onMouseOver={() => {
                    !holdStar && setReviewStar(2);
                  }}
                  onClick={() => {
                    setReviewStar(2);
                    setHoldStar(!holdStar);
                  }}
                  star={reviewStar > 1 && "on"}
                />
                <S.StarChanging
                  onMouseLeave={() => {
                    !holdStar && setReviewStar(0);
                  }}
                  onMouseOver={() => {
                    !holdStar && setReviewStar(3);
                  }}
                  onClick={() => {
                    setReviewStar(3);
                    setHoldStar(!holdStar);
                  }}
                  star={reviewStar > 2 && "on"}
                />
                <S.StarChanging
                  onMouseLeave={() => {
                    !holdStar && setReviewStar(0);
                  }}
                  onMouseOver={() => {
                    !holdStar && setReviewStar(4);
                  }}
                  onClick={() => {
                    setReviewStar(4);
                    setHoldStar(!holdStar);
                  }}
                  star={reviewStar > 3 && "on"}
                />
                <S.StarChanging
                  onMouseLeave={() => {
                    !holdStar && setReviewStar(0);
                  }}
                  onMouseOver={() => {
                    !holdStar && setReviewStar(5);
                  }}
                  onClick={() => {
                    setReviewStar(5);
                    setHoldStar(!holdStar);
                  }}
                  star={reviewStar > 4 && "on"}
                />
              </div>
              <S.Pop_Input
                placeholder="리뷰 제목"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
              />
              <S.Pop_Textarea
                placeholder="리뷰 내용"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />
              <S.Pop_Info_Wrap>
                <S.Pop_Info_Title>유의사항</S.Pop_Info_Title>
                <S.Pop_Info_Desc>
                  주문이 여러 건일 경우 대표 상품으로 작성됩니다.
                </S.Pop_Info_Desc>
              </S.Pop_Info_Wrap>
              <S.Pop_Button_Wrap>
                <S.Global_Button onClick={handleReviewSend}>
                  리뷰 작성
                </S.Global_Button>
              </S.Pop_Button_Wrap>
            </S.Pop_form>
          </S.Pop_Container>
        </animated.div>
      </S.Pop_overlay>
    </>
  );
};

export default PopReviewForm;
