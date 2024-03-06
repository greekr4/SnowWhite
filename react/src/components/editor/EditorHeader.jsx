import React from "react";
import * as S from "../../styles/new_styles";
import logo_sample from "../../assets/logo_sample.png";

//이미지로드
const imagesContext = require.context(
  "../../assets/editor/icon",
  false,
  /\.(png|jpg|jpeg|gif)$/
);
const imageNames = imagesContext.keys();
//

const EditorHeader = ({ functions, zoom, setZoom, isAddVisible }) => {
  return (
    <S.EHLayout>
      <S.EHWrapper>
        <S.EHTopBox>
          <S.HeaderLogoBox img={logo_sample} height="60px" />
          <span>직접 디자인하기</span>
        </S.EHTopBox>
        <S.EHBotBox className={isAddVisible ? "side-open" : "side-close"}>
          <S.EHBtnBox>
            <S.Glob_Icon
              icon={imagesContext("./undo.png")}
              width="25px"
              height="25px"
              margin="0 0 0 1rem"
              cursor="pointer"
              onClick={functions.undo}
            />
            <S.Glob_Icon
              icon={imagesContext("./redo.png")}
              width="25px"
              height="25px"
              margin="0 0 0 1rem"
              cursor="pointer"
              onClick={functions.redo}
            />
            <S.V_Bar />
            <S.Glob_Icon
              icon={imagesContext("./grid.png")}
              width="25px"
              height="25px"
              cursor="pointer"
              onClick={functions.addGridLayout}
            />
            <S.V_Bar />
            <S.Glob_Icon
              icon={imagesContext("./zoom_out.png")}
              width="20px"
              height="20px"
              cursor="pointer"
              onClick={() => {
                if (zoom > 0.6) {
                  setZoom(zoom - 0.1);
                }
              }}
            />
            <label
              style={{
                fontSize: "0.75rem",
                padding: "0 0.25rem 0.1rem 0.25rem",
                width: "40px",
              }}
            >
              {Math.round(zoom * 100)}%
            </label>
            <S.Glob_Icon
              icon={imagesContext("./zoom_in.png")}
              width="20px"
              height="20px"
              cursor="pointer"
              onClick={() => {
                if (zoom < 2) {
                  setZoom(zoom + 0.1);
                }
              }}
            />
            <S.V_Bar />
            <S.Glob_Icon
              icon={imagesContext("./file.png")}
              width="25px"
              height="25px"
              cursor="pointer"
              onClick={functions.handleExport}
            />
            <S.Btn onClick={functions.testSave}>save</S.Btn>
          </S.EHBtnBox>
        </S.EHBotBox>
      </S.EHWrapper>
    </S.EHLayout>
  );
};

export default EditorHeader;
