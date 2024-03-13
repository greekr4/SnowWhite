import { Link } from "react-router-dom";
import * as S from "../../styles/new_styles";
import React from "react";
import noimg from "../../assets/products/product_noimg.png";

const GlobProdItem = ({ item }) => {
  return (
    <Link to="/products/detail" spy smooth duration={500}>
      <S.GlobProdItemBox>
        <S.GlobProdItemImgBox
          img={item.IMAGE_LOCATION ? item.IMAGE_LOCATION : noimg}
        />
        <S.GlobProdItemTextBox>
          <S.GlobProdItemTitle>{item.PROD_NM}</S.GlobProdItemTitle>
          <S.GlobProdItemDesc>{item.PROD_DESC}</S.GlobProdItemDesc>
          <S.GlobProdItemBtn>자세히 보기</S.GlobProdItemBtn>
        </S.GlobProdItemTextBox>
      </S.GlobProdItemBox>
    </Link>
  );
};

export default GlobProdItem;
