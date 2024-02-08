import * as S from "../styles/styles";
import { BsInstagram } from "react-icons/bs";
import { SiKakaotalk, SiNaver } from "react-icons/si";

const Footer = () => {
  return (
    <>
      <S.Ft_top>
        <S.Ft_top_inner>
          <S.Ft_top_utillBox>
            <S.Ft_top_utill>회사소개</S.Ft_top_utill>
            <S.Ft_top_utill>이용약관</S.Ft_top_utill>
            <S.Ft_top_utill>개인정보처리방침</S.Ft_top_utill>
            <S.Ft_top_utill>무단이메일수집거부</S.Ft_top_utill>
            <S.Ft_top_utill>구매안전(에스크로)</S.Ft_top_utill>
          </S.Ft_top_utillBox>
          <S.Ft_top_snsBox>
            <S.Ft_top_sns>
              <BsInstagram size={20} />
            </S.Ft_top_sns>
            <S.Ft_top_sns>
              <SiKakaotalk size={20} />
            </S.Ft_top_sns>
            <S.Ft_top_sns>
              <SiNaver size={20} />
            </S.Ft_top_sns>
          </S.Ft_top_snsBox>
        </S.Ft_top_inner>
      </S.Ft_top>
      <S.Ft_mid>
        <S.Ft_mid_inner>
          <S.Ft_mid_infoBox>
            <S.Ft_mid_infoLeft>
              <S.Ft_mid_infoText>(주)스노우화이트</S.Ft_mid_infoText>
              <S.Ft_mid_infoText>본사 : 경기도 고양시</S.Ft_mid_infoText>
              <S.Ft_mid_infoText>
                COPYRIGHTⓒ SNOWWHITE CO.LTD. ALL RIGHTS RESERVED
              </S.Ft_mid_infoText>
            </S.Ft_mid_infoLeft>
            <S.Ft_mid_infoRight>
              <S.Ft_mid_mainTel>031-1234-5678</S.Ft_mid_mainTel>
              <S.Ft_mid_telTextBox>
                <S.Ft_mid_telText01>평일(월~금)</S.Ft_mid_telText01>
                <S.Ft_mid_telText02>09:30 ~ 18:30</S.Ft_mid_telText02>
              </S.Ft_mid_telTextBox>
              <S.Ft_mid_telTextBox>
                <S.Ft_mid_telText01>점심시간</S.Ft_mid_telText01>
                <S.Ft_mid_telText02>12:30 ~ 13:30</S.Ft_mid_telText02>
              </S.Ft_mid_telTextBox>
            </S.Ft_mid_infoRight>
          </S.Ft_mid_infoBox>
        </S.Ft_mid_inner>
      </S.Ft_mid>
      <S.Ft_bot>
        <S.Ft_bot_inner>
          <S.Ft_bot_Logo>스노우화이트</S.Ft_bot_Logo>
        </S.Ft_bot_inner>
      </S.Ft_bot>
    </>
  );
};

export default Footer;
