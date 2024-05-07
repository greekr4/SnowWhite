import {
  Alert,
  Box,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
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
import { DataGrid, GridDeleteIcon, useGridApiRef } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { Add } from "@mui/icons-material";
const AdminOptionPrice = () => {
  const columns = [
    { field: "id", headerName: "순번", width: 150 },
    {
      field: "OPTION_NM",
      headerName: "후가공이름",
      width: 150,
      editable: true,
    },
    {
      field: "OPTION_DETAIL",
      headerName: "후가공상세",
      width: 200,
      editable: true,
    },
    {
      field: "OPTION_DEFAULT_QTY",
      headerName: "기본수량",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <>{new Intl.NumberFormat("ko-KR").format(params.value)}</>
      ),
    },
    {
      field: "OPTION_DEFAULT_AMT",
      headerName: "기본금액",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <>{new Intl.NumberFormat("ko-KR").format(params.value)}</>
      ),
    },
    {
      field: "OPTION_ADD_QTY",
      headerName: "추가수량",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <>{new Intl.NumberFormat("ko-KR").format(params.value)}</>
      ),
    },
    {
      field: "OPTION_ADD_AMT",
      headerName: "추가금액",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <>{new Intl.NumberFormat("ko-KR").format(params.value)}</>
      ),
    },
    {
      field: "OPTION_ETC",
      headerName: "비고",
      width: 200,
      editable: true,
    },
    {
      field: "OPTION_REGDATE",
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
      field: "OPTION_MODIDATE",
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
      await axios.get(process.env.REACT_APP_DB_HOST + "/api/admin/option_price")
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

  const handleClickOpen = (row) => {
    setOpen(true);
    setSelectedValue(row);
  };

  const handleClose = (value) => {
    setOpen(false);
    setAddOpen(false);
  };
  const apiRef = useGridApiRef();

  const [addOpen, setAddOpen] = useState(false);

  const handleDelete = async () => {
    const OPTION_SIDS = [];
    Array.from(apiRef.current.getSelectedRows().values()).map((el, index) => {
      OPTION_SIDS.push(el.OPTION_SID);
    });

    const res = await axios.delete(
      process.env.REACT_APP_DB_HOST + "/api/admin/option_price",
      {
        data: {
          OPTION_SIDS: OPTION_SIDS,
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
      </Box>

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
      process.env.REACT_APP_DB_HOST + "/api/admin/option_price",
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
          '{selectedValue?.OPTION_NM}' 변경하시겠습니까?
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

  const options = [
    {
      value: "오시",
      label: "오시",
      sub: [
        {
          value: "1줄",
          label: "1줄",
        },
        {
          value: "2줄",
          label: "2줄",
        },
        {
          value: "3줄",
          label: "3줄",
        },
      ],
    },
    {
      value: "미싱",
      label: "미싱",
      sub: [
        {
          value: "1줄",
          label: "1줄",
        },
        {
          value: "2줄",
          label: "2줄",
        },
        {
          value: "3줄",
          label: "3줄",
        },
      ],
    },
    {
      value: "코팅",
      label: "코팅",
      sub: [
        {
          value: "단면유광코팅",
          label: "단면유광코팅",
        },
        {
          value: "단면무광코팅",
          label: "단면무광코팅",
        },
        {
          value: "양면유광코팅",
          label: "양면유광코팅",
        },
        {
          value: "양면무광코팅",
          label: "양면무광코팅",
        },
      ],
    },
    {
      value: "도무송",
      label: "도무송",
      sub: [
        {
          value: "1개",
          label: "1개",
        },
        {
          value: "2개",
          label: "2개",
        },
        {
          value: "3개",
          label: "3개",
        },
        {
          value: "4개",
          label: "4개",
        },
      ],
    },
    {
      value: "박",
      label: "박",
      sub: [
        {
          value: "금박(유광)",
          label: "금박(유광)",
        },
        {
          value: "금박(무광)",
          label: "금박(무광)",
        },
        {
          value: "은박(유광)",
          label: "은박(유광)",
        },
        {
          value: "은박(무광)",
          label: "은박(무광)",
        },
        {
          value: "청박(유광)",
          label: "청박(유광)",
        },
        {
          value: "적박(유광)",
          label: "적박(유광)",
        },
        {
          value: "녹박(유광)",
          label: "녹박(유광)",
        },
        {
          value: "먹박(유광)",
          label: "먹박(유광)",
        },
        {
          value: "펄박(유광)",
          label: "펄박(유광)",
        },
        {
          value: "홀로그램박(은펄)",
          label: "홀로그램박(은펄)",
        },
        {
          value: "홀로그램박(별)",
          label: "홀로그램박(별)",
        },
        {
          value: "홀로그램박(물방울)",
          label: "홀로그램박(물방울)",
        },
        {
          value: "로즈골드박(유광)",
          label: "로즈골드박(유광)",
        },
        {
          value: "퍼플박(유광)",
          label: "퍼플박(유광)",
        },
        {
          value: "백박(무광)",
          label: "백박(무광)",
        },
      ],
    },
    {
      value: "형압",
      label: "형압",
      sub: [
        {
          value: "앞",
          label: "앞",
        },
        {
          value: "뒤",
          label: "뒤",
        },
      ],
    },
    {
      value: "타공",
      label: "타공",
      sub: [
        { value: "1개", label: "1개" },
        { value: "2개", label: "2개" },
        { value: "3개", label: "3개" },
        { value: "4개", label: "4개" },
      ],
    },
    {
      value: "접지",
      label: "접지",
      sub: [
        {
          value: "반접지",
          label: "반접지",
        },
        {
          value: "3단접지",
          label: "3단접지",
        },
        {
          value: "4단접지",
          label: "4단접지",
        },
        {
          value: "N접지",
          label: "N접지",
        },
        // {
        //   value: "4단병풍접지",
        //   label: "4단병풍접지",
        // },
        // {
        //   value: "5단병풍접지",
        //   label: "5단병풍접지",
        // },
        // {
        //   value: "6단병풍접지",
        //   label: "6단병풍접지",
        // },
        // {
        //   value: "십자접지",
        //   label: "십자접지",
        // },
        // {
        //   value: "N접지후반접지",
        //   label: "N접지후반접지",
        // },
        // {
        //   value: "반접고3단접지",
        //   label: "반접고3단접지",
        // },
        // {
        //   value: "4단접지후반접지",
        //   label: "4단접지후반접지",
        // },
        // {
        //   value: "4단병풍후반접지",
        //   label: "4단병풍후반접지",
        // },
        // {
        //   value: "3단접지후반접지",
        //   label: "3단접지후반접지",
        // },
      ],
    },
    {
      value: "접착",
      label: "접착",
      sub: [
        {
          value: "1면접착",
          label: "1면접착",
        },
        {
          value: "2면접착",
          label: "2면접착",
        },
        // {
        //   value: "양면테잎1개",
        //   label: "양면테잎1개",
        // },
        // {
        //   value: "양면테잎2개",
        //   label: "양면테잎2개",
        // },
      ],
    },
    {
      value: "귀도리",
      label: "귀도리",
      sub: [
        {
          value: "둥근 모서리",
          label: "둥근 모서리",
        },
      ],
    },
    // {
    //   value: "부분코팅",
    //   label: "부분코팅",
    // },
    {
      value: "에폭시",
      label: "에폭시",
      sub: [
        {
          value: "앞",
          label: "앞",
        },
        {
          value: "뒤",
          label: "뒤",
        },
        {
          value: "양면",
          label: "양면",
        },
      ],
    },
  ];

  const [selectedOptionNm, setSelectedOptionNm] = useState();
  const [selectedOptionDetail, setSelectedOptionDetail] = useState();
  const [optionDetails, setOptionDetails] = useState([]);
  const [OPTION_DEFAULT_QTY, setOPTION_DEFAULT_QTY] = useState();
  const [OPTION_DEFAULT_AMT, setOPTION_DEFAULT_AMT] = useState();
  const [OPTION_ADD_QTY, setOPTION_ADD_QTY] = useState();
  const [OPTION_ADD_AMT, setOPTION_ADD_AMT] = useState();
  const [OPTION_ETC, setOPTION_ETC] = useState();

  // useEffect(() => {
  //   if (selectedOptionNm === undefined) {
  //     return false;
  //   }
  //   const updated = [...options];
  //   if (!updated.find((option) => option.value === selectedOptionNm).sub) {
  //     return false;
  //   }
  //   setOptionDetails(
  //     updated.find((option) => option.value === selectedOptionNm).sub
  //   );
  //   console.log(
  //     updated.find((option) => option.value === selectedOptionNm).sub
  //   );
  // }, [selectedOptionNm]);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={800}>
      {/* <DialogTitle id="alert-dialog-title">알림</DialogTitle> */}
      <DialogTitle
        sx={{ m: 0, p: 2, textAlign: "center" }}
        id="customized-dialog-title"
      >
        후가공 옵션 추가
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
                    <TableCell>후가공이름</TableCell>
                    <TableCell>후가공상세</TableCell>
                    <TableCell>기본수량</TableCell>
                    <TableCell>기본금액</TableCell>
                    <TableCell>추가수량</TableCell>
                    <TableCell>추가금액</TableCell>
                    <TableCell>비고</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <TextField
                        id="outlined-select-currency"
                        select
                        sx={{ width: "120px" }}
                        value={selectedOptionNm}
                        onChange={(e) => {
                          setSelectedOptionNm(e.target.value);
                          const updated = [...options];
                          console.log(
                            updated.find(
                              (option) => option.value === e.target.value
                            ).sub
                          );
                          setOptionDetails(
                            updated.find(
                              (option) => option.value === e.target.value
                            ).sub
                          );
                        }}
                      >
                        {options?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="outlined-select-currency"
                        select
                        sx={{ width: "180px" }}
                        value={selectedOptionDetail}
                        onChange={(e) => {
                          setSelectedOptionDetail(e.target.value);
                          console.log(e.target.value);
                        }}
                      >
                        {optionDetails?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="standard-basic"
                        variant="standard"
                        placeholder="499"
                        size="small"
                        sx={{ width: "90px" }}
                        value={OPTION_DEFAULT_QTY}
                        onChange={(e) => {
                          setOPTION_DEFAULT_QTY(e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="standard-basic"
                        variant="standard"
                        placeholder="2000"
                        size="small"
                        sx={{ width: "90px" }}
                        value={OPTION_DEFAULT_AMT}
                        onChange={(e) => {
                          setOPTION_DEFAULT_AMT(e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="standard-basic"
                        variant="standard"
                        placeholder="150"
                        size="small"
                        sx={{ width: "90px" }}
                        value={OPTION_ADD_QTY}
                        onChange={(e) => {
                          setOPTION_ADD_QTY(e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="standard-basic"
                        variant="standard"
                        placeholder="1000"
                        size="small"
                        sx={{ width: "90px" }}
                        value={OPTION_ADD_AMT}
                        onChange={(e) => {
                          setOPTION_ADD_AMT(e.target.value);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="standard-basic"
                        variant="standard"
                        placeholder="명함-귀도리"
                        size="small"
                        sx={{ width: "90px" }}
                        value={OPTION_ETC}
                        onChange={(e) => {
                          setOPTION_ETC(e.target.value);
                        }}
                      />
                    </TableCell>
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
              const res = await axios.post(
                process.env.REACT_APP_DB_HOST + "/api/admin/option_price",
                {
                  OPTION_NM: selectedOptionNm,
                  OPTION_DETAIL: selectedOptionDetail,
                  OPTION_DEFAULT_QTY: OPTION_DEFAULT_QTY,
                  OPTION_DEFAULT_AMT: OPTION_DEFAULT_AMT,
                  OPTION_ADD_QTY: OPTION_ADD_QTY,
                  OPTION_ADD_AMT: OPTION_ADD_AMT,
                  OPTION_ETC: OPTION_ETC,
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

export default AdminOptionPrice;
