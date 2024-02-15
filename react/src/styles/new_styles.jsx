import styled from "styled-components";

export const HeaderLayout = styled.header`
  min-width: 1200px;
`;

export const HeaderBannerWrapper = styled.div`
  width: 100%;
  background-color: blue;
`;
export const HeaderBannerBox = styled.div`
  width: 1140px;
  height: 70px;
  margin: 0 auto;
  background-color: skyblue;
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
    color: #777;
  }
`;

export const HeaderSubMenuWrapper = styled.div`
  position: absolute;
`;

export const HeaderSubMenuBox = styled.dl`
  display: block;
  position: relative;
  left: 0px;
  top: 20px;
  width: 80px;
  padding: 1rem;
  border: 1px solid #333;
  border-bottom: 3px solid #111;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
`;

export const HeaderSubMenuCols = styled.ul`
  display: flex;
  flex-direction: column;
`;
export const HeaderSubMenuItem = styled.li`
  position: relative;
  font-size: 13px;
  line-height: 1.5rem;
`;

export const HeaderSubMenuText = styled.span``;
