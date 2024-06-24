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
import { SenecaData } from "./sensca";

const CoverPapers = {
  백상지: [180, 220, 260],
  아트지: [180, 200, 250, 300],
  스노우화이트: [180, 200, 250, 300],
  아르떼: [190, 210, 230],
  랑데부: [190, 210, 240],
  몽블랑: [190, 210, 240],
};
const InnerPapers = {
  백상지: [100, 120, 150, 180, 220, 260],
  아트지: [100, 120, 150, 180, 200, 250, 300],
  스노우화이트: [100, 120, 150, 180, 200, 250, 300],
  아르떼: [105, 130, 160, 190, 210, 230],
  랑데부: [105, 130, 160, 190, 210, 240],
  몽블랑: [105, 130, 160, 190, 210, 240],
};

const SpringNoteBook = ({ SelectOptions, setSelectOptions }) => {
  const [PaperSize, setPaperSize] = useState("210x297");
  const [PaperWidth, setPaperWidth] = useState(210);
  const [PaperHeight, setPaperHeight] = useState(297);
  const [CoverPaper, setCoverPaper] = useState("백상지");
  const [CoverGram, setCoverGram] = useState("180g");
  const [CoverPrintMethod, setCoverPrintMethod] = useState("양면");
  const [CoverSeneka, setCoverSeneka] = useState("0mm");
  const [InnerPaper, setInnerPaper] = useState("백상지");
  const [InnerGram, setInnerGram] = useState("100g");
  const [InnerPrintMethod, setInnerPrintMethod] = useState("양면");
  const [InnerPage, setInnerPage] = useState(40);
  const [Binding, setBinding] = useState("스프링");
  const [Quantity, setQuantity] = useState(10);

  useEffect(() => {
    setCoverGram(CoverPapers[CoverPaper][0] + "g");
  }, [CoverPaper]);

  useEffect(() => {
    setInnerGram(InnerPapers[InnerPaper][0] + "g");
  }, [InnerPaper]);

  useEffect(() => {
    if (PaperSize === "직접입력") return;
    setPaperWidth(parseInt(PaperSize.split("x")[0].replace("mm", "")));
    setPaperHeight(parseInt(PaperSize.split("x")[1].replace("mm", "")));
  }, [PaperSize]);

  useEffect(() => {
    const copyOptions = { ...SelectOptions };
    copyOptions.책자.규격 = PaperSize;
    copyOptions.책자.가로 = parseInt(PaperWidth);
    copyOptions.책자.세로 = parseInt(PaperHeight);
    copyOptions.책자.표지 = CoverPaper + CoverGram;
    copyOptions.책자.표지인쇄 = CoverPrintMethod;
    copyOptions.책자.내지 = InnerPaper + InnerGram;
    copyOptions.책자.내지인쇄 = InnerPrintMethod;
    copyOptions.책자.페이지 = parseInt(InnerPage);
    copyOptions.책자.제본 = Binding;
    copyOptions.책자.수량 = parseInt(Quantity);

    setSelectOptions(copyOptions);
  }, [
    PaperSize,
    PaperWidth,
    PaperHeight,
    CoverPaper,
    CoverGram,
    InnerPaper,
    InnerGram,
    InnerPage,
    Binding,
    Quantity,
    CoverPrintMethod,
    InnerPrintMethod,
  ]);

  //세네카 구하기

  useEffect(() => {
    const copyOptions = { ...SelectOptions };

    const paperQty = InnerPrintMethod === "양면" ? InnerPage / 2 : InnerPage;
    const Seneca = (
      SenecaData[InnerPaper]?.[InnerGram.replace("g", "")] * paperQty +
      0.5
    ).toFixed(1);

    setCoverSeneka(Seneca + "mm");
    copyOptions.책자.세네카 = Seneca + "mm";
    setSelectOptions(copyOptions);
  }, [InnerPage, InnerPaper, InnerGram, InnerPrintMethod]);

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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Select
            sx={{
              width: "31%",
              marginRight: "2%",
              height: "40px",
              fontSize: "14px",
            }}
            fullWidth
            value={CoverPaper}
            onChange={(e) => {
              setCoverPaper(e.target.value);
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
            sx={{
              width: "31%",
              marginRight: "2%",
              height: "40px",
              fontSize: "14px",
            }}
            fullWidth
            value={CoverGram}
            onChange={(e) => {
              setCoverGram(e.target.value);
            }}
          >
            {CoverPapers[CoverPaper].map((gram) => (
              <MenuItem sx={{ fontSize: "14px" }} value={gram + "g"}>
                {gram + "g"}
              </MenuItem>
            ))}
          </Select>
          <Select
            sx={{
              width: "31%",
              marginRight: "2%",
              height: "40px",
              fontSize: "14px",
            }}
            fullWidth
            value={CoverPrintMethod}
            onChange={(e) => {
              setCoverPrintMethod(e.target.value);
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
        <Box
          sx={{
            marginTop: "16px",
          }}
        >
          <TextField
            sx={{ width: "31%" }}
            size="small"
            aria-readonly="true"
            label="세네카 (책등)"
            value={CoverSeneka}
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
            marginBottom: "6px",
          }}
        >
          내지
        </InputLabel>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{
              width: "31%",
              marginRight: "2%",
              height: "40px",
              fontSize: "14px",
            }}
            fullWidth
            value={InnerPaper}
            onChange={(e) => {
              setInnerPaper(e.target.value);
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
            sx={{
              width: "31%",
              marginRight: "2%",
              height: "40px",
              fontSize: "14px",
            }}
            fullWidth
            value={InnerGram}
            onChange={(e) => {
              setInnerGram(e.target.value);
            }}
          >
            {InnerPapers[InnerPaper].map((gram) => (
              <MenuItem sx={{ fontSize: "14px" }} value={gram + "g"}>
                {gram + "g"}
              </MenuItem>
            ))}
          </Select>
          <Select
            sx={{
              width: "31%",
              marginRight: "2%",
              height: "40px",
              fontSize: "14px",
            }}
            fullWidth
            value={InnerPrintMethod}
            onChange={(e) => {
              setInnerPrintMethod(e.target.value);
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
          페이지
        </InputLabel>
        <Box sx={{ display: "flex" }}>
          <TextField
            size="small"
            sx={{ width: "31%" }}
            type="number"
            value={InnerPage}
            onChange={(e) => {
              let num = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남기기
              if (num === "" || parseInt(num) < 0) {
                num = 2; // 빈 값이거나 0 이하일 경우 40로 설정
              }
              if (num % 2 !== 0 && num != 1) {
                if (e.target.value > InnerPage) {
                  num = parseInt(num) + 1;
                } else {
                  num = parseInt(num) - 1;
                }
              }

              setInnerPage(num);
            }}
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
            marginBottom: "6px",
          }}
        >
          제본
        </InputLabel>
        <Box sx={{ display: "flex" }}>
          <Select
            sx={{
              width: "31%",
              marginRight: "2%",
              height: "40px",
              fontSize: "14px",
            }}
            fullWidth
            value={Binding}
            onChange={(e) => {
              setBinding(e.target.value);
            }}
          >
            <MenuItem sx={{ fontSize: "14px" }} value={"스프링"}>
              스프링
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
            sx={{ width: "31%" }}
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
          value="표지코팅"
          control={<Checkbox size="small" />}
          label="표지코팅"
          labelPlacement="top"
          classes={{ label: "custom-label" }}
          onChange={(e) => {
            const copyOptions = { ...SelectOptions };
            copyOptions.책자[e.target.value] = e.target.checked;
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
            copyOptions.책자[e.target.value] = e.target.checked;
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
            copyOptions.책자[e.target.value] = e.target.checked;
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
            copyOptions.책자[e.target.value] = e.target.checked;
            setSelectOptions(copyOptions);
          }}
        />
      </Box>
    </Box>
  );
};

export default SpringNoteBook;
