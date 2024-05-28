import React, { useEffect, useState } from "react";
import * as S from "../../styles/new_styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import axios from "axios";
import { DataGrid, GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import { formatDate, formatTime } from "../../hooks/Utill";
import { Create } from "@mui/icons-material";
import CustomQuill from "../global/CustomQuill";
import { useQuery } from "react-query";

const AdminCs = () => {
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  const [progress, setProgress] = useState(false);
  const [boardData, setBoardData] = useState([]);
  const [snackbar, setSnackbar] = useState(false);

  // 글쓰기 폼
  const { data } = useQuery("userinfo", { enabled: false });
  const [dialogOpen, setDialogOpen] = useState(false);

  const [BOARD_SID, setBOARD_SID] = useState("");
  const [COMMENT_WRITER, setCOMMENT_WRITER] = useState("스노우화이트");
  const [COMMENT_TITLE, setCOMMENT_TITLE] = useState("");
  const [COMMENT_CONTENT, setCOMMENT_CONTENT] = useState("");

  //

  const initdb = async () => {
    setProgress(true);
    const res = await axios.get(process.env.REACT_APP_DB_HOST + "/api/board", {
      params: {
        type: "CS",
      },
    });
    setBoardData(res.data);

    setProgress(false);
  };

  const columns = [
    { field: "id", headerName: "순번", width: 100 },
    { field: "BOARD_TITLE", headerName: "제목", width: 250 },
    { field: "BOARD_WRITER", headerName: "작성자", width: 150 },
    {
      field: "BOARD_REGDATE",
      headerName: "작성일",
      width: 200,
      editable: false,
      renderCell: (params) => {
        const formattedDate = formatDate(params.value);
        const formattedTime = formatTime(params.value);
        return (
          <span>
            {formattedDate} {formattedTime}
          </span>
        );
      },
    },
    { field: "BOARD_TEL", headerName: "연락처", width: 150 },
    { field: "ANSWER_CK", headerName: "답변여부", width: 100 },
    { field: "COMMENT_WRITER", headerName: "답변자", width: 150 },
    {
      field: "COMMENT_REGDATE",
      headerName: "답변일",
      width: 200,
      renderCell: (params) => {
        const formattedDate = formatDate(params.value);
        const formattedTime = formatTime(params.value);
        return (
          <span>
            {formattedDate} {formattedTime}
          </span>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<Create />}
            label=""
            sx={{
              color: "primary.main",
            }}
            onClick={() => {
              setBOARD_SID(apiRef.current.getRow(id).BOARD_SID);
              setDialogOpen(true);
            }}
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    initdb();
  }, []);

  const apiRef = useGridApiRef();
  return (
    <>
      <S.MainLayout>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="left">전체</ToggleButton>
          <ToggleButton value="center">상품</ToggleButton>
          <ToggleButton value="right">배송</ToggleButton>
          <ToggleButton value="justify">기타</ToggleButton>
        </ToggleButtonGroup>
        <Box sx={{ height: 750, width: "100%" }}>
          <DataGrid
            rows={boardData}
            columns={columns}
            // onCellEditStop={(params) => {
            //   console.log(params);
            //   handleEditUser(params);
            // }}
            // processRowUpdate={(updatedRow, originalRow) => {
            //   handleClickOpen(updatedRow);
            //   return updatedRow;
            // }}
            apiRef={apiRef}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 15,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={() => {
              setSnackbar(false);
            }}
            autoHideDuration={3000}
          >
            <Alert
              {...snackbar}
              onClose={() => {
                setSnackbar(false);
              }}
            />
          </Snackbar>
        )}
      </S.MainLayout>

      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ textAlign: "center", width: "350px" }}
        >
          답변하기
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textAlign: "left", padding: "10px 0" }}
          >
            <Box sx={{ width: "80%", margin: "0 auto", marginBottom: "16px" }}>
              <TextField
                label="답변자"
                fullWidth
                value={COMMENT_WRITER}
                onChange={(e) => {
                  setCOMMENT_WRITER(e.target.value);
                }}
              />
            </Box>
            <Box sx={{ width: "80%", margin: "0 auto", marginBottom: "16px" }}>
              <TextField
                label="답변 제목"
                fullWidth
                value={COMMENT_TITLE}
                onChange={(e) => {
                  setCOMMENT_TITLE(e.target.value);
                }}
              />
            </Box>
            <Box sx={{ width: "80%", margin: "0 auto" }}>
              <CustomQuill
                setContent={setCOMMENT_CONTENT}
                initContent={COMMENT_CONTENT}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={async () => {
              if (COMMENT_WRITER === "") {
                alert("답변자를 입력해주세요.");
                return;
              }
              if (COMMENT_TITLE === "") {
                alert("제목을 입력해주세요.");
                return;
              }
              if (COMMENT_CONTENT === "") {
                alert("내용을 입력해주세요.");
                return;
              }

              const res = await axios.post(
                process.env.REACT_APP_DB_HOST + "/api/comment",
                {
                  BOARD_SID: BOARD_SID,
                  USER_ID: data?.USER_ID,
                  COMMENT_WRITER: COMMENT_WRITER,
                  COMMENT_TITLE: COMMENT_TITLE,
                  COMMENT_CONTENT: COMMENT_CONTENT,
                }
              );

              if (res.status === 200) {
                setSnackbar({
                  children: "답변을 완료하였습니다.",
                  severity: "success",
                });
                initdb();
                setDialogOpen(false);
              }
            }}
          >
            확인
          </Button>
          <Button
            onClick={() => {
              setDialogOpen(false);
            }}
          >
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminCs;
