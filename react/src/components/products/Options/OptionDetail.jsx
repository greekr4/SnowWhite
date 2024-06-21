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
import NameCardOptions from "./Prods/NameCard/NameCard_Premium_detail";
import NameCard_detail from "./Prods/NameCard/NameCard_detail";
import NameCard_Premium_detail from "./Prods/NameCard/NameCard_Premium_detail";
import Flyer_detail from "./Prods/Flyer/Flyer_detail";
import PostCard_detail from "./Prods/PostCard/PostCard_detail";
import Leaflet_detail from "./Prods/Leaflet/Leaflet_detail";

const OptionDetail = ({
  prod,
  SelectOptions,
  setSelectOptions,
  optionList,
  setOptionList,
}) => {
  return (
    <>
      {prod === "일반지" && (
        <NameCard_detail
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "고급지" && (
        <NameCard_Premium_detail
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "전단지" && (
        <Flyer_detail
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "엽서" && (
        <PostCard_detail
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "리플릿" && (
        <Leaflet_detail
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
