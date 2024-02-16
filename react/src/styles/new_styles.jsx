import { animated } from "react-spring";
import styled from "styled-components";

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
`;

export const HeaderSubMenuCols = styled.ul`
  display: flex;
  flex-direction: column;
`;
export const HeaderSubMenuItem = styled.li`
  position: relative;
  font-size: 13px;
  line-height: 1.8rem;
  text-align: left;
`;

export const HeaderSubMenuText = styled.span``;

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
 * 메인 페이지 - 이벤트 상품 아이템
 * MainPage - EventProdItem
 */

export const MainEventProdWrapper = styled.div`
  width: 1140px;
  margin: 0 auto;
  padding: 3rem;
`;

export const EventProdList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const EventProdItemBox = styled.div`
  flex-basis: 31%;
  margin-bottom: 1.25rem;
  box-sizing: border-box;
  transition: 0.125s ease-out;
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }
`;
export const EventProdItemImgBox = styled.div`
  width: 100%;
  height: 245px;
  background-color: azure;
`;
export const EventProdItemTextBox = styled.div`
  padding: 1rem;
`;
export const EventProdItemTitle = styled.span`
  display: block;
  font-size: 1.25rem;
  padding-bottom: 1rem;
`;
export const EventProdItemDesc = styled.span`
  display: block;
  font-size: 0.9rem;
  color: #444;
  padding-bottom: 1.5rem;
`;
export const EventProdItemBtn = styled.span`
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
  background-color: #27b8b8;
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
