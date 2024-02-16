import EventProdItem from "../components/main/EventProdItem";
import PortfolioItem from "../components/main/PortfolioItem";
import * as S from "../styles/new_styles";
import React from "react";
import BottomBannerImg from "../assets/bottom_banner.png";

const MainPage2 = () => {
  return (
    <S.MainLayout>
      <S.MainSection>
        <S.MainBannerBox></S.MainBannerBox>
      </S.MainSection>
      <S.MainSection bgc="#fff">
        <S.MainEventProdWrapper>
          <S.EventProdList>
            <EventProdItem />
            <EventProdItem />
            <EventProdItem />
            <EventProdItem />
            <EventProdItem />
            <EventProdItem />
          </S.EventProdList>
        </S.MainEventProdWrapper>
      </S.MainSection>
      <S.MainSection bgc="#f9fafc">
        <S.MainPortfolioWrapper>
          <S.PortfolioTextBox>
            <S.PortfolioTitle>스노우화이트 Portfolio</S.PortfolioTitle>
          </S.PortfolioTextBox>
          <S.PortfolioList>
            <PortfolioItem />
            <PortfolioItem />
            <PortfolioItem />
            <PortfolioItem />
            <PortfolioItem />
            <PortfolioItem />
            <PortfolioItem />
            <PortfolioItem />
            <PortfolioItem />
            <PortfolioItem />
          </S.PortfolioList>
        </S.MainPortfolioWrapper>
      </S.MainSection>
      <S.MainSection>
        <S.MainBottomBannerBox img={BottomBannerImg}></S.MainBottomBannerBox>
      </S.MainSection>
    </S.MainLayout>
  );
};

export default MainPage2;
