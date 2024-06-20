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
import NameCardOptions from "./Prods/NameCard/NameCardOptions";

const OptionDetail = ({
  prod,
  SelectOptions,
  setSelectOptions,
  optionList,
  setOptionList,
}) => {
  return (
    <>
      {prod === ("일반지" || "고급지") && (
        <NameCardOptions
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
    </>
  );
};

export default OptionDetail;
