import {
  Box,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as S from "../../../styles/new_styles";

const papers = {
  아트지: [80, 100, 120, 150, 180, 220],
  모조지: [80, 100, 120],
  투명데드롱: [80, 100, 120, 150, 180, 200, 250, 300],
  은데드롱: [80, 100, 120, 150, 180, 200, 250, 300],
  유포지: [105, 130, 160, 190, 210, 230, 310],
};

const ThomsonSticker = ({ SelectOptions, setSelectOptions }) => {
  const [PaperSize, setPaperSize] = useState("210x297");
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
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          sx={{
            width: "48%",
            marginRight: "2%",
            height: "40px",
            fontSize: "14px",
          }}
          fullWidth
          value={ThomsonType}
          onChange={(e) => {
            setThomsonType(e.target.value);
          }}
        >
          <MenuItem sx={{ fontSize: "14px" }} value={"원"}>
            원
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"라운드"}>
            라운드
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"하트"}>
            하트
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"타원"}>
            타원
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"CD형"}>
            CD형
          </MenuItem>
        </Select>
        <Box
          sx={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField size="small" sx={{ width: "48%" }} label="도무송-가로" /> x{" "}
          <TextField size="small" sx={{ width: "48%" }} label="도무송-세로" />
        </Box>
        <Box
          sx={{
            marginTop: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField size="small" sx={{ width: "48%" }} label="재단-가로" /> x{" "}
          <TextField size="small" sx={{ width: "48%" }} label="재단-세로" />
        </Box>
      </Box>
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
            <MenuItem sx={{ fontSize: "14px" }} value={"모조지"}>
              모조지
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"투명데드롱"}>
              투명데드롱
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"은데드롱"}>
              은데드롱
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"유포지"}>
              유포지
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
            <MenuItem sx={{ fontSize: "14px" }} value={"210g"}>
              210g
            </MenuItem>
          </Select>
        </Box>
      </Box>
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
            <MenuItem sx={{ fontSize: "14px" }} value={"코팅없음"}>
              코팅없음
            </MenuItem>
          </Select>
        </Box>
      </Box>

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
      </Box>
    </Box>
  );
};

export default ThomsonSticker;
