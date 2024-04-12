import React, { useState } from "react";
import { formatDate } from "../../hooks/Utill";
import * as S from "../../styles/new_styles";
import axios from "axios";

const AdminBoardRow = ({ data, initdb, setEditData }) => {
  const [contentVisible, setContentVisible] = useState(false);

  const togleVisible = () => {
    setContentVisible(!contentVisible);
  };

  const handleDelete = async (BOARD_SID) => {
    const res = await axios.delete("/api/board", {
      data: { BOARD_SID: BOARD_SID },
    });

    if (res.status === 200) {
      alert("게시글이 삭제되었습니다.");
      initdb();
    } else {
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  return (
    <tr style={{ height: "50px" }}>
      <th>{data.BOARD_SID}</th>
      <th>{data.USER_ID}</th>
      <th>{data.BOARD_WRITER}</th>
      <th>{data.BOARD_TITLE}</th>
      <th>
        <S.Btn margin="1em" onClick={togleVisible}>
          보기
        </S.Btn>
        {contentVisible && (
          <div
            style={{ margin: "1em" }}
            dangerouslySetInnerHTML={{ __html: data.BOARD_CONTENT }}
          />
        )}
      </th>
      <th>{data.BOARD_HIT}</th>
      <th>{formatDate(data.BOARD_REGDATE)}</th>
      <th>{formatDate(data.BOARD_MODIDATE)}</th>
      <th>
        <S.Btn
          margin="0 0.5em 0 0"
          onClick={() => {
            setEditData({
              BOARD_TYPE: data.BOARD_TYPE,
              BOARD_WRITER: data.BOARD_WRITER,
              BOARD_TITLE: data.BOARD_TITLE,
              BOARD_CONTENT: data.BOARD_CONTENT,
              BOARD_SID: data.BOARD_SID,
              BOARD_EDIT: true,
            });
          }}
        >
          수정
        </S.Btn>
        <S.Btn onClick={() => handleDelete(data.BOARD_SID)}>삭제</S.Btn>
      </th>
    </tr>
  );
};

export default AdminBoardRow;
