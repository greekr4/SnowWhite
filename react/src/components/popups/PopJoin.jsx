import { useId, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import { useSpring, animated } from "react-spring";
import axios from "axios";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PopJoin = ({ openPopup, closePopup, openPopup2 }) => {
  const [userid, setUserid] = useState();
  const [userpw, setUserpw] = useState();
  const [userpwck, setUserpwck] = useState();
  const [usernm, setUsernm] = useState();

  const ckRefs = useRef([]);
  const inputRefs = useRef([]);

  const handleAllcheck = (e) => {
    if (e.target.checked === true) {
      ckRefs.current.forEach((e) => {
        e.checked = true;
      });
    } else {
      ckRefs.current.forEach((e) => {
        e.checked = false;
      });
    }
  };

  const handleJoin = () => {
    console.log(ckRefs.current);

    if (userid === undefined || userpw === undefined || usernm === undefined) {
      alert("모두 입력해주세요");
      return false;
    }

    if (
      emailError != null ||
      pwError !== null ||
      pwckError !== null ||
      nmError !== null
    ) {
      alert("정확히 입력해주세요");
      return false;
    }

    // let isck;

    // ckRefs.current.map((el) => {
    //   console.log(el.checked);
    //   if (!el.checked) {
    //     isck = false;
    //   }
    // });

    axios
      .post(process.env.REACT_APP_DB_HOST + "/api/join", {
        userid: userid,
        userpw: userpw,
        usernm: usernm,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          alert(res.data);
          openPopup(0);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data);
      });
  };

  const fadeInAnimation = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { tension: 200, friction: 20 },
  });

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

  const [pwError, setPwError] = useState();
  const handlePwChange = (e) => {
    if (e.target.value.length < 6) {
      setPwError("6자리 이상 입력해주세요.");
    } else {
      setPwError(null);
    }
    setUserpw(e.target.value);
  };

  const [pwckError, setPwckError] = useState();
  const handlePwckChange = (e) => {
    if (e.target.value !== userpw) {
      setPwckError("비밀번호가 올바르지 않습니다.");
    } else {
      setPwckError(null);
    }
    setUserpwck(e.target.value);
  };

  const [nmError, setNmError] = useState();
  const handleNmChange = (e) => {
    const pattern = /^[가-힣]*$/;

    if (!pattern.test(e.target.value)) {
      setNmError("이름을 정확히 입력해주세요.");
    } else {
      setNmError(null);
    }

    setUsernm(e.target.value);
  };

  return (
    <>
      <S.Pop_overlay>
        <animated.div style={fadeInAnimation}>
          <S.Pop_Container widthValue="440" heightValue="300">
            <S.Pop_Close_btn onClick={closePopup}>
              <S.Pop_Close_span>×</S.Pop_Close_span>
            </S.Pop_Close_btn>
            <S.Pop_form>
              <S.Pop_Title>회원가입</S.Pop_Title>
              <TextField
                fullWidth={true}
                label="이메일"
                defaultValue=""
                helperText={emailError}
                error={emailError ? true : false}
                value={userid}
                onChange={handleEmailChange}
                style={{ marginBottom: "0.6em" }}
              />

              <TextField
                fullWidth={true}
                label="비밀번호"
                type="password"
                defaultValue=""
                value={userpw}
                onChange={handlePwChange}
                helperText={pwError}
                error={pwError ? true : false}
                style={{ marginBottom: "0.6em" }}
              />

              <TextField
                fullWidth={true}
                label="비밀번호 확인"
                type="password"
                defaultValue=""
                value={userpwck}
                onChange={handlePwckChange}
                helperText={pwckError}
                error={pwckError ? true : false}
                style={{ marginBottom: "0.6em" }}
              />
              <TextField
                fullWidth={true}
                label="이름"
                type="text"
                defaultValue=""
                value={usernm}
                onChange={handleNmChange}
                helperText={nmError}
                error={nmError ? true : false}
                style={{ marginBottom: "0.6em" }}
              />

              <S.Pop_Check>
                <S.Pop_Check_input
                  type="checkbox"
                  id="allck"
                  onClick={handleAllcheck}
                />
                <S.Pop_Remeber_label htmlFor="allck">
                  전체 동의
                </S.Pop_Remeber_label>
              </S.Pop_Check>
              <S.Pop_Check>
                <S.Pop_Check_input
                  type="checkbox"
                  id="ck0"
                  ref={(el) => (ckRefs.current[0] = el)}
                />
                <S.Pop_Remeber_label htmlFor="ck0">
                  만 14세 이상입니다. (필수)
                </S.Pop_Remeber_label>
              </S.Pop_Check>
              <S.Pop_Check>
                <S.Pop_Check_input
                  type="checkbox"
                  id="ck1"
                  ref={(el) => (ckRefs.current[1] = el)}
                />
                <S.Pop_Remeber_label
                  onClick={() => {
                    openPopup2(0);
                  }}
                >
                  <b>스노우화이트 이용 약관</b> 동의 (필수)
                </S.Pop_Remeber_label>
              </S.Pop_Check>
              <S.Pop_Check>
                <S.Pop_Check_input
                  type="checkbox"
                  id="ck2"
                  ref={(el) => (ckRefs.current[2] = el)}
                />
                <S.Pop_Remeber_label
                  onClick={() => {
                    openPopup2(1);
                  }}
                >
                  <b>개인정보 이용 약관</b> 동의 (필수)
                </S.Pop_Remeber_label>
              </S.Pop_Check>
              <S.Pop_Button_Wrap>
                <S.Global_Button onClick={handleJoin}>완료</S.Global_Button>
              </S.Pop_Button_Wrap>
            </S.Pop_form>
          </S.Pop_Container>
        </animated.div>
      </S.Pop_overlay>
    </>
  );
};

export default PopJoin;
