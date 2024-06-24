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
  네오CCP: [300],
  MGB화이트: [300],
  로얄아이보리: [300],
  아이보리: [300],
  SC마닐라: [300],
};

const PackageCorBox = ({ SelectOptions, setSelectOptions }) => {
  const [PaperSize, setPaperSize] = useState("210x297");
  const [DefaultPaper, setDefaultPaper] = useState("네오CCP");
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
          <MenuItem sx={{ fontSize: "14px" }} value={"420x594"}>
            A2 (420mm x 594mm)
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"297x420"}>
            A3 (297mm x 420mm)
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"210x297"}>
            A4 (210mm x 297mm)
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"148x210"}>
            A5 (148mm x 210mm)
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"105x148"}>
            A6 (105mm x 148mm)
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"506x736"}>
            B2 (506mm x 736mm)
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"364x505"}>
            B3 (364mm x 505mm)
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"257x364"}>
            B4 (257mm x 364mm)
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"188x257"}>
            B5 (188mm x 257mm)
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"127x188"}>
            B6 (127mm x 188mm)
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"465x636"}>
            국반절 (465mm x 636mm)
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
            <TextField size="small" sx={{ width: "48%" }} label="가로" /> x{" "}
            <TextField size="small" sx={{ width: "48%" }} label="세로" />
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
            <MenuItem sx={{ fontSize: "14px" }} value={"네오CCP"}>
              네오CCP
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"MGB화이트"}>
              MGB화이트
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"로얄아이보리"}>
              로얄아이보리
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"아이보리"}>
              아이보리
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"SC마닐라"}>
              SC마닐라
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
          value="형압"
          control={<Checkbox size="small" />}
          label="형압"
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

export default PackageCorBox;
