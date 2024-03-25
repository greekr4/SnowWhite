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
  objnodes,
  objSelection,
  setIsPopVisible,
  editor,
  popUpdate,
  setPopUpdate,
  groupIndex,
  setGroupIndex,
}) => {
  const [type, setType] = useState();
  const [ThisFontFamily, setThisFontFamily] = useState(null);
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
    console.log(objSelection.list[0].type);

    console.log("loglog");
    if (objSelection.list[0].type === "label") {
      const textObj = objSelection.list[0].textNode;
      textObj.setAttrs({
        fill: `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`,
      });
    } else {
      objSelection.list[0].node.setAttrs({
        fill: `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`,
      });
    }
  };

  useEffect(() => {
    //초기화

    setThisFontSize(0);
    setRealWidth(0);
    setRealHeight(0);

    console.log("이걸 받았습니다 >> 에디션에서");
    console.log(objSelection);
    console.log("이걸 받았습니다 << 에디션에서");

    //objnodes가 2개이상

    const typeActions = {
      label: () => {
        console.log("텍박임");
        console.log(objSelection.list[0].textNode);
        const textObj = objSelection.list[0].textNode;
        setType("텍스트");
        setThisFontSize(textObj.getFontSize());
        setThisColor(textObj.attrs.fill);
        setRealWidth(Math.round(objSelection.transformer.getWidth()) / 10);
        setRealHeight(Math.round(objSelection.transformer.getHeight()) / 10);
        setThisFontFamily(textObj.getFontFamily());
        setThisFontHeight(textObj.getLineHeight());
      },
      image: () => {
        console.log("이미지임");
        setType("이미지");
        console.log(obj.scaleX);
        setRealWidth(Math.round(obj.width * obj.scaleX) / 10);
        setRealHeight(Math.round(obj.height * obj.scaleY) / 10);
        setThisOpacity(obj.opacity);
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
        setThisColor(objSelection.list[0].node.attrs.fill);
        setThisOpacity(
          objSelection.list[0].node.attrs.opacity
            ? objSelection.list[0].node.attrs.opacity
            : 1
        );
        setRealWidth(Math.round(objSelection.transformer.getWidth()) / 10);
        setRealHeight(Math.round(objSelection.transformer.getHeight()) / 10);
      },
      rect: () => {
        setType("도형");
        setThisColor(objSelection.list[0].node.attrs.fill);
        setThisOpacity(
          objSelection.list[0].node.attrs.opacity
            ? objSelection.list[0].node.attrs.opacity
            : 1
        );
        setRealWidth(Math.round(objSelection.transformer.getWidth()) / 10);
        setRealHeight(Math.round(objSelection.transformer.getHeight()) / 10);
      },
      group: () => {
        setType("그룹");
        setRealWidth(Math.round(objSelection.transformer.getWidth()) / 10);
        setRealHeight(Math.round(objSelection.transformer.getHeight()) / 10);
      },
      multy: () => {
        setType("멀티");
        setRealWidth(Math.round(objSelection.transformer.getWidth()) / 10);
        setRealHeight(Math.round(objSelection.transformer.getHeight()) / 10);
      },
    };

    // const objectType = objnodes[0]?.node.attrs.type;

    let objectType;
    if (objSelection.list.length > 1) {
      console.log("이거");
      console.log(objSelection.list[objSelection.list.length - 1]);
      console.log("이거");
      if (objSelection.list[objSelection.list.length - 1].type === "group") {
        objectType = "group";
      } else {
        objectType = "multy";
      }
    } else {
      objectType = objSelection?.list[0]?.type;
    }

    console.log(objSelection?.list?.length);
    console.log(objectType);
    console.log(objSelection?.list[0]?.type); //타입확인

    // const objectType = "shape";

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

  const handleCopy = () => {
    editor?.functions.handleCopy();
  };

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
                    setThisFontFamily(e.target.value);
                    const textObj = objSelection.list[0].textNode;
                    textObj.setFontFamily(e.target.value);
                  }}
                  value={ThisFontFamily}
                  style={{ fontFamily: ThisFontFamily }}
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
              {/* 
              // 굵기
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
              </S.FontStyleBox> */}
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
                    const textObj = objSelection.list[0].textNode;
                    textObj.setFontSize(e.target.value);
                    objSelection.reselect();
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
                    const textObj = objSelection.list[0].textNode;
                    textObj.setLineHeight(e.target.value);
                    objSelection.reselect();
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
                  const textObj = objSelection.list[0].textNode;
                  textObj.setAlign("left");
                }}
                icon={imagesContext("./align_left.png")}
                width="18px"
                height="18px"
                cursor="pointer"
              />
              <S.Glob_Icon
                onClick={() => {
                  const textObj = objSelection.list[0].textNode;
                  textObj.setAlign("center");
                }}
                icon={imagesContext("./align_center.png")}
                width="18px"
                height="18px"
                cursor="pointer"
              />
              <S.Glob_Icon
                onClick={() => {
                  const textObj = objSelection.list[0].textNode;
                  textObj.setAlign("right");
                }}
                icon={imagesContext("./align_right.png")}
                width="18px"
                height="18px"
                cursor="pointer"
              />
              <S.Glob_Icon
                onClick={() => {
                  const textObj = objSelection.list[0].textNode;
                  if (textObj.getFontStyle() === "italic") {
                    textObj.setFontStyle();
                  } else {
                    textObj.setFontStyle("italic");
                  }
                }}
                icon={imagesContext("./italic.png")}
                width="18px"
                height="18px"
                cursor="pointer"
              />
              <S.Glob_Icon
                onClick={() => {
                  const textObj = objSelection.list[0].textNode;
                  console.log(textObj.getTextDecoration());
                  if (textObj.getTextDecoration() === "underline") {
                    textObj.setTextDecoration();
                  } else {
                    textObj.setTextDecoration("underline");
                  }
                }}
                icon={imagesContext("./underline.png")}
                width="18px"
                height="18px"
                cursor="pointer"
              />
            </div>
          </>
        ) : type != "그룹" && type != "멀티" ? (
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
                    objSelection.list[0].node.setAttrs({
                      opacity: e.target.value,
                    });
                  }}
                />
              </div>

              {/* <div>{Math.round(thisOpacity * 100)}%</div> */}
            </div>
          </>
        ) : (
          <>
            <div className="line option btnbox">
              {type === "멀티" && (
                <>
                  <S.Glob_Icon
                    onClick={() => {
                      // 그룹 만들기
                      objSelection.group(groupIndex + "group");
                      objSelection.deselectAll();
                      setIsPopVisible();
                      setGroupIndex((groupIndex) => groupIndex + 1);
                    }}
                    icon={imagesContext("./group_obj.png")}
                    width="20px"
                    height="20px"
                    cursor="pointer"
                  />
                </>
              )}
              {type === "그룹" && (
                <>
                  <S.Glob_Icon
                    onClick={() => {
                      const groupName = objSelection.list[0].group
                        ? objSelection.list[0].group
                        : objSelection.list[0].name;
                      objSelection.board.groups.ungroup(groupName);
                      objSelection.deselectAll();
                      setIsPopVisible();
                    }}
                    icon={imagesContext("./ungroup_obj.png")}
                    width="20px"
                    height="20px"
                    cursor="pointer"
                  />
                </>
              )}
            </div>
          </>
        )}

        <div className="line option btnbox">
          <S.Glob_Icon
            //앞으로 가기
            onClick={() => {
              // console.log(objSelection.list);
              // console.log(editor.board.layer.children);

              if (type === "멀티") {
                objSelection.list.forEach((obj) => {
                  const zindex =
                    obj.node.index <
                    objSelection?.board?.layer?.children.length - 2
                      ? obj.node.index + 1
                      : obj.node.index;
                  obj.node.setZIndex(zindex);
                });
              } else {
                const zindex =
                  objSelection.list[0].node.index <
                  objSelection?.board?.layer?.children.length - 2
                    ? objSelection.list[0].node.index + 1
                    : objSelection.list[0].node.index;
                objSelection.list[0].node.setZIndex(zindex);
              }
            }}
            icon={imagesContext("./forward.png")}
            width="20px"
            height="20px"
            cursor="pointer"
          />
          <S.V_Bar />
          <S.Glob_Icon
            //뒤로가기
            onClick={() => {
              if (type === "멀티") {
                objSelection.list.forEach((obj) => {
                  const zindex =
                    obj.node.index > 7 //가이드 라인 0~6까지
                      ? obj.node.index - 1
                      : obj.node.index;
                  obj.node.setZIndex(zindex);
                });
              } else {
                const zindex =
                  objSelection.list[0].node.index > 7 //가이드 라인 0~6까지
                    ? objSelection.list[0].node.index - 1
                    : objSelection.list[0].node.index;
                objSelection.list[0].node.setZIndex(zindex);
              }
            }}
            icon={imagesContext("./backward.png")}
            width="20px"
            height="20px"
            cursor="pointer"
          />
          <S.V_Bar />
          {type != "멀티" && type != "그룹" && (
            <>
              <S.Glob_Icon
                //복사하기
                onClick={handleCopy}
                icon={imagesContext("./copy.png")}
                width="18px"
                height="18px"
                cursor="pointer"
              />
              <S.V_Bar />
            </>
          )}

          <S.Glob_Icon
            onClick={() => {
              objSelection.delete();
              setIsPopVisible();
            }}
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
