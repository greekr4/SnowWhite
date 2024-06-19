import { ArrowBack, ArrowDownward, ArrowDropDown } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import React from "react";

const OptionDetail = ({ SelectOptions, setSelectOptions }) => {
  return (
    <>
      {/* 명함-코팅 */}
      {SelectOptions.명함.코팅 && (
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
      {/* 명함-코팅 끝 */}
      {/* 명함-귀도리 */}
      {SelectOptions.명함.귀도리 && (
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
                onChange={(e) => {}}
                sx={{ height: "80px" }}
              />
              <FormControlLabel
                value="좌상"
                control={<Checkbox size="small" />}
                label="좌상"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
                onChange={(e) => {}}
                sx={{ height: "80px" }}
              />
              <FormControlLabel
                value="우상"
                control={<Checkbox size="small" />}
                label="우상"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
                onChange={(e) => {}}
                sx={{ height: "80px" }}
              />
              <FormControlLabel
                value="좌하"
                control={<Checkbox size="small" />}
                label="좌하"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
                onChange={(e) => {}}
                sx={{ height: "80px" }}
              />
              <FormControlLabel
                value="우하"
                control={<Checkbox size="small" />}
                label="우하"
                labelPlacement="end"
                classes={{ label: "custom-label" }}
                onChange={(e) => {}}
                sx={{ height: "80px" }}
              />
            </Box>
          </Box>
        </Box>
      )}
      {/* 명함-귀도리 끝 */}
      {/* 명함-오시 */}
      {SelectOptions.명함.오시 && (
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
      {/* 명함-오시 끝 */}
      {/* 명함-미싱 */}
      {SelectOptions.명함.미싱 && (
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
      {/* 명함-미싱 끝 */}
      {/* 명함-타공 */}
      {SelectOptions.명함.타공 && (
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
              onChange={(e) => {}}
              size="small"
              defaultValue={"4mm"}
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
              onChange={(e) => {}}
              size="small"
              defaultValue={"1개"}
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
      {/* 명함-타공 끝 */}
    </>
  );
};

export default OptionDetail;
