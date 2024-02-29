import React, { useEffect, useState } from "react";
import * as S from "../../styles/new_styles";

export const EditorAddtion = ({
  objx,
  objy,
  objw,
  obj,
  objzoom,
  canvasx,
  canvasy,
  functions,
  forceUpdate,
}) => {
  const [type, setType] = useState();
  const [thisFontSize, setThisFontSize] = useState(0);
  const [realWidth, setRealWidth] = useState(0);
  const [realHeight, setRealHeight] = useState(0);

  const handleEditFontSize = () => {
    functions.setFontSize(obj, thisFontSize);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEditFontSize();
    }
  };

  useEffect(() => {
    //초기화
    console.log("타입 : " + obj.type);
    setThisFontSize(0);
    setRealWidth(0);
    setRealHeight(0);

    const typeActions = {
      textbox: () => {
        console.log("텍박임");
        setType("텍스트");
        setThisFontSize(obj.fontSize);
      },
      image: () => {
        console.log("이미지임");
        setType("이미지");
        console.log(obj.scaleX);
        setRealWidth(Math.round(obj.width * obj.scaleX) / 10);
        setRealHeight(Math.round(obj.height * obj.scaleY) / 10);
      },
      undefined: () => {
        console.log("드래그 그룹임");
        setType("그룹");
      },
      activeSelection: () => {
        console.log("쉬프트클릭 그룹임");
        setType("그룹");
      },
      circle: () => {
        console.log("원임");
        setType("원");
      },
      rect: () => {
        console.log("네모임");
        setType("네모");
      },
    };

    const objectType = obj.type;

    if (typeActions[objectType]) {
      typeActions[objectType]();
    }
  }, [forceUpdate][obj]);

  //이미지로드
  const imagesContext = require.context(
    "../../assets/editor/icon",
    false,
    /\.(png|jpg|jpeg)$/
  );
  const imageNames = imagesContext.keys();
  //

  return (
    <S.CanvasPopup
      objx={objx}
      objy={objy}
      objw={objw}
      objzoom={objzoom}
      canvasx={canvasx}
      canvasy={canvasy}
    >
      <div className="title">{type}</div>
      <div className="option">컬러 : {obj.fill}</div>

      {type === "텍스트" ? (
        <div className="option">
          폰트 사이즈 :{" "}
          <input
            type="text"
            value={thisFontSize}
            onChange={(e) => {
              setThisFontSize(e.target.value);
            }}
            onBlur={handleEditFontSize}
            onKeyDown={handleKeyDown}
            // onClick={() => functions.setFontSize(obj, )}
          />
        </div>
      ) : null}

      <div className="option btnbox">
        <S.Glob_Icon
          onClick={functions.handleSendToFront}
          icon={imagesContext("./backward.png")}
          width="30px"
          height="30px"
          cursor="pointer"
        ></S.Glob_Icon>
        <S.Glob_Icon
          onClick={functions.handleSendToBack}
          icon={imagesContext("./forward.png")}
          width="30px"
          height="30px"
          cursor="pointer"
        ></S.Glob_Icon>
        <S.Glob_Icon
          onClick={functions.handleDeleteSelected}
          icon={imagesContext("./copy.png")}
          width="28px"
          height="28px"
          cursor="pointer"
        ></S.Glob_Icon>
        <S.Glob_Icon
          onClick={functions.handleDeleteSelected}
          icon={imagesContext("./remove.png")}
          width="30px"
          height="30px"
          cursor="pointer"
        ></S.Glob_Icon>
      </div>
      <div className="size">
        실제 사이즈 (mm) {realWidth}
        {" x "}
        {realHeight}
      </div>
    </S.CanvasPopup>
  );
};
