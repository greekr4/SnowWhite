import { animated } from "react-spring";
import styled from "styled-components";

import star from "../assets/icons/star.png";
import star_empty from "../assets/icons/star_empty.png";

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
  height: 100px;
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
  text-align: center;
`;

export const HeaderMenuText = styled.a`
  cursor: pointer;
  font-family: "Gothic A1", sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
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
  left: 24px;
  top: 5px;
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
  background-color: aliceblue;
`;
export const ProdDetailRight = styled.div`
  flex-basis: 30%;
  background-color: aqua;
`;

export const ProdDetailBox = styled.div`
  display: flex;
`;

export const ProdDetailSliderBox = styled.div`
  /* position: relative;
  top: 100px; */
`;
export const ProdDetailMainSlider = styled.div``;
export const ProdDetailSubSlider = styled.div`
  display: flex;
  margin: 1rem;
`;

export const ProdDetailMainSliderView = styled.div`
  width: 100%;
  height: 580px;
  background: url(${(props) => props.img}) center/cover no-repeat;
`;

export const ProdDetailSubSliderView = styled.div`
  width: 70px;
  height: 70px;
  margin: 0.5rem;
  background: url(${(props) => props.img}) center/cover no-repeat;
  border: 1.5px solid #ccc;
  &.selected {
    border: 1.5px solid #333;
  }
`;

export const ProdDetailSliderPrev = styled.div`
  width: 38px;
  height: 38px;
  border: 1px solid #333;
  border-radius: 100%;
  &::before {
    position: relative;
    display: block;
    content: " ";
    top: 14px;
    left: 15px;
    width: 9px;
    height: 9px;
    border-top: 2px solid #777;
    border-right: 2px solid #777;
    transform: scale(1.2) rotate(-135deg);
  }
`;
export const ProdDetailSliderNext = styled.div`
  width: 38px;
  height: 38px;
  border: 1px solid #333;
  border-radius: 100%;
  &::before {
    position: relative;
    display: block;
    content: " ";
    top: 14px;
    left: 12px;
    width: 9px;
    height: 9px;
    border-top: 2px solid #777;
    border-right: 2px solid #777;
    transform: scale(1.2) rotate(45deg);
  }
`;
