import React, { useEffect, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import { useSpring } from "react-spring";
import { SketchPicker } from "react-color";
import { tem1_1, tem1_2 } from "./tem";

const EditorSideAddtion = ({ functions, type, editor, myRef }) => {
  const [subMenu, setSubMenu] = useState({
    menu1: true,
    menu2: false,
  });

  const [maxHeight, setMaxHeight] = useState(0);
  const [pickColor, setPickColor] = useState("#fff");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const ref_menu1 = useRef(null);
  const ref_menu2 = useRef(null);

  useEffect(() => {
    try {
      setSubMenu({
        menu1: true,
        menu2: false,
      });
      setMaxHeight(ref_menu1.current.offsetHeight);
    } catch (e) {
      setMaxHeight(132);
    }
  }, [type]);

  const handleClick = (value, event) => {
    if (value === "menu1") {
      setMaxHeight(ref_menu1.current.offsetHeight);
    } else if (value === "menu2") {
      setMaxHeight(ref_menu2.current.offsetHeight);
    }

    setSubMenu((prevSubMenu) => {
      const updatedSubMenu = { ...prevSubMenu };

      // 특정 키가 이미 true인 경우, 해당 키를 false로 바꾸고 나머지는 false로 설정
      Object.keys(updatedSubMenu).forEach((key) => {
        if (key === value) {
          updatedSubMenu[key] = !updatedSubMenu[key];
        } else {
          updatedSubMenu[key] = false;
        }
      });
      return updatedSubMenu;
    });
  };

  const handleBgcClick = (event) => {
    // console.log(event.currentTarget.getAttribute("color"));
    const color_val = event.currentTarget.getAttribute("color");
    console.log(color_val);
    editor.functions.createBackgorund(color_val);
  };

  const handleBgcPick = (color) => {
    setPickColor(
      `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    );
  };

  const handlePickerOpen = () => {
    setIsPickerOpen(true);
  };

  const handlePickerClose = () => {
    setIsPickerOpen(false);
    editor.functions.createBackgorund(pickColor);
  };

  const SlideDown1 = useSpring({
    height: subMenu.menu1 ? maxHeight + "px" : 0 + "px",
  });

  const SlideDown2 = useSpring({
    height: subMenu.menu2 ? maxHeight + "px" : 0 + "px",
  });

  //이미지로드
  const imagesContext = require.context(
    "../../assets/editor/icon",
    false,
    /\.(png|jpg|jpeg)$/
  );
  const imageNames = imagesContext.keys();
  //

  const handleCreateImage = (e) => {
    const url = e.currentTarget.getAttribute("icon");
    editor.functions.createImage(url);
  };

  return (
    <S.ESideAddWrapper>
      {type === "shapes" ? (
        <S.ESideAddBox>
          <h1>도형</h1>
          <S.ESideAddShapesBox>
            <S.ESideAddShapesItem>
              <S.Glob_Icon
                icon={imagesContext("./rectangle.png")}
                width="75px"
                height="75px"
                onClick={editor.functions.createRect}
              />
            </S.ESideAddShapesItem>
            <S.ESideAddShapesItem>
              <S.Glob_Icon
                icon={imagesContext("./cricle.png")}
                width="75px"
                height="75px"
                onClick={editor.functions.createCircle}
              />
            </S.ESideAddShapesItem>
          </S.ESideAddShapesBox>
        </S.ESideAddBox>
      ) : type === "background" ? (
        <S.ESideAddBox>
          <h1>배경</h1>
          <S.ESideAddBgBox>
            <S.ESideAddBgItem_first>
              <p>직접 선택</p>
              <S.ESideAddBgColors>
                <S.BgColorBtn_plus onClick={handlePickerOpen}>
                  <S.Glob_Icon
                    style={{
                      width: "100%",
                      height: "12px",
                      position: "relative",
                      top: "11px",
                    }}
                    icon={imagesContext("./plus.png")}
                    width="12px"
                    height="12px"
                  />
                </S.BgColorBtn_plus>
              </S.ESideAddBgColors>
            </S.ESideAddBgItem_first>
            <div style={{ position: "absolute" }}>
              {isPickerOpen ? (
                <>
                  <S.ColorPickerOverlay onClick={handlePickerClose} />
                  <S.ColorPickerBox left="12px" top="36px">
                    <SketchPicker
                      color={{ hex: pickColor }}
                      onChange={handleBgcPick}
                    />
                  </S.ColorPickerBox>
                </>
              ) : null}
            </div>
            <S.ESideAddBgItem show={subMenu.menu1}>
              <p
                onClick={() => {
                  handleClick("menu1");
                }}
              >
                기본 색상
              </p>
              <S.ESideAddBgColorsBox style={SlideDown1}>
                <S.ESideAddBgColors ref={ref_menu1}>
                  <S.BgColorBtn onClick={handleBgcClick} color="#000" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#333" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#777" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#ccc" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#fff" />
                  <S.BgColorBtn onClick={handleBgcClick} color="red" />
                  <S.BgColorBtn onClick={handleBgcClick} color="orange" />
                  <S.BgColorBtn onClick={handleBgcClick} color="yellow" />
                  <S.BgColorBtn onClick={handleBgcClick} color="green" />
                  <S.BgColorBtn onClick={handleBgcClick} color="blue" />
                  <S.BgColorBtn onClick={handleBgcClick} color="navy" />
                  <S.BgColorBtn onClick={handleBgcClick} color="purple" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#499700" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#2b59bb" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#f3128e" />
                </S.ESideAddBgColors>
              </S.ESideAddBgColorsBox>
            </S.ESideAddBgItem>
            <S.ESideAddBgItem show={subMenu.menu2}>
              <p
                onClick={() => {
                  handleClick("menu2");
                }}
              >
                파스텔 색상
              </p>
              <S.ESideAddBgColorsBox style={SlideDown2}>
                <S.ESideAddBgColors ref={ref_menu2}>
                  <S.BgColorBtn onClick={handleBgcClick} color="#ff0000" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#ff3c3c" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#ff6868" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#ffa1a1" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#ffe2e2" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#1900ff" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#4f3bff" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#8679ff" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#b5adff" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#e9e6ff" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#fff000" />
                  <S.BgColorBtn
                    onClick={handleBgcClick}
                    color="rgb(255, 242, 65)"
                  />
                  <S.BgColorBtn onClick={handleBgcClick} color="#fff678" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#fffaad" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#fffcd0" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#15ff00" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#56ff47" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#88ff7d" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#c0ffba" />
                  <S.BgColorBtn onClick={handleBgcClick} color="#edffeb" />
                </S.ESideAddBgColors>
              </S.ESideAddBgColorsBox>
            </S.ESideAddBgItem>
          </S.ESideAddBgBox>
        </S.ESideAddBox>
      ) : type === "template" ? (
        <S.ESideAddBox>
          <h1>템플릿</h1>
          <S.ESTempateBox>
            <S.ESTemplateItem>
              <S.Glob_Icon
                onClick={() => {
                  myRef[0]?.functions.handleLoad(tem1_1);
                  myRef[1]?.functions.handleLoad(tem1_2);
                }}
                icon={imagesContext("./tem1.png")}
                width="100%"
                height="100%"
              />
            </S.ESTemplateItem>
          </S.ESTempateBox>
        </S.ESideAddBox>
      ) : type === "clipart" ? (
        <S.ESideAddBox>
          <h1>클립아트</h1>
          <S.ESideAddShapesBox>
            <S.ESideAddShapesItem>
              <S.Glob_Icon
                onClick={handleCreateImage}
                icon={"/asserts/editor/clipart/clipart1.png"}
                width="75px"
                height="75px"
              />
            </S.ESideAddShapesItem>
            <S.ESideAddShapesItem>
              <S.Glob_Icon
                onClick={handleCreateImage}
                icon={"/asserts/editor/clipart/clipart2.png"}
                width="75px"
                height="75px"
              />
            </S.ESideAddShapesItem>
            <S.ESideAddShapesItem>
              <S.Glob_Icon
                onClick={handleCreateImage}
                icon={"/asserts/editor/clipart/clipart3.png"}
                width="75px"
                height="75px"
              />
            </S.ESideAddShapesItem>
          </S.ESideAddShapesBox>
        </S.ESideAddBox>
      ) : null}
    </S.ESideAddWrapper>
  );
};

export default EditorSideAddtion;
