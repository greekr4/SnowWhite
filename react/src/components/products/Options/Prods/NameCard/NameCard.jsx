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

const NameCard = ({ SelectOptions, setSelectOptions }) => {
  const [DefaultPaper, setDefaultPaper] = useState("스노우화이트");
  const [DefaultGram, setDefaultGram] = useState("250g");
  const [DefaultQuantity, setDefaultQuantity] = useState(100);

  useEffect(() => {
    const copyOptions = { ...SelectOptions };
    copyOptions.일반지.용지 = DefaultPaper + DefaultGram;
    setSelectOptions(copyOptions);
  }, [DefaultPaper, DefaultGram]);

  useEffect(() => {
    const copyOptions = { ...SelectOptions };
    copyOptions.일반지.수량 = DefaultQuantity;
    setSelectOptions(copyOptions);
  }, [DefaultQuantity]);

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
          용지
        </InputLabel>
        <Box sx={{ display: "flex" }}>
          <Select
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
            size="small"
          >
            <MenuItem sx={{ fontSize: "14px" }} value={"스노우화이트"}>
              스노우화이트
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"아트지"}>
              아트지
            </MenuItem>
          </Select>
          <Select
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
            <MenuItem sx={{ fontSize: "14px" }} value={"250g"}>
              250g
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"300g"}>
              300g
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
          <Select
            sx={{
              width: "48%",
              marginRight: "2%",
              height: "40px",
              fontSize: "14px",
            }}
            fullWidth
            value={DefaultQuantity}
            onChange={(e) => {
              setDefaultQuantity(e.target.value);
            }}
          >
            <MenuItem sx={{ fontSize: "14px" }} value={"100"}>
              100
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"200"}>
              200
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"300"}>
              300
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"400"}>
              400
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"500"}>
              500
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"600"}>
              600
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"700"}>
              700
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"800"}>
              800
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"900"}>
              900
            </MenuItem>
            <MenuItem sx={{ fontSize: "14px" }} value={"1000"}>
              1000
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
            copyOptions.일반지[e.target.value] = e.target.checked;
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
            copyOptions.일반지[e.target.value] = e.target.checked;
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
            copyOptions.일반지[e.target.value] = e.target.checked;
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
            copyOptions.일반지[e.target.value] = e.target.checked;
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
            copyOptions.일반지[e.target.value] = e.target.checked;
            setSelectOptions(copyOptions);
          }}
        />
      </Box>
    </Box>
  );
};

export default NameCard;
