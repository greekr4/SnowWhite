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
import { useEffect, useState } from "react";

import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Header3 from "./components/headers/Header3";

import GlobalStyle from "./styles/global_style";
import Footer2 from "./components/footers/Footer2";
import MainPage2 from "./pages/MainPage2";
import CartPage from "./pages/CartPage";
import ScrollToTop from "./hooks/ScrollToTop";
import NoticePage from "./pages/NoticePage";
import MyPage from "./pages/MyPage";
import OrderListPage from "./pages/OrderListPage";
import OrderPage from "./pages/OrderPage";

import DefaultLayout from "./components/global/DefaultLayout";
import EditorPage from "./pages/EditorPage";
import { TestPage } from "./pages/TestPage";
import IntroPage0 from "./pages/IntroPage0";
import { Cookies } from "react-cookie";
import { QueryClient } from "react-query";
import useUserinfoQuery from "./hooks/User";
import "./hooks/axiosConfig.jsx";
import PrintEstimate from "./components/products/PrintEstimate.jsx";
import TestKonva from "./pages/TestKonva.jsx";
import TestKonva2 from "./pages/TestKonva2.jsx";
import TestKonva3 from "./pages/TestKonva3.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AdminProdDetail from "./components/admin/AdminProdDetail.jsx";

function App({ queryClient }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);
  const [popupIndex, setPopupIndex] = useState(0);
  const [popupIndex2, setPopupIndex2] = useState(0);

  const cookies = new Cookies();
  const token = cookies.get("token");
  useUserinfoQuery();

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
        <ScrollToTop />
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
        <Routes>
          <Route
            element={
              <DefaultLayout openPopup={openPopup} queryClient={queryClient} />
            }
          >
            <Route path="/" element={<MainPage2 />} />
            <Route path="/products/:cateid" element={<ProductsPage />} />
            <Route
              path="/products/detail/:prod_sid"
              element={<ProductDetailPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order/:item_sids" element={<OrderPage />} />
            <Route path="/orderlist" element={<OrderListPage />} />
            <Route path="/notice" element={<NoticePage />} />
            <Route
              path="/mypage"
              element={<MyPage queryClient={queryClient} />}
            />
            <Route path="/intro0" element={<IntroPage0 />} />
          </Route>
          <Route path="/editor" element={<TestKonva3 />} />
          <Route path="/test" element={<TestKonva />} />
          <Route path="/test2" element={<TestKonva2 />} />
          <Route path="/test3" element={<TestKonva3 />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/prod/:prod_sid" element={<AdminProdDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
