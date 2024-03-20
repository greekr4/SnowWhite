import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Transformer, Circle } from "react-konva";
import Konva from "konva";

const TestKonva = () => {
  const [objects, setObjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const trRef = useRef();
  const testRefs = useRef([]);

  const handleAddRectangle = () => {
    const newRectangle = {
      type: "Rect",
      id: objects.length + 1,
      x: Math.random() * 400, // 임의의 위치에 추가
      y: Math.random() * 400,
      width: 100,
      height: 100,
      fill: "red",
    };
    setObjects([...objects, newRectangle]);
  };

  const handleAddRectangle2 = () => {
    const newRectangle = {
      type: "Circle",
      id: objects.length + 1,
      x: Math.random() * 400, // 임의의 위치에 추가
      y: Math.random() * 400,
      width: 100,
      height: 100,
      fill: "blue",
    };
    setObjects([...objects, newRectangle]);
  };

  // 오브젝트 렌더링
  const renderObjects = () => {
    return objects.map((obj, index) => {
      const commonProps = {
        ref: (el) => {
          if (el === null) return "";
          testRefs.current[obj.id] = el;
          return testRefs;
        },
        draggable: true,
        onClick: () => handleSelect(obj.id),
        onDragEnd: (e) => {
          handleChange(index, { x: e.target.x(), y: e.target.y() });
          handleSelect(obj.id);
        },
        onTransformEnd: (e) => {
          const node = e.target;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          handleChange(index, {
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
          });
        },
      };

      if (obj.type === "Circle") {
        return <Circle key={obj.id} {...obj} {...commonProps} />;
      } else if (obj.type === "Rect") {
        return <Rect key={obj.id} {...obj} {...commonProps} />;
      }
      return null;
    });
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleChange = (index, newProps) => {
    const objs = [...objects];
    objs[index] = { ...objs[index], ...newProps };
    setObjects(objs);
  };

  useEffect(() => {
    console.log(selectedId);
    trRef.current.nodes([testRefs?.current[selectedId]]);
    trRef.current.getLayer().batchDraw();
  }, [selectedId]);

  return (
    <div>
      <div>레이어들</div>
      <div>
        {objects.map((el, index) => {
          return (
            <div
              onClick={() => {
                setSelectedId(el.id);
              }}
            >
              {el.type}
            </div>
          );
        })}
      </div>
      <button onClick={renderObjects}>테스트</button>
      <button onClick={handleAddRectangle}>네모 추가</button>
      <button onClick={handleAddRectangle2}>세모 추가</button>
      <Stage width={1024} height={1024}>
        <Layer>
          {renderObjects()}
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default TestKonva;
