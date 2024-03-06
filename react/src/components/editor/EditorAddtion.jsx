import React, { useEffect, useState } from "react";
import * as S from "../../styles/new_styles";
import { SketchPicker } from "react-color";

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
  canvas,
  zoom,
}) => {
  const [type, setType] = useState();
  const [thisFontStyle, setThisFontStyle] = useState(null);
  const [thisFontSize, setThisFontSize] = useState(null);
  const [thisFontHeight, setThisFontHeight] = useState(null);
  const [thisFontWeight, setThisFontWeight] = useState(null);
  const [thisTextAlign, setThisTextAlign] = useState(null);
  const [thisOpacity, setThisOpacity] = useState(1);
  const [thisColor, setThisColor] = useState(null);
  const [isOpenColor, setIsOpenColor] = useState(false);
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

  const handleColorOpen = () => {
    setIsOpenColor(true);
  };

  const handleColorClose = () => {
    setIsOpenColor(false);
  };

  const handleColorChange = (color) => {
    setThisColor(
      `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    );
    functions.setColor(
      obj,
      `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    );
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
        setThisColor(obj.fill);
        setRealWidth(Math.round(obj.width * obj.scaleX) / 10);
        setRealHeight(Math.round(obj.height * obj.scaleY) / 10);
        setThisFontStyle(obj.fontFamily);
        setThisFontHeight(obj.lineHeight);
        setThisFontWeight(obj.fontWeight);
      },
      image: () => {
        console.log("이미지임");
        setType("이미지");
        console.log(obj.scaleX);
        setRealWidth(Math.round(obj.width * obj.scaleX) / 10);
        setRealHeight(Math.round(obj.height * obj.scaleY) / 10);
        setThisOpacity(obj.opacity);
      },
      undefined: () => {
        console.log("드래그 그룹임");
        setType("그룹");
        console.log(canvas.getActiveObject());
        const group_obj = canvas.getActiveObject();
        setRealWidth(Math.round(group_obj.width * group_obj.scaleX) / 10);
        setRealHeight(Math.round(group_obj.height * group_obj.scaleY) / 10);
      },
      activeSelection: () => {
        console.log("쉬프트클릭 그룹임");
        setType("그룹");
        const group_obj = canvas.getActiveObject();
        console.log(group_obj);
        setRealWidth(Math.round(group_obj.width * group_obj.scaleX) / 10);
        setRealHeight(Math.round(group_obj.height * group_obj.scaleY) / 10);
      },
      circle: () => {
        setType("도형");
        setThisColor(obj.fill);
        setThisOpacity(obj.opacity);
        setRealWidth(Math.round(obj.width * obj.scaleX) / 10);
        setRealHeight(Math.round(obj.height * obj.scaleY) / 10);
      },
      rect: () => {
        console.log("네모임");
        setType("도형");
        setThisColor(obj.fill);
        setThisOpacity(obj.opacity);
        setRealWidth(Math.round(obj.width * obj.scaleX) / 10);
        setRealHeight(Math.round(obj.height * obj.scaleY) / 10);
      },
      group: () => {
        setType("그룹");
        setRealWidth(Math.round(obj.width * obj.scaleX) / 10);
        setRealHeight(Math.round(obj.height * obj.scaleY) / 10);
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

  const FontSizes = Array.from(
    { length: 95 }, // 6부터 100까지는 1의 간격이므로 95개
    (_, index) => index + 6 // 6부터 시작
  ).concat(
    Array.from(
      { length: 40 }, // 100부터 500까지는 10의 간격이므로 41개
      (_, index) => index * 10 + 110 // 100부터 시작
    )
  );

  const FontHeights = Array.from({ length: 21 }, (_, index) =>
    parseFloat((index * 5 + 100) / 100).toFixed(1)
  ).concat(
    Array.from({ length: 10 }, (_, index) =>
      parseFloat((index * 10 + 210) / 100).toFixed(1)
    )
  );

  console.log(zoom);
  return (
    <>
      <S.CanvasPopup
        objx={objx}
        objy={objy}
        objw={objw}
        objzoom={objzoom}
        canvasx={canvasx}
        canvasy={canvasy}
        zoom={zoom}
      >
        <div className="line title">{type}</div>
        {type === "텍스트" ? (
          <>
            <div className="line option-font">
              <S.FontStyleBox>
                <select
                  onChange={(e) => {
                    setThisFontStyle(e.target.value);
                    functions.setFontStyle(obj, e.target.value);
                  }}
                  value={thisFontStyle}
                  style={{ fontFamily: thisFontStyle }}
                >
                  <option value="굴림" style={{ fontFamily: "굴림" }}>
                    굴림체
                  </option>
                  <option value="고딕" style={{ fontFamily: "고딕" }}>
                    고딕체
                  </option>
                  <option value="바탕" style={{ fontFamily: "바탕" }}>
                    바탕체
                  </option>
                  <option value="궁서" style={{ fontFamily: "궁서" }}>
                    궁서체
                  </option>
                </select>
              </S.FontStyleBox>
              <S.FontStyleBox>
                <select
                  onChange={(e) => {
                    setThisFontWeight(e.target.value);
                    functions.setFontWeight(obj, e.target.value);
                  }}
                  value={thisFontWeight}
                  style={{ fontWeight: thisFontWeight }}
                >
                  <option value="100" style={{ fontWeight: "100" }}>
                    굵기
                  </option>
                  <option value="200" style={{ fontWeight: "200" }}>
                    굵기
                  </option>
                  <option value="300" style={{ fontWeight: "300" }}>
                    굵기
                  </option>
                  <option value="400" style={{ fontWeight: "400" }}>
                    굵기
                  </option>
                  <option value="500" style={{ fontWeight: "500" }}>
                    굵기
                  </option>
                  <option value="600" style={{ fontWeight: "500" }}>
                    굵기
                  </option>
                  <option value="700" style={{ fontWeight: "500" }}>
                    굵기
                  </option>
                </select>
              </S.FontStyleBox>
            </div>
            <div className="line option-text">
              <S.ColorBox color={thisColor}>
                <S.ColorBtn onClick={handleColorOpen}></S.ColorBtn>
                {isOpenColor ? (
                  <>
                    <S.ColorPickerOverlay onClick={handleColorClose} />
                    <S.ColorPickerBox>
                      <SketchPicker
                        color={{ hex: thisColor }}
                        onChange={handleColorChange}
                      />
                    </S.ColorPickerBox>
                  </>
                ) : null}
              </S.ColorBox>
              <S.V_Bar />
              <S.FontSizeBox>
                <select
                  name=""
                  id=""
                  value={thisFontSize}
                  onChange={(e) => {
                    setThisFontSize(e.target.value);
                    functions.setFontSize(obj, e.target.value);
                  }}
                >
                  {FontSizes.map((value) => (
                    <option value={value}>{value}px</option>
                  ))}
                </select>
              </S.FontSizeBox>
              <S.V_Bar />
              <S.FontHeightBox>
                <select
                  name=""
                  id=""
                  value={thisFontHeight}
                  onChange={(e) => {
                    setThisFontHeight(e.target.value);
                    functions.setFontHeight(obj, e.target.value);
                  }}
                >
                  {FontHeights.map((value) => (
                    <option value={value}>{value}</option>
                  ))}
                </select>
              </S.FontHeightBox>
            </div>
            <div className="line option-text">
              <S.Glob_Icon
                onClick={() => {
                  functions.setTextAlign(obj, "left");
                }}
                icon={imagesContext("./align_left.png")}
                width="18px"
                height="18px"
                cursor="pointer"
              />
              <S.Glob_Icon
                onClick={() => {
                  functions.setTextAlign(obj, "center");
                }}
                icon={imagesContext("./align_center.png")}
                width="18px"
                height="18px"
                cursor="pointer"
              />
              <S.Glob_Icon
                onClick={() => {
                  functions.setTextAlign(obj, "right");
                }}
                icon={imagesContext("./align_right.png")}
                width="18px"
                height="18px"
                cursor="pointer"
              />
              <S.Glob_Icon
                onClick={() => {
                  functions.setTextItalic(obj);
                }}
                icon={imagesContext("./italic.png")}
                width="18px"
                height="18px"
                cursor="pointer"
              />
              <S.Glob_Icon
                onClick={() => {
                  functions.setTextUnderline(obj);
                }}
                icon={imagesContext("./underline.png")}
                width="18px"
                height="18px"
                cursor="pointer"
              />
            </div>
          </>
        ) : type != "그룹" ? (
          <>
            <div className="line option-default">
              {type === "도형" ? (
                <>
                  <S.ColorBox color={thisColor}>
                    <S.ColorBtn onClick={handleColorOpen}></S.ColorBtn>
                    {isOpenColor ? (
                      <>
                        <S.ColorPickerOverlay onClick={handleColorClose} />
                        <S.ColorPickerBox>
                          <SketchPicker
                            color={{ hex: thisColor }}
                            onChange={handleColorChange}
                          />
                        </S.ColorPickerBox>
                      </>
                    ) : null}
                  </S.ColorBox>
                  <S.V_Bar />
                </>
              ) : null}

              <div>투명도</div>
              <div>
                <input
                  type="range"
                  name="opacity"
                  id="opacity"
                  min="0"
                  step={0.01}
                  max="1"
                  value={thisOpacity}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setThisOpacity(e.target.value);
                    functions.setOpacity(obj, e.target.value);
                  }}
                />
              </div>

              {/* <div>{Math.round(thisOpacity * 100)}%</div> */}
            </div>
          </>
        ) : (
          <>
            <div className="line option btnbox">
              <S.Glob_Icon
                onClick={functions.handleGroupObj}
                icon={imagesContext("./group_obj.png")}
                width="20px"
                height="20px"
                cursor="pointer"
              />
              <S.V_Bar />
              <S.Glob_Icon
                onClick={functions.handleUngroupObj}
                icon={imagesContext("./ungroup_obj.png")}
                width="20px"
                height="20px"
                cursor="pointer"
              />
            </div>
          </>
        )}

        <div className="line option btnbox">
          <S.Glob_Icon
            onClick={functions.handleSendToFront}
            icon={imagesContext("./forward.png")}
            width="20px"
            height="20px"
            cursor="pointer"
          />
          <S.V_Bar />
          <S.Glob_Icon
            onClick={functions.handleSendToBack}
            icon={imagesContext("./backward.png")}
            width="20px"
            height="20px"
            cursor="pointer"
          />
          <S.V_Bar />
          <S.Glob_Icon
            onClick={() => {
              functions.handleCopy(obj);
            }}
            icon={imagesContext("./copy.png")}
            width="18px"
            height="18px"
            cursor="pointer"
          />
          <S.V_Bar />
          <S.Glob_Icon
            onClick={functions.handleDeleteSelected}
            icon={imagesContext("./remove.png")}
            width="20px"
            height="20px"
            cursor="pointer"
          />
        </div>
        <div className="line size">
          실제 사이즈 (mm) {realWidth}
          {" x "}
          {realHeight}
        </div>
      </S.CanvasPopup>
    </>
  );
};
