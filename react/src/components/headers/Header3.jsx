import * as S from "../../styles/new_styles";
import logo_sample from "../../assets/logo_sample.png";
import GnbSubMenu from "../gnbs/GnbSubMenu";
import { useEffect, useState } from "react";
import bannerBg from "../../assets/header_banner.png";
import { Link } from "react-router-dom";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { LoginCheck } from "../../hooks/User";
import { Cookies } from "react-cookie";
import useAxios from "axios-hooks";
import axios from "axios";

const Header3 = ({ openPopup, queryClient }) => {
  const cookies = new Cookies();
  const [scrollPositon, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [menuShow, setMenuShow] = useState({ mymenu: false });

  const [Cate, SetCate] = useState();

  const { data } = useQuery("userinfo", { enabled: false });
  const userNm = data?.USER_NM;

  useEffect(() => {
    axios.post("/api/cate").then((res) => {
      const groupedCategories =
        res.data &&
        res.data.reduce((result, category) => {
          if (category.CATE_PID === null) {
            // 대카테고리인 경우
            result.push({
              ...category,
              subCate: [],
            });
          } else {
            // 하위 카테고리인 경우
            const parentCategory = result.find(
              (parent) => parent.CATE_SID === category.CATE_PID
            );
            if (parentCategory) {
              parentCategory.subCate.push(category);
            }
          }
          return result;
        }, []);

      // 결과 출력
      // console.log(groupedCategories);
      SetCate(groupedCategories);

      //메뉴
      const resultObj = {};
      res.data
        .filter((el) => el.CATE_PID === null)
        .map((el, index) => {
          resultObj[el.CATE_SID] = false;
        });
      setMenuShow({ ...menuShow, ...resultObj });
    });
  }, []);

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
    if (maxheight > 1100 && scrollPositon > 70) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  }, [scrollPositon]);

  const submenus = {
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
            {Cate &&
              Cate.map((el, index) => (
                <Link to={`/products/${el.CATE_SID}`} key={index}>
                  <S.HeaderMenuItem
                    onMouseOver={() => {
                      handleOverMenu(el.CATE_SID);
                    }}
                    onMouseLeave={() => {
                      handleLeaveMenu(el.CATE_SID);
                    }}
                  >
                    <S.HeaderMenuText>{el.CATE_NM}</S.HeaderMenuText>
                    <GnbSubMenu
                      isVisible={menuShow[el.CATE_SID]}
                      submenus={el.subCate}
                    />
                  </S.HeaderMenuItem>
                </Link>
              ))}
          </S.HeaderMenuList>
          <S.HeaderMenuList>
            {userNm ? (
              <>
                <S.HeaderMenuItem
                  onMouseOver={() => {
                    handleOverMenu("mymenu");
                  }}
                  onMouseLeave={() => {
                    handleLeaveMenu("mymenu");
                  }}
                >
                  <Link to={"/mypage"}>
                    <S.HeaderMenuText>{userNm}님</S.HeaderMenuText>
                    <GnbSubMenu
                      isVisible={menuShow.mymenu}
                      submenus={[
                        { CATE_NM: "마이페이지", CATE_LINK: "/mypage" },
                        { CATE_NM: "장바구니", CATE_LINK: "/cart" },
                        { CATE_NM: "주문 내역", CATE_LINK: "/orderlist" },
                      ]}
                    />
                  </Link>
                </S.HeaderMenuItem>
                <S.HeaderMenuItem
                  onClick={() => {
                    cookies.remove("token");
                    cookies.remove("refreshToken");
                    queryClient.setQueryData("userinfo");
                  }}
                >
                  <S.HeaderMenuText>로그아웃</S.HeaderMenuText>
                </S.HeaderMenuItem>
              </>
            ) : (
              <>
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
              </>
            )}
          </S.HeaderMenuList>
        </S.HeaderGnbRows>
      </S.HeaderGnbWrapper>
    </S.HeaderLayout>
  );
};

export default Header3;
