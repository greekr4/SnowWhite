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

const NameCard = ({ SelectOptions, setSelectOptions }) => {
  const [DefaultPaper, setDefaultPaper] = useState("스노우화이트");
  const [DefaultGram, setDefaultGram] = useState("250g");
  const [DefaultQuantity, setDefaultQuantity] = useState("100");

  useEffect(() => {
    const copyOptions = { ...SelectOptions };
    copyOptions.명함.용지 = DefaultPaper + DefaultGram;
    setSelectOptions(copyOptions);
  }, [DefaultPaper, DefaultGram]);

  useEffect(() => {
    const copyOptions = { ...SelectOptions };
    copyOptions.명함.수량 = DefaultQuantity;
    setSelectOptions(copyOptions);
  }, [DefaultQuantity]);

  return (
    <Box>
      <Box sx={{}}>
        <InputLabel
          sx={{ fontSize: "0.8em", fontWeight: "500", color: "#000" }}
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
            <MenuItem value={"스노우화이트"}>스노우화이트</MenuItem>
            <MenuItem value={"아트지"}>아트지</MenuItem>
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
            <MenuItem value={"250g"}>250g</MenuItem>
            <MenuItem value={"300g"}>300g</MenuItem>
          </Select>
        </Box>
      </Box>
      <Box sx={{ marginTop: "12px" }}>
        <InputLabel
          sx={{ fontSize: "0.8em", fontWeight: "500", color: "#000" }}
        >
          수량
        </InputLabel>
        <Box sx={{ display: "flex" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{ width: "48%", marginRight: "2%" }}
            fullWidth
            value={DefaultQuantity}
            onChange={(e) => {
              setDefaultQuantity(e.target.value);
            }}
          >
            <MenuItem value={"100"}>100</MenuItem>
            <MenuItem value={"200"}>200</MenuItem>
            <MenuItem value={"300"}>300</MenuItem>
            <MenuItem value={"400"}>400</MenuItem>
            <MenuItem value={"500"}>500</MenuItem>
            <MenuItem value={"600"}>600</MenuItem>
            <MenuItem value={"700"}>700</MenuItem>
            <MenuItem value={"800"}>800</MenuItem>
            <MenuItem value={"900"}>900</MenuItem>
            <MenuItem value={"1000"}>1000</MenuItem>
          </Select>
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

export default NameCard;
