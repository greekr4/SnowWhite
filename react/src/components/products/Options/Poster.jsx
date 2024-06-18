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
  백색모조: [80, 100, 120, 150, 180, 220],
  미색모조: [80, 100, 120],
  스노우화이트: [80, 100, 120, 150, 180, 200, 250, 300],
  아트: [80, 100, 120, 150, 180, 200, 250, 300],
  아르떼: [105, 130, 160, 190, 210, 230, 310],
  랑데부: [105, 130, 160, 190, 210, 240],
  몽블랑: [105, 130, 160, 190, 210, 240],
};

const Poster = ({ SelectOptions, setSelectOptions }) => {
  const [PaperSize, setPaperSize] = useState("508*738");
  const [DefaultPaper, setDefaultPaper] = useState("백색모조");
  const [DefaultGram, setDefaultGram] = useState("80g");
  const [PrintMethod, setPrintMethod] = useState("양면");
  const [Quantity, setQuantity] = useState("1");

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
        <Box sx={{ display: "flex" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{ width: "48%", marginRight: "2%" }}
            fullWidth
            value={PaperSize}
            onChange={(e) => {
              setPaperSize(e.target.value);
            }}
          >
            <MenuItem value={"420*594"}>A2 (420*594)</MenuItem>
            <MenuItem value={"297*420"}>A3 (297*420)</MenuItem>
            <MenuItem value={"508*738"}>B2 (508*738)</MenuItem>
            <MenuItem value={"364*505"}>B3 (364*505)</MenuItem>
            <MenuItem value={"257*364"}>B4 (257*364)</MenuItem>
            <MenuItem value={"465*636"}>국반절 (465*636)</MenuItem>
            <MenuItem value={"직접입력"}>직접입력</MenuItem>
          </Select>
        </Box>
        {PaperSize === "직접입력" && (
          <Box
            sx={{
              marginTop: "12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField sx={{ width: "48%" }} label="가로" /> *{" "}
            <TextField sx={{ width: "48%" }} label="세로" />
          </Box>
        )}
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
            sx={{ width: "48%", marginRight: "2%" }}
            fullWidth
            value={DefaultPaper}
            onChange={(e) => {
              setDefaultPaper(e.target.value);
            }}
          >
            <MenuItem value={"백색모조"}>백색모조</MenuItem>
            <MenuItem value={"미색모조"}>미색모조</MenuItem>
            <MenuItem value={"스노우화이트"}>스노우화이트</MenuItem>
            <MenuItem value={"아트"}>아트</MenuItem>
            <MenuItem value={"아르떼"}>아르떼</MenuItem>
            <MenuItem value={"랑데부"}>랑데부</MenuItem>
            <MenuItem value={"몽블랑"}>몽블랑</MenuItem>
          </Select>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{ width: "48%", marginLeft: "2%" }}
            fullWidth
            value={DefaultGram}
            onChange={(e) => {
              setDefaultGram(e.target.value);
            }}
          >
            {papers[DefaultPaper].map((gram) => (
              <MenuItem value={gram + "g"}>{gram + "g"}</MenuItem>
            ))}
            <MenuItem value={"210g"}>210g</MenuItem>
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
          인쇄방법
        </InputLabel>
        <Box sx={{ display: "flex" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{ width: "48%", marginRight: "2%" }}
            fullWidth
            value={PrintMethod}
            onChange={(e) => {
              setPrintMethod(e.target.value);
            }}
          >
            <MenuItem value={"양면"}>양면</MenuItem>
            <MenuItem value={"단면"}>단면</MenuItem>
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
          value="코팅"
          control={<Checkbox size="small" />}
          label="코팅"
          labelPlacement="top"
          classes={{ label: "custom-label" }}
          onChange={(e) => {
            const copyOptions = { ...SelectOptions };
            copyOptions.명함[e.target.value] = e.target.checked;
            setSelectOptions(copyOptions);
          }}
        />
        <FormControlLabel
          value="귀도리"
          control={<Checkbox size="small" />}
          label="귀도리"
          labelPlacement="top"
          classes={{ label: "custom-label" }}
          onChange={(e) => {
            const copyOptions = { ...SelectOptions };
            copyOptions.명함[e.target.value] = e.target.checked;
            setSelectOptions(copyOptions);
          }}
        />
        <FormControlLabel
          value="오시"
          control={<Checkbox size="small" />}
          label="오시"
          labelPlacement="top"
          classes={{ label: "custom-label" }}
          onChange={(e) => {
            const copyOptions = { ...SelectOptions };
            copyOptions.명함[e.target.value] = e.target.checked;
            setSelectOptions(copyOptions);
          }}
        />
        <FormControlLabel
          value="미싱"
          control={<Checkbox size="small" />}
          label="미싱"
          labelPlacement="top"
          classes={{ label: "custom-label" }}
          onChange={(e) => {
            const copyOptions = { ...SelectOptions };
            copyOptions.명함[e.target.value] = e.target.checked;
            setSelectOptions(copyOptions);
          }}
        />
        <FormControlLabel
          value="타공"
          control={<Checkbox size="small" />}
          label="타공"
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

export default Poster;
