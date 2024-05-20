import React, { useState } from "react";
import * as S from "../styles/new_styles";

import GlobalBoard from "../components/board/GlobalBoard";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import CsBoard from "../components/board/CsBoard";

const CsPage = () => {
  const [boardType, setBoardType] = useState("CS");

  return (
    <S.MainLayout>
      <S.MainSection>
        <S.NoticeWrapper>
          <S.CartTopTitleBox>
            <h1>고객센터</h1>
            <p>스노우플래닛의 고객센터 입니다.</p>
          </S.CartTopTitleBox>
          <Box sx={{ marginBottom: "16px" }}>
            <ToggleButtonGroup
              color="primary"
              value={boardType}
              exclusive
              onChange={(e) => {
                setBoardType(e.target.value);
              }}
              aria-label="Platform"
              style={{ width: "100%" }}
              className="group"
            >
              <ToggleButton
                value={"CS"}
                color="secondary"
                //sx={{ width: "100px" }}
                fullWidth
              >
                FAQ
              </ToggleButton>
              <ToggleButton
                value={"ZZ"}
                color="secondary"
                //sx={{ width: "100px" }}
                fullWidth
              >
                1:1문의
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <S.NoticeBoardBox>
            {boardType === "CS" ? (
              <>
                <GlobalBoard boardType={"FAQ"} />
              </>
            ) : (
              <>
                <CsBoard boardType={"CS"} />
              </>
            )}
          </S.NoticeBoardBox>
        </S.NoticeWrapper>
      </S.MainSection>
    </S.MainLayout>
  );
};

export default CsPage;
