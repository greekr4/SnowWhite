import React, { useEffect, useState } from "react";
import * as S from "../../styles/new_styles";
import CustomQuill from "../global/CustomQuill";
import { useQuery } from "react-query";
import axios from "axios";

const AdminBoardForm = ({ editData, initdb }) => {
  const [boardType, setBoardType] = useState("NOTICE");
  const [boardWriter, setBoardWriter] = useState("관리자");
  const [boardTitle, setBoardTitle] = useState();
  const [boardContent, setBoardContent] = useState();
  const { data } = useQuery("userinfo", { enabled: false });
  const userId = data?.USER_ID;

  const handleSend = async () => {
    if (!editData?.BOARD_EDIT) {
      const res = await axios.post("/api/board", {
        BOARD_TYPE: boardType,
        BOARD_WRITER: boardWriter,
        BOARD_TITLE: boardTitle,
        BOARD_CONTENT: boardContent,
        USER_ID: userId,
      });

      if (res.status === 200) {
        alert("게시글 작성이 완료되었습니다.");
        initdb();
      } else {
        alert("게시글 작성을 실패하였습니다.");
      }
    } else {
      const res = await axios.put("/api/board", {
        BOARD_TYPE: boardType,
        BOARD_WRITER: boardWriter,
        BOARD_TITLE: boardTitle,
        BOARD_CONTENT: boardContent,
        USER_ID: userId,
        BOARD_SID: editData.BOARD_SID,
      });

      if (res.status === 200) {
        alert("게시글 수정이 완료되었습니다.");
        initdb();
      } else {
        alert("게시글 수정을 실패하였습니다.");
      }
    }
  };

  useEffect(() => {
    if (editData?.BOARD_EDIT) {
      setBoardType(editData?.BOARD_TYPE);
      setBoardWriter(editData?.BOARD_WRITER);
      setBoardTitle(editData?.BOARD_TITLE);
      setBoardContent(editData?.BOARD_CONTENT);
    } else {
      setBoardType("NOTICE");
      setBoardWriter("관리자");
      setBoardTitle("");
      setBoardContent("");
    }
  }, [editData]);

  return (
    <S.MainLayout>
      <S.AdminWrapper>
        {editData?.BOARD_EDIT ? "게시글 수정" : "게시글 작성"}
        <S.AdminBoardFormBox>
          <S.GlobalInputBox>
            <select
              value={boardType}
              onChange={(e) => setBoardType(e.target.value)}
            >
              <option value="NOTICE" selected>
                공지사항
              </option>
              <option value="CS">고객센터</option>
            </select>
            <label>타입</label>
          </S.GlobalInputBox>
          <S.GlobalInputBox>
            <input
              value={boardWriter}
              onChange={(e) => setBoardWriter(e.target.value)}
            />
            <label>작성자</label>
          </S.GlobalInputBox>
          <S.GlobalInputBox>
            <input
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
            />
            <label>제목</label>
          </S.GlobalInputBox>
          <S.GlobalInputBox>
            <CustomQuill
              setContent={setBoardContent}
              initContent={boardContent}
            />
            <label>내용</label>
          </S.GlobalInputBox>
          <S.Btn
            style={{ width: "100%", marginTop: "1em" }}
            onClick={handleSend}
          >
            작성
          </S.Btn>
        </S.AdminBoardFormBox>
      </S.AdminWrapper>
    </S.MainLayout>
  );
};

export default AdminBoardForm;
