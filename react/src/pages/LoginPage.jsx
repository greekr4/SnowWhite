import axios from "axios";
import { useState } from "react";
import { Cookies } from "react-cookie";

// 쿠키 관련
const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name, option) => {
  return cookies.remove(name, { ...option });
};
//

const LoginPage = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const handleLoginClick = () => {
    console.log(inputId);
    console.log(inputPw);
    axios
      .post("api/login", null, {
        params: { userid: inputId, userpw: inputPw },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          //로그인 성공 -> 토근 발급
          setCookie("token", res.data.token, { path: "/", sameSite: "strict" });
        } else {
          //로그인 실패
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <h1>아이디</h1>
        <input onChange={handleInputId}></input>
        <h1>비밀번호</h1>
        <input onChange={handleInputPw}></input>
        <div>
          <br></br>
          <button onClick={handleLoginClick}>로그인</button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default LoginPage;
