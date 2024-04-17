import React, { useEffect, useState } from "react";
import * as S from "../../styles/new_styles";
import { useSpring } from "react-spring";
import NoticeDetail from "./NoticeDetail";
import axios from "axios";
import Pagination from "react-js-pagination";
import styled from "styled-components";
import arrow_left from "../../assets/icons/arrow_left.png";
import arrow_right from "../../assets/icons/arrow_right.png";

const GlobalBoard = ({ boardType }) => {
  const [initBoardData, setInitBoardData] = useState();
  const [boardData, setBoardData] = useState();
  useEffect(() => {
    initdb();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);

  const initdb = async () => {
    const res = await axios.get(process.env.REACT_APP_DB_HOST + "/api/board", {
      params: {
        type: boardType,
      },
    });

    setInitBoardData(res.data);
    setBoardData(res.data.slice(0, countPerPage));
  };

  function getPageItems(array, page, pageSize) {
    // 페이지 인덱스 계산
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    console.log(page, startIndex, endIndex);
    // 배열에서 해당 페이지의 요소를 추출하여 반환
    return array.slice(startIndex, endIndex);
  }

  const handlePageChange = (e) => {
    setCurrentPage(e);
    const pageItems = getPageItems(initBoardData, e, countPerPage);
    setBoardData(pageItems);
  };

  return (
    <S.NBBox>
      <S.NBHeader>
        {/* {data.header.map((item, index) => (
          <S.NBTh width={item.width}>{item.text}</S.NBTh>
        ))} */}
        <S.NBTh width={"10%"}>번호</S.NBTh>
        <S.NBTh width={"60%"}>제목</S.NBTh>
        <S.NBTh width={"15%"}>작성자</S.NBTh>
        <S.NBTh width={"15%"}>작성일</S.NBTh>
      </S.NBHeader>
      {boardData?.length ? (
        boardData?.map((item, index) => (
          <NoticeDetail item={item} index={index} />
        ))
      ) : (
        <S.NBRow>
          <S.NBTdBox>
            <S.NBTd colSpan={"100%"}>게시글이 없습니다.</S.NBTd>
          </S.NBTdBox>
        </S.NBRow>
      )}

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
          prevPageText={
            <S.Glob_Icon
              icon={arrow_left}
              width="16px"
              height="16px"
              margin="3px 0 0 0"
            />
          }
          nextPageText={
            <S.Glob_Icon
              icon={arrow_right}
              width="16px"
              height="16px"
              margin="3px 0 0 0"
            />
          }
          // 함수
          onChange={handlePageChange}
        />
      </S.PaginationBox>
    </S.NBBox>
  );
};

export default GlobalBoard;
