import { Skeleton } from "@mui/material";
import React from "react";

const AdminDashBoard = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      <Skeleton
        variant="rectangular"
        width={"48%"}
        height={500}
        style={{ margin: "10px" }}
      />
      <Skeleton
        variant="rectangular"
        width={"48%"}
        height={500}
        style={{ margin: "10px" }}
      />
      <Skeleton
        variant="rectangular"
        width={"24%"}
        height={250}
        style={{ margin: "5px" }}
      />
      <Skeleton
        variant="rectangular"
        width={"24%"}
        height={250}
        style={{ margin: "5px" }}
      />
      <Skeleton
        variant="rectangular"
        width={"24%"}
        height={250}
        style={{ margin: "5px" }}
      />
      <Skeleton
        variant="rectangular"
        width={"24%"}
        height={250}
        style={{ margin: "5px" }}
      />
    </div>
  );
};

export default AdminDashBoard;
