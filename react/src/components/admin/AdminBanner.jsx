import AdminBanner_MainSlider from "./AdminBanner_MainSlider";
import { Divider } from "@mui/material";
import * as S from "../../styles/new_styles";
const AdminBanner = () => {
  return (
    <>
      <S.MainLayout>
        <S.AdminWrapper>
          <AdminBanner_MainSlider />
          <Divider style={{ padding: "20px" }} />
        </S.AdminWrapper>
      </S.MainLayout>
    </>
  );
};

export default AdminBanner;
