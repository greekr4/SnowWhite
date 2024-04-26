import { useEffect, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import { useSpring, animated } from "react-spring";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useMutation, useQueryClient } from "react-query";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";

import {
  Alert,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PopLogin = ({ openPopup, closePopup }) => {
  const cookies = new Cookies();
  const queryClient = useQueryClient();
  const inputRefs = useRef([]);
  const [userid, setUserid] = useState();
  const [userpw, setUserpw] = useState();

  const fadeInAnimation = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { tension: 200, friction: 20 },
  });

  useEffect(() => {
    if (cookies.get("saveId")) {
      setUserid(cookies.get("saveId"));
      setSaveId(true);
    }
  }, []);

  const handleLogin = async () => {
    if (userid === undefined || userpw === undefined) {
      setSnackbar({
        children: "아이디 혹은 비밀번호를 정확히 입력해주세요.",
        severity: "info",
      });
      return false;
    }

    const res_login = await axios.post(
      process.env.REACT_APP_DB_HOST + "/api/login",
      {
        userid: userid,
        userpw: userpw,
      }
    );

    if (res_login.status === 200) {
      cookies.remove("token");
      cookies.remove("refreshToken");
      cookies.set("token", res_login.data.accessToken);
      cookies.set("refreshToken", res_login.data.refreshToken);
      queryClient.invalidateQueries("userinfo");
      queryClient.setQueryData("userinfo");

      if (saveId === true) {
        cookies.remove("saveId");
        cookies.set("saveId", userid);
      } else {
        cookies.remove("saveId");
      }

      closePopup();
    } else {
      setSnackbar({
        children: "아이디 혹은 비밀번호를 확인해주세요.",
        severity: "error",
      });
    }
  };

  const handletest = () => {
    queryClient.setQueryData("userinfo");
  };

  const [snackbar, setSnackbar] = useState(false);
  const [emailError, setEmailError] = useState();
  const handleEmailChange = (e) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(e.target.value)) {
      setEmailError("유효하지 않은 이메일입니다.");
    } else {
      setEmailError(null);
    }

    setUserid(e.target.value);
  };

  const [saveId, setSaveId] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setSnackbar(false)}
          autoHideDuration={3000}
        >
          <Alert {...snackbar} onClose={() => setSnackbar(false)} />
        </Snackbar>
      )}
      <S.Pop_overlay>
        <animated.div style={fadeInAnimation}>
          <S.Pop_Container widthValue="440" heightValue="300">
            <S.Pop_Close_btn onClick={closePopup}>
              <S.Pop_Close_span>×</S.Pop_Close_span>
            </S.Pop_Close_btn>
            <S.Pop_form>
              <S.Pop_Title>로그인</S.Pop_Title>
              <TextField
                fullWidth={true}
                label="이메일"
                defaultValue=""
                helperText={emailError}
                error={emailError ? true : false}
                value={userid}
                onChange={handleEmailChange}
                style={{ marginBottom: "0.6em" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth={true}
                label="비밀번호"
                type={showPassword ? "text" : "password"}
                defaultValue=""
                value={userpw}
                onChange={(e) => {
                  setUserpw(e.target.value);
                }}
                style={{ marginBottom: "0.6em" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <S.Pop_Check>
                <S.Pop_Check_input
                  type="checkbox"
                  id="remember"
                  checked={saveId}
                  onChange={(e) => {
                    setSaveId(e.target.checked);
                  }}
                />
                <S.Pop_Remeber_label htmlFor="remember">
                  아이디 저장하기
                </S.Pop_Remeber_label>
              </S.Pop_Check>
              <S.Pop_Button_Wrap>
                <S.Global_Button onClick={handleLogin}>로그인</S.Global_Button>
              </S.Pop_Button_Wrap>
              <S.Pop_Login_Info>
                <S.Pop_Label_Btn
                  onClick={() => {
                    openPopup(1);
                  }}
                >
                  회원가입
                </S.Pop_Label_Btn>
                <S.Pop_Label_Btn
                  onClick={() => {
                    openPopup(2);
                  }}
                >
                  비밀번호 찾기
                </S.Pop_Label_Btn>
              </S.Pop_Login_Info>
            </S.Pop_form>
          </S.Pop_Container>
        </animated.div>
      </S.Pop_overlay>
    </>
  );
};

export default PopLogin;
