import React from "react";
import * as S from "../../styles/new_styles";

const AdminSideBar = () => {
  return (
    <S.AdminSideBarWrapper>
      <S.AdminSideBarBox>
        <ul>
          <li>
            <span>홈</span>
            <ul>
              <li>대시보드</li>
            </ul>
          </li>
          <li>
            <span>주문</span>
            <ul>
              <li>주문 관리</li>
            </ul>
          </li>
          <li>
            <span>상품</span>
            <ul>
              <li>상품 관리</li>
              <li>옵션 관리</li>
              <li>카테고리 관리</li>
            </ul>
          </li>
          <li>
            <span>게시판</span>
            <ul>
              <li>게시판 관리</li>
            </ul>
          </li>
          <li>
            <span>회원</span>
            <ul>
              <li>회원 관리</li>
            </ul>
          </li>
        </ul>
      </S.AdminSideBarBox>
    </S.AdminSideBarWrapper>
  );
};

export default AdminSideBar;
