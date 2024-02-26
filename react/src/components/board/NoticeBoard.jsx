import React, { useState } from "react";
import * as S from "../../styles/new_styles";
import { useSpring } from "react-spring";
import NoticeDetail from "./NoticeDetail";

const NB = () => {
  const data = {
    header: [
      {
        text: "번호",
        width: "10%",
      },
      {
        text: "제목",
        width: "75%",
      },
      {
        text: "작성일",
        width: "15%",
      },
    ],
    rows: [
      {
        cell: [
          {
            text: "3",
          },
          {
            text: "[주의] 주문 시 주의사항을 안내드립니다.",
          },
          {
            text: "2024-02-23",
          },
        ],
        desc: "<h1>상세내용입니다</h1><b>감사합니다.</b>",
      },
      {
        cell: [
          {
            text: "2",
          },
          {
            text: "[공지] 명함 리뉴얼에 대해 공지드립니다.",
          },
          {
            text: "2024-02-23",
          },
        ],
        desc: "<h1>명함 리뉴얼 공지입니다.</h1><br/><br/><p>설명입니다.</p><p>설명입니다.</p><br/><br/><p>감사합니다.</p>",
      },
      {
        cell: [
          {
            text: "1",
          },
          {
            text: "[안내] 설날 연휴 기간 배송에 대해 안내드립니다.",
          },
          {
            text: "2024-02-23",
          },
        ],
        desc: "<h1>설날 연휴 기간 배송에 대한 안내입니다.</h1><br/><br/><br/><br/><p>감사합니다.</p>",
      },
    ],
  };

  const widths = [];
  data.header.map((item, index) => {
    widths.push(item.width);
  });

  return (
    <S.NBBox>
      <S.NBHeader>
        {data.header.map((item, index) => (
          <S.NBTh width={item.width}>{item.text}</S.NBTh>
        ))}
      </S.NBHeader>
      {data.rows.map((item, index) => (
        <NoticeDetail item={item} widths={widths} />
      ))}
      <S.BoardPageBox>
        <S.BoardPagePrev />
        <S.BoardPageNum className="selected">1</S.BoardPageNum>
        <S.BoardPageNum>2</S.BoardPageNum>
        <S.BoardPageNum>3</S.BoardPageNum>
        <S.BoardPageNext />
      </S.BoardPageBox>
    </S.NBBox>
  );
};

export default NB;
