import * as S from "../../styles/styles";

const PopJoin = ({ openPopup, closePopup }) => {
  return (
    <>
      <S.Pop_overlay>
        <S.Pop_Container widthValue="440" heightValue="300">
          <S.Pop_Close_btn onClick={closePopup}>
            <S.Pop_Close_span>×</S.Pop_Close_span>
          </S.Pop_Close_btn>
          <S.Pop_Login_form>
            <S.Pop_Title>회원가입</S.Pop_Title>
            <S.Pop_Input placeholder="이메일 또는 아이디"></S.Pop_Input>
            <S.Pop_Input
              placeholder="비밀번호 입력"
              type="password"
            ></S.Pop_Input>
            <S.Pop_Check>
              <S.Pop_Check_input type="checkbox" id="remember" />
              <S.Pop_Remeber_label htmlFor="remember">
                아이디 저장하기
              </S.Pop_Remeber_label>
            </S.Pop_Check>
            <S.Pop_Button_Wrap>
              <S.Global_Button>로그인</S.Global_Button>
            </S.Pop_Button_Wrap>
            <S.Pop_Login_Info>
              <S.Pop_Label_Btn
                onClick={() => {
                  openPopup(0);
                }}
              >
                로그인
              </S.Pop_Label_Btn>
              <S.Pop_Label_Btn>비밀번호 찾기</S.Pop_Label_Btn>
            </S.Pop_Login_Info>
          </S.Pop_Login_form>
        </S.Pop_Container>
      </S.Pop_overlay>
    </>
  );
};

export default PopJoin;
