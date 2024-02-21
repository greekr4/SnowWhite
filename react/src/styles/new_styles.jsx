import { animated } from "react-spring";
import styled from "styled-components";

import star from "../assets/icons/star.png";
import star_empty from "../assets/icons/star_empty.png";

/**
 * 공통
 */
export const Btn = styled.button`
  padding: 0 12px;
  line-height: ${(props) => (props.btnHight ? props.btnHight : "32px")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "11px")};
  color: ${(props) => (props.fontColor ? props.fontColor : "#333")};
  text-align: center;
  background-color: ${(props) => (props.btnBgc ? props.btnBgc : "#fff")};
  border: 1px solid ${(props) => (props.borderC ? props.borderC : "#ccc")};
  &:hover {
    background-color: ${(props) =>
      props.btnBgcHover ? props.btnBgcHover : "#fff"};
    border: 1px solid
      ${(props) => (props.borderCHover ? props.borderCHover : "#999")};
  }
`;

/**
 * 헤더
 * Header
 */

export const HeaderLayout = styled.header`
  min-width: 1140px;
`;

export const HeaderBannerWrapper = styled.div`
  width: 100%;
  background: url(${(props) => props.img}) no-repeat center center;
`;
export const HeaderBannerBox = styled.div`
  width: 1140px;
  height: 70px;
  margin: 0 auto;
  cursor: pointer;
`;

export const HeaderGnbWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #eee;
  z-index: 999;
  &.fix {
    position: fixed;
    background: white;
    top: 0;
  }
`;

export const HeaderGnbRows = styled.div`
  width: 1140px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderLogoBox = styled.div`
  display: block;
  width: 100px;
  height: 80px;
  background-image: url(${(props) => (props.img ? props.img : "")});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const HeaderMenuList = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

export const HeaderMenuItem = styled.li`
  width: 70px;
  text-align: center;
`;

export const HeaderMenuText = styled.a`
  cursor: pointer;
  font-family: "Gothic A1", sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  &:hover {
    color: #7070ff;
  }
`;

export const HeaderSubMenuWrapper = styled.div`
  position: absolute;
  z-index: 5;

  &.show {
    display: block;
  }

  &.hide {
    display: none;
  }
`;

export const HeaderSubMenuBox = styled(animated.div)`
  display: block;
  position: relative;
  left: -35px;
  top: 40px;
  width: 150px;
  height: 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-bottom: 3px solid #fff;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
  box-sizing: border-box;
`;

export const HeaderSubMenuCols = styled.ul`
  display: flex;
  flex-direction: column;
`;
export const HeaderSubMenuItem = styled.li`
  position: relative;
  line-height: 1.8rem;
  text-align: left;
`;

export const HeaderSubMenuText = styled.span`
  font-size: 13px;
  cursor: pointer;

  &::before {
    content: "-";
    margin-right: 0.5rem;
  }

  &:hover {
    font-weight: bold;
    color: #7070ff;
  }
`;

export const HeaderSubMenuIcon = styled(animated.div)`
  display: block;
  position: absolute;
  left: 18px;
  top: 0px;
  width: 32px;
  height: 32px;
  background: url(${(props) => props.icon}) no-repeat center center;
  background-size: cover;
  z-index: 6;
`;

/**
 * 푸터
 * Footer
 */

export const FooterLayout = styled.footer`
  min-width: 1140px;
  border-top: 1px solid #eee;
`;

export const FooterContainer = styled.div`
  width: 1140px;
  margin: 0 auto;
  padding: 1.75rem;
`;

export const FooterBtnWrapper = styled.div`
  width: 100%;
  padding-bottom: 1rem;
`;

export const FooterBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FooterBtnList = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;
export const FooterSnsList = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`;

export const FooterBtnItem = styled.li`
  cursor: pointer;
  &::after {
    content: "|";
    margin-left: 1rem;
    margin-right: 1rem;
    color: #ddd;
    font-size: 0.8rem;
  }

  &:last-child::after {
    content: "";
  }
`;

export const FooterBtnText = styled.span`
  font-size: 13px;
  font-weight: 550;
`;

export const FooterSnsItem = styled.li`
  cursor: pointer;
  margin-left: 0.5rem;
`;

export const FooterSnsIcon = styled.span`
  display: block;
  background: url(${(props) => props.icon}) no-repeat center center;
  background-size: cover;
  width: 24px;
  height: 24px;
`;

export const FooterAboutWrapper = styled.div`
  width: 100%;
`;

export const FooterAboutBox = styled.div``;

export const FooterAboutText = styled.span`
  display: block;
  font-size: 12px;
  line-height: 1.3rem;
  color: #333;
`;

export const FooterLicenseLink = styled.a`
  color: #999;
  font-weight: 550;
`;

/**
 * 메인 페이지
 * MainPage
 */

export const MainLayout = styled.div`
  min-width: 1140px;
`;

export const MainSection = styled.section`
  display: block;
  width: 100%;
  background-color: ${(props) => props.bgc};
`;

export const MainBannerBox = styled.div`
  width: 100%;
  height: 500px;
  background-color: #abc;
`;

/**
 * 메인 페이지 - (공통) 상품 아이템
 * MainPage - GlobProdItem
 */

export const GlobProdWrapper = styled.div`
  width: 1140px;
  margin: 0 auto;
  padding: 1.5rem;
`;

export const GlobProdList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const GlobProdItemBox = styled.div`
  flex-basis: 31%;
  margin-bottom: 1.25rem;
  margin-right: 1.25rem;
  box-sizing: border-box;
  transition: 0.125s ease-out;
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }
`;
export const GlobProdItemImgBox = styled.div`
  width: 340px;
  height: 280px;
  background-image: url(${(props) => props.img});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;
export const GlobProdItemTextBox = styled.div`
  padding: 1rem;
`;
export const GlobProdItemTitle = styled.span`
  display: block;
  font-size: 1.25rem;
  padding-bottom: 1rem;
`;
export const GlobProdItemDesc = styled.span`
  display: block;
  font-size: 0.9rem;
  line-height: 1.25rem;
  color: #999;
  padding-bottom: 1.5rem;
  white-space: pre-line;
`;
export const GlobProdItemBtn = styled.span`
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 550;
  color: #2c83e9;
`;

/**
 * 메인 페이지 - 포트폴리오
 * MainPage - Portfolio
 */

export const MainPortfolioWrapper = styled.div`
  width: 1140px;
  margin: 0 auto;
  padding: 3rem;
`;

export const PortfolioTextBox = styled.div`
  margin-bottom: 3rem;
`;

export const PortfolioTitle = styled.span`
  display: block;
  text-align: center;
  font-size: 2rem;
  font-weight: 550;
  color: rgb(44, 131, 233);
`;

export const PortfolioList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const PortfolioItemBox = styled.div`
  flex-basis: 19%;
  margin-bottom: 1.25rem;
  box-sizing: border-box;
  transition: 0.125s ease-out;
  cursor: pointer;
  &:hover {
    /* box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2); */
    transform: scale(0.95);
  }
`;

export const PortfolioItemImgBox = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.img});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

/**
 * 메인 페이지 - 하단 배너
 *
 */

export const MainBottomBannerBox = styled.div`
  width: 100%;
  height: 340px;
  background: url(${(props) => props.img}) no-repeat center center;
`;

/**
 * 팝업
 *
 */

export const Pop_overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 500vh;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  &.hide {
    display: none;
  }
`;

export const Pop_Container = styled.div`
  position: fixed;

  left: calc(
    50% -
      ${(props) => (props.widthValue ? props.widthValue / 2 + "px" : "250px")}
  );
  top: calc(
    50% -
      ${(props) => (props.heightValue ? props.heightValue / 2 + "px" : "250px")}
  );
  width: ${(props) => (props.widthValue ? props.widthValue + "px" : "200px")};
  min-height: ${(props) =>
    props.heightValue ? props.heightValue + "px" : "200px"};
  background-color: #fff;
`;

export const Pop_Title = styled.div`
  text-align: center;
  font-size: 2.2rem;
  font-weight: 600;
  font-family: "Gothic A1", sans-serif;
  padding: 10px;
`;

export const Pop_form = styled.div`
  padding: 40px;
`;

export const Pop_Label = styled.div`
  float: left;
`;
export const Pop_Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 0;
  line-height: 50px;
  font-size: 14px;
  color: #191919;
  border: 0;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;

  &:focus {
    border-bottom: 1px solid #191919;
  }

  &:focus-visible {
    outline: none;
  }

  &::placeholder {
    font-size: 1rem;
    color: #acacac;
  }
`;

export const Pop_Remeber = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const Pop_Check = styled.div`
  cursor: pointer;
  display: block;
  position: relative;
  outline: 0;
  line-height: 16px;
  min-height: 16px;
  min-width: 16px;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const Pop_Check_input = styled.input`
  cursor: pointer;
  position: relative;
  width: 16px;
  height: 16px;
  margin: 0;
  top: 2px;
  margin-right: 0.5rem;
`;

export const Pop_Remeber_label = styled.label`
  cursor: pointer;
  color: #999;
`;

export const Pop_Button_Wrap = styled.div`
  margin-top: 2rem;
`;

export const Pop_Login_Info = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

export const Pop_Label_Btn = styled.div`
  cursor: pointer;
  display: inline-block;
  color: #999;
  &::after {
    content: "|";
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    color: #dcdcdc;
  }

  &:last-child::after {
    content: none;
  }
`;

export const Global_Button = styled.div`
  cursor: pointer;
  line-height: 48px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  background-color: #757575;
  border: 1px solid #757575;
`;

export const Pop_Close_btn = styled.div`
  cursor: pointer;
  float: right;
  padding: 10px;
  transition: 0.3s ease;
  &:hover {
    opacity: 0.5;
  }
`;

export const Pop_Close_span = styled.span`
  text-shadow: 0 1px 0 #fff;
  font-size: 2rem;
`;

export const Pop_Info_Wrap = styled.div`
  color: #999;
  margin-top: 1rem;
`;

export const Pop_Info_Title = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const Pop_Info_Desc = styled.div`
  font-size: 0.85rem;
  &::before {
    content: "·";
    margin-right: 0.5rem;
  }
`;

export const Pop_Policy_Wrap = styled.div`
  margin-top: 1rem;
`;

export const Pop_Policy_Content = styled.div`
  overflow: auto;
  height: 300px;
  background-color: #eee;
  padding: 1rem;

  & > h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  & > p {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`;

/**
 * 상품 페이지
 * ProductsPage
 */

export const ProductImgWrap = styled.div`
  display: block;
  width: 100%;
  height: 380px;
  background-color: red;
`;

export const ProductBannerBox = styled.div`
  width: 100%;
  height: 380px;
  background: url(${(props) => props.img}) 50% 0px / cover no-repeat;
`;

export const ProductReviewWrapper = styled.div`
  display: block;
  width: 1140px;
  margin: 0 auto;
  padding-bottom: 2rem;
  & > h1 {
    padding: 2rem;
    text-align: center;
    font-size: 1.75rem;
  }
`;

/**
 * 공통 게시판)
 *
 */

export const BoardBox = styled.div``;
export const BoardCateBox = styled.div``;
export const BoardCateBtn = styled.button`
  color: #999;
  &::after {
    content: "|";
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  &:last-child::after {
    content: none;
  }

  &.selected {
    color: #333;
  }
`;
export const BoardContentBox = styled.div`
  border-top: 1px solid #333;
  margin-top: 1rem;
`;
export const BoardContentList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
`;

export const BoardPageBox = styled.div`
  color: #777;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;
export const BoardPageNum = styled.div`
  cursor: pointer;
  display: block;
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  line-height: 40px;
  text-align: center;
  font-size: 1.1rem;
  margin: 0.25rem;

  &.selected {
    border: 1px solid #000;
  }
`;
export const BoardPagePrev = styled.div`
  cursor: pointer;
  display: block;
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  line-height: 40px;
  text-align: center;
  font-size: 1.1rem;
  margin: 0.25rem;
  &::after {
    position: relative;
    display: block;
    content: " ";
    top: 14px;
    left: 15px;
    width: 9px;
    height: 9px;
    border-top: 1px solid #777;
    border-right: 1px solid #777;
    transform: scale(0.8) rotate(-135deg);
  }
`;
export const BoardPageNext = styled.div`
  cursor: pointer;
  display: block;
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  line-height: 40px;
  text-align: center;
  font-size: 1.1rem;
  margin: 0.25rem;

  &::after {
    position: relative;
    display: block;
    content: " ";
    top: 14px;
    left: 15px;
    width: 9px;
    height: 9px;
    border-top: 1px solid #777;
    border-right: 1px solid #777;
    transform: scale(0.8) rotate(45deg);
  }
`;

/**
 * 리뷰 게시판 글 (리뷰 아이템)
 *
 */

export const ReviewBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  flex-wrap: wrap;
`;
export const ReviewNum = styled.div`
  text-align: center;
  flex-basis: 7%;
`;
export const ReviewImg = styled.div`
  width: 100px;
  height: 120px;
  flex-basis: 8%;
  background-image: url(${(props) => props.img});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;
export const ReviewContent = styled.div`
  padding: 1rem;
  flex-basis: 70%;

  & > h1 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    font-weight: 550;
  }

  & > span {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
    color: #999;

    &:nth-child(2) {
      color: #333;
      margin-bottom: 1rem;
    }
    &:last-child {
      margin-top: 1.5rem;
    }
  }
`;
export const ReviewStarBox = styled.div`
  text-align: center;
  flex-basis: 15%;
`;

export const Star = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url(${star});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;
export const StarEmpty = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url(${star_empty});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

export const Arrow = styled.span`
  display: inline-block;
  margin-left: 1rem;
  width: 18px;
  height: 18px;
  background-image: url(${(props) => props.img});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

/**
 * 상품 상세 페이지
 *
 */

export const ReviewDetailBox = styled(animated.div)`
  width: 100%;
  padding: 1rem;
  background-color: #e8eaf5;

  & > span {
    font-size: 0.8rem;
  }
`;

export const ProdDetailWrapper = styled.div`
  width: 1140px;
  margin: 0 auto;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;
export const ProdDetailLeft = styled.div`
  flex-basis: 70%;
`;
export const ProdDetailRight = styled.div`
  flex-basis: 30%;
  padding-left: 2rem;
`;

export const ProdDetailBox = styled.div`
  display: flex;
`;

export const ProdDetailSliderBox = styled.div`
  position: relative;
  top: ${(props) => props.topValue + "px"};
  transition: 0.1s ease-in;
`;
export const ProdDetailMainSlider = styled.div``;
export const ProdDetailSubSlider = styled.div`
  display: flex;
  margin: 1rem;
`;

export const ProdDetailMainSliderView = styled(animated.div)`
  width: 100%;
  height: 580px;
  background: url(${(props) => props.img}) center/cover no-repeat;
`;

export const ProdDetailSubSliderView = styled.div`
  width: 70px;
  height: 70px;
  margin: 0.35rem;
  background: url(${(props) => props.img}) center/cover no-repeat;
  border: 1.5px solid #ccc;
  cursor: pointer;
  &:hover {
    border: 1px solid #333;
  }

  &.selected {
    border: 1.5px solid #333;
  }
`;

export const ProdDetailSliderPrev = styled.div`
  position: relative;
  top: 271px;
  left: 10px;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 100%;
  background-color: rgba(206, 206, 206, 0.7);
  cursor: pointer;
  &:hover {
    background-color: rgba(206, 206, 206, 0.9);
    &::before {
      border-top: 2px solid #eee;
      border-right: 2px solid #eee;
    }
  }
  &::before {
    position: relative;
    display: block;
    content: " ";
    top: 14px;
    left: 15px;
    width: 9px;
    height: 9px;
    border-top: 2px solid #747474;
    border-right: 2px solid #747474;
    transform: scale(1.2) rotate(-135deg);
  }
`;
export const ProdDetailSliderNext = styled.div`
  position: relative;
  top: 233px;
  left: 750px;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 100%;
  background-color: rgba(206, 206, 206, 0.7);
  cursor: pointer;
  &:hover {
    background-color: rgba(206, 206, 206, 0.9);
    &::before {
      border-top: 2px solid #eee;
      border-right: 2px solid #eee;
    }
  }
  &::before {
    position: relative;
    display: block;
    content: " ";
    top: 14px;
    left: 12px;
    width: 9px;
    height: 9px;
    border-top: 2px solid #747474;
    border-right: 2px solid #747474;
    transform: scale(1.2) rotate(45deg);
  }
`;

export const ProdDetailTitle = styled.h1`
  font-size: 1.25rem;
  padding-bottom: 1rem;
`;

export const ProdDetailDesc = styled.p`
  font-size: 0.7rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  &::before {
    content: "";
    display: block;
    position: relative;
    top: 8px;
    left: -10px;
    border: 2px solid #469cff;
    width: 3px;
    height: 3px;
    box-sizing: border-box;
  }
  color: #777;
`;

export const Product_Detail_Option_ItemWrapper = styled.div`
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ddd;
`;

export const Product_Detail_Option_ItemBox = styled.div`
  margin-top: 1rem;
  margin-right: 2rem;
`;
export const Product_Detail_Option_ItemText = styled.div`
  color: #333;
  font-size: 0.8rem;
`;
export const Product_Detail_Option_ButtonBox = styled.div`
  display: inline-block;
  margin-top: 0.5rem;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
`;
export const Product_Detail_Option_Button = styled.div`
  display: inline-block;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  border-spacing: 0;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background: none;
  color: #333;
  width: 92px;
  height: 35px;
  line-height: 30px;
  text-align: center;

  &:hover::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #000; /* 테두리 스타일 및 두께 설정 */
    box-sizing: border-box;
  }

  &.selected {
    background-color: #d0e6ff;
    color: #333;
  }
`;

export const Product_Detail_Option_Button_Span = styled.span`
  font-size: 12px;
`;

export const ProdDetailPayBox = styled.div`
  margin-top: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 1.75rem;
  border-top: 1px solid #ddd;
`;

export const ProdDetailPriceText = styled.div`
  float: left;
  font-size: 0.8rem;
  color: #333;
`;
export const ProdDetailPriceValue = styled.div`
  float: right;
  font-size: 0.9rem;
  color: #ff2222;
`;

export const ProdDetailPayButton = styled.div`
  cursor: pointer;
  line-height: 48px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  background-color: #469cff;
  border: 1px solid #469cff;
  width: 200px;
  margin: 0 auto;
`;

export const ProdDetailContentWrapper = styled.div``;

/**
 * 글로벌 카드 (3 x N)
 *
 */

export const CardList = styled.div`
  display: flex;
  justify-content: center;
`;
export const CardItem = styled.div`
  flex-basis: 20%;
  margin: 0.5rem;
  text-align: center;
`;
export const CardImg = styled.div`
  width: 100%;
  height: 200px;
  background-color: #d4d4ff;
`;
export const CardTitle = styled.div`
  padding: 0.75rem;
  font-size: 0.9rem;
  font-weight: 520;
`;
export const CardCont = styled.div`
  font-size: 0.8rem;
  color: #777;
`;

/**
 * 상품 상세 탭바
 *
 */

export const TabBarWrapper = styled.div`
  width: 1140px;
  margin: 0 auto;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;
export const TabBarlist = styled.div`
  display: flex;
  justify-content: center;
  width: 600px;
  margin: 0 auto;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
`;
export const TabBarItem = styled.li`
  width: 200px;
  padding: 0.6rem;
  font-size: 0.8rem;
  text-align: center;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  &.selected {
    color: #469cff;
    border-bottom: 3px solid #469cff;
  }
`;
export const TabBarItemText = styled.span``;
export const TabBarContent = styled.div`
  margin-top: 1rem;
  transition: 0.3s;
  & > h1 {
    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;
    padding: 1rem;
    margin-top: 2rem;
  }
`;

/**
 * 장바구니
 * Cart
 */

export const CartTopWrapper = styled.div`
  width: 1140px;
  margin: 0 auto;
  border-bottom: 1px solid #eee;
`;
export const CartTopTitleBox = styled.div`
  padding: 2rem;
  text-align: center;

  & > h1 {
    font-size: 1.5rem;
    padding: 1rem;
  }
  & > p {
    font-size: 0.75rem;
  }
`;
export const CartTopAddtionBox = styled.div`
  & > p {
    font-size: 0.75rem;
    padding-bottom: 1rem;
  }
`;

export const CartMidWrapper = styled.div`
  width: 1140px;
  margin: 0 auto;
  border-bottom: 1px solid #eee;
`;
export const CartMidBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #333;
  & > div > button {
    margin-right: 0.5rem;
  }
`;

export const CartMidText = styled.p`
  display: inline;
  font-size: 0.8rem;
  color: ${(props) => (props.color ? props.color : "#333")};
  &::after {
    content: " / ";
  }
  &:nth-child(2)::after {
    content: "";
    margin-right: 1rem;
  }
`;
export const CartMidProdBox = styled.div`
  & table {
    margin-bottom: 2rem;
  }

  & th {
    height: 50px;
    line-height: 50px;
    background-color: #f5f5f5;
    font-size: 0.9rem;
  }

  & th:nth-child(1) {
    width: 230px;
  }
  & th:nth-child(2) {
    width: 320px;
    text-align: left;
    padding-left: 1rem;
  }
  & th:nth-child(3) {
    width: 200px;
  }
  & th:nth-child(4) {
    width: 130px;
  }
  & th:nth-child(5) {
    width: 130px;
  }
  & th:nth-child(6) {
    width: 130px;
  }

  & td {
    padding: 1rem;
    vertical-align: middle;
    text-align: center;
  }
  & td:nth-child(1) {
  }

  & td:nth-child(2) {
    text-align: left;
  }
  & td:nth-child(3) {
    font-size: 0.85rem;
  }
  & td:nth-child(4) {
    font-size: 1rem;
    font-weight: 520;
    color: red;
    &::after {
      content: "원";
    }
  }
  & td:nth-child(5) {
    font-size: 0.85rem;
  }
  & td:nth-child(6) {
    font-size: 0.85rem;
    & button {
      margin-bottom: 0.25rem;
    }
  }

  & tbody > tr {
    border-bottom: 1px solid #eee;
  }
`;

export const CartMidThumbnail = styled.div`
  display: block;
  width: 150px;
  height: 80px;
  margin: 0 auto;
  background-color: aliceblue;
`;

export const CartMidProdInfoBox = styled.div`
  & h1 {
    font-size: 1.2rem;
    padding-bottom: 1rem;
  }
  & p {
    font-size: 0.75rem;
    padding-bottom: 0.5rem;
    //주문일
    &:last-child::before {
      display: inline-block;
      content: "주문일";
      border: 1px solid #777;
      border-radius: 15%;
      height: 24px;
      line-height: 24px;
      width: 48px;
      text-align: center;
      margin-right: 1rem;
    }
  }
`;

export const CartMidPriceBox = styled.div`
  & table {
    width: 100%;
  }
  & th {
    height: 50px;
    line-height: 50px;
    background-color: #f5f5f5;
    width: 23.5%;
    font-size: 0.9rem;
    &:nth-child(2n) {
      width: 2%;
    }
  }
  & td {
    padding: 1rem;
    vertical-align: middle;
    text-align: center;

    &:nth-child(odd)::after {
      content: "원";
    }
  }

  /* & td:nth-child(2)::before {
    position: relative;
    text-align: center;
    content: "-";
    left: 420px;
    border: 1px solid #ddd;
    border-radius: 100%;
    height: 20px;
    line-height: 15px;
    width: 20px;
    color: #333;
    font-size: 1rem;
  }

  & td:nth-child(3)::before {
    position: relative;
    text-align: center;
    content: "+";
    left: 705px;
    border: 1px solid #ddd;
    border-radius: 100%;
    height: 20px;
    line-height: 17px;
    padding-left: 1px;
    width: 20px;
    color: #333;
    font-size: 1rem;
  }

  & td:nth-child(4)::before {
    position: relative;
    text-align: center;
    content: "=";
    left: 990px;
    border: 1px solid #ddd;
    border-radius: 100%;
    height: 20px;
    line-height: 17px;
    width: 20px;
    color: #333;
    font-size: 1rem;
  } */

  & td:nth-child(7) {
    font-weight: 520;
    color: red;
  }

  & td:nth-child(2n) > span {
    display: block;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 100%;
    color: #333;
    font-size: 1rem;
    font-weight: 550;
    width: 25px;
    height: 25px;
    line-height: 21px;
  }
`;

export const CartBotWrapper = styled.div`
  width: 1140px;
  margin: 0 auto;
`;

export const CartBotNotiBox = styled.div`
  padding-top: 4rem;
  padding-bottom: 6rem;

  & h1 {
    font-size: 1.2rem;
    padding-bottom: 1rem;
  }
  & p {
    font-size: 0.75rem;
    color: #777;
    padding-bottom: 0.25rem;
    &::before {
      content: "-";
      margin-right: 0.25rem;
    }
  }
`;

/**
 * 마이페이지
 * MyPage
 */

export const MyPageTopWrapper = styled.div`
  width: 1140px;
  margin: 0 auto;
`;

export const MyPageTopBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const MyPageTopLeft = styled.div`
  flex-basis: 45%;
  padding: 4rem;
`;
export const MyPageTopRight = styled.div`
  flex-basis: 45%;
  padding: 4rem;
`;

export const MyPageUserInfoBox = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1.5rem;
`;
export const MyPageUserInfoIcon = styled.div`
  display: block;
  width: 120px;
  height: 100px;
  background-color: aliceblue;
  margin-right: 2rem;
`;
export const MyPageUserInfoTextBox = styled.div`
  width: 70%;
  & h1 {
    padding-bottom: 1rem;
    font-size: 1rem;
    font-weight: 520;
  }
  & h2 {
    padding-bottom: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    &::after {
      content: "님";
      font-weight: 500;
      font-size: 1rem;
      margin-left: 0.25rem;
    }
  }

  & h3 {
    font-size: 0.8rem;
    padding-bottom: 0.25rem;
    color: #777;
  }
  & h4 {
    font-size: 0.9rem;
    color: #333;
  }
`;
export const MyPageUserBtnBox = styled.div`
  display: flex;

  & > Button {
    width: 33%;
    margin-right: 0.25rem;
  }
`;

export const MyPageCardBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const MyPageCardItem = styled.div`
  border: 1px solid #999;
  width: 45%;
  height: 100%;
  & h1 {
    font-size: 1.2rem;
    font-weight: 550;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    padding-left: 1.5rem;
  }

  & h2,
  h4 {
    font-size: 1.5rem;
    font-weight: 550;
    color: #ffb120;
    padding-left: 1.5rem;
    padding-bottom: 1.5rem;
  }

  & h2::after {
    content: "P";
    margin-left: 0.5rem;
  }

  & h4::after {
    content: "개";
    margin-left: 0.5rem;
  }

  & h3,
  h5 {
    font-size: 0.9rem;
    font-weight: 550;
    padding-left: 1.5rem;
    &::before {
      content: "소멸예정";
      color: #999;
      margin-right: 0.25rem;
    }
  }
  
  & h3::after {
    content: "P";
    color: #999;
    margin-left:0.25rem;
  }
}
& h5::after {
  content: "개";
  color: #999;
  margin-left:0.25rem;
  }
`;
