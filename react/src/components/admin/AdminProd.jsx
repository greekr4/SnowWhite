import React, { useEffect, useState } from "react";
import * as S from "../../styles/new_styles";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import { formatDate, formatTime } from "../../hooks/Utill";

const AdminProd = () => {
  const [initProds, setInitProds] = useState([]);
  const [prods, setProds] = useState([]);
  const [selectedProd, setSelectedProd] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);

  const handlePageChange = (e) => {
    setCurrentPage(e);
    const startIndex = (e - 1) * countPerPage;
    const endIndex = startIndex + countPerPage;
    const pageItems = initProds.slice(startIndex, endIndex);
    setProds(pageItems);
  };

  useEffect(() => {
    initdb();
  }, []);

  useEffect(() => {
    const initialSelectedProd = Array.from(
      { length: prods?.length },
      () => false
    );

    setSelectedProd(initialSelectedProd);
    console.log(initialSelectedProd);
  }, [prods]);

  const initdb = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_DB_HOST + "/api/admin/prods"
      );
      setInitProds(res.data);
      setProds(res.data.slice(0, countPerPage));
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddDummy = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_DB_HOST + "/api/admin/prod/add"
      );
      alert(res.data);
      initdb();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelProd = async () => {
    let sids_ary = [];
    selectedProd.forEach((el, index) => {
      if (el) {
        console.log(prods[index]);
        sids_ary.push(prods[index].PROD_SID);
      }
    });
    console.log(sids_ary);

    try {
      const res = await axios.post(
        process.env.REACT_APP_DB_HOST + "/api/admin/prod/del",
        {
          prod_sids: sids_ary,
        }
      );
      alert(res.data);
      initdb();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <S.MainLayout>
      <S.AdminWrapper>
        상품 목록
        <div>
          <S.Btn margin="1rem 0" onClick={handleDelProd}>
            선택 삭제
          </S.Btn>
          <S.Btn
            margin="1rem 0"
            onClick={handleAddDummy}
            style={{ float: "right" }}
          >
            더미 데이터 추가
          </S.Btn>
        </div>
        <S.AdminTable>
          <thead>
            <tr>
              <th style={{ width: "3%" }}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const updated = [...selectedProd];
                    updated.map((el, index) => {
                      el = updated[index] = e.target.checked;
                    });
                    console.log(updated);
                    setSelectedProd(updated);
                  }}
                />
              </th>
              <th style={{ width: "10%" }}>상품코드</th>
              <th style={{ width: "10%" }}>카테고리</th>
              <th style={{ width: "10%" }}>상품명</th>
              <th style={{ width: "10%" }}>썸네일</th>
              <th style={{ width: "" }}>썸네일 설명</th>
              <th style={{ width: "10%" }}>등록일</th>
              <th style={{ width: "10%" }}>수정일</th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          {prods?.map((el, index) => (
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedProd[index]}
                  onChange={() => {
                    const updated = [...selectedProd];
                    updated[index] = !updated[index];
                    setSelectedProd(updated);
                    console.log(updated);
                  }}
                />
              </th>
              <th>{el.PROD_SID}</th>
              <th>
                {el.CATE_NM} ({el.CATE_SID})
              </th>
              <th>{el.PROD_NM}</th>
              <th>
                <img src={el.IMAGE_LOCATION} alt="썸네일" />
              </th>
              <th>{el.PROD_DESC}</th>
              <th>
                <p>{formatDate(el.PROD_REGDATE)}</p>
                <p>{formatTime(el.PROD_REGDATE)}</p>
              </th>
              <th>
                <p>{formatDate(el.PROD_REGDATE)}</p>
                <p>{formatTime(el.PROD_REGDATE)}</p>
              </th>
              <th>
                <S.Btn
                  onClick={() => {
                    window.open(
                      `/admin/prod/${el.PROD_SID}`,
                      "상품 상세",
                      "width=1250,height=800,top=100,left=200"
                    );
                  }}
                >
                  상세보기
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
            totalItemsCount={initProds?.length}
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

export default AdminProd;
