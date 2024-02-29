import React from "react";
import * as S from "../styles/new_styles";
import { Kakaomap } from "../components/global/Kakaomap";

const IntroPage0 = () => {
  return (
    <S.MainLayout>
      <S.MainSection>
        <S.IntroWayWrapper>
          <S.CartTopTitleBox>
            <h1>오시는 길</h1>
            <p>스노우화이트를 찾아 오시는 방법입니다.</p>
          </S.CartTopTitleBox>
          <S.KakaoMapBox>
            <Kakaomap />
            <h1>스노우화이트</h1>
            <div className="sub">
              <h2>주소</h2>
              <p>경기도 고양시 일산동구 장대길 42-17</p>
            </div>
            <div className="sub">
              <h2>연락처</h2>
              <p>1577-1234</p>
            </div>
            <div className="sub">
              <h2>교통안내</h2>
              <p>
                <b>백석역</b> <S.SubwayText>3</S.SubwayText> 하차 <br />
                <br />
                마을버스 <S.BusText>68</S.BusText> <b>일산농협 정류장</b> 하차
                <br />
                <br /> 도보 500m
              </p>
            </div>
          </S.KakaoMapBox>
        </S.IntroWayWrapper>
      </S.MainSection>
    </S.MainLayout>
  );
};

export default IntroPage0;
