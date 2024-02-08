import * as S from "../styles/styles";
import { FiMenu } from "react-icons/fi";
import { FaShoppingCart, FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <S.Hd_top>
        <S.Hd_top_inner>
          <S.Hd_top_ul>
            <S.Hd_top_li>
              <S.Hd_top_a>로그인</S.Hd_top_a>
            </S.Hd_top_li>
            <S.Hd_top_li>
              <S.Hd_top_a>회원가입</S.Hd_top_a>
            </S.Hd_top_li>
            <S.Hd_top_li>
              <S.Hd_top_a>맞춤상담</S.Hd_top_a>
            </S.Hd_top_li>
            <S.Hd_top_li>
              <S.Hd_top_a>마이페이지</S.Hd_top_a>
            </S.Hd_top_li>
            <S.Hd_top_li>
              <S.Hd_top_a>고객센터</S.Hd_top_a>
            </S.Hd_top_li>
          </S.Hd_top_ul>
        </S.Hd_top_inner>
      </S.Hd_top>

      <S.Hd_mid>
        <S.Hd_mid_inner>
          <S.Hd_mid_menu>
            <FiMenu size={50} />
          </S.Hd_mid_menu>
          <S.Hd_mid_logo>스노우화이트</S.Hd_mid_logo>
          <S.Hd_mid_icons>
            <S.Hd_mid_icon>
              <FaSearch size={30} />
            </S.Hd_mid_icon>
            <S.Hd_mid_icon>
              <FaShoppingCart size={30} />
            </S.Hd_mid_icon>
          </S.Hd_mid_icons>
        </S.Hd_mid_inner>
      </S.Hd_mid>

      <S.Hd_bot>
        <S.Hd_bot_inner>
          <S.Hd_bot_gnbBox>
            <S.Hd_bot_gnb>
              <S.Hd_bot_menu>명함</S.Hd_bot_menu>
              <S.Hd_bot_menu>책자</S.Hd_bot_menu>
              <S.Hd_bot_menu>낱장</S.Hd_bot_menu>
              <S.Hd_bot_menu>현수막/배너</S.Hd_bot_menu>
              <S.Hd_bot_menu>캘린더</S.Hd_bot_menu>
              <S.Hd_bot_menu>박스</S.Hd_bot_menu>
              <S.Hd_bot_menu>쇼핑백</S.Hd_bot_menu>
              <S.Hd_bot_menu>시험지</S.Hd_bot_menu>
              <S.Hd_bot_menu>봉투</S.Hd_bot_menu>
            </S.Hd_bot_gnb>
          </S.Hd_bot_gnbBox>
        </S.Hd_bot_inner>
      </S.Hd_bot>
    </>
  );
};

export default Header;
