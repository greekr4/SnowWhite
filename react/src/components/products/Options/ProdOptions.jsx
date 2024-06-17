import React from "react";
import NameCard from "./NameCard";
import { Box } from "@mui/material";
import NameCard_Premium from "./NameCard_Premium";

const ProdOptions = ({ prod, SelectOptions, setSelectOptions }) => {
  return (
    <Box
      sx={{
        padding: "12px 0",
        margin: "12px 0",
        borderTop: "1px solid #e0e0e0",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      {prod === "일반지" && (
        <NameCard
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
        />
      )}
      {prod === "고급지" && (
        <NameCard_Premium
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
        />
      )}
    </Box>
  );
};

export default ProdOptions;
