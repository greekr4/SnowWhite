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
  Button,
  ButtonGroup,
  MenuItem,
  Select,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import OptionToggle from "../components/options/OptionToggle";
import {
  CottingPrice,
  CottingPrice2,
  CottingPrice_velvet,
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

    setSelectedPaper(paperData[0].PAPER_NM + paperData[0].PAPER_WEIGHT);

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
    console.log(selOption);

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
    // const ITEM_OPTION = JSON.stringify(seletedOptions);
    const ITEM_OPTION = createOptionNm().join(" | ");
    const ITEM_QUANTITY = qty;
    const ITEM_AMOUNT = parseInt(defaultAmt) + parseInt(optionAmt);
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
      const premium = 1.1;

      amt += Math.round((findedItem["price"] * premium) / 100) * 100;
    }

    //타공
    if (selOption.punching === true) {
      const findedItem = findClosest(PunchingPrice); //단가표
      const premium = 1.1;
      //타공 개수 단가 * 수량 * premium 100의 자리 반올림
      amt +=
        Math.round((findedItem[selOption.punchingQty] * qty * premium) / 100) *
        100;
    }

    //오시_명함
    if (selOption.osi === true) {
      const findedItem = findClosest(OsiNameCardPrice); //단가표
      const premium = 1.1;
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

      const premium = 1.1;
      //타공 개수 단가 * premium 100의 자리 반올림
      const price = Math.round((findedItem["a6"] * qty * premium) / 100) * 100;
      const min_price = 5000;
      const finalPrice = Math.max(price, min_price);

      amt += finalPrice;
    }

    //코팅 명함
    if (selOption.cotting === true) {
      const dan = 3400 - 700;
      const dan_add = 700;
      const yang = 4900 - 1300;
      const yang_add = 1300;

      let price = 0;
      if (selOption.cottingOption.indexOf("dan") != -1) {
        price = dan + (dan_add / 100) * qty;
      } else {
        price = yang + (yang_add / 100) * qty;
      }

      const premium = 1.1;
      const finalPrifce = Math.round((price * premium) / 100) * 100;

      amt += finalPrifce;
    }

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

    if (selOption.cotting === true) {
      let cottingNm;
      switch (selOption.cottingOption) {
        case "dan_yes":
          cottingNm = "단면유광코팅";
          break;
        case "dan_no":
          cottingNm = "단면무광코팅";
          break;
        case "yang_yes":
          cottingNm = "양면유광코팅";
          break;
        case "yang_no":
          cottingNm = "양면무광코팅";
          break;
      }
      optionNm.push(`${cottingNm}`);
    }
    return optionNm;
    // alert(optionNm);
    //   {
    //     "earDori": false,
    //     "earDoriOption": "4mm",
    //     "punching": false,
    //     "punchingQty": "cnt1",
    //     "punchingSize": "3mm",
    //     "osi": false,
    //     "osiQty": "line1",
    //     "osiDirect": "가로",
    //     "missing": false,
    //     "missingQty": "line1",
    //     "missingDirect": "가로",
    //     "cotting": false,
    //     "cottingOption": "dan_yes"
    // }
  };

  /**
   * 스낵바
   */

  const [snackbar, setSnackbar] = useState(null);

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
                  <S.Product_Detail_Option_ItemBox>
                    <S.Product_Detail_Option_ItemText>
                      용지
                    </S.Product_Detail_Option_ItemText>
                    <S.OptionBtns>
                      <ToggleButtonGroup
                        color="primary"
                        value={selectedPaper}
                        exclusive
                        onChange={handleChange}
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
                      selOption={selOption}
                      setSelOption={setSelOption}
                      updateOptionAmt={updateOptionAmt}
                    />
                  ))}

                  <S.Product_Detail_Option_ItemBox>
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
                    {/* 
                      <div className="container">
                        <input id="dropdown" type="checkbox" ref={DropDown} />
                        <label className="dropdownLabel" for="dropdown">
                          <div>{qty}</div>
                          <FaAngleDown className="caretIcon" />
                        </label>
                        <div className="content">
                          <ul>
                            {paperQty?.split(",").map((el, index) => (
                              <li
                                onClick={() => {
                                  setQty(el);
                                  setDefaultAmt(paperAmt.split(",")[index]);
                                  DropDown.current.checked = false;
                                }}
                              >
                                {el}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div> */}
                  </S.Product_Detail_Option_ItemBox>
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

                <S.ProdDetailPayBox>
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
                  <S.ProdDetailPriceText>총금액</S.ProdDetailPriceText>
                  <S.ProdDetailPriceValue>
                    {(
                      parseInt(optionAmt) + parseInt(defaultAmt)
                    ).toLocaleString("ko-KR")}
                    원
                  </S.ProdDetailPriceValue>
                  <br />
                </S.ProdDetailPayBox>
                {/* <Link to="/order"> */}
                <S.ProdDetailPayButton onClick={handleSendCart}>
                  장바구니에 담기
                </S.ProdDetailPayButton>
                {/* </Link> */}
              </S.ProdDetailRight>
            </S.ProdDetailBox>
          </S.ProdDetailWrapper>
        </S.MainSection>
        <S.MainSection bgc="#f9fafc">
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
