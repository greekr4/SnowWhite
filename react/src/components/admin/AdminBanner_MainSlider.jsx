import { Alert, Box, Divider, Paper, Skeleton, Snackbar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import {
  DataGrid,
  GridActionsCellItem,
  GridDeleteIcon,
  useGridApiRef,
} from "@mui/x-data-grid";
import axios from "axios";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";

const AdminBanner_MainSlider = () => {
  const [dataRows, setDataRows] = useState([]);
  const [viewImage, setViewImage] = useState(null);
  const [checkedRows, setCheckedRows] = useState([]);
  const [snackbar, setSnackbar] = useState(false);
  const apiRef = useGridApiRef();

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  useEffect(() => {
    initdb();
  }, []);

  const initdb = async () => {
    const res = await axios.get(process.env.REACT_APP_DB_HOST + "/api/banner", {
      params: {
        cate: "MAIN",
      },
    });

    setDataRows(res.data);
  };

  const columns = [
    {
      field: "BANNER_IMAGE",
      headerName: "경로",
      editable: false,
      width: 500,
    },
    {
      field: "BANNER_PRIORITY",
      headerName: "순번",
      editable: true,
      type: "number",
      width: 200,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "View",
      width: 200,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="Save"
            sx={{
              color: "primary.main",
            }}
            onClick={() => {
              const filltedRow = dataRows.filter((row) => row.id === id);
              setViewImage(filltedRow[0].BANNER_IMAGE);
              console.log(viewImage);
            }}
          />,
        ];
      },
    },
  ];

  const handleUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "pdf/*");
    input.click();
    input.addEventListener("change", async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("dir", "banner");
      formData.append("userid", "admin");
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
          process.env.REACT_APP_DB_HOST + "/api/banner",
          {
            BANNER_CATE: "MAIN",
            BANNER_CODE: "0",
            BANNER_IMAGE: fileUrl,
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

  const handleSeletedDelete = async (rows) => {
    const BANNER_SID = [];
    rows.forEach((el) => {
      BANNER_SID.push(el.id);
    });
    //console.log(BANNER_SID);

    const result = await axios.delete(
      process.env.REACT_APP_DB_HOST + "/api/banner",
      {
        data: { BANNER_SID: BANNER_SID },
      }
    );

    if (result.status === 200) {
      initdb();
      setSnackbar({
        children: "삭제 완료하였습니다.",
        severity: "success",
      });
    } else {
      setSnackbar({
        children: "실패하였습니다.",
        severity: "error",
      });
    }
  };

  const handleUpdate = async (row) => {
    console.log(row);
    // row.id
    // row.BANNER_PRIORITY
    const result = await axios.put(
      process.env.REACT_APP_DB_HOST + "/api/banner",
      {
        BANNER_SID: row.id,
        BANNER_PRIORITY: row.BANNER_PRIORITY,
      }
    );

    if (result.status === 200) {
      initdb();
      setSnackbar({
        children: "변경 완료하였습니다.",
        severity: "success",
      });
    } else {
      setSnackbar({
        children: "실패하였습니다.",
        severity: "error",
      });
    }
  };
  return (
    <>
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
      <S.BannerTitle>메인화면</S.BannerTitle>
      <div style={{ cursor: "pointer" }} onClick={handleUpload}>
        {viewImage !== null ? (
          <S.ImageView_Slider img={viewImage} />
        ) : (
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={420}
            style={{
              margin: "10px auto",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              userSelect: "none",
              cursor: "pointer",
            }}
          >
            <div style={{ visibility: "visible" }}>
              <div style={{ fontSize: "1.5em", padding: "1em" }}>
                메인 슬라이드 배너
              </div>
              <div style={{ padding: "0.25em" }}>원본 사이즈 : 5120*1000</div>
              <div style={{ padding: "0.25em" }}>표출 사이즈 : 1920*500</div>
              <div style={{ padding: "0.25em" }}>업로드 : 클릭</div>
            </div>
          </Skeleton>
        )}
      </div>
      <Box sx={{ height: 450, width: "60%", margin: "2em auto" }}>
        <Button
          variant="outlined"
          startIcon={<GridDeleteIcon />}
          style={{ marginBottom: "0.5em" }}
          onClick={() => {
            handleSeletedDelete(apiRef.current.getSelectedRows());
          }}
        >
          선택 삭제
        </Button>
        <DataGrid
          apiRef={apiRef}
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
          autoSizeColumns
          processRowUpdate={(updatedRow, originalRow) => {
            handleUpdate(updatedRow);
            return updatedRow;
          }}
        />
      </Box>
    </>
  );
};

export default AdminBanner_MainSlider;
