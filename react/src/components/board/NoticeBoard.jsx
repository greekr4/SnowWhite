import React from "react";
import GlobalTable from "../global/GlobalTable";
import NoticeTable from "./NoticeTable";

const NoticeBoard = () => {
  const data = {
    header: [
      {
        text: "번호",
        width: "10%",
      },
      {
        text: "제목",
        width: "80%",
      },
      {
        text: "작성일",
        width: "10%",
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
        desc: "<h1>상세내용입니다</h1><p>감사합니다.</p>",
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
        desc: "<h1>상세내용입니다</h1><p>감사합니다.</p>",
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
        desc: "<h1>상세내용입니다</h1><p>감사합니다.</p>",
      },
    ],
  };

  return <NoticeTable data={data} />;
};

export default NoticeBoard;
