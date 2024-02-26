import React from "react";
import * as S from "../styles/new_styles";
import NoticeBoard from "../components/board/NoticeBoard";

const NoticePage = () => {
  return (
    <S.MainLayout>
      <S.MainSection>
        <S.NoticeWrapper>
          <S.NoticeTitleBox>
            <h1>공지사항</h1>
          </S.NoticeTitleBox>
          <S.NoticeBoardBox>
            <NoticeBoard />
          </S.NoticeBoardBox>
        </S.NoticeWrapper>
      </S.MainSection>
    </S.MainLayout>
  );
};

export default NoticePage;
