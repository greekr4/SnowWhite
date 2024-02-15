import "./App.css";
import styled from "styled-components";

import MainPage from "./pages/MainPage";
import Test from "./components/test";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Header from "./components/headers/Header";
import Footer from "./components/footers/Footer";
import Header2 from "./components/headers/Header2";
import Potals from "./components/popups/Potals";
import { useState } from "react";

import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Header3 from "./components/headers/Header3";

import GlobalStyle from "./styles/global_style";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);
  const [popupIndex, setPopupIndex] = useState(0);
  const [popupIndex2, setPopupIndex2] = useState(0);

  const openPopup = (index) => {
    setIsPopupOpen(true);
    setPopupIndex(index);
  };

  const openPopup2 = (index) => {
    setIsPopupOpen2(true);
    setPopupIndex2(index);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const closePopup2 = () => {
    setIsPopupOpen2(false);
  };

  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Potals.ModalPortal
          isOpen={isPopupOpen}
          openPopup={openPopup}
          closePopup={closePopup}
          openPopup2={openPopup2}
          closePopup2={closePopup2}
          popupIndex={popupIndex}
        ></Potals.ModalPortal>
        <Potals.ModalPortal2
          isOpen2={isPopupOpen2}
          openPopup2={openPopup2}
          closePopup2={closePopup2}
          popupIndex2={popupIndex2}
        ></Potals.ModalPortal2>
        {/* <Header></Header> */}
        {/* <Header2 openPopup={openPopup}></Header2> */}
        <Header3 />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/detail" element={<ProductDetailPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
