import styled from "styled-components";

export const Hd_top = styled.div`
  max-height: 1000000px;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  outline: none;
  scroll-behavior: smooth;
`;

export const Hd_top_inner = styled.div`
  text-align: right;
  max-width: 1200px;
  margin: 0 auto;
  padding: 13px 0 10px;
`;

export const Hd_top_ul = styled.ul`
  display: inline-block;
`;

export const Hd_top_li = styled.li`
  float: left;
  margin-right: 15px;
  padding-right: 15px;
  position: relative;
  list-style: none;

  &:last-child::after {
    content: none;
  }

  &::after {
    content: "";
    position: absolute;
    width: 2px;
    height: 9px;
    right: 0;
    top: 50%;
    margin-top: -4.5px;
    background: linear-gradient(to left, #b0afaf 50%, #edebeb 50%);
  }
`;

export const Hd_top_a = styled.a`
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #5c5d5d;
`;

export const Hd_mid = styled.div`
  position: relative;
  background: #fff;
  z-index: 1;
`;

export const Hd_mid_inner = styled.div`
  width: 100%;
  height: 50px;
  max-width: 1200px;
  margin: 0 auto;
  border-bottom: 4px solid #64149b;
  padding: 15px 0 35px;
`;

export const Hd_mid_menu = styled.div`
  float: left;
  margin-left: 2rem;
`;

export const Hd_mid_logo = styled.h1`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
`;
export const Hd_mid_icons = styled.ul`
  float: right;
  margin-right: 2rem;
`;

export const Hd_mid_icon = styled.li`
  display: inline-block;
  margin-right: 20px;
  position: relative;
`;

export const Hd_bot = styled.div`
  position: relative;
  background: #fff;
  transition: all 0.3s;
`;
export const Hd_bot_inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  border-bottom: 1px solid #ebebeb;
`;
export const Hd_bot_gnbBox = styled.div`
  margin: 10px 50px;
`;
export const Hd_bot_gnb = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 40px;
`;
export const Hd_bot_menu = styled.div`
  display: block;
  text-align: center;
  position: relative;
  overflow: hidden;
  font-size: 1.25rem;
  font-weight: 550;
`;

export const Ft_top = styled.div`
  position: relative;
  background: #444;
`;
export const Ft_top_inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
export const Ft_top_utillBox = styled.div`
  display: inline-flex;
  width: 70%;
  height: 50px;
  color: #ccc;
  justify-content: flex-start;
  align-items: center;
`;
export const Ft_top_utill = styled.div`
  margin-left: 2rem;
  font-weight: 530;
  font-size: 1rem;
`;
export const Ft_top_snsBox = styled.div`
  display: inline-flex;
  width: 30%;
  height: 50px;
  color: #ccc;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  padding-right: 2rem;
`;
export const Ft_top_sns = styled.div`
  margin: 1rem;
`;

export const Ft_mid = styled.div`
  position: relative;
  background: #fff;
`;
export const Ft_mid_inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 9rem;
  border-bottom: 1px solid #ebebeb;
`;
export const Ft_mid_infoBox = styled.div`
  display: flex;
  align-items: center;
`;
export const Ft_mid_infoLeft = styled.div`
  & :first-child {
    margin-top: 1.5rem;
  }
  & :last-child {
    margin-top: 1rem;
  }
  width: 80%;
`;
export const Ft_mid_infoRight = styled.div`
  width: 20%;
`;

export const Ft_mid_infoText = styled.div``;

export const Ft_mid_mainTel = styled.div`
  font-size: 2rem;
  font-weight: 500;
  margin: 1rem auto;
`;

export const Ft_mid_telTextBox = styled.div`
  display: flex;
`;

export const Ft_mid_telText01 = styled.div`
  display: inline-block;
  width: 50%;
`;
export const Ft_mid_telText02 = styled.div`
  display: inline-block;
  width: 50%;
`;

export const Ft_bot = styled.div`
  position: relative;
  background: #fff;
`;
export const Ft_bot_inner = styled.div`
  max-width: 1200px;
  margin: 1rem auto;
`;
export const Ft_bot_Logo = styled.div`
  text-align: center;
  font-size: 2rem;
`;

export const SliderBox = styled.div`
  width: 100%;
  height: ${(props) => (props.height ? props.height : "700px")};
`;

export const SliderImgBox = styled.div`
  width: 100%;
  height: 600px;
`;

export const SliderImg = styled.img`
  width: 100%;
  height: 600px;
`;

export const MainSection = styled.section`
  width: 100%;
  background-color: ${(props) => (props.bgc ? props.bgc : "#fff")};
`;

export const MainInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const MainTitle = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  color: cadetblue;
  margin-bottom: 3rem;
`;

export const PickSliderBox = styled.div`
  width: 100%;
  height: 500px;
`;

export const PickItemBox = styled.div`
  width: 90%;
  height: 400px;
  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid #fbfbfc;
  transition: all 0.3s;
  &:hover {
    box-sizing: border-box;
    border: 1px solid #fbfbfc;
    box-shadow: 10px 5px 10px rgba(0, 0, 0, 0.14);
  }
`;

export const PickItemImg = styled.div`
  background-image: url(${(props) => (props.img ? props.img : "None")});
  background-position: center;
  background-size: cover;
  width: 100%;
  box-sizing: border-box;
  height: 240px;
`;

export const PickItemTextBox = styled.div`
  margin: 1rem;
`;
export const PickItemTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;
export const PickItemSub = styled.div`
  margin-top: 0.8rem;
  font-size: 0.8rem;
  color: #333;
`;
export const PickItemRead = styled.div`
  margin-top: 1.7rem;
  font-size: 1.2rem;
  color: cadetblue;

  &::after {
    margin-left: 1rem;
    content: ">";
  }
`;

export const WhyItemBox = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const WhyItem = styled.div`
  width: 25%;
`;
export const WhyItemIcon = styled.div`
  background-image: url(${(props) => (props.img ? props.img : "None")});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100px;
  margin-bottom: 1rem;
`;
export const WhyItemTitle = styled.div`
  text-align: center;
  font-size: 1.7rem;
  font-weight: 550;
`;
export const WhyItemSub = styled.div`
  text-align: center;
  font-size: 1rem;
  font-weight: 540;
`;

export const ServiceItemBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e2e1;
`;
export const ServiceItem = styled.div`
  width: 20%;
`;
export const ServiceItemIcon = styled.div`
  background-image: url(${(props) => (props.img ? props.img : "None")});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 50px;
  margin-bottom: 1rem;
`;
export const ServiceItemTitle = styled.div`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 550;
`;

export const BoardItemBox = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const BoardItem = styled.div`
  width: 45%;
`;
export const BoardItemTopBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
`;
export const BoardItemTopTitle = styled.div`
  width: 80%;
  font-size: 1.5rem;
  font-weight: 550;
`;
export const BoardItemTopReadMore = styled.div`
  width: 20%;
  font-size: 1rem;
  font-weight: 550;
  color: #777;
  &::after {
    content: ">";
    margin-left: 1rem;
  }
`;
export const BoardItemPostBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem;
  margin-bottom: 0.8rem;
`;
export const BoardItemPostTitle = styled.div`
  width: 80%;
`;
export const BoardItemPostDate = styled.div`
  width: 20%;
  margin-right: 1rem;
  color: #777;
`;
