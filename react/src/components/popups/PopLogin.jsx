import { useEffect, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import { useSpring, animated } from "react-spring";
import axios from "axios";
import { Cookies } from "react-cookie";
import { useMutation, useQueryClient } from "react-query";

const cookies = new Cookies();

const login = async (value) => {
  const response = await axios.post("http://localhost:3030/login", value);
  return response.data;
};

const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: (data) => {
      console.log(data);
      const StatusCode = {
        200: "success",
        201: "password-error",
        202: "id-error",
      };
      // if (data.code in StatusCode) {
      //   alert(StatusCode[data.code]);
      // }

      if (data.code === 200) {
        //로그인 성공
        cookies.set("token", data.token);
        // 캐시된 데이터를 모두 무효화하여 다시 불러올 수 있도록 함
        queryClient.setQueryData("userinfo");
      }
    },
  });
};

const PopLogin = ({ openPopup, closePopup }) => {
  const queryClient = useQueryClient();
  const { mutate } = useLogin();
  const inputRefs = useRef([]);
  const [userid, setUserid] = useState();
  const [userpw, setUserpw] = useState();

  const fadeInAnimation = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { tension: 200, friction: 20 },
  });

  const handleLogin = () => {
    const isInputEmpty = inputRefs.current.some((e) => {
      if (!e.value) {
        alert(`${e.placeholder}을(를) 입력해주세요`);
        e.focus();
        return true;
      }
      return false;
    });

    if (!isInputEmpty) {
      mutate({ userid: userid, userpw: userpw });
      closePopup();
    }
  };

  const handletest = () => {
    queryClient.setQueryData("userinfo");
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
              <S.Pop_Title>로그인</S.Pop_Title>
              <S.Pop_Input
                placeholder="이메일 또는 아이디"
                ref={(el) => (inputRefs.current[0] = el)}
                onChange={(e) => {
                  setUserid(e.target.value);
                }}
              ></S.Pop_Input>
              <S.Pop_Input
                placeholder="비밀번호"
                type="password"
                ref={(el) => (inputRefs.current[1] = el)}
                onChange={(e) => {
                  setUserpw(e.target.value);
                }}
              ></S.Pop_Input>
              <S.Pop_Check>
                <S.Pop_Check_input type="checkbox" id="remember" />
                <S.Pop_Remeber_label htmlFor="remember">
                  아이디 저장하기
                </S.Pop_Remeber_label>
              </S.Pop_Check>
              <S.Pop_Button_Wrap>
                <S.Global_Button onClick={handleLogin}>로그인</S.Global_Button>
                <S.Global_Button onClick={handletest}>
                  검증테스트
                </S.Global_Button>
                <S.Global_Button onClick={handletest}>
                  검증테스트2
                </S.Global_Button>
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
