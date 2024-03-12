import * as S from "../../styles/new_styles";
import icon_print from "../../assets/icons/printer2.png";
import { useSpring, animated } from "react-spring";
import { useState } from "react";
import { Link } from "react-router-dom";

const GnbSubMenu = ({ isVisible, submenus }) => {
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
                <Link to={item.CATE_LINK}>
                  <S.HeaderSubMenuText>{item.CATE_NM}</S.HeaderSubMenuText>
                </Link>
              </S.HeaderSubMenuItem>
            </>
          ))}
        </S.HeaderSubMenuCols>
      </S.HeaderSubMenuBox>
    </S.HeaderSubMenuWrapper>
  );
};

export default GnbSubMenu;
