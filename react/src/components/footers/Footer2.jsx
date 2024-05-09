import React, { useState } from "react";
import * as S from "../../styles/new_styles";

import facebook_static from "../../assets/icons/facebook_static.png";
import facebook_animated from "../../assets/icons/facebook_animated.gif";
import insta_static from "../../assets/icons/insta_static.png";
import insta_animated from "../../assets/icons/insta_animated.gif";
import youtube_static from "../../assets/icons/youtube_static.png";
import youtube_animated from "../../assets/icons/youtube_animated.gif";
import { Link } from "react-router-dom";

const Footer2 = ({ openPopup2 }) => {
  const [facebookIcon, setFacebookIcon] = useState(facebook_static);
  const [instaIcon, setInstaIcon] = useState(insta_static);
  const [youtubeIcon, setYoutubeIcon] = useState(youtube_static);

  const handleSnsOver = (name) => {
    switch (name) {
      case "facebook":
        setFacebookIcon(facebook_animated);
        break;
      case "insta":
        setInstaIcon(insta_animated);
        break;

      case "youtube":
        setYoutubeIcon(youtube_animated);
        break;
      default:
        break;
    }
  };

  const handleSnsLeave = (name) => {
    switch (name) {
      case "facebook":
        setFacebookIcon(facebook_static);
        break;
      case "insta":
        setInstaIcon(insta_static);
        break;

      case "youtube":
        setYoutubeIcon(youtube_static);
        break;
      default:
        break;
    }
  };

  return (
    <S.FooterLayout>
      <S.FooterContainer>
        <S.FooterBtnWrapper>
          <S.FooterBtnBox>
            <S.FooterBtnList>
              <S.FooterBtnItem>
                <S.FooterBtnText>회사소개</S.FooterBtnText>
              </S.FooterBtnItem>
              <S.FooterBtnItem>
                <S.FooterBtnText>고객센터</S.FooterBtnText>
              </S.FooterBtnItem>
              <S.FooterBtnItem>
                <S.FooterBtnText onClick={() => openPopup2(0)}>
                  이용약관
                </S.FooterBtnText>
              </S.FooterBtnItem>
              <S.FooterBtnItem>
                <S.FooterBtnText onClick={() => openPopup2(1)}>
                  개인정보처리방침
                </S.FooterBtnText>
              </S.FooterBtnItem>
              <S.FooterBtnItem>
                <Link to={"/notice"}>
                  <S.FooterBtnText>공지사항</S.FooterBtnText>
                </Link>
              </S.FooterBtnItem>
              <S.FooterBtnItem>
                <Link to={"/intro0"}>
                  <S.FooterBtnText>오시는길</S.FooterBtnText>
                </Link>
              </S.FooterBtnItem>
            </S.FooterBtnList>
            <S.FooterSnsList>
              <S.FooterSnsItem
                onMouseOver={() => {
                  handleSnsOver("facebook");
                }}
                onMouseLeave={() => {
                  handleSnsLeave("facebook");
                }}
              >
                <S.FooterSnsIcon icon={facebookIcon} />
              </S.FooterSnsItem>
              <S.FooterSnsItem
                onMouseOver={() => {
                  handleSnsOver("insta");
                }}
                onMouseLeave={() => {
                  handleSnsLeave("insta");
                }}
              >
                <S.FooterSnsIcon icon={instaIcon} />
              </S.FooterSnsItem>
              <S.FooterSnsItem
                onMouseOver={() => {
                  handleSnsOver("youtube");
                }}
                onMouseLeave={() => {
                  handleSnsLeave("youtube");
                }}
              >
                <S.FooterSnsIcon icon={youtubeIcon} />
              </S.FooterSnsItem>
            </S.FooterSnsList>
          </S.FooterBtnBox>
        </S.FooterBtnWrapper>
        <S.FooterAboutWrapper>
          <S.FooterAboutText>
            ㈜ 스노우화이트 대표이사 이규민 사업자등록번호 636-81-02878
            {/* 통신판매신고 2024-경기고양-0000 */}
          </S.FooterAboutText>
          <S.FooterAboutText>
            개인정보보호책임자 : 김태균 | 경기도 고양시 일산동구 장대길 42-17
            {/* 고객만족센터 1588-0000 */}
          </S.FooterAboutText>
          <S.FooterAboutText>
            Copyright ⓒ 2024. ㈜ 스노우화이트. All rights reserved. icons by{" "}
            <S.FooterLicenseLink href="https://icons8.com/">
              Icons8
            </S.FooterLicenseLink>
          </S.FooterAboutText>
        </S.FooterAboutWrapper>
      </S.FooterContainer>
    </S.FooterLayout>
  );
};

export default Footer2;
