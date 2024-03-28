import React, { useEffect, useState } from "react";
import * as S from "../../styles/new_styles";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminProd = () => {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    axios
      .post("/api/admin/prods")
      .then((res) => {
        console.log(res.data);
        setProds(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <S.MainLayout>
      <S.AdminWrapper>
        상품 목록
        <S.AdminTable>
          <thead>
            <tr>
              <th>체크박스</th>
              <th>상품코드</th>
              <th>카테고리</th>
              <th>상품명</th>
              <th>썸네일</th>
              <th>썸네일 설명</th>
              <th>상품가격</th>
              <th></th>
            </tr>
          </thead>
          {prods.map((el, index) => (
            <tr>
              <th></th>
              <th>{el.PROD_SID}</th>
              <th>
                {el.CATE_NM} ({el.CATE_SID})
              </th>
              <th>{el.PROD_NM}</th>
              <th>
                <img src={el.IMAGE_LOCATION} alt="썸네일" />
              </th>
              <th>
                <textarea cols="50" rows="3">
                  {el.PROD_DESC}
                </textarea>
              </th>
              <th>{el.PROD_PRICE}</th>
              <th>
                <S.Btn margin="0.25rem">간편 수정</S.Btn>
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
