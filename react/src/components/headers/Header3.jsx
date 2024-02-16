import * as S from "../../styles/new_styles";
import logo_sample from "../../assets/logo_sample.png";
import GnbSubMenu from "../gnbs/GnbSubMenu";
import { useState } from "react";
import bannerBg from "../../assets/header_banner.png";

const Header3 = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <S.HeaderLayout>
      {/* 배너 */}
      <S.HeaderBannerWrapper img={bannerBg}>
        <S.HeaderBannerBox></S.HeaderBannerBox>
      </S.HeaderBannerWrapper>

      {/* gnb */}
      <S.HeaderGnbWrapper>
        <button
          onClick={() => {
            setIsVisible(true);
          }}
        >
          test
        </button>
        <button
          onClick={() => {
            setIsVisible(false);
          }}
        >
          test2
        </button>
        <S.HeaderGnbRows>
          <S.HeaderLogoBox img={logo_sample} />
          <S.HeaderMenuList>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>명함</S.HeaderMenuText>
              <GnbSubMenu isVisible={isVisible} />
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>책자</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>스티커</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>현수막</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>캘린더</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>박스</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>쇼핑백</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>시험지</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>봉투</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>고객센터</S.HeaderMenuText>
            </S.HeaderMenuItem>
          </S.HeaderMenuList>
          <S.HeaderMenuList>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>로그인</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>회원가입</S.HeaderMenuText>
            </S.HeaderMenuItem>
          </S.HeaderMenuList>
        </S.HeaderGnbRows>
      </S.HeaderGnbWrapper>
    </S.HeaderLayout>
  );
};

export default Header3;
