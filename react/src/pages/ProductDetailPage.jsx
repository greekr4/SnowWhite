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
  const [reviewDatas, setReviewDatas] = useState([]);
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
        setQty(res.data.PROD_QUANTITY.split(",")[0]);
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
    setReviewDatas(
      (
        await axios.post(process.env.REACT_APP_DB_HOST + "/api/review", {
          prod_sid: prod_sid,
        })
      ).data
    );
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
      alert("디자인을 확인 해 주세요.");
      return false;
    }

    const PROD_SID = prodDetail.PROD_SID;
    const ITEM_OPTION = JSON.stringify(seletedOptions);
    const ITEM_QUANTITY = qty;
    const ITEM_AMOUNT = prodPrice;
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
      alert("장바구니에 추가 되었습니다.");
    }
  };

  const handleUploadDesign = () => {
    if (USER_ID === undefined) {
      openPopup(0);
      return false;
    }
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "pdf/*");
    input.click();
    input.addEventListener("change", async () => {
      const file = input.files[0];
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
        alert("디자인이 등록되었습니다.");
        setDesignFile(designUrl);
        setDesignCheck(true);
      } catch (error) {
        console.log("실패");
      }
    });
  };

  return (
    <>
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
                            {prodDetail?.PROD_QUANTITY?.split(",").map(
                              (el, index) => (
                                <li
                                  onClick={() => {
                                    handleDropdown(el);
                                  }}
                                >
                                  {el}
                                </li>
                              )
                            )}
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
                  <S.ProdDetailPriceText>가격</S.ProdDetailPriceText>
                  <S.ProdDetailPriceValue>
                    {Math.round(prodPrice).toLocaleString("ko-KR")}원
                  </S.ProdDetailPriceValue>
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
            <ReviewBoard reviewDatas={reviewDatas} />
          </S.ProductReviewWrapper>
        </S.MainSection>
      </S.MainLayout>
    </>
  );
};

export default ProductDetailPage;
