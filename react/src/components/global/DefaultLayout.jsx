import React from "react";
import { Outlet } from "react-router-dom";
import Header3 from "../headers/Header3";
import Footer2 from "../footers/Footer2";
import { Box, SpeedDial } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";
import { animateScroll as scroll } from "react-scroll";

const DefaultLayout = ({ openPopup, openPopup2, queryClient }) => {
  return (
    <>
      <Header3 openPopup={openPopup} queryClient={queryClient} />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 50, right: 50 }}
        icon={<ArrowUpward />}
        onClick={() => scroll.scrollToTop({ smooth: true })}
      />
      <Box sx={{ pt: "80px" }} />
      <Outlet />
      <Footer2 openPopup2={openPopup2} />
    </>
  );
};

export default DefaultLayout;
