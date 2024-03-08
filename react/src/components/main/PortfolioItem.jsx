import * as S from "../../styles/new_styles";
import React from "react";

const PortfolioItem = ({ item }) => {
  return (
    <S.PortfolioItemBox>
      <S.PortfolioItemImgBox img={item.pfImg} />
    </S.PortfolioItemBox>
  );
};

export default PortfolioItem;
