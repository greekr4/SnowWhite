// import React, { useState, useRef, useEffect } from "react";
// import { Stage, Layer, Rect, Arrow, Transformer } from "react-konva";

// const SelectionRect = ({ x, y, width, height }) => {
//   return (
//     <Rect x={x} y={y} width={width} height={height} fill="rgba(0,0,255,0.3)" />
//   );
// };

// const Obj = ({ points, ...props }) => {
//   return (
//     <Rect
//       type={"obj"}
//       x={100}
//       y={100}
//       width={100}
//       height={100}
//       fill={"red"}
//       name="123"
//       draggable
//     />
//   );
// };

// const Obj2 = ({ points, ...props }) => {
//   return (
//     <Rect
//       type={"obj"}
//       x={200}
//       y={100}
//       width={100}
//       height={100}
//       fill={"red"}
//       name="234"
//       draggable
//     />
//   );
// };

// const MyTransformer = ({ selectedShapeName }) => {
//   const transformerRef = useRef();

//   useEffect(() => {
//     if (selectedShapeName) {
//       // 선택된 도형의 이름으로 도형을 찾습니다.
//       const selectedNode = transformerRef.current
//         .getStage()
//         .findOne(`.${selectedShapeName}`);
//       // Transformer를 선택된 도형에 연결합니다.
//       transformerRef.current.nodes([selectedNode]);
//       transformerRef.current.getLayer().batchDraw();
//     } else {
//       // 선택된 도형이 없으면 Transformer를 비활성화합니다.
//       transformerRef.current.nodes([]);
//       transformerRef.current.getLayer().batchDraw();
//     }
//   }, [selectedShapeName]);

//   return (
//     <Transformer
//       ref={transformerRef}
//       keepRatio={false}
//       boundBoxFunc={(oldBox, newBox) => {
//         if (newBox.width < 20 || newBox.height < 20) {
//           return oldBox;
//         }
//         return newBox;
//       }}
//     />
//   );
// };

// const TestKonva2 = () => {
//   const [selectionRect, setSelectionRect] = useState({
//     x: 0,
//     y: 0,
//     width: 0,
//     height: 0,
//   });
//   const [isSelecting, setIsSelecting] = useState(false);
//   const stageRef = useRef();

//   const handleMouseDown = (e) => {
//     const { x, y } = e.target.getStage().getPointerPosition();
//     setSelectionRect({ x, y, width: 0, height: 0 });
//     setIsSelecting(true);
//   };

//   const handleMouseMove = (e) => {
//     if (!isSelecting) return;
//     const stage = e.target.getStage();
//     const { x, y } = stage.getPointerPosition();
//     const newSelectionRect = {
//       x: selectionRect.x,
//       y: selectionRect.y,
//       width: x - selectionRect.x,
//       height: y - selectionRect.y,
//     };
//     setSelectionRect(newSelectionRect);
//   };

//   const calculateSelectionRect = (startX, startY, endX, endY) => {
//     const width = Math.abs(endX - startX);
//     const height = Math.abs(endY - startY);
//     const x = endX < startX ? endX : startX;
//     const y = endY < startY ? endY : startY;

//     return { x, y, width, height };
//   };

//   //   const handleMouseUp = () => {
//   //     setIsSelecting(false);
//   //     const shapes = stageRef.current.find("Rect");
//   //     const selectedShapes = shapes.filter((shape) => {
//   //       // 선택 영역과 겹치는지 확인
//   //       const box = shape.getClientRect();
//   //       const overlap = !(
//   //         box.x > selectionRect.x + selectionRect.width ||
//   //         box.x + box.width < selectionRect.x ||
//   //         box.y > selectionRect.y + selectionRect.height ||
//   //         box.y + box.height < selectionRect.y
//   //       );
//   //       console.log(box);
//   //       console.log(selectionRect);
//   //       console.log(overlap);
//   //       return overlap;
//   //     });

//   //     // 선택된 화살표형 컴포넌트들을 처리
//   //     selectedShapes.forEach((shape) => {
//   //       // 여기에 원하는 처리 로직을 추가하세요.
//   //       // 예: 선택된 객체의 스타일 변경
//   //       shape.stroke("green");
//   //       shape.fill("green");
//   //     });

//   //     // 레이어 업데이트
//   //     stageRef.current.batchDraw();
//   //   };
//   const handleMouseUp = (e) => {
//     setIsSelecting(false);
//     const stage = e.target.getStage();
//     const pointerEnd = stage.getPointerPosition();
//     const newSelectionRect = calculateSelectionRect(
//       selectionRect.x,
//       selectionRect.y,
//       pointerEnd.x,
//       pointerEnd.y
//     );

//     // 새로운 선택 영역으로 객체들을 찾아 처리
//     const shapes = stage.find("Layer")[0].children;
//     console.log(stage);
//     console.log(stage.find("Layer")[0].children);
//     const selectedShapes = shapes.filter((shape) => {
//       const box = shape.getClientRect();
//       const overlap =
//         box.x < newSelectionRect.x + newSelectionRect.width &&
//         box.x + box.width > newSelectionRect.x &&
//         box.y < newSelectionRect.y + newSelectionRect.height &&
//         box.y + box.height > newSelectionRect.y;
//       return overlap;
//     });

//     // 선택된 객체들을 처리
//     selectedShapes.forEach((shape) => {
//       // 처리 로직
//       //   shape.stroke("green");
//       //   shape.fill("green");

//       handleSelectShape(shape);
//       console.log("shape");
//       console.log(selectedShapeName);
//       console.log(shape);
//       console.log("shape");
//     });

//     console.log(selectedShapes);

//     // 레이어 업데이트
//     stage.batchDraw();
//   };

//   const [test, setTest] = useState();
//   const selectedId = true;
//   const trRef = useRef(null);
//   const testRef = useRef(null);

//   const [selectedShapeName, setSelectedShapeName] = useState();
//   // 도형을 선택할 때 호출되는 함수
//   const handleSelectShape = (shape) => {
//     // 선택된 도형의 이름을 상태로 저장합니다.
//     console.log(shape);
//     setSelectedShapeName(shape?.attrs?.name);
//   };

//   // 도형을 선택 해제할 때 호출되는 함수
//   const handleDeselectShape = () => {
//     setSelectedShapeName(null);
//   };

//   return (
//     <Stage
//       width={window.innerWidth}
//       height={window.innerHeight}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       ref={stageRef}
//     >
//       <Layer>
//         {isSelecting && <SelectionRect {...selectionRect} />}
//         <Obj />
//         <Obj2 ref={testRef} />
//         <MyTransformer selectedShapeName={selectedShapeName} />
//       </Layer>
//     </Stage>
//   );
// };

// export default TestKonva2;

//////////////////////////////////////////////////

import React, { useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Transformer } from "react-konva";
const Rectangle = ({ shapeProps, onSelect, onChange }) => {
  const shapeRef = useRef();

  return (
    <Rect
      onClick={() => onSelect(shapeRef)}
      onTap={() => onSelect(shapeRef)}
      // ref={shapeRef.current[getKey]}
      ref={shapeRef}
      {...shapeProps}
      name="rectangle"
      draggable
      onDragEnd={(e) => {
        onSelect(shapeRef);
        onChange({
          ...shapeProps,
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
      onTransformEnd={(e) => {
        // transformer is changing scale of the node
        // and NOT its width or height
        // but in the store we have only width and height
        // to match the data better we will reset scale on transform end
        const node = shapeRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        const stage = e.target.getStage();
        console.log(stage);
        // we will reset it back
        node.scaleX(1);
        node.scaleY(1);
        onChange(
          {
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          },
          stage
        );
      }}
    />
  );
};

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
    id: "rect1",
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
    id: "rect2",
  },
];

const TestKonva2 = () => {
  const [rectangles, setRectangles] = useState(initialRectangles);
  const [selectedId, selectShape] = useState(null);
  const [nodesArray, setNodes] = useState([]);
  const trRef = useRef();
  const layerRef = useRef();
  const Konva = window.Konva;

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      trRef.current.nodes([]);
      setNodes([]);
      // layerRef.current.remove(selectionRectangle);
    }
  };

  const selectionRectRef = React.useRef();
  const selection = React.useRef({
    visible: false,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });

  const updateSelectionRect = () => {
    const node = selectionRectRef.current;
    node.setAttrs({
      visible: selection.current.visible,
      x: Math.min(selection.current.x1, selection.current.x2),
      y: Math.min(selection.current.y1, selection.current.y2),
      width: Math.abs(selection.current.x1 - selection.current.x2),
      height: Math.abs(selection.current.y1 - selection.current.y2),
      fill: "rgba(0, 161, 255, 0.3)",
    });
    node.getLayer().batchDraw();
  };

  const oldPos = React.useRef(null);
  const onMouseDown = (e) => {
    const isElement = e.target.findAncestor(".elements-container");
    const isTransformer = e.target.findAncestor("Transformer");
    if (isElement || isTransformer) {
      return;
    }

    const pos = e.target.getStage().getPointerPosition();
    selection.current.visible = true;
    selection.current.x1 = pos.x;
    selection.current.y1 = pos.y;
    selection.current.x2 = pos.x;
    selection.current.y2 = pos.y;
    updateSelectionRect();
  };

  const onMouseMove = (e) => {
    if (!selection.current.visible) {
      return;
    }
    const pos = e.target.getStage().getPointerPosition();
    selection.current.x2 = pos.x;
    selection.current.y2 = pos.y;
    updateSelectionRect();
  };

  const onMouseUp = () => {
    oldPos.current = null;
    if (!selection.current.visible) {
      return;
    }
    const selBox = selectionRectRef.current.getClientRect();

    const elements = [];
    layerRef.current.find(".rectangle").forEach((elementNode) => {
      const elBox = elementNode.getClientRect();
      if (Konva.Util.haveIntersection(selBox, elBox)) {
        elements.push(elementNode);
        console.log("ddd");
      }
    });
    trRef.current.nodes(elements);
    selection.current.visible = false;
    // disable click event
    Konva.listenClickTap = false;
    updateSelectionRect();
  };

  const onClickTap = (e) => {
    // if we are selecting with rect, do nothing
    // if (selectionRectangle.visible()) {
    //   return;
    // }
    let stage = e.target.getStage();
    let layer = layerRef.current;
    let tr = trRef.current;
    // if click on empty area - remove all selections
    if (e.target === stage) {
      selectShape(null);
      setNodes([]);
      tr.nodes([]);
      layer.draw();
      return;
    }

    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName(".rect")) {
      return;
    }

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
      // if no key pressed and the node is not selected
      // select just one
      tr.nodes([e.target]);
    } else if (metaPressed && isSelected) {
      // if we pressed keys and node was selected
      // we need to remove it from selection:
      const nodes = tr.nodes().slice(); // use slice to have new copy of array
      // remove node from array
      nodes.splice(nodes.indexOf(e.target), 1);
      tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
      // add the node into selection
      const nodes = tr.nodes().concat([e.target]);
      tr.nodes(nodes);
    }
    layer.draw();
  };

  const StageRef = useRef();

  useEffect(() => {
    console.log(rectangles);
  }, [rectangles]);
  return (
    <Stage
      ref={StageRef}
      width={window.innerWidth + 400}
      height={window.innerHeight + 400}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchStart={checkDeselect}
      onClick={onClickTap}
    >
      <Layer ref={layerRef}>
        {rectangles.map((rect, i) => {
          return (
            <Rectangle
              key={i}
              getKey={i}
              shapeProps={rect}
              isSelected={rect.id === selectedId}
              getLength={rectangles.length}
              onSelect={(e) => {
                if (e.current !== undefined) {
                  let temp = nodesArray;
                  if (!nodesArray.includes(e.current)) temp.push(e.current);
                  setNodes(temp);
                  trRef.current.nodes(nodesArray);
                  trRef.current.nodes(nodesArray);
                  trRef.current.getLayer().batchDraw();
                }
                selectShape(rect.id);
              }}
              onChange={(newAttrs, stage) => {
                const rects = rectangles;
                rects[i] = newAttrs;
                setRectangles(rects);
              }}
            />
          );
        })}

        <Transformer
          // ref={trRef.current[getKey]}
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
        <Rect fill="rgba(0,0,255,0.5)" ref={selectionRectRef} />
      </Layer>
    </Stage>
  );
};

export default TestKonva2;
