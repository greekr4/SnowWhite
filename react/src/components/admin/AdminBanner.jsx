import AdminBanner_MainSlider from "./AdminBanner_MainSlider";
import { Divider } from "@mui/material";
import * as S from "../../styles/new_styles";
import AdminBanner_Category from "./AdminBanner_Category";
const AdminBanner = () => {
  return (
    <>
      <S.MainLayout>
        <S.AdminWrapper>
          <AdminBanner_MainSlider />
          <Divider style={{ padding: "20px", marginBottom: "20px" }} />
          <AdminBanner_Category />
        </S.AdminWrapper>
      </S.MainLayout>
    </>
  );
};

export default AdminBanner;
