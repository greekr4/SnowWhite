import "./App.css";
import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import Test from "./components/test";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

const Aa = styled.div`
  font-size: 100px;
`;

function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer></Footer>
        <Test></Test>
      </BrowserRouter>
    </>
  );
}

export default App;
