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
  TextField,
  ToggleButton,
  ToggleButtonGroup,
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

  const navigate = useNavigate();

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

  const handleUploadDesign = () => {
    if (USER_ID === undefined) {
      openPopup(0);
      return false;
    }
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".ai,.pdf");
    input.click();
    input.addEventListener("change", async () => {
      const file = input.files[0];

      //체크
      const allowedExtensions = [".ai", ".pdf"];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes("." + fileExtension)) {
        setSnackbar({
          children: "올바른 파일 형식을 선택해주세요. (ai 또는 pdf)",
          severity: "error",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "design");
      formData.append("userid", USER_ID);
      try {
        const result = await axios.post(
          process.env.REACT_APP_DB_HOST + "/api/upload_design",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const designUrl = result.data;
        setSnackbar({
          children: "파일이 업로드 되었습니다.",
          severity: "success",
        });
        setDesignFile(designUrl);
        setDesignCheck(true);
      } catch (error) {
        console.log("실패");
      }
    });
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
      const makeGoldFoil = selOption.bookletGoldFoil === "none" ? "" : "금박";
      const makeEmbossing = selOption.bookletEmbossing === "none" ? "" : "형압";
      const makeSpotCoatting =
        selOption.bookletSpotCoatting === "none" ? "" : "부분코팅";

      // 커버 양면/단면
      const makeCoverPage =
        selOption.coverPage === "doubleSide" ? "양면" : "단면";
      // 커버 코팅
      const makeCoverCoating =
        selOption.coverCoating === "선택안함"
          ? "코팅없음"
          : selOption.coverCoating;
      // 내지 양면/단면
      const mackInnerPage =
        selOption.innerSide === "doubleSide" ? "양면" : "단면";

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

  //책자 계산
  const calcBooklet = () => {
    if (!bookQty || !selOption) {
      return false;
    }
    //규격 A4 = B5 , A5 = B6
    const paperSize =
      selOption.paperSize === "B5"
        ? "A4"
        : selOption.paperSize === "B6"
        ? "A5"
        : selOption?.paperSize;

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

    //커버 가격 테이블
    const cover_price = booklet_cover_price[paperSize]?.find(
      (e) => e.copies === unit_qty
    );

    //내지 가격 테이블
    const inner_price = booklet_inner_price[paperSize]?.find(
      (e) => e.copies === unit_qty
    );

    // 로딩 처리
    if (!cover_price || !inner_price) {
      console.log("뭔가없음");
      return false;
    }

    // 커버 가격계산
    console.log(
      "표지비",
      (cover_price[selOption.coverPaper] + cover_price[selOption.coverPage]) *
        bookQty
    );
    setBookCoverAmt(
      (cover_price[selOption.coverPaper] + cover_price[selOption.coverPage]) *
        bookQty
    );
    console.log("제본비", cover_price[selOption.bindingType] * bookQty);
    setBookBindingAmt(cover_price[selOption.bindingType] * bookQty);

    if (selOption.coverCoating !== "선택안함") {
      console.log("코팅값", cover_price["coating"] * bookQty);
      setBookCoatingAmt(cover_price["coating"] * bookQty);
    } else {
      console.log("코팅값", 0);
      setBookCoatingAmt(0);
    }

    //내지 단면 혹은 양면 추가값
    // 고급지는 +10
    let inner_side_price = 0;
    if (
      selOption.innerPaper === "regularPaper" &&
      selOption.innerSide === "singleSide"
    ) {
      inner_side_price = inner_price[selOption.innerSide];
    } else if (
      selOption.innerPaper !== "regularPaper" &&
      selOption.innerSide === "singleSide"
    ) {
      inner_side_price = inner_price[selOption.innerSide] + 10;
    }

    console.log(inner_side_price);

    console.log(
      `내지비 (${inner_price[selOption.innerPaper]} + ${inner_side_price}) * ${
        selOption.innerPage
      } * ${bookQty} = ${
        (inner_price[selOption.innerPaper] + inner_side_price) *
        selOption.innerPage *
        bookQty
      }`
    );
    setBookInnerAmt(
      (inner_price[selOption.innerPaper] + inner_side_price) *
        selOption.innerPage *
        bookQty
    );

    //후가공 계산
    let finishing_price = 0;
    //금박
    if (selOption.bookletGoldFoil != "none") {
      finishing_price += booklet_finishing_price[selOption.bookletGoldFoil];
    }

    if (selOption.bookletEmbossing != "none") {
      finishing_price += booklet_finishing_price[selOption.bookletEmbossing];
    }

    if (selOption.bookletSpotCoatting != "none") {
      finishing_price += booklet_finishing_price[selOption.bookletSpotCoatting];
    }

    setBookOptionAmt(finishing_price);
  };

  //책자 부수 변경시 가격 계산
  useEffect(() => {
    calcBooklet();
    console.log(selOption);
  }, [bookQty]);

  //책자 표지 단가표
  const booklet_cover_price = {
    A4: [
      {
        copies: 10,
        regularPaper: 700,
        premiumPaper: 800,
        coating: 700,
        ironBinding: 1800,
        wirelessBinding: 2000,
        springBinding: 4000,
        doubleSide: 200,
        singleSide: 0,
      },
      {
        copies: 20,
        regularPaper: 600,
        premiumPaper: 700,
        coating: 600,
        ironBinding: 1500,
        wirelessBinding: 1800,
        springBinding: 3600,
        doubleSide: 200,
        singleSide: 0,
      },
      {
        copies: 50,
        regularPaper: 600,
        premiumPaper: 700,
        coating: 500,
        ironBinding: 1000,
        wirelessBinding: 1500,
        springBinding: 3000,
        doubleSide: 200,
        singleSide: 0,
      },
      {
        copies: 100,
        regularPaper: 500,
        premiumPaper: 600,
        coating: 500,
        ironBinding: 700,
        wirelessBinding: 1200,
        springBinding: 2400,
        doubleSide: 200,
        singleSide: 0,
      },
      {
        copies: 150,
        regularPaper: 400,
        premiumPaper: 500,
        coating: 400,
        ironBinding: 500,
        wirelessBinding: 1000,
        springBinding: 2000,
        doubleSide: 200,
        singleSide: 0,
      },
      {
        copies: 200,
        regularPaper: 400,
        premiumPaper: 500,
        coating: 400,
        ironBinding: 500,
        wirelessBinding: 900,
        springBinding: 1800,
        doubleSide: 200,
        singleSide: 0,
      },
      {
        copies: 201,
        regularPaper: 400,
        premiumPaper: 500,
        coating: 400,
        ironBinding: 400,
        wirelessBinding: 700,
        springBinding: 1400,
        doubleSide: 200,
        singleSide: 0,
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
        doubleSide: 200,
        singleSide: 0,
      },
      {
        copies: 20,
        regularPaper: 500,
        premiumPaper: 600,
        coating: 500,
        ironBinding: 1500,
        wirelessBinding: 1800,
        springBinding: 3600,
        doubleSide: 200,
        singleSide: 0,
      },
      {
        copies: 50,
        regularPaper: 500,
        premiumPaper: 600,
        coating: 400,
        ironBinding: 1000,
        wirelessBinding: 1500,
        springBinding: 3000,
        doubleSide: 200,
        singleSide: 0,
      },
      {
        copies: 100,
        regularPaper: 400,
        premiumPaper: 500,
        coating: 400,
        ironBinding: 700,
        wirelessBinding: 1200,
        springBinding: 2400,
        doubleSide: 200,
        singleSide: 0,
      },
      {
        copies: 150,
        regularPaper: 300,
        premiumPaper: 400,
        coating: 300,
        ironBinding: 500,
        wirelessBinding: 1000,
        springBinding: 2000,
        doubleSide: 200,
        singleSide: 0,
      },
      {
        copies: 200,
        regularPaper: 300,
        premiumPaper: 400,
        coating: 300,
        ironBinding: 500,
        wirelessBinding: 900,
        springBinding: 1800,
        doubleSide: 200,
        singleSide: 0,
      },
      {
        copies: 201,
        regularPaper: 300,
        premiumPaper: 400,
        coating: 300,
        ironBinding: 400,
        wirelessBinding: 700,
        springBinding: 1400,
        doubleSide: 200,
        singleSide: 0,
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
        doubleSide: 0,
        singleSide: 10,
      },
      {
        copies: 20,
        regularPaper: 150,
        premiumPaper: 170,
        premiumPaper2: 180,
        doubleSide: 0,
        singleSide: 10,
      },
      {
        copies: 50,
        regularPaper: 140,
        premiumPaper: 160,
        premiumPaper2: 170,
        doubleSide: 0,
        singleSide: 10,
      },
      {
        copies: 100,
        regularPaper: 130,
        premiumPaper: 150,
        premiumPaper2: 160,
        doubleSide: 0,
        singleSide: 10,
      },
      {
        copies: 150,
        regularPaper: 120,
        premiumPaper: 140,
        premiumPaper2: 150,
        doubleSide: 0,
        singleSide: 10,
      },
      {
        copies: 200,
        regularPaper: 100,
        premiumPaper: 120,
        premiumPaper2: 130,
        doubleSide: 0,
        singleSide: 10,
      },
      {
        copies: 201,
        regularPaper: 90,
        premiumPaper: 110,
        premiumPaper2: 120,
        doubleSide: 0,
        singleSide: 10,
      },
    ],
    A5: [
      {
        copies: 10,
        regularPaper: 100,
        premiumPaper: 120,
        premiumPaper2: 130,
        doubleSide: 0,
        singleSide: 10,
      },
      {
        copies: 20,
        regularPaper: 85,
        premiumPaper: 105,
        premiumPaper2: 115,
        doubleSide: 0,
        singleSide: 10,
      },
      {
        copies: 50,
        regularPaper: 80,
        premiumPaper: 100,
        premiumPaper2: 110,
        doubleSide: 0,
        singleSide: 10,
      },
      {
        copies: 100,
        regularPaper: 75,
        premiumPaper: 95,
        premiumPaper2: 105,
        doubleSide: 0,
        singleSide: 10,
      },
      {
        copies: 150,
        regularPaper: 70,
        premiumPaper: 90,
        premiumPaper2: 100,
        doubleSide: 0,
        singleSide: 10,
      },
      {
        copies: 200,
        regularPaper: 60,
        premiumPaper: 80,
        premiumPaper2: 90,
        doubleSide: 0,
        singleSide: 10,
      },
      {
        copies: 201,
        regularPaper: 55,
        premiumPaper: 75,
        premiumPaper2: 85,
        doubleSide: 0,
        singleSide: 10,
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

  return (
    <>
      <S.MainLayout>
        {/* <Button onClick={createOptionNm}>ㅇㅇ</Button> */}
        <S.MainSection>
          <S.ProdDetailWrapper>
            <S.ProdDetailBox ref={DtailBox}>
              <S.ProdDetailLeft>
                <S.ProdDetailSliderBox topValue={scrollPositon + 30}>
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
                  {/* 명함일 경우 용지 세팅 */}
                  {prodDetail?.PROD_OPTIONS?.indexOf("명함") != -1 && (
                    <S.Product_Detail_Option_ItemBox>
                      <S.Product_Detail_Option_ItemText>
                        용지
                      </S.Product_Detail_Option_ItemText>
                      <S.OptionBtns>
                        <ToggleButtonGroup
                          color="primary"
                          value={selectedPaper}
                          exclusive
                          onChange={(e) => {
                            setSelectedPaper(e.target.value);
                          }}
                          aria-label="Platform"
                          style={{ width: "100%" }}
                          className="group"
                        >
                          {paper?.map((item, index) => (
                            <ToggleButton
                              value={item.PAPER_NM + item.PAPER_WEIGHT}
                              onClick={() => {
                                setPaperQty(item.PAPER_QTY);
                                setPaperAmt(item.PAPER_AMT);
                                setQty(item.PAPER_QTY?.split(",")[0]);
                                setDefaultAmt(item.PAPER_AMT?.split(",")[0]);
                              }}
                            >
                              {item.PAPER_NM} {item.PAPER_WEIGHT}g
                            </ToggleButton>
                          ))}
                        </ToggleButtonGroup>
                      </S.OptionBtns>
                    </S.Product_Detail_Option_ItemBox>
                  )}

                  {/* {prodOptions?.map((options, index) => (
                    <OptionItem
                      Options={options}
                      seletedOptions={seletedOptions}
                      setSeletedOptions={setSeletedOptions}
                      calcPrice={calcPrice}
                    />
                  ))} */}
                  {/* 수량 */}

                  {/* 후가공 옵션 */}

                  {prodDetail?.PROD_OPTIONS?.split("|")?.map((el, index) => (
                    <OptionToggle
                      type={el}
                      PROD_NM={prodDetail?.PROD_NM}
                      selOption={selOption}
                      setSelOption={setSelOption}
                      updateOptionAmt={updateOptionAmt}
                      calcBooklet={calcBooklet}
                      globalQty={globalQty}
                      setGlobalQty={setGlobalQty}
                      globalAmt={globalAmt}
                      setGlobalAmt={setGlobalAmt}
                      globalOptionAmt={globalOptionAmt}
                      setGlobalOptionAmt={setGlobalOptionAmt}
                      globalTax={globalTax}
                      setGlobalTax={setGlobalTax}
                      snackbar={snackbar}
                      setSnackbar={setSnackbar}
                    />
                  ))}
                  {/* 명함 수량 */}
                  {prodDetail?.PROD_OPTIONS?.indexOf("명함") != -1 ? (
                    <S.Product_Detail_Option_ItemBox2>
                      <S.Product_Detail_Option_ItemText>
                        수량
                      </S.Product_Detail_Option_ItemText>
                      <Select
                        value={qty ? qty : 100}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        autoWidth={true}
                      >
                        {paperQty?.split(",")?.map((el, index) => (
                          <MenuItem
                            value={el}
                            onClick={() => {
                              setQty(el);
                              setDefaultAmt(paperAmt.split(",")[index]);
                            }}
                          >
                            {el}
                          </MenuItem>
                        ))}
                      </Select>
                    </S.Product_Detail_Option_ItemBox2>
                  ) : prodDetail?.PROD_OPTIONS?.indexOf("책자") != -1 ? (
                    <Box sx={{}}>
                      <S.Product_Detail_Option_ItemBox2>
                        <S.OptionBtns>
                          <TextField
                            sx={{ width: "50%", marginTop: "5px" }}
                            id="outlined-basic"
                            label="부수"
                            value={bookQty}
                            variant="outlined"
                            type="number"
                            onChange={(e) => {
                              setBookQty(e.target.value);
                            }}
                            onBlur={(e) => {
                              if (e.target.value < 2) {
                                setBookQty(1);
                              } else if (e.target.value % 2 !== 0) {
                                setBookQty(parseInt(e.target.value) + 1);
                              }
                            }}
                          />
                        </S.OptionBtns>
                      </S.Product_Detail_Option_ItemBox2>
                    </Box>
                  ) : null}
                </S.Product_Detail_Option_ItemWrapper>
                {prodDetail?.PROD_NOTI?.split("|").map((el, index) => (
                  <S.ProdDetailDesc>{el}</S.ProdDetailDesc>
                ))}

                <S.ProdDetailDesignBtns>
                  <S.Btn
                    width="45%"
                    onClick={() => {
                      navigate("/editor");
                    }}
                    disabled
                  >
                    직접 디자인하기
                  </S.Btn>
                  <S.Btn width="45%" onClick={handleUploadDesign}>
                    파일 업로드
                  </S.Btn>
                </S.ProdDetailDesignBtns>
                {designCheck && (
                  <S.ProdDetailDesignBtns>
                    <S.Btn
                      onClick={() => {
                        window.open(designFile);
                      }}
                    >
                      디자인 파일 열기
                    </S.Btn>
                  </S.ProdDetailDesignBtns>
                )}

                {prodDetail?.PROD_OPTIONS?.indexOf("책자") != -1 ? (
                  <S.ProdDetailPayBox>
                    <S.ProdDetailPriceText>표지비</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(bookCoverAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>내지비</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(bookInnerAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>제본비</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(bookBindingAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>코팅비</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(bookCoatingAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>후가공</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(bookOptionAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>부가세</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(taxAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>총금액</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {(parseInt(totalAmt) + parseInt(taxAmt)).toLocaleString(
                        "ko-KR"
                      )}
                      원
                    </S.ProdDetailPriceValue>
                    <br />
                  </S.ProdDetailPayBox>
                ) : prodDetail?.PROD_OPTIONS.indexOf("명함") != -1 ? (
                  <S.ProdDetailPayBox topValue={scrollPositon + 160}>
                    <S.ProdDetailPriceText>인쇄비</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(defaultAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>후가공</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(optionAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>부가세</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(taxAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>총금액</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {(
                        parseInt(optionAmt) +
                        parseInt(defaultAmt) +
                        parseInt(taxAmt)
                      ).toLocaleString("ko-KR")}
                      원
                    </S.ProdDetailPriceValue>
                    <br />
                  </S.ProdDetailPayBox>
                ) : (
                  <S.ProdDetailPayBox>
                    <S.ProdDetailPriceText>인쇄비</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(globalAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>후가공</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(globalOptionAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>부가세</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(globalTax).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>총금액</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {(
                        parseInt(globalAmt) +
                        parseInt(globalOptionAmt) +
                        parseInt(globalTax)
                      ).toLocaleString("ko-KR")}
                      원
                    </S.ProdDetailPriceValue>
                    <br />
                  </S.ProdDetailPayBox>
                )}

                {/* 좌측 날개 */}
                {prodDetail?.PROD_OPTIONS?.indexOf("책자") != -1 ? (
                  <S.ProdDetailPayBox_POP topValue={scrollPositon + 160}>
                    <S.ProdDetailPriceText>표지비</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(bookCoverAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>내지비</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(bookInnerAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>제본비</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(bookBindingAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>코팅비</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(bookCoatingAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>후가공</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(bookOptionAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>부가세</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(taxAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>총금액</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {(parseInt(totalAmt) + parseInt(taxAmt)).toLocaleString(
                        "ko-KR"
                      )}
                      원
                    </S.ProdDetailPriceValue>
                    <br />
                  </S.ProdDetailPayBox_POP>
                ) : prodDetail?.PROD_OPTIONS.indexOf("명함") != -1 ? (
                  <S.ProdDetailPayBox_POP topValue={scrollPositon + 160}>
                    <S.ProdDetailPriceText>인쇄비</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(defaultAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>후가공</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(optionAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>부가세</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(taxAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>총금액</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {(
                        parseInt(optionAmt) +
                        parseInt(defaultAmt) +
                        parseInt(taxAmt)
                      ).toLocaleString("ko-KR")}
                      원
                    </S.ProdDetailPriceValue>
                    <br />
                  </S.ProdDetailPayBox_POP>
                ) : (
                  <S.ProdDetailPayBox_POP topValue={scrollPositon + 160}>
                    <S.ProdDetailPriceText>인쇄비</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(globalAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>후가공</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(globalOptionAmt).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>부가세</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {parseInt(globalTax).toLocaleString("ko-KR")}원
                    </S.ProdDetailPriceValue>
                    <br />
                    <br />
                    <S.ProdDetailPriceText>총금액</S.ProdDetailPriceText>
                    <S.ProdDetailPriceValue>
                      {(
                        parseInt(globalAmt) +
                        parseInt(globalOptionAmt) +
                        parseInt(globalTax)
                      ).toLocaleString("ko-KR")}
                      원
                    </S.ProdDetailPriceValue>
                    <br />
                  </S.ProdDetailPayBox_POP>
                )}

                {/* <Link to="/order"> */}
                <S.ProdDetailPayButton onClick={handleSendCart}>
                  장바구니에 담기
                </S.ProdDetailPayButton>
                {/* </Link> */}
              </S.ProdDetailRight>
            </S.ProdDetailBox>
          </S.ProdDetailWrapper>
        </S.MainSection>
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
