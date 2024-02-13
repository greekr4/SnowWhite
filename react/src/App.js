import "./App.css";
import styled from "styled-components";

import MainPage from "./pages/MainPage";
import Test from "./components/test";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Header from "./components/headers/Header";
import Footer from "./components/footers/Footer";
import Header2 from "./components/headers/Header2";
import ModalPortal from "./components/popups/Potals";
import { useState } from "react";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupIndex, setPopupIndex] = useState(0);

  const openPopup = (index) => {
    setIsPopupOpen(true);
    setPopupIndex(index);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <BrowserRouter>
        <ModalPortal
          isOpen={isPopupOpen}
          openPopup={openPopup}
          closePopup={closePopup}
          popupIndex={popupIndex}
        ></ModalPortal>
        {/* <Header></Header> */}
        <Header2 openPopup={openPopup}></Header2>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
