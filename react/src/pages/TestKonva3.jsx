import React, { useEffect, useRef, useState } from "react";
import EditorHeader from "../components/editor/EditorHeader";
import * as S from "../styles/new_styles";
import EditorSidebar from "../components/editor/EditorSidebar";
import { EditorAddtion } from "../components/editor/EditorAddtion";
import PikasoEditor from "../components/editor/PikasoEditor";
import { Box, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";

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

  const handleCopy = () => {
    myRef[selectedEditor].functions.handleCopy();
  };
  const handleBehind = () => {
    myRef[selectedEditor].functions.handleBehind();
  };

  const [selectedEditorNumber, setSelectedEditorNumber] = useState(0);

  useEffect(() => {
    setSelectedEditor(selectedEditorNumber);
  }, [selectedEditorNumber]);

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          padding: "30px",
          bottom: 0,
          left: 0,
          zIndex: 1000,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box padding={"0 10px"}>
          <ToggleButtonGroup
            color="primary"
            value={selectedEditorNumber}
            exclusive
            onChange={(e, newAlignment) => {
              if (newAlignment !== null) {
                setSelectedEditorNumber(newAlignment);
              }
            }}
          >
            <ToggleButton value={0}>앞면</ToggleButton>
            <ToggleButton value={1}>뒷면</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <EditorHeader
        functions={{ z: "z" }}
        isAddVisible={isAddVisible}
        zoom={zoom}
        editor={myRef[selectedEditor]}
      />
      <S.MainLayout>
        <S.EditorWrapper>
          <EditorSidebar
            isAddVisible={isAddVisible}
            setIsAddVisible={setIsAddVisible}
            functions={{ z: "z" }}
            editor={myRef[selectedEditor]}
            myRef={myRef}
          />
          <div style={{}}>
            {editors.map((editor, index) => (
              <PikasoEditor
                ref={(el) => (myRef[index] = el)}
                functions={{ z: "z" }}
                setPopUpdate={setPopUpdate}
                popUpdate={popUpdate}
                objSelection={objSelection}
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
            ))}
          </div>
          <S.CanvasPopupBox>
            {isPopVisible && (
              <EditorAddtion
                obj={{ type: "rect" }}
                objnodes={objNodes}
                objx={objx + (objx - objx * zoom)}
                objy={objy + 300}
                objSelection={objSelection}
                setIsPopVisible={setIsPopVisible}
                editor={myRef[selectedEditor]}
                popUpdate={popUpdate}
                setPopUpdate={setPopUpdate}
                groupIndex={groupIndex}
                setGroupIndex={setGroupIndex}
                handleCopy={handleCopy}
                handleBehind={handleBehind}
              />
            )}
          </S.CanvasPopupBox>
        </S.EditorWrapper>
      </S.MainLayout>
    </>
  );
};

export default TestKonva3;
