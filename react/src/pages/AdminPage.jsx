import React from "react";
import AdminCate from "../components/admin/AdminCate";
import AdminProd from "../components/admin/AdminProd";
import AdminOrder from "../components/admin/AdminOrder";
const AdminPage = ({ openPopup }) => {
  return (
    <div>
      <AdminOrder openPopup={openPopup} />
      <AdminCate />
      <AdminProd />
    </div>
  );
};

export default AdminPage;
