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
  const [groupIndex, setGroupIndex] = useState(0);

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
    objSelection.list[0].node.setAttrs({
      fill: `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`,
    });
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
        setRealWidth(Math.round(objSelection.transformer.getWidth()) / 10);
        setRealHeight(Math.round(objSelection.transformer.getHeight()) / 10);
      },
      rect: () => {
        setType("도형");
        // setThisColor(objnodes[0]?.node.attrs.fill);
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
        setRealWidth(Math.round(obj.width * obj.scaleX) / 10);
        setRealHeight(Math.round(obj.height * obj.scaleY) / 10);
      },
    };

    // const objectType = objnodes[0]?.node.attrs.type;

    const objectType =
      objSelection.list.length > 1 ? "group" : objSelection.list[0].type;
    console.log(objSelection.list.length);
    console.log(objectType);
    console.log(objSelection.list[0].type); //타입확인

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
    const copy_type = objSelection.list[0].type;
    const copy_attrs = objSelection.list[0].node.attrs;

    const modifiedAttrs = {
      ...copy_attrs,
      x: copy_attrs.x + 10,
      y: copy_attrs.y + 10,
    };

    switch (copy_type) {
      case "rect":
        editor?.shapes.rect.insert(modifiedAttrs);
        break;
      case "circle":
        editor?.shapes.circle.insert(modifiedAttrs);
        break;
      case "triangle":
        editor?.shapes.triangle.insert(modifiedAttrs);
        break;
      // Add cases for other shapes as needed
      default:
        console.error("Unsupported shape type:", copy_type);
    }
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
              <S.Glob_Icon
                onClick={() => {
                  objSelection.group(groupIndex + "group");
                  setGroupIndex(groupIndex + 1);
                }}
                icon={imagesContext("./group_obj.png")}
                width="20px"
                height="20px"
                cursor="pointer"
              />
              <S.V_Bar />
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
            </div>
          </>
        )}

        <div className="line option btnbox">
          <S.Glob_Icon
            //앞으로 가기
            onClick={() => {
              console.log(editor.board.layer.children);
              const zindex =
                objSelection.list[0].node.index <
                editor.board.layer.children.length - 2
                  ? objSelection.list[0].node.index + 1
                  : objSelection.list[0].node.index;
              console.log(zindex);
              objSelection.list[0].node.setZIndex(zindex);
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
              const zindex =
                objSelection.list[0].node.index > 7 //가이드 라인 0~6까지
                  ? objSelection.list[0].node.index - 1
                  : objSelection.list[0].node.index;
              objSelection.list[0].node.setZIndex(zindex);
            }}
            icon={imagesContext("./backward.png")}
            width="20px"
            height="20px"
            cursor="pointer"
          />
          <S.V_Bar />
          {type != "그룹" && (
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
