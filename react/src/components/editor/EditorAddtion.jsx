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
}) => {
  console.log(obj);

  const [type, setType] = useState();
  const [thisFontSize, setThisFontSize] = useState(obj.fontSize);

  const handleEditFontSize = () => {
    functions.setFontSize(obj, thisFontSize);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEditFontSize();
    }
  };

  useEffect(() => {
    if (obj.type === "textbox") {
      setType("텍스트");
    } else {
      setType(obj.type);
    }
  }, [obj]);

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
      <div className="option">
        사이즈 :{" "}
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
      <div className="option btnbox">
        <S.Btn onClick={functions.handleSendToFront}>앞으로</S.Btn>
        <S.Btn onClick={functions.handleSendToBack}>뒤로</S.Btn>
        <S.Btn onClick={functions.handleDeleteSelected}>삭제</S.Btn>
      </div>
      <div className="size">
        실제 사이즈 (mm) {Math.round(obj.width * obj.zoomX) / 10}
        {" x "}
        {Math.round(obj.height * obj.zoomY) / 10}
      </div>
    </S.CanvasPopup>
  );
};
