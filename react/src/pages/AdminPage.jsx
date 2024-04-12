import React from "react";
import AdminCate from "../components/admin/AdminCate";
import AdminProd from "../components/admin/AdminProd";
import AdminOrder from "../components/admin/AdminOrder";

import AdminOption from "../components/admin/AdminOption";
import AdminBoard from "../components/admin/AdminBoard";

const AdminPage = ({ openPopup }) => {
  return (
    <div>
      <AdminBoard />
      <AdminOption openPopup={openPopup} />
      <AdminOrder openPopup={openPopup} />
      <AdminCate />
      <AdminProd />
    </div>
  );
};

export default AdminPage;
