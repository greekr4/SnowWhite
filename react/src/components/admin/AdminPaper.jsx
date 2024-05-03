import {
  Alert,
  Box,
  CircularProgress,
  Container,
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
  TextField,
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
import {
  Add,
  DeleteForever,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
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

  const handleDelete = async () => {
    const PAPER_SIDS = [];
    Array.from(apiRef.current.getSelectedRows().values()).map((el, index) => {
      PAPER_SIDS.push(el.PAPER_SID);
    });

    const res = await axios.delete(
      process.env.REACT_APP_DB_HOST + "/api/admin/paper",
      {
        data: {
          PAPER_SIDS: PAPER_SIDS,
        },
      }
    );
    if (res.status === 200) {
      setSnackbar({
        children: "삭제를 완료하였습니다.",
        severity: "success",
      });
      initdb();
    } else {
      setSnackbar({
        children: "삭제를 실패하였습니다.",
        severity: "error",
      });
    }
  };

  const handleUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "pdf/*");
    input.click();
    input.addEventListener("change", async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("dir", "excel");
      formData.append("userid", "admin");
      formData.append("fulldir", true);

      try {
        const result = await axios.post(
          process.env.REACT_APP_DB_HOST + "/api/upload_global",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const fileUrl = result.data;

        const result2 = await axios.post(
          process.env.REACT_APP_DB_HOST + "/api/paper_excel",
          {
            filePath: fileUrl,
          }
        );

        if (result2.status === 200) {
          initdb();

          setSnackbar({
            children: "업로드 완료하였습니다.",
            severity: "success",
          });
        } else {
          setSnackbar({
            children: "실패하였습니다.",
            severity: "error",
          });
        }
      } catch (error) {
        console.log("실패");
      }
    });
  };

  return (
    <>
      <S.MainLayout>
        <S.AdminWrapper></S.AdminWrapper>
      </S.MainLayout>
      {/* <div style={{ margin: "10em auto", width: "100px" }}>
          <CircularProgress />
        </div> */}
      <Box
        textAlign={"left"}
        width={"50%"}
        display={"inline-block"}
        marginBottom={"8px"}
      >
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => {
            setAddOpen(true);
          }}
        >
          추가하기
        </Button>
        <Button
          variant="outlined"
          startIcon={<GridDeleteIcon />}
          style={{ marginLeft: "6px" }}
          onClick={handleDelete}
        >
          선택 삭제
        </Button>

        <Button
          variant="outlined"
          startIcon={<Visibility />}
          style={{ marginLeft: "6px" }}
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
            style={{ marginLeft: "6px" }}
            onClick={() => {
              setSelectedRows([]);
            }}
          >
            닫기
          </Button>
        )}
      </Box>
      <Box
        textAlign={"right"}
        width={"50%"}
        display={"inline-block"}
        marginBottom={"8px"}
      >
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          style={{ marginLeft: "6px" }}
          onClick={() => {
            window.open("/download/용지관리_양식.xlsx");
          }}
        >
          양식 다운로드
        </Button>
        <Button
          variant="outlined"
          startIcon={<UploadIcon />}
          style={{ marginLeft: "6px" }}
          onClick={handleUpload}
        >
          엑셀 업로드
        </Button>
      </Box>
      {selectedRows.length > 0 && (
        <TableContainer component={Paper} sx={{ marginBottom: "2em" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
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
        initdb={initdb}
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

  const qtyRef = useRef(null);

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
  const { onClose, selectedValue, open, setSnackbar, initdb } = props;

  const handleClose = () => {
    onClose();
    setSnackbar({
      children: "추가를 취소하였습니다.",
      severity: "info",
    });
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const [paperCate, setPaperCate] = useState();
  const [paperNm, setPaperNm] = useState();
  const [paperWeight, setPaperWeight] = useState();
  const [qtyData, setQtyData] = useState(Array(10).fill(""));
  const [amtData, setAmtData] = useState(Array(10).fill(""));

  const handleChange_qty = (index, value) => {
    const newData = [...qtyData];
    newData[index] = value;
    setQtyData(newData);
  };
  const handleChange_amt = (index, value) => {
    const newData = [...amtData];
    newData[index] = value;
    setAmtData(newData);
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={800}>
      {/* <DialogTitle id="alert-dialog-title">알림</DialogTitle> */}
      <DialogTitle
        sx={{ m: 0, p: 2, textAlign: "center" }}
        id="customized-dialog-title"
      >
        용지 추가
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
                <TableHead>
                  <TableRow>
                    <TableCell>카테고리</TableCell>
                    <TableCell>판형</TableCell>
                    <TableCell>평량</TableCell>
                    <TableCell colSpan={"100%"}>비고</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell rowSpan={2}>
                      <TextField
                        id="standard-basic"
                        variant="standard"
                        placeholder="명함"
                        size="small"
                        sx={{ width: "90px" }}
                        value={paperCate}
                        onChange={(e) => {
                          setPaperCate(e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell rowSpan={2}>
                      <TextField
                        id="standard-basic"
                        variant="standard"
                        placeholder="스노우"
                        size="small"
                        sx={{ width: "90px" }}
                        value={paperNm}
                        onChange={(e) => {
                          setPaperNm(e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell rowSpan={2}>
                      <TextField
                        id="standard-basic"
                        variant="standard"
                        placeholder="210"
                        size="small"
                        sx={{ width: "90px" }}
                        type="number"
                        value={paperWeight}
                        onChange={(e) => {
                          setPaperWeight(e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: "550" }}>수량</TableCell>
                    {qtyData.map((el, index) => (
                      <TableCell>
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          placeholder={(index + 1) * 100}
                          size="small"
                          sx={{ width: "50px" }}
                          type="number"
                          value={el}
                          onChange={(e) =>
                            handleChange_qty(index, e.target.value)
                          }
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "550" }}>가격</TableCell>
                    {amtData.map((el, index) => (
                      <TableCell>
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          placeholder={(index + 1) * 5000}
                          size="small"
                          sx={{ width: "50px" }}
                          type="number"
                          value={el}
                          onChange={(e) =>
                            handleChange_amt(index, e.target.value)
                          }
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </TableBody>
            </Table>
          </TableContainer>
        </S.CustomBox>
        <Box margin={"1em 0 0 0"} width={"100%"} textAlign={"center"}>
          <Button
            variant="contained"
            onClick={async () => {
              const PAPER_QTY = [];
              const PAPER_AMT = [];
              qtyData.map((el, index) => {
                if (el !== "") PAPER_QTY.push(el);
              });
              amtData.map((el, index) => {
                if (el !== "") PAPER_AMT.push(el);
              });

              const res = await axios.post(
                process.env.REACT_APP_DB_HOST + "/api/admin/paper",
                {
                  PAPER_CATE: paperCate,
                  PAPER_NM: paperNm,
                  PAPER_WEIGHT: paperWeight,
                  PAPER_QTY: PAPER_QTY.toString(),
                  PAPER_AMT: PAPER_AMT.toString(),
                }
              );

              if (res.status === 200) {
                setSnackbar({
                  children: "추가를 완료하였습니다.",
                  severity: "success",
                });
                initdb();
              } else {
                setSnackbar({
                  children: "추가를 실패하였습니다.",
                  severity: "error",
                });
              }
              onClose();
            }}
          >
            추가
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPaper;
