import Slider from "react-slick";
import * as S from "../styles/new_styles";
import snow0 from "../assets/snow0.png";
import OptionItem from "../components/options/OptionItem";
import { useEffect, useRef, useState } from "react";
import { useSpring } from "react-spring";
import ReviewBoard from "../components/products/ReviewBoard";
import TabBar from "../components/products/TabBar";
import { Link, Navigate, useParams } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

const TestOptions = [
  { OptionName: "규격", OptionValue: ["90x50", "86x52"] },
  {
    OptionName: "용지",
    OptionValue: [
      "소프트",
      "프리미엄 소프트",
      "프리미엄 매트",
      "오리지널",
      "럭스",
      "리넨",
      "펠트",
      "펄",
      "크라프트",
      "투명",
      "매트블랙",
      "리사이클",
    ],
  },
  {
    OptionName: "용지 두께",
    OptionValue: ["보통", "두꺼움"],
  },
  {
    OptionName: "색도",
    OptionValue: ["양면컬러 4도", "단면컬러 4도"],
  },
  {
    OptionName: "효과",
    OptionValue: ["효과 없음", "박", "형압"],
  },
  { OptionName: "귀도리", OptionValue: ["직각 모서리", "둥근 모서리"] },
  { OptionName: "테스트 옵션", OptionValue: ["옵션 테스트", "옵션 테스트"] },
  { OptionName: "테스트 옵션", OptionValue: ["옵션 테스트", "옵션 테스트"] },
];

const imageContext = require.context(
  "../assets/products/detail",
  false,
  /\.(jpg)$/
);
const imagePaths = imageContext.keys().map(imageContext);

////////////////////////////////////////

const ProductDetailPage = () => {
  const [qty, setQty] = useState(50);
  const [scrollPositon, setScrollPosition] = useState(0);
  const [imgPath, SetImgPath] = useState(imagePaths[0]);
  const [SliderIndex, SetSliderIndex] = useState(0);
  const DtailBox = useRef(null);
  const DropDown = useRef(null);

  const { prod_sid } = useParams();
  const [prodDetail, setProdDetail] = useState();
  const [prodImages, setProdImages] = useState([]);
  const [prodOptions, setProdOptions] = useState([]);
  const [prodPrice, setProdPrice] = useState(0);

  const [seletedOptions, setSeletedOptions] = useState([]);

  useEffect(() => {
    axios
      .post("/api/product/detail", { prod_sid: prod_sid })
      .then((res) => {
        console.log(res);
        setProdDetail(res.data);
        setProdPrice(Math.round(res.data.PROD_PRICE));
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post("/api/product/images", { prod_sid: prod_sid })
      .then((res) => {
        console.log(res);
        setProdImages(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post("/api/product/options", { prod_sid: prod_sid })
      .then((res) => {
        const groupedData = {};
        res.data.forEach((option) => {
          const category = option.OPTION_CATE;
          if (!groupedData[category]) {
            groupedData[category] = {
              TITLE: category,
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
  }, [prod_sid]);

  useEffect(() => {
    // 초기 옵션 값 설정 (첫번째로)
    const seletedset = [];
    prodOptions.forEach((e, index) => {
      seletedset[index] = {
        TITLE: e.TITLE,
        OPTION_SID: e.OPTION[0].OPTION_SID,
        OPTION_PRICE: e.OPTION[0].OPTION_PRICE,
        OPTION_NM: e.OPTION[0].OPTION_NM,
        OPTION_DETAIL: e.OPTION[0].OPTION_DETAIL,
      };
    });
    setSeletedOptions(seletedset);
  }, [prodOptions]);

  useEffect(() => {
    //가격 초기 세팅
    const copy_seletedOptions = seletedOptions;
    let total_price = 0;
    copy_seletedOptions.map((el) => {
      console.log(el.OPTION_PRICE);
      total_price += parseFloat(el.OPTION_PRICE);
    });
    setProdPrice(parseFloat(prodDetail?.PROD_PRICE) + total_price);
  }, [seletedOptions]);

  const calcPrice = () => {
    // 옵션별로 가격 세팅
    const copy_seletedOptions = seletedOptions;
    let total_price = 0;
    copy_seletedOptions.map((el) => {
      console.log(el.OPTION_PRICE);
      total_price += parseFloat(el.OPTION_PRICE);
    });
    setProdPrice(parseFloat(prodDetail?.PROD_PRICE) + total_price);
  };

  const navigate = useNavigate();

  const handleDropdown = (value) => {
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
      SetSliderIndex(imagePaths.length - 1);
    }
  };

  const handleNextClick = () => {
    if (SliderIndex < imagePaths.length - 1) {
      SetSliderIndex(SliderIndex + 1);
    } else {
      SetSliderIndex(0);
    }
  };

  return (
    <S.MainLayout>
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
                {prodOptions?.map((options, index) => (
                  <OptionItem
                    Options={options}
                    seletedOptions={seletedOptions}
                    setSeletedOptions={setSeletedOptions}
                    calcPrice={calcPrice}
                  />
                ))}
                {/* 수량 */}
                <S.Product_Detail_Option_ItemBox>
                  <S.Product_Detail_Option_ItemText>
                    수량
                  </S.Product_Detail_Option_ItemText>
                  <S.Product_Detail_Option_ButtonBox>
                    <div className="container">
                      <input id="dropdown" type="checkbox" ref={DropDown} />
                      <label className="dropdownLabel" for="dropdown">
                        <div>{qty}</div>
                        <FaAngleDown className="caretIcon" />
                      </label>
                      <div className="content">
                        <ul>
                          <li
                            onClick={() => {
                              handleDropdown(50);
                            }}
                          >
                            50
                          </li>
                          <li
                            onClick={() => {
                              handleDropdown(100);
                            }}
                          >
                            100
                          </li>
                          <li
                            onClick={() => {
                              handleDropdown(150);
                            }}
                          >
                            150
                          </li>
                          <li
                            onClick={() => {
                              handleDropdown(200);
                            }}
                          >
                            200
                          </li>
                          <li
                            onClick={() => {
                              handleDropdown(400);
                            }}
                          >
                            400
                          </li>
                          <li
                            onClick={() => {
                              handleDropdown(800);
                            }}
                          >
                            800
                          </li>
                          <li
                            onClick={() => {
                              handleDropdown(1200);
                            }}
                          >
                            1200
                          </li>
                        </ul>
                      </div>
                    </div>
                  </S.Product_Detail_Option_ButtonBox>
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
                >
                  직접 디자인하기
                </S.Btn>
                <S.Btn
                  width="45%"
                  onClick={() => {
                    alert("준비 중입니다.");
                  }}
                >
                  파일 업로드
                </S.Btn>
              </S.ProdDetailDesignBtns>
              <S.ProdDetailPayBox>
                <S.ProdDetailPriceText>가격</S.ProdDetailPriceText>
                <S.ProdDetailPriceValue>
                  {Math.round(prodPrice).toLocaleString("ko-KR")}원
                </S.ProdDetailPriceValue>
              </S.ProdDetailPayBox>
              <Link to="/order">
                <S.ProdDetailPayButton>주문하기</S.ProdDetailPayButton>
              </Link>
            </S.ProdDetailRight>
          </S.ProdDetailBox>
        </S.ProdDetailWrapper>
      </S.MainSection>
      <S.MainSection bgc="#f9fafc">
        <S.ProdDetailContentWrapper>
          <TabBar />
        </S.ProdDetailContentWrapper>
      </S.MainSection>
      <S.MainSection>
        <S.ProductReviewWrapper>
          <h1>고객 리뷰</h1>
          <ReviewBoard></ReviewBoard>
        </S.ProductReviewWrapper>
      </S.MainSection>
    </S.MainLayout>
  );
};

export default ProductDetailPage;
