import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import * as S from "../../styles/new_styles";
import axios from "axios";
const MainSlider = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    initdb();
  }, []);

  const initdb = async () => {
    setBanners(
      (
        await axios.get(process.env.REACT_APP_DB_HOST + "/api/banner", {
          params: {
            cate: "MAIN",
          },
        })
      ).data
    );
  };

  console.log(banners);
  const settings = {
    dots: true, // 슬라이더 아래에 슬라이드 개수를 점 형태로 표시
    infinite: true, // 슬라이드가 맨 끝에 도달했을 때 처음 슬라이드를 보여줄지 여부
    slidesToShow: 1, // 화면에 한번에 표시할 슬라이드 개수 설정
    slidesToScroll: 1, // 옆으로 스크롤할 때 보여줄 슬라이드 수 설정
    speed: 500, // 슬라이드 넘길 때 속도
    autoplay: true, // 슬라이드를 자동으로 넘길지 여부
    autoplaySpeed: 7000, // 자동으로 넘길 시 시간 간격
  };

  return (
    <>
      <Slider {...settings}>
        {banners?.map((el, index) => (
          <div key={index}>
            <S.MainBannerBox img={el.BANNER_IMAGE} />
          </div>
        ))}
      </Slider>
    </>
  );
};

export default MainSlider;
