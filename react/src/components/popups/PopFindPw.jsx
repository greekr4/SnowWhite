import * as S from "../../styles/styles";
import { useSpring, animated } from "react-spring";

const PopFindPw = ({ openPopup, closePopup }) => {
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
              <S.Pop_Title>비밀번호 찾기</S.Pop_Title>
              <S.Pop_Input placeholder="이메일"></S.Pop_Input>
              <S.Pop_Input placeholder="이름"></S.Pop_Input>
              <S.Pop_Info_Wrap>
                <S.Pop_Info_Title>유의사항</S.Pop_Info_Title>
                <S.Pop_Info_Desc>
                  회원님의 이메일 주소로 임시 비밀번호가 발송됩니다.
                </S.Pop_Info_Desc>
                <S.Pop_Info_Desc>
                  로그인 후 비밀번호 변경을 권장드립니다.
                </S.Pop_Info_Desc>
              </S.Pop_Info_Wrap>
              <S.Pop_Button_Wrap>
                <S.Global_Button>임시 비밀번호 전송</S.Global_Button>
              </S.Pop_Button_Wrap>
            </S.Pop_form>
          </S.Pop_Container>
        </animated.div>
      </S.Pop_overlay>
    </>
  );
};

export default PopFindPw;
