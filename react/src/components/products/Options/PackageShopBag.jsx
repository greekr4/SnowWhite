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

const papers = {
  아트지: [180, 200, 250, 300],
  스노우화이트: [180, 200, 250, 300],
  아르떼: [190, 210, 230, 310],
  랑데부: [190, 210, 240],
  몽블랑: [190, 210, 240],
};

const PackageShopBag = ({ SelectOptions, setSelectOptions }) => {
  const [PaperSize, setPaperSize] = useState("210*297");
  const [DefaultPaper, setDefaultPaper] = useState("아트지");
  const [DefaultGram, setDefaultGram] = useState("80g");
  const [PrintMethod, setPrintMethod] = useState("양면");
  const [Quantity, setQuantity] = useState("100");
  const [StickerCoating, setStickerCoating] = useState("유광코팅");
  const [ThomsonType, setThomsonType] = useState("원");

  useEffect(() => {
    setDefaultGram(papers[DefaultPaper][0] + "g");
  }, [DefaultPaper]);

  useEffect(() => {
    const copyOptions = { ...SelectOptions };
    copyOptions.전단지.용지 = DefaultPaper + DefaultGram;
    setSelectOptions(copyOptions);
  }, [DefaultPaper, DefaultGram]);

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
          <MenuItem sx={{ fontSize: "14px" }} value={"420*594"}>
            가로180 x 높이200 x 폭100
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"297*420"}>
            가로210 x 높이300 x 폭85
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"210*297"}>
            가로265 x 높이250x 폭105
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"148*210"}>
            가로270 x 높이380x 폭100
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"105*148"}>
            가로300 x 높이400x 폭130
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"506*736"}>
            가로310 x 높이230x 폭100
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
            <TextField sx={{ width: "30%" }} label="가로" />x
            <TextField sx={{ width: "30%" }} label="세로" />x
            <TextField sx={{ width: "30%" }} label="높이" />
          </Box>
        )}
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
          용지
        </InputLabel>
        <Box sx={{ display: "flex" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{
              width: "48%",
              marginRight: "2%",
              height: "40px",
              fontSize: "14px",
            }}
            fullWidth
            value={DefaultPaper}
            onChange={(e) => {
              setDefaultPaper(e.target.value);
            }}
          >
            <MenuItem sx={{ fontSize: "14px" }} value={"아트지"}>
              아트지
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"스노우화이트"}>
              스노우화이트
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"아르떼"}>
              아르떼
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"랑데부"}>
              랑데부
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"몽블랑"}>
              몽블랑
            </MenuItem>
          </Select>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{
              width: "48%",
              marginRight: "2%",
              height: "40px",
              fontSize: "14px",
            }}
            fullWidth
            value={DefaultGram}
            onChange={(e) => {
              setDefaultGram(e.target.value);
            }}
          >
            {papers[DefaultPaper].map((gram) => (
              <MenuItem sx={{ fontSize: "14px" }} value={gram + "g"}>
                {gram + "g"}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "space-between",
        }}
      ></Box>
      <Box sx={{ marginTop: "12px" }}>
        <InputLabel
          sx={{
            fontSize: "0.8em",
            fontWeight: "500",
            color: "#000",
            marginBottom: "6px",
          }}
        >
          코팅
        </InputLabel>
        <Box sx={{ display: "flex" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{
              width: "48%",
              marginRight: "2%",
              height: "40px",
              fontSize: "14px",
            }}
            fullWidth
            value={StickerCoating}
            onChange={(e) => {
              setStickerCoating(e.target.value);
            }}
          >
            <MenuItem sx={{ fontSize: "14px" }} value={"유광코팅"}>
              유광코팅
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"무광코팅"}>
              무광코팅
            </MenuItem>
          </Select>
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

      <Divider sx={{ margin: "12px 0" }} />
      <Box sx={{ marginTop: "12px" }}>
        <InputLabel
          sx={{
            fontSize: "0.8em",
            fontWeight: "500",
            color: "#000",
            borderBottom: "1px solid #e0e0e0",
            paddingBottom: "12px",
            marginBottom: "12px",
          }}
        >
          후가공
        </InputLabel>

        <FormControlLabel
          value="박"
          control={<Checkbox size="small" />}
          label="박"
          labelPlacement="top"
          classes={{ label: "custom-label" }}
          onChange={(e) => {
            const copyOptions = { ...SelectOptions };
            copyOptions.명함[e.target.value] = e.target.checked;
            setSelectOptions(copyOptions);
          }}
        />
        <FormControlLabel
          value="에폭시"
          control={<Checkbox size="small" />}
          label="에폭시"
          labelPlacement="top"
          classes={{ label: "custom-label" }}
          onChange={(e) => {
            const copyOptions = { ...SelectOptions };
            copyOptions.명함[e.target.value] = e.target.checked;
            setSelectOptions(copyOptions);
          }}
        />
      </Box>
    </Box>
  );
};

export default PackageShopBag;
