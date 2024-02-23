import React from "react";
import * as S from "../../styles/new_styles";
import { useSpring } from "react-spring";

const NoticeItemDetail = ({ desc, isVisible }) => {
  const slideAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    height: isVisible ? "100px" : "0px",
  });

  return (
    <S.NoticeDetailBox
      dangerouslySetInnerHTML={{ __html: desc }}
      style={slideAnimation}
    />
  );
};

export default NoticeItemDetail;
