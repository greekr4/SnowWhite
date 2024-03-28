import { animated } from "react-spring";
import styled from "styled-components";

import star from "../assets/icons/star.png";
import star_empty from "../assets/icons/star_empty.png";
import arrow_up from "../assets/icons/arrow_up.png";
import arrow_down from "../assets/icons/arrow_down.png";
import arrow_left from "../assets/icons/arrow_left.png";
import arrow_right from "../assets/icons/arrow_right.png";
import double_left from "../assets/icons/double_left.png";
import double_right from "../assets/icons/double_right.png";
import v_bar from "../assets/icons/v_bar.png";
import font_height from "../assets/icons/font_height.png";
import align_center from "../assets/icons/align_center.png";
import align_left from "../assets/icons/align_left.png";
import align_right from "../assets/icons/align_right.png";
import underline from "../assets/icons/underline.png";
import italic from "../assets/icons/italic.png";
import trans_background from "../assets/editor/trans_background.png";

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
  width: ${(props) => (props.width ? props.width : "")};
  margin: ${(props) => props.margin};
  &:hover {
    background-color: ${(props) =>
      props.btnBgcHover ? props.btnBgcHover : "#fff"};
    border: 1px solid
      ${(props) => (props.borderCHover ? props.borderCHover : "#999")};
  }
`;

export const Glob_Table = styled.table`
  width: 100%;

  & tr {
    border-bottom: 1px solid #eee;
  }

  & th {
    height: 50px;
    line-height: 50px;
    background-color: #ebf2ff;
    font-size: 0.9rem;
    width: ${(props) => props.width};
  }

  & td {
    padding: 1rem;
    vertical-align: middle;
    text-align: center;
  }
`;

export const Glob_Icon = styled.span`
  display: inline-block;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: url(${(props) => props.icon}) center/contain no-repeat;
  margin: ${(props) => props.margin};
  cursor: ${(props) => props.cursor};
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
  height: ${(props) => (props.height ? props.height : "80px")};
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
  width: 80px;
  /* padding: 1rem; */
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
  left: 23px;
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
  background-size: cover;
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

export const NoProdBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;

  & h1 {
    text-align: center;
    padding-top: 2rem;
    font-size: 1.5rem;
  }
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
    30% -
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
    border: 1px solid #777;
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

  & .container {
    min-width: 150px;
    box-shadow: 0 2px 7px 0 #00000026;
    position: relative;
  }

  & #dropdown {
    left: 0;
    visibility: hidden;
    position: absolute;
  }

  & .dropdownLabel {
    display: flex;
    justify-content: space-between;
    padding: 12px;
  }

  & .content {
    display: none;
    position: absolute;
    width: 100%;
    left: 0;
    background: white;
    box-shadow: 0 4px 5px 0 #00000026;
  }

  & #dropdown:checked + label + div {
    display: block;
    border-top: 1px solid #00000026;
  }

  & .caretIcon {
    transition: transform 250ms ease-out;
  }
  & #dropdown:checked + label > .caretIcon {
    transform: rotate(-180deg);
  }

  & .content ul {
    list-style-type: none;
    padding: 12px;
    margin: 0;
  }
  & .content ul li {
    margin: 0.8rem 0;
    cursor: pointer;
    &:hover {
      color: #999;
    }
  }
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

export const ProdDetailDesignBtns = styled.div`
  border-top: 1px solid #ddd;
  margin-top: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const ProdDetailPayBox = styled.div`
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
    width: 100%;
  }

  & th {
    height: 50px;
    line-height: 50px;
    background-color: #ebf2ff;
    font-size: 0.9rem;
  }

  & th:nth-child(1) {
    width: 50px;
  }
  & th:nth-child(2) {
    width: 230px;
    text-align: left;
    padding-left: 1rem;
  }
  & th:nth-child(3) {
    width: 350px;
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

  & td:nth-child(3) {
    text-align: left;
  }
  & td:nth-child(4) {
    font-size: 0.85rem;
  }
  & td:nth-child(5) {
    font-size: 1rem;
    font-weight: 520;
    color: red;
    &::after {
      content: "원";
    }
  }
  & td:nth-child(6) {
    font-size: 0.85rem;
  }
  & td:nth-child(7) {
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
  background: url(${(props) => props.img}) center/contain no-repeat;
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
      content: "담은 날";
      border: 1px solid #777;
      border-radius: 15%;
      height: 24px;
      line-height: 22px;
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
    background-color: #ebf2ff;
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
  background-color: aquamarine;
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
    margin-left: 0.25rem;
  }

  & h5::after {
    content: "개";
    color: #999;
    margin-left: 0.25rem;
  }
`;

export const MyPageStateWrapper = styled.div`
  width: 1140px;
  margin: 0 auto;
`;
export const MyPageStateTitleBox = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;

  & h1 {
    font-size: 1.2rem;
    padding-bottom: 0.75rem;
  }

  & p {
    font-size: 0.9rem;
    color: #777;
  }
`;
export const MyPageStateCellBox = styled.div`
  padding-bottom: 2rem;
  & h1 {
    padding-bottom: 1rem;
    font-size: 1.2rem;
  }
`;
export const MyPageStateCellList = styled.div`
  border: 1px solid #ccc;
  display: flex;
`;
export const MyPageStateCellItem = styled.div`
  flex-basis: calc(100% / 6);
  text-align: center;
  margin: 1rem;
  margin-right: 0;
  padding-right: 1rem;
  border-right: 1px solid #ccc;

  & h1 {
    font-size: 1rem;
    color: #777;
    &::after {
      position: relative;
      display: inline-block;
      content: "";
      background-image: url(${arrow_right});
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      width: 12px;
      height: 12px;
      margin-left: 0.5rem;
    }
    cursor: pointer;
  }

  & p {
    font-size: 1.5rem;
    padding: 2rem;
    font-weight: 550;
  }
`;

export const MyPageStateCardList = styled.div`
  display: flex;
  justify-content: center;
`;

export const MyPageStateCardItem = styled.div`
  flex-basis: calc(100% / 3 - 1rem);
  background-color: #ebf2ff;
  margin: 1rem;
  padding: 1.5rem;

  & h1 {
    font-size: 1rem;
    padding-bottom: 2.5rem;
  }

  & p {
    font-size: 1.5rem;
    font-weight: 550;
    text-align: right;
    padding-bottom: 1rem;
    &::after {
      position: relative;
      display: inline-block;
      content: "";
      background-image: url(${arrow_right});
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      width: 18px;
      height: 18px;
      margin-left: 0.5rem;
    }
  }
`;

export const MyPageStateEditWrapper = styled.div`
  padding-top: 2rem;
  width: 1140px;
  margin: 0 auto;
`;

export const MyPageStateEditBox = styled.div`
  padding-bottom: 2rem;

  & h1 {
    padding-bottom: 1rem;
    font-size: 1.2rem;
  }

  & table {
    width: 100%;
    color: #333;
    & input {
      border: 1px solid #eee;
      padding-left: 0.75rem;
      width: 40%;
      height: 28px;
    }

    & input.tel {
      width: calc(40% / 3 - 5px);
      margin-right: 7.5px;
    }

    & input.email {
      width: calc(40% / 2 - 9.5px);
      & + span {
        display: inline-block;
        font-size: 0.9rem;
        width: 15px;
        margin-left: 2.5px;
        margin-right: 2.5px;
        text-align: center;
      }
    }

    & tr {
      border-bottom: 1px solid #eee;
    }

    & th {
      text-align: left;
      width: 15%;
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      font-size: 0.9rem;
    }

    & td {
      font-size: 0.9rem;
      color: #777;
    }
  }
`;

export const MyPageStateEditDeliveryBox = styled.div`
  padding-top: 3rem;
  padding-bottom: 5rem;
  & h1 {
    padding-bottom: 1rem;
    font-size: 1.2rem;
    float: left;
  }

  & table {
    width: 100%;
    color: #333;
  }
  & th {
    height: 50px;
    line-height: 50px;
    background-color: #ebf2ff;
    font-size: 0.9rem;

    &:nth-child(1) {
      width: 50px;
    }
  }
  & td {
    padding: 1rem;
    vertical-align: middle;
    text-align: center;
    border-bottom: 1px solid #eee;

    &:last-child {
      width: 15%;
    }
  }
`;

export const MyPageStateEditBtns = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;

  & .edit {
    float: left;
    margin-right: 0.5rem;
    width: 75px;
  }
  & .cancle {
    width: 75px;
  }
  & .del {
    float: left;
  }

  & .add {
    float: right;
  }
`;

export const MypagePopWrap = styled.div`
  position: fixed;
  left: calc(50% - 570px);
  top: calc(40% - 100px);
  min-width: 1140px;
  width: 1140px;
  height: 120px;
  background-color: #fff;
  z-index: 1000;
  box-shadow: 2px 2px 2px 0px #777;

  & table {
    width: 100%;
    height: 100%;
    font-size: 0.8rem;
  }
  & th {
    height: 50px;
    line-height: 50px;
    background-color: #ebf2ff;
    font-size: 0.9rem;
  }
  & td {
    padding: 1rem;
    vertical-align: middle;
    text-align: center;
    border-bottom: 1px solid #eee;
  }

  & div.postWrapper {
    position: fixed;
    width: 550px;
    left: calc(50% - 275px);
  }

  & input {
    width: 100%;
  }
`;

export const MypagePopOverRay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const MyPagePasswordWrapper = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;

  & div.btns {
    display: flex;
  }

  & input {
    border: 1px solid #efefef;
    padding-left: 0.5rem;
    height: 34px;
    margin-right: 0.5rem;
  }
`;

export const userEditAnimated = styled(animated.div)`
  overflow: hidden;
`;

/**
 * 주문 내역
 * OrderListPage
 */

export const OrderListTopAddtionBox = styled.div`
  padding: 1rem 2rem 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f6fff7;

  & label {
    font-size: 0.75rem;
    padding-bottom: 1rem;
    margin-right: 1rem;
  }

  & button {
    display: inline-block;
    margin-right: 0.25rem;
  }

  & input {
    width: 100px;
    padding: 0 12px;
    line-height: 32px;
    font-size: 11px;
    color: #333;
    text-align: center;
    background-color: #fff;
    border: 1px solid #ccc;
  }

  & .react-datepicker__day--outside-month {
    visibility: hidden;
  }

  & .react-datepicker__header--custom {
    background-color: aliceblue;
  }
  & .react-datepicker__day-name {
    color: #333;
    font-size: 0.75rem;
  }
`;

export const RightInner = styled.div`
  display: inline-block;
  margin-right: 0.25rem;
`;

export const DatePickerHeader = styled.div`
  & div.left {
    display: flex;
    align-items: center;
  }
  & div.right {
    display: flex;
    align-items: center;
  }

  & button.left {
    position: relative;
    width: 12px;
    height: 12px;
    background: url(${arrow_left}) center/contain no-repeat;
  }

  & button.right {
    position: relative;
    width: 12px;
    height: 12px;
    background: url(${arrow_right}) center/contain no-repeat;
  }

  & button.double-left {
    position: relative;
    width: 12px;
    height: 12px;
    background: url(${double_left}) center/contain no-repeat;
  }

  & button.double-right {
    position: relative;
    width: 12px;
    height: 12px;
    background: url(${double_right}) center/contain no-repeat;
  }

  & span {
    width: 35%;
    font-size: 0.75rem;
    font-weight: 550;
  }
`;

export const DatePickerHeaderBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const OrderListMidWrapper = styled.div`
  width: 1140px;
  margin: 0 auto;
`;

export const OrderListMidTextBox = styled.div``;

export const OrderListMidProdBox = styled.div`
  margin-top: 2rem;
  & table {
    margin-bottom: 2rem;
  }

  & th {
    height: 50px;
    line-height: 50px;
    background-color: #ebf2ff;
    font-size: 0.9rem;
  }

  & th:nth-child(1) {
    width: 130px;
  }
  & th:nth-child(2) {
    width: 620px;
  }
  & th:nth-child(3) {
    width: 130px;
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

  & td:nth-child(3) {
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

export const OrderListMidProdInfoBox = styled.div`
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

/**
 * 공지사항
 *
 */

export const NoticeWrapper = styled.div`
  width: 1140px;
  margin: 0 auto;
`;

export const NoticeTitleBox = styled.div`
  & h1 {
    font-size: 1.75rem;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    text-align: center;
  }
`;

export const NoticeBoardBox = styled.div`
  padding-bottom: 8rem;
`;

export const NBBox = styled.div``;
export const NBHeader = styled.div`
  display: table;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #ebf2ff;
  font-size: 0.9rem;
`;
export const NBTh = styled.div`
  display: table-cell;
  width: ${(props) => props.width};
`;

export const NBRow = styled.div`
  width: 100%;
`;
export const NBTdBox = styled.div`
  display: table;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 0.85rem;
  border-bottom: 1px solid #eee;
`;
export const NBTd = styled.div`
  display: table-cell;
  width: ${(props) => props.width};
  text-align: center;
  cursor: pointer;
  &:nth-child(2) {
    text-align: left;

    &.selected {
      font-weight: bold;
    }
  }
`;

export const NBDetailBox = styled(animated.div)`
  width: 100%;
  height: auto;
  overflow: hidden;
  transition: 0.1s;
`;
export const NBDetail = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  margin-left: 10%;
`;

/**
 * 주문 페이지
 *
 */

export const OrderWrapper = styled.div`
  width: 1140px;
  margin: 0 auto;
`;

export const OrderTopWrapper = styled.div`
  width: 1140px;
  margin: 0 auto;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

export const OrderMidProdBox = styled.div`
  & table {
    margin-bottom: 2rem;
  }

  & th {
    height: 50px;
    line-height: 50px;
    background-color: #ebf2ff;
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
    font-size: 0.85rem;
    &::after {
      content: "원";
    }
  }
  & td:nth-child(5) {
    font-size: 0.85rem;
    &::after {
      content: "원";
    }
  }
  & td:nth-child(6) {
    font-size: 0.85rem;
    color: red;
    font-weight: 550;
    &::after {
      content: "원";
    }
  }

  & tbody > tr {
    border-bottom: 1px solid #eee;
  }
`;

export const OrderMidProdInfoBox = styled.div`
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
      content: "출고예정일";
      border: 1px solid #777;
      border-radius: 15%;
      height: 24px;
      line-height: 24px;
      width: 72px;
      text-align: center;
      margin-right: 1rem;
    }
  }
`;

export const OrderMidWrapper = styled.div`
  width: 1140px;
  margin: 0 auto;
`;

export const OrderBotWrapper = styled.div`
  display: flex;
  padding-bottom: 6rem;
`;

export const OBLeftBox = styled.div`
  flex-basis: 65%;
`;
export const OBRightBox = styled.div`
  flex-basis: 35%;
`;

export const OBTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 83%;
  font-size: 1.1rem;
  font-weight: 550;
  padding-top: 1rem;
  padding-bottom: 1rem;
  color: cornflowerblue;
  cursor: pointer;
`;

export const OBDeliveryBox = styled.div`
  padding-top: 1rem;

  & h1 {
    font-size: 1.1rem;
    font-weight: 520;
    color: #333;
  }

  & input {
    border: 1px solid #eee;
    padding-left: 0.75rem;
    width: 72%;
    height: 36px;
  }

  & input.tel {
    width: calc(72% / 3 - 5px);
    margin-right: 7.5px;
  }

  & input.deli {
    width: calc(100% - 5px);
    margin-top: 0.5rem;

    &:last-child {
      margin-bottom: 0.5rem;
    }
  }

  & input.message {
    width: calc(100% - 5px);
  }

  & table {
    width: 83%;
    font-size: 0.85rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    border-top: 1px solid #eee;

    & tr {
      border-bottom: 1px solid #eee;
    }

    & th {
      width: 40%;
      text-align: left;
      height: 48px;
      line-height: 48px;
    }
  }
`;

export const OBTextAndBtnBox = styled.div`
  width: calc(81% + 9px);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StepMenu = styled(animated.div)`
  overflow: hidden;
`;

export const OBDeliPriceBox = styled.div`
  & h1 {
    font-size: 1.1rem;
    font-weight: 550;
  }

  & input {
    border: 1px solid #eee;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    margin-right: 0.75rem;
    width: 72%;
    height: 36px;
    text-align: right;
    background-color: #f7f7f7;
  }

  & input.tel {
    width: calc(72% / 3 - 5px);
    margin-right: 7.5px;
  }

  & input.deli {
    width: calc(100% - 5px);
    margin-top: 0.5rem;

    &:last-child {
      margin-bottom: 0.5rem;
    }
  }

  & input.message {
    width: calc(100% - 5px);
  }

  & table {
    width: 83%;
    font-size: 0.85rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-top: 1px solid #eee;

    & tr {
      border-bottom: 1px solid #eee;
    }

    & th {
      width: 40%;
      text-align: left;
      height: 48px;
      line-height: 48px;
    }
  }
`;

export const OBRadioGroup = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #eee;
  height: 40px;
`;
export const OBRadioBox = styled.div`
  & label {
    font-size: 0.9rem;
    padding-left: 0.25rem;
    padding-right: 1.25rem;
  }
`;

export const OBPaymentAddBox = styled(animated.div)`
  height: 0px;
  overflow: hidden;
  font-size: 0.9rem;

  & div {
    width: 82%;
    background-color: aliceblue;
    height: 40px;
    border-bottom: 1px solid #777;
    & label {
      padding-left: 1rem;
      padding-right: 2rem;
      height: 40px;
      line-height: 40px;
    }

    & select {
      width: 20%;
      margin-right: 1rem;
      padding-left: 0.5rem;
    }
  }
`;

export const OBPaymentBox = styled.div`
  & table {
    width: 80%;
  }

  & div.radio {
    display: flex;
    align-items: center;
    height: 36px;
    border-bottom: 1px solid #eee;
    cursor: pointer;

    & input[type="radio"] {
      cursor: pointer;
      position: relative;
      top: 1px;
      left: 0;
    }
    & label {
      cursor: pointer;
      font-size: 0.9rem;
      margin-left: 0.5rem;
      height: 16px;
      line-height: 16px;
    }
  }

  & tr.card_add {
    background-color: #f7f7f7;
    & td {
      font-size: 0.9rem;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
    }
    & div.CardOptionBox {
      padding-top: 1rem;
      padding-bottom: 1rem;
      vertical-align: middle;
      text-align: left;

      & span {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
      }
      & select {
        border-style: none;
        background: #fcfcfc;
        -webkit-appearance: auto;
        -moz-appearance: auto;
        width: 40%;
        border: 1px solid #ccc;
        padding-left: 0.5rem;
        margin-right: 0.5rem;
        cursor: pointer;
      }
    }
  }
`;

export const OBPaymentSpan = styled.span`
  display: block;
  padding: 1rem 0 1rem 0;
  font-size: 0.8rem;
  color: #777;
`;

export const OBFinalPaymentBox = styled.div`
  border: 1px solid #ccc;
`;

export const OBFinalRowBox = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  font-size: 0.9rem;
  padding-bottom: 1rem;

  &:first-child {
    padding-top: 2rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #333;

    & div.right {
      font-size: 1.1rem;
      font-weight: 550;
      color: red;
    }
  }

  & div.left {
    flex-basis: 20%;
    font-weight: 550;
  }
  & div.right {
    flex-basis: 80%;
    text-align: right;

    &::after {
      content: "원";
      padding-left: 0.1rem;
    }
  }
`;

export const OBFinalPymentBoxAddWrapper = styled.div`
  width: 100%;
  background-color: aliceblue;
`;

export const OBFinalPymentBoxAdd = styled.div`
  width: 80%;
  margin: 0 auto;
  font-size: 0.8rem;
  color: #777;
  padding-top: 1rem;
  padding-bottom: 1rem;

  & p {
    padding-top: 0.5rem;
  }

  & span {
    text-decoration: underline;
    cursor: pointer;
  }

  & input {
    position: absolute;
  }

  & label {
    padding-left: 1rem;
  }

  & button {
    width: 100%;
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: 550;
  }
`;

/** 에디터(Canvas)
 *
 *
 */

export const EditorWrapper = styled.div`
  display: flex;
  width: 1300px;
  min-width: 1140px;
  height: 100%;
  background-color: #eee;
`;

export const CanvasBox = styled.div`
  // 에디터 사이즈
  /* width: ${(props) => props.canvasWidth + "px"};
  height: ${(props) => props.canvasHight + "px"}; */
  width: 1300px;
  height: 1024px;
  margin: auto;
  margin-top: 40px;
  z-index: 998;
  & canvas {
    margin: auto;
  }
`;

export const TextOption = styled.div`
  position: absolute;
  width: 200px;
  height: 500px;
  top: 10rem;
  left: 70%;
  background-color: white;
`;

export const EHLayout = styled.div`
  height: 60px;
  background-color: #fff;
  position: relative;
  z-index: 999;
`;

export const EHWrapper = styled.div`
  min-width: 1140px;
`;

export const EHTopBox = styled.div`
  width: 100%;
  display: flex;
  margin-left: 2rem;
  /* border-bottom: 1px solid #ddd; */
  & span {
    margin-left: 1rem;
    font-size: 0.9rem;
    font-weight: 550;
    height: 60px;
    line-height: 60px;
    color: #333;
  }
`;
export const EHBotBox = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  background-color: #fbfbfb;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  left: 70px;
  z-index: 1000;

  &.side-open {
    left: 330px;
  }
`;

export const EHBtnBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  & span {
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }
`;

export const ESWrapper = styled.div`
  width: 70px;
  min-width: 70px;
  height: 100%;
  background-color: #fff;
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
  z-index: 1000;
`;

export const ESideBtnBox = styled.div`
  display: grid;
  width: 100%;
`;

export const ESideBtnItem = styled.div`
  display: grid;
  justify-content: center;
  justify-items: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ddd;
  & p {
    font-size: 0.8rem;
    text-align: center;
    padding-top: 0.5rem;
  }

  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

export const ESideAddWrapper = styled.div`
  width: 260px;
  min-width: 260px;
  height: 100%;
  background-color: #fbfbfb;
  border-right: 1px solid #ddd;
  z-index: 1000;
`;

export const ESideAddBox = styled.div`
  padding: 1rem;

  & h1 {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 550;
    padding: 1rem;
  }
`;
export const ESideAddShapesBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  height: 800px;
  align-content: flex-start;
`;

export const ESTempateBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  flex-direction: column;
  align-items: center;
  height: 800px;
`;

export const ESTemplateItem = styled.div`
  width: 80%;
  height: 95px;
  margin: 0.25rem;
  border: 1px solid #ccc;
  background-image: url(${trans_background});
  cursor: pointer;
`;

export const ESideAddShapesItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95px;
  height: 95px;
  margin: 0.25rem;
  border: 1px solid #ccc;
  background-image: url(${trans_background});
  cursor: pointer;
`;

export const ESideAddBgBox = styled.div`
  display: grid;
`;

export const ESideAddBgItem_first = styled.div`
  & p {
    padding: 0.5rem 0 1rem 1rem;
    font-size: 0.8rem;
    color: #333;
  }

  border-bottom: 1px solid #eee;
`;

export const ESideAddBgItem = styled.div`
  & p {
    padding: 1rem 0 1rem 1rem;
    font-size: 0.8rem;
    color: #333;
    cursor: pointer;

    &::after {
      content: "";
      display: inline-block;
      width: 12px;
      height: 12px;
      background: url(${(props) => (props.show ? arrow_up : arrow_down)})
        center/contain no-repeat;
      float: right;
    }
  }

  border-bottom: 1px solid #eee;
`;

export const ESideAddBgColorsBox = styled(animated.div)`
  overflow: hidden;
`;

export const ESideAddBgColors = styled(animated.div)`
  padding: 0.75rem;
  padding-top: 0;
  display: flex;
  flex-wrap: wrap;
`;

export const BgColorBtn = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.color};
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    border: 1px solid #000;

    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      border: 1px solid #fff;
    }
  }
`;

export const BgColorBtn_plus = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.color};
  border: 1px solid #ccc;
  box-sizing: border-box;

  cursor: pointer;
  &:hover {
    border: 1px solid #000;

    &::after {
      content: "";
      box-sizing: border-box;
      display: block;
      width: 100%;
      height: 100%;
      border: 1px solid #fff;
    }
  }
`;

export const CanvasPopupBox = styled.div`
  position: relative;
  background-color: rgba(255, 255, 255, 0);
  left: -10%;
  width: 100px;
  height: 100px;
`;
export const CanvasPopup = styled.div`
  position: absolute;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px 0px;
  border: 1px solid rgb(204, 204, 204);
  box-sizing: border-box;
  width: 260px;
  top: ${(props) => props.objy - 190 + "px"};
  left: ${(props) => props.objx + 425 + "px"};
  z-index: 999;

  & div.line {
    width: 100%;
    height: 24px;
    line-height: 24px;
    font-size: 0.9rem;
    padding-left: 0.5rem;

    & span {
      opacity: 0.6;

      &:hover {
        opacity: 1;
      }
    }
  }

  & div.title {
    background-color: #f3f3f3;
    border-bottom: 1px solid #bbb;
    font-weight: 550;
    font-size: 0.8rem;
  }

  & div.option {
    display: flex;
    align-items: center;
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #ccc;

    & button {
      margin-right: 0.5rem;
      height: 28px;
      line-height: 28px;
    }

    & input {
      margin-left: 1rem;
      width: 20%;
      height: 28px;
    }
  }

  & div.option-default {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #ccc;
    font-size: 0.8rem;

    & input {
      margin-top: 15px;
      width: 100%;
    }
  }

  & div.option-font {
    align-items: center;
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #ccc;
    font-size: 0.8rem;

    & label {
      line-height: 15px;
    }
  }

  & div.option-text {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #ccc;
    font-size: 0.8rem;

    & input {
      width: 100% !important;
      height: 24px !important;
      padding: 3px 5px 3px !important;
    }

    & label {
      line-height: 15px;
    }
  }

  & div.btnbox {
    justify-content: space-around;
  }

  & div.size {
    height: 24px;
    line-height: 24px;
    color: #777;
    font-size: 0.75rem;
    text-align: center;
  }
`;

export const FontStyleBox = styled.div`
  width: 100%;
  display: inline-block;
  & select {
    width: 95%;
    height: 25px;
    line-height: 22px;
    border: 1px solid #ccc;
    padding-left: 5px;
  }

  &::after {
    content: "";
    display: inline-block;
    position: relative;
    width: 12px;
    height: 12px;
    background: url(${arrow_down}) center/contain no-repeat;
    left: -16px;
    top: 0px;
  }
`;

export const ColorPickerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const ColorPickerBox = styled.div`
  position: relative;
  /* top: calc(${(props) => props.canvasy + props.objy * props.objzoom + "px"});
  left: calc(${(props) => props.canvasx + "px"}); */
  left: ${(props) => (props.left ? props.left : "-2px")};
  top: ${(props) => (props.top ? props.top : "-14px")};
  z-index: 1001;
`;

export const ColorWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #777;
  justify-content: center;
  align-items: center;
`;

export const ColorBox = styled.div`
  border: 1px solid #ccc;
  width: 24px;
  height: 24px;
  background-color: ${(props) => props.color};
  margin-right: 20px;

  cursor: pointer;
  &::before {
    content: "";
    display: block;
    position: relative;
    width: 12px;
    height: 12px;
    background: url(${arrow_down}) center/contain no-repeat;
    left: 28px;
    top: 6px;
  }
`;

export const ColorBtn = styled.div`
  position: relative;
  width: 45px;
  height: 33px;
  top: -18px;
  left: -5px;
`;

export const V_Bar = styled.div`
  background: url(${v_bar}) center/contain no-repeat;
  width: 18px;
  height: 18px;
`;

export const FontSizeBox = styled.div`
  margin-right: -10px;
  & select {
    width: 80px;
    height: 25px;
    line-height: 22px;
    border: 1px solid #ccc;
    padding-left: 5px;
  }

  &::after {
    content: "";
    display: inline-block;
    position: relative;
    width: 12px;
    height: 12px;
    background: url(${arrow_down}) center/contain no-repeat;
    left: -16px;
    top: 0px;
  }
`;

export const FontHeightBox = styled.div`
  &::before {
    content: "";
    display: inline-block;
    position: relative;
    width: 18px;
    height: 18px;
    top: 3px;
    left: -3px;
    background: url(${font_height}) center/contain no-repeat;
  }

  & select {
    width: 50px;
    height: 25px;
    line-height: 22px;
    border: 1px solid #ccc;
    padding-left: 5px;
    margin-left: 3px;
  }

  &::after {
    content: "";
    display: inline-block;
    position: relative;
    width: 12px;
    height: 12px;
    background: url(${arrow_down}) center/contain no-repeat;
    left: -16px;
    top: 0px;
  }
`;
/**
 * 오시는 길
 *
 */

export const IntroWayWrapper = styled.div`
  width: 1140px;
  margin: 0 auto;
`;

export const KakaoMapBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 820px;
  margin: 0 auto;
  padding-bottom: 2rem;

  & h1 {
    font-size: 1.75rem;
    padding-top: 2rem;
    padding-bottom: 4rem;
    text-align: center;
    width: 100%;
  }

  & div.sub {
    display: flex;
    width: 100%;
    font-size: 0.9rem;
    padding-bottom: 1rem;

    & h2 {
      flex-basis: 20%;
      font-weight: 550;
      color: #416ca1;
    }
    & p {
      flex-basis: 80%;
      & br {
      }
    }
  }
`;

export const BusText = styled.label`
  background-color: #47af1b;
  padding: 0 5px 0 5px;
  color: #fff;
`;

export const SubwayText = styled.label`
  background-color: #ff8939;
  border-radius: 100%;
  padding: 0 8px 0 8px;
  color: #fff;
`;

/**
 * 견적서 프린트 페이지
 *
 */

export const PrintWrapper = styled(animated.div)`
  position: absolute;
  overflow: hidden;
  height: ${(props) => props.height};
  width: calc(1140px / 1.5);
  box-shadow: 2px 2px 8px #aaa;
  border: 1px solid #eee;
`;

export const PrintBox = styled.div`
  @page {
    size: A4;
    margin: 20mm;
  }
  top: 1rem;
  width: 100%;
  padding: 1rem;
  padding-bottom: 2rem;
  background-color: #fff;

  @media print {
    border: none;
    font-size: 0.8rem;
  }

  & h1 {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 520;
    letter-spacing: 0.5rem;
    padding: 1.75rem;
  }

  & table.top {
    width: 100%;
    text-align: center;
    & td,
    th {
      vertical-align: middle;
      border: 1px solid #ddd;
      padding: 0.5rem;
    }

    & th {
      background-color: #f4f4f4;
    }
  }

  & table.bottom {
    width: 100%;
    text-align: center;
    & td,
    th {
      border: 1px solid #ddd;
      padding: 0.5rem;
    }
    & th {
      border-top: none;
      background-color: #f4f4f4;
    }

    & tr.sum {
      & td {
        border-top: 2px solid #ccc;
      }
    }
  }
`;

export const PrintBtnBox = styled.div`
  text-align: center;
  background-color: #fff;
  border-top: 2px solid #ccc;
  padding: 1rem;
`;

/**
 * 어드민
 *
 */

export const AdminWrapper = styled.div`
  width: 1140px;
  margin: 2rem auto;
`;

export const AdminTable = styled.table`
  width: 100%;
  font-size: 0.9rem;
  & img {
    width: 72px;
    height: 72px;
    margin: 0.5rem auto 0.5rem auto;
  }

  & textarea {
    resize: none;
    border: 1px solid #eee;
    width: 90%;
    height: 50px;
    margin: 1rem;
  }

  & thead {
    height: 72px;
    background-color: #f7f7f7;
  }
  & th {
    text-align: center;
    vertical-align: middle;
    border: 1px solid #ccc;
    white-space: pre-line;
  }
`;

export const AdminProdDetailHeader = styled.div`
  height: 40px;

  & .left {
    display: inline;
    float: left;
  }

  & .right {
    display: inline;
    float: right;
  }
`;

export const AdminSection = styled.section`
  & select {
    width: 200px;
    border: 1px solid #ccc;
  }

  & img.small {
    width: 170px;
    height: 140px;
  }
  & table {
    width: 100%;
    white-space: pre-line;
    & th {
      background-color: #f7f7f7;
      border: 1px solid #ccc;
      width: 20%;
      height: 50px;
      vertical-align: middle;
    }
    & td {
      padding: 0.5rem 1rem;
      border: 1px solid #ccc;
      vertical-align: middle;

      & textarea {
        resize: none;
        border: 1px solid #eee;
        width: 40%;
        height: 50px;
        margin: 1rem;
      }
    }
  }
`;

export const AdminProdImgBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  & div.item {
    flex-basis: 24%;
    height: 150px;
    padding: 0.25rem;
    margin: 0.25rem;
    border: 1px solid #ccc;

    & img {
      display: block;
      width: 100%;
      height: 140px;
    }
  }

  & div.btnbox {
    position: relative;
    float: right;
  }

  & div.plus {
    background-image: url("/asserts/admin/plus.gif");
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }

  & button {
    position: absolute;
    left: -50px;
    top: 10px;
  }
`;
