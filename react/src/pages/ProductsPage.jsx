import ProductItem from "../components/products/ProductItem";
import * as S from "../styles/styles";

const ProductsPage = () => {
  return (
    <S.PageWrap>
      <S.Product_Main_Section>
        <S.Product_Title_Wrap>
          <S.Product_Title>명함</S.Product_Title>
        </S.Product_Title_Wrap>
        <S.Product_ItemList>
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </S.Product_ItemList>
      </S.Product_Main_Section>
    </S.PageWrap>
  );
};

export default ProductsPage;
