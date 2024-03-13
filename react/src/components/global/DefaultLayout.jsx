import React from "react";
import { Outlet } from "react-router-dom";
import Header3 from "../headers/Header3";
import Footer2 from "../footers/Footer2";

const DefaultLayout = ({ openPopup, queryClient }) => {
  return (
    <>
      <Header3 openPopup={openPopup} queryClient={queryClient} />
      <Outlet />
      <Footer2 />
    </>
  );
};

export default DefaultLayout;
