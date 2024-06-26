import { useId, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import { useSpring, animated } from "react-spring";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Snackbar,
  TextField,
} from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { formatPhoneNumber } from "../../hooks/Utill";

const PopJoin = ({ openPopup, closePopup, openPopup2 }) => {
  const [userid, setUserid] = useState();
  const [userpw, setUserpw] = useState();
  const [userpwck, setUserpwck] = useState();
  const [usernm, setUsernm] = useState();
  const [snackbar, setSnackbar] = useState(false);

  const ckRefs = useRef([]);
  const inputRefs = useRef([]);

  const handleAllcheck = (e) => {
    if (e.target.checked === true) {
      ckRefs.current[0].checked = true;
      ckRefs.current[1].checked = true;
      ckRefs.current[2].checked = true;
    } else {
      ckRefs.current[0].checked = false;
      ckRefs.current[1].checked = false;
      ckRefs.current[2].checked = false;
    }
  };

  const handleJoin = () => {
    if (userid === undefined || userpw === undefined || usernm === undefined) {
      setSnackbar({
        children: "필수 항목을 모두 입력해주세요.",
        severity: "info",
      });
      return false;
    }

    if (
      emailError != null ||
      pwError !== null ||
      pwckError !== null ||
      nmError !== null ||
      usertelError !== null
    ) {
      setSnackbar({
        children: "필수 항목을 모두 입력해주세요.",
        severity: "info",
      });
      return false;
    }

    if (authOk === false) {
      setSnackbar({
        children: "이메일 인증을 완료해주세요.",
        severity: "info",
      });
      return false;
    }
    if (
      ckRefs.current[0].checked === false ||
      ckRefs.current[1].checked === false ||
      ckRefs.current[2].checked === false
    ) {
      setSnackbar({
        children: "필수 약관을 동의해주세요.",
        severity: "info",
      });
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
        usertel: usertel,
      })
      .then((res) => {
        if (res.status === 200) {
          setDialogOpen(true);
        }
      })
      .catch((error) => {
        setSnackbar({
          children: "회원 가입을 실패하였습니다.",
          severity: "error",
        });
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

  const [showPassword, setShowPassword] = useState(false);
  const [authInputShow, setAuthInputShow] = useState(false);
  const [emailSendCk, setEamilSendCk] = useState(false);

  const [usertel, setUserTel] = useState("");
  const [usertelError, setUserTelError] = useState("");

  const handleAuthEmail = async () => {
    if (emailError !== null) {
      setSnackbar({
        children: "이메일을 정확히 입력해주세요.",
        severity: "info",
      });
      return false;
    }

    const res_mail = await axios.post(
      process.env.REACT_APP_DB_HOST + "/api/join/auth",
      {
        email: userid,
      }
    );

    if (res_mail.status === 200) {
      setEamilSendCk(true);
      setAuthInputShow(true);
      setSnackbar({
        children: "메일이 전송되었습니다.",
        severity: "success",
      });
    } else if (res_mail.status === 201) {
      setSnackbar({
        children: "이미 가입된 이메일입니다.",
        severity: "error",
      });
    } else {
      setSnackbar({
        children: "메일이 전송에 실패했습니다.",
        severity: "error",
      });
    }
  };

  const [authOk, setAuthOk] = useState(false);
  const [authNo, setAuthNo] = useState();

  const handleAuthChange = (e) => {
    setAuthNo(e.target.value);
  };

  const handleAuthButton = async () => {
    const res_ck = await axios.get(
      process.env.REACT_APP_DB_HOST + "/api/join/auth",
      {
        params: {
          email: userid,
          code: authNo,
        },
      }
    );

    if (res_ck.status === 200) {
      setSnackbar({
        children: "인증을 성공하였습니다.",
        severity: "success",
      });
      setAuthOk(true);
    } else {
      setSnackbar({
        children: "인증을 실패하였습니다.",
        severity: "error",
      });
    }
  };

  const [dialogOpen, setDialogOpen] = useState(false);
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

      <Dialog
        open={dialogOpen}
        onClose={() => {
          // setDialogOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            축하합니다! 스노우플래닛 회원가입이 완료 되었습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              openPopup(0);
            }}
            autoFocus
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
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
                disabled={authInputShow ? true : false}
                onChange={handleEmailChange}
                style={{ marginBottom: "0.6em" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {!emailSendCk && (
                        <IconButton onClick={handleAuthEmail}>
                          <SendIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
              {authInputShow && (
                <TextField
                  fullWidth={true}
                  label="이메일 인증번호"
                  defaultValue=""
                  disabled={authOk ? true : false}
                  value={authNo}
                  onChange={handleAuthChange}
                  style={{ marginBottom: "0.6em", transition: "1s ease" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        {!authOk ? (
                          <IconButton onClick={handleAuthButton}>
                            <CheckCircleIcon />
                          </IconButton>
                        ) : (
                          <IconButton>
                            <CheckCircleIcon color="primary" />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              <TextField
                fullWidth={true}
                label="비밀번호"
                type={showPassword ? "text" : "password"}
                defaultValue=""
                value={userpw}
                onChange={handlePwChange}
                helperText={pwError}
                error={pwError ? true : false}
                style={{ marginBottom: "0.6em" }}
                InputProps={{
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

              <TextField
                fullWidth={true}
                label="비밀번호 확인"
                type={showPassword ? "text" : "password"}
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
              <TextField
                fullWidth={true}
                label="휴대전화번호"
                type="text"
                defaultValue=""
                value={usertel}
                onChange={(e) => {
                  const pattern = /^01[016789]-?\d{3,4}-?\d{4}$/;

                  if (!pattern.test(formatPhoneNumber(e.target.value))) {
                    setUserTelError("휴대전화번호를 정확히 입력해주세요.");
                  } else {
                    setUserTelError(null);
                  }

                  setUserTel(formatPhoneNumber(e.target.value));
                }}
                helperText={usertelError}
                error={usertelError ? true : false}
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
                  <b>스노우플래닛 이용 약관</b> 동의 (필수)
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
