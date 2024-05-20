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
} from "@mui/material";
import axios from "axios";
import {
  DataGrid,
  GridActionsCellItem,
  GridVisibilityOffIcon,
} from "@mui/x-data-grid";
import { formatDate, formatTime } from "../../hooks/Utill";
import { Create } from "@mui/icons-material";

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
            onClick={() => {}}
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    initdb();
  }, []);
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
    </>
  );
};

export default AdminCs;
