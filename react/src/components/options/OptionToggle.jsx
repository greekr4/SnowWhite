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
import { Banner_price, Stand_price, XBanner_price } from "./OptionsPrices";

const OptionToggle = ({
  type,
  PROD_NM,
  selOption,
  setSelOption,
  updateOptionAmt,
  calcBooklet,
  globalQty,
  setGlobalQty,
  globalAmt,
  setGlobalAmt,
  globalOptionAmt,
  setGlobalOptionAmt,
  globalTax,
  setGlobalTax,
  snackbar,
  setSnackbar,
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
  const [coverPaperDetail, setCoverPaperDetail] = useState("백색모조");
  // 표지 용지 무게
  const [coverPaperWeight, setCoverPaperWeight] = useState(180);
  // 표지 양 단면
  const [coverPage, setCoverPage] = useState("doubleSide");
  // 규격
  const [paperSize, setPaperSize] = useState("A4");
  // 내지 용지
  const [innerPaper, setInnerPaper] = useState("regularPaper");
  // 내지 용지 상세
  const [innerPaperDetail, setInnerPaperDetail] = useState("백색모조");

  // 내지 용지 무게
  const [innerPaperWeight, setInnerPaperWeight] = useState(80);
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

  // 책자 상품 별 초기값 세팅
  useEffect(() => {
    const settingBindingType =
      PROD_NM === "스프링노트" ? "springBinding" : "ironBinding";

    const settingCoverPaperDetail =
      PROD_NM === "브로슈어" ? "스노우화이트" : "백색모조";

    const settingCoverPaperWeight = PROD_NM === "브로슈어" ? 200 : 180;

    const settingInnerPaperDetail =
      PROD_NM === "브로슈어" ? "스노우화이트" : "백색모조";
    const settingInnerPaperWeight = PROD_NM === "브로슈어" ? 150 : 80;
    const settingInnerPage = PROD_NM === "브로슈어" ? 12 : 40;
    setBindingType(settingBindingType);

    setCoverPaperDetail(settingCoverPaperDetail);
    setCoverPaperWeight(settingCoverPaperWeight);
    setInnerPaperDetail(settingInnerPaperDetail);
    setInnerPaperWeight(settingInnerPaperWeight);
    setInnerPage(settingInnerPage);
  }, [PROD_NM]);

  // 책자 커버 평량
  const bookletCoverWeights = {
    백색모조: [180, 220, 260],
    스노우화이트: [180, 200, 250],
    아트: [180, 200, 250],
    아르떼: [160, 190, 210, 240],
    랑데부: [160, 190, 210, 240],
    몽블랑: [160, 190, 210, 240],
  };

  // 책자 내지 평량
  const bookletInnerWeights = {
    백색모조: [80, 100, 120, 150],
    미색모조: [80, 100, 120],
    스노우화이트: [80, 100, 120, 150],
    아트: [80, 100, 120, 150],
    아르떼: [105, 130, 160, 190, 210],
    랑데부: [105, 130, 160, 190, 210],
    몽블랑: [105, 130, 160, 190, 210],
  };

  useEffect(() => {
    if (
      coverPaperDetail === "백색모조" ||
      coverPaperDetail === "미색모조" ||
      coverPaperDetail === "스노우화이트" ||
      coverPaperDetail === "아트"
    ) {
      setCoverPaper("regularPaper");
    } else if (
      coverPaperDetail === "아르떼" ||
      coverPaperDetail === "랑데부" ||
      coverPaperDetail === "몽블랑"
    ) {
      setCoverPaper("premiumPaper");
    }

    if (
      innerPaperDetail === "백색모조" ||
      innerPaperDetail === "미색모조" ||
      innerPaperDetail === "스노우화이트" ||
      innerPaperDetail === "아트"
    ) {
      setInnerPaper("regularPaper");
    } else if (
      innerPaperDetail === "아르떼" ||
      innerPaperDetail === "랑데부" ||
      innerPaperDetail === "몽블랑"
    ) {
      if (innerPaperWeight < 160) {
        setInnerPaper("premiumPaper");
      } else if (innerPaperWeight >= 160) {
        setInnerPaper("premiumPaper2");
      }
    }
  }, [coverPaperDetail, coverPaperWeight, innerPaperDetail, innerPaperWeight]);

  /**
   * X배너 종합
   */

  // X배너 사이즈들
  const [xBannerStandard, setXBannerStandard] = useState("nomal");
  const [xBannerWidth, setXBannerWidth] = useState(600);
  const [xBannerHeight, setXBannerHeight] = useState(1800);
  //X배너 회배 계산
  const [xBanneSqm, setXBannerSqm] = useState(0);
  useEffect(() => {
    const makedXBannerSqm = (xBannerWidth * xBannerHeight) / 1000000;
    setXBannerSqm(makedXBannerSqm);
  }, [xBannerWidth, xBannerHeight]);

  // X배너 소재
  const [xBannerMaterial, setXBannerMaterial] = useState("무광PET");

  // X배너 후가공
  const [xBannerFinishing, setXBannerFinishing] = useState("선택안함");

  const [xBannerQty, setXBannerQty] = useState(1);

  const [xBannerStand, setXBannerStand] = useState("선택안함");

  useEffect(() => {
    let unit_qty = 0;

    if (xBannerQty <= 30) {
      unit_qty = 30;
    } else if (xBannerQty <= 100) {
      unit_qty = 100;
    } else if (xBannerQty <= 300) {
      unit_qty = 300;
    } else {
      unit_qty = 500;
    }

    const findedPrice = XBanner_price[xBannerStandard].find(
      (x) => x.qty === unit_qty
    );

    let unitPrice = 0;

    if (xBannerStandard === "none") {
      //비규격일시
      unitPrice = findedPrice[xBannerMaterial] * xBanneSqm;
    } else {
      //그외
      unitPrice = findedPrice[xBannerMaterial];
    }

    //거치대 가격
    let standQty = 0;
    if (xBannerQty <= 30) {
      standQty = 30;
    } else if (xBannerQty <= 120) {
      standQty = 120;
    } else {
      standQty = 500;
    }
    const findedPrice_stand = Stand_price[xBannerStand].find(
      (x) => x.qty === standQty
    );

    const standPrice = findedPrice_stand.price * xBannerQty;

    const gPrice = unitPrice * xBannerQty;
    const gOption = XBanner_price[xBannerFinishing] * xBannerQty + standPrice;
    const gTax = Math.round(((gPrice + gOption) * 0.1) / 10) * 10;

    setGlobalAmt(gPrice);
    setGlobalOptionAmt(gOption);
    setGlobalTax(gTax);
  }, [
    xBannerStandard,
    xBannerWidth,
    xBannerHeight,
    xBannerMaterial,
    xBannerFinishing,
    xBannerQty,
    xBanneSqm,
    xBannerStand,
  ]);

  /**
   * 현수막 종합
   */

  // 배너사이즈
  const [bannerWidth, setBannerWidth] = useState(1000);
  const [bannerHeight, setBannerHeight] = useState(1000);

  //배너 회배
  const [bannerSqm, setBannerSqm] = useState(0);
  useEffect(() => {
    const makedBannerSqm = (bannerWidth * bannerHeight) / 1000000;
    setBannerSqm(makedBannerSqm);
  }, [bannerWidth, bannerHeight]);

  //배너 소재
  const [bannerMaterial, setBannerMaterial] = useState("일반현수막");

  // 배너 후가공
  const [bannerFinishing, setBannerFinishing] = useState("선택안함");

  //배너 수량
  const [bannerQty, setBannerQty] = useState(1);

  //배너 가격계산
  useEffect(() => {
    let unit_qty = 0;

    if (bannerSqm < 1) {
      unit_qty = 1;
    } else if (bannerQty < 50) {
      unit_qty = 50;
    } else {
      unit_qty = 500;
    }

    let material = bannerMaterial;
    if (bannerSqm >= 4 && bannerMaterial === "일반현수막") {
      material = "4회배";
    }

    const findedPrice = Banner_price[material].find((x) => x.qty === unit_qty);

    const unitPrice = findedPrice.price * bannerSqm;

    console.log(findedPrice);
    console.log(`단위가격 ${unitPrice}`);

    const gPrice = unitPrice * bannerQty;
    const gOption = Banner_price[bannerFinishing] * bannerQty;
    const gTax = Math.round(((gPrice + gOption) * 0.1) / 10) * 10;
    setGlobalAmt(gPrice);
    setGlobalOptionAmt(gOption);
    setGlobalTax(gTax);

    const copy = selOption;
    copy.banner = {
      가로: bannerWidth + "mm",
      세로: bannerHeight + "mm",
      소재: bannerMaterial,
      후가공: bannerFinishing,
    };

    setSelOption(copy);
  }, [
    bannerWidth,
    bannerHeight,
    bannerMaterial,
    bannerFinishing,
    bannerSqm,
    bannerQty,
  ]);

  /**
   * 재단 스티커
   */
  const [stickerWidth, setStickerWidth] = useState();
  const [stickerHeight, setStickerHeight] = useState();
  const [stickerSqm, setStickerSqm] = useState(0);
  useEffect(() => {
    const makedStickerSqm = (stickerWidth * stickerHeight) / 10000;
    setStickerSqm(makedStickerSqm);
  }, [stickerWidth, stickerHeight]);

  const [stickerPaper, setStickerPaper] = useState("아트지");
  const [stickerCoating, setStickerCoating] = useState("무광");
  const [stickerQty, setStickerQty] = useState(1);

  /**
   * 도무송 스티커
   */

  const [thomsonStickerStandard, setThomsonStickerStandard] = useState("A4");
  const [thomsonStickerPaper, setThomsonStickerPaper] = useState("아트지");
  const [thomsonStickerType, setThomsonStickerType] = useState("칼선");
  const [thomsonStickerCoating, setThomsonStickerCoating] = useState("무광");
  const [thomsonStickerQty, setThomsonStickerQty] = useState(1);
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

  //책자
  useEffect(() => {
    const copy = selOption;
    copy.coverPaper = coverPaper;
    copy.coverPaperDetail = coverPaperDetail;
    copy.coverPaperWeight = coverPaperWeight;
    copy.coverPage = coverPage;
    copy.paperSize = paperSize;
    copy.innerPaper = innerPaper;
    copy.innerPaperDetail = innerPaperDetail;
    copy.innerPaperWeight = innerPaperWeight;
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
    coverPaperWeight,
    innerPaperWeight,
  ]);

  //X배너
  useEffect(() => {
    const copy = selOption;
    copy.xbanner = {
      규격: xBannerStandard,
      가로: xBannerWidth + "mm",
      세로: xBannerHeight + "mm",
      소재: xBannerMaterial,
      후가공: xBannerFinishing,
      거치대: xBannerStand,
    };

    setSelOption(copy);
  }, [
    xBannerStandard,
    xBannerWidth,
    xBannerHeight,
    xBannerMaterial,
    xBannerFinishing,
    xBannerQty,
    xBanneSqm,
    xBannerStand,
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

          <Box sx={{ display: "none" }}>
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
          <Box sx={{}}>
            <S.Product_Detail_Option_SelectBox>
              <Box sx={{ width: "48%" }}>
                <InputLabel
                  sx={{ fontSize: "0.8em", fontWeight: "500", color: "#000" }}
                >
                  표지
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={coverPaperDetail}
                  onChange={(e) => {
                    setCoverPaperDetail(e.target.value);
                    setCoverPaperWeight(bookletCoverWeights[e.target.value][0]);
                  }}
                  fullWidth
                >
                  <MenuItem value={"백색모조"}>백색모조</MenuItem>
                  <MenuItem value={"스노우화이트"}>스노우화이트</MenuItem>
                  <MenuItem value={"아트"}>아트</MenuItem>
                  <MenuItem value={"아르떼"}>아르떼</MenuItem>
                  <MenuItem value={"랑데부"}>랑데부</MenuItem>
                  <MenuItem value={"몽블랑"}>몽블랑</MenuItem>
                </Select>
              </Box>
              <Box sx={{ width: "48%" }}>
                <InputLabel
                  sx={{ fontSize: "0.8em", fontWeight: "500", color: "#000" }}
                >
                  평량
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={coverPaperWeight}
                  onChange={(e) => {
                    setCoverPaperWeight(e.target.value);
                  }}
                  fullWidth
                >
                  {bookletCoverWeights[coverPaperDetail].map((weight) => (
                    <MenuItem value={weight}>{weight}g</MenuItem>
                  ))}
                </Select>
              </Box>
            </S.Product_Detail_Option_SelectBox>
          </Box>

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
          <Box sx={{ display: "none" }}>
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
            <S.Product_Detail_Option_SelectBox>
              <Box sx={{ width: "48%" }}>
                <InputLabel
                  sx={{ fontSize: "0.8em", fontWeight: "500", color: "#000" }}
                >
                  내지
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={innerPaperDetail}
                  onChange={(e) => {
                    setInnerPaperDetail(e.target.value);
                    setInnerPaperWeight(bookletInnerWeights[e.target.value][0]);
                  }}
                  fullWidth
                >
                  <MenuItem value={"백색모조"}>백색모조</MenuItem>
                  <MenuItem value={"미색모조"}>미색모조</MenuItem>
                  <MenuItem value={"스노우화이트"}>스노우화이트</MenuItem>
                  <MenuItem value={"아트"}>아트</MenuItem>
                  <MenuItem value={"아르떼"}>아르떼</MenuItem>
                  <MenuItem value={"랑데부"}>랑데부</MenuItem>
                  <MenuItem value={"몽블랑"}>몽블랑</MenuItem>
                </Select>
              </Box>
              <Box sx={{ width: "48%" }}>
                <InputLabel
                  sx={{ fontSize: "0.8em", fontWeight: "500", color: "#000" }}
                >
                  평량
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={innerPaperWeight}
                  onChange={(e) => {
                    setInnerPaperWeight(e.target.value);
                  }}
                  fullWidth
                >
                  {bookletInnerWeights[innerPaperDetail].map((weight) => (
                    <MenuItem value={weight}>{weight}g</MenuItem>
                  ))}
                </Select>
              </Box>
            </S.Product_Detail_Option_SelectBox>
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
                  {PROD_NM === "스프링노트" ? (
                    <>
                      <ToggleButton value={"springBinding"}>
                        스프링
                      </ToggleButton>
                    </>
                  ) : (
                    <>
                      <ToggleButton value={"ironBinding"}>중철</ToggleButton>
                      <ToggleButton value={"wirelessBinding"}>
                        무선
                      </ToggleButton>
                    </>
                  )}

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
      {type === "X배너" && (
        <Box
          sx={{
            marginBottom: "20px",
          }}
        >
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                규격
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns2>
                <ToggleButtonGroup
                  color="primary"
                  value={xBannerStandard}
                  exclusive
                  onChange={(e) => {
                    setXBannerStandard(e.target.value);
                    setXBannerMaterial("무광PET");
                    switch (e.target.value) {
                      case "nomal":
                        setXBannerWidth(600);
                        setXBannerHeight(1800);

                        break;
                      case "mini":
                        setXBannerWidth(500);
                        setXBannerHeight(720);
                        break;
                      case "none":
                        setXBannerWidth(1000);
                        setXBannerHeight(1000);
                        break;
                    }
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"nomal"}>일반 (600x1800)</ToggleButton>
                  <ToggleButton value={"mini"}>미니 (500x720)</ToggleButton>
                  <ToggleButton value={"none"}>비규격</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns2>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "20px",
                  display: xBannerStandard === "none" ? "flex" : "none",
                }}
              >
                <TextField
                  label="가로"
                  value={xBannerWidth}
                  onChange={(e) => {
                    const input = e.target.value.replace(/[^0-9]/g, "");
                    setXBannerWidth(input);
                  }}
                  sx={{ width: "48%" }}
                  aria-readonly
                ></TextField>
                <TextField
                  label="세로"
                  value={xBannerHeight}
                  onChange={(e) => {
                    const input = e.target.value.replace(/[^0-9]/g, "");
                    setXBannerHeight(input);
                  }}
                  sx={{ width: "48%" }}
                  aria-readonly
                ></TextField>
              </Box>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                소재
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns>
                <ToggleButtonGroup
                  color="primary"
                  value={xBannerMaterial}
                  exclusive
                  onChange={(e) => {
                    setXBannerMaterial(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"무광PET"}>무광PET</ToggleButton>
                  <ToggleButton
                    value={"유광PET"}
                    sx={{
                      display: xBannerStandard === "nomal" ? "block" : "none",
                    }}
                  >
                    유광PET
                  </ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                후가공
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns2>
                <ToggleButtonGroup
                  color="primary"
                  value={xBannerFinishing}
                  exclusive
                  onChange={(e) => {
                    setXBannerFinishing(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"아일렛"}>아일렛</ToggleButton>
                  <ToggleButton value={"각목마감"}>각목마감</ToggleButton>
                  <ToggleButton value={"선택안함"}>선택안함</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns2>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                거치대
              </S.Product_Detail_Option_ItemText>
              <S.Product_Detail_Option_SelectBox>
                <Box sx={{ width: "100%" }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={xBannerStand}
                    onChange={(e) => {
                      setXBannerStand(e.target.value);
                    }}
                    fullWidth
                  >
                    <MenuItem value={"선택안함"}>선택안함</MenuItem>
                    <MenuItem value={"실내스타"}>실내용 스타거치대</MenuItem>
                    <MenuItem value={"실내드림"}>실내용 드림거치대</MenuItem>
                    <MenuItem value={"실내화이트"}>
                      실내용 화이트거치대
                    </MenuItem>
                    <MenuItem value={"실내포인트"}>
                      실내용 포인트거치대
                    </MenuItem>
                    <MenuItem value={"실외심플단면"}>
                      실외용 심플 단면거치대
                    </MenuItem>
                    <MenuItem value={"실외심플양면"}>
                      실외용 심플 양면거치대
                    </MenuItem>
                    <MenuItem value={"실외갤럭시단면"}>
                      실외용 갤럭시 단면거치대
                    </MenuItem>
                    <MenuItem value={"실외갤럭시양면"}>
                      실외용 갤럭시 양면거치대
                    </MenuItem>
                  </Select>
                </Box>
              </S.Product_Detail_Option_SelectBox>
            </S.Product_Detail_Option_ItemBox>
          </Box>

          <Box sx={{ marginTop: "20px", borderTop: "1px solid #ddd" }}>
            <S.Product_Detail_Option_ItemBox>
              <S.OptionBtns>
                <TextField
                  sx={{ width: "50%", marginTop: "5px" }}
                  id="outlined-basic"
                  label="수량"
                  value={xBannerQty}
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    const input = e.target.value < 0 ? 1 : e.target.value;
                    if (input > 500) {
                      setSnackbar({
                        children: "500매 이상은 별도 문의해주세요.",
                        severity: "info",
                      });
                      setXBannerQty(500);
                      setGlobalQty(500);
                      return;
                    }
                    setXBannerQty(input);
                    setGlobalQty(input);
                  }}
                />
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
        </Box>
      )}
      {type === "현수막" && (
        <Box
          sx={{
            marginBottom: "20px",
          }}
        >
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                규격
              </S.Product_Detail_Option_ItemText>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <TextField
                  label="가로"
                  value={bannerWidth}
                  onChange={(e) => {
                    const input = e.target.value.replace(/[^0-9]/g, "");
                    setBannerWidth(input);
                  }}
                  sx={{ width: "48%" }}
                  aria-readonly
                ></TextField>
                <TextField
                  label="세로"
                  value={bannerHeight}
                  onChange={(e) => {
                    const input = e.target.value.replace(/[^0-9]/g, "");
                    setBannerHeight(input);
                  }}
                  sx={{ width: "48%" }}
                  aria-readonly
                ></TextField>
              </Box>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_SelectBox>
              <Box sx={{ width: "48%" }}>
                <InputLabel
                  sx={{ fontSize: "0.8em", fontWeight: "500", color: "#000" }}
                >
                  소재
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={bannerMaterial}
                  onChange={(e) => {
                    setBannerMaterial(e.target.value);
                  }}
                  fullWidth
                >
                  <MenuItem value={"일반현수막"}>일반현수막</MenuItem>
                  <MenuItem value={"유포지"}>유포지</MenuItem>
                  <MenuItem value={"유포그레이"}>유포그레이</MenuItem>
                  <MenuItem value={"켈"}>켈</MenuItem>
                  <MenuItem value={"켈그레이"}>켈그레이</MenuItem>
                </Select>
              </Box>
            </S.Product_Detail_Option_SelectBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                후가공
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns2>
                <ToggleButtonGroup
                  color="primary"
                  value={bannerFinishing}
                  exclusive
                  onChange={(e) => {
                    setBannerFinishing(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"아일렛"}>아일렛</ToggleButton>
                  <ToggleButton value={"각목마감"}>각목마감</ToggleButton>
                  <ToggleButton value={"선택안함"}>선택안함</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns2>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{ marginTop: "20px", borderTop: "1px solid #ddd" }}>
            <S.Product_Detail_Option_ItemBox>
              <S.OptionBtns>
                <TextField
                  sx={{ width: "50%", marginTop: "5px" }}
                  id="outlined-basic"
                  label="수량"
                  value={bannerQty}
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    const input = e.target.value < 0 ? 1 : e.target.value;

                    if (input >= 500) {
                      setSnackbar({
                        children: "500매 이상은 별도 문의해주세요.",
                        severity: "info",
                      });
                      setBannerQty(500);
                      setGlobalQty(500);
                      return;
                    }

                    setBannerQty(input);
                    setGlobalQty(input);
                  }}
                />
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
        </Box>
      )}
      {type === "재단스티커" && (
        <Box
          sx={{
            marginBottom: "20px",
          }}
        >
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                사이즈
              </S.Product_Detail_Option_ItemText>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <TextField
                  label="가로"
                  value={stickerWidth}
                  onChange={(e) => {
                    const input = e.target.value.replace(/[^0-9]/g, "");
                    setStickerWidth(input);
                  }}
                  sx={{ width: "48%" }}
                  aria-readonly
                ></TextField>
                <TextField
                  label="세로"
                  value={stickerHeight}
                  onChange={(e) => {
                    const input = e.target.value.replace(/[^0-9]/g, "");
                    setStickerHeight(input);
                  }}
                  sx={{ width: "48%" }}
                  aria-readonly
                ></TextField>
              </Box>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_SelectBox>
              <Box sx={{ width: "48%" }}>
                <InputLabel
                  sx={{ fontSize: "0.8em", fontWeight: "500", color: "#000" }}
                >
                  용지
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={stickerPaper}
                  onChange={(e) => {
                    setStickerPaper(e.target.value);
                  }}
                  fullWidth
                >
                  <MenuItem value={"아트지"}>아트지</MenuItem>
                  <MenuItem value={"모조지"}>모조지</MenuItem>
                  <MenuItem value={"투명데드롱"}>투명데드롱</MenuItem>
                  <MenuItem value={"은데드롱"}>은데드롱</MenuItem>
                  <MenuItem value={"유포지"}>유포지</MenuItem>
                </Select>
              </Box>
            </S.Product_Detail_Option_SelectBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                코팅
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns>
                <ToggleButtonGroup
                  color="primary"
                  value={stickerCoating}
                  exclusive
                  onChange={(e) => {
                    setStickerCoating(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"무광"}>무광</ToggleButton>
                  <ToggleButton value={"유광"}>유광</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{ marginTop: "20px", borderTop: "1px solid #ddd" }}>
            <S.Product_Detail_Option_ItemBox>
              <S.OptionBtns>
                <TextField
                  sx={{ width: "50%", marginTop: "5px" }}
                  id="outlined-basic"
                  label="수량"
                  value={stickerQty}
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    const input = e.target.value < 0 ? 1 : e.target.value;

                    setStickerQty(input);
                    setGlobalQty(input);
                  }}
                />
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
        </Box>
      )}
      {type === "도무송스티커" && (
        <Box
          sx={{
            marginBottom: "20px",
          }}
        >
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                사이즈
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns3>
                <ToggleButtonGroup
                  color="primary"
                  value={thomsonStickerStandard}
                  exclusive
                  onChange={(e) => {
                    setThomsonStickerStandard(e.target.value);
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
          <Box sx={{}}>
            <S.Product_Detail_Option_SelectBox>
              <Box sx={{ width: "48%" }}>
                <InputLabel
                  sx={{ fontSize: "0.8em", fontWeight: "500", color: "#000" }}
                >
                  용지
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={thomsonStickerPaper}
                  onChange={(e) => {
                    setThomsonStickerPaper(e.target.value);
                  }}
                  fullWidth
                >
                  <MenuItem value={"아트지"}>아트지</MenuItem>
                  <MenuItem value={"모조지"}>모조지</MenuItem>
                  <MenuItem value={"투명데드롱"}>투명데드롱</MenuItem>
                  <MenuItem value={"은데드롱"}>은데드롱</MenuItem>
                  <MenuItem value={"유포지"}>유포지</MenuItem>
                </Select>
              </Box>
            </S.Product_Detail_Option_SelectBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                칼선
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns>
                <ToggleButtonGroup
                  color="primary"
                  value={thomsonStickerType}
                  exclusive
                  onChange={(e) => {
                    setThomsonStickerType(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"칼선"}>칼선</ToggleButton>
                  <ToggleButton value={"인쇄만"}>인쇄만</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                코팅
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns>
                <ToggleButtonGroup
                  color="primary"
                  value={thomsonStickerCoating}
                  exclusive
                  onChange={(e) => {
                    setThomsonStickerCoating(e.target.value);
                  }}
                  aria-label="Platform"
                  style={{ width: "100%" }}
                  className="group"
                >
                  <ToggleButton value={"무광"}>무광</ToggleButton>
                  <ToggleButton value={"유광"}>유광</ToggleButton>
                </ToggleButtonGroup>
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
          <Box sx={{ marginTop: "20px", borderTop: "1px solid #ddd" }}>
            <S.Product_Detail_Option_ItemBox>
              <S.OptionBtns>
                <TextField
                  sx={{ width: "50%", marginTop: "5px" }}
                  id="outlined-basic"
                  label="수량"
                  value={thomsonStickerQty}
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    const input = e.target.value < 0 ? 1 : e.target.value;

                    setThomsonStickerQty(input);
                    setGlobalQty(input);
                  }}
                />
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
        </Box>
      )}
      {type === "전단지" && (
        <Box
          sx={{
            marginBottom: "20px",
          }}
        >
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                사이즈
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns3>
                <ToggleButtonGroup
                  color="primary"
                  value={thomsonStickerStandard}
                  exclusive
                  onChange={(e) => {
                    setThomsonStickerStandard(e.target.value);
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
          <Box sx={{}}>
            <S.Product_Detail_Option_SelectBox>
              <Box sx={{ width: "48%" }}>
                <InputLabel
                  sx={{ fontSize: "0.8em", fontWeight: "500", color: "#000" }}
                >
                  용지
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={thomsonStickerPaper}
                  onChange={(e) => {
                    setThomsonStickerPaper(e.target.value);
                  }}
                  fullWidth
                >
                  <MenuItem value={"아트지"}>아트지</MenuItem>
                  <MenuItem value={"모조지"}>모조지</MenuItem>
                  <MenuItem value={"투명데드롱"}>투명데드롱</MenuItem>
                  <MenuItem value={"은데드롱"}>은데드롱</MenuItem>
                  <MenuItem value={"유포지"}>유포지</MenuItem>
                </Select>
              </Box>
            </S.Product_Detail_Option_SelectBox>
          </Box>

          <Box sx={{ marginTop: "20px", borderTop: "1px solid #ddd" }}>
            <S.Product_Detail_Option_ItemBox>
              <S.OptionBtns>
                <TextField
                  sx={{ width: "50%", marginTop: "5px" }}
                  id="outlined-basic"
                  label="수량"
                  value={thomsonStickerQty}
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    const input = e.target.value < 0 ? 1 : e.target.value;

                    setThomsonStickerQty(input);
                    setGlobalQty(input);
                  }}
                />
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
        </Box>
      )}

      {type === "엽서" && (
        <Box
          sx={{
            marginBottom: "20px",
          }}
        >
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                사이즈
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns3>
                <ToggleButtonGroup
                  color="primary"
                  value={thomsonStickerStandard}
                  exclusive
                  onChange={(e) => {
                    setThomsonStickerStandard(e.target.value);
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
          <Box sx={{}}>
            <S.Product_Detail_Option_SelectBox>
              <Box sx={{ width: "48%" }}>
                <InputLabel
                  sx={{ fontSize: "0.8em", fontWeight: "500", color: "#000" }}
                >
                  용지
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={thomsonStickerPaper}
                  onChange={(e) => {
                    setThomsonStickerPaper(e.target.value);
                  }}
                  fullWidth
                >
                  <MenuItem value={"아트지"}>아트지</MenuItem>
                  <MenuItem value={"모조지"}>모조지</MenuItem>
                  <MenuItem value={"투명데드롱"}>투명데드롱</MenuItem>
                  <MenuItem value={"은데드롱"}>은데드롱</MenuItem>
                  <MenuItem value={"유포지"}>유포지</MenuItem>
                </Select>
              </Box>
            </S.Product_Detail_Option_SelectBox>
          </Box>

          <Box sx={{ marginTop: "20px", borderTop: "1px solid #ddd" }}>
            <S.Product_Detail_Option_ItemBox>
              <S.OptionBtns>
                <TextField
                  sx={{ width: "50%", marginTop: "5px" }}
                  id="outlined-basic"
                  label="수량"
                  value={thomsonStickerQty}
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    const input = e.target.value < 0 ? 1 : e.target.value;

                    setThomsonStickerQty(input);
                    setGlobalQty(input);
                  }}
                />
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
        </Box>
      )}

      {type === "포스터" && (
        <Box
          sx={{
            marginBottom: "20px",
          }}
        >
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                사이즈
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns3>
                <ToggleButtonGroup
                  color="primary"
                  value={thomsonStickerStandard}
                  exclusive
                  onChange={(e) => {
                    setThomsonStickerStandard(e.target.value);
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
          <Box sx={{}}>
            <S.Product_Detail_Option_SelectBox>
              <Box sx={{ width: "48%" }}>
                <InputLabel
                  sx={{ fontSize: "0.8em", fontWeight: "500", color: "#000" }}
                >
                  용지
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={thomsonStickerPaper}
                  onChange={(e) => {
                    setThomsonStickerPaper(e.target.value);
                  }}
                  fullWidth
                >
                  <MenuItem value={"아트지"}>아트지</MenuItem>
                  <MenuItem value={"모조지"}>모조지</MenuItem>
                  <MenuItem value={"투명데드롱"}>투명데드롱</MenuItem>
                  <MenuItem value={"은데드롱"}>은데드롱</MenuItem>
                  <MenuItem value={"유포지"}>유포지</MenuItem>
                </Select>
              </Box>
            </S.Product_Detail_Option_SelectBox>
          </Box>

          <Box sx={{ marginTop: "20px", borderTop: "1px solid #ddd" }}>
            <S.Product_Detail_Option_ItemBox>
              <S.OptionBtns>
                <TextField
                  sx={{ width: "50%", marginTop: "5px" }}
                  id="outlined-basic"
                  label="수량"
                  value={thomsonStickerQty}
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    const input = e.target.value < 0 ? 1 : e.target.value;

                    setThomsonStickerQty(input);
                    setGlobalQty(input);
                  }}
                />
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
        </Box>
      )}

      {type === "리플릿" && (
        <Box
          sx={{
            marginBottom: "20px",
          }}
        >
          <Box sx={{}}>
            <S.Product_Detail_Option_ItemBox>
              <S.Product_Detail_Option_ItemText>
                사이즈
              </S.Product_Detail_Option_ItemText>
              <S.OptionBtns3>
                <ToggleButtonGroup
                  color="primary"
                  value={thomsonStickerStandard}
                  exclusive
                  onChange={(e) => {
                    setThomsonStickerStandard(e.target.value);
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
          <Box sx={{}}>
            <S.Product_Detail_Option_SelectBox>
              <Box sx={{ width: "48%" }}>
                <InputLabel
                  sx={{ fontSize: "0.8em", fontWeight: "500", color: "#000" }}
                >
                  용지
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={thomsonStickerPaper}
                  onChange={(e) => {
                    setThomsonStickerPaper(e.target.value);
                  }}
                  fullWidth
                >
                  <MenuItem value={"아트지"}>아트지</MenuItem>
                  <MenuItem value={"모조지"}>모조지</MenuItem>
                  <MenuItem value={"투명데드롱"}>투명데드롱</MenuItem>
                  <MenuItem value={"은데드롱"}>은데드롱</MenuItem>
                  <MenuItem value={"유포지"}>유포지</MenuItem>
                </Select>
              </Box>
            </S.Product_Detail_Option_SelectBox>
          </Box>

          <Box sx={{ marginTop: "20px", borderTop: "1px solid #ddd" }}>
            <S.Product_Detail_Option_ItemBox>
              <S.OptionBtns>
                <TextField
                  sx={{ width: "50%", marginTop: "5px" }}
                  id="outlined-basic"
                  label="수량"
                  value={thomsonStickerQty}
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    const input = e.target.value < 0 ? 1 : e.target.value;

                    setThomsonStickerQty(input);
                    setGlobalQty(input);
                  }}
                />
              </S.OptionBtns>
            </S.Product_Detail_Option_ItemBox>
          </Box>
        </Box>
      )}
    </>
  );
};

export default OptionToggle;
