import * as S from "../styles/new_styles";
import noimg from "../assets/products/banner_noimg.png";
import GlobProdItem from "../components/products/GlobProdItem";
import ReviewBoard from "../components/products/ReviewBoard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import close from "../assets/icons/close.png";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [bannerImg, setBannerImg] = useState();
  const { cateid } = useParams();

  useEffect(() => {
    axios
      .post("/api/product/thumbnail", { cateid: cateid })
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post("/api/banner", { cate: "CATE", code: cateid })
      .then((res) => {
        if (res.status === 200) {
          setBannerImg(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cateid]);

  const test_products = [
    {
      prodNM: "일반 명함",
      prodDESC: "평범하지 않은 단 한 장으로\r\n유니크한 당신을 알려보세요.",
      prodIMG: "/asserts/products/product1.png",
    },
    {
      prodNM: "고급 명함",
      prodDESC:
        "한번 보면 빠져들 수밖에 없는 매력적인 명함\r\n직접 보고 느껴보세요!",
    },
    {
      prodNM: "포스터",
      prodDESC: "모두의 시선을 주목시켜\r\n톡톡한 홍보 효과를 경험하세요.",
    },
    {
      prodNM: "원목 사인",
      prodDESC: "원목의 나뭇결로 깔끔하고\r\n고급스러운 벽면을 연출해보세요.",
    },
    {
      prodNM: "스탠다드 배너",
      prodDESC: "어떤 공간에서도 간편하게 설치하여\r\n홍보할 수 있어요.",
    },
    {
      prodNM: "스티커",
      prodDESC:
        "직접 만든 이미지 모양 그대로 하나씩\r\n잘라주는 스티커를 만들어 보세요.",
    },
  ];
  return (
    <S.MainLayout>
      <S.MainSection>
        <S.ProductBannerBox
          img={bannerImg ? bannerImg.BANNER_IMAGE : noimg}
        ></S.ProductBannerBox>
      </S.MainSection>
      <S.MainSection bgc="#fff">
        <S.GlobProdWrapper>
          <S.GlobProdList>
            {products.length ? (
              products.map((item, index) => <GlobProdItem item={item} />)
            ) : (
              <S.NoProdBox>
                <div style={{ textAlign: "center" }}>
                  <S.Glob_Icon icon={close} width="120px" height="120px" />
                </div>
                <h1>상품이 준비 중입니다.</h1>
              </S.NoProdBox>
            )}
          </S.GlobProdList>
        </S.GlobProdWrapper>
      </S.MainSection>
      <S.MainSection bgc="#f9fafc">
        <S.ProductReviewWrapper>
          <h1>고객 리뷰</h1>
          <ReviewBoard></ReviewBoard>
        </S.ProductReviewWrapper>
      </S.MainSection>
    </S.MainLayout>
  );
};

export default ProductsPage;
