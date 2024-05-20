import React, { useEffect, useState } from "react";
import * as S from "../../styles/new_styles";
import axios from "axios";
import { formatDate } from "../../hooks/Utill";
import AdminBoardRow from "./AdminBoardRow";
import AdminBoardForm from "./AdminBoardForm";
import Pagination from "react-js-pagination";

const AdminBoard = () => {
  const [boardData, setBoardData] = useState();
  const [initBoardData, setInitBoardData] = useState();
  const [editData, setEditData] = useState();
  const [boardType, setBoardType] = useState("NOTICE");

  const [currentPage, setCurrentPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);

  const handlePageChange = (e) => {
    setCurrentPage(e);
    const startIndex = (e - 1) * countPerPage;
    const endIndex = startIndex + countPerPage;
    const pageItems = initBoardData.slice(startIndex, endIndex);
    setBoardData(pageItems);
  };

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
    setInitBoardData(res.data);
    setBoardData(res.data.slice(0, countPerPage));
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
            <option value={"FAQ"}>FAQ</option>
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
              <th style={{ width: "12%" }}>작성글 코드</th>
              <th style={{ width: "7%" }}>작성자 ID</th>
              <th style={{ width: "7%" }}>표출 이름</th>
              <th style={{ width: "10%" }}>제목</th>
              <th style={{ width: "33%" }}>내용</th>
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
          <S.PaginationBox>
            <Pagination
              // 현제 보고있는 페이지
              activePage={currentPage}
              // 한페이지에 출력할 아이템수
              itemsCountPerPage={countPerPage}
              // 총 아이템수
              totalItemsCount={initBoardData?.length}
              // 표시할 페이지수
              pageRangeDisplayed={10}
              // 마지막 버튼 숨기기
              hideFirstLastPages={true}
              // 버튼 커스텀
              prevPageText={<S.Left_Icon />}
              nextPageText={<S.Right_Icon />}
              // 함수
              onChange={handlePageChange}
            />
          </S.PaginationBox>
        </S.AdminWrapper>
      </S.MainLayout>
      <AdminBoardForm editData={editData} initdb={initdb} />
    </>
  );
};

export default AdminBoard;
