import PortfolioItem from "../components/main/PortfolioItem";
import * as S from "../styles/new_styles";
import React from "react";
import BottomBannerImg from "../assets/bottom_banner.png";
import GlobProdItem from "../components/products/GlobProdItem";
import img1 from "../assets/products/product-test1.png";
import img2 from "../assets/products/product-test2.png";
import img3 from "../assets/products/product-test3.png";
import img4 from "../assets/products/product-test4.png";
import img5 from "../assets/products/product-test5.png";
import img6 from "../assets/products/product-test6.png";
import MainSlider from "../components/main/MainSlider";

const MainPage2 = () => {
  const test_products = [
    {
      PROD_NM: "일반지",
      PROD_DESC: "평범하지 않은 단 한 장으로\r\n유니크한 당신을 알려보세요.",
      IMAGE_LOCATION: "/upload/145d7da0-f008-11ee-9b34-efd46fbb721a.jpg",
      PROD_SID: 1,
    },
    {
      PROD_NM: "스크래치복권",
      PROD_DESC:
        "한번 보면 빠져들 수밖에 없는 매력적인 명함\r\n직접 보고 느껴보세요!",
      IMAGE_LOCATION: "/upload/65ffba00-edac-11ee-b4de-bda933c02a20.jpg",
      PROD_SID: 39,
    },
    {
      PROD_NM: "스티커",
      PROD_DESC:
        "직접 만든 이미지 모양 그대로\n하나씩 낱장으로 잘라주는 스티커",
      IMAGE_LOCATION: "/upload/335c5100-eff8-11ee-b1ae-0718e194d4f1.jpg",
      PROD_SID: 38,
    },
    {
      PROD_NM: "박스",
      PROD_DESC: "박스를 커스텀할 수 있어요\r\n나만의 박스를 만들어보세요.",
      IMAGE_LOCATION: "/upload/ded06af0-edad-11ee-b4de-bda933c02a20.png",
      PROD_SID: 42,
    },
    {
      PROD_NM: "아크릴키링",
      PROD_DESC:
        "내가 찾던 그 디자인을 아크릴 안에 쏙!\r\n다양한 종류와 고리 모양으로 키링을 만들어 보세요.",
      IMAGE_LOCATION: "/upload/131f39d0-edae-11ee-b4de-bda933c02a20.jpg",
      PROD_SID: 43,
    },
    {
      PROD_NM: "스티커",
      PROD_DESC: "언제 어디서든 나만의\r\n현수막으로 홍보해보세요.",
      IMAGE_LOCATION: "/upload/5e2835d0-edae-11ee-b4de-bda933c02a20.jpg",
      PROD_SID: 44,
    },
  ];

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
    <S.MainLayout>
      <S.MainSection>
        <MainSlider />
      </S.MainSection>
      <S.MainSection bgc="#fff">
        <S.GlobProdWrapper>
          <S.GlobProdList>
            {test_products.map((item, index) => (
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
  );
};

export default MainPage2;
