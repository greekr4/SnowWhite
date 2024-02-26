import React from "react";
import * as S from "../../styles/new_styles";
import { useSpring, animated } from "react-spring";

const NoticeItemDetail = ({ desc, isVisible }) => {
  const displayAni = useSpring({
    opacity: isVisible ? 1 : 0,
    display: isVisible ? "table-cell" : "none",
    config: { duration: 500 },
  });

  return (
    <animated.tr>
      <animated.td style={displayAni} colSpan="3">
        <S.NoticeDetailBox dangerouslySetInnerHTML={{ __html: desc }} />
      </animated.td>
    </animated.tr>
  );
};

export default NoticeItemDetail;
