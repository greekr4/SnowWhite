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

const Xbanner = ({ SelectOptions, setSelectOptions }) => {
  const [PaperSize, setPaperSize] = useState("600x1800");
  const [PaperWidth, setPaperWidth] = useState(600);
  const [PaperHeight, setPaperHeight] = useState(1800);
  const [BannerMaterial, setBannerMaterial] = useState("무광페트"); // [무광페트, 유광페트]
  const [BannerFinish, setBannerFinish] = useState("아일렛"); // [아일렛, 각목마감, 선택안함]
  const [BannerHitcut, setBannerHitcut] = useState("사방여백"); // [사방여백, 여백없음]
  const [Quantity, setQuantity] = useState("100");

  useEffect(() => {
    if (PaperSize === "직접입력") {
      setBannerMaterial("무광페트");
      return;
    }
    if (PaperSize === "500x720") {
      setBannerMaterial("무광페트");
    }
    setPaperWidth(PaperSize.split("x")[0].replace(/[^0-9]/g, ""));
    setPaperHeight(PaperSize.split("x")[1].replace(/[^0-9]/g, ""));
  }, [PaperSize]);

  useEffect(() => {
    const copyOptions = { ...SelectOptions };
    copyOptions.X배너.규격 = PaperSize;
    copyOptions.X배너.가로 = PaperWidth;
    copyOptions.X배너.세로 = PaperHeight;
    copyOptions.X배너.소재 = BannerMaterial;
    copyOptions.X배너.후가공 = BannerFinish;
    copyOptions.X배너.열재단 = BannerHitcut;
    copyOptions.X배너.수량 = Quantity;
    setSelectOptions(copyOptions);
  }, [
    PaperSize,
    PaperWidth,
    PaperHeight,
    BannerMaterial,
    BannerFinish,
    BannerHitcut,
    Quantity,
  ]);

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
            일반 (600mm x 1800mm)
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"500x720"}>
            미니 (500mm x 720mm)
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
            <TextField
              size="small"
              sx={{ width: "48%" }}
              label="가로"
              value={PaperWidth}
              onChange={(e) => {
                let num = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
                if (num === "" || parseInt(num) <= 0) {
                  num = "1"; // 빈 값이거나 0 이하일 경우 1로 설정
                }
                setPaperWidth(num);
              }}
            />
            x
            <TextField
              size="small"
              sx={{ width: "48%" }}
              label="세로"
              value={PaperHeight}
              onChange={(e) => {
                let num = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
                if (num === "" || parseInt(num) <= 0) {
                  num = "1"; // 빈 값이거나 0 이하일 경우 1로 설정
                }
                setPaperHeight(num);
              }}
            />
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
              value={BannerMaterial}
              onChange={(e) => {
                setBannerMaterial(e.target.value);
              }}
            >
              <MenuItem sx={{ fontSize: "14px" }} value={"무광페트"}>
                무광페트(콜드코팅)
              </MenuItem>
              {PaperSize === "600x1800" && (
                <MenuItem sx={{ fontSize: "14px" }} value={"유광페트"}>
                  유광페트(콜드코팅)
                </MenuItem>
              )}
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
        <Box sx={{ width: "48%", mr: "1%" }}>
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
              value={BannerFinish}
              onChange={(e) => {
                setBannerFinish(e.target.value);
              }}
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
        <Box sx={{ width: "48%", mr: "1%" }}>
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
              value={BannerHitcut}
              onChange={(e) => {
                setBannerHitcut(e.target.value);
              }}
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

export default Xbanner;
