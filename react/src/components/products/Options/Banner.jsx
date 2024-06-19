import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as S from "../../../styles/new_styles";
import { Verified } from "@mui/icons-material";

const Banner = ({ SelectOptions, setSelectOptions }) => {
  const [PaperSize, setPaperSize] = useState("600x1800");
  const [DefaultPaper, setDefaultPaper] = useState("일반현수막");
  const [DefaultGram, setDefaultGram] = useState("80g");
  const [PrintMethod, setPrintMethod] = useState("양면");
  const [Quantity, setQuantity] = useState("100");
  const [StickerCoating, setStickerCoating] = useState("유광코팅");
  const [ThomsonType, setThomsonType] = useState("원");

  return (
    <Box>
      <Box sx={{}}>
        <InputLabel
          sx={{
            fontSize: "0.8em",
            fontWeight: "500",
            color: "#000",
            marginBottom: "6px",
          }}
        >
          규격
        </InputLabel>
        <Select
          sx={{ width: "98%", height: "40px", fontSize: "14px" }}
          fullWidth
          value={PaperSize}
          onChange={(e) => {
            setPaperSize(e.target.value);
          }}
        >
          <MenuItem sx={{ fontSize: "14px" }} value={"600x1800"}>
            600mm x 1800mm
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"600x1600"}>
            600mm x 1600mm
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"400x1200"}>
            400mm x 1200mm
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"500x1500"}>
            500mm x 1500mm
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"직접입력"}>
            직접입력
          </MenuItem>
        </Select>
        {PaperSize === "직접입력" && (
          <Box
            sx={{
              marginTop: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField size="small" sx={{ width: "48%" }} label="가로" />x
            <TextField size="small" sx={{ width: "48%" }} label="세로" />
          </Box>
        )}
      </Box>
      <Divider sx={{ margin: "12px 0" }} />
      <Box
        sx={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <InputLabel
            sx={{
              fontSize: "0.8em",
              fontWeight: "500",
              color: "#000",
              marginBottom: "6px",
            }}
          >
            소재
          </InputLabel>
          <Box sx={{ display: "flex" }}>
            <Select
              sx={{ width: "98%", height: "40px", fontSize: "14px" }}
              fullWidth
            >
              <MenuItem sx={{ fontSize: "14px" }} value={"일반현수막"}>
                일반현수막
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value={"유포지"}>
                유포지
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value={"유포그레이"}>
                유포그레이
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value={"켈"}>
                켈
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value={"켈그레이"}>
                켈그레이
              </MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "48%", marginRight: "1%" }}>
          <InputLabel
            sx={{
              fontSize: "0.8em",
              fontWeight: "500",
              color: "#000",
              marginBottom: "6px",
            }}
          >
            후가공
          </InputLabel>
          <Box sx={{ display: "flex" }}>
            <Select
              sx={{ width: "98%", height: "40px", fontSize: "14px" }}
              fullWidth
            >
              <MenuItem sx={{ fontSize: "14px" }} value={"아일렛"}>
                아일렛
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value={"각목마감"}>
                각목마감
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value={"선택안함"}>
                선택안함
              </MenuItem>
            </Select>
          </Box>
        </Box>
        <Box sx={{ width: "48%", marginRight: "1%" }}>
          <InputLabel
            sx={{
              fontSize: "0.8em",
              fontWeight: "500",
              color: "#000",
              marginBottom: "6px",
            }}
          >
            열재단
          </InputLabel>
          <Box sx={{ display: "flex" }}>
            <Select
              sx={{ width: "98%", height: "40px", fontSize: "14px" }}
              fullWidth
            >
              <MenuItem sx={{ fontSize: "14px" }} value={"사방여백"}>
                사방여백
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value={"여백없음"}>
                여백없음
              </MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ margin: "12px 0" }} />

      <Box sx={{ marginTop: "12px" }}>
        <InputLabel
          sx={{
            fontSize: "0.8em",
            fontWeight: "500",
            color: "#000",
            marginBottom: "6px",
          }}
        >
          수량
        </InputLabel>
        <Box sx={{ display: "flex" }}>
          <TextField
            sx={{ width: "48%" }}
            size="small"
            value={Quantity}
            onChange={(e) => {
              let num = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
              if (num === "" || parseInt(num) <= 0) {
                num = "1"; // 빈 값이거나 0 이하일 경우 1로 설정
              }
              setQuantity(num);
            }}
            type="number"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
