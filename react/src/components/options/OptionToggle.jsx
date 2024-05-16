import React, { useEffect, useState } from "react";
import * as S from "../../styles/new_styles";
import {
  Box,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { BorderAll } from "@mui/icons-material";

const OptionToggle = ({
  type,
  selOption,
  setSelOption,
  updateOptionAmt,
  calcBooklet,
}) => {
  /**
   * 귀도리
   */
  const [earDori, setEarDori] = useState(false);
  const [earDoriOption, setEarDoriOption] = useState("4mm");
  //좌상 우상 좌하 우하
  const [checked, setChecked] = useState([true, true, true, true]);

  const handleChangeEarDori = (event, newAlignment) => {
    console.log(event);
    setEarDori(newAlignment);
  };

  const handleChangeOption = (event, newAlignment) => {
    setEarDoriOption(newAlignment);
  };

  const handleChange1 = (event) => {
    setChecked([
      event.target.checked,
      event.target.checked,
      event.target.checked,
      event.target.checked,
    ]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1], checked[2], checked[3]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked, checked[2], checked[3]]);
  };
  const handleChange4 = (event) => {
    setChecked([checked[0], checked[1], event.target.checked, checked[3]]);
  };

  const handleChange5 = (event) => {
    setChecked([checked[0], checked[1], checked[2], event.target.checked]);
  };
  /**
   * 타공
   */

  const [punching, setPunching] = useState(false);
  const [punchingQty, setPunchingQty] = useState("cnt1");
  const [punchingSize, setPunchingSize] = useState("3mm");

  const handleChangePerfo = (event, newAlignment) => {
    setPunching(newAlignment);
  };

  /**
   * 오시 명함
   */

  const [osi, setOsi] = useState(false);
  const [osiQty, setOsiQty] = useState("line1");
  const [osiDirect, setOsiDirect] = useState("가로");

  const handleChangeOsi = (event, newAlignment) => {
    setOsi(newAlignment);
  };

  /**
   * 미싱
   */

  const [missing, setMissing] = useState(false);
  const [missingQty, setMissingQty] = useState("line1");
  const [missingDirect, setMissingDirect] = useState("가로");

  const handleChangeMissing = (event, newAlignment) => {
    setMissing(newAlignment);
  };

  /**
   * 코팅
   */

  const [coating, setCoating] = useState(false);
  const [coatingOption, setCoatingOption] = useState("dan_yes");

  const handleChangeCoating = (event, newAlignment) => {
    setCoating(newAlignment);
  };

  /**
   * 책자 종합
   */

  // 표지 용지 타입
  const [coverPaper, setCoverPaper] = useState("regularPaper");
  // 표지 용지 상세
  const [coverPaperDetail, setCoverPaperDetail] = useState("스노우180g");
  // 표지 양 단면
  const [coverPage, setCoverPage] = useState("doubleSide");
  // 규격
  const [paperSize, setPaperSize] = useState("A4");
  // 내지 용지
  const [innerPaper, setInnerPaper] = useState("regularPaper");
  // 내지 용지 상세
  const [innerPaperDetail, setInnerPaperDetail] = useState("스노우80g");
  // 내지 용지 무게
  const [innerPaperWeight, setInnerPaperWeight] = useState("");
  // 내지 컬러
  const [innerColor, setInnerColor] = useState("양면8도컬러");
  // 내지 양 단면
  const [innerSide, setInnerSide] = useState("doubleSide");
  // 내지 페이지수
  const [innerPage, setInnerPage] = useState(20);
  // 제본
  const [bindingType, setBindingType] = useState("ironBinding");
  // 커버코팅
  const [coverCoating, setCoverCoating] = useState("선택안함");
  // 금박
  const [bookletGoldFoil, setbookletGoldFoil] = useState("none");
  // 형압
  const [bookletEmbossing, setBookletEmbossing] = useState("none");
  // 부분코팅
  const [bookletSpotCoatting, setBookletSpotCoatting] = useState("none");

  /**
   * 옵션 토탈
   *
   */
  useEffect(() => {
    const copy = selOption;

    copy.earDori = earDori;
    copy.earDoriOption = earDoriOption;

    setSelOption(copy);
    updateOptionAmt();
  }, [earDori, earDoriOption]);

  useEffect(() => {
    const copy = selOption;
    copy.punching = punching;
    copy.punchingQty = punchingQty;
    copy.punchingSize = punchingSize;

    setSelOption(copy);
    updateOptionAmt();
  }, [punching, punchingQty, punchingSize]);

  useEffect(() => {
    const copy = selOption;
    console.log(copy);

    copy.osi = osi;
    copy.osiQty = osiQty;
    copy.osiDirect = osiDirect;

    setSelOption(copy);

    updateOptionAmt();
  }, [osi, osiQty, osiDirect]);

  useEffect(() => {
    const copy = selOption;
    console.log(copy);

    copy.missing = missing;
    copy.missingQty = missingQty;
    copy.missingDirect = missingDirect;

    setSelOption(copy);

    updateOptionAmt();
  }, [missing, missingQty, missingDirect]);

  useEffect(() => {
    const copy = selOption;
    console.log(copy);

    copy.coating = coating;
    copy.coatingOption = coatingOption;

    setSelOption(copy);

    updateOptionAmt();
  }, [coating, coatingOption]);

  useEffect(() => {
    const copy = selOption;
    console.log(copy);

    copy.coverPaper = coverPaper;
    copy.coverPaperDetail = coverPaperDetail;
    copy.coverPage = coverPage;
    copy.paperSize = paperSize;
    copy.innerPaper = innerPaper;
    copy.innerPaperDetail = innerPaperDetail;
    copy.innerColor = innerColor;
    copy.innerPage = innerPage;
    copy.innerSide = innerSide;
    copy.bindingType = bindingType;
    copy.coverCoating = coverCoating;
    copy.bookletGoldFoil = bookletGoldFoil;
    copy.bookletEmbossing = bookletEmbossing;
    copy.bookletSpotCoatting = bookletSpotCoatting;

    setSelOption(copy);
    calcBooklet();
    updateOptionAmt();
  }, [
    coverPaper,
    coverPage,
    paperSize,
    innerPaper,
    innerColor,
    innerPage,
    innerSide,
    bindingType,
    coverCoating,
    coverPaperDetail,
    innerPaperDetail,
    bookletGoldFoil,
    bookletEmbossing,
    bookletSpotCoatting,
  ]);

  return (
    <>
      {type === "귀도리" && (
        <Box
          sx={{
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <S.Product_Detail_Option_ItemBox>
            <S.Product_Detail_Option_ItemText>
              귀도리
            </S.Product_Detail_Option_ItemText>
            <S.OptionBtns2>
              <ToggleButtonGroup
                color="primary"
                value={earDori}
                exclusive
                onChange={handleChangeEarDori}
                aria-label="Platform"
                style={{ width: "100%" }}
                className="group"
              >
                <ToggleButton value={true}>둥근 모서리</ToggleButton>
                <ToggleButton value={false}>직각 모서리</ToggleButton>
              </ToggleButtonGroup>
            </S.OptionBtns2>
          </S.Product_Detail_Option_ItemBox>

          {earDori && (
            <S.Product_Detail_Option_ItemBox>
              {/* <S.Product_Detail_Option_ItemText>
                귀도리 상세
              </S.Product_Detail_Option_ItemText> */}
              <S.OptionBtns2>
                <ToggleButtonGroup
                  color="primary"
                  value={earDoriOption}
                  exclusive
                  onChange={handleChangeOption}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"4mm"}>4mm</ToggleButton>
                  <ToggleButton value={"6mm"}>6mm</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns2>

              {earDoriOption === "show" && (
                <S.CheckBoxWrapper>
                  <FormControlLabel
                    label="전체"
                    control={
                      <Checkbox
                        checked={checked[0] && checked[1]}
                        indeterminate={checked[0] !== checked[1]}
                        onChange={handleChange1}
                      />
                    }
                  />
                  <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                    <FormControlLabel
                      label="좌상"
                      control={
                        <Checkbox
                          checked={checked[0]}
                          onChange={handleChange2}
                        />
                      }
                    />
                    <FormControlLabel
                      label="우상"
                      control={
                        <Checkbox
                          checked={checked[1]}
                          onChange={handleChange3}
                        />
                      }
                    />
                    <FormControlLabel
                      label="좌하"
                      control={
                        <Checkbox
                          checked={checked[2]}
                          onChange={handleChange4}
                        />
                      }
                    />
                    <FormControlLabel
                      label="우하"
                      control={
                        <Checkbox
                          checked={checked[3]}
                          onChange={handleChange5}
                        />
                      }
                    />
                  </Box>
                </S.CheckBoxWrapper>
              )}
            </S.Product_Detail_Option_ItemBox>
          )}
        </Box>
      )}
      {type === "타공" && (
        <Box
          sx={{
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <S.Product_Detail_Option_ItemBox>
            <S.Product_Detail_Option_ItemText>
              타공
            </S.Product_Detail_Option_ItemText>
            <S.OptionBtns2>
              <ToggleButtonGroup
                color="primary"
                value={punching}
                exclusive
                onChange={handleChangePerfo}
                aria-label="Platform"
                style={{ width: "100%" }}
                className="group"
              >
                <ToggleButton value={true}>타공</ToggleButton>
                <ToggleButton value={false}>선택 안함</ToggleButton>
              </ToggleButtonGroup>
            </S.OptionBtns2>
          </S.Product_Detail_Option_ItemBox>

          {punching && (
            <>
              <S.Product_Detail_Option_ItemBox>
                {/* <S.Product_Detail_Option_ItemText>
                  타공 상세
                </S.Product_Detail_Option_ItemText> */}
                <S.OptionBtns3>
                  <ToggleButtonGroup
                    color="primary"
                    value={punchingQty}
                    exclusive
                    onChange={(e) => {
                      setPunchingQty(e.target.value);
                    }}
                    aria-label="Platform"
                    style={{ width: "100%" }}
                    className="group"
                  >
                    <ToggleButton value={"cnt1"}>1개</ToggleButton>
                    <ToggleButton value={"cnt2"}>2개</ToggleButton>
                    <ToggleButton value={"cnt3"}>3개</ToggleButton>
                    <ToggleButton value={"cnt4"}>4개</ToggleButton>
                  </ToggleButtonGroup>
                </S.OptionBtns3>
              </S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemBox>
                <S.OptionBtns2>
                  <ToggleButtonGroup
                    color="primary"
                    value={punchingSize}
                    exclusive
                    onChange={(e) => {
                      setPunchingSize(e.target.value);
                    }}
                    aria-label="Platform"
                    style={{ width: "100%" }}
                    className="group"
                  >
                    <ToggleButton value={"3mm"}>3mm</ToggleButton>
                    <ToggleButton value={"4mm"}>4mm</ToggleButton>
                    <ToggleButton value={"5mm"}>5mm</ToggleButton>
                    <ToggleButton value={"6mm"}>6mm</ToggleButton>
                    <ToggleButton value={"7mm"}>7mm</ToggleButton>
                    <ToggleButton value={"8mm"}>8mm</ToggleButton>
                  </ToggleButtonGroup>
                </S.OptionBtns2>
              </S.Product_Detail_Option_ItemBox>
            </>
          )}
        </Box>
      )}
      {type === "오시" && (
        <Box
          sx={{
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <S.Product_Detail_Option_ItemBox>
            <S.Product_Detail_Option_ItemText>
              오시
            </S.Product_Detail_Option_ItemText>
            <S.OptionBtns2>
              <ToggleButtonGroup
                color="primary"
                value={osi}
                exclusive
                onChange={handleChangeOsi}
                aria-label="Platform"
                style={{ width: "100%" }}
                className="group"
              >
                <ToggleButton value={true}>오시</ToggleButton>
                <ToggleButton value={false}>선택 안함</ToggleButton>
              </ToggleButtonGroup>
            </S.OptionBtns2>
          </S.Product_Detail_Option_ItemBox>

          {osi && (
            <Box sx={{}}>
              <S.Product_Detail_Option_ItemBox>
                {/* <S.Product_Detail_Option_ItemText>
                  오시 상세
                </S.Product_Detail_Option_ItemText> */}
                <S.OptionBtns3>
                  <ToggleButtonGroup
                    color="primary"
                    value={osiQty}
                    exclusive
                    onChange={(e) => {
                      setOsiQty(e.target.value);
                    }}
                    aria-label="Platform"
                    style={{ width: "100%" }}
                    className="group"
                  >
                    <ToggleButton value={"line1"}>1줄</ToggleButton>
                    <ToggleButton value={"line2"}>2줄</ToggleButton>
                    <ToggleButton value={"line3"}>3줄</ToggleButton>
                  </ToggleButtonGroup>
                </S.OptionBtns3>
              </S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemBox>
                <S.OptionBtns2>
                  <ToggleButtonGroup
                    color="primary"
                    value={osiDirect}
                    exclusive
                    onChange={(e) => {
                      setOsiDirect(e.target.value);
                    }}
                    aria-label="Platform"
                    style={{ width: "100%" }}
                    className="group"
                  >
                    <ToggleButton value={"가로"}>가로</ToggleButton>
                    <ToggleButton value={"세로"}>세로</ToggleButton>
                  </ToggleButtonGroup>
                </S.OptionBtns2>
              </S.Product_Detail_Option_ItemBox>
            </Box>
          )}
        </Box>
      )}
      {type === "미싱" && (
        <Box
          sx={{
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <S.Product_Detail_Option_ItemBox>
            <S.Product_Detail_Option_ItemText>
              미싱
            </S.Product_Detail_Option_ItemText>
            <S.OptionBtns2>
              <ToggleButtonGroup
                color="primary"
                value={missing}
                exclusive
                onChange={handleChangeMissing}
                aria-label="Platform"
                style={{ width: "100%" }}
                className="group"
              >
                <ToggleButton value={true}>미싱</ToggleButton>
                <ToggleButton value={false}>선택 안함</ToggleButton>
              </ToggleButtonGroup>
            </S.OptionBtns2>
          </S.Product_Detail_Option_ItemBox>

          {missing && (
            <Box sx={{}}>
              <S.Product_Detail_Option_ItemBox>
                {/* <S.Product_Detail_Option_ItemText>
                  미싱 상세
                </S.Product_Detail_Option_ItemText> */}
                <S.OptionBtns3>
                  <ToggleButtonGroup
                    color="primary"
                    value={missingQty}
                    exclusive
                    onChange={(e) => {
                      setMissingQty(e.target.value);
                    }}
                    aria-label="Platform"
                    style={{ width: "100%" }}
                    className="group"
                  >
                    <ToggleButton value={"line1"}>1줄</ToggleButton>
                    <ToggleButton value={"line2"}>2줄</ToggleButton>
                    <ToggleButton value={"line3"}>3줄</ToggleButton>
                  </ToggleButtonGroup>
                </S.OptionBtns3>
              </S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemBox>
                <S.OptionBtns2>
                  <ToggleButtonGroup
                    color="primary"
                    value={missingDirect}
                    exclusive
                    onChange={(e) => {
                      setMissingDirect(e.target.value);
                    }}
                    aria-label="Platform"
                    style={{ width: "100%" }}
                    className="group"
                  >
                    <ToggleButton value={"가로"}>가로</ToggleButton>
                    <ToggleButton value={"세로"}>세로</ToggleButton>
                  </ToggleButtonGroup>
                </S.OptionBtns2>
              </S.Product_Detail_Option_ItemBox>
            </Box>
          )}
        </Box>
      )}
      {type === "코팅" && (
        <Box
          sx={{
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <S.Product_Detail_Option_ItemBox>
            <S.Product_Detail_Option_ItemText>
              코팅
            </S.Product_Detail_Option_ItemText>
            <S.OptionBtns2>
              <ToggleButtonGroup
                color="primary"
                value={coating}
                exclusive
                onChange={handleChangeCoating}
                aria-label="Platform"
                style={{ width: "100%" }}
                className="group"
              >
                <ToggleButton value={true}>코팅</ToggleButton>
                <ToggleButton value={false}>선택 안함</ToggleButton>
              </ToggleButtonGroup>
            </S.OptionBtns2>
          </S.Product_Detail_Option_ItemBox>

          {coating && (
            <Box sx={{}}>
              <S.Product_Detail_Option_ItemBox>
                {/* <S.Product_Detail_Option_ItemText>
                  코팅 상세
                </S.Product_Detail_Option_ItemText> */}
                <S.OptionBtns>
                  <ToggleButtonGroup
                    color="primary"
                    value={coatingOption}
                    exclusive
                    onChange={(e) => {
                      setCoatingOption(e.target.value);
                    }}
                    aria-label="Platform"
                    style={{ width: "100%" }}
                    className="group"
                  >
                    <ToggleButton value={"dan_yes"}>단면유광코팅</ToggleButton>
                    <ToggleButton value={"dan_no"}>단면무광코팅</ToggleButton>
                    <ToggleButton value={"yang_yes"}>양면유광코팅</ToggleButton>
                    <ToggleButton value={"yang_no"}>양면무광코팅</ToggleButton>
                  </ToggleButtonGroup>
                </S.OptionBtns>
              </S.Product_Detail_Option_ItemBox>
            </Box>
          )}
        </Box>
      )}
      {type === "책자" && (
        <Box
          sx={{
            marginBottom: "20px",
            paddingBottom: "20px",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                규격
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns3>
                <ToggleButtonGroup
                  color="primary"
                  value={paperSize}
                  exclusive
                  onChange={(e) => {
                    setPaperSize(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"A4"}>A4</ToggleButton>
                  <ToggleButton value={"A5"}>A5</ToggleButton>
                  <ToggleButton value={"B5"}>B5</ToggleButton>
                  <ToggleButton value={"B6"}>B6</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns3>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          {/* 표지  */}

          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                표지
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns>
                <ToggleButtonGroup
                  color="primary"
                  value={coverPaper}
                  exclusive
                  onChange={(e) => {
                    setCoverPaper(e.target.value);
                    if (e.target.value === "premiumPaper") {
                      setCoverPaperDetail("아르떼160g");
                    } else {
                      setCoverPaperDetail("스노우180g");
                    }
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"regularPaper"}>일반지</ToggleButton>
                  <ToggleButton value={"premiumPaper"}>고급지</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          {coverPaper === "regularPaper" ? (
            <Box sx={{}}>
              <S.Product_Detail_Option_ItemBox>
                <S.OptionBtns2>
                  <ToggleButtonGroup
                    color="primary"
                    value={coverPaperDetail}
                    exclusive
                    onChange={(e) => {
                      setCoverPaperDetail(e.target.value);
                    }}
                    aria-label="Platform"
                    style={{ width: "100%" }}
                    className="group"
                  >
                    <ToggleButton value={"스노우180g"}>스노우180g</ToggleButton>
                    <ToggleButton value={"스노우200g"}>스노우200g</ToggleButton>
                    <ToggleButton value={"스노우250g"}>스노우250g</ToggleButton>
                    <ToggleButton value={"모조지180g"}>모조지180g</ToggleButton>
                    <ToggleButton value={"모조지200g"}>모조지200g</ToggleButton>
                    <ToggleButton value={"모조지250g"}>모조지250g</ToggleButton>
                    <ToggleButton value={"아트지180g"}>아트지180g</ToggleButton>
                    <ToggleButton value={"아트지200g"}>아트지200g</ToggleButton>
                    <ToggleButton value={"아트지250g"}>아트지250g</ToggleButton>
                  </ToggleButtonGroup>
                </S.OptionBtns2>
              </S.Product_Detail_Option_ItemBox>
            </Box>
          ) : coverPaper === "premiumPaper" ? (
            <Box sx={{}}>
              <S.Product_Detail_Option_ItemBox>
                <S.OptionBtns2>
                  <ToggleButtonGroup
                    color="primary"
                    value={coverPaperDetail}
                    exclusive
                    onChange={(e) => {
                      setCoverPaperDetail(e.target.value);
                    }}
                    aria-label="Platform"
                    style={{ width: "100%" }}
                    className="group"
                  >
                    <ToggleButton value={"아르떼160g"}>아르떼160g</ToggleButton>
                    <ToggleButton value={"아르떼200g"}>아르떼200g</ToggleButton>
                    <ToggleButton value={"아르떼240g"}>아르떼240g</ToggleButton>
                    <ToggleButton value={"랑데부160g"}>랑데부160g</ToggleButton>
                    <ToggleButton value={"랑데부200g"}>랑데부200g</ToggleButton>
                    <ToggleButton value={"랑데부240g"}>랑데부240g</ToggleButton>
                  </ToggleButtonGroup>
                </S.OptionBtns2>
              </S.Product_Detail_Option_ItemBox>
            </Box>
          ) : null}
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.OptionBtns>
                <ToggleButtonGroup
                  color="primary"
                  value={coverPage}
                  exclusive
                  onChange={(e) => {
                    setCoverPage(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"doubleSide"}>양면</ToggleButton>
                  <ToggleButton value={"singleSide"}>단면</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>

          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                표지코팅
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns2>
                <ToggleButtonGroup
                  color="primary"
                  value={coverCoating}
                  exclusive
                  onChange={(e) => {
                    setCoverCoating(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"단면유광코팅"}>
                    단면유광코팅
                  </ToggleButton>
                  <ToggleButton value={"단면무광코팅"}>
                    단면무광코팅
                  </ToggleButton>
                  <ToggleButton value={"선택안함"}>선택안함</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns2>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                내지
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns2>
                <ToggleButtonGroup
                  color="primary"
                  value={innerPaper}
                  exclusive
                  onChange={(e) => {
                    setInnerPaper(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"regularPaper"}>일반지</ToggleButton>
                  <ToggleButton value={"premiumPaper"}>
                    고급지(80~130)
                  </ToggleButton>
                  <ToggleButton value={"premiumPaper2"}>
                    고급지(160~210)
                  </ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns2>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <InputLabel id="demo-simple-select-label">용지</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={10}
                onChange={() => {}}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.OptionBtns>
                <ToggleButtonGroup
                  color="primary"
                  value={innerSide}
                  exclusive
                  onChange={(e) => {
                    setInnerSide(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"doubleSide"}>양면</ToggleButton>
                  <ToggleButton value={"singleSide"}>단면</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.OptionBtns>
                <TextField
                  sx={{ width: "50%", marginTop: "5px" }}
                  id="outlined-basic"
                  label="페이지수"
                  value={innerPage}
                  variant="outlined"
                  size="small"
                  type="number"
                  onChange={(e) => {
                    setInnerPage(e.target.value);
                  }}
                  onBlur={(e) => {
                    if (e.target.value < 2) {
                      setInnerPage(2);
                    } else if (e.target.value % 2 !== 0) {
                      setInnerPage(parseInt(e.target.value) + 1);
                    }
                  }}
                />
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                제본
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns>
                <ToggleButtonGroup
                  color="primary"
                  value={bindingType}
                  exclusive
                  onChange={(e) => {
                    setBindingType(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"ironBinding"}>중철</ToggleButton>
                  <ToggleButton value={"wirelessBinding"}>무선</ToggleButton>
                  {/* <ToggleButton value={"springBinding"}>스프링</ToggleButton> */}
                </ToggleButtonGroup>
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                후가공
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns>
                <ToggleButtonGroup
                  color="primary"
                  value={bookletGoldFoil}
                  exclusive
                  onChange={(e) => {
                    setbookletGoldFoil(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"goldfoil"}>금박</ToggleButton>
                  <ToggleButton value={"none"}>선택안함</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.OptionBtns>
                <ToggleButtonGroup
                  color="primary"
                  value={bookletEmbossing}
                  exclusive
                  onChange={(e) => {
                    setBookletEmbossing(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"embossing"}>형압</ToggleButton>
                  <ToggleButton value={"none"}>선택안함</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.OptionBtns>
                <ToggleButtonGroup
                  color="primary"
                  value={bookletSpotCoatting}
                  exclusive
                  onChange={(e) => {
                    setBookletSpotCoatting(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"spotcoatting"}>부분코팅</ToggleButton>
                  <ToggleButton value={"none"}>선택안함</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
        </Box>
      )}
    </>
  );
};

export default OptionToggle;
