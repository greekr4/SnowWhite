import Slider from "react-slick";
import * as S from "../styles/styles";
import snow0 from "../assets/snow0.png";
import OptionItem from "../components/options/OptionItem";

const SliderSetting = {
  dots: true,
  Infinity: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const TestOptions = [
  { OptionName: "규격", OptionValue: ["90x50", "86x52"] },
  {
    OptionName: "용지",
    OptionValue: ["250g 스노우", "240g 랑데뷰", "230g 아르떼"],
  },
  {
    OptionName: "색도",
    OptionValue: ["양면컬러 4도", "단면컬러 4도"],
  },
];

const ProductDetailPage = () => {
  return (
    <S.PageWrap>
      <S.Product_Detail_Section>
        <S.Product_Detail_Box>
          <S.Product_Detail_Img_Wrap>
            <S.Product_Detail_SliderBox>
              <Slider {...SliderSetting} height="300px">
                <S.Product_Detail_SliderImgBox>
                  <S.Product_Detail_SliderImg
                    src={snow0}
                  ></S.Product_Detail_SliderImg>
                </S.Product_Detail_SliderImgBox>
                <S.Product_Detail_SliderImgBox>
                  <S.Product_Detail_SliderImg
                    src={snow0}
                  ></S.Product_Detail_SliderImg>
                </S.Product_Detail_SliderImgBox>
                <S.Product_Detail_SliderImgBox>
                  <S.Product_Detail_SliderImg
                    src={snow0}
                  ></S.Product_Detail_SliderImg>
                </S.Product_Detail_SliderImgBox>
              </Slider>
            </S.Product_Detail_SliderBox>
          </S.Product_Detail_Img_Wrap>
          <S.Product_Detail_Option_Wrap>
            <S.Product_Detail_Option_Title>명함</S.Product_Detail_Option_Title>

            {TestOptions.map((options, index) => (
              <OptionItem Options={options} />
            ))}
          </S.Product_Detail_Option_Wrap>
        </S.Product_Detail_Box>
      </S.Product_Detail_Section>
    </S.PageWrap>
  );
};

export default ProductDetailPage;
