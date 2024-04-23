import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as S from "../../styles/new_styles";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
const AdminUser = () => {
  const columns = [
    { field: "id", headerName: "순번", width: 150 },
    {
      field: "USER_NM",
      headerName: "이름",
      width: 150,
      editable: true,
    },
    {
      field: "USER_ID",
      headerName: "아이디",
      width: 150,
      editable: true,
    },
    {
      field: "USER_TEL0",
      headerName: "전화번호",
      width: 200,
      editable: true,
    },
    {
      field: "USER_POINT",
      headerName: "포인트",
      // type: "number",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <>{new Intl.NumberFormat("ko-KR").format(params.value)}</>
      ),
    },
    {
      field: "USER_GRADE",
      headerName: "회원등급",
      width: 150,
      editable: true,
      renderCell: (params) => <>{params.value === 9 ? "관리자" : "일반회원"}</>,
    },
    {
      field: "ORDER_CNT",
      headerName: "주문횟수",
      // type: "number",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <>{new Intl.NumberFormat("ko-KR").format(params.value)}</>
      ),
    },
    {
      field: "ORDER_AMT",
      headerName: "주문금액",
      // type: "number",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <>{new Intl.NumberFormat("ko-KR").format(params.value)}</>
      ),
    },
    {
      field: "LOGIN_CNT",
      headerName: "방문수",
      // type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "USER_REGDATE",
      headerName: "가입일",
      // type: "number",
      width: 150,
      editable: true,
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

  const rows = [
    {
      id: 1,
      USER_NM: "Snow",
      USER_ID: "Jon",
      USER_TEL0: "010-4191-1611",
      USER_POINT: 0,
      USER_GRADE: "운영자",
      LOGIN_CNT: 0,
      ORDER_AMT: "10,000",
      LOGIN_CNT: 0,
    },
  ];

  const [dataRows, setDataRows] = useState([]);

  useEffect(() => {
    initdb();
    console.log(dataRows);
  }, []);

  const initdb = async () => {
    const res = (
      await axios.get(process.env.REACT_APP_DB_HOST + "/api/admin/user")
    ).data;

    console.log(res);

    setDataRows(res);
  };

  return (
    <>
      <S.MainLayout>
        <S.AdminWrapper></S.AdminWrapper>
      </S.MainLayout>
      {/* <div style={{ margin: "10em auto", width: "100px" }}>
        <CircularProgress />
      </div> */}
      <Box sx={{ height: 520, width: "100%" }}>
        <DataGrid
          rows={dataRows}
          columns={columns}
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
    </>
  );
};

export default AdminUser;
