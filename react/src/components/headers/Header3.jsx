import * as S from "../../styles/new_styles";
import logo_sample from "../../assets/logo_sample.png";
import GnbSubMenu from "../gnbs/GnbSubMenu";
import { useEffect, useState } from "react";
import bannerBg from "../../assets/header_banner.png";
import { Link } from "react-router-dom";

const Header3 = ({ openPopup }) => {
  const [scrollPositon, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
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

  useEffect(() => {
    const maxheight = document.body.offsetHeight;
    console.log(maxheight);
    console.log(scrollPositon);
    if (maxheight > 1300 && scrollPositon > 70) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  }, [scrollPositon]);

  const submenus = {
    submenu1: ["일반 명함", "고급 명함"],
    submenu2: [
      "정기간행물",
      "보고서/자료집",
      "제안서",
      "출판도서",
      "회사소개서",
      "교재",
      "작품집",
      "화보집/팬북",
      "노트",
      "카다로그/브로슈어",
      "사보",
      "학급문집",
      "소식지",
      "지명원",
    ],
  };
  return (
    <S.HeaderLayout>
      {/* 배너 */}
      <S.HeaderBannerWrapper img={bannerBg}>
        <S.HeaderBannerBox></S.HeaderBannerBox>
      </S.HeaderBannerWrapper>
      {/* gnb */}
      <S.HeaderGnbWrapper className={isFixed ? "fix" : ""}>
        <S.HeaderGnbRows>
          <Link to="/">
            <S.HeaderLogoBox img={logo_sample} />
          </Link>
          <S.HeaderMenuList>
            <Link to="/products">
              <S.HeaderMenuItem
                onMouseOver={() => {
                  setIsVisible(true);
                }}
                onMouseLeave={() => {
                  setIsVisible(false);
                }}
              >
                <S.HeaderMenuText>명함</S.HeaderMenuText>
                <GnbSubMenu
                  isVisible={isVisible}
                  submenus={submenus.submenu1}
                />
              </S.HeaderMenuItem>
            </Link>
            <S.HeaderMenuItem
              onMouseOver={() => {
                setIsVisible2(true);
              }}
              onMouseLeave={() => {
                setIsVisible2(false);
              }}
            >
              <S.HeaderMenuText>책자</S.HeaderMenuText>
              <GnbSubMenu isVisible={isVisible2} submenus={submenus.submenu2} />
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <Link to="/products">
                <S.HeaderMenuText>스티커</S.HeaderMenuText>
              </Link>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <Link to="/products">
                <S.HeaderMenuText>현수막</S.HeaderMenuText>
              </Link>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <Link to="/products">
                <S.HeaderMenuText>캘린더</S.HeaderMenuText>
              </Link>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <Link to="/products">
                <S.HeaderMenuText>박스</S.HeaderMenuText>
              </Link>
            </S.HeaderMenuItem>
            {/* <S.HeaderMenuItem>
              <S.HeaderMenuText>쇼핑백</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>시험지</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>봉투</S.HeaderMenuText>
            </S.HeaderMenuItem> */}
            <S.HeaderMenuItem>
              <Link to={"/notice"}>
                <S.HeaderMenuText>고객센터</S.HeaderMenuText>
              </Link>
            </S.HeaderMenuItem>
          </S.HeaderMenuList>
          <S.HeaderMenuList>
            <S.HeaderMenuItem
              onClick={() => {
                openPopup(0);
              }}
            >
              <S.HeaderMenuText>로그인</S.HeaderMenuText>
            </S.HeaderMenuItem>

            <S.HeaderMenuItem>
              <S.HeaderMenuText
                onClick={() => {
                  openPopup(1);
                }}
              >
                회원가입
              </S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <Link to={"/cart"}>
                <S.HeaderMenuText>장바구니</S.HeaderMenuText>
              </Link>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <Link to={"/mypage"}>
                <S.HeaderMenuText>Mypage</S.HeaderMenuText>
              </Link>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <Link to={"/orderlist"}>
                <S.HeaderMenuText>Order</S.HeaderMenuText>
              </Link>
            </S.HeaderMenuItem>
          </S.HeaderMenuList>
        </S.HeaderGnbRows>
      </S.HeaderGnbWrapper>
    </S.HeaderLayout>
  );
};

export default Header3;
