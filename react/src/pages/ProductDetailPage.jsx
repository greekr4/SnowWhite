import Slider from "react-slick";
import * as S from "../styles/new_styles";
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

const imageContext = require.context(
  "../assets/products/detail",
  false,
  /\.(jpg)$/
);
const imagePaths = imageContext.keys().map(imageContext);

const ProductDetailPage = () => {
  return (
    //         {TestOptions.map((options, index) => (
    //           <OptionItem Options={options} />
    //         ))}

    <S.MainLayout>
      <S.MainSection>
        <S.ProdDetailWrapper>
          <S.ProdDetailBox>
            <S.ProdDetailLeft>
              <S.ProdDetailSliderBox>
                <S.ProdDetailMainSlider>
                  <S.ProdDetailMainSliderView img={imagePaths[0]} />
                  <S.ProdDetailSliderPrev />
                  <S.ProdDetailSliderNext />
                </S.ProdDetailMainSlider>
                <S.ProdDetailSubSlider>
                  <S.ProdDetailSubSliderView img={imagePaths[1]} />
                  <S.ProdDetailSubSliderView img={imagePaths[2]} />
                  <S.ProdDetailSubSliderView
                    img={imagePaths[0]}
                    className="selected"
                  />
                  <S.ProdDetailSubSliderView img={imagePaths[1]} />
                  <S.ProdDetailSubSliderView img={imagePaths[2]} />
                </S.ProdDetailSubSlider>
              </S.ProdDetailSliderBox>
            </S.ProdDetailLeft>
            <S.ProdDetailRight>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
              <div>dd</div>
            </S.ProdDetailRight>
          </S.ProdDetailBox>
        </S.ProdDetailWrapper>
      </S.MainSection>
    </S.MainLayout>
  );
};

export default ProductDetailPage;
