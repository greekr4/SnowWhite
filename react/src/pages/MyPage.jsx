import React from "react";
import * as S from "../styles/new_styles";

const MyPage = () => {
  return (
    <S.MainLayout>
      <S.MainSection bgc="aliceblue">
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
      <S.MainSection>
        <S.MyPageStateWrapper>
          <S.MyPageStateTitleBox>
            <h1>진행중인 주문</h1>
            <p>* 발송완료는 최근 7일 이내 발송완료된 주문건수입니다.</p>
          </S.MyPageStateTitleBox>
          <S.MyPageStateCellBox>
            <h1>주문 상품</h1>
            <S.MyPageStateCellList>
              <S.MyPageStateCellItem>
                <h1>주문접수</h1>
                <p>2</p>
              </S.MyPageStateCellItem>
              <S.MyPageStateCellItem>
                <h1>결제대기</h1>
                <p>0</p>
              </S.MyPageStateCellItem>
              <S.MyPageStateCellItem>
                <h1>결제완료</h1>
                <p>2</p>
              </S.MyPageStateCellItem>
              <S.MyPageStateCellItem>
                <h1>시안확인중</h1>
                <p>1</p>
              </S.MyPageStateCellItem>
              <S.MyPageStateCellItem>
                <h1>제작진행</h1>
                <p>1</p>
              </S.MyPageStateCellItem>
              <S.MyPageStateCellItem>
                <h1>발송완료</h1>
                <p>3</p>
              </S.MyPageStateCellItem>
            </S.MyPageStateCellList>
          </S.MyPageStateCellBox>
          <S.MyPageStateCellBox>
            <S.MyPageStateCardList>
              <S.MyPageStateCardItem>
                <h1>장바구니</h1>
                <p>2건</p>
              </S.MyPageStateCardItem>
              <S.MyPageStateCardItem>
                <h1>주문진행</h1>
                <p>1건</p>
              </S.MyPageStateCardItem>
              <S.MyPageStateCardItem>
                <h1>고객문의</h1>
                <p>0건</p>
              </S.MyPageStateCardItem>
              <S.MyPageStateCardItem>
                <h1>세금계산서</h1>
                <p>신청하기</p>
              </S.MyPageStateCardItem>
            </S.MyPageStateCardList>
          </S.MyPageStateCellBox>
        </S.MyPageStateWrapper>
      </S.MainSection>
      <S.MainSection>
        <S.MyPageStateEditWrapper>
          <S.MyPageStateEditBox>
            <h1>회원정보수정</h1>
            <table>
              <tbody>
                <tr>
                  <th>아이디</th>
                  <td>
                    <input value="snowwhite"></input>
                  </td>
                </tr>
                <tr>
                  <th>이름</th>
                  <td>
                    <input value="김태균"></input>
                  </td>
                </tr>
                <tr>
                  <th>비밀번호</th>
                  <td>
                    <input value="*******"></input>
                  </td>
                </tr>
                <tr>
                  <th>비밀번호 확인</th>
                  <td>
                    <input value="*******"></input>
                  </td>
                </tr>
                <tr>
                  <th>휴대폰번호</th>
                  <td>
                    <input className="tel" value="010"></input>
                    <input className="tel" value="1234"></input>
                    <input className="tel" value="5678"></input>
                  </td>
                </tr>
                <tr>
                  <th>전화번호</th>
                  <td>
                    <input className="tel" value="031"></input>
                    <input className="tel" value="123"></input>
                    <input className="tel" value="4567"></input>
                  </td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td>
                    <input className="email" value="snow"></input>
                    <span>@</span>
                    <input className="email" value="naver.com"></input>
                  </td>
                </tr>
              </tbody>
            </table>
            <S.MyPageStateEditBtns>
              <S.Btn
                className="edit"
                btnBgc="#469cff"
                fontColor="#fff"
                btnBgcHover="#7cb9ff"
                borderCHover="none"
              >
                변경
              </S.Btn>
              <S.Btn className="cancle">취소</S.Btn>
            </S.MyPageStateEditBtns>
          </S.MyPageStateEditBox>
          <S.MyPageStateEditDeliveryBox>
            <h1>배송지 관리</h1>
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox"></input>
                  </th>
                  <th>배송지명</th>
                  <th>받는사람</th>
                  <th>주소</th>
                  <th>연락처</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="checkbox"></input>
                  </td>
                  <td>배송지1</td>
                  <td>홍길동</td>
                  <td>경기도 고양시 일산동구 장대길 12-34</td>
                  <td>010-1234-5678</td>
                  <td>
                    <S.Btn>삭제</S.Btn>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox"></input>
                  </td>
                  <td>배송지1</td>
                  <td>홍길동</td>
                  <td>경기도 고양시 일산동구 장대길 12-34</td>
                  <td>010-1234-5678</td>
                  <td>
                    <S.Btn>삭제</S.Btn>
                  </td>
                </tr>
              </tbody>
            </table>
            <S.MyPageStateEditBtns>
              <S.Btn className="del">선택 삭제</S.Btn>
              <S.Btn
                className="add"
                btnBgc="#469cff"
                fontColor="#fff"
                btnBgcHover="#7cb9ff"
                borderCHover="none"
                width="75px"
              >
                추가
              </S.Btn>
            </S.MyPageStateEditBtns>
          </S.MyPageStateEditDeliveryBox>
        </S.MyPageStateEditWrapper>
      </S.MainSection>
    </S.MainLayout>
  );
};

export default MyPage;
