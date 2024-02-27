import React from "react";
import * as S from "../../styles/new_styles";
import logo_sample from "../../assets/logo_sample.png";

const EditorHeader = ({ functions, zoom, setZoom }) => {
  return (
    <S.EHLayout>
      <S.EHWrapper>
        <S.HeaderLogoBox img={logo_sample} />
        <S.EHBtnBox>
          <S.Btn>이전</S.Btn>
          <S.Btn>이후</S.Btn>
          <S.Btn onClick={functions.handleDeleteSelected}>삭제</S.Btn>
          {/* <input
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
        />
        <button onClick={functions.handleExport}>Export Canvas</button>
        <button onClick={functions.handleAddCircle}>Add circle</button>
        <button onClick={functions.handleAddRectangle}>Add Rectangle</button>
        <button onClick={functions.handleDeleteSelected}>
          Delete Selected
        </button>
        <button onClick={functions.handleDeleteAll}>Delete All</button> */}
        </S.EHBtnBox>
      </S.EHWrapper>
    </S.EHLayout>
  );
};

export default EditorHeader;
