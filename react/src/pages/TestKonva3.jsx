import React, { useEffect, useRef, useState } from "react";
import usePikaso from "pikaso-react-hook";

import Pikaso, { Konva } from "pikaso";
import { shapes } from "konva/lib/Shape";
import EditorHeader from "../components/editor/EditorHeader";
import * as S from "../styles/new_styles";
import EditorSidebar from "../components/editor/EditorSidebar";
import { EditorAddtion } from "../components/editor/EditorAddtion";
import PikasoEditor from "../components/editor/PikasoEditor";

const TestKonva3 = () => {
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isPopVisible, setIsPopVisible] = useState(false);
  const [popUpdate, setPopUpdate] = useState(0);
  const [objNodes, setObjNodes] = useState([]);
  const [objSelection, setObjSelection] = useState();
  const [objx, setObjx] = useState(0);
  const [objy, setObjy] = useState(0);
  const [historyStep, setHistoryStep] = useState(); //초기 히스토리 설정
  const [zoom, setZoom] = useState(1);
  const [groupIndex, setGroupIndex] = useState(0);

  const myRef = useRef([]);
  const [selectedEditor, setSelectedEditor] = useState(0);
  const [editors, setEditors] = useState(["one", "two"]);

  return (
    <>
      <S.Btn
        onClick={() => {
          console.log(myRef);
          console.log(myRef[selectedEditor]);
          myRef[selectedEditor].functions.createCircle();
        }}
      >
        테스트
      </S.Btn>
      <S.Btn
        onClick={() => {
          setSelectedEditor(0);
        }}
      >
        1번으로
      </S.Btn>
      <S.Btn
        onClick={() => {
          setSelectedEditor(1);
        }}
      >
        2번으로
      </S.Btn>
      <EditorHeader
        functions={{ z: "z" }}
        isAddVisible={isAddVisible}
        zoom={zoom}
      />
      <S.MainLayout>
        <S.EditorWrapper>
          <EditorSidebar
            isAddVisible={isAddVisible}
            setIsAddVisible={setIsAddVisible}
            functions={{ z: "z" }}
          />

          {editors.map((editor, index) => (
            <S.CanvasBox>
              <PikasoEditor
                ref={(el) => (myRef[index] = el)}
                functions={{ z: "z" }}
                setPopUpdate={setPopUpdate}
                popUpdate={popUpdate}
                setObjSelection={setObjSelection}
                setObjx={setObjx}
                setObjy={setObjy}
                setIsPopVisible={setIsPopVisible}
                setHistoryStep={setHistoryStep}
                historyStep={historyStep}
                zoom={zoom}
                setZoom={setZoom}
                selectedEditor={selectedEditor}
                editorIndex={index}
              />
            </S.CanvasBox>
          ))}

          <S.CanvasPopupBox>
            {isPopVisible && (
              <EditorAddtion
                obj={{ type: "rect" }}
                objnodes={objNodes}
                objx={objx + (objx - objx * zoom)}
                objy={objy + (100 - 100 * zoom)}
                objSelection={objSelection}
                setIsPopVisible={setIsPopVisible}
                // editor={editor}
                popUpdate={popUpdate}
                setPopUpdate={setPopUpdate}
                groupIndex={groupIndex}
                setGroupIndex={setGroupIndex}
              />
            )}
          </S.CanvasPopupBox>
        </S.EditorWrapper>
      </S.MainLayout>
      <br />
      <button>레이어 보자</button>
      <br />
    </>
  );
};

export default TestKonva3;
