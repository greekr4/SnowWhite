import { useId, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import { useSpring, animated } from "react-spring";
import axios from "axios";

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
    const isInputEmpty = inputRefs.current.some((e) => {
      if (!e.value) {
        alert(`${e.placeholder}을(를) 입력해주세요`);
        e.focus();
        return true;
      }
      return false;
    });

    const isCkEmpty = ckRefs.current.some((e) => {
      if (!e.checked && !isInputEmpty) {
        alert(`필수 약관 동의 부탁드립니다.`);
        return true;
      }
      return false;
    });

    if (!isInputEmpty && !isCkEmpty) {
      if (userpw != userpwck) {
        alert("비밀번호를 확인해주세요.");
        return false;
      }
      axios
        .post("api/join", {
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
    }
  };

  const fadeInAnimation = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { tension: 200, friction: 20 },
  });
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
              <S.Pop_Input
                placeholder="이메일 또는 아이디"
                value={userid}
                onChange={(e) => {
                  setUserid(e.target.value);
                }}
                ref={(el) => (inputRefs.current[0] = el)}
              />
              <S.Pop_Input
                placeholder="비밀번호"
                type="password"
                value={userpw}
                onChange={(e) => {
                  setUserpw(e.target.value);
                }}
                ref={(el) => (inputRefs.current[1] = el)}
              ></S.Pop_Input>
              <S.Pop_Input
                placeholder="비밀번호 확인"
                type="password"
                value={userpwck}
                onChange={(e) => {
                  setUserpwck(e.target.value);
                }}
                ref={(el) => (inputRefs.current[2] = el)}
              ></S.Pop_Input>
              <S.Pop_Input
                placeholder="이름"
                value={usernm}
                onChange={(e) => {
                  setUsernm(e.target.value);
                }}
                ref={(el) => (inputRefs.current[3] = el)}
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
