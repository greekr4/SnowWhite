import React, { useEffect, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import { useSpring } from "react-spring";
import { formatDate, formatTime } from "../../hooks/Utill";

const NoticeDetail = ({ item, index }) => {
  const [isVisible, SetIsVisible] = useState(false);
  const [maxHeight, SetMaxHeight] = useState(0);
  const ref = useRef(null);

  const toggleVisible = () => {
    isVisible ? SetIsVisible(false) : SetIsVisible(true);
  };

  useEffect(() => {
    SetMaxHeight(ref.current.offsetHeight);
    console.log(maxHeight);
  }, [isVisible]);

  const SlideDown = useSpring({
    height: isVisible ? maxHeight + "px" : 0 + "px",
    "border-bottom": isVisible ? "1px solid #777" : "0px solid #eee",
  });

  return (
    <S.NBRow>
      <S.NBTdBox onClick={toggleVisible}>
        <S.NBTd style={{ width: "10%" }}>{item.ROWNUM}</S.NBTd>
        <S.NBTd style={{ width: "60%" }}>{item.BOARD_TITLE}</S.NBTd>
        <S.NBTd style={{ width: "15%" }}>{item.BOARD_WRITER}</S.NBTd>
        <S.NBTd style={{ width: "15%" }}>
          {formatDate(item.BOARD_REGDATE)}
        </S.NBTd>
      </S.NBTdBox>
      <S.NBDetailBox style={SlideDown}>
        <S.NBDetail
          ref={ref}
          dangerouslySetInnerHTML={{ __html: item.BOARD_CONTENT }}
        ></S.NBDetail>
      </S.NBDetailBox>
    </S.NBRow>
  );
};

export default NoticeDetail;
