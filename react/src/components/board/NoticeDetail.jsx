import React, { useEffect, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import { useSpring } from "react-spring";

const NoticeDetail = ({ item, widths }) => {
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
      <S.NBTdBox>
        {item.cell.map((cell, index) => (
          <S.NBTd
            width={widths[index]}
            className={isVisible ? "selected" : null}
            onClick={toggleVisible}
          >
            {cell.text}
          </S.NBTd>
        ))}
      </S.NBTdBox>
      <S.NBDetailBox style={SlideDown}>
        <S.NBDetail
          ref={ref}
          dangerouslySetInnerHTML={{ __html: item.desc }}
        ></S.NBDetail>
      </S.NBDetailBox>
    </S.NBRow>
  );
};

export default NoticeDetail;
