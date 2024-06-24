import * as S from "../styles/new_styles";
import OptionItem from "../components/options/OptionItem";
import { useEffect, useRef, useState } from "react";
import ReviewBoard from "../components/products/ReviewBoard";
import { useParams } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import ReactQuill, { Quill } from "react-quill";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import OptionToggle from "../components/options/OptionToggle";
import {
  coatingPrice,
  coatingPrice2,
  coatingPrice_velvet,
  MissingNameCardPrice,
  MissingPrice1,
  MissingPrice3,
  OsiNameCard,
  OsiNameCardPrice,
  PunchingPrice,
  RoundingPrice,
} from "./price";
import ProdOptions from "../components/products/Options/ProdOptions";
import OptionDetail from "../components/products/Options/OptionDetail";
import { FileCopy } from "@mui/icons-material";
import ProdPrice from "../components/products/ProdPrice";
import { PriceCalc } from "../components/products/Options/PriceCalc";

const ProductDetailPage = ({ openPopup }) => {
  const [qty, setQty] = useState();
  const [scrollPositon, setScrollPosition] = useState(0);
  const [SliderIndex, SetSliderIndex] = useState(0);
  const DtailBox = useRef(null);
  const DropDown = useRef(null);
  const { prod_sid } = useParams();
  const [prodDetail, setProdDetail] = useState();
  const [prodImages, setProdImages] = useState([]);
  const [prodOptions, setProdOptions] = useState([]);
  const [prodPrice, setProdPrice] = useState(0);
  const [seletedOptions, setSeletedOptions] = useState([]);
  const { data } = useQuery("userinfo", { enabled: false });
  const USER_ID = data?.USER_ID;
  const [reviewData, setReviewData] = useState([]);
  const [designCheck, setDesignCheck] = useState(false);
  const [designFile, setDesignFile] = useState();

  useEffect(() => {
    axios
      .post(process.env.REACT_APP_DB_HOST + "/api/product/detail", {
        prod_sid: prod_sid,
      })
      .then((res) => {
        console.log(res);
        setProdDetail(res.data);
        setProdPrice(Math.round(res.data.PROD_PRICE));
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(process.env.REACT_APP_DB_HOST + "/api/product/images", {
        prod_sid: prod_sid,
      })
      .then((res) => {
        console.log(res);
        setProdImages(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(process.env.REACT_APP_DB_HOST + "/api/product/options", {
        prod_sid: prod_sid,
      })
      .then((res) => {
        const groupedData = {};
        res.data.forEach((option) => {
          const category = option.OPTION_CATE;
          if (!groupedData[category]) {
            groupedData[category] = {
              OPTION_CATE: category,
              OPTION: [],
            };
          }
          groupedData[category].OPTION.push(option);
        });

        const result = Object.values(groupedData);

        console.log(result);
        setProdOptions(result);
      })
      .catch((error) => {
        console.log(error);
      });

    initdb();
  }, [prod_sid]);

  const initdb = async () => {
    setReviewData(
      (
        await axios.post(process.env.REACT_APP_DB_HOST + "/api/review", {
          prod_sid: prod_sid,
        })
      ).data
    );

    const paperData = (
      await axios.get(process.env.REACT_APP_DB_HOST + "/api/paper", {
        params: {
          PROD_SID: prod_sid,
        },
      })
    ).data;

    const optionPriceData = (
      await axios.get(process.env.REACT_APP_DB_HOST + "/api/option_price", {
        params: {
          PROD_SID: prod_sid,
        },
      })
    ).data;

    setPaper(paperData);
    console.log(paperData);

    setSelectedPaper(paperData[0]?.PAPER_NM + paperData[0]?.PAPER_WEIGHT);

    setPaperQty(paperData[0]?.PAPER_QTY);

    setPaperAmt(paperData[0]?.PAPER_AMT);

    setQty(paperData[0]?.PAPER_QTY.split(",")[0]);

    setDefaultAmt(paperData[0]?.PAPER_AMT.split(",")[0]);

    setOptionPriceTable(optionPriceData);
  };

  useEffect(() => {
    // 초기 옵션 값 설정 (첫번째로)
    const seletedset = [];
    prodOptions.forEach((e, index) => {
      seletedset[index] = {
        OPTION_CATE: e.OPTION_CATE,
        OPTION_SID: e.OPTION[0].OPTION_SID,
        OPTION_PRICE: e.OPTION[0].OPTION_PRICE,
        OPTION_NM: e.OPTION[0].OPTION_NM,
        OPTION_DETAIL: e.OPTION[0].OPTION_DETAIL,
      };
    });
    setSeletedOptions(seletedset);
  }, [prodOptions]);

  useEffect(() => {
    calcPrice();
  }, [seletedOptions, qty]);

  const calcPrice = () => {
    // 옵션별로 가격 세팅
    console.log(seletedOptions);
    const copy_seletedOptions = seletedOptions;
    let total_price = 0;
    copy_seletedOptions.map((el) => {
      total_price += parseFloat(el.OPTION_PRICE);
    });
    console.log(total_price);
    console.log(prodDetail?.PROD_PRICE);
    setProdPrice(
      (parseFloat(prodDetail?.PROD_PRICE) + total_price) *
        (qty / prodDetail?.PROD_UNIT)
    );
  };

  const handleDropdown = (value) => {
    console.log(prodDetail?.PROD_QUANTITY?.split(","));
    setQty(value);
    DropDown.current.checked = false;
  };

  const updateScroll = () => {
    const MaxHeight = DtailBox.current.offsetHeight;
    if (window.scrollY < MaxHeight - 730) {
      setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      updateScroll();
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSlideClick = (index) => {
    SetSliderIndex(index);
  };

  const handlePrevClick = () => {
    if (SliderIndex != 0) {
      SetSliderIndex(SliderIndex - 1);
    } else {
      SetSliderIndex(prodImages.length - 1);
    }
  };

  const handleNextClick = () => {
    if (SliderIndex < prodImages.length - 1) {
      SetSliderIndex(SliderIndex + 1);
    } else {
      SetSliderIndex(0);
    }
  };

  const handleSendCart = async () => {
    if (USER_ID === undefined) {
      openPopup(0);
      return false;
    }
    if (!designCheck) {
      setSnackbar({
        children: "디자인을 확인해주세요.",
        severity: "error",
      });
      return false;
    }

    const PROD_SID = prodDetail.PROD_SID;
    const ITEM_OPTION = createOptionNm().join(" | ");
    const ITEM_QUANTITY =
      prodDetail?.PROD_OPTIONS?.indexOf("명함") != -1
        ? qty
        : prodDetail?.PROD_OPTIONS?.indexOf("책자") != -1
        ? bookQty
        : globalQty;
    const ITEM_AMOUNT =
      prodDetail?.PROD_OPTIONS?.indexOf("명함") != -1
        ? parseInt(defaultAmt) + parseInt(optionAmt) + parseInt(taxAmt)
        : prodDetail?.PROD_OPTIONS?.indexOf("책자") != -1
        ? parseInt(totalAmt) + parseInt(taxAmt)
        : parseInt(globalAmt) + parseInt(globalOptionAmt) + parseInt(globalTax);
    const ITEM_DESIGN = JSON.stringify([]);

    const res = await axios.post(
      process.env.REACT_APP_DB_HOST + "/api/cart/add",
      {
        PROD_SID: PROD_SID,
        ITEM_OPTION: ITEM_OPTION,
        ITEM_QUANTITY: ITEM_QUANTITY,
        ITEM_AMOUNT: ITEM_AMOUNT,
        ITEM_DESIGN: ITEM_DESIGN,
        USER_ID: USER_ID,
        ITEM_FILE_LOCATION: designFile,
      }
    );

    if (res.status === 200) {
      setSnackbar({
        children: "장바구니에 추가되었습니다.",
        severity: "success",
      });
    }
  };

  const paperRef = useRef([]);
  const [paper, setPaper] = useState([]);
  const [paperQty, setPaperQty] = useState();
  const [paperAmt, setPaperAmt] = useState();
  const [defaultAmt, setDefaultAmt] = useState(0);
  const [optionAmt, setOptionAmt] = useState(0);
  const [totalAmt, setTotalAmt] = useState(0);
  const [taxAmt, setTaxAmt] = useState(0);
  const [selectedPaper, setSelectedPaper] = useState();

  const handleChange = (event, newSelectedPaper) => {
    setSelectedPaper(newSelectedPaper);
  };

  //옵션 종합

  const [selOption, setSelOption] = useState({});
  const [optionPriceTable, setOptionPriceTable] = useState([]);

  // 옵션 가격 계산 함수
  const calculateOptionPrice = (qty, option) => {
    if (!option) {
      console.log(option);
      alert(`가격 테이블이 설정되지 않았습니다.`);
      return false;
    }

    if (qty < option.OPTION_DEFAULT_QTY) {
      // OPTION_DEFAULT_QTY보다 작은 경우 기본 가격 반환
      return option.OPTION_DEFAULT_AMT;
    } else {
      // OPTION_DEFAULT_QTY보다 큰 경우 추가 가격 계산
      let additionalQty = qty - option.OPTION_DEFAULT_QTY; // 추가된 수량
      let additionalPrice =
        Math.ceil(additionalQty / option.OPTION_ADD_QTY) *
        option.OPTION_ADD_AMT; // 추가된 수량에 해당하는 추가 가격
      return option.OPTION_DEFAULT_AMT + additionalPrice; // 기본 가격에 추가 가격을 더하여 반환
    }
  };

  const calculateDifference = (item) => {
    return Math.abs(item.maesu - qty);
  };

  function findClosest(Price) {
    return Price.reduce((prev, curr) => {
      return calculateDifference(curr) < calculateDifference(prev)
        ? curr
        : prev;
    });
  }

  const updateOptionAmt = () => {
    console.log(optionPriceTable);
    let amt = 0;

    if (selOption.earDori === true) {
      const findedItem = findClosest(RoundingPrice); //단가표
      console.log(findedItem);
      const premium = 1;

      amt += Math.round((findedItem["price"] * premium) / 100) * 100;
    }

    //타공
    if (selOption.punching === true) {
      const findedItem = findClosest(PunchingPrice); //단가표
      const premium = 1;
      //타공 개수 단가 * 수량 * premium 100의 자리 반올림
      amt +=
        Math.round((findedItem[selOption.punchingQty] * qty * premium) / 100) *
        100;
    }

    //오시_명함
    if (selOption.osi === true) {
      const findedItem = findClosest(OsiNameCardPrice); //단가표
      const premium = 1;
      //타공 개수 단가 * premium 100의 자리 반올림
      const price =
        Math.round((findedItem[selOption.osiQty] * premium) / 100) * 100;
      const min_price = 5000;
      const finalPrice = Math.max(price, min_price);
      amt += finalPrice;
    }

    //미싱
    if (selOption.missing === true) {
      let findedItem;
      if (selOption.missingQty === "line3") {
        findedItem = findClosest(MissingPrice3); //단가표
      } else {
        findedItem = findClosest(MissingPrice1); //단가표
      }

      const premium = 1;
      //타공 개수 단가 * premium 100의 자리 반올림
      const price = Math.round((findedItem["a6"] * qty * premium) / 100) * 100;
      const min_price = 5000;
      const finalPrice = Math.max(price, min_price);

      amt += finalPrice;
    }

    //코팅 명함
    if (selOption.coating === true) {
      const dan = 3400 - 700;
      const dan_add = 700;
      const yang = 4900 - 1300;
      const yang_add = 1300;

      let price = 0;
      if (selOption.coatingOption.indexOf("dan") != -1) {
        price = dan + (dan_add / 100) * qty;
      } else {
        price = yang + (yang_add / 100) * qty;
      }

      const premium = 1;
      const finalPrifce = Math.round((price * premium) / 100) * 100;

      amt += finalPrifce;
    }

    // if(selOption.cover)

    setOptionAmt(amt);
  };

  useEffect(() => {
    updateOptionAmt();
  }, [qty]);

  /**
   * 후가공
   *
   */

  /**
   * 옵션 이름 생성
   *
   */

  const createOptionNm = () => {
    console.log(selOption);
    let optionNm = [];

    if (selectedPaper) {
      optionNm.push(selectedPaper + "g");
    }

    if (selOption.earDori === true)
      optionNm.push(`귀도리 ${selOption.earDoriOption}`);

    if (selOption.punching === true) {
      let qty = "";
      switch (selOption.punchingQty) {
        case "cnt1":
          qty = "1개";
          break;
        case "cnt2":
          qty = "2개";
          break;
        case "cnt3":
          qty = "3개";
          break;
        case "cnt4":
          qty = "4개";
          break;
      }
      optionNm.push(`타공 ${qty} ${selOption.punchingSize}`);
    }

    if (selOption.osi === true) {
      let line = "";
      switch (selOption.osiQty) {
        case "line1":
          line = "1줄";
          break;
        case "line2":
          line = "2줄";
          break;
        case "line3":
          line = "3줄";
          break;
      }
      optionNm.push(`오시 ${line} ${selOption.osiDirect}`);
    }

    if (selOption.missing === true) {
      let line = "";
      switch (selOption.missingQty) {
        case "line1":
          line = "1줄";
          break;
        case "line2":
          line = "2줄";
          break;
        case "line3":
          line = "3줄";
          break;
      }
      optionNm.push(`미싱 ${line} ${selOption.missingDirect}`);
    }

    if (selOption.coating === true) {
      let coatingNm;
      switch (selOption.coatingOption) {
        case "dan_yes":
          coatingNm = "단면유광코팅";
          break;
        case "dan_no":
          coatingNm = "단면무광코팅";
          break;
        case "yang_yes":
          coatingNm = "양면유광코팅";
          break;
        case "yang_no":
          coatingNm = "양면무광코팅";
          break;
      }
      optionNm.push(`${coatingNm}`);
    }

    //책자
    if (prodDetail?.PROD_OPTIONS?.indexOf("책자") !== -1) {
      // 제본
      const makeBinding =
        selOption.bindingType === "ironBinding" ? "중철제본" : "무선제본";
      //후가공 금박 여부
      const makeGoldFoil =
        selOption.bookletGoldFoil === "none"
          ? ""
          : selOption.bookletGoldFoilDetail;
      const makeEmbossing = selOption.bookletEmbossing === "none" ? "" : "형압";
      const makeSpotCoatting =
        selOption.bookletSpotCoatting === "none" ? "" : "부분코팅";

      // 커버 양면/단면
      const makeCoverPage = selOption.coverSide === "double" ? "양면" : "단면";
      // 커버 코팅
      const makeCoverCoating =
        selOption.coverCoating === "선택안함"
          ? "코팅없음"
          : selOption.coverCoating;
      // 내지 양면/단면
      const mackInnerPage = selOption.innerSide === "double" ? "양면" : "단면";

      // 사이즈
      optionNm.push(`${selOption.paperSize}`);
      // 제본
      optionNm.push(`${makeBinding}`);
      // 후가공
      makeGoldFoil !== "" && optionNm.push(`${makeGoldFoil}`);
      makeEmbossing !== "" && optionNm.push(`${makeEmbossing}`);
      makeSpotCoatting !== "" && optionNm.push(`${makeSpotCoatting}`);
      // 커버옵션
      optionNm.push(
        `커버-${selOption.coverPaperDetail} ${selOption.coverPaperWeight}g,${makeCoverPage},${makeCoverCoating}`
      );
      // 내지옵션
      optionNm.push(
        `내지-${selOption.innerPaperDetail} ${selOption.innerPaperWeight}g,${mackInnerPage},${selOption.innerPage}P`
      );
    }

    //X배너
    if (prodDetail?.PROD_OPTIONS?.indexOf("X배너") != -1) {
      if (selOption.xbanner) {
        optionNm.push(`${selOption.xbanner.가로} x ${selOption.xbanner.세로}`);
        optionNm.push(`${selOption.xbanner.소재}`);
        optionNm.push(`후가공 : ${selOption.xbanner.후가공}`);
        optionNm.push(`거치대 : ${selOption.xbanner.거치대}`);
      }
    }

    //현수막
    if (prodDetail?.PROD_OPTIONS?.indexOf("현수막") != -1) {
      if (selOption.banner) {
        optionNm.push(`${selOption.banner.가로} x ${selOption.banner.세로}`);
        optionNm.push(`${selOption.banner.소재}`);
        optionNm.push(`후가공 : ${selOption.banner.후가공}`);
      }
    }

    return optionNm;
  };

  /**
   * 스낵바
   */

  const [snackbar, setSnackbar] = useState(null);

  //공통

  const [globalQty, setGlobalQty] = useState(1);
  const [globalAmt, setGlobalAmt] = useState(0);
  const [globalOptionAmt, setGlobalOptionAmt] = useState(0);
  const [globalTax, setGlobalTax] = useState(0);

  //

  //책자
  const [bookQty, setBookQty] = useState(1);
  const [bookCoverAmt, setBookCoverAmt] = useState(0);
  const [bookBindingAmt, setBookBindingAmt] = useState(0);
  const [bookCoatingAmt, setBookCoatingAmt] = useState(0);
  const [bookInnerAmt, setBookInnerAmt] = useState(0);
  const [bookOptionAmt, setBookOptionAmt] = useState(0);

  //책자 API
  const getPrice_paper = async (params) => {
    if (
      Object.values(params).some(
        (value) => value === null || value === "" || value === undefined
      )
    ) {
      console.error("Invalid parameter detected:", params);
      return;
    }

    const result = await axios.get(
      process.env.REACT_APP_DB_HOST + "/api/calc_price",
      {
        params,
      }
    );

    return result;
  };

  //책자 계산
  const calcBooklet = async () => {
    if (
      !bookQty ||
      !selOption ||
      prodDetail?.PROD_OPTIONS?.indexOf("책자") === -1
    ) {
      return false;
    }

    if (
      selOption.bindingType === undefined ||
      selOption.coverCoating === undefined ||
      selOption.bookletGoldFoil === undefined ||
      selOption.bookletEmbossing === undefined ||
      selOption.bookletSpotCoatting === undefined
    ) {
      return false;
    }
    //규격 A4 = B5 , A5 = B6
    let paperSize = "";
    if (selOption.paperSize === "A4" || selOption.paperSize === "B5") {
      paperSize = "A4/B5";
    } else if (selOption.paperSize === "A5" || selOption.paperSize === "B6") {
      paperSize = "A5/B6";
    }

    let unit_qty = 0;
    if (bookQty < 10) {
      unit_qty = 10;
    } else if (bookQty < 20) {
      unit_qty = 20;
    } else if (bookQty < 50) {
      unit_qty = 50;
    } else if (bookQty < 100) {
      unit_qty = 100;
    } else if (bookQty < 150) {
      unit_qty = 150;
    } else if (bookQty < 200) {
      unit_qty = 200;
    } else {
      unit_qty = 201;
    }

    // 커버지 종류에 따라서 커버지 종류를 결정
    let coverPaperNm = "";
    if (selOption.coverPaperDetail === "백상지") {
      coverPaperNm = "백상지";
    } else if (
      selOption.coverPaperDetail === "스노우화이트" ||
      selOption.coverPaperDetail === "아트"
    ) {
      coverPaperNm = "일반지";
    } else if (
      selOption.coverPaperDetail === "아르떼" ||
      selOption.coverPaperDetail === "랑데부" ||
      selOption.coverPaperDetail === "몽블랑"
    ) {
      coverPaperNm = "고급지";
    }

    // 내지 종류에 따라서 내지 종류를 결정
    let innerPaperNm = "";
    if (selOption.innerPaperDetail === "백상지") {
      innerPaperNm = "백상지";
    } else if (
      selOption.innerPaperDetail === "스노우화이트" ||
      selOption.innerPaperDetail === "아트"
    ) {
      innerPaperNm = "일반지";
    } else if (
      selOption.innerPaperDetail === "아르떼" ||
      selOption.innerPaperDetail === "랑데부" ||
      selOption.innerPaperDetail === "몽블랑"
    ) {
      innerPaperNm = "고급지";
    }

    const coverParams = {
      PAPER_PRICE_NM: coverPaperNm,
      PAPER_PRICE_WEIGHT: selOption.coverPaperWeight,
      UNIT_PRICE_CATE: "책자",
      UNIT_PRICE_UNIT: unit_qty,
      SIZE_PRICE_NM: paperSize,
      PRINT_TYPE: selOption.coverSide,
      QTY: 4,
    };

    const innerParams = {
      PAPER_PRICE_NM: innerPaperNm,
      PAPER_PRICE_WEIGHT: selOption.innerPaperWeight,
      UNIT_PRICE_CATE: "책자",
      UNIT_PRICE_UNIT: unit_qty,
      SIZE_PRICE_NM: paperSize,
      PRINT_TYPE: selOption.innerSide,
      QTY: selOption.innerPage,
    };

    setBookCoverAmt(
      (await getPrice_paper(coverParams))?.data.final_price * bookQty
    );
    setBookInnerAmt(
      (await getPrice_paper(innerParams))?.data.final_price * bookQty
    );

    const optionPriceTable = booklet_option_price[paperSize]?.find(
      (e) => e.copies === unit_qty
    );

    setBookBindingAmt(optionPriceTable[selOption.bindingType] * bookQty);
    setBookCoatingAmt(optionPriceTable[selOption.coverCoating] * bookQty);

    const goldFoil = selOption.bookletGoldFoil === "none" ? 0 : 150000;
    const embossing = selOption.bookletEmbossing === "none" ? 0 : 150000;
    const spotCoatting = selOption.bookletSpotCoatting === "none" ? 0 : 200000;

    setBookOptionAmt(goldFoil + embossing + spotCoatting);
  };

  //책자 부수 변경시 가격 계산
  useEffect(() => {
    calcBooklet();
    console.log(selOption);
  }, [bookQty]);

  //책자 표지 단가표
  const booklet_option_price = {
    "A4/B5": [
      {
        copies: 10,
        단면무광코팅: 700,
        단면유광코팅: 700,
        선택안함: 0,
        ironBinding: 1800,
        wirelessBinding: 2000,
        springBinding: 4000,
      },
      {
        copies: 20,
        단면무광코팅: 600,
        단면유광코팅: 600,
        선택안함: 0,
        ironBinding: 1500,
        wirelessBinding: 1800,
        springBinding: 3600,
      },
      {
        copies: 50,
        단면무광코팅: 500,
        단면유광코팅: 500,
        선택안함: 0,
        ironBinding: 1000,
        wirelessBinding: 1500,
        springBinding: 3000,
      },
      {
        copies: 100,
        단면무광코팅: 500,
        단면유광코팅: 500,
        선택안함: 0,
        ironBinding: 700,
        wirelessBinding: 1200,
        springBinding: 2400,
      },
      {
        copies: 150,
        단면무광코팅: 400,
        단면유광코팅: 400,
        선택안함: 0,
        ironBinding: 500,
        wirelessBinding: 1000,
        springBinding: 2000,
      },
      {
        copies: 200,
        단면무광코팅: 400,
        단면유광코팅: 400,
        선택안함: 0,
        ironBinding: 500,
        wirelessBinding: 900,
        springBinding: 1800,
      },
      {
        copies: 201,
        단면무광코팅: 400,
        단면유광코팅: 400,
        선택안함: 0,
        ironBinding: 400,
        wirelessBinding: 700,
        springBinding: 1400,
        double: 200,
        single: 0,
      },
    ],
    "A5/B6": [
      {
        copies: 10,
        단면무광코팅: 600,
        단면유광코팅: 600,
        선택안함: 0,
        ironBinding: 1800,
        wirelessBinding: 2000,
        springBinding: 4000,
      },
      {
        copies: 20,
        단면무광코팅: 500,
        단면유광코팅: 500,
        선택안함: 0,
        ironBinding: 1500,
        wirelessBinding: 1800,
        springBinding: 3600,
      },
      {
        copies: 50,
        단면무광코팅: 400,
        단면유광코팅: 400,
        선택안함: 0,
        ironBinding: 1000,
        wirelessBinding: 1500,
        springBinding: 3000,
      },
      {
        copies: 100,
        단면무광코팅: 400,
        단면유광코팅: 400,
        선택안함: 0,
        ironBinding: 700,
        wirelessBinding: 1200,
        springBinding: 2400,
      },
      {
        copies: 150,
        단면무광코팅: 300,
        단면유광코팅: 300,
        선택안함: 0,
        ironBinding: 500,
        wirelessBinding: 1000,
        springBinding: 2000,
      },
      {
        copies: 200,
        단면무광코팅: 300,
        단면유광코팅: 300,
        선택안함: 0,
        ironBinding: 500,
        wirelessBinding: 900,
        springBinding: 1800,
      },
      {
        copies: 201,
        단면무광코팅: 300,
        단면유광코팅: 300,
        선택안함: 0,
        ironBinding: 400,
        wirelessBinding: 700,
        springBinding: 1400,
        double: 200,
        single: 0,
      },
    ],
  };

  const booklet_cover_price = {
    A4: [
      {
        copies: 10,
        regularPaper: 700,
        premiumPaper: 800,
        단면무광코팅: 700,
        단면유광코팅: 700,
        선택안함: 0,
        ironBinding: 1800,
        wirelessBinding: 2000,
        springBinding: 4000,
        double: 200,
        single: 0,
      },
      {
        copies: 20,
        regularPaper: 600,
        premiumPaper: 700,
        coating: 600,
        ironBinding: 1500,
        wirelessBinding: 1800,
        springBinding: 3600,
        double: 200,
        single: 0,
      },
      {
        copies: 50,
        regularPaper: 600,
        premiumPaper: 700,
        coating: 500,
        ironBinding: 1000,
        wirelessBinding: 1500,
        springBinding: 3000,
        double: 200,
        single: 0,
      },
      {
        copies: 100,
        regularPaper: 500,
        premiumPaper: 600,
        coating: 500,
        ironBinding: 700,
        wirelessBinding: 1200,
        springBinding: 2400,
        double: 200,
        single: 0,
      },
      {
        copies: 150,
        regularPaper: 400,
        premiumPaper: 500,
        coating: 400,
        ironBinding: 500,
        wirelessBinding: 1000,
        springBinding: 2000,
        double: 200,
        single: 0,
      },
      {
        copies: 200,
        regularPaper: 400,
        premiumPaper: 500,
        coating: 400,
        ironBinding: 500,
        wirelessBinding: 900,
        springBinding: 1800,
        double: 200,
        single: 0,
      },
      {
        copies: 201,
        regularPaper: 400,
        premiumPaper: 500,
        coating: 400,
        ironBinding: 400,
        wirelessBinding: 700,
        springBinding: 1400,
        double: 200,
        single: 0,
      },
    ],
    A5: [
      {
        copies: 10,
        regularPaper: 600,
        premiumPaper: 700,
        coating: 600,
        ironBinding: 1800,
        wirelessBinding: 2000,
        springBinding: 4000,
        double: 200,
        single: 0,
      },
      {
        copies: 20,
        regularPaper: 500,
        premiumPaper: 600,
        coating: 500,
        ironBinding: 1500,
        wirelessBinding: 1800,
        springBinding: 3600,
        double: 200,
        single: 0,
      },
      {
        copies: 50,
        regularPaper: 500,
        premiumPaper: 600,
        coating: 400,
        ironBinding: 1000,
        wirelessBinding: 1500,
        springBinding: 3000,
        double: 200,
        single: 0,
      },
      {
        copies: 100,
        regularPaper: 400,
        premiumPaper: 500,
        coating: 400,
        ironBinding: 700,
        wirelessBinding: 1200,
        springBinding: 2400,
        double: 200,
        single: 0,
      },
      {
        copies: 150,
        regularPaper: 300,
        premiumPaper: 400,
        coating: 300,
        ironBinding: 500,
        wirelessBinding: 1000,
        springBinding: 2000,
        double: 200,
        single: 0,
      },
      {
        copies: 200,
        regularPaper: 300,
        premiumPaper: 400,
        coating: 300,
        ironBinding: 500,
        wirelessBinding: 900,
        springBinding: 1800,
        double: 200,
        single: 0,
      },
      {
        copies: 201,
        regularPaper: 300,
        premiumPaper: 400,
        coating: 300,
        ironBinding: 400,
        wirelessBinding: 700,
        springBinding: 1400,
        double: 200,
        single: 0,
      },
    ],
  };

  const booklet_inner_price = {
    A4: [
      {
        copies: 10,
        regularPaper: 180,
        premiumPaper: 200,
        premiumPaper2: 210,
        double: 0,
        single: 10,
      },
      {
        copies: 20,
        regularPaper: 150,
        premiumPaper: 170,
        premiumPaper2: 180,
        double: 0,
        single: 10,
      },
      {
        copies: 50,
        regularPaper: 140,
        premiumPaper: 160,
        premiumPaper2: 170,
        double: 0,
        single: 10,
      },
      {
        copies: 100,
        regularPaper: 130,
        premiumPaper: 150,
        premiumPaper2: 160,
        double: 0,
        single: 10,
      },
      {
        copies: 150,
        regularPaper: 120,
        premiumPaper: 140,
        premiumPaper2: 150,
        double: 0,
        single: 10,
      },
      {
        copies: 200,
        regularPaper: 100,
        premiumPaper: 120,
        premiumPaper2: 130,
        double: 0,
        single: 10,
      },
      {
        copies: 201,
        regularPaper: 90,
        premiumPaper: 110,
        premiumPaper2: 120,
        double: 0,
        single: 10,
      },
    ],
    A5: [
      {
        copies: 10,
        regularPaper: 100,
        premiumPaper: 120,
        premiumPaper2: 130,
        double: 0,
        single: 10,
      },
      {
        copies: 20,
        regularPaper: 85,
        premiumPaper: 105,
        premiumPaper2: 115,
        double: 0,
        single: 10,
      },
      {
        copies: 50,
        regularPaper: 80,
        premiumPaper: 100,
        premiumPaper2: 110,
        double: 0,
        single: 10,
      },
      {
        copies: 100,
        regularPaper: 75,
        premiumPaper: 95,
        premiumPaper2: 105,
        double: 0,
        single: 10,
      },
      {
        copies: 150,
        regularPaper: 70,
        premiumPaper: 90,
        premiumPaper2: 100,
        double: 0,
        single: 10,
      },
      {
        copies: 200,
        regularPaper: 60,
        premiumPaper: 80,
        premiumPaper2: 90,
        double: 0,
        single: 10,
      },
      {
        copies: 201,
        regularPaper: 55,
        premiumPaper: 75,
        premiumPaper2: 85,
        double: 0,
        single: 10,
      },
    ],
  };

  const booklet_finishing_price = {
    goldfoil: 150000,
    embossing: 150000,
    spotcoatting: 200000,
  };

  //책자 최종가격 계산
  const calcTotalAmt = () => {
    let defaultAmt_copy =
      isNaN(defaultAmt) || defaultAmt === undefined ? 0 : defaultAmt;
    let optionAmt_copy =
      isNaN(optionAmt) || optionAmt === undefined ? 0 : optionAmt;
    let bookCoverAmt_copy =
      isNaN(bookCoverAmt) || bookCoverAmt === undefined ? 0 : bookCoverAmt;
    let bookInnerAmt_copy =
      isNaN(bookInnerAmt) || bookInnerAmt === undefined ? 0 : bookInnerAmt;
    let bookOptionAmt_copy =
      isNaN(bookOptionAmt) || bookOptionAmt === undefined ? 0 : bookOptionAmt;
    let bookCoatingAmt_copy =
      isNaN(bookCoatingAmt) || bookCoatingAmt === undefined
        ? 0
        : bookCoatingAmt;
    let bookBindingAmt_copy =
      isNaN(bookBindingAmt) || bookBindingAmt === undefined
        ? 0
        : bookBindingAmt;

    setTotalAmt(
      parseInt(optionAmt_copy) +
        parseInt(defaultAmt_copy) +
        parseInt(bookCoverAmt_copy) +
        parseInt(bookInnerAmt_copy) +
        parseInt(bookOptionAmt_copy) +
        parseInt(bookCoatingAmt_copy) +
        parseInt(bookBindingAmt_copy)
    );

    // 책자일 경우
    if (prodDetail?.PROD_OPTIONS?.indexOf("책자") !== -1) {
      const bookletTax =
        (parseInt(optionAmt_copy) +
          parseInt(defaultAmt_copy) +
          parseInt(bookCoverAmt_copy) +
          parseInt(bookInnerAmt_copy) +
          parseInt(bookOptionAmt_copy) +
          parseInt(bookCoatingAmt_copy) +
          parseInt(bookBindingAmt_copy)) *
        0.1;

      setTaxAmt(Math.round(bookletTax / 10) * 10);
    } else {
      const elseTax =
        (parseInt(optionAmt_copy) + parseInt(defaultAmt_copy)) * 0.1;
      setTaxAmt(Math.round(elseTax / 10) * 10);
    }
  };

  useEffect(() => {
    calcTotalAmt();
  }, [
    optionAmt,
    defaultAmt,
    bookCoverAmt,
    bookInnerAmt,
    bookOptionAmt,
    bookCoatingAmt,
    bookBindingAmt,
  ]);

  // 옵션 체크
  const [SelectOptions, setSelectOptions] = useState({
    일반지: {},
    고급지: {},
    전단지: {},
    엽서: {},
    포스터: {},
    리플릿: {},
    재단스티커: {},
    도무송스티커: {},
    책자: {},
    단행본: {},
    브로슈어: {},
    스프링노트: {},
    제안서: {},
    노트: {},
    박스: {},
    합지박스: {},
    쇼핑백: {},
    현수막: {},
    X배너: {},
  });

  //옵션 나열
  const [optionList, setOptionList] = useState({
    일반지: {},
    고급지: {},
    전단지: {},
    엽서: {},
    포스터: {},
    리플릿: {},
    재단스티커: {},
    도무송스티커: {},
    책자: {},
    단행본: {},
    브로슈어: {},
    스프링노트: {},
    제안서: {},
    노트: {},
    박스: {},
    합지박스: {},
    쇼핑백: {},
    현수막: {},
    X배너: {},
  });

  useEffect(() => {
    console.log(SelectOptions[prodDetail?.PROD_NM]);
    console.log(SelectOptions);
  }, [SelectOptions]);

  useEffect(() => {
    console.log(optionList);
    console.log(optionList[prodDetail?.PROD_NM]);
  }, [optionList]);

  //단가표

  const [priceTable, setPriceTable] = useState([]);
  const [priceTable_global, setPriceTable_global] = useState([]);

  //단가표 불러오기
  useEffect(() => {
    getPrices();
    getPrices_global();
    setPrintPrice(0);
    setOptionPrice(0);
    setTaxPrice(0);
  }, [prodDetail?.PROD_NM]);

  const [printPrice, setPrintPrice] = useState(0);
  const [optionPrice, setOptionPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);

  //변경시 단가 계산
  useEffect(() => {
    const finalPrice = PriceCalc(
      priceTable,
      priceTable_global,
      prodDetail?.PROD_NM,
      SelectOptions,
      optionList
    );

    if (finalPrice === undefined) return;

    if (isNaN(finalPrice?.print) || isNaN(finalPrice?.option)) return;

    const rounded_printPrice = Math.round(finalPrice?.print / 10) * 10;
    const rounded_optionPrice = Math.round(finalPrice?.option / 10) * 10;
    const rounded_taxPrice =
      Math.round(((rounded_printPrice + rounded_optionPrice) * 0.1) / 10) * 10;

    setPrintPrice(rounded_printPrice);
    setOptionPrice(rounded_optionPrice);
    setTaxPrice(rounded_taxPrice);
  }, [SelectOptions, optionList, []]);

  // 상품별 단가표
  const getPrices = async () => {
    const price_data = (
      await axios.get(process.env.REACT_APP_DB_HOST + "/api/global/prices", {
        params: { PRICE_PROD_CATE: prodDetail?.PROD_NM },
      })
    ).data;

    console.log("단가표 >>", price_data);
    setPriceTable(price_data);

    // console.log(price_data);

    // console.log(
    //   price_data.filter(
    //     (el) => el.PRICE_OPTION_NM === SelectOptions[prodDetail?.PROD_NM].용지
    //   )
    // );

    // const testdata = price_data.filter(
    //   (el) => el.PRICE_OPTION_NM === SelectOptions[prodDetail?.PROD_NM].용지
    // );

    // console.log(
    //   filterByQty(testdata, SelectOptions[prodDetail?.PROD_NM]?.수량)
    // );

    // const paperPrice =
    //   filterByQty(testdata, SelectOptions[prodDetail?.PROD_NM]?.수량)
    //     .PRICE_PRICE * SelectOptions[prodDetail?.PROD_NM]?.수량;

    // console.log("용지가격 : ", paperPrice);
  };

  // 공통 단가표
  const getPrices_global = async () => {
    const price_data = (
      await axios.get(process.env.REACT_APP_DB_HOST + "/api/global/prices", {
        params: { PRICE_PROD_CATE: "공통" },
      })
    ).data;

    console.log("공통단가표 >>", price_data);
    setPriceTable_global(price_data);
  };

  return (
    <>
      <S.MainLayout>
        {/* <Button onClick={createOptionNm}>ㅇㅇ</Button> */}
        <S.MainSection>
          <S.ProdDetailWrapper>
            <S.ProdDetailBox ref={DtailBox}>
              <S.ProdDetailLeft>
                <S.ProdDetailSliderBox topValue={scrollPositon}>
                  <S.ProdDetailMainSlider>
                    <S.ProdDetailMainSliderView
                      img={prodImages[SliderIndex]?.IMAGE_LOCATION}
                    >
                      <S.ProdDetailSliderPrev onClick={handlePrevClick} />
                      <S.ProdDetailSliderNext onClick={handleNextClick} />
                    </S.ProdDetailMainSliderView>
                  </S.ProdDetailMainSlider>
                  <S.ProdDetailSubSlider>
                    {prodImages?.map((item, index) => (
                      <S.ProdDetailSubSliderView
                        className={index === SliderIndex ? "selected" : null}
                        onClick={() => {
                          handleSlideClick(index);
                        }}
                        img={item.IMAGE_LOCATION}
                      />
                    ))}
                  </S.ProdDetailSubSlider>
                </S.ProdDetailSliderBox>
              </S.ProdDetailLeft>
              <S.ProdDetailRight>
                <S.ProdDetailTitle>{prodDetail?.PROD_NM}</S.ProdDetailTitle>
                {prodDetail?.PROD_DETAIL?.split("|").map((el, index) => (
                  <S.ProdDetailDesc>{el}</S.ProdDetailDesc>
                ))}
                <S.Product_Detail_Option_ItemWrapper>
                  {/* 옵션 */}
                  <ProdOptions
                    prod={prodDetail?.PROD_NM}
                    SelectOptions={SelectOptions}
                    setSelectOptions={setSelectOptions}
                    optionList={optionList}
                    setOptionList={setOptionList}
                  />
                </S.Product_Detail_Option_ItemWrapper>
                {prodDetail?.PROD_NOTI?.split("|").map((el, index) => (
                  <S.ProdDetailDesc>{el}</S.ProdDetailDesc>
                ))}

                {/* <Link to="/order"> */}
                {/* <S.ProdDetailPayButton onClick={handleSendCart}>
                  장바구니에 담기
                </S.ProdDetailPayButton> */}
                {/* </Link> */}
              </S.ProdDetailRight>
              <S.ProdDetailRight2 />
            </S.ProdDetailBox>
          </S.ProdDetailWrapper>
          {/* 견적서 */}
          <ProdPrice
            USER_ID={USER_ID}
            openPopup={openPopup}
            setSnackbar={setSnackbar}
            designFile={designFile}
            setDesignFile={setDesignFile}
            designCheck={designCheck}
            setDesignCheck={setDesignCheck}
            handleSendCart={handleSendCart}
            imgUrl={prodImages[SliderIndex]?.IMAGE_LOCATION}
            printPrice={printPrice}
            optionPrice={optionPrice}
            taxPrice={taxPrice}
          />
          {/* 견적서 끝 */}
        </S.MainSection>
        {/* 주문하기 및 옵션 선택 */}
        <S.MainSection>
          <S.ProductOrderBox>
            <OptionDetail
              prod={prodDetail?.PROD_NM}
              SelectOptions={SelectOptions}
              setSelectOptions={setSelectOptions}
              optionList={optionList}
              setOptionList={setOptionList}
            />
          </S.ProductOrderBox>
        </S.MainSection>
        {/* 주문하기 및 옵션 선택 끝 */}
        <S.MainSection bgc="">
          <S.ProdDetailContentWrapper>
            <div className="ql-snow">
              <div className="ql-editor">
                <div
                  dangerouslySetInnerHTML={{ __html: prodDetail?.PROD_CONTENT }}
                />
              </div>
            </div>
          </S.ProdDetailContentWrapper>
        </S.MainSection>
        <S.MainSection>
          <S.ProductReviewWrapper>
            <h1>고객 리뷰</h1>
            <ReviewBoard reviewData={reviewData} />
          </S.ProductReviewWrapper>
        </S.MainSection>
      </S.MainLayout>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => {
            setSnackbar(null);
          }}
          autoHideDuration={3000}
        >
          <Alert
            {...snackbar}
            onClose={() => {
              setSnackbar(null);
            }}
          />
        </Snackbar>
      )}
    </>
  );
};

export default ProductDetailPage;
