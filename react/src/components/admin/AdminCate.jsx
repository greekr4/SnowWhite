import axios from "axios";
import React, { useEffect, useState } from "react";
import * as S from "../../styles/new_styles";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const AdminCate = () => {
  const [cate, setCate] = useState([]);
  const [cateValues, setCateValues] = useState([]);

  useEffect(() => {
    getCate();
  }, []);

  const getCate = async () => {
    const Cate = (
      await axios.post(process.env.REACT_APP_DB_HOST + "/api/cate", {
        all: true,
      })
    ).data;
    setCate(Cate);
    setCateValues(Cate.map((el) => ({ ...el })));
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(cate, result.source.index, result.destination.index);

    console.log(items);

    setCate(items);
    console.log("cate:", cate);
  };

  const handlePriority = async () => {
    const cate_priority = [];
    const cate_sid = [];

    cate.map((el, index) => {
      cate_priority.push(index + 1);
      cate_sid.push(el.CATE_SID);
    });

    console.log(cate_priority);
    console.log(cate_sid);

    const res = await axios.post(
      process.env.REACT_APP_DB_HOST + "/api/admin/cate/update_prioirty",
      {
        cate_priority,
        cate_sid,
      }
    );

    alert(res.data);
    getCate();
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    background: isDragging ? "aliceblue" : "none",
    ...draggableStyle,
  });

  const toggleCateShow = async (cate_show, cate_sid) => {
    const res = await axios.post(
      process.env.REACT_APP_DB_HOST + "/api/admin/cate/update_show",
      {
        cate_show: cate_show,
        cate_sid: cate_sid,
      }
    );

    getCate();
  };

  const insert_dummy_cate = async () => {
    const res = await axios.post(
      process.env.REACT_APP_DB_HOST + "/api/admin/cate/add"
    );
    alert(res.data);
    getCate();
  };

  const delete_cate = async (cate_sid) => {
    const res = await axios.post(
      process.env.REACT_APP_DB_HOST + "/api/admin/cate/del",
      { cate_sid: cate_sid }
    );
    alert(res.data);
    getCate();
  };

  const modify_cate_nm = async (cate_sid, cate_nm) => {
    console.log(cateValues);
    const res = await axios.patch(
      process.env.REACT_APP_DB_HOST + "/api/admin/cate",
      {
        cate_sid: cate_sid,
        cate_nm: cate_nm,
      }
    );

    alert(res.data);
    getCate();
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    const updated = { ...cateValues };
    updated[index].CATE_NM = value;
    setCateValues(updated);
  };

  return (
    <S.MainLayout>
      <S.AdminWrapper>
        카테고리 관리
        <S.AdminCateBox>
          <S.Btn onClick={handlePriority} margin="0.5rem 0">
            순서 저장
          </S.Btn>
          <S.Btn
            onClick={insert_dummy_cate}
            margin="0.5rem 0"
            style={{ float: "right" }}
          >
            추가
          </S.Btn>
          <S.AdminCateItem>
            <div className="header">NO</div>
            <div className="header">카테고리명</div>
            <div className="header">노출여부</div>
            <div className="header"></div>
          </S.AdminCateItem>
          {cate && (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="draggable">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {cate.map((el, index) => (
                      <Draggable
                        draggableId={"draggable" + el.CATE_PRIORITY}
                        index={index}
                        key={el.CATE_PRIORITY}
                      >
                        {(provided, snapshot) => (
                          <S.AdminCateItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div>{el.CATE_PRIORITY}</div>
                            <div>{el.CATE_NM}</div>

                            <div>
                              {el.CATE_SHOW === 1 ? (
                                <S.Btn
                                  fontColor="#fff"
                                  btnBgcHover="#01939A"
                                  btnBgc="#5DC8CD"
                                  onClick={() => toggleCateShow(0, el.CATE_SID)}
                                >
                                  ON
                                </S.Btn>
                              ) : (
                                <S.Btn
                                  fontColor="#fff"
                                  btnBgcHover="#FF8E00"
                                  btnBgc="#FFAA40"
                                  onClick={() => toggleCateShow(1, el.CATE_SID)}
                                >
                                  OFF
                                </S.Btn>
                              )}
                            </div>
                            <div>
                              <S.Btn
                                onClick={() =>
                                  modify_cate_nm(
                                    el.CATE_SID,
                                    cateValues[index].CATE_NM
                                  )
                                }
                                margin="0 0.5rem 0 0"
                              >
                                변경
                              </S.Btn>
                              <S.Btn onClick={() => delete_cate(el.CATE_SID)}>
                                삭제
                              </S.Btn>
                            </div>
                          </S.AdminCateItem>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </S.AdminCateBox>
      </S.AdminWrapper>
    </S.MainLayout>
  );
};

export default AdminCate;
