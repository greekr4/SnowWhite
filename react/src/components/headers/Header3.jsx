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

  const [menuShow, setMenuShow] = useState({
    menu1: false,
    menu2: false,
    menu3: false,
    menu4: false,
    menu5: false,
    menu6: false,
    menu7: false,
    menu8: false,
    service: false,
    mymenu: false,
  });

  const handleOverMenu = (menu) => {
    setMenuShow({
      ...Object.fromEntries(Object.keys(menuShow).map((key) => [key, false])),
      [menu]: true,
    });
  };

  const handleLeaveMenu = (menu) => {
    setMenuShow({
      ...Object.fromEntries(Object.keys(menuShow).map((key) => [key, false])),
    });
  };

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
    submenu1: [
      { name: "일반 명함", link: "/products/detail" },
      { name: "고급 명함", link: "/products/detail" },
    ],
    submenu2: [
      { name: "정기간행물", link: "/products/detail" },
      { name: "보고서/자료집", link: "/products/detail" },
      { name: "제안서", link: "/products/detail" },
      { name: "출판도서", link: "/products/detail" },
      { name: "회사소개서", link: "/products/detail" },
      { name: "교재", link: "/products/detail" },
      { name: "작품집", link: "/products/detail" },
      { name: "카다로그/브로슈어", link: "/products/detail" },
      // "정기간행물",
      // "보고서/자료집",
      // "제안서",
      // "출판도서",
      // "회사소개서",
      // "교재",
      // "작품집",
      // "화보집/팬북",
      // "노트",
      // "카다로그/브로슈어",
      // "사보",
      // "학급문집",
      // "소식지",
      // "지명원",
    ],
    submenu3: [
      { name: "일반 스티커", link: "/products/detail" },
      { name: "고급 스티커", link: "/products/detail" },
    ],
    submenu4: [{ name: "현수막", link: "/products/detail" }],
    submenu5: [
      { name: "캘린더", link: "/products/detail" },
      { name: "고급 캘린더", link: "/products/detail" },
    ],
    submenu6: [
      { name: "박스", link: "/products/detail" },
      { name: "대형 박스", link: "/products/detail" },
    ],
    submenu7: [{ name: "시험지", link: "/products/detail" }],
    submenu8: [{ name: "봉투", link: "/products/detail" }],
    service: [
      { name: "공지사항", link: "/notice" },
      { name: "장바구니", link: "/cart" },
      { name: "주문 내역", link: "/orderlist" },
    ],
    mymenu: [
      { name: "마이페이지", link: "/mypage" },
      { name: "장바구니", link: "/cart" },
      { name: "주문 내역", link: "/orderlist" },
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
                  handleOverMenu("menu1");
                }}
                onMouseLeave={() => {
                  handleLeaveMenu("menu1");
                }}
              >
                <S.HeaderMenuText>명함</S.HeaderMenuText>
                <GnbSubMenu
                  isVisible={menuShow.menu1}
                  submenus={submenus.submenu1}
                />
              </S.HeaderMenuItem>
            </Link>
            <S.HeaderMenuItem
              onMouseOver={() => {
                handleOverMenu("menu2");
              }}
              onMouseLeave={() => {
                handleLeaveMenu("menu2");
              }}
            >
              <S.HeaderMenuText>책자</S.HeaderMenuText>
              <GnbSubMenu
                isVisible={menuShow.menu2}
                submenus={submenus.submenu2}
              />
            </S.HeaderMenuItem>
            <S.HeaderMenuItem
              onMouseOver={() => {
                handleOverMenu("menu3");
              }}
              onMouseLeave={() => {
                handleLeaveMenu("menu3");
              }}
            >
              <Link to="/products">
                <S.HeaderMenuText>스티커</S.HeaderMenuText>
                <GnbSubMenu
                  isVisible={menuShow.menu3}
                  submenus={submenus.submenu3}
                />
              </Link>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem
              onMouseOver={() => {
                handleOverMenu("menu4");
              }}
              onMouseLeave={() => {
                handleLeaveMenu("menu4");
              }}
            >
              <Link to="/products">
                <S.HeaderMenuText>현수막</S.HeaderMenuText>
                <GnbSubMenu
                  isVisible={menuShow.menu4}
                  submenus={submenus.submenu4}
                />
              </Link>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem
              onMouseOver={() => {
                handleOverMenu("menu5");
              }}
              onMouseLeave={() => {
                handleLeaveMenu("menu5");
              }}
            >
              <Link to="/products">
                <S.HeaderMenuText>캘린더</S.HeaderMenuText>
                <GnbSubMenu
                  isVisible={menuShow.menu5}
                  submenus={submenus.submenu5}
                />
              </Link>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem
              onMouseOver={() => {
                handleOverMenu("menu6");
              }}
              onMouseLeave={() => {
                handleLeaveMenu("menu6");
              }}
            >
              <Link to="/products">
                <S.HeaderMenuText>박스</S.HeaderMenuText>
                <GnbSubMenu
                  isVisible={menuShow.menu6}
                  submenus={submenus.submenu6}
                />
              </Link>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem
              onMouseOver={() => {
                handleOverMenu("menu7");
              }}
              onMouseLeave={() => {
                handleLeaveMenu("menu7");
              }}
            >
              <Link to="/products">
                <S.HeaderMenuText>시험지</S.HeaderMenuText>
                <GnbSubMenu
                  isVisible={menuShow.menu7}
                  submenus={submenus.submenu7}
                />
              </Link>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem
              onMouseOver={() => {
                handleOverMenu("menu8");
              }}
              onMouseLeave={() => {
                handleLeaveMenu("menu8");
              }}
            >
              <Link to="/products">
                <S.HeaderMenuText>봉투</S.HeaderMenuText>
                <GnbSubMenu
                  isVisible={menuShow.menu8}
                  submenus={submenus.submenu8}
                />
              </Link>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem
              onMouseOver={() => {
                handleOverMenu("service");
              }}
              onMouseLeave={() => {
                handleLeaveMenu("service");
              }}
            >
              <Link to={"/notice"}>
                <S.HeaderMenuText>고객센터</S.HeaderMenuText>
                <GnbSubMenu
                  isVisible={menuShow.service}
                  submenus={submenus.service}
                />
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
            <S.HeaderMenuItem
              onMouseOver={() => {
                handleOverMenu("mymenu");
              }}
              onMouseLeave={() => {
                handleLeaveMenu("mymenu");
              }}
            >
              <Link to={"/mypage"}>
                <S.HeaderMenuText>Mypage</S.HeaderMenuText>
                <GnbSubMenu
                  isVisible={menuShow.mymenu}
                  submenus={submenus.mymenu}
                />
              </Link>
            </S.HeaderMenuItem>
          </S.HeaderMenuList>
        </S.HeaderGnbRows>
      </S.HeaderGnbWrapper>
    </S.HeaderLayout>
  );
};

export default Header3;
