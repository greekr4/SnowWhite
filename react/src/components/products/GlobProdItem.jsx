import { Link } from "react-router-dom";
import * as S from "../../styles/new_styles";
import React from "react";

const GlobProdItem = ({ item }) => {
  return (
    <Link to="/products/detail" spy smooth duration={500}>
      <S.GlobProdItemBox>
        <S.GlobProdItemImgBox img={item.prodIMG} />
        <S.GlobProdItemTextBox>
          <S.GlobProdItemTitle>{item.prodNM}</S.GlobProdItemTitle>
          <S.GlobProdItemDesc>{item.prodDESC}</S.GlobProdItemDesc>
          <S.GlobProdItemBtn>자세히 보기</S.GlobProdItemBtn>
        </S.GlobProdItemTextBox>
      </S.GlobProdItemBox>
    </Link>
  );
};

export default GlobProdItem;
