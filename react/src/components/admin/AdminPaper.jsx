import {
  Alert,
  Box,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import {
  DataGrid,
  GridDeleteIcon,
  GridVisibilityOffIcon,
  useGridApiRef,
} from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const AdminPaper = () => {
  const columns = [
    { field: "id", headerName: "순번", width: 150 },
    {
      field: "PAPER_CATE",
      headerName: "카테고리",
      width: 150,
      editable: true,
    },
    {
      field: "PAPER_NM",
      headerName: "판형",
      width: 150,
      editable: true,
    },
    {
      field: "PAPER_WEIGHT",
      headerName: "평량 (g)",
      width: 200,
      editable: true,
    },
    {
      field: "PAPER_QTY",
      headerName: "설정수량",
      width: 200,
      editable: true,
    },
    {
      field: "PAPER_AMT",
      headerName: "설정가격",
      width: 200,
      editable: true,
    },
    {
      field: "PAPER_PRIORITY",
      headerName: "순서",
      width: 200,
      editable: true,
    },
    {
      field: "PAPER_REGDATE",
      headerName: "추가일",
      // type: "number",
      width: 150,
      editable: false,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        const formattedTime = `${String(date.getHours()).padStart(
          2,
          "0"
        )}:${String(date.getMinutes()).padStart(2, "0")}:${String(
          date.getSeconds()
        ).padStart(2, "0")}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: "PAPER_MODIDATE",
      headerName: "수정일",
      // type: "number",
      width: 150,
      editable: false,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        const formattedTime = `${String(date.getHours()).padStart(
          2,
          "0"
        )}:${String(date.getMinutes()).padStart(2, "0")}:${String(
          date.getSeconds()
        ).padStart(2, "0")}`;
        return <span>{formattedDate}</span>;
      },
    },
  ];

  const [dataRows, setDataRows] = useState([]);
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  useEffect(() => {
    initdb();
  }, []);

  const initdb = async () => {
    const res = (
      await axios.get(process.env.REACT_APP_DB_HOST + "/api/admin/paper")
    ).data;
    setDataRows(res);
  };

  const handleEditUser = async (params) => {
    // console.log(params.row);
    // const resultConfirm = window.confirm("변경 내용을 저장하시겠습니까?");
    // if (resultConfirm) {
    //   const res = await axios.put(
    //     process.env.REACT_APP_DB_HOST + "/api/admin/user",
    //     {
    //       row: params.row,
    //     }
    //   );
    //   if (res.status === 200) {
    //     alert("변경이 완료 되었습니다.");
    //   } else {
    //     alert("변경을 실패했습니다.");
    //   }
    // }
  };

  const [selectedValue, setSelectedValue] = useState();
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const handleClickOpen = (row) => {
    setOpen(true);
    setSelectedValue(row);
  };

  const handleClose = (value) => {
    setOpen(false);
    setAddOpen(false);
  };

  const apiRef = useGridApiRef();

  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <>
      <S.MainLayout>
        <S.AdminWrapper></S.AdminWrapper>
      </S.MainLayout>
      {/* <div style={{ margin: "10em auto", width: "100px" }}>
          <CircularProgress />
        </div> */}
      <Button
        variant="outlined"
        startIcon={<Visibility />}
        style={{ marginBottom: "0.5em" }}
        onClick={() => {
          setSelectedRows(
            Array.from(apiRef.current.getSelectedRows().values())
          );
        }}
      >
        표로 보기
      </Button>
      {selectedRows.length > 0 && (
        <Button
          variant="outlined"
          startIcon={<VisibilityOff />}
          style={{ margin: "0 0 0.5em 0.5em" }}
          onClick={() => {
            setSelectedRows([]);
          }}
        >
          닫기
        </Button>
      )}
      <Button
        variant="outlined"
        startIcon={<Visibility />}
        style={{ marginBottom: "0.5em" }}
        onClick={() => {
          setAddOpen(true);
        }}
      >
        표로 보기
      </Button>
      {selectedRows.length > 0 && (
        <TableContainer component={Paper} sx={{ marginBottom: "2em" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "550",
                    width: "200px",
                  }}
                >
                  판형
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "550",
                    borderLeft: "1px solid rgba(224, 224, 224, 1)",
                    width: "100px",
                  }}
                >
                  평량
                </TableCell>
                <TableCell
                  colSpan={"100%"}
                  align="center"
                  style={{
                    fontWeight: "550",
                    borderLeft: "1px solid rgba(224, 224, 224, 1)",
                  }}
                >
                  비고
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedRows.map((el, index) => (
                <>
                  <TableRow
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "",
                    }}
                  >
                    <TableCell rowSpan={2} align="center">
                      {el.PAPER_NM}
                    </TableCell>
                    <TableCell
                      rowSpan={2}
                      align="center"
                      style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                    >
                      {el.PAPER_WEIGHT}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        borderLeft: "1px solid rgba(224, 224, 224, 1)",
                        fontWeight: "550",
                      }}
                    >
                      수량
                    </TableCell>
                    {el.PAPER_QTY?.split(",").map((qty, index) => (
                      <TableCell
                        align="center"
                        style={{
                          borderLeft: "1px solid rgba(224, 224, 224, 1)",
                        }}
                      >
                        {parseInt(qty).toLocaleString("ko-KR")}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow
                    style={{
                      backgroundColor: index % 2 === 0 ? "#f5f5f5" : "",
                    }}
                  >
                    <TableCell
                      align="center"
                      style={{
                        borderLeft: "1px solid rgba(224, 224, 224, 1)",
                        fontWeight: "550",
                      }}
                    >
                      가격
                    </TableCell>
                    {el.PAPER_AMT?.split(",").map((amt, index) => (
                      <TableCell
                        align="center"
                        style={{
                          borderLeft: "1px solid rgba(224, 224, 224, 1)",
                        }}
                      >
                        {parseInt(amt).toLocaleString("ko-KR")}
                      </TableCell>
                    ))}
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ height: 750, width: "100%" }}>
        <DataGrid
          apiRef={apiRef}
          rows={dataRows}
          columns={columns}
          // onCellEditStop={(params) => {
          //   console.log(params);
          //   handleEditUser(params);
          // }}
          processRowUpdate={(updatedRow, originalRow) => {
            handleClickOpen(updatedRow);
            return updatedRow;
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
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
          onClose={handleCloseSnackbar}
          autoHideDuration={3000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}

      <ChoiceDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        setSnackbar={setSnackbar}
      />

      <AddDialog
        selectedValue={selectedValue}
        open={addOpen}
        onClose={handleClose}
        setSnackbar={setSnackbar}
      />
    </>
  );
};

const ChoiceDialog = (props) => {
  const { onClose, selectedValue, open, setSnackbar } = props;

  const handleClose = () => {
    onClose();
    setSnackbar({
      children: "변경을 취소하였습니다.",
      severity: "info",
    });
  };

  const handleYes = async () => {
    const res = await axios.put(
      process.env.REACT_APP_DB_HOST + "/api/admin/paper",
      {
        row: selectedValue,
      }
    );
    if (res.status === 200) {
      setSnackbar({
        children: "변경을 완료하였습니다.",
        severity: "success",
      });
    } else {
      setSnackbar({
        children: "변경을 실패하였습니다.",
        severity: "error",
      });
    }
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      {/* <DialogTitle id="alert-dialog-title">알림</DialogTitle> */}
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        알림
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          '{selectedValue?.PAPER_NM}' 변경하시겠습니까?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleYes} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const AddDialog = (props) => {
  const { onClose, selectedValue, open, setSnackbar } = props;

  const handleClose = () => {
    onClose();
    setSnackbar({
      children: "변경을 취소하였습니다.",
      severity: "info",
    });
  };

  const handleYes = async () => {
    const res = await axios.put(
      process.env.REACT_APP_DB_HOST + "/api/admin/paper",
      {
        row: selectedValue,
      }
    );
    if (res.status === 200) {
      setSnackbar({
        children: "변경을 완료하였습니다.",
        severity: "success",
      });
    } else {
      setSnackbar({
        children: "변경을 실패하였습니다.",
        severity: "error",
      });
    }
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={800}>
      {/* <DialogTitle id="alert-dialog-title">알림</DialogTitle> */}
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        용지 추가하기
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <S.CustomBox>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 400 }}
              size="small"
              aria-label="a dense table"
            >
              <TableBody>
                <TableRow>
                  <TableCell align="center">카테고리</TableCell>
                  <TableCell colSpan={"100%"}>
                    <input type="text" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">판형</TableCell>
                  <TableCell colSpan={"100%"}>
                    <input type="text" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">평량</TableCell>
                  <TableCell colSpan={"100%"}>
                    <input type="text" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">수량</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>100</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">금액</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>100</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </S.CustomBox>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPaper;
