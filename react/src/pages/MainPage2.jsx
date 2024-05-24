import PortfolioItem from "../components/main/PortfolioItem";
import * as S from "../styles/new_styles";
import React, { useEffect, useState } from "react";
import BottomBannerImg from "../assets/bottom_banner.png";
import GlobProdItem from "../components/products/GlobProdItem";
import img1 from "../assets/products/product-test1.png";
import img2 from "../assets/products/product-test2.png";
import img3 from "../assets/products/product-test3.png";
import img4 from "../assets/products/product-test4.png";
import img5 from "../assets/products/product-test5.png";
import img6 from "../assets/products/product-test6.png";
import MainSlider from "../components/main/MainSlider";
import axios from "axios";
import { Box, SpeedDial, SpeedDialIcon } from "@mui/material";

const MainPage2 = () => {
  const [mainProducts, setMainProducts] = useState([]);

  useEffect(() => {
    initdb();
  }, []);

  const initdb = async () => {
    setMainProducts(
      (
        await axios.post(
          process.env.REACT_APP_DB_HOST + "/api/product/thumbnail",
          { main: true }
        )
      ).data
    );
  };

  const imageContext = require.context(
    "../assets/products/pf",
    false,
    /\.(jpg)$/
  );
  const imagePaths = imageContext.keys().map(imageContext);

  const test_pf = [
    { pfImg: imagePaths[0] },
    { pfImg: imagePaths[1] },
    { pfImg: imagePaths[2] },
    { pfImg: imagePaths[3] },
    { pfImg: imagePaths[4] },
    { pfImg: imagePaths[5] },
    { pfImg: imagePaths[6] },
    { pfImg: imagePaths[7] },
    { pfImg: imagePaths[8] },
    { pfImg: imagePaths[9] },
  ];

  return (
    <>
      <S.MainLayout>
        <S.MainSection>
          <MainSlider />
        </S.MainSection>
        <S.MainSection bgc="#fff">
          <S.GlobProdWrapper>
            <S.GlobProdList>
              {mainProducts.map((item, index) => (
                <GlobProdItem item={item} key={index} />
              ))}
            </S.GlobProdList>
          </S.GlobProdWrapper>
        </S.MainSection>
        <S.MainSection bgc="#f9fafc">
          <S.MainPortfolioWrapper>
            <S.PortfolioTextBox>
              <S.PortfolioTitle>스노우플래닛 Portfolio</S.PortfolioTitle>
            </S.PortfolioTextBox>
            <S.PortfolioList>
              {test_pf.map((item, index) => (
                <PortfolioItem item={item} key={index} />
              ))}
            </S.PortfolioList>
          </S.MainPortfolioWrapper>
        </S.MainSection>
        <S.MainSection>
          <S.MainBottomBannerBox img={"/asserts/banner/bottom_banner.png"}>
            {/* <div className="inner">
            <h1>무한대의 명함을 경험하다.</h1>
            <h2>
              한번 보면 빠져들 수밖에 없는 매력적인 명함
              <br />
              <br />
              직접 보고 느껴보세요!
            </h2>
          </div> */}
          </S.MainBottomBannerBox>
        </S.MainSection>
      </S.MainLayout>
    </>
  );
};

export default MainPage2;
