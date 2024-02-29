import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import * as S from "../styles/new_styles";
import EditorHeader from "../components/editor/EditorHeader";
import EditorSidebar from "../components/editor/EditorSidebar";
import { EditorAddtion } from "../components/editor/EditorAddtion";
import testlogo from "../assets/testlogo.png";
import { tem1 } from "../components/editor/tem";

const EditorPage = () => {
  const [objectsHistory, setObjectsHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [dimensions, setDimentions] = useState({ width: 0, height: 0 });
  const [pan, setPan] = useState(false);

  const [test, setTest] = useState(null);

  const [popupVisible, setPopupVisible] = useState(false);

  const [objx, setObjx] = useState(0);
  const [objy, setObjy] = useState(0);
  const [objw, setObjw] = useState(0);
  const [selectedObj, setSelectedObj] = useState();

  const defaultWidth = 900;
  const defaultHight = 500;
  const [canvasWidth, setCanvasWidth] = useState(defaultWidth);
  const [canvasHight, setCanvasHight] = useState(defaultHight);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

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

    // 드래그 선택
    initCanvas.on("selection:created", (options) => {
      if (options.selected.length === 1) {
        // 객체가 1개일 때
        const item = options.selected[0];
        setObjx(item.left);
        setObjy(item.top);
        setObjw(item.width * item.scaleX);
        const object = initCanvas.getActiveObject();
        console.log("이놈인가");
        console.log(options.selected);
        setSelectedObj(object);
        setPopupVisible(true);
      } else if (options.selected.length > 1) {
        // 객체가 1개 이상일 때 ( 다중 선택 )
        console.log(options);
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

    // Set initial canvas size based on window
    const updateCanvasSize = () => {
      if (initCanvas) {
        const width = canvasWidth;
        const height = canvasHight;
        // const width = window.innerWidth;
        // const height = window.innerHeight;
        setDimentions({ width, height });
        initCanvas.setWidth(width);
        initCanvas.setHeight(height);
        initCanvas.setBackgroundColor("#fff");
        initCanvas.renderAll();
      }
    };
    updateCanvasSize();

    const initGrid = () => {
      // Create grid lines
      const gridSize = 50;
      const gridColor = "#ccc";
      const width = canvasWidth;
      const height = canvasHight;
      const xgrids = [];
      const ygrids = [];
      for (let i = 0; i < width / gridSize; i++) {
        const line = new fabric.Line([i * gridSize, 0, i * gridSize, height], {
          stroke: gridColor,
          // selectable: false,
          // evented: false,
        });
        xgrids.push(line);
        // initCanvas.add(line);
      }

      for (let i = 0; i < height / gridSize; i++) {
        const line = new fabric.Line([0, i * gridSize, width, i * gridSize], {
          stroke: gridColor,
          selectable: false,
          evented: false,
        });
        ygrids.push(line);
        // initCanvas.add(line);
      }

      // Create xy 선

      const maxWidth = window.innerWidth;
      const maxHeight = window.innerHeight;

      //[x 시작 , y시작 , x끝 , y 끝]

      const xAxis = new fabric.Line([5, 5, width - 5, 5], {
        //가로선
        stroke: "#aaa",
        strokeWidth: 1.5,
        strokeDashArray: [3, 3], // 점선 패턴 지정
        selectable: false,
        evented: false,
      });

      const xAxis2 = new fabric.Line([5, height - 5, width - 5, height - 5], {
        //가로선
        stroke: "#aaa",
        strokeWidth: 1.5,
        strokeDashArray: [3, 3], // 점선 패턴 지정
        selectable: false,
        evented: false,
      });

      const yAxis = new fabric.Line([5, 5, 5, height - 5], {
        //세로선
        stroke: "#aaa",
        strokeWidth: 1.5,
        strokeDashArray: [3, 3], // 점선 패턴 지정
        selectable: false,
        evented: false,
      });

      const yAxis2 = new fabric.Line([width - 5, 5, width - 5, height - 5], {
        //세로선
        stroke: "#aaa",
        strokeWidth: 1.5,
        strokeDashArray: [3, 3], // 점선 패턴 지정
        selectable: false,
        evented: false,
      });

      // initCanvas.add(xAxis, yAxis, xAxis2, yAxis2);
      // initCanvas.insertAt(xAxis, 0, true);

      const xGridGroup = new fabric.Group(xgrids, {
        // selectable: false,
        // evented: false,
      });

      const yGridGroup = new fabric.Group(ygrids, {
        // selectable: false,
        // evented: false,
      });

      const xyLinesGroup = new fabric.Group([xAxis, yAxis, xAxis2, yAxis2], {
        // selectable: false,
        // evented: false,
      });
      // 추가된 그리드와 xyLines를 그룹으로 묶음
      const backgroundLineGroup = new fabric.Group(
        [xGridGroup, yGridGroup, xyLinesGroup],
        {
          name: "background",
          selectable: false,
          evented: false,
        }
      );
      // 그룹 묶은 개체 생성
      initCanvas.add(backgroundLineGroup);
    };

    initGrid();

    /*
    // Add random objects
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 60,
      height: 70
    });

    const circle = new fabric.Circle({
      left: 200,
      top: 200,
      fill: "green",
      radius: 50
    });

    initCanvas.add(rect, circle);
    */

    // Add event listener for window resize
    window.addEventListener("resize", updateCanvasSize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

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
  //       newFabricCanvas.setHeight(dimensions.height);
  //       newFabricCanvas.setWidth(dimensions.width);
  //     }
  //     newFabricCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  //     setFabricCanvas(newFabricCanvas);
  //   }
  // }, [fabricCanvas, zoom]);

  const functions = {
    // 파일로 저장
    handleExport: () => {
      if (fabricCanvas) {
        // Change the color of the current background
        fabricCanvas.backgroundColor = "white";
        // Export the canvas with the white background
        const link = document.createElement("a");
        link.href = fabricCanvas.toDataURL({
          format: "png",
          quality: 0.8,
        });
        let file_name = (Math.random() + 1).toString(36).substring(7);
        link.download = `canvas_export_${file_name}.png`;
        link.click();
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
          fill: "red",
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
          width: 50,
          height: 50,
          fill: "red",
        });
        newFabricCanvas.add(rect);
        newFabricCanvas.renderAll();
      }
    },

    // 텍스트박스 성공
    handleAddText: (text) => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        const txt = new fabric.Textbox(text, {
          fontFamily: "Delicious_500",
          left: 100,
          top: 100,
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
          if (obj.name === "background") {
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
          if (obj.name === "background") {
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

    handleAddImgText: () => {
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
  };

  return (
    <>
      <div>
        <EditorHeader functions={functions} zoom={zoom} setZoom={setZoom} />
        <S.MainLayout>
          <S.EditorWrapper>
            <S.AddBox>
              <EditorSidebar
                functions={functions}
                zoom={zoom}
                setZoom={setZoom}
              />
            </S.AddBox>

            <S.CanvasBox canvasWidth={canvasWidth} canvasHight={canvasHight}>
              <canvas ref={canvasRef} />
              {popupVisible && (
                <EditorAddtion
                  canvasx={defaultWidth}
                  canvasy={defaultHight}
                  objx={objx}
                  objy={objy}
                  objw={objw}
                  objzoom={zoom}
                  obj={selectedObj}
                  functions={functions}
                  forceUpdate={forceUpdate}
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
