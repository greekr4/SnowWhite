import React, { useEffect, useState } from "react";
import * as S from "../../styles/new_styles";
import axios from "axios";
import { formatDate } from "../../hooks/Utill";
import AdminBoardRow from "./AdminBoardRow";
import AdminBoardForm from "./AdminBoardForm";

const AdminBoard = () => {
  const [boardData, setBoardData] = useState();
  const [editData, setEditData] = useState();
  const [boardType, setBoardType] = useState("NOTICE");
  useEffect(() => {
    initdb();
  }, []);

  useEffect(() => {
    initdb();
  }, [boardType]);

  const initdb = async () => {
    const res = await axios.get(process.env.REACT_APP_DB_HOST + "/api/board", {
      params: {
        type: boardType,
      },
    });
    setBoardData(res.data);
  };

  return (
    <>
      <S.MainLayout>
        <S.AdminWrapper>
          게시판 관리
          <select
            onChange={(e) => {
              setBoardType(e.target.value);
            }}
          >
            <option value={"NOTICE"}>공지사항</option>
            <option value={"CS"}>고객문의</option>
          </select>
          <S.Btn
            onClick={() => {
              setEditData({ BOARD_EDIT: false });
            }}
          >
            작성
          </S.Btn>
          <S.AdminTable>
            <thead>
              <th style={{ width: "5%" }}>작성글 코드</th>
              <th style={{ width: "7%" }}>작성자 ID</th>
              <th style={{ width: "7%" }}>표출 이름</th>
              <th style={{ width: "10%" }}>제목</th>
              <th style={{ width: "40%" }}>내용</th>
              <th style={{ width: "5%" }}>조회수</th>
              <th style={{ width: "8%" }}>등록일</th>
              <th style={{ width: "8%" }}>수정일</th>
              <th style={{ width: "10%" }}></th>
            </thead>
            <tbody>
              {boardData?.map((el, index) => (
                <AdminBoardRow
                  data={el}
                  initdb={initdb}
                  setEditData={setEditData}
                />
              ))}
            </tbody>
          </S.AdminTable>
        </S.AdminWrapper>
      </S.MainLayout>
      <AdminBoardForm editData={editData} initdb={initdb} />
    </>
  );
};

export default AdminBoard;
