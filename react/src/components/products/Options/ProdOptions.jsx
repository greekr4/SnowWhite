import React from "react";
import { Box } from "@mui/material";

import Poster from "./Poster";
import DieCutSticker from "./DieCutSticker";
import ThomsonSticker from "./ThomsonSticker";
import PackageBox from "./PackageBox";
import PackageCorBox from "./PackageCorBox";
import PackageShopBag from "./PackageShopBag";

import NameCard from "./Prods/NameCard/NameCard";
import NameCard_Premium from "./Prods/NameCard/NameCard_Premium";
import Flyer from "./Prods/Flyer/Flyer";
import PostCard from "./Prods/PostCard/PostCard";
import Leaflet from "./Prods/Leaflet/Leaflet";
import Booklet from "./Prods/Booklet/Booklet";
import Brochure from "./Prods/Booklet/Brochure";
import SpringNoteBook from "./Prods/Booklet/SpringNoteBook";
import Proposal from "./Prods/Booklet/Proposal";
import NoteBook from "./Prods/Booklet/Notebook";
import Xbanner from "./Prods/XBanner/Xbanner";
import Banner from "./Prods/Banner/Banner";

const ProdOptions = ({
  prod,
  SelectOptions,
  setSelectOptions,
  optionList,
  setOptionList,
}) => {
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
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "고급지" && (
        <NameCard_Premium
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "전단지" && (
        <Flyer
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "엽서" && (
        <PostCard
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "포스터" && (
        <Poster
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "리플릿" && (
        <Leaflet
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "재단 스티커" && (
        <DieCutSticker
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "도무송 스티커" && (
        <ThomsonSticker
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "단행본" && (
        <Booklet
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "브로슈어" && (
        <Brochure
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "스프링노트" && (
        <SpringNoteBook
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "제안서" && (
        <Proposal
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "노트" && (
        <NoteBook
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "박스" && (
        <PackageBox
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "합지박스" && (
        <PackageCorBox
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "쇼핑백" && (
        <PackageShopBag
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "현수막" && (
        <Banner
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
      {prod === "X배너" && (
        <Xbanner
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      )}
    </Box>
  );
};

export default ProdOptions;
