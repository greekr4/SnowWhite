import usePikaso from "pikaso-react-hook";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

const PikasoEditor = forwardRef(
  (
    {
      setPopUpdate,
      popUpdate,
      setObjSelection,
      setObjx,
      setObjy,
      setIsPopVisible,
      setHistoryStep,
      historyStep,
      zoom,
      setZoom,
      editorIndex,
      selectedEditor,
    },
    editorRef
  ) => {
    useImperativeHandle(editorRef, () => ({
      functions,
    }));

    const [ref, editor] = usePikaso({
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

    editor?.snapGrid.setOptions({
      strokeWidth: 1,
      stroke: "#777",
      dash: [3, 3],
      width: 100,
    });
    editor?.snapGrid.setOffset(10); // default is

    useEffect(() => {
      // 배경 설정
      editor?.board.background.setImageFromUrl(
        "/asserts/editor/backgorund1.png"
      );
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

            setPopUpdate((popUpdate) => popUpdate + 1);
            console.log("popup");
            console.log(popUpdate);
            console.log("popup");
            setObjSelection(editor?.selection);
            console.log("셀ㄹ레겻ㄴ임");
            console.log(editor?.selection);
            console.log("셀ㄹ레겻ㄴ임");
            if (editor?.selection.list.length > 0) {
              if (editor?.selection.list[0].type === "label") {
                setObjx(editor?.selection.transformer.getX());
                setObjy(editor?.selection.transformer.getY() - 75);
              } else {
                setObjx(editor?.selection.transformer.getX());
                setObjy(editor?.selection.transformer.getY());
              }
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

    const functions = {
      createCircle: () => {
        editor?.shapes.circle.insert({
          type: "shape",
          x: editor?.board.stage.attrs.width / 2,
          y: editor?.board.stage.attrs.height / 2,
          radius: 50,
          fill: "#000",
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
          fill: "#000",
          draggable: true,
        });
      },
      createText: () => {
        editor?.shapes.label.insert({
          container: {
            x: editor?.board.stage.attrs.width / 2 - 20,
            y: editor?.board.stage.attrs.height / 2 - 20,
          },
          text: {
            text: "TK",
            fill: "#000",
            fontSize: 40,
            fontFamily: "굴림체",
          },
        });
      },
      createImage: (image) => {
        editor?.shapes.image.insert(image, {
          x: editor?.board.stage.attrs.width / 2 - 50,
          y: editor?.board.stage.attrs.height / 2 - 50,
          width: 100,
          height: 100,
        });
      },
      createBackgorund: (color) => {
        editor?.board.getNodes().forEach((obj) => {
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
      undo: () => {
        if (historyStep < editor?.history.step) editor?.undo();
      },
      redo: () => {
        editor?.redo();
      },
      toggleSnapGrid: () => {
        !editor?.snapGrid.active
          ? editor?.snapGrid.enable()
          : editor?.snapGrid.disable();
      },
      zoomIn: () => {
        if (zoom < 1.5) setZoom((zoom) => zoom + 0.1);
      },
      zoomOut: () => {
        if (zoom >= 0.6) setZoom((zoom) => zoom - 0.1);
      },
      zoomReset: () => {
        setZoom(1);
        editor?.board.rescale();
      },
      zoomSet: () => {
        if (!editor) return false;
        editor.board.stage.content.style.transform = `translate(-50%, -50%) scale(${zoom})`;
      },
      test: () => {
        console.log(editor);
      },
    };

    useEffect(() => {
      functions.zoomSet();
    }, [zoom]);

    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
      if (editorIndex != selectedEditor) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }, [selectedEditor]);
    return (
      <div
        ref={ref}
        style={{
          background: "#eee",
          width: "100%",
          height: "100vh",
          opacity: isVisible ? "1" : "0",
        }}
      />
    );
  }
);

export default PikasoEditor;
