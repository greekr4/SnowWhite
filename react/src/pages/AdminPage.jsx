import React from "react";
import AdminCate from "../components/admin/AdminCate";
import AdminProd from "../components/admin/AdminProd";
import AdminOrder from "../components/admin/AdminOrder";

import AdminOption from "../components/admin/AdminOption";
import AdminBoard from "../components/admin/AdminBoard";

import * as S from "../styles/new_styles";

const AdminPage = ({ openPopup }) => {
  return (
    <S.AdminFlexBox>
      <S.AdminFlexLeft>옆에</S.AdminFlexLeft>
      <S.AdminFlexMiddle>
        <AdminBoard />
        <AdminOption openPopup={openPopup} />
        <AdminOrder openPopup={openPopup} />
        <AdminCate />
        <AdminProd />
      </S.AdminFlexMiddle>
      <S.AdminFlexRight></S.AdminFlexRight>
    </S.AdminFlexBox>
  );
};

export default AdminPage;
