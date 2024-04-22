import React, { Suspense } from "react";
import AdminCate from "../components/admin/AdminCate";
import AdminProd from "../components/admin/AdminProd";
import AdminOrder from "../components/admin/AdminOrder";

import AdminOption from "../components/admin/AdminOption";
import AdminBoard from "../components/admin/AdminBoard";

import * as S from "../styles/new_styles";
import AdminSideBar from "../components/admin/AdminSideBar";
import { Drawer } from "@mui/material";
import ResponsiveDrawer from "../components/admin/ResponsiveDrawer";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "@coreui/coreui/dist/css/coreui.min.css";

const container =
  window !== undefined ? () => window().document.body : undefined;

const AdminPage = ({ openPopup }) => {
  console.log(openPopup);
  return (
    <>
      {/* <S.AdminHeaderWrapper></S.AdminHeaderWrapper> */}
      <ResponsiveDrawer openPopup={openPopup} />
    </>
  );
};

export default AdminPage;

// <S.AdminFlexBox>
// <S.AdminFlexLeft>{/* <AdminSideBar /> */}</S.AdminFlexLeft>
// <S.AdminFlexMiddle>
//   <AdminBoard />
//   <AdminOption openPopup={openPopup} />
//   <AdminOrder openPopup={openPopup} />
//   <AdminCate />
//   <AdminProd />
// </S.AdminFlexMiddle>
// <S.AdminFlexRight></S.AdminFlexRight>
// </S.AdminFlexBox>
