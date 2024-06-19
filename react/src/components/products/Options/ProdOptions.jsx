import React from "react";
import NameCard from "./NameCard";
import { Box } from "@mui/material";
import NameCard_Premium from "./NameCard_Premium";
import Flyer from "./Flyer";
import PostCard from "./PostCard";
import Poster from "./Poster";
import Leaflet from "./Leaflet";
import DieCutSticker from "./DieCutSticker";
import ThomsonSticker from "./ThomsonSticker";
import Booklet from "./Booklet";
import Brochure from "./Brochure";
import Proposal from "./Proposal";
import NoteBook from "./NoteBook";
import SpringNoteBook from "./SpringNoteBook";
import PackageBox from "./PackageBox";
import PackageCorBox from "./PackageCorBox";
import PackageShopBag from "./PackageShopBag";
import Banner from "./Banner";
import Xbanner from "./Xbanner";

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
      {prod === "전단지" && (
        <Flyer
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
        />
      )}
      {prod === "엽서" && (
        <PostCard
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
        />
      )}
      {prod === "포스터" && (
        <Poster
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
        />
      )}
      {prod === "리플릿" && (
        <Leaflet
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
        />
      )}
      {prod === "재단 스티커" && (
        <DieCutSticker
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
        />
      )}
      {prod === "도무송 스티커" && (
        <ThomsonSticker
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
        />
      )}
      {prod === "단행본" && (
        <Booklet
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
        />
      )}
      {prod === "브로슈어" && (
        <Brochure
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
        />
      )}
      {prod === "스프링노트" && (
        <SpringNoteBook
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
        />
      )}
      {prod === "제안서" && (
        <Proposal
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
        />
      )}
      {prod === "노트" && (
        <NoteBook
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
        />
      )}
      {prod === "박스" && (
        <PackageBox
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
        />
      )}
      {prod === "합지박스" && (
        <PackageCorBox
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
        />
      )}
      {prod === "쇼핑백" && (
        <PackageShopBag
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
        />
      )}
      {prod === "현수막" && (
        <Banner
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
        />
      )}
      {prod === "X배너" && (
        <Xbanner
          SelectOptions={SelectOptions}
          setSelectOptions={setSelectOptions}
        />
      )}
    </Box>
  );
};

export default ProdOptions;
