import React from "react";
import { Outlet } from "react-router-dom";
import Header3 from "../headers/Header3";
import Footer2 from "../footers/Footer2";

const DefaultLayout = ({ openPopup, openPopup2, queryClient }) => {
  return (
    <>
      <Header3 openPopup={openPopup} queryClient={queryClient} />
      <Outlet />
      <Footer2 openPopup2={openPopup2} />
    </>
  );
};

export default DefaultLayout;
