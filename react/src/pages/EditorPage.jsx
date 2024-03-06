import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import * as S from "../styles/new_styles";
import EditorHeader from "../components/editor/EditorHeader";
import EditorSidebar from "../components/editor/EditorSidebar";
import { EditorAddtion } from "../components/editor/EditorAddtion";
import testlogo from "../assets/testlogo.png";
import { tem1 } from "../components/editor/tem";
import background1 from "../assets/editor/background1.png";
import background2 from "../assets/editor/background2.png";
import "fabric-history";

const undoStack = [];
const redoStack = [];
const defaultWidth = 900;
const defaultHight = 500;
const backgroundImageUrl = background1; // 이미지 URL로 변경
const EditorPage = () => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [dimensions, setDimentions] = useState({ width: 0, height: 0 });
  const [test, setTest] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [objx, setObjx] = useState(0);
  const [objy, setObjy] = useState(0);
  const [objw, setObjw] = useState(0);
  const [selectedObj, setSelectedObj] = useState();
  const [canvasWidth, setCanvasWidth] = useState(defaultWidth);
  const [canvasHight, setCanvasHight] = useState(defaultHight);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  // 사이드바 상태 관리
  const [isAddVisible, setIsAddVisible] = useState(false);

  // Set initial canvas size based on window
  const updateCanvasSize = (initCanvas) => {
    if (initCanvas) {
      const width = canvasWidth * zoom;
      const height = canvasHight * zoom;
      // const width = window.innerWidth;
      // const height = window.innerHeight;
      // setDimentions({ width, height });
      initCanvas.setZoom(zoom);
      initCanvas.setWidth(width);
      initCanvas.setHeight(height);
      initCanvas.setBackgroundColor("#fff");
      initCanvas.renderAll();
    }
  };

  useEffect(() => {
    const initCanvas = new fabric.Canvas(canvasRef.current, {
      preserveObjectStacking: true,
    });

    // 마우스 클릭 이벤트
    // initCanvas.on("mouse:up", (options) => {
    //   if (options.target && options.target.type != "activeSelection") {
    //     setObjx(options.target.left);
    //     setObjy(options.target.top);
    //     setObjw(options.target.width * options.target.zoomX);
    //     const object = initCanvas.getActiveObject();
    //     setSelectedObj(object);
    //     setPopupVisible(true);
    //   }
    // });

    // fabric.Image.fromURL(backgroundImageUrl, (img) => {
    //   img.set({
    //     width: initCanvas.width,
    //     height: initCanvas.height,
    //     selectable: false,
    //   });
    //   initCanvas.setBackgroundImage(img, initCanvas.renderAll.bind(initCanvas));
    //   initCanvas.onHistory();
    //   initCanvas.clearHistory();
    // });

    // 드래그 선택
    initCanvas.on("selection:created", (options) => {
      if (options.selected.length === 1) {
        // 객체가 1개일 때
        const item = options.selected[0];
        setObjx(item.left);
        setObjy(item.top);
        setObjw(item.width * item.scaleX);
        const object = initCanvas.getActiveObject();
        console.log(options.selected);
        setSelectedObj(object);
        setPopupVisible(true);
      } else if (options.selected.length > 1) {
        // 객체가 1개 이상일 때 ( 다중 선택 )
        console.log(options);
        console.log("드래그선택");
        const item = options.selected[options.selected.length - 1];
        setObjx(Math.round(item.group.left));
        setObjy(Math.round(item.group.top));
        setObjw(Math.round(item.group.width));
        const object = options.selected;
        setSelectedObj(object);
        setPopupVisible(true);
      }
    });

    // 다른객체선택
    initCanvas.on("selection:updated", (options) => {
      // 객체가 1개일 때
      try {
        const item = options.selected[0];
        if (item.group) {
          setObjx(item.group.left);
          setObjy(item.group.top);
          setObjw(item.group.width * item.group.scaleX);
          const object = initCanvas.getActiveObject();
          setSelectedObj(object);
          setPopupVisible(true);
          // 다중 선택
        } else {
          setObjx(item.left);
          setObjy(item.top);
          setObjw(item.width * item.scaleX);
          const object = initCanvas.getActiveObject();
          console.log(object);
          setSelectedObj(object);
          setForceUpdate(forceUpdate++);
          setPopupVisible(true);
        }
      } catch (e) {
        console.log(e);
      }
    });

    // 오브젝트 이동
    initCanvas.on("object:modified", (options) => {
      // 다수면
      try {
        if (options.target._objects.length > 1) {
          const item = options.target._objects[0];
          setObjx(Math.round(item.group.left));
          setObjy(Math.round(item.group.top));
          setObjw(Math.round(item.group.width * item.group.scaleX));
          const object = options.target._objects;
          setSelectedObj(object);
          setForceUpdate(forceUpdate++);
          setPopupVisible(true);
        }
      } catch (e) {
        console.log("asdasd");
        const item = options.target;
        setObjx(Math.round(item.left));
        setObjy(Math.round(item.top));
        setObjw(Math.round(item.width * item.scaleX));
        const object = item;
        setSelectedObj(object);
        setForceUpdate(forceUpdate + 1);
        setPopupVisible(true);
      }
    });

    // 빈 곳 선택
    initCanvas.on("selection:cleared", (options) => {
      setPopupVisible(false);
    });

    setFabricCanvas(initCanvas);
    updateCanvasSize(initCanvas);

    // Add event listener for window resize
    window.addEventListener("resize", updateCanvasSize(fabricCanvas));

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateCanvasSize(fabricCanvas));
    };
  }, []);

  // 캔버스 초기화 useEffect
  useEffect(() => {
    if (fabricCanvas) {
      functions.addSafeZone();
      fabricCanvas.onHistory();
      fabricCanvas.clearHistory();
    }
  }, [fabricCanvas]);

  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.setZoom(zoom);
      setCanvasWidth(defaultWidth * zoom);
      setCanvasHight(defaultHight * zoom);
      fabricCanvas.setWidth(defaultWidth * zoom);
      fabricCanvas.setHeight(defaultHight * zoom);
      setPopupVisible(false);
      fabricCanvas.renderAll();
    }
  }, [zoom]);

  /*
  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.on("mouse:dblclick", () => {
        setPan((prevPan) => !prevPan);
      });

      fabricCanvas.on("mouse:move", (e) => {
        if (pan) {
          const moveX = e.e.movementX;
          const moveY = e.e.movementY;
          fabricCanvas.relativePan(new fabric.Point(moveX, moveY));
        }
      });
    }
  }, [fabricCanvas, pan]);
  */

  // useEffect(() => {
  //   if (fabricCanvas) {
  //     fabricCanvas.setZoom(zoom);
  //     fabricCanvas.renderAll();
  //   }
  // }, [zoom, fabricCanvas]);

  // //Update the dimensions of the Canvas based on zooming value
  // useEffect(() => {
  //   if (fabricCanvas) {
  //     const newFabricCanvas = fabricCanvas;

  //     if (zoom > 1) {
  //       newFabricCanvas.setHeight(dimensions.height * zoom);
  //       newFabricCanvas.setWidth(dimensions.width * zoom);
  //     } else {
  //       newFabricCanvas.setHeight(dimensions.height * zoom);
  //       newFabricCanvas.setWidth(dimensions.width * zoom);
  //     }
  //     newFabricCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  //     setFabricCanvas(newFabricCanvas);
  //   }
  // }, [fabricCanvas, zoom]);

  const functions = {
    // 파일로 저장
    handleExport: () => {
      let gridOn = false;
      let safeOn = false;
      if (fabricCanvas) {
        // Change the color of the current background
        // fabricCanvas.backgroundColor = "white";
        // Export the canvas with the white background
        const allObjects = fabricCanvas.getObjects();
        const gridObjects = allObjects.filter((obj) => obj.name === "grid");
        const safeObjects = allObjects.filter((obj) => obj.name === "safe");
        if (gridObjects.length > 0) {
          gridObjects.forEach((gridObj) => {
            fabricCanvas.remove(gridObj);
            gridOn = true;
          });
        }

        if (safeObjects.length > 0) {
          safeObjects.forEach((safeObj) => {
            fabricCanvas.remove(safeObj);
            safeOn = true;
          });
        }

        const link = document.createElement("a");
        link.href = fabricCanvas.toDataURL({
          format: "png",
          quality: 0.8,
        });
        let file_name = (Math.random() + 1).toString(36).substring(7);
        link.download = `snowwhite_export_${file_name}.png`;
        link.click();

        if (gridOn === true) {
          functions.addGridLayout();
        }
        if (safeOn === true) {
          functions.addSafeZone();
        }
      }
    },

    // 원 생성
    handleAddCircle: () => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        const circle = new fabric.Circle({
          left: 10,
          top: 10,
          radius: 50,
          fill: "rgba(0,0,0,1)",
        });
        newFabricCanvas.add(circle);
        newFabricCanvas.renderAll();
      }
    },

    // 네모 생성
    handleAddRectangle: () => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        const rect = new fabric.Rect({
          left: 10,
          top: 10,
          width: 100,
          height: 100,
          fill: "rgba(0,0,0,1)",
          opacity: 1,
        });
        newFabricCanvas.add(rect);
        newFabricCanvas.renderAll();
      }
    },

    // 텍스트박스 생성
    handleAddText: (text) => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        const txt = new fabric.Textbox("텍스트", {
          fontFamily: "굴림체",
          fontWeight: 500,
          lineHeight: 1.0,
          left: 10,
          top: 10,
          fill: "rgba(0,0,0,1)",
          textAlign: "left",
        });
        newFabricCanvas.add(txt);
        newFabricCanvas.renderAll();
      }
    },

    // 삭제
    handleDeleteSelected: () => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        const object = newFabricCanvas.getActiveObject();

        try {
          if (object._objects) {
            object._objects.forEach((item) => {
              newFabricCanvas.remove(item);
            });
          } else {
            newFabricCanvas.remove(object);
          }
        } catch (e) {}
        setPopupVisible(false);
        newFabricCanvas.discardActiveObject(); // 지정 해제
        newFabricCanvas.renderAll();
      }
    },

    // 초기화
    handleDeleteAll: () => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        newFabricCanvas.clear();
        newFabricCanvas.renderAll();
      }
    },

    // 뒤로가기
    handleSendToBack: () => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        const object = newFabricCanvas.getActiveObject();
        console.log(object);
        setSelectedId(object.id);
        newFabricCanvas.sendToBack(object);
        //디폴트 배경 뒤로가기
        newFabricCanvas.forEachObject((obj) => {
          if (obj.name === "grid") {
            newFabricCanvas.sendToBack(obj);
          } else {
          }
        });
        if (object) {
          // newFabricCanvas.discardActiveObject(); // 지정 해제
          //setPopupVisible(false);
          // var sel = new fabric.ActiveSelection(newFabricCanvas.getObjects(), {
          //   canvas: newFabricCanvas,
          // });
          // console.log(sel._objects[1]);
          // console.log("sel임");
          // newFabricCanvas.setActiveObject(sel._objects[1]); // 이게 잘 안됨
        }
        newFabricCanvas.requestRenderAll();
      }
    },
    handleSendToFront: () => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        const object = newFabricCanvas.getActiveObject();
        newFabricCanvas.bringToFront(object);
        //라인 뒤로가기
        newFabricCanvas.forEachObject((obj) => {
          if (obj.name === "grid") {
            newFabricCanvas.sendToBack(obj);
          } else {
          }
        });
        if (object) {
          // newFabricCanvas.discardActiveObject(); // 지정 해제
          // setPopupVisible(false);
          // newFabricCanvas.setActiveObject(object); // 이게 잘 안됨
        }
        newFabricCanvas.requestRenderAll();
      }
    },
    test: () => {
      setZoom(zoom + 0.1);
    },

    setFontSize: (obj, value) => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        obj.set("fontSize", value);
        newFabricCanvas.requestRenderAll();
      }
    },
    testSave: () => {
      setTest(fabricCanvas.toJSON(["name"]));
      console.log(fabricCanvas.toJSON(["name"]));
    },

    testLoad: () => {
      fabricCanvas.loadFromJSON(test, () => {
        fabricCanvas.forEachObject((obj) => {
          // 여기에서 원하는 조건에 따라 selectable 속성을 설정할 수 있습니다.
          if (obj.name === "background") {
            obj.set("selectable", false);
            obj.set("evented", false);
          } else {
            obj.set("selectable", true);
            obj.set("evented", true);
          }
        });

        fabricCanvas.renderAll();
      });
    },

    handleAddImg: () => {
      const imgURL = testlogo; // 이미지 파일의 URL 또는 Base64 데이터
      fabric.Image.fromURL(imgURL, (img) => {
        // 캔버스에 이미지 객체 추가
        fabricCanvas.add(img);
      });
    },
    testTem: () => {
      fabricCanvas.loadFromJSON(tem1);
      fabricCanvas.renderAll();
    },

    setColor: (obj, value) => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        obj.set("fill", value);
        newFabricCanvas.requestRenderAll();
      }
    },
    setFontStyle: (obj, value) => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        obj.set("fontFamily", value);
        newFabricCanvas.requestRenderAll();
      }
    },
    setFontHeight: (obj, value) => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        obj.set("lineHeight", value);
        newFabricCanvas.requestRenderAll();
      }
    },

    setFontWeight: (obj, value) => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        obj.set("fontWeight", value);
        newFabricCanvas.requestRenderAll();
      }
    },
    setTextAlign: (obj, value) => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        obj.set("textAlign", value);
        newFabricCanvas.requestRenderAll();
      }
    },
    setTextItalic: (obj) => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        obj.fontStyle === "italic"
          ? obj.set("fontStyle", "normal")
          : obj.set("fontStyle", "italic");
        newFabricCanvas.requestRenderAll();
      }
    },
    setTextUnderline: (obj) => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        obj.underline
          ? obj.set("underline", false)
          : obj.set("underline", true);
        newFabricCanvas.requestRenderAll();
      }
    },

    setOpacity: (obj, value) => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        newFabricCanvas.getActiveObject().set("opacity", value);
        newFabricCanvas.requestRenderAll();
      }
    },

    handleCopy: (obj) => {
      let _clipboard;
      if (fabricCanvas) {
        fabricCanvas.getActiveObject().clone(function (cloned) {
          _clipboard = cloned;
          // clone again, so you can do multiple copies.
          _clipboard.clone(function (clonedObj) {
            fabricCanvas.discardActiveObject();
            clonedObj.set({
              left: clonedObj.left + 10,
              top: clonedObj.top + 10,
              evented: true,
            });
            if (clonedObj.type === "activeSelection") {
              // active selection needs a reference to the canvas.
              clonedObj.canvas = fabricCanvas;
              clonedObj.forEachObject(function (obj) {
                fabricCanvas.add(obj);
              });
              // this should solve the unselectability
              clonedObj.setCoords();
            } else {
              fabricCanvas.add(clonedObj);
            }
            _clipboard.top += 10;
            _clipboard.left += 10;
            fabricCanvas.setActiveObject(clonedObj);
            fabricCanvas.requestRenderAll();
          });
        });
      }
    },
    handleGroupObj: (obj) => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        if (fabricCanvas.getActiveObject().type !== "activeSelection") {
          return;
        }
        newFabricCanvas.getActiveObject().toGroup();
        newFabricCanvas.requestRenderAll();
      }
    },
    handleUngroupObj: (obj) => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        if (newFabricCanvas.getActiveObject().type !== "group") {
          return;
        }
        newFabricCanvas.getActiveObject().toActiveSelection();
        // newFabricCanvas.discardActiveObject(); // 지정 해제
        newFabricCanvas.requestRenderAll();
      }
    },

    undo: () => {
      fabricCanvas.undo();
    },
    redo: () => {
      fabricCanvas.redo();
    },
    setBackgroundColor: (color) => {
      fabricCanvas.setBackgroundColor(color, () => {
        fabricCanvas.renderAll();
      });
    },
    addGridLayout: () => {
      const allObjects = fabricCanvas.getObjects();
      const gridObjects = allObjects.filter((obj) => obj.name === "grid");
      if (gridObjects.length > 0) {
        gridObjects.forEach((gridObj) => {
          fabricCanvas.remove(gridObj);
        });
        return;
      }

      const gridLine = [];

      // 메인 그리드 그리기
      let gridSize_X = defaultWidth / 5;
      let girdSize_Y = defaultHight / 3;
      for (let x = 1; x < defaultWidth / gridSize_X; x++) {
        const grid_x = new fabric.Line(
          [gridSize_X * x - 0.5, 0, gridSize_X * x - 0.5, 900],
          {
            stroke: "#ccc",
            strokeWidth: 2,
            selectable: false,
            name: "grid",
          }
        );
        gridLine.push(grid_x);
        // grid_x.sendToBack();
      }

      for (let y = 1; y < defaultHight / girdSize_Y; y++) {
        const grid_y = new fabric.Line(
          [0, girdSize_Y * y + 0.5, 900, girdSize_Y * y + 0.5],
          {
            stroke: "#ccc",
            strokeWidth: 2,
            selectable: false,
            name: "grid",
          }
        );
        gridLine.push(grid_y);
        // grid_y.sendToBack();
      }

      // 서브 그리드 그리기
      gridSize_X = defaultWidth / 90;
      girdSize_Y = defaultHight / 48;
      for (let x = 1; x < defaultWidth / gridSize_X; x++) {
        const grid_x = new fabric.Line(
          [gridSize_X * x, 0, gridSize_X * x, 900],
          {
            stroke: "#eee",
            strokeWidth: 1,
            selectable: false,
            name: "grid",
          }
        );
        gridLine.push(grid_x);
        // grid_x.sendToBack();
      }

      for (let y = 1; y < defaultHight / girdSize_Y; y++) {
        const grid_y = new fabric.Line(
          [0, girdSize_Y * y, 900, girdSize_Y * y],
          {
            stroke: "#eee",
            strokeWidth: 1,
            selectable: false,
            name: "grid",
          }
        );
        gridLine.push(grid_y);
        // grid_y.sendToBack();
      }

      let gridGroup = new fabric.Group(gridLine, {
        selectable: false,
        evented: false,
        name: "grid",
      });
      fabricCanvas.add(gridGroup);
      gridGroup.sendToBack();

      // fabricCanvas.onHistory();
      // fabricCanvas.clearHistory();
    },

    addSafeZone: () => {
      const safeline = [];

      const safesize = 30;
      const lineColor = "#888";
      const lineWeight = 1.5;
      //[x 시작 , y시작 , x끝 , y 끝]

      safeline.push(
        new fabric.Line([safesize, safesize, safesize, 500 - safesize], {
          stroke: lineColor,
          strokeWidth: lineWeight,
          selectable: false,
          evented: false,
          strokeDashArray: [10, 4], // 점선 패턴 지정
        })
      );

      safeline.push(
        new fabric.Line(
          [900 - safesize, safesize, 900 - safesize, 501 - safesize],
          {
            stroke: lineColor,
            strokeWidth: lineWeight,
            selectable: false,
            evented: false,
            strokeDashArray: [10, 4], // 점선 패턴 지정
          }
        )
      );

      safeline.push(
        new fabric.Line([safesize, safesize, 900 - safesize, safesize], {
          stroke: lineColor,
          strokeWidth: lineWeight,
          selectable: false,
          evented: false,
          strokeDashArray: [10, 3], // 점선 패턴 지정
        })
      );

      safeline.push(
        new fabric.Line(
          [safesize, 500 - safesize, 900 - safesize, 500 - safesize],
          {
            stroke: lineColor,
            strokeWidth: lineWeight,
            selectable: false,
            evented: false,
            strokeDashArray: [10, 3], // 점선 패턴 지정
          }
        )
      );
      let safeGroup = new fabric.Group(safeline, {
        selectable: false,
        evented: false,
        name: "safe",
      });
      fabricCanvas.add(safeGroup);
      safeGroup.sendToBack();
    },
  };

  return (
    <>
      <div>
        <EditorHeader
          functions={functions}
          zoom={zoom}
          setZoom={setZoom}
          isAddVisible={isAddVisible}
        />
        <S.MainLayout>
          <S.EditorWrapper>
            <EditorSidebar
              functions={functions}
              zoom={zoom}
              setZoom={setZoom}
              isAddVisible={isAddVisible}
              setIsAddVisible={setIsAddVisible}
            />

            <S.CanvasBox canvasWidth={canvasWidth} canvasHight={canvasHight}>
              <canvas ref={canvasRef} />
              {popupVisible && (
                <EditorAddtion
                  canvas={fabricCanvas}
                  canvasx={defaultWidth}
                  canvasy={defaultHight}
                  objx={objx}
                  objy={objy}
                  objw={objw}
                  objzoom={zoom}
                  obj={selectedObj}
                  functions={functions}
                  forceUpdate={forceUpdate}
                  zoom={zoom}
                />
              )}
            </S.CanvasBox>
          </S.EditorWrapper>
        </S.MainLayout>
      </div>
    </>
  );
};

export default EditorPage;
