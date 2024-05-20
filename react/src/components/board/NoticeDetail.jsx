import React, { useEffect, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import { useSpring } from "react-spring";
import { formatDate, formatTime } from "../../hooks/Utill";
import axios from "axios";
import { Box } from "@mui/material";

const NoticeDetail = ({ item, index }) => {
  const [isVisible, SetIsVisible] = useState(false);
  const [maxHeight, SetMaxHeight] = useState(0);
  const [comment, setComment] = useState("");
  const ref = useRef(null);
  const ref2 = useRef(null);

  const toggleVisible = async () => {
    isVisible ? SetIsVisible(false) : SetIsVisible(true);

    const res = await axios.get(
      process.env.REACT_APP_DB_HOST + "/api/comment",
      {
        params: {
          BOARD_SID: item.BOARD_SID,
        },
      }
    );

    setComment(res.data);
  };

  useEffect(() => {
    SetMaxHeight(ref.current.offsetHeight + ref2.current.offsetHeight);
  }, [isVisible, comment]);

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
        />
        <S.NBDetail2 ref={ref2}>
          {comment.length > 0 ? (
            <>
              {comment.map((item, index) => (
                <Box
                  sx={{
                    borderTop: "1px solid #ddd",
                    width: "80%",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "20px",
                      fontWeight: "550",
                      paddingTop: "16px",
                      paddingBottom: "16px",
                    }}
                  >
                    {item.COMMENT_TITLE}
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.COMMENT_CONTENT }}
                  />
                </Box>
              ))}
            </>
          ) : null}
        </S.NBDetail2>
      </S.NBDetailBox>
    </S.NBRow>
  );
};

export default NoticeDetail;
