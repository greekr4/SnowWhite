import React, { useEffect, useRef, useState } from "react";
import usePikaso from "pikaso-react-hook";

import Pikaso from "pikaso";
import { shapes } from "konva/lib/Shape";

const TestKonva3 = () => {
  const [ref, editor] = usePikaso({
    measurement: {
      maring: 20,
      background: {
        cornerRadius: 5,
        fill: "purple",
      },
      text: {
        fill: "#fff",
        padding: 5,
        fontSize: 14,
        fontStyle: "bold",
      },
    },
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

  const createCircle = () => {
    editor.shapes.circle.insert({
      x: 200,
      y: 200,
      radius: 50,
      fill: "red",
      draggable: true,
      selectable: false,
    });
  };

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

  console.log(editor?.selection);

  editor?.board.background.setImageFromUrl("/asserts/editor/backgorund1.png");
  editor?.loadFromUrl("/asserts/editor/background1.png");

  useEffect(() => {
    // 가이드 라인 도우미
    editor?.shapes.line.insert({
      points: [90, 50, 990, 50], //x_start , y_start, x_end, y_end
      name: "test",
    });

    const line = editor?.shapes.line;

    line?.insert({
      points: [1, 1, 100, 100],
      stroke: "blue",
      strokeWidth: 10,
      draggable: false,
      selectable: false,
      name: "test",
    });

    console.log("s");
    console.log(line?.node.attrs.draggable);
    console.log(line?.node.getAttrs());
    line?.node.setAttrs({
      draggable: false,
      selectable: false,
    });

    // console.log(line?.node.opacity(0));

    editor?.shapes.line.insert({
      points: [90, 550, 990, 550], //x_start , y_start, x_end, y_end
      name: "test",
    });
    editor?.shapes.line.insert({
      points: [116, 75, 965, 75], //x_start , y_start, x_end, y_end
      name: "test",
    });
    editor?.shapes.line.insert({
      points: [116, 525, 965, 525], //x_start , y_start, x_end, y_end
      name: "test",
    });

    // editor?.board.layer.children.map((el, index) => {
    //   el.draggable = false;
    // });
  }, [editor]);

  console.log(editor?.snapGrid);

  return (
    <>
      <div
        ref={ref}
        style={{
          background: "#fff",
          width: "100%",
          height: "50vh",
        }}
      />

      <button onClick={createCircle}>Create Circle</button>
      <br />
      <br />
      <button
        onClick={() => {
          editor?.board.background.setImageFromUrl(
            "/asserts/editor/backgorund1.png"
          );
          editor.loadFromUrl("/asserts/editor/background1.png");
        }}
      >
        Createbg
      </button>
      <br />
      <button
        onClick={() => {
          console.log(editor.board.layer.children);
        }}
      >
        레이어 보자
      </button>
      <br />
      <button
        onClick={() => {
          console.log(
            editor.board.selection.list.find(
              (obj) => obj.node.attrs.name === "test"
            )
          );

          editor?.board.selection.list.forEach((obj) => {
            if (obj.node.attrs.name === "test") {
              obj.deselect();
            }
          });
          // editor.board.selection;
        }}
      >
        레이어 보자
      </button>
    </>
  );
};

export default TestKonva3;
