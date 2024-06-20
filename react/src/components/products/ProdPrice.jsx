import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

import * as S from "../../styles/new_styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProdPrice = ({
  USER_ID,
  openPopup,
  setSnackbar,
  designFile,
  setDesignFile,
  designCheck,
  setDesignCheck,
  handleSendCart,
  imgUrl,
}) => {
  const navigate = useNavigate();

  const handleUploadDesign = () => {
    if (USER_ID === undefined) {
      openPopup(0);
      return false;
    }
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".ai,.pdf");
    input.click();
    input.addEventListener("change", async () => {
      const file = input.files[0];

      //체크
      const allowedExtensions = [".ai", ".pdf"];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes("." + fileExtension)) {
        setSnackbar({
          children: "올바른 파일 형식을 선택해주세요. (ai 또는 pdf)",
          severity: "error",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "design");
      formData.append("userid", USER_ID);
      try {
        const result = await axios.post(
          process.env.REACT_APP_DB_HOST + "/api/upload_design",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const designUrl = result.data;
        setSnackbar({
          children: "파일이 업로드 되었습니다.",
          severity: "success",
        });
        setDesignFile(designUrl);
        setDesignCheck(true);
      } catch (error) {
        console.log("실패");
      }
    });
  };

  return (
    <Box
      className="orderBtn"
      sx={{
        position: "fixed",
        right: "0",
        top: "81px",
        border: "1px solid #ddd",
        zIndex: "1000",
        width: "360px",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      {/* 가격 */}
      <Box>
        <Box
          sx={{
            width: "100%",
            height: "300px",
            padding: "12px 0",
            marginBottom: "24px",
            background: `center url(${imgUrl}) no-repeat`,
            backgroundSize: "cover",
          }}
        ></Box>
        <Typography
          sx={{
            textAlign: "center",
            borderBottom: "1px solid rgba(224, 224, 224, 1)",
            paddingBottom: "24px",
          }}
        >
          견적서
        </Typography>
        <Table sx={{ marginBottom: "12px" }}>
          <TableBody>
            <TableRow>
              <TableCell sx={{ border: "none" }}>인쇄비</TableCell>
              <TableCell sx={{ border: "none" }} align="right">
                {"0"}원
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ border: "none" }}>후가공</TableCell>
              <TableCell sx={{ border: "none" }} align="right">
                {"0"}원
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ border: "" }}>총합</TableCell>
              <TableCell sx={{ border: "" }} align="right">
                {"0"}원
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      <S.ProdDetailDesignBtns>
        <S.Btn
          width="200px"
          style={{ margin: "0 12px", height: "50px" }}
          onClick={() => {
            navigate("/editor");
          }}
          disabled
        >
          직접 디자인하기
        </S.Btn>
        <S.Btn
          width="200px"
          style={{ margin: "0 12px", height: "50px" }}
          onClick={handleUploadDesign}
        >
          파일 업로드
        </S.Btn>
      </S.ProdDetailDesignBtns>
      {designCheck && (
        <S.ProdDetailDesignBtns>
          <S.Btn
            style={{ margin: "0 12px", height: "50px", width: "200px" }}
            onClick={() => {
              window.open(designFile);
            }}
          >
            업로드 파일 확인
          </S.Btn>
        </S.ProdDetailDesignBtns>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <S.ProdDetailPayButton onClick={handleSendCart}>
          주문하기
        </S.ProdDetailPayButton>
        <S.ProdDetailPayButton onClick={handleSendCart}>
          장바구니에 담기
        </S.ProdDetailPayButton>
      </Box>
    </Box>
  );
};

export default ProdPrice;
