import * as S from "../../styles/styles";
import user_icon from "../../assets/user_icon.svg";
import cart_icon from "../../assets/cart_icon.svg";
import global_icon from "../../assets/global_icon.svg";
import logo_sample from "../../assets/logo_sample.png";
import { useEffect, useState } from "react";
import snow0 from "../../assets/snow0.png";
import snow1 from "../../assets/snow1.png";
import snow2 from "../../assets/snow2.png";

const Header2 = ({ openPopup }) => {
  const [scrollPositon, setScrollPosition] = useState(0);
  const [hide, setHide] = useState({
    menu1: false,
    menu2: false,
    menu3: false,
  });

  const mouseEvent = (menuName, bool) => {
    const change = { menu1: false, menu2: false, menu3: false };
    change[menuName] = bool;
    setHide(change);
    console.log(change);
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

  return (
    <>
      <S.Hd2_wrap>
        <S.Hd2_noti className={scrollPositon < 100 ? "show" : "hide"}>
          <S.Hd2_noti_span>공지사항</S.Hd2_noti_span>
        </S.Hd2_noti>
        <S.Hd2_nav className={scrollPositon < 100 ? "show" : "hide"}>
          <S.Hd2_nav_container>
            <S.Hd2_nav_logo_img src={logo_sample} />
            <S.Hd2_nav_menu_box>
              <S.Hd2_nav_menu_ul>
                <S.Hd2_nav_menu_li
                  onMouseEnter={() => mouseEvent("menu1", true)}
                  onMouseLeave={() => mouseEvent("menu1", false)}
                >
                  <S.Hd2_nav_menu_a>스노우플래닛</S.Hd2_nav_menu_a>
                  <S.Hd2_sub_menu_content
                    className={hide["menu1"] ? "show" : "hide"}
                  >
                    <S.Hd2_sub_menu_container>
                      <S.Hd2_sub_menu_about_box>
                        <S.Hd2_sub_menu_about_title>
                          회사 소개
                        </S.Hd2_sub_menu_about_title>
                        <S.Hd2_sub_menu_about_imgbox>
                          <S.Hd2_sub_menu_about_img src={snow0} />
                        </S.Hd2_sub_menu_about_imgbox>
                      </S.Hd2_sub_menu_about_box>
                      <S.Hd2_sub_menu_about_box>
                        <S.Hd2_sub_menu_about_title>
                          주요연혁
                        </S.Hd2_sub_menu_about_title>
                        <S.Hd2_sub_menu_about_imgbox>
                          <S.Hd2_sub_menu_about_img src={snow1} />
                        </S.Hd2_sub_menu_about_imgbox>
                      </S.Hd2_sub_menu_about_box>
                      <S.Hd2_sub_menu_about_box>
                        <S.Hd2_sub_menu_about_title>
                          사업영역
                        </S.Hd2_sub_menu_about_title>
                        <S.Hd2_sub_menu_about_imgbox>
                          <S.Hd2_sub_menu_about_img src={snow2} />
                        </S.Hd2_sub_menu_about_imgbox>
                      </S.Hd2_sub_menu_about_box>
                      <S.Hd2_sub_menu_about_box>
                        <S.Hd2_sub_menu_about_title>
                          오시는길
                        </S.Hd2_sub_menu_about_title>
                        <S.Hd2_sub_menu_about_imgbox>
                          <S.Hd2_sub_menu_about_img src={snow1} />
                        </S.Hd2_sub_menu_about_imgbox>
                      </S.Hd2_sub_menu_about_box>
                    </S.Hd2_sub_menu_container>
                  </S.Hd2_sub_menu_content>
                </S.Hd2_nav_menu_li>
                <S.Hd2_nav_menu_li
                  onMouseEnter={() => mouseEvent("menu2", true)}
                  onMouseLeave={() => mouseEvent("menu2", false)}
                >
                  <S.Hd2_nav_menu_a href="/">상품 메뉴</S.Hd2_nav_menu_a>
                  <S.Hd2_sub_menu_content
                    className={hide["menu2"] ? "show" : "hide"}
                  >
                    <S.Hd2_sub_menu_container_prod>
                      <S.Hd2_sub_menu_prod_cate_box>
                        <S.Hd2_sub_menu_prod_cate_main>
                          메뉴1
                        </S.Hd2_sub_menu_prod_cate_main>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                      </S.Hd2_sub_menu_prod_cate_box>
                      <S.Hd2_sub_menu_prod_cate_box>
                        <S.Hd2_sub_menu_prod_cate_main>
                          메뉴1
                        </S.Hd2_sub_menu_prod_cate_main>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                      </S.Hd2_sub_menu_prod_cate_box>
                      <S.Hd2_sub_menu_prod_cate_box>
                        <S.Hd2_sub_menu_prod_cate_main>
                          메뉴1
                        </S.Hd2_sub_menu_prod_cate_main>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                      </S.Hd2_sub_menu_prod_cate_box>
                      <S.Hd2_sub_menu_prod_cate_box>
                        <S.Hd2_sub_menu_prod_cate_main>
                          메뉴1
                        </S.Hd2_sub_menu_prod_cate_main>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                      </S.Hd2_sub_menu_prod_cate_box>
                      <S.Hd2_sub_menu_prod_cate_box>
                        <S.Hd2_sub_menu_prod_cate_main>
                          메뉴1
                        </S.Hd2_sub_menu_prod_cate_main>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                      </S.Hd2_sub_menu_prod_cate_box>
                      <S.Hd2_sub_menu_prod_cate_box>
                        <S.Hd2_sub_menu_prod_cate_main>
                          메뉴1
                        </S.Hd2_sub_menu_prod_cate_main>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                      </S.Hd2_sub_menu_prod_cate_box>
                      <S.Hd2_sub_menu_prod_cate_box>
                        <S.Hd2_sub_menu_prod_cate_main>
                          메뉴1123123123
                        </S.Hd2_sub_menu_prod_cate_main>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2123123
                        </S.Hd2_sub_menu_prod_cate_sub>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2123123
                        </S.Hd2_sub_menu_prod_cate_sub>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2123123123
                        </S.Hd2_sub_menu_prod_cate_sub>
                      </S.Hd2_sub_menu_prod_cate_box>
                      <S.Hd2_sub_menu_prod_cate_box>
                        <S.Hd2_sub_menu_prod_cate_main>
                          메뉴1
                        </S.Hd2_sub_menu_prod_cate_main>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                        <S.Hd2_sub_menu_prod_cate_sub>
                          메뉴2
                        </S.Hd2_sub_menu_prod_cate_sub>
                      </S.Hd2_sub_menu_prod_cate_box>
                    </S.Hd2_sub_menu_container_prod>
                  </S.Hd2_sub_menu_content>
                </S.Hd2_nav_menu_li>
                <S.Hd2_nav_menu_li
                  onMouseEnter={() => mouseEvent("menu3", true)}
                  onMouseLeave={() => mouseEvent("menu3", false)}
                >
                  <S.Hd2_nav_menu_a>고객 지원</S.Hd2_nav_menu_a>
                  <S.Hd2_sub_menu_content
                    className={hide["menu3"] ? "show" : "hide"}
                  >
                    <S.Hd2_sub_menu_container>
                      <S.Hd2_sub_menu_about_box>
                        <S.Hd2_sub_menu_about_title>
                          맞춤상담
                        </S.Hd2_sub_menu_about_title>
                        <S.Hd2_sub_menu_about_imgbox>
                          <S.Hd2_sub_menu_about_img src={snow2} />
                        </S.Hd2_sub_menu_about_imgbox>
                      </S.Hd2_sub_menu_about_box>
                      <S.Hd2_sub_menu_about_box>
                        <S.Hd2_sub_menu_about_title>
                          FAQ
                        </S.Hd2_sub_menu_about_title>
                        <S.Hd2_sub_menu_about_imgbox>
                          <S.Hd2_sub_menu_about_img src={snow0} />
                        </S.Hd2_sub_menu_about_imgbox>
                      </S.Hd2_sub_menu_about_box>
                      <S.Hd2_sub_menu_about_box>
                        <S.Hd2_sub_menu_about_title>
                          공지사항
                        </S.Hd2_sub_menu_about_title>
                        <S.Hd2_sub_menu_about_imgbox>
                          <S.Hd2_sub_menu_about_img src={snow1} />
                        </S.Hd2_sub_menu_about_imgbox>
                      </S.Hd2_sub_menu_about_box>
                      <S.Hd2_sub_menu_about_box>
                        <S.Hd2_sub_menu_about_title>
                          이용안내
                        </S.Hd2_sub_menu_about_title>
                        <S.Hd2_sub_menu_about_imgbox>
                          <S.Hd2_sub_menu_about_img src={snow0} />
                        </S.Hd2_sub_menu_about_imgbox>
                      </S.Hd2_sub_menu_about_box>
                    </S.Hd2_sub_menu_container>
                  </S.Hd2_sub_menu_content>
                </S.Hd2_nav_menu_li>
                <S.Hd2_nav_menu_li>
                  <S.Hd2_nav_menu_a>포트폴리오</S.Hd2_nav_menu_a>
                </S.Hd2_nav_menu_li>
                <S.Hd2_nav_menu_li>
                  <S.Hd2_nav_menu_a>견적문의</S.Hd2_nav_menu_a>
                </S.Hd2_nav_menu_li>
                <S.Hd2_nav_menu_li>
                  <S.Hd2_nav_menu_a
                    onClick={() => {
                      openPopup(0);
                    }}
                  >
                    <S.Hd2_nav_menu_img src={user_icon} />
                  </S.Hd2_nav_menu_a>
                </S.Hd2_nav_menu_li>
                <S.Hd2_nav_menu_li>
                  <S.Hd2_nav_menu_a>
                    <S.Hd2_nav_menu_img src={cart_icon} />
                  </S.Hd2_nav_menu_a>
                </S.Hd2_nav_menu_li>
                <S.Hd2_nav_menu_li>
                  <S.Hd2_nav_menu_a>
                    <S.Hd2_nav_menu_img src={global_icon} />
                  </S.Hd2_nav_menu_a>
                </S.Hd2_nav_menu_li>
              </S.Hd2_nav_menu_ul>
            </S.Hd2_nav_menu_box>
          </S.Hd2_nav_container>
        </S.Hd2_nav>
      </S.Hd2_wrap>
    </>
  );
};

export default Header2;
