import { useEffect, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import { useSpring, animated } from "react-spring";
import { formatDateAndTime } from "../../hooks/Utill";

const LogisItem = ({ data, index, lastindex }) => {
  return (
    <S.PopLogisItem>
      <div className={`circle ${index === 0 ? "selected" : ""}`} />
      {index != lastindex - 1 && (
        <div className="linebox">
          <div className="line"></div>
        </div>
      )}
      <div className="info">
        {" "}
        <span className="location">
          {data.node.description.split(" - ")[0]}
        </span>
        {" | "}
        <span className="status">{data.node.status.name}</span>
      </div>

      {/* <h2>{data.node.description}</h2> */}
      <div className="time">{formatDateAndTime(data.node.time)}</div>
      {/* <h3>{formatDateAndTime(data.node.time)}</h3> */}
    </S.PopLogisItem>
  );
};

const PopLogisDetail = ({ openPopup, closePopup, popupData }) => {
  const [tarckData, setTrackData] = useState([]);

  const fadeInAnimation = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { tension: 200, friction: 20 },
  });

  const replaceLogisNm = (NM) => {
    switch (NM) {
      case "CJ택배":
        return "kr.cjlogistics";
      case "롯데택배":
        return "kr.lotte";
      case "로젠택배":
        return "kr.logen";
      default:
        return null;
    }
  };

  const getToken = async () => {
    const url = "https://auth.tracker.delivery/oauth2/token";
    const params =
      "?grant_type=client_credentials&client_id=52ct0v88mspvl4h4ovspsrrp9h&client_secret=1f2er0ahub2q8i2rg8v74hsgj4i8157go646k10i3phu9kp38n2h";

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    try {
      const res = await fetch(url + params, config);
      return await res.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getLogisTrack = async () => {
    const token = (await getToken()).access_token;
    console.log("token", token);
    const url = "https://apis.tracker.delivery/graphql";
    const requestBody = {
      query:
        "query Track($carrierId: ID!, $trackingNumber: String!) { track(carrierId: $carrierId, trackingNumber: $trackingNumber) { lastEvent { time status { code name } description } events(last: 10) { edges { node { time status { code name } description } } } } }",
      variables: {
        carrierId: replaceLogisNm(popupData?.ORDER_LOGIS_NM),
        trackingNumber: popupData?.ORDER_LOGIS_NO,
      },
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    };

    try {
      const response = await fetch(url, config);
      const responseData = await response.json();
      console.log(responseData);
      setTrackData(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <S.Pop_overlay>
        <S.Btn onClick={getLogisTrack}>test</S.Btn>
        <animated.div style={fadeInAnimation}>
          <S.Pop_Container
            widthValue="440"
            heightValue="300"
            style={{
              height: "700px",
            }}
          >
            <S.Pop_Close_btn onClick={closePopup}>
              <S.Pop_Close_span>×</S.Pop_Close_span>
            </S.Pop_Close_btn>
            <S.PopLogisWrapper>
              <S.Pop_Title
                style={{
                  fontSize: "1.5em",
                }}
              >
                배송 확인
              </S.Pop_Title>
              <S.PopLogisTitleBox>
                <div className="notice">운송장번호</div>
                <div className="logis_no"> {popupData?.ORDER_LOGIS_NO}</div>
                <div className="logis_nm">{popupData?.ORDER_LOGIS_NM}</div>
              </S.PopLogisTitleBox>
              <S.PopLogisIconBox>
                <div>
                  <S.PopLogisIcon icon={"icons/delivery_0.png"} />
                  <p>상품인수</p>
                </div>
                <div>
                  <S.PopLogisIcon icon={"icons/delivery_1.png"} />
                  <p>상품이동중</p>
                </div>
                <div>
                  <S.PopLogisIcon icon={"icons/delivery_2.png"} />
                  <p>배송지도착</p>
                </div>
                <div>
                  <S.PopLogisIcon icon={"icons/delivery_3.png"} />
                  <p>배송출발</p>
                </div>
                <div className="selected">
                  <S.PopLogisIcon icon={"icons/delivery_4.png"} />
                  <p>배송완료</p>
                </div>
              </S.PopLogisIconBox>
              {/* {tarckData?.data?.track?.lastEvent.description} */}
              <S.PopLogisItemBox>
                {tarckData?.data?.track?.events?.edges
                  .reverse()
                  .map((el, index) => (
                    <LogisItem
                      key={index}
                      data={el}
                      index={index}
                      lastindex={tarckData?.data?.track?.events?.edges?.length}
                    />
                  ))}
              </S.PopLogisItemBox>
            </S.PopLogisWrapper>
          </S.Pop_Container>
        </animated.div>
      </S.Pop_overlay>
    </>
  );
};

export default PopLogisDetail;
