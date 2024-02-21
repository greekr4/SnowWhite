import React from "react";
import * as S from "../styles/new_styles";

const MyPage = () => {
  return (
    <S.MainLayout>
      <S.MainSection bgc="#dae5ff">
        <S.MyPageTopWrapper>
          <S.MyPageTopBox>
            <S.MyPageTopLeft>
              <S.MyPageUserInfoBox>
                <S.MyPageUserInfoIcon></S.MyPageUserInfoIcon>
                <S.MyPageUserInfoTextBox>
                  <h1>개인회원</h1>
                  <h2>김태균</h2>
                  <h3>기본배송지</h3>
                  <h4>경기도 고양시 일산동구 장대길 00-00</h4>
                </S.MyPageUserInfoTextBox>
              </S.MyPageUserInfoBox>
              <S.MyPageUserBtnBox>
                <S.Btn>회원 등급</S.Btn>
                <S.Btn>정보 수정</S.Btn>
                <S.Btn>배송지 관리</S.Btn>
              </S.MyPageUserBtnBox>
            </S.MyPageTopLeft>
            <S.MyPageTopRight>
              <S.MyPageCardBox>
                <S.MyPageCardItem>
                  <h1>포인트</h1>
                  <h2>12,345</h2>
                  <h3>0</h3>
                </S.MyPageCardItem>
                <S.MyPageCardItem>
                  <h1>쿠폰</h1>
                  <h4>1</h4>
                  <h5>0</h5>
                </S.MyPageCardItem>
              </S.MyPageCardBox>
            </S.MyPageTopRight>
          </S.MyPageTopBox>
        </S.MyPageTopWrapper>
      </S.MainSection>
    </S.MainLayout>
  );
};

export default MyPage;
