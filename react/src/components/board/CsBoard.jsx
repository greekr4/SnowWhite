import React, { useEffect, useState } from "react";
import * as S from "../../styles/new_styles";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Snackbar,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TextareaAutosize,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { hyphenFormatter } from "../../hooks/Utill";
import axios from "axios";
import { useQuery } from "react-query";
import NoticeDetail from "./NoticeDetail";
import CustomQuill from "../global/CustomQuill";

const CsBoard = () => {
  const { data } = useQuery("userinfo", { enabled: false });
  const [mode, setMode] = useState("write");
  const [inputType, setInputType] = useState("[상품]");
  const [inputTel, setInputTel] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  const [boardData, setBoardData] = useState();
  const [progress, setProgress] = useState(false);
  const [initBoardData, setInitBoardData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);

  function getPageItems(array, page, pageSize) {
    // 페이지 인덱스 계산
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // 배열에서 해당 페이지의 요소를 추출하여 반환
    return array.slice(startIndex, endIndex);
  }

  useEffect(() => {
    initdb();
  }, [mode]);

  const handlePageChange = (e) => {
    setCurrentPage(e);
    const pageItems = getPageItems(initBoardData, e, countPerPage);
    setBoardData(pageItems);
  };

  const initdb = async () => {
    setProgress(true);

    const res = await axios.get(process.env.REACT_APP_DB_HOST + "/api/board", {
      params: {
        type: "CS",
      },
    });

    const res2 = await axios.get(
      process.env.REACT_APP_DB_HOST + "/api/comment",
      {
        params: {
          USER_ID: data.USER_ID,
        },
      }
    );

    setInitBoardData(res.data);
    setBoardData(res.data.slice(0, countPerPage));
    setProgress(false);
  };

  const handleWrite = async () => {
    if (inputTel.length < 10) {
      setSnackbar({
        severity: "error",
        children: "연락처를 확인해주세요.",
      });
      return;
    }

    if (inputTitle.length < 1) {
      setSnackbar({
        severity: "error",
        children: "제목을 입력해주세요.",
      });
      return;
    }

    if (inputContent.length < 1) {
      setSnackbar({
        severity: "error",
        children: "내용을 입력해주세요.",
      });
      return;
    }

    const result = await axios.post(
      process.env.REACT_APP_DB_HOST + "/api/board",
      {
        USER_ID: data.USER_ID,
        BOARD_TYPE: "CS",
        BOARD_WRITER: data.USER_NM,
        BOARD_TEL: inputTel,
        BOARD_TITLE: `${inputType} ${inputTitle}`,
        BOARD_CONTENT: inputContent,
      }
    );

    if (result.status === 200) {
      setSnackbar({
        severity: "success",
        children: "문의 등록이 완료되었습니다.",
      });
      setInputContent("");
      setInputTel("");
      setInputTitle("");
      setInputType("[상품]");
      setMode("read");
    } else {
      setSnackbar({
        severity: "error",
        children: "문의 등록에 실패했습니다.",
      });
    }
  };

  return (
    <>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setSnackbar(false)}
          autoHideDuration={3000}
        >
          <Alert {...snackbar} onClose={() => setSnackbar(false)} />
        </Snackbar>
      )}
      <Box sx={{}}>
        <S.CsboardTextBox>
          <p>해결하지 못한 궁금한 사항에 대해 문의해 주세요.</p>
          <p>
            고객님의 소중한 의견을 하나하나 새겨 듣고, 최선을 다해 답변
            드리겠습니다.
          </p>
        </S.CsboardTextBox>
        <ToggleButtonGroup
          color="primary"
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
          }}
          exclusive
          aria-label="Platform"
          style={{ width: "100%" }}
          className="group"
        >
          <ToggleButton value={"write"} color="info" fullWidth>
            문의하기
          </ToggleButton>
          <ToggleButton value={"read"} color="info" fullWidth>
            내 문의 내역
          </ToggleButton>
        </ToggleButtonGroup>

        <Box sx={{ margin: "16px 0" }}>
          {mode === "write" ? (
            <Box>
              <Table sx={{ width: "700px", margin: "0 auto" }}>
                <TableRow>
                  <TableCell width={"20%"}>문의 유형</TableCell>
                  <TableCell>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={inputType}
                      sx={{ width: "100%" }}
                      onChange={(e) => {
                        setInputType(e.target.value);
                      }}
                      size="small"
                    >
                      <MenuItem value={"[상품]"}>상품 문의</MenuItem>
                      <MenuItem value={"[배송]"}>배송 문의</MenuItem>
                      <MenuItem value={"[기타]"}>기타 문의</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width={"20%"}>연락처</TableCell>
                  <TableCell>
                    <TextField
                      type="tel"
                      value={inputTel}
                      onChange={(e) => {
                        setInputTel(hyphenFormatter(e.target.value));
                      }}
                      size="small"
                      sx={{ width: "100%" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width={"20"}>문의 제목</TableCell>
                  <TableCell>
                    <TextField
                      type="tel"
                      value={inputTitle}
                      onChange={(e) => {
                        setInputTitle(e.target.value);
                      }}
                      size="small"
                      sx={{ width: "100%" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell width={"20%"}>문의 내용</TableCell>
                  <TableCell>
                    <Box sx={{ width: "100%" }}>
                      <CustomQuill
                        setContent={setInputContent}
                        initContent={inputContent}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              </Table>
              <Box sx={{ textAlign: "center", width: "100%" }}>
                <Button
                  variant="contained"
                  color="info"
                  sx={{ marginTop: "16px" }}
                  onClick={handleWrite}
                >
                  등록
                </Button>
              </Box>
            </Box>
          ) : mode === "read" ? (
            <Box>
              <S.NBBox>
                <S.NBHeader>
                  <S.NBTh width={"10%"}>번호</S.NBTh>
                  <S.NBTh width={"60%"}>제목</S.NBTh>
                  <S.NBTh width={"15%"}>작성자</S.NBTh>
                  <S.NBTh width={"15%"}>작성일</S.NBTh>
                </S.NBHeader>
                {progress ? (
                  <Box
                    sx={{
                      width: "100%",
                      height: "200px",
                      textAlign: "center",
                      lineHeight: "200px",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : boardData?.length ? (
                  boardData.map((item, index) => (
                    <NoticeDetail item={item} index={index} />
                  ))
                ) : (
                  <S.NBRow>
                    <S.NBTdBox>
                      <S.NBTd colSpan={"100%"}>게시글이 없습니다.</S.NBTd>
                    </S.NBTdBox>
                  </S.NBRow>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "1.5em 0",
                  }}
                >
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
                </Box>
              </S.NBBox>
            </Box>
          ) : null}
        </Box>
      </Box>
    </>
  );
};
export default CsBoard;
