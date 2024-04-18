import { useEffect, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import { useSpring, animated } from "react-spring";
import axios from "axios";
import CustomQuill from "../global/CustomQuill";

const PopReviewDetail = ({ openPopup, closePopup, popupData }) => {
  const [reviewTitle, setReviewTitle] = useState();
  const [reviewContent, setReviewContent] = useState();
  const [reviewStar, setReviewStar] = useState(0);
  const [holdStar, setHoldStar] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const inputRefs = useRef([]);

  const fadeInAnimation = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { tension: 200, friction: 20 },
  });

  useEffect(() => {
    console.log("popdata", popupData);
    initdb();
  }, [popupData]);

  useEffect(() => {
    setReviewStar(reviewData[0]?.REVIEW_STAR);
  }, [reviewData]);

  const initdb = async () => {
    setReviewData(
      (
        await axios.post(process.env.REACT_APP_DB_HOST + "/api/review", {
          order_sid: popupData.order_sid,
        })
      ).data
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
              <S.Pop_Title>내가 쓴 리뷰</S.Pop_Title>
              {/* <S.Pop_OrderDetail_ProdBox>
                <img src={reviewData[0]?.IMAGE_LOCATION} />
              </S.Pop_OrderDetail_ProdBox> */}
              <h1
                style={{
                  padding: "1em 0 0.5em 0",
                  fontSize: "1.25em",
                  fontWeight: "550",
                }}
              >
                {reviewData[0]?.PROD_NM}
              </h1>
              <p
                style={{
                  fontSize: "0.8em",
                  paddingBottom: "1em",
                  color: "#777",
                }}
              >
                {reviewData[0]?.ORDER_CORE_OPTION}
              </p>
              <div style={{ marginBottom: "1em" }}>
                <S.StarChanging star={reviewStar > 0 && "on"} />
                <S.StarChanging star={reviewStar > 1 && "on"} />
                <S.StarChanging star={reviewStar > 2 && "on"} />
                <S.StarChanging star={reviewStar > 3 && "on"} />
                <S.StarChanging star={reviewStar > 4 && "on"} />
              </div>
              <S.Pop_Input
                style={{ marginBottom: "1em" }}
                value={reviewData[0]?.REVIEW_TITLE}
                onChange={(e) => setReviewTitle(e.target.value)}
                ref={(el) => (inputRefs.current[0] = el)}
                disabled
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: reviewData[0]?.REVIEW_CONTENT,
                }}
              />
              {/* <S.Pop_Button_Wrap>
                <S.Global_Button onClick={closePopup}>닫기</S.Global_Button>
              </S.Pop_Button_Wrap> */}
            </S.Pop_form>
          </S.Pop_Container>
        </animated.div>
      </S.Pop_overlay>
    </>
  );
};

export default PopReviewDetail;
