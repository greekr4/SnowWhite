import * as S from "../../styles/styles";
import { useSpring, animated } from "react-spring";

const PopJoin = ({ openPopup, closePopup, openPopup2 }) => {
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
              <S.Pop_Input placeholder="이메일 또는 아이디"></S.Pop_Input>
              <S.Pop_Input placeholder="비밀번호" type="password"></S.Pop_Input>
              <S.Pop_Input
                placeholder="비밀번호 확인"
                type="password"
              ></S.Pop_Input>
              <S.Pop_Input placeholder="이름"></S.Pop_Input>

              <S.Pop_Check>
                <S.Pop_Check_input type="checkbox" id="allck" />
                <S.Pop_Remeber_label htmlFor="allck">
                  전체 동의
                </S.Pop_Remeber_label>
              </S.Pop_Check>
              <S.Pop_Check>
                <S.Pop_Check_input type="checkbox" id="ck0" />
                <S.Pop_Remeber_label htmlFor="ck0">
                  만 14세 이상입니다. (필수)
                </S.Pop_Remeber_label>
              </S.Pop_Check>
              <S.Pop_Check>
                <S.Pop_Check_input type="checkbox" id="ck1" />
                <S.Pop_Remeber_label
                  onClick={() => {
                    openPopup2(0);
                  }}
                >
                  <b>스노우화이트 이용 약관</b> 동의 (필수)
                </S.Pop_Remeber_label>
              </S.Pop_Check>
              <S.Pop_Check>
                <S.Pop_Check_input type="checkbox" id="ck2" />
                <S.Pop_Remeber_label
                  onClick={() => {
                    openPopup2(1);
                  }}
                >
                  <b>개인정보 이용 약관</b> 동의 (필수)
                </S.Pop_Remeber_label>
              </S.Pop_Check>
              <S.Pop_Button_Wrap>
                <S.Global_Button>완료</S.Global_Button>
              </S.Pop_Button_Wrap>
            </S.Pop_form>
          </S.Pop_Container>
        </animated.div>
      </S.Pop_overlay>
    </>
  );
};

export default PopJoin;
