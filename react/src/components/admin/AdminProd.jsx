import React, { useEffect, useState } from "react";
import * as S from "../../styles/new_styles";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminProd = () => {
  const [prods, setProds] = useState([]);
  const [selectedProd, setSelectedProd] = useState([]);

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
      const res = await axios.post("/api/admin/prods");
      setProds(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddDummy = async () => {
    try {
      const res = await axios.post("/api/admin/prod/add");
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
      const res = await axios.post("/api/admin/prod/del", {
        prod_sids: sids_ary,
      });
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
              <th style={{ width: "7.5%" }}>
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
              <th>상품코드</th>
              <th>카테고리</th>
              <th>상품명</th>
              <th>썸네일</th>
              <th>썸네일 설명</th>
              <th></th>
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
                <Link to={`/admin/prod/${el.PROD_SID}`}>
                  <S.Btn>상세보기</S.Btn>
                </Link>
              </th>
            </tr>
          ))}
        </S.AdminTable>
      </S.AdminWrapper>
    </S.MainLayout>
  );
};

export default AdminProd;
