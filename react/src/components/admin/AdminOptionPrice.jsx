import {
  Alert,
  Box,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
const AdminOptionPrice = () => {
  const columns = [
    { field: "id", headerName: "순번", width: 150 },
    {
      field: "OPTION_NM",
      headerName: "옵션이름",
      width: 150,
      editable: true,
    },
    {
      field: "OPTION_DETAIL",
      headerName: "옵션상세",
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
  };
  const apiRef = useGridApiRef();
  return (
    <>
      <S.MainLayout>
        <S.AdminWrapper></S.AdminWrapper>
      </S.MainLayout>
      {/* <div style={{ margin: "10em auto", width: "100px" }}>
          <CircularProgress />
        </div> */}
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
export default AdminOptionPrice;
