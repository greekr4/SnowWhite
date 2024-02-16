import * as S from "../../styles/new_styles";
import icon_print from "../../assets/icons/printer2.png";
import { useSpring, animated } from "react-spring";
import { useState } from "react";

const GnbSubMenu = ({ isVisible }) => {
  const slideAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    height: isVisible ? "200px" : "0px",
    // transform: isVisible ? "translateY(0)" : "translateY(-100%)",
  });

  const fadeInAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    top: isVisible ? "5px" : "0",
  });

  return (
    <S.HeaderSubMenuWrapper>
      <S.HeaderSubMenuIcon
        icon={icon_print}
        style={fadeInAnimation}
      ></S.HeaderSubMenuIcon>
      <S.HeaderSubMenuBox style={slideAnimation}>
        <S.HeaderSubMenuCols>
          <S.HeaderSubMenuItem>
            <S.HeaderSubMenuText>일반 명함</S.HeaderSubMenuText>
          </S.HeaderSubMenuItem>
          <S.HeaderSubMenuItem>
            <S.HeaderSubMenuText>고급 명함</S.HeaderSubMenuText>
          </S.HeaderSubMenuItem>
          <S.HeaderSubMenuItem>
            <S.HeaderSubMenuText>골판지 박스</S.HeaderSubMenuText>
          </S.HeaderSubMenuItem>
          <S.HeaderSubMenuItem>
            <S.HeaderSubMenuText>4</S.HeaderSubMenuText>
          </S.HeaderSubMenuItem>
          <S.HeaderSubMenuItem>
            <S.HeaderSubMenuText>5</S.HeaderSubMenuText>
          </S.HeaderSubMenuItem>
        </S.HeaderSubMenuCols>
      </S.HeaderSubMenuBox>
    </S.HeaderSubMenuWrapper>
  );
};

export default GnbSubMenu;
