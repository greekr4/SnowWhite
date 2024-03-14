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

const MainPage2 = () => {
  const test_products = [
    {
      PROD_NM: "일반 명함",
      PROD_DESC: "평범하지 않은 단 한 장으로\r\n유니크한 당신을 알려보세요.",
      IMAGE_LOCATION: img1,
      PROD_SID: 1,
    },
    {
      PROD_NM: "고급 명함",
      PROD_DESC:
        "한번 보면 빠져들 수밖에 없는 매력적인 명함\r\n직접 보고 느껴보세요!",
      IMAGE_LOCATION: img2,
      PROD_SID: 2,
    },
    {
      PROD_NM: "포스터",
      PROD_DESC: "모두의 시선을 주목시켜\r\n톡톡한 홍보 효과를 경험하세요.",
      IMAGE_LOCATION: img3,
      PROD_SID: 3,
    },
    {
      PROD_NM: "원목 사인",
      PROD_DESC: "원목의 나뭇결로 깔끔하고\r\n고급스러운 벽면을 연출해보세요.",
      IMAGE_LOCATION: img4,
      PROD_SID: 4,
    },
    {
      PROD_NM: "스탠다드 배너",
      PROD_DESC: "어떤 공간에서도 간편하게 설치하여\r\n홍보할 수 있어요.",
      IMAGE_LOCATION: img5,
      PROD_SID: 5,
    },
    {
      PROD_NM: "스티커",
      PROD_DESC:
        "직접 만든 이미지 모양 그대로 하나씩\r\n잘라주는 스티커를 만들어 보세요.",
      IMAGE_LOCATION: img6,
      PROD_SID: 6,
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
        <S.MainBannerBox></S.MainBannerBox>
      </S.MainSection>
      <S.MainSection bgc="#fff">
        <S.GlobProdWrapper>
          <S.GlobProdList>
            {test_products.map((item, index) => (
              <GlobProdItem item={item} />
            ))}
          </S.GlobProdList>
        </S.GlobProdWrapper>
      </S.MainSection>
      <S.MainSection bgc="#f9fafc">
        <S.MainPortfolioWrapper>
          <S.PortfolioTextBox>
            <S.PortfolioTitle>스노우화이트 Portfolio</S.PortfolioTitle>
          </S.PortfolioTextBox>
          <S.PortfolioList>
            {test_pf.map((item, index) => (
              <PortfolioItem item={item} />
            ))}
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
