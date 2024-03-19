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

  const test = () => {};

  // Stage 관련
  const [SelectionVisible, setSelectionVisible] = useState(false);
  const onStageClick = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  const onStageMouseDown = (e) => {
    console.log(e.target);
  };

  const onStageMouseUp = () => {};

  // 셀렉션
  const [selectedIds, selectShapes] = React.useState([]);
  const layerRef = React.useRef();
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

  const onMouseUp = () => {
    oldPos.current = null;
    selection.current.visible = false;
    const { x1, x2, y1, y2 } = selection.current;
    const moved = x1 !== x2 || y1 !== y2;
    if (!moved) {
      updateSelectionRect();
      return;
    }
    const selBox = selectionRectRef.current.getClientRect();

    const elements = [];
    layerRef.current.find(".rectangle").forEach((elementNode) => {
      const elBox = elementNode.getClientRect();
      if (Konva.Util.haveIntersection(selBox, elBox)) {
        elements.push(elementNode);
      }
    });

    console.log("dd");
    console.log(elements);
    selectShapes(elements.map((el) => el.id()));
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
  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShapes([]);
    }
  };

  const onClickTap = (e) => {
    // if we are selecting with rect, do nothing
    const { x1, x2, y1, y2 } = selection.current;
    const moved = x1 !== x2 || y1 !== y2;
    if (moved) {
      return;
    }
    let stage = e.target.getStage();
    let layer = layerRef.current;
    let tr = trRef.current;
    // if click on empty area - remove all selections
    if (e.target === stage) {
      selectShapes([]);
      return;
    }

    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName("rectangle")) {
      return;
    }

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
      // if no key pressed and the node is not selected
      // select just one
      selectShapes([e.target.id()]);
    } else if (metaPressed && isSelected) {
      // if we pressed keys and node was selected
      // we need to remove it from selection:
      selectShapes((oldShapes) => {
        return oldShapes.filter((oldId) => oldId !== e.target.id());
      });
    } else if (metaPressed && !isSelected) {
      // add the node into selection
      selectShapes((oldShapes) => {
        return [...oldShapes, e.target.id()];
      });
    }
    layer.draw();
  };

  useEffect(() => {
    const nodes = selectedIds.map((id) => layerRef.current.findOne("#" + id));
    // const nodes = selectedIds.map((id) => console.log(id));

    trRef.current.nodes(nodes);
  }, [selectedIds]);

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
      <Stage
        width={1024}
        height={1024}
        // onClick={onStageClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={checkDeselect}
        onClick={onClickTap}
        onTap={onClickTap}
      >
        <Layer ref={layerRef}>
          {renderObjects()}
          {/* {selectedId && (
            <Transformer
              ref={trRef}
              rotateEnabled={true}
              keepRatio={false}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 20 || newBox.height < 20) {
                  return oldBox;
                }
                return newBox;
              }}
              node={testRefs.current[selectedId]}
            />
          )} */}
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
    </div>
  );
};

export default TestKonva;
