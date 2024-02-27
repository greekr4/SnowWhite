import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import * as S from "../styles/new_styles";
import EditorHeader from "../components/editor/EditorHeader";
import EditorSidebar from "../components/editor/EditorSidebar";

const EditorPage = () => {
  const [objectsHistory, setObjectsHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [dimensions, setDimentions] = useState({ width: 0, height: 0 });
  const [pan, setPan] = useState(false);

  const [test, setTest] = useState(null);

  const testSave = () => {
    console.log(fabricCanvas.toJSON());
    setTest(fabricCanvas.toJSON());
  };
  const testLoad = () => {
    fabricCanvas.loadFromJSON(test);
    fabricCanvas.renderAll();
  };

  useEffect(() => {
    const initCanvas = new fabric.Canvas(canvasRef.current);
    setFabricCanvas(initCanvas);

    // Set initial canvas size based on window
    const updateCanvasSize = () => {
      if (initCanvas) {
        const width = 900;
        const height = 500;
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
      const width = 900;
      const height = 500;

      for (let i = 0; i < width / gridSize; i++) {
        initCanvas.add(
          new fabric.Line([i * gridSize, 0, i * gridSize, height], {
            stroke: gridColor,
            selectable: false,
            evented: false,
          })
        );
      }

      for (let i = 0; i < height / gridSize; i++) {
        initCanvas.add(
          new fabric.Line([0, i * gridSize, width, i * gridSize], {
            stroke: gridColor,
            selectable: false,
            evented: false,
          })
        );
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

      initCanvas.add(xAxis, yAxis, xAxis2, yAxis2);
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

  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.setZoom(zoom);
      fabricCanvas.renderAll();
    }
  }, [zoom, fabricCanvas]);

  //Update the dimensions of the Canvas based on zooming value
  useEffect(() => {
    if (fabricCanvas) {
      const newFabricCanvas = fabricCanvas;
      if (zoom > 1) {
        newFabricCanvas.setHeight(dimensions.height * zoom);
        newFabricCanvas.setWidth(dimensions.width * zoom);
      } else {
        newFabricCanvas.setHeight(dimensions.height);
        newFabricCanvas.setWidth(dimensions.width);
      }
      setFabricCanvas(newFabricCanvas);
    }
  }, [fabricCanvas, zoom]);

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
        newFabricCanvas.remove(object);
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
  };

  return (
    <>
      <div>
        <EditorHeader functions={functions} zoom={zoom} setZoom={setZoom} />
        <S.MainLayout>
          <button onClick={testSave}>save</button>
          <br />
          <button onClick={testLoad}>load</button>
          <S.EditorWrapper>
            <S.AddBox>
              <EditorSidebar
                functions={functions}
                zoom={zoom}
                setZoom={setZoom}
              />
            </S.AddBox>
            <S.CanvasBox>
              <canvas ref={canvasRef} />
            </S.CanvasBox>
          </S.EditorWrapper>
        </S.MainLayout>
      </div>
    </>
  );
};

export default EditorPage;
