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
  아트지: [80, 100, 120, 150, 180, 220],
  모조지: [80, 100, 120],
  투명데드롱: [80, 100, 120, 150, 180, 200, 250, 300],
  은데드롱: [80, 100, 120, 150, 180, 200, 250, 300],
  유포지: [105, 130, 160, 190, 210, 230, 310],
};

const NoteBook_bak = ({ SelectOptions, setSelectOptions }) => {
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
          sx={{ width: "98%", height: "40px", fontSize: "14px" }}
          fullWidth
          value={PaperSize}
          onChange={(e) => {
            setPaperSize(e.target.value);
          }}
        >
          <MenuItem sx={{ fontSize: "14px" }} value={"210x297"}>
            A4 (210mm x 297mm)
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"148x210"}>
            A5 (148mm x 210mm)
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"188x257"}>
            B5 (188mm x 257mm)
          </MenuItem>
          <MenuItem sx={{ fontSize: "14px" }} value={"127x188"}>
            B6 (127mm x 188mm)
          </MenuItem>
        </Select>
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
          표지
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
          </Select>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "48%" }}>
          <InputLabel
            sx={{
              fontSize: "0.8em",
              fontWeight: "500",
              color: "#000",
              marginBottom: "6px",
            }}
          >
            표지인쇄
          </InputLabel>
          <Box sx={{ display: "flex" }}>
            <Select
              sx={{ width: "98%", height: "40px", fontSize: "14px" }}
              fullWidth
              defaultValue={"단면인쇄"}
            >
              <MenuItem sx={{ fontSize: "14px" }} value={"양면인쇄"}>
                양면인쇄
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value={"단면인쇄"}>
                단면인쇄
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
          내지
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
          내지인쇄
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
            defaultValue={"양면인쇄"}
          >
            <MenuItem sx={{ fontSize: "14px" }} value={"양면인쇄"}>
              양면인쇄
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"단면인쇄"}>
              단면인쇄
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
          페이지
        </InputLabel>
        <Box sx={{ display: "flex" }}>
          <TextField size="small" sx={{ width: "48%" }} />
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
          제본
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
            <MenuItem sx={{ fontSize: "14px" }} value={"중철"}>
              중철
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"무선"}>
              무선
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
        <FormControlLabel
          value="부분코팅"
          control={<Checkbox size="small" />}
          label="부분코팅"
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

export default NoteBook_bak;
