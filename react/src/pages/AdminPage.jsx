import React from "react";
import AdminCate from "../components/admin/AdminCate";
import AdminProd from "../components/admin/AdminProd";
import AdminOrder from "../components/admin/AdminOrder";
import AdminOrderDetail from "../components/admin/AdminOrderDetail";
import AdminOption from "../components/admin/AdminOption";
const AdminPage = ({ openPopup }) => {
  return (
    <div>
      <AdminOption openPopup={openPopup} />
      <AdminOrder openPopup={openPopup} />
      <AdminCate />
      <AdminProd />
    </div>
  );
};

export default AdminPage;
