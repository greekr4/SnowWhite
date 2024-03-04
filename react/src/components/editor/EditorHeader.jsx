import React from "react";
import * as S from "../../styles/new_styles";
import logo_sample from "../../assets/logo_sample.png";

const EditorHeader = ({ functions, zoom, setZoom }) => {
  return (
    <S.EHLayout>
      <S.EHWrapper>
        <S.HeaderLogoBox img={logo_sample} />
        <S.EHBtnBox>
          <label htmlFor="">{Math.round(100 * zoom)}%</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
          />
          <S.Btn onClick={functions.undo}>실행 취z소</S.Btn>

          <S.Btn onClick={functions.testSave}>저장</S.Btn>
          <S.Btn onClick={functions.testLoad}>불러오기</S.Btn>
          <S.Btn onClick={functions.handleExport}>파일</S.Btn>
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
