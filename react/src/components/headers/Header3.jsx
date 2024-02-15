import * as S from "../../styles/new_styles";
import logo_sample from "../../assets/logo_sample.png";

const Header3 = () => {
  return (
    <S.HeaderLayout>
      {/* 배너 */}
      <S.HeaderBannerWrapper>
        <S.HeaderBannerBox></S.HeaderBannerBox>
      </S.HeaderBannerWrapper>

      {/* gnb */}
      <S.HeaderGnbWrapper>
        <S.HeaderGnbRows>
          <S.HeaderLogoBox img={logo_sample} />
          <S.HeaderMenuList>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>명함</S.HeaderMenuText>
              <S.HeaderSubMenuWrapper>
                <S.HeaderSubMenuBox>
                  <S.HeaderSubMenuCols>
                    <S.HeaderSubMenuItem>
                      <S.HeaderSubMenuText>1</S.HeaderSubMenuText>
                    </S.HeaderSubMenuItem>
                    <S.HeaderSubMenuItem>
                      <S.HeaderSubMenuText>2</S.HeaderSubMenuText>
                    </S.HeaderSubMenuItem>
                    <S.HeaderSubMenuItem>
                      <S.HeaderSubMenuText>3</S.HeaderSubMenuText>
                    </S.HeaderSubMenuItem>
                  </S.HeaderSubMenuCols>
                </S.HeaderSubMenuBox>
              </S.HeaderSubMenuWrapper>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>책자</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>스티커</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>현수막</S.HeaderMenuText>
              <S.HeaderSubMenuWrapper>
                <S.HeaderSubMenuBox>
                  <S.HeaderSubMenuCols>
                    <S.HeaderSubMenuItem>
                      <S.HeaderSubMenuText>1</S.HeaderSubMenuText>
                    </S.HeaderSubMenuItem>
                    <S.HeaderSubMenuItem>
                      <S.HeaderSubMenuText>2</S.HeaderSubMenuText>
                    </S.HeaderSubMenuItem>
                    <S.HeaderSubMenuItem>
                      <S.HeaderSubMenuText>3</S.HeaderSubMenuText>
                    </S.HeaderSubMenuItem>
                  </S.HeaderSubMenuCols>
                </S.HeaderSubMenuBox>
              </S.HeaderSubMenuWrapper>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>캘린더</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>박스</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>쇼핑백</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>시험지</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>봉투</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>고객센터</S.HeaderMenuText>
              <S.HeaderSubMenuWrapper>
                <S.HeaderSubMenuBox>
                  <S.HeaderSubMenuCols>
                    <S.HeaderSubMenuItem>
                      <S.HeaderSubMenuText>1</S.HeaderSubMenuText>
                    </S.HeaderSubMenuItem>
                    <S.HeaderSubMenuItem>
                      <S.HeaderSubMenuText>2</S.HeaderSubMenuText>
                    </S.HeaderSubMenuItem>
                    <S.HeaderSubMenuItem>
                      <S.HeaderSubMenuText>3</S.HeaderSubMenuText>
                    </S.HeaderSubMenuItem>
                  </S.HeaderSubMenuCols>
                </S.HeaderSubMenuBox>
              </S.HeaderSubMenuWrapper>
            </S.HeaderMenuItem>
          </S.HeaderMenuList>
          <S.HeaderMenuList>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>로그인</S.HeaderMenuText>
            </S.HeaderMenuItem>
            <S.HeaderMenuItem>
              <S.HeaderMenuText>회원가입</S.HeaderMenuText>
            </S.HeaderMenuItem>
          </S.HeaderMenuList>
        </S.HeaderGnbRows>
      </S.HeaderGnbWrapper>
    </S.HeaderLayout>
  );
};

export default Header3;
