import * as S from "../../styles/new_styles";
import icon_print from "../../assets/icons/printer2.png";
import { useSpring, animated } from "react-spring";
import { useState } from "react";

const GnbSubMenu = ({ isVisible, submenus }) => {
  console.log(submenus.length);
  const isheight = `${submenus.length * 30 + 35}px`;

  const slideAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    height: isVisible ? isheight : "0px",
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
          {submenus.map((item) => (
            <>
              <S.HeaderSubMenuItem>
                <S.HeaderSubMenuText>{item}</S.HeaderSubMenuText>
              </S.HeaderSubMenuItem>
            </>
          ))}
        </S.HeaderSubMenuCols>
      </S.HeaderSubMenuBox>
    </S.HeaderSubMenuWrapper>
  );
};

export default GnbSubMenu;
