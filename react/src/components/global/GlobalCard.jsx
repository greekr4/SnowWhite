import React from "react";
import * as S from "../../styles/new_styles";

const GlobalCard = ({ items }) => {
  return (
    <S.CardList>
      {items.map((item, index) => (
        <S.CardItem>
          <S.CardImg />
          <S.CardTitle>{item.title}</S.CardTitle>
          <S.CardCont>{item.cont}</S.CardCont>
        </S.CardItem>
      ))}
    </S.CardList>
  );
};

export default GlobalCard;
