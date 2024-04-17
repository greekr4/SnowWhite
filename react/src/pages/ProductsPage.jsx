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
  const [reviewData, setReviewData] = useState([]);
  const { cateid } = useParams();

  useEffect(() => {
    initdb();
  }, [cateid]);

  const initdb = async () => {
    setProducts(
      (
        await axios.post(
          process.env.REACT_APP_DB_HOST + "/api/product/thumbnail",
          { cateid: cateid }
        )
      ).data
    );
    setBannerImg(
      (
        await axios.post(process.env.REACT_APP_DB_HOST + "/api/banner", {
          cate: "CATE",
          code: cateid,
        })
      ).data
    );
    setReviewData(
      (
        await axios.post(process.env.REACT_APP_DB_HOST + "/api/review", {
          cate_sid: cateid,
        })
      ).data
    );
  };

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
          <ReviewBoard reviewData={reviewData} />
        </S.ProductReviewWrapper>
      </S.MainSection>
    </S.MainLayout>
  );
};

export default ProductsPage;
