import React, { useEffect, useRef, useState } from "react";
import usePikaso from "pikaso-react-hook";

import Pikaso from "pikaso";
import { shapes } from "konva/lib/Shape";
import EditorHeader from "../components/editor/EditorHeader";
import * as S from "../styles/new_styles";
import EditorSidebar from "../components/editor/EditorSidebar";
import { EditorAddtion } from "../components/editor/EditorAddtion";

const TestKonva3 = () => {
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isPopVisible, setIsPopVisible] = useState(false);
  const [objNodes, setObjNodes] = useState([]);
  const [objSelection, setObjSelection] = useState();
  const [objx, setObjx] = useState(0);
  const [objy, setObjy] = useState(0);
  const [historyStep, setHistoryStep] = useState(); //초기 히스토리 설정
  const [ref, editor] = usePikaso({
    // measurement: {
    //   maring: 20,
    //   background: {
    //     cornerRadius: 5,
    //     fill: "purple",
    //   },
    //   text: {
    //     fill: "#fff",
    //     padding: 5,
    //     fontSize: 14,
    //     fontStyle: "bold",
    //   },
    // },
    selection: {
      interactive: true, // 셀렉트 사용 여부
      keyboard: {
        enabled: true, // 키보드 단축키 사용
        movingSpaces: 20, // 속도
        map: {
          // 단축키 설정
          delete: ["Backsapce", "Delete"],
          deselect: ["Escape"],
        },
      },
      transformer: {
        // 스타일링
        borderStroke: "#A5E6F3",
        borderStrokeWidth: 1.5,
        borderDash: [4, 4],
        anchorSize: 7, // 원 사이즈
        anchorFill: "#90E0EF",
        anchorStroke: "#00B4D8",
        anchorStrokeWidth: 1,
      },
      zone: {
        //드래그
        fill: "rgba(165, 230, 243,0.5)",
        stroke: "rgba(165, 230, 243,0.5)",
      },
    },
  });

  const createtest = () => {
    editor.shapes.arrow.insert({
      x: 200,
      y: 200,
      radius: 50,
      fill: "red",
    });
  };

  editor?.snapGrid.enable();
  editor?.snapGrid.setOptions({
    strokeWidth: 1,
    stroke: "#777",
    dash: [3, 3],
    width: 100,
  });
  editor?.snapGrid.setOffset(10); // default is

  useEffect(() => {
    // 배경 설정
    editor?.board.background.setImageFromUrl("/asserts/editor/backgorund1.png");
    editor?.loadFromUrl("/asserts/editor/background1.png");
    functions.createBackgorund("#fff");

    // 가이드 라인 도우미
    const guideLine0 = editor?.shapes.line.insert({
      points: [200, 200, 1100, 200], //x_start , y_start, x_end, y_end
      name: "guide",
      stroke: "#fa0000",
      strokeWidth: 0,
    });
    const guideLine1 = editor?.shapes.line.insert({
      points: [200, 700, 1100, 700], //x_start , y_start, x_end, y_end
      name: "guide",
      stroke: "#15ff00",
      strokeWidth: 0,
    });
    const guideLine2 = editor?.shapes.line.insert({
      points: [224, 225, 1074, 225], //x_start , y_start, x_end, y_end
      name: "guide",
      stroke: "#123",
      strokeWidth: 0,
    });
    const guideLine3 = editor?.shapes.line.insert({
      points: [224, 675, 1074, 675], //x_start , y_start, x_end, y_end
      name: "guide",
      stroke: "#4c00ff",
      strokeWidth: 0,
    });

    editor?.on(
      ["selection:change", "selection:dragend", "selection:transformend"],
      (data) => {
        // 선택 예외 추가
        editor?.board.selection.list.forEach((obj) => {
          if (
            obj.node.attrs.name === "guide" ||
            obj.node.attrs.name === "bgc"
          ) {
            obj.deselect();
          } else {
            console.log(data);
            console.log(obj);
            console.log(editor.selection);
            console.log(editor.selection.transformer);
          }

          console.log(editor?.selection.transformer.attrs);

          console.log(data);
          console.log("노드임");

          const objnodes = data.shapes.filter(
            (obj) =>
              obj.node.attrs.name != "bgc" && obj.node.attrs.name != "guide"
          );
          if (objnodes.length > 0) {
            setObjx(editor?.selection.transformer.getX());
            setObjy(editor?.selection.transformer.getY());
            console.log("ddd");
            console.log(editor?.selection.transformer.getWidth());
            setObjSelection(editor?.selection);
            setIsPopVisible(true);
          } else {
            setIsPopVisible(false);
          }
        });
        ////
      }
    );

    editor?.board.layer.children.forEach((obj) => {
      if (obj.attrs.name === "guide") {
        obj.setAttrs({
          draggable: false,
          hitStrokeWidth: 0,
        });
      }
    });

    setHistoryStep(editor?.history.step + 4);
  }, [editor]);

  // 함수

  const functions = {
    createCircle: () => {
      editor?.shapes.circle.insert({
        type: "shape",
        x: editor?.board.stage.attrs.width / 2,
        y: editor?.board.stage.attrs.height / 2,
        radius: 50,
        fill: "#acacac",
        draggable: true,
      });
    },
    createRect: () => {
      editor?.shapes.rect.insert({
        type: "shape",
        x: editor?.board.stage.attrs.width / 2 - 50,
        y: editor?.board.stage.attrs.height / 2 - 50,
        width: 100,
        height: 100,
        fill: "#aaaaaa",
        draggable: true,
      });

      console.log(editor?.board.background);
    },
    undo: () => {
      if (historyStep < editor?.history.step) editor?.undo();
    },
    redo: () => {
      editor?.redo();
    },
    createBackgorund: (color) => {
      editor?.board.getNodes().forEach((obj) => {
        console.log(obj.attrs.name);
        if (obj.attrs.name === "bgc") {
          obj.destroy();
        }
      });

      const bgc = editor?.shapes.rect.insert({
        x: 200,
        y: 200,
        width: 900,
        height: 500,
        fill: color,
        name: "bgc",
      });
      bgc?.node.setZIndex(0);
      bgc?.node.setDraggable(false);
      bgc?.node.hitStrokeWidth(0);
    },
  };

  return (
    <>
      <EditorHeader functions={functions} isAddVisible={isAddVisible} />
      <S.MainLayout>
        <S.EditorWrapper>
          <EditorSidebar
            isAddVisible={isAddVisible}
            setIsAddVisible={setIsAddVisible}
            functions={functions}
          />
          <S.CanvasBox>
            <div
              ref={ref}
              style={{
                background: "#eee",
                width: "1400px",
                height: "100vh",
              }}
            />
            <S.CanvasPopupBox>
              {isPopVisible && (
                <EditorAddtion
                  obj={{ type: "rect" }}
                  objnodes={objNodes}
                  objx={objx}
                  objy={objy}
                  objSelection={objSelection}
                  setIsPopVisible={setIsPopVisible}
                  editor={editor}
                />
              )}
            </S.CanvasPopupBox>
          </S.CanvasBox>
        </S.EditorWrapper>
      </S.MainLayout>
      <button onClick={functions.createCircle}>Create Circle</button>
      <br />

      <button
        onClick={() => {
          console.log(editor.board.layer.children);
        }}
      >
        레이어 보자
      </button>
      <br />
    </>
  );
};

export default TestKonva3;
