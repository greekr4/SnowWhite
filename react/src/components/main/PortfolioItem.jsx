import * as S from "../../styles/new_styles";
import React from "react";

const PortfolioItem = ({ item }) => {
  console.log(item);
  console.log("dd");
  return (
    <S.PortfolioItemBox>
      <S.PortfolioItemImgBox img={item.pfImg} />
    </S.PortfolioItemBox>
  );
};

export default PortfolioItem;
