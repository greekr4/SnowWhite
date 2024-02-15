import styled from "styled-components";
import tw from "tailwind-styled-components";

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

export const Product_Detail_SliderBox = styled.div`
  width: calc(1200px * 0.6);
  height: ${(props) => (props.height ? props.height : "700px")};
`;

export const Product_Detail_SliderImgBox = styled.div`
  height: 750px;
`;

export const Product_Detail_SliderImg = styled.img`
  width: 100%;
  height: 700px;
`;

export const SliderImgBox = styled.div`
  width: 100%;
  height: 600px;
`;

export const SliderImg = styled.img`
  width: 100%;
  height: 600px;
`;

export const PageWrap = styled.div`
  padding-top: 100px;
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

///////////////////////// 헤더2

export const Hd2_wrap = styled.div`
  position: fixed;
  width: 100%;
  z-index: 999;
  background-color: hsla(0, 0%, 100%, 0.99);
  box-shadow: 1px 4px 15px hsla(0, 0%, 82.4%, 0.42);
  /* font-family: "Gothic A1", sans-serif; */
`;

export const Hd2_noti = styled.div`
  position: fixed;
  background-color: rgb(80, 55, 149);
  width: 100%;
  text-align: center;
  transition: all 0.1s ease;
  &.show {
    height: 30px;
  }
  &.hide {
    height: 0px;
  }
`;

export const Hd2_noti_span = styled.span`
  color: #fff;
  font-size: 18px;
  font-weight: 550;
  line-height: 30px;
`;

export const Hd2_nav = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  transition: all 0.3s ease;
  height: 70px;
  &.show {
    margin-top: 30px;
  }
  &.hide {
    margin-top: 0px;
  }
`;

export const Hd2_nav_container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 1rem;
  height: 70px;
`;

export const Hd2_nav_logo_box = styled.div`
  width: 15%;
  text-align: center;
`;

export const Hd2_nav_logo_img = styled.img``;

export const Hd2_nav_menu_box = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 85%;
`;

export const Hd2_nav_menu_ul = styled.ul`
  display: flex;
`;

export const Hd2_nav_menu_li = styled.li`
  padding-left: 1.2rem;
  padding-right: 1.2rem;
`;

export const Hd2_nav_menu_a = styled.a`
  cursor: pointer;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  font-size: 18px;
  font-weight: 600;
  &:hover {
    border-bottom: 4px solid #000;
  }
`;

export const Hd2_nav_menu_img = styled.img`
  display: block;
  width: 20px;
  height: 25px;
  transition: 0.3s ease;
  &:hover {
    opacity: 0.3;
  }
`;

export const Hd2_sub_menu_content = styled.div`
  display: none;
  position: absolute;
  background-color: #fff;
  width: 100%;
  left: 0;
  margin: 0;
  margin-top: 22px;
  box-shadow: 3px 3px 15px rgba(35, 31, 32, 0.14);
  z-index: 1;
  padding: 30px 0;

  &.show {
    display: block;
  }
  &.hide {
    display: none;
  }
`;

export const Hd2_sub_menu_container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  max-width: 960px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

export const Hd2_sub_menu_container_prod = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  max-width: 960px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

export const Hd2_sub_menu_prod_cate_box = styled.div`
  margin-left: 1%;
  margin-right: 1%;
  width: 23%;
  box-sizing: border-box;
  padding-bottom: 2rem;
`;

export const Hd2_sub_menu_prod_cate_main = styled.div`
  font-size: 1.7rem;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  padding-left: 2rem;
  color: cornflowerblue;
  font-weight: 550;
`;
export const Hd2_sub_menu_prod_cate_sub = styled.div`
  padding-bottom: 0.3rem;
  padding-left: 2rem;
  font-weight: 550;
`;

export const Hd2_sub_menu_about_box = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  width: 20%;
  cursor: pointer;
`;
export const Hd2_sub_menu_about_title = styled.span`
  font-family: "Gothic A1", sans-serif;
  font-weight: 600;
`;

export const Hd2_sub_menu_about_imgbox = styled.div`
  background: #f4f5f6;
  width: 100%;
  overflow: hidden;
  margin-top: 0.5rem;
`;

export const Hd2_sub_menu_about_img = styled.img`
  width: 100%;
  height: 100px;
  transition: all 0.3s ease-in, all 0.3s ease-out;
  &:hover {
    transform: scale(0.9);
  }
`;

///////////////////////// 팝업

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
`;

////////////////////////////////////////////////////

export const Product_Title_Wrap = styled.div``;
export const Product_Title = styled.div`
  text-align: center;
  font-size: 2rem;
  padding-bottom: 3rem;
`;

export const Product_Main_Section = styled.section`
  display: block;
  max-width: 1200px;
  margin: 5rem auto;
`;
export const Product_ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Product_Item_Wrap = styled.div`
  flex-basis: 30%;
  margin: 1.5%;
  margin-bottom: 5rem;
  @media (max-width: 1200px) {
    flex-basis: 45%;
    margin: 2.5%;
  }
`;

export const Product_Item_Image = styled.div`
  width: 100%;
  height: 360px;
  background-color: black;
`;

export const Product_Item_Title = styled.div`
  padding: 1.5rem 0 0.5rem 0;
  font-family: YoonGothicPro740;
  font-size: 18px;
  color: rgb(25, 25, 25);
`;

export const Product_Item_Desc = styled.div`
  font-size: 14px;
  color: #888;
`;

export const Product_Detail_Section = styled.section`
  max-width: 1200px;
  margin: 5rem auto;
`;
export const Product_Detail_Box = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
`;
export const Product_Detail_Img_Wrap = styled.div`
  flex-basis: 60%;
`;
export const Product_Detail_Option_Wrap = styled.div`
  flex-basis: 35%;
`;

export const Product_Detail_Option_Prod_Title = styled.div``;
export const Product_Detail_Option_Box = styled.div``;
export const Product_Detail_Option_Title = styled.div`
  font-size: 22px;
  font-weight: 600;
`;

export const Product_Detail_Option_ItemBox = styled.div`
  margin-top: 1rem;
`;
export const Product_Detail_Option_ItemText = styled.div`
  color: #333;
  font-size: 0.8rem;
`;
export const Product_Detail_Option_ButtonBox = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 420px;
`;
export const Product_Detail_Option_Button = styled.button`
  cursor: pointer;
  border: 1px solid #ddd;
  background: none;
  color: #333;
  width: 100px;
  height: 40px;
  margin-right: 5px;
  margin-bottom: 5px;
  box-sizing: border-box;

  &.selected {
    border: 1px solid #111;
  }
`;

export const Product_Detail_Option_Button_Span = styled.span`
  font-size: 12px;
  display: inline-block;
  /* max-width: 100px;
  word-wrap: break-word; */
`;
