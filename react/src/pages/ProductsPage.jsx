import * as S from "../styles/new_styles";
import BottomBannerImg from "../assets/products/product0.png";
import GlobProdItem from "../components/products/GlobProdItem";
import ReviewBoard from "../components/products/ReviewBoard";
import img1 from "../assets/products/product-test1.png";
import img2 from "../assets/products/product-test2.png";
import img3 from "../assets/products/product-test3.png";
import img4 from "../assets/products/product-test4.png";
import img5 from "../assets/products/product-test5.png";
import img6 from "../assets/products/product-test6.png";

const ProductsPage = () => {
  const test_products = [
    {
      prodNM: "일반 명함",
      prodDESC: "평범하지 않은 단 한 장으로\r\n유니크한 당신을 알려보세요.",
      prodIMG: img1,
    },
    {
      prodNM: "고급 명함",
      prodDESC:
        "한번 보면 빠져들 수밖에 없는 매력적인 명함\r\n직접 보고 느껴보세요!",
      prodIMG: img2,
    },
    {
      prodNM: "포스터",
      prodDESC: "모두의 시선을 주목시켜\r\n톡톡한 홍보 효과를 경험하세요.",
      prodIMG: img3,
    },
    {
      prodNM: "원목 사인",
      prodDESC: "원목의 나뭇결로 깔끔하고\r\n고급스러운 벽면을 연출해보세요.",
      prodIMG: img4,
    },
    {
      prodNM: "스탠다드 배너",
      prodDESC: "어떤 공간에서도 간편하게 설치하여\r\n홍보할 수 있어요.",
      prodIMG: img5,
    },
    {
      prodNM: "스티커",
      prodDESC:
        "직접 만든 이미지 모양 그대로 하나씩\r\n잘라주는 스티커를 만들어 보세요.",
      prodIMG: img6,
    },
  ];

  console.log(test_products);
  return (
    <S.MainLayout>
      <S.MainSection>
        <S.ProductBannerBox img={BottomBannerImg}></S.ProductBannerBox>
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
        <S.ProductReviewWrapper>
          <h1>고객 리뷰</h1>
          <ReviewBoard></ReviewBoard>
        </S.ProductReviewWrapper>
      </S.MainSection>
    </S.MainLayout>
  );
};

export default ProductsPage;
