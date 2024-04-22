import React, { useEffect, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import axios from "axios";
import Pagination from "react-js-pagination";
import { formatDate, formatTime } from "../../hooks/Utill";

const AdminOption = ({ openPopup }) => {
  const [initOptions_frist, setInitOptions_frist] = useState([]);
  const [initOptions, setInitOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [optionCate, setOptionCate] = useState([]);
  const allCheckbox = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);

  const handlePageChange = (e) => {
    setCurrentPage(e);
    const startIndex = (e - 1) * countPerPage;
    const endIndex = startIndex + countPerPage;
    const pageItems = initOptions.slice(startIndex, endIndex);
    setOptions(pageItems);
  };

  useEffect(() => {
    initdb();
  }, []);

  useEffect(() => {
    const initSelectedOption = Array.from(
      { length: options?.length },
      () => false
    );
    setSelectedOption(initSelectedOption);
    // setOptions(initOptions.slice(0, countPerPage));
  }, [options]);

  const initdb = async () => {
    const initdata = (
      await axios.post(process.env.REACT_APP_DB_HOST + "/api/admin/options")
    ).data;
    setInitOptions(initdata);
    setInitOptions_frist(initdata);
    setOptions(initdata.slice(0, countPerPage));

    ////////////////// 카테고리
    setOptionCate(
      Array.from(new Set(initdata.map((option) => option.OPTION_CATE)))
    );
  };

  const handleDeleteOption = async (optionSid) => {
    const OPTION_SIDS = [];
    optionSid.split(",").map((el, index) => {
      OPTION_SIDS.push(el);
    });
    const res = await axios.delete(
      process.env.REACT_APP_DB_HOST + "/api/admin/option",
      {
        data: { OPTION_SID: OPTION_SIDS },
      }
    );

    if (res.status === 200) {
      alert("옵션을 삭제했습니다.");
      initdb();
    } else {
      alert("옵션 삭제에 실패했습니다.");
    }
  };

  const handleSeletedDelete = async () => {
    const OPTION_SIDS = [];

    selectedOption.map((el, index) => {
      if (el) {
        OPTION_SIDS.push(options[index].OPTION_SID);
      }
    });
    const res = await axios.delete(
      process.env.REACT_APP_DB_HOST + "/api/admin/option",
      {
        data: { OPTION_SID: OPTION_SIDS },
      }
    );

    if (res.status === 200) {
      alert("옵션을 삭제했습니다.");
      initdb();
    } else {
      alert("옵션 삭제에 실패했습니다.");
    }
  };

  return (
    <S.MainLayout>
      <S.AdminWrapper>
        옵션 관리
        <div>
          <S.Btn onClick={handleSeletedDelete}>선택 삭제</S.Btn>
          <S.Btn
            onClick={() =>
              openPopup("optionForm", { mode: "insert", initdb: initdb })
            }
          >
            추가
          </S.Btn>
        </div>
        <div>
          카테고리별 보기{" "}
          <select
            onChange={(e) => {
              if (e.target.value === "all") {
                setOptions(initOptions_frist.slice(0, countPerPage));
                setInitOptions(initOptions_frist);
                return false;
              }
              const filltedData = [...initOptions_frist];
              setInitOptions(
                filltedData.filter((el) => el.OPTION_CATE === e.target.value)
              );
              setOptions(
                filltedData
                  .filter((el) => el.OPTION_CATE === e.target.value)
                  .slice(0, countPerPage)
              );
              setCurrentPage(1);
            }}
          >
            <option value="all">전체</option>
            {optionCate.map((el, index) => (
              <option value={el}>{el}</option>
            ))}
          </select>
        </div>
        <S.AdminTable>
          <thead>
            <tr>
              <th style={{ width: "5%" }}>
                <input
                  type="checkbox"
                  ref={allCheckbox}
                  onChange={(e) => {
                    const updated = [...selectedOption];
                    updated.map((el, index) => {
                      el = updated[index] = e.target.checked;
                    });
                    setSelectedOption(updated);
                  }}
                />
              </th>
              <th>옵션 카테고리</th>
              <th>옵션 이름</th>
              <th>옵션 설명</th>
              <th>
                옵션 가격
                <br />
                (판매 단위 x 옵션 가격)
              </th>
              <th>등록일</th>
              <th>수정일</th>
              <th></th>
            </tr>
          </thead>
          {options.map((el, index) => (
            <tr style={{ height: "50px" }}>
              <th>
                <input
                  type="checkbox"
                  checked={selectedOption[index]}
                  onChange={() => {
                    const updated = [...selectedOption];
                    updated[index] = !updated[index];
                    setSelectedOption(updated);
                    console.log(updated);
                  }}
                />
              </th>
              <th>{el.OPTION_CATE}</th>
              <th>{el.OPTION_NM}</th>
              <th>{el.OPTION_DETAIL}</th>
              <th>{el.OPTION_PRICE.toLocaleString("ko-KR")}</th>
              <th>
                <p>{formatDate(el.OPTION_REGDATE)}</p>
                <p>{formatTime(el.OPTION_REGDATE)}</p>
              </th>
              <th>
                <p>{formatDate(el.OPTION_MODIDATE)}</p>
                <p>{formatTime(el.OPTION_MODIDATE)}</p>
              </th>
              <th>
                <S.Btn
                  margin="0 0.5em 0 0"
                  onClick={() => {
                    openPopup("optionForm", {
                      mode: "update",
                      initdb: initdb,
                      optionSid: el.OPTION_SID,
                      optionCate: el.OPTION_CATE,
                      optionNm: el.OPTION_NM,
                      optionDetail: el.OPTION_DETAIL,
                      optionPrice: el.OPTION_PRICE,
                    });
                  }}
                >
                  수정
                </S.Btn>
                <S.Btn
                  onClick={() => {
                    handleDeleteOption(el.OPTION_SID);
                  }}
                >
                  삭제
                </S.Btn>
              </th>
            </tr>
          ))}
        </S.AdminTable>
        <S.PaginationBox>
          <Pagination
            // 현제 보고있는 페이지
            activePage={currentPage}
            // 한페이지에 출력할 아이템수
            itemsCountPerPage={countPerPage}
            // 총 아이템수
            totalItemsCount={initOptions?.length}
            // 표시할 페이지수
            pageRangeDisplayed={10}
            // 마지막 버튼 숨기기
            hideFirstLastPages={true}
            // 버튼 커스텀
            prevPageText={<S.Left_Icon />}
            nextPageText={<S.Right_Icon />}
            // 함수
            onChange={handlePageChange}
          />
        </S.PaginationBox>
      </S.AdminWrapper>
    </S.MainLayout>
  );
};

export default AdminOption;
