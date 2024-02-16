import * as S from "../../styles/new_styles";
import React from "react";

const EventProdItem = () => {
  return (
    <S.EventProdItemBox>
      <S.EventProdItemImgBox>이미지영역</S.EventProdItemImgBox>
      <S.EventProdItemTextBox>
        <S.EventProdItemTitle>명함</S.EventProdItemTitle>
        <S.EventProdItemDesc>
          평범하지 않은 단 한 장으로
          <br />
          유니크한 당신을 알려보세요.
        </S.EventProdItemDesc>
        <S.EventProdItemBtn>자세히 보기</S.EventProdItemBtn>
      </S.EventProdItemTextBox>
    </S.EventProdItemBox>
  );
};

export default EventProdItem;
