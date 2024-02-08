import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import snow0 from "../assets/snow0.png";
import snow1 from "../assets/snow1.png";
import snow2 from "../assets/snow2.png";
import * as S from "../styles/styles";

const MainPage = () => {
  const SliderSetting = {
    dots: true,
    Infinity: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const SubSliderSetting = {
    dots: true,
    Infinity: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <>
      <S.MainSection>
        <S.SliderBox height={"600px"}>
          <Slider {...SliderSetting}>
            <S.SliderImgBox>
              <S.SliderImg src={snow0}></S.SliderImg>
            </S.SliderImgBox>
            <S.SliderImgBox>
              <S.SliderImg src={snow1}></S.SliderImg>
            </S.SliderImgBox>
            <S.SliderImgBox>
              <S.SliderImg src={snow2}></S.SliderImg>
            </S.SliderImgBox>
          </Slider>
        </S.SliderBox>
      </S.MainSection>
      <S.MainSection>
        <S.MainInner>
          <S.MainTitle>추천 PICK</S.MainTitle>
          <S.SliderBox height={"500px"}>
            <Slider {...SubSliderSetting}>
              <S.PickSliderBox>
                <S.PickItemBox>
                  <S.PickItemImg img={snow0}></S.PickItemImg>
                  <S.PickItemTextBox>
                    <S.PickItemTitle>대봉투</S.PickItemTitle>
                    <S.PickItemSub>대봉투(A4가 들어가는 서류용)</S.PickItemSub>
                    <S.PickItemRead>Read More</S.PickItemRead>
                  </S.PickItemTextBox>
                </S.PickItemBox>
              </S.PickSliderBox>
              <S.PickSliderBox>
                <S.PickItemBox>
                  <S.PickItemImg img={snow1}></S.PickItemImg>
                  <S.PickItemTextBox>
                    <S.PickItemTitle>정기간행물</S.PickItemTitle>
                    <S.PickItemSub>
                      일정한 목적,사상,감정,지식 등의 간행물
                    </S.PickItemSub>
                    <S.PickItemRead>Read More</S.PickItemRead>
                  </S.PickItemTextBox>
                </S.PickItemBox>
              </S.PickSliderBox>
              <S.PickSliderBox>
                <S.PickItemBox>
                  <S.PickItemImg img={snow2}></S.PickItemImg>
                  <S.PickItemTextBox>
                    <S.PickItemTitle>낱장 스티커</S.PickItemTitle>
                    <S.PickItemSub>
                      상품라벨, 문구용 등으로 활용 가능
                    </S.PickItemSub>
                    <S.PickItemRead>Read More</S.PickItemRead>
                  </S.PickItemTextBox>
                </S.PickItemBox>
              </S.PickSliderBox>
              <S.PickSliderBox>
                <S.PickItemBox>
                  <S.PickItemImg img={snow0}></S.PickItemImg>
                  <S.PickItemTextBox>
                    <S.PickItemTitle>보고서/자료집</S.PickItemTitle>
                    <S.PickItemSub>
                      일정한 목적,사상,감정,지식 등의 간행물
                    </S.PickItemSub>
                    <S.PickItemRead>Read More</S.PickItemRead>
                  </S.PickItemTextBox>
                </S.PickItemBox>
              </S.PickSliderBox>
              <S.PickSliderBox>
                <S.PickItemBox>
                  <S.PickItemImg img={snow1}></S.PickItemImg>
                  <S.PickItemTextBox>
                    <S.PickItemTitle>리플렛</S.PickItemTitle>
                    <S.PickItemSub>
                      책자 형태가 아닌 낱장으로 별도의 제본
                    </S.PickItemSub>
                    <S.PickItemRead>Read More</S.PickItemRead>
                  </S.PickItemTextBox>
                </S.PickItemBox>
              </S.PickSliderBox>
            </Slider>
          </S.SliderBox>
        </S.MainInner>
      </S.MainSection>
      <S.MainSection bgc="#efefef">
        <S.MainInner>
          <S.MainTitle>Why SnowWhite</S.MainTitle>
          <S.WhyItemBox>
            <S.WhyItem>
              <S.WhyItemIcon
                img={
                  "https://www.printn.co.kr/assets/images/main/ico_why01.png"
                }
              ></S.WhyItemIcon>
              <S.WhyItemTitle>EASY ORDERING</S.WhyItemTitle>
              <S.WhyItemSub>견적 확인에서 주문까지 한번에</S.WhyItemSub>
            </S.WhyItem>
            <S.WhyItem>
              <S.WhyItemIcon
                img={
                  "https://www.printn.co.kr/assets/images/main/ico_service01.png"
                }
              ></S.WhyItemIcon>
              <S.WhyItemTitle>HIGH QUALITY</S.WhyItemTitle>
              <S.WhyItemSub>70년이 넘는 인쇄 노하우로 품질 보장</S.WhyItemSub>
            </S.WhyItem>
            <S.WhyItem>
              <S.WhyItemIcon
                img={
                  "https://www.printn.co.kr/assets/images/main/ico_why03.png"
                }
              ></S.WhyItemIcon>
              <S.WhyItemTitle>CUSTOMIZED SERVICE</S.WhyItemTitle>
              <S.WhyItemSub>인쇄 전문가의 맞춤형 솔루션 제공</S.WhyItemSub>
            </S.WhyItem>
          </S.WhyItemBox>
        </S.MainInner>
      </S.MainSection>
      <S.MainSection>
        <S.MainInner>
          <S.MainTitle>주요 서비스</S.MainTitle>
          <S.ServiceItemBox>
            <S.ServiceItem>
              <S.ServiceItemIcon
                img={
                  "https://www.printn.co.kr/assets/images/main/ico_service01.png"
                }
              ></S.ServiceItemIcon>
              <S.ServiceItemTitle>이용안내</S.ServiceItemTitle>
            </S.ServiceItem>
            <S.ServiceItem>
              <S.ServiceItemIcon
                img={
                  "https://www.printn.co.kr/assets/images/main/ico_service02.png"
                }
              ></S.ServiceItemIcon>
              <S.ServiceItemTitle>사업자정보 등록</S.ServiceItemTitle>
            </S.ServiceItem>
            <S.ServiceItem>
              <S.ServiceItemIcon
                img={
                  "https://www.printn.co.kr/assets/images/main/ico_service03.png"
                }
              ></S.ServiceItemIcon>
              <S.ServiceItemTitle>세금계산서 신청</S.ServiceItemTitle>
            </S.ServiceItem>
            <S.ServiceItem>
              <S.ServiceItemIcon
                img={
                  "https://www.printn.co.kr/assets/images/main/ico_service04.png"
                }
              ></S.ServiceItemIcon>
              <S.ServiceItemTitle>맞춤상담</S.ServiceItemTitle>
            </S.ServiceItem>
            <S.ServiceItem>
              <S.ServiceItemIcon
                img={
                  "https://www.printn.co.kr/assets/images/main/ico_service05.png"
                }
              ></S.ServiceItemIcon>
              <S.ServiceItemTitle>파트너사 문의</S.ServiceItemTitle>
            </S.ServiceItem>
          </S.ServiceItemBox>
          <S.BoardItemBox>
            <S.BoardItem>
              <S.BoardItemTopBox>
                <S.BoardItemTopTitle>공지사항</S.BoardItemTopTitle>
                <S.BoardItemTopReadMore>Read More</S.BoardItemTopReadMore>
              </S.BoardItemTopBox>
              <S.BoardItemPostBox>
                <S.BoardItemPostTitle>
                  2024년도 추석연휴 배송안내
                </S.BoardItemPostTitle>
                <S.BoardItemPostDate>2024.01.01</S.BoardItemPostDate>
              </S.BoardItemPostBox>
              <S.BoardItemPostBox>
                <S.BoardItemPostTitle>
                  2024년 설연휴 배송안내
                </S.BoardItemPostTitle>
                <S.BoardItemPostDate>2024.01.01</S.BoardItemPostDate>
              </S.BoardItemPostBox>
            </S.BoardItem>
            <S.BoardItem>
              <S.BoardItemTopBox>
                <S.BoardItemTopTitle>FAQ</S.BoardItemTopTitle>
                <S.BoardItemTopReadMore>Read More</S.BoardItemTopReadMore>
              </S.BoardItemTopBox>
              <S.BoardItemPostBox>
                <S.BoardItemPostTitle>
                  데이터를 별도로 보내고 싶어요.
                </S.BoardItemPostTitle>
                <S.BoardItemPostDate>2024.01.01</S.BoardItemPostDate>
              </S.BoardItemPostBox>
              <S.BoardItemPostBox>
                <S.BoardItemPostTitle>
                  용지(종이)자주하는 질문 모음
                </S.BoardItemPostTitle>
                <S.BoardItemPostDate>2024.01.01</S.BoardItemPostDate>
              </S.BoardItemPostBox>
              <S.BoardItemPostBox>
                <S.BoardItemPostTitle>
                  세금계산서 발급 방법을 알려주세요.
                </S.BoardItemPostTitle>
                <S.BoardItemPostDate>2024.01.01</S.BoardItemPostDate>
              </S.BoardItemPostBox>
            </S.BoardItem>
          </S.BoardItemBox>
        </S.MainInner>
      </S.MainSection>
    </>
  );
};

export default MainPage;
