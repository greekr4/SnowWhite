import React from "react";
import * as S from "../styles/new_styles";
import GlobalTable from "../components/global/GlobalTable";
import NoticeBoard from "../components/board/NoticeBoard";

const NoticePage = () => {
  return (
    <S.MainLayout>
      <S.MainSection>
        <NoticeBoard></NoticeBoard>
      </S.MainSection>
    </S.MainLayout>
  );
};

export default NoticePage;
