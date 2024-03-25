import React, { useState } from "react";
import * as S from "../../styles/new_styles";
import EditorSideAddtion from "./EditorSideAddtion";

const EditorSidebar = ({
  functions,
  isAddVisible,
  setIsAddVisible,
  editor,
  myRef,
}) => {
  const [type, setType] = useState();

  const handleClick = (value) => {
    if (value === type && isAddVisible) {
      setIsAddVisible(false);
    } else {
      setIsAddVisible(true);
      setType(value);
    }
  };

  //이미지로드
  const imagesContext = require.context(
    "../../assets/editor/icon",
    false,
    /\.(png|jpg|jpeg)$/
  );
  const imageNames = imagesContext.keys();
  //

  return (
    <>
      <S.ESWrapper>
        <S.ESideBtnBox>
          <S.ESideBtnItem
            onClick={() => {
              handleClick("shapes");
            }}
          >
            <S.Glob_Icon
              icon={imagesContext("./shapes.png")}
              width="30px"
              height="30px"
            />
            <p>도형</p>
          </S.ESideBtnItem>
          <S.ESideBtnItem
            onClick={() => {
              handleClick("clipart");
            }}
          >
            <S.Glob_Icon
              icon={imagesContext("./clipart.png")}
              width="30px"
              height="30px"
            />
            <p>클립아트</p>
          </S.ESideBtnItem>
          <S.ESideBtnItem
            onClick={() => {
              handleClick("background");
            }}
          >
            <S.Glob_Icon
              icon={imagesContext("./background.png")}
              width="30px"
              height="30px"
            />
            <p>배경</p>
          </S.ESideBtnItem>
          <S.ESideBtnItem onClick={editor?.functions.createText}>
            <S.Glob_Icon
              icon={imagesContext("./textbox.png")}
              width="30px"
              height="30px"
            />
            <p>텍스트</p>
          </S.ESideBtnItem>
          <S.ESideBtnItem
            onClick={() => {
              handleClick("template");
            }}
          >
            <S.Glob_Icon
              icon={imagesContext("./template.png")}
              width="30px"
              height="30px"
            />
            <p>템플릿</p>
          </S.ESideBtnItem>

          <S.ESideBtnItem>
            <S.Glob_Icon
              icon={imagesContext("./picture.png")}
              width="30px"
              height="30px"
            />
            <p>사진</p>
          </S.ESideBtnItem>
        </S.ESideBtnBox>
      </S.ESWrapper>
      {isAddVisible ? (
        <EditorSideAddtion
          type={type}
          functions={functions}
          editor={editor}
          myRef={myRef}
        />
      ) : null}
    </>
  );
};

export default EditorSidebar;
