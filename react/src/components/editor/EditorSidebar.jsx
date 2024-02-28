import React from "react";
import * as S from "../../styles/new_styles";
const EditorSidebar = ({ functions }) => {
  return (
    <S.ESideBtnBox>
      <S.Btn onClick={functions.handleAddCircle}>원</S.Btn>
      <S.Btn onClick={functions.handleAddRectangle}>사각형</S.Btn>
      <S.Btn
        onClick={() => {
          functions.handleAddText("dd");
        }}
      >
        텍스트
      </S.Btn>
      <S.Btn onClick={functions.handleAddImgText}>이미지</S.Btn>
    </S.ESideBtnBox>
  );
};

export default EditorSidebar;
