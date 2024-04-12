import React from "react";
import * as S from "../styles/new_styles";
import NoticeBoard from "../components/board/NoticeBoard";

const CsPage = () => {
  return (
    <S.MainLayout>
      <S.MainSection>
        <S.NoticeWrapper>
          <S.CartTopTitleBox>
            <h1>고객센터</h1>
            <p>스노우화이트의 고객센터 입니다.</p>
          </S.CartTopTitleBox>
          <S.NoticeBoardBox>
            <NoticeBoard />
          </S.NoticeBoardBox>
        </S.NoticeWrapper>
      </S.MainSection>
    </S.MainLayout>
  );
};

export default CsPage;