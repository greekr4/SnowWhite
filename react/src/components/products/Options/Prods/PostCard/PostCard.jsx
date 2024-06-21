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

const papers = {
  백상지: [100, 120, 150, 180, 220],
  아트지: [100, 120, 150, 180, 200, 250, 300],
  스노우화이트: [100, 120, 150, 180, 200, 250, 300],
  아르떼: [105, 130, 160, 190, 210, 230],
  랑데부: [105, 130, 160, 190, 210, 240],
  몽블랑: [105, 130, 160, 190, 210, 240],
};

const PostCard = ({ SelectOptions, setSelectOptions }) => {
  const [PaperSize, setPaperSize] = useState("100x148");
  const [PaperWidth, setPaperWidth] = useState(100);
  const [PaperHeight, setPaperHeight] = useState(148);
  const [DefaultPaper, setDefaultPaper] = useState("백상지");
  const [DefaultGram, setDefaultGram] = useState("80g");
  const [PrintMethod, setPrintMethod] = useState("양면");
  const [Quantity, setQuantity] = useState("1");

  useEffect(() => {
    setDefaultGram(papers[DefaultPaper][0] + "g");
  }, [DefaultPaper]);

  useEffect(() => {
    const copyOptions = { ...SelectOptions };

    copyOptions.엽서.가로 = parseInt(PaperWidth);
    copyOptions.엽서.세로 = parseInt(PaperHeight);
    copyOptions.엽서.용지 = DefaultPaper + DefaultGram;
    copyOptions.엽서.인쇄 = PrintMethod;
    copyOptions.엽서.수량 = parseInt(Quantity);
    setSelectOptions(copyOptions);
  }, [
    PaperSize,
    PaperWidth,
    PaperHeight,
    DefaultPaper,
    DefaultGram,
    Quantity,
    PrintMethod,
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
        <Box sx={{ display: "flex" }}>
          <Select
            sx={{ width: "98%", height: "40px", fontSize: "14px" }}
            fullWidth
            value={PaperSize}
            onChange={(e) => {
              setPaperSize(e.target.value);
            }}
          >
            <MenuItem sx={{ fontSize: "14px" }} value={"100x148"}>
              100mm x 148mm
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"105x148"}>
              105mm x 148mm
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"200x148"}>
              200mm x 148mm
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"210x148"}>
              210mm x 148mm
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"직접입력"}>
              직접입력
            </MenuItem>
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
            <TextField
              size="small"
              sx={{ width: "48%" }}
              label="가로"
              value={PaperWidth}
              onChange={(e) => {
                setPaperWidth(e.target.value);
              }}
            />{" "}
            x{" "}
            <TextField
              size="small"
              sx={{ width: "48%" }}
              label="세로"
              value={PaperHeight}
              onChange={(e) => {
                setPaperHeight(e.target.value);
              }}
            />
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
            <MenuItem sx={{ fontSize: "14px" }} value={"백상지"}>
              백상지
            </MenuItem>
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
            sx={{
              width: "48%",
              marginRight: "2%",
              height: "40px",
              fontSize: "14px",
            }}
            fullWidth
            value={PrintMethod}
            onChange={(e) => {
              setPrintMethod(e.target.value);
            }}
          >
            <MenuItem sx={{ fontSize: "14px" }} value={"양면"}>
              양면
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"단면"}>
              단면
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
          value="코팅"
          control={<Checkbox size="small" />}
          label="코팅"
          labelPlacement="top"
          classes={{ label: "custom-label" }}
          onChange={(e) => {
            const copyOptions = { ...SelectOptions };
            copyOptions.엽서[e.target.value] = e.target.checked;
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
            copyOptions.엽서[e.target.value] = e.target.checked;
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
            copyOptions.엽서[e.target.value] = e.target.checked;
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
            copyOptions.엽서[e.target.value] = e.target.checked;
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
            copyOptions.엽서[e.target.value] = e.target.checked;
            setSelectOptions(copyOptions);
          }}
        />
      </Box>
    </Box>
  );
};

export default PostCard;
