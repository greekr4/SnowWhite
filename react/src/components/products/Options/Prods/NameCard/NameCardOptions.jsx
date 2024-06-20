import { ArrowDropDown } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const NameCardOptions = ({
  SelectOptions,
  setSelectOptions,
  optionList,
  setOptionList,
}) => {
  //코팅
  const [coatingDetail, setCoatingDetail] = useState("");
  //귀도리
  const [roundingAll, setRoundingAll] = useState(false);
  const [roundingRightUp, setRoundingRightUp] = useState(false);
  const [roundingRightDown, setRoundingRightDown] = useState(false);
  const [roundingLeftUp, setRoundingLeftUp] = useState(false);
  const [roundingLeftDown, setRoundingLeftDown] = useState(false);
  //오시
  const [osiDetail, setOsiDetail] = useState("");
  //미싱
  const [missingDetail, setMissingDetail] = useState("");
  //타공
  const [punchingArea, setPunchingArea] = useState("");
  const [punchingQty, setPunchingQty] = useState("");

  useEffect(() => {
    // 코팅 State 기본 세팅
    if (SelectOptions.일반지.코팅 === true) {
      setCoatingDetail("단면무광코팅");
    } else {
      setCoatingDetail("");
    }

    // 귀도리 State 기본 세팅
    if (SelectOptions.일반지.귀도리 === true) {
      setRoundingAll(true);
      setRoundingRightUp(true);
      setRoundingRightDown(true);
      setRoundingLeftUp(true);
      setRoundingLeftDown(true);
    } else {
      setRoundingAll(false);
      setRoundingRightUp(false);
      setRoundingRightDown(false);
      setRoundingLeftUp(false);
      setRoundingLeftDown(false);
    }

    // 오시 State 기본 세팅
    if (SelectOptions.일반지.오시 === true) {
      setOsiDetail("1줄");
    } else {
      setOsiDetail("");
    }

    // 미싱 State 기본 세팅
    if (SelectOptions.일반지.미싱 === true) {
      setMissingDetail("1줄");
    } else {
      setMissingDetail("");
    }

    // 타공 State 기본 세팅
    if (SelectOptions.일반지.타공 === true) {
      setPunchingArea("4mm");
      setPunchingQty("1개");
    } else {
      setPunchingArea("");
      setPunchingQty("");
    }
  }, [SelectOptions]);

  // 귀도리 전체 체크 true/false
  useEffect(() => {
    if (
      roundingRightUp &&
      roundingRightDown &&
      roundingLeftUp &&
      roundingLeftDown
    ) {
      setRoundingAll(true);
    } else {
      setRoundingAll(false);
    }
  }, [roundingLeftUp, roundingRightUp, roundingLeftDown, roundingRightDown]);

  // 옵션 나열하기
  useEffect(() => {
    const copyOptionList = { ...optionList };

    let rounding = "";
    if (roundingAll) {
      rounding = "전체";
    } else {
      if (roundingLeftUp) rounding += "좌상 ";
      if (roundingRightUp) rounding += "우상 ";
      if (roundingLeftDown) rounding += "좌하 ";
      if (roundingRightDown) rounding += "우하 ";
    }

    copyOptionList.일반지.코팅 = coatingDetail;
    copyOptionList.일반지.귀도리 = rounding;
    copyOptionList.일반지.오시 = osiDetail;
    copyOptionList.일반지.미싱 = missingDetail;
    copyOptionList.일반지.타공 = `${punchingArea} ${punchingQty}`;

    setOptionList(copyOptionList);
  }, [
    coatingDetail,
    roundingAll,
    roundingRightUp,
    roundingRightDown,
    roundingLeftUp,
    roundingLeftDown,
    osiDetail,
    missingDetail,
    punchingArea,
    punchingQty,
  ]);

  return (
    <>
      {/* 일반지-코팅 */}
      {SelectOptions.일반지.코팅 && (
        <Box sx={{ display: "flex", padding: "6px 0" }}>
          <Box
            sx={{
              flexBasis: "20%",
              border: "1px solid #ced4da",
              height: "80px",
              textAlign: "center",
            }}
          >
            <Box sx={{ lineHeight: "45px" }}>코팅</Box>
            <Box
              sx={{
                lineHeight: "20px",
                height: "20px",
                width: "110px",
                color: "#8B969F",
                background: "#F6F7FC",
                margin: "0 auto",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              후가공안내
              <ArrowDropDown
                sx={{ position: "relative", left: "5px", width: "20px" }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              flexBasis: "80%",
              border: "1px solid #ced4da",
              borderLeft: "none",
              height: "80px",
              background: "aliceblue",
            }}
          >
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue="top"
              sx={{ height: "80px", padding: "0 12px" }}
              value={coatingDetail}
              onChange={(e) => {
                setCoatingDetail(e.target.value);
              }}
            >
              <FormControlLabel
                value="단면무광코팅"
                control={<Radio size="small" />}
                label="단면무광코팅"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
              />
              <FormControlLabel
                value="단면유광코팅"
                control={<Radio size="small" />}
                label="단면유광코팅"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
              />
              <FormControlLabel
                value="양면무광코팅"
                control={<Radio size="small" />}
                label="양면무광코팅"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
              />
              <FormControlLabel
                value="양면유광코팅"
                control={<Radio size="small" />}
                label="양면유광코팅"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
              />
            </RadioGroup>
          </Box>
        </Box>
      )}
      {/* 일반지-코팅 끝 */}
      {/* 일반지-귀도리 */}
      {SelectOptions.일반지.귀도리 && (
        <Box sx={{ display: "flex", padding: "6px 0" }}>
          <Box
            sx={{
              flexBasis: "20%",
              border: "1px solid #ced4da",
              height: "80px",
              textAlign: "center",
            }}
          >
            <Box sx={{ lineHeight: "45px" }}>귀도리</Box>
            <Box
              sx={{
                lineHeight: "20px",
                height: "20px",
                width: "110px",
                color: "#8B969F",
                background: "#F6F7FC",
                margin: "0 auto",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              후가공안내
              <ArrowDropDown
                sx={{ position: "relative", left: "5px", width: "20px" }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              flexBasis: "80%",
              border: "1px solid #ced4da",
              borderLeft: "none",
              height: "80px",
              background: "aliceblue",
            }}
          >
            <Box sx={{ height: "80px", padding: "0 12px" }}>
              <FormControlLabel
                value="전체"
                control={<Checkbox size="small" />}
                label="전체"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
                checked={roundingAll}
                onChange={(e) => {
                  setRoundingAll(e.target.checked);
                  setRoundingRightUp(e.target.checked);
                  setRoundingRightDown(e.target.checked);
                  setRoundingLeftUp(e.target.checked);
                  setRoundingLeftDown(e.target.checked);
                }}
                sx={{ height: "80px" }}
              />
              <FormControlLabel
                value="좌상"
                control={<Checkbox size="small" />}
                label="좌상"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
                checked={roundingLeftUp}
                onChange={(e) => {
                  setRoundingLeftUp(e.target.checked);
                }}
                sx={{ height: "80px" }}
              />
              <FormControlLabel
                value="우상"
                control={<Checkbox size="small" />}
                label="우상"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
                checked={roundingRightUp}
                onChange={(e) => {
                  setRoundingRightUp(e.target.checked);
                }}
                sx={{ height: "80px" }}
              />
              <FormControlLabel
                value="좌하"
                control={<Checkbox size="small" />}
                label="좌하"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
                checked={roundingLeftDown}
                onChange={(e) => {
                  setRoundingLeftDown(e.target.checked);
                }}
                sx={{ height: "80px" }}
              />
              <FormControlLabel
                value="우하"
                control={<Checkbox size="small" />}
                label="우하"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
                checked={roundingRightDown}
                onChange={(e) => {
                  setRoundingRightDown(e.target.checked);
                }}
                sx={{ height: "80px" }}
              />
            </Box>
          </Box>
        </Box>
      )}
      {/* 일반지-귀도리 끝 */}
      {/* 일반지-오시 */}
      {SelectOptions.일반지.오시 && (
        <Box sx={{ display: "flex", padding: "6px 0" }}>
          <Box
            sx={{
              flexBasis: "20%",
              border: "1px solid #ced4da",
              height: "80px",
              textAlign: "center",
            }}
          >
            <Box sx={{ lineHeight: "45px" }}>오시</Box>
            <Box
              sx={{
                lineHeight: "20px",
                height: "20px",
                width: "110px",
                color: "#8B969F",
                background: "#F6F7FC",
                margin: "0 auto",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              후가공안내
              <ArrowDropDown
                sx={{ position: "relative", left: "5px", width: "20px" }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              flexBasis: "80%",
              border: "1px solid #ced4da",
              borderLeft: "none",
              height: "80px",
              background: "aliceblue",
            }}
          >
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue="top"
              sx={{ height: "80px", padding: "0 12px" }}
              value={osiDetail}
              onChange={(e) => {
                setOsiDetail(e.target.value);
              }}
            >
              <FormControlLabel
                value="1줄"
                control={<Radio size="small" />}
                label="1줄"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
              />
              <FormControlLabel
                value="2줄"
                control={<Radio size="small" />}
                label="2줄"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
              />
              <FormControlLabel
                value="3줄"
                control={<Radio size="small" />}
                label="3줄"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
              />
            </RadioGroup>
          </Box>
        </Box>
      )}
      {/* 일반지-오시 끝 */}
      {/* 일반지-미싱 */}
      {SelectOptions.일반지.미싱 && (
        <Box sx={{ display: "flex", padding: "6px 0" }}>
          <Box
            sx={{
              flexBasis: "20%",
              border: "1px solid #ced4da",
              height: "80px",
              textAlign: "center",
            }}
          >
            <Box sx={{ lineHeight: "45px" }}>미싱</Box>
            <Box
              sx={{
                lineHeight: "20px",
                height: "20px",
                width: "110px",
                color: "#8B969F",
                background: "#F6F7FC",
                margin: "0 auto",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              후가공안내
              <ArrowDropDown
                sx={{ position: "relative", left: "5px", width: "20px" }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              flexBasis: "80%",
              border: "1px solid #ced4da",
              borderLeft: "none",
              height: "80px",
              background: "aliceblue",
            }}
          >
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              defaultValue="top"
              sx={{ height: "80px", padding: "0 12px" }}
              value={missingDetail}
              onChange={(e) => {
                setMissingDetail(e.target.value);
              }}
            >
              <FormControlLabel
                value="1줄"
                control={<Radio size="small" />}
                label="1줄"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
              />
              <FormControlLabel
                value="2줄"
                control={<Radio size="small" />}
                label="2줄"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
              />
              <FormControlLabel
                value="3줄"
                control={<Radio size="small" />}
                label="3줄"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
              />
            </RadioGroup>
          </Box>
        </Box>
      )}
      {/* 일반지-미싱 끝 */}
      {/* 일반지-타공 */}
      {SelectOptions.일반지.타공 && (
        <Box sx={{ display: "flex", padding: "6px 0" }}>
          <Box
            sx={{
              flexBasis: "20%",
              border: "1px solid #ced4da",
              height: "80px",
              textAlign: "center",
            }}
          >
            <Box sx={{ lineHeight: "45px" }}>타공</Box>
            <Box
              sx={{
                lineHeight: "20px",
                height: "20px",
                width: "110px",
                color: "#8B969F",
                background: "#F6F7FC",
                margin: "0 auto",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              후가공안내
              <ArrowDropDown
                sx={{ position: "relative", left: "5px", width: "20px" }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              flexBasis: "80%",
              border: "1px solid #ced4da",
              borderLeft: "none",
              height: "80px",
              background: "aliceblue",
            }}
          >
            <Select
              sx={{ width: "150px", margin: "20px 0 20px 6px" }}
              size="small"
              value={punchingArea}
              onChange={(e) => {
                setPunchingArea(e.target.value);
              }}
            >
              <MenuItem sx={{ fontSize: "14px" }} value={"4mm"}>
                4mm
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value={"5mm"}>
                5mm
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value={"6mm"}>
                6mm
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value={"7mm"}>
                7mm
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value={"8mm"}>
                8mm
              </MenuItem>
            </Select>
            <Select
              sx={{ width: "150px", margin: "20px 0 20px 6px" }}
              size="small"
              value={punchingQty}
              onChange={(e) => {
                setPunchingQty(e.target.value);
              }}
            >
              <MenuItem sx={{ fontSize: "14px" }} value={"1개"}>
                1개
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value={"2개"}>
                2개
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value={"3개"}>
                3개
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value={"4개"}>
                4개
              </MenuItem>
            </Select>
          </Box>
        </Box>
      )}
      {/* 일반지-타공 끝 */}
    </>
  );
};

export default NameCardOptions;
