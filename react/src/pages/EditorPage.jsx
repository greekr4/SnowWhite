import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import * as S from "../styles/new_styles";
import EditorHeader from "../components/editor/EditorHeader";
import EditorSidebar from "../components/editor/EditorSidebar";
import { EditorAddtion } from "../components/editor/EditorAddtion";
import testlogo from "../assets/testlogo.png";

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

  useEffect(() => {
    const initCanvas = new fabric.Canvas(canvasRef.current);

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
        console.log(item);
        console.log("dd");
        setObjx(item.left);
        setObjy(item.top);
        setObjw(item.width * item.scaleX);
        const object = initCanvas.getActiveObject();
        setSelectedObj(object);
        setPopupVisible(true);
      } else if (options.selected.length > 1) {
        // 객체가 1개 이상일 때 ( 다중 선택 )
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
          console.log(item);
          console.log("dd");
          setObjx(item.left);
          setObjy(item.top);
          setObjw(item.width * item.scaleX);
          const object = initCanvas.getActiveObject();
          setSelectedObj(object);
          setPopupVisible(true);
        }
      } catch (e) {
        console.log(e);
      }
    });

    // 오브젝트 이동
    initCanvas.on("object:modified", (options) => {
      console.log(options);
      console.log("오브젝트이동");

      // console.log(options.target._objects.length);

      // 다수면
      try {
        if (options.target._objects.length > 1) {
          console.log("두개이상 이동했음");
          const item = options.target._objects[0];
          setObjx(Math.round(item.group.left));
          setObjy(Math.round(item.group.top));
          setObjw(Math.round(item.group.width * item.group.scaleX));
          const object = options.target._objects;
          setSelectedObj(object);
          setPopupVisible(true);
        }
      } catch (e) {
        console.log("1개임");
        const item = options.target;
        console.log(item);
        setObjx(Math.round(item.left));
        setObjy(Math.round(item.top));
        setObjw(Math.round(item.width * item.scaleX));
        const object = item;
        setSelectedObj(object);
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

      console.log(initCanvas._objects);

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
          name: "backgorund",
          selectable: false,
          evented: false,
        }
      );
      // 그룹 묶은 개체 생성
      initCanvas.add(backgroundLineGroup);
      console.log(backgroundLineGroup);
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

    handleDeleteAll: () => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        newFabricCanvas.clear();
        newFabricCanvas.renderAll();
      }
    },

    handleSendToBack: () => {
      if (fabricCanvas) {
        const newFabricCanvas = fabricCanvas;
        const object = newFabricCanvas.getActiveObject();
        newFabricCanvas.sendToBack(object);
        //라인 뒤로가기
        newFabricCanvas.forEachObject((obj) => {
          if (obj.type === "line") {
            newFabricCanvas.sendToBack(obj);
          } else {
          }
        });
        if (object) {
          console.log(object);
          newFabricCanvas.discardActiveObject(); // 지정 해제
          setPopupVisible(false);
          // newFabricCanvas.setActiveObject(object); // 이게 잘 안됨
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
          if (obj.type === "line") {
            newFabricCanvas.sendToBack(obj);
          } else {
          }
        });
        if (object) {
          console.log(object);
          newFabricCanvas.discardActiveObject(); // 지정 해제
          setPopupVisible(false);
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
      console.log(fabricCanvas.toJSON(["name"]));
      console.log(fabricCanvas.toJSON());
      setTest(fabricCanvas.toJSON(["name"]));
    },
    testLoad: () => {
      // fabricCanvas.loadFromJSON(test, () => {
      //   fabricCanvas.forEachObject((obj) => {
      //     console.log(obj);
      //     // 여기에서 원하는 조건에 따라 selectable 속성을 설정할 수 있습니다.
      //     if (obj.name === "backgorund") {
      //       obj.set("selectable", false);
      //       obj.set("evented", false);
      //     } else {
      //       obj.set("selectable", true);
      //       obj.set("evented", true);
      //     }
      //   });
      //   fabricCanvas.renderAll();
      // });

      const testform = {
        version: "5.3.0",
        objects: [
          {
            type: "group",
            version: "5.3.0",
            originX: "left",
            originY: "top",
            left: 0,
            top: 0,
            width: 900,
            height: 500,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 0,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            skewX: 0,
            skewY: 0,
            objects: [
              {
                type: "group",
                version: "5.3.0",
                originX: "left",
                originY: "top",
                left: -450,
                top: -250,
                width: 851,
                height: 500,
                fill: "rgb(0,0,0)",
                stroke: null,
                strokeWidth: 0,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeUniform: false,
                strokeMiterLimit: 4,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                backgroundColor: "",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                skewX: 0,
                skewY: 0,
                objects: [
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -425.5,
                    top: -250,
                    width: 0,
                    height: 500,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -250,
                    y2: 250,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -375.5,
                    top: -250,
                    width: 0,
                    height: 500,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -250,
                    y2: 250,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -325.5,
                    top: -250,
                    width: 0,
                    height: 500,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -250,
                    y2: 250,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -275.5,
                    top: -250,
                    width: 0,
                    height: 500,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -250,
                    y2: 250,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -225.5,
                    top: -250,
                    width: 0,
                    height: 500,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -250,
                    y2: 250,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -175.5,
                    top: -250,
                    width: 0,
                    height: 500,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -250,
                    y2: 250,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -125.5,
                    top: -250,
                    width: 0,
                    height: 500,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -250,
                    y2: 250,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -75.5,
                    top: -250,
                    width: 0,
                    height: 500,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -250,
                    y2: 250,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -25.5,
                    top: -250,
                    width: 0,
                    height: 500,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -250,
                    y2: 250,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: 24.5,
                    top: -250,
                    width: 0,
                    height: 500,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -250,
                    y2: 250,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: 74.5,
                    top: -250,
                    width: 0,
                    height: 500,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -250,
                    y2: 250,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: 124.5,
                    top: -250,
                    width: 0,
                    height: 500,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -250,
                    y2: 250,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: 174.5,
                    top: -250,
                    width: 0,
                    height: 500,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -250,
                    y2: 250,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: 224.5,
                    top: -250,
                    width: 0,
                    height: 500,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -250,
                    y2: 250,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: 274.5,
                    top: -250,
                    width: 0,
                    height: 500,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -250,
                    y2: 250,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: 324.5,
                    top: -250,
                    width: 0,
                    height: 500,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -250,
                    y2: 250,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: 374.5,
                    top: -250,
                    width: 0,
                    height: 500,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -250,
                    y2: 250,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: 424.5,
                    top: -250,
                    width: 0,
                    height: 500,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -250,
                    y2: 250,
                  },
                ],
              },
              {
                type: "group",
                version: "5.3.0",
                originX: "left",
                originY: "top",
                left: -450,
                top: -250,
                width: 900,
                height: 451,
                fill: "rgb(0,0,0)",
                stroke: null,
                strokeWidth: 0,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeUniform: false,
                strokeMiterLimit: 4,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                backgroundColor: "",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                skewX: 0,
                skewY: 0,
                objects: [
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -450,
                    top: -225.5,
                    width: 900,
                    height: 0,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: -450,
                    x2: 450,
                    y1: 0,
                    y2: 0,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -450,
                    top: -175.5,
                    width: 900,
                    height: 0,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: -450,
                    x2: 450,
                    y1: 0,
                    y2: 0,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -450,
                    top: -125.5,
                    width: 900,
                    height: 0,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: -450,
                    x2: 450,
                    y1: 0,
                    y2: 0,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -450,
                    top: -75.5,
                    width: 900,
                    height: 0,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: -450,
                    x2: 450,
                    y1: 0,
                    y2: 0,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -450,
                    top: -25.5,
                    width: 900,
                    height: 0,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: -450,
                    x2: 450,
                    y1: 0,
                    y2: 0,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -450,
                    top: 24.5,
                    width: 900,
                    height: 0,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: -450,
                    x2: 450,
                    y1: 0,
                    y2: 0,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -450,
                    top: 74.5,
                    width: 900,
                    height: 0,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: -450,
                    x2: 450,
                    y1: 0,
                    y2: 0,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -450,
                    top: 124.5,
                    width: 900,
                    height: 0,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: -450,
                    x2: 450,
                    y1: 0,
                    y2: 0,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -450,
                    top: 174.5,
                    width: 900,
                    height: 0,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: -450,
                    x2: 450,
                    y1: 0,
                    y2: 0,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -450,
                    top: 224.5,
                    width: 900,
                    height: 0,
                    fill: "rgb(0,0,0)",
                    stroke: "#ccc",
                    strokeWidth: 1,
                    strokeDashArray: null,
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: -450,
                    x2: 450,
                    y1: 0,
                    y2: 0,
                  },
                ],
              },
              {
                type: "group",
                version: "5.3.0",
                originX: "left",
                originY: "top",
                left: -445,
                top: -245,
                width: 891.5,
                height: 491.5,
                fill: "rgb(0,0,0)",
                stroke: null,
                strokeWidth: 0,
                strokeDashArray: null,
                strokeLineCap: "butt",
                strokeDashOffset: 0,
                strokeLineJoin: "miter",
                strokeUniform: false,
                strokeMiterLimit: 4,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                flipX: false,
                flipY: false,
                opacity: 1,
                shadow: null,
                visible: true,
                backgroundColor: "",
                fillRule: "nonzero",
                paintFirst: "fill",
                globalCompositeOperation: "source-over",
                skewX: 0,
                skewY: 0,
                objects: [
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -445.75,
                    top: -245.75,
                    width: 890,
                    height: 0,
                    fill: "rgb(0,0,0)",
                    stroke: "#aaa",
                    strokeWidth: 1.5,
                    strokeDashArray: [3, 3],
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: -445,
                    x2: 445,
                    y1: 0,
                    y2: 0,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -445.75,
                    top: -245.75,
                    width: 0,
                    height: 490,
                    fill: "rgb(0,0,0)",
                    stroke: "#aaa",
                    strokeWidth: 1.5,
                    strokeDashArray: [3, 3],
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -245,
                    y2: 245,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: -445.75,
                    top: 244.25,
                    width: 890,
                    height: 0,
                    fill: "rgb(0,0,0)",
                    stroke: "#aaa",
                    strokeWidth: 1.5,
                    strokeDashArray: [3, 3],
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: -445,
                    x2: 445,
                    y1: 0,
                    y2: 0,
                  },
                  {
                    type: "line",
                    version: "5.3.0",
                    originX: "left",
                    originY: "top",
                    left: 444.25,
                    top: -245.75,
                    width: 0,
                    height: 490,
                    fill: "rgb(0,0,0)",
                    stroke: "#aaa",
                    strokeWidth: 1.5,
                    strokeDashArray: [3, 3],
                    strokeLineCap: "butt",
                    strokeDashOffset: 0,
                    strokeLineJoin: "miter",
                    strokeUniform: false,
                    strokeMiterLimit: 4,
                    scaleX: 1,
                    scaleY: 1,
                    angle: 0,
                    flipX: false,
                    flipY: false,
                    opacity: 1,
                    shadow: null,
                    visible: true,
                    backgroundColor: "",
                    fillRule: "nonzero",
                    paintFirst: "fill",
                    globalCompositeOperation: "source-over",
                    skewX: 0,
                    skewY: 0,
                    x1: 0,
                    x2: 0,
                    y1: -245,
                    y2: 245,
                  },
                ],
              },
            ],
          },
          {
            type: "textbox",
            version: "5.3.0",
            originX: "left",
            originY: "top",
            left: 650,
            top: 124,
            width: 56,
            height: 27.12,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            skewX: 0,
            skewY: 0,
            fontFamily: "Delicious_500",
            fontWeight: "normal",
            fontSize: "24",
            text: "주임",
            underline: false,
            overline: false,
            linethrough: false,
            textAlign: "left",
            fontStyle: "normal",
            lineHeight: 1.16,
            textBackgroundColor: "",
            charSpacing: 0,
            styles: [],
            direction: "ltr",
            path: null,
            pathStartOffset: 0,
            pathSide: "left",
            pathAlign: "baseline",
            minWidth: 20,
            splitByGrapheme: false,
          },
          {
            type: "textbox",
            version: "5.3.0",
            originX: "left",
            originY: "top",
            left: 726,
            top: 105,
            width: 120,
            height: 45.2,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            skewX: 0,
            skewY: 0,
            fontFamily: "Delicious_500",
            fontWeight: "normal",
            fontSize: 40,
            text: "김태균",
            underline: false,
            overline: false,
            linethrough: false,
            textAlign: "left",
            fontStyle: "normal",
            lineHeight: 1.16,
            textBackgroundColor: "",
            charSpacing: 0,
            styles: [],
            direction: "ltr",
            path: null,
            pathStartOffset: 0,
            pathSide: "left",
            pathAlign: "baseline",
            minWidth: 20,
            splitByGrapheme: false,
          },
          {
            type: "textbox",
            version: "5.3.0",
            originX: "left",
            originY: "top",
            left: 589,
            top: 354,
            width: 259.84,
            height: 45.2,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            skewX: 0,
            skewY: 0,
            fontFamily: "Delicious_500",
            fontWeight: "normal",
            fontSize: 40,
            text: "010.4191.1611",
            underline: false,
            overline: false,
            linethrough: false,
            textAlign: "left",
            fontStyle: "normal",
            lineHeight: 1.16,
            textBackgroundColor: "",
            charSpacing: 0,
            styles: [],
            direction: "ltr",
            path: null,
            pathStartOffset: 0,
            pathSide: "left",
            pathAlign: "baseline",
            minWidth: 20,
            splitByGrapheme: false,
          },
          {
            type: "textbox",
            version: "5.3.0",
            originX: "left",
            originY: "top",
            left: 624,
            top: 404,
            width: 237.94,
            height: 20.34,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            skewX: 0,
            skewY: 0,
            fontFamily: "Delicious_500",
            fontWeight: "normal",
            fontSize: "18",
            text: "snowwhite2023@daum.net",
            underline: false,
            overline: false,
            linethrough: false,
            textAlign: "left",
            fontStyle: "normal",
            lineHeight: 1.16,
            textBackgroundColor: "",
            charSpacing: 0,
            styles: [],
            direction: "ltr",
            path: null,
            pathStartOffset: 0,
            pathSide: "left",
            pathAlign: "baseline",
            minWidth: 20,
            splitByGrapheme: false,
          },
          {
            type: "textbox",
            version: "5.3.0",
            originX: "left",
            originY: "top",
            left: 488,
            top: 430,
            width: 365,
            height: 20.34,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            skewX: 0,
            skewY: 0,
            fontFamily: "Delicious_500",
            fontWeight: "normal",
            fontSize: "18",
            text: "office. 경기도 고양시 일산동구 장대길 42-17",
            underline: false,
            overline: false,
            linethrough: false,
            textAlign: "left",
            fontStyle: "normal",
            lineHeight: 1.16,
            textBackgroundColor: "",
            charSpacing: 0,
            styles: [],
            direction: "ltr",
            path: null,
            pathStartOffset: 0,
            pathSide: "left",
            pathAlign: "baseline",
            minWidth: 20,
            splitByGrapheme: false,
          },
          {
            type: "textbox",
            version: "5.3.0",
            originX: "left",
            originY: "top",
            left: 463,
            top: 457,
            width: 396,
            height: 20.34,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            skewX: 0,
            skewY: 0,
            fontFamily: "Delicious_500",
            fontWeight: "normal",
            fontSize: "18",
            text: "headoffice & factory. 경기도 파주시 신촌2로 24",
            underline: false,
            overline: false,
            linethrough: false,
            textAlign: "left",
            fontStyle: "normal",
            lineHeight: 1.16,
            textBackgroundColor: "",
            charSpacing: 0,
            styles: [],
            direction: "ltr",
            path: null,
            pathStartOffset: 0,
            pathSide: "left",
            pathAlign: "baseline",
            minWidth: 20,
            splitByGrapheme: false,
          },
          {
            type: "textbox",
            version: "5.3.0",
            originX: "left",
            originY: "top",
            left: 19,
            top: 448,
            width: 213.06,
            height: 31.64,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            skewX: 0,
            skewY: 0,
            fontFamily: "Delicious_500",
            fontWeight: "normal",
            fontSize: "28",
            text: "(주)스노우화이트",
            underline: false,
            overline: false,
            linethrough: false,
            textAlign: "left",
            fontStyle: "normal",
            lineHeight: 1.16,
            textBackgroundColor: "",
            charSpacing: 0,
            styles: [],
            direction: "ltr",
            path: null,
            pathStartOffset: 0,
            pathSide: "left",
            pathAlign: "baseline",
            minWidth: 20,
            splitByGrapheme: false,
          },
          {
            type: "image",
            version: "5.3.0",
            originX: "left",
            originY: "top",
            left: 58,
            top: 68,
            width: 144,
            height: 144,
            fill: "rgb(0,0,0)",
            stroke: null,
            strokeWidth: 0,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeDashOffset: 0,
            strokeLineJoin: "miter",
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            backgroundColor: "",
            fillRule: "nonzero",
            paintFirst: "fill",
            globalCompositeOperation: "source-over",
            skewX: 0,
            skewY: 0,
            cropX: 0,
            cropY: 0,
            src: "data:image/png;base64,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",
            crossOrigin: null,
            filters: [],
          },
        ],
        background: "#fff",
      };
      fabricCanvas.loadFromJSON(testform);
      fabricCanvas.renderAll();
    },

    handleAddImgText: () => {
      const imgURL = testlogo; // 이미지 파일의 URL 또는 Base64 데이터
      fabric.Image.fromURL(imgURL, (img) => {
        // 캔버스에 이미지 객체 추가
        fabricCanvas.add(img);
      });
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
