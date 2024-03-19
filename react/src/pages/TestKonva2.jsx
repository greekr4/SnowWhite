import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Arrow, Transformer } from "react-konva";

const SelectionRect = ({ x, y, width, height }) => {
  return (
    <Rect x={x} y={y} width={width} height={height} fill="rgba(0,0,255,0.3)" />
  );
};

const Obj = ({ points, ...props }) => {
  return (
    <Rect
      type={"obj"}
      x={100}
      y={100}
      width={100}
      height={100}
      fill={"red"}
      name="123"
      draggable
    />
  );
};

const Obj2 = ({ points, ...props }) => {
  return (
    <Rect
      type={"obj"}
      x={200}
      y={100}
      width={100}
      height={100}
      fill={"red"}
      name="234"
      draggable
    />
  );
};

const MyTransformer = ({ selectedShapeName }) => {
  const transformerRef = useRef();

  useEffect(() => {
    if (selectedShapeName) {
      // 선택된 도형의 이름으로 도형을 찾습니다.
      const selectedNode = transformerRef.current
        .getStage()
        .findOne(`.${selectedShapeName}`);
      // Transformer를 선택된 도형에 연결합니다.
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer().batchDraw();
    } else {
      // 선택된 도형이 없으면 Transformer를 비활성화합니다.
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedShapeName]);

  return (
    <Transformer
      ref={transformerRef}
      keepRatio={false}
      boundBoxFunc={(oldBox, newBox) => {
        if (newBox.width < 20 || newBox.height < 20) {
          return oldBox;
        }
        return newBox;
      }}
    />
  );
};

const TestKonva2 = () => {
  const [selectionRect, setSelectionRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [isSelecting, setIsSelecting] = useState(false);
  const stageRef = useRef();

  const handleMouseDown = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    setSelectionRect({ x, y, width: 0, height: 0 });
    setIsSelecting(true);
  };

  const handleMouseMove = (e) => {
    if (!isSelecting) return;
    const stage = e.target.getStage();
    const { x, y } = stage.getPointerPosition();
    const newSelectionRect = {
      x: selectionRect.x,
      y: selectionRect.y,
      width: x - selectionRect.x,
      height: y - selectionRect.y,
    };
    setSelectionRect(newSelectionRect);
  };

  const calculateSelectionRect = (startX, startY, endX, endY) => {
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    const x = endX < startX ? endX : startX;
    const y = endY < startY ? endY : startY;

    return { x, y, width, height };
  };

  //   const handleMouseUp = () => {
  //     setIsSelecting(false);
  //     const shapes = stageRef.current.find("Rect");
  //     const selectedShapes = shapes.filter((shape) => {
  //       // 선택 영역과 겹치는지 확인
  //       const box = shape.getClientRect();
  //       const overlap = !(
  //         box.x > selectionRect.x + selectionRect.width ||
  //         box.x + box.width < selectionRect.x ||
  //         box.y > selectionRect.y + selectionRect.height ||
  //         box.y + box.height < selectionRect.y
  //       );
  //       console.log(box);
  //       console.log(selectionRect);
  //       console.log(overlap);
  //       return overlap;
  //     });

  //     // 선택된 화살표형 컴포넌트들을 처리
  //     selectedShapes.forEach((shape) => {
  //       // 여기에 원하는 처리 로직을 추가하세요.
  //       // 예: 선택된 객체의 스타일 변경
  //       shape.stroke("green");
  //       shape.fill("green");
  //     });

  //     // 레이어 업데이트
  //     stageRef.current.batchDraw();
  //   };
  const handleMouseUp = (e) => {
    setIsSelecting(false);
    const stage = e.target.getStage();
    const pointerEnd = stage.getPointerPosition();
    const newSelectionRect = calculateSelectionRect(
      selectionRect.x,
      selectionRect.y,
      pointerEnd.x,
      pointerEnd.y
    );

    // 새로운 선택 영역으로 객체들을 찾아 처리
    const shapes = stage.find("Layer")[0].children;
    console.log(stage);
    console.log(stage.find("Layer")[0].children);
    const selectedShapes = shapes.filter((shape) => {
      const box = shape.getClientRect();
      const overlap =
        box.x < newSelectionRect.x + newSelectionRect.width &&
        box.x + box.width > newSelectionRect.x &&
        box.y < newSelectionRect.y + newSelectionRect.height &&
        box.y + box.height > newSelectionRect.y;
      return overlap;
    });

    // 선택된 객체들을 처리
    selectedShapes.forEach((shape) => {
      // 처리 로직
      //   shape.stroke("green");
      //   shape.fill("green");
      console.log(shape);
      console.log("shape");
      handleSelectShape(shape);
      console.log(selectedShapeName);
    });

    console.log(selectedShapes);

    // 레이어 업데이트
    stage.batchDraw();
  };

  const [test, setTest] = useState();
  const selectedId = true;
  const trRef = useRef(null);
  const testRef = useRef(null);

  const [selectedShapeName, setSelectedShapeName] = useState();
  // 도형을 선택할 때 호출되는 함수
  const handleSelectShape = (shape) => {
    // 선택된 도형의 이름을 상태로 저장합니다.
    setSelectedShapeName(shape?.attrs?.name);
  };

  // 도형을 선택 해제할 때 호출되는 함수
  const handleDeselectShape = () => {
    setSelectedShapeName(null);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={stageRef}
    >
      <Layer>
        {isSelecting && <SelectionRect {...selectionRect} />}
        <Obj />
        <Obj2 ref={testRef} />
        <MyTransformer selectedShapeName={selectedShapeName} />
      </Layer>
    </Stage>
  );
};

export default TestKonva2;
