import { useEffect, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import { useSpring, animated } from "react-spring";
import axios from "axios";

const PopOptionForm = ({ openPopup, closePopup, popupData }) => {
  const fadeInAnimation = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { tension: 200, friction: 20 },
  });

  const [optionSid, setOptionSid] = useState();
  const [optionCate, setOptionCate] = useState();
  const [optionNm, setOptionNm] = useState();
  const [optionDetail, setOptionDetail] = useState();
  const [optionPrice, setOptionPrice] = useState();

  const handleBtnClick = async () => {
    if (!optionCate || !optionNm || !optionDetail || !optionPrice) {
      alert("빈 칸을 모두 입력해주세요.");
      return false;
    }
    if (popupData.mode === "insert") {
      const res = await axios.post("/api/admin/option", {
        OPTION_CATE: optionCate,
        OPTION_NM: optionNm,
        OPTION_DETAIL: optionDetail,
        OPTION_PRICE: optionPrice,
      });
      if (res.status === 200) {
        alert("옵션 생성이 완료 되었습니다.");
        popupData.initdb();
        closePopup();
      } else {
        alert("옵션 생성에 실패했습니다.");
      }
    } else if (popupData.mode === "update") {
      const res = await axios.put("/api/admin/option", {
        OPTION_SID: optionSid,
        OPTION_CATE: optionCate,
        OPTION_NM: optionNm,
        OPTION_DETAIL: optionDetail,
        OPTION_PRICE: optionPrice,
      });
      if (res.status === 200) {
        alert("옵션 변경이 완료 되었습니다.");
        popupData.initdb();
        closePopup();
      } else {
        alert("옵션 변경에 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    if (popupData.mode === "update") {
      setOptionSid(popupData.optionSid);
      setOptionCate(popupData.optionCate);
      setOptionNm(popupData.optionNm);
      setOptionDetail(popupData.optionDetail);
      setOptionPrice(popupData.optionPrice);
    }
  }, []);

  useEffect(() => {});

  return (
    <>
      <S.Pop_overlay>
        <animated.div style={fadeInAnimation}>
          <S.Pop_Container
            widthValue="440"
            heightValue="300"
            style={{ overflow: "auto", height: "570px" }}
          >
            <S.Pop_Close_btn onClick={closePopup}>
              <S.Pop_Close_span>×</S.Pop_Close_span>
            </S.Pop_Close_btn>
            <S.Pop_form>
              <S.Pop_Title>옵션 관리</S.Pop_Title>
              <S.GlobalInputBox>
                <input
                  type="text"
                  value={optionCate}
                  onChange={(e) => setOptionCate(e.target.value)}
                />
                <label>옵션 카테고리</label>
              </S.GlobalInputBox>
              <S.GlobalInputBox>
                <input
                  type="text"
                  value={optionNm}
                  onChange={(e) => setOptionNm(e.target.value)}
                />
                <label>옵션 이름</label>
              </S.GlobalInputBox>
              <S.GlobalInputBox>
                <input
                  type="text"
                  value={optionDetail}
                  onChange={(e) => setOptionDetail(e.target.value)}
                />
                <label>옵션 설명</label>
              </S.GlobalInputBox>
              <S.GlobalInputBox>
                <input
                  type="number"
                  value={optionPrice}
                  onChange={(e) => setOptionPrice(e.target.value)}
                />
                <label>옵션 가격</label>
              </S.GlobalInputBox>
              <S.Pop_Button_Wrap>
                <S.Global_Button onClick={handleBtnClick}>확인</S.Global_Button>
              </S.Pop_Button_Wrap>
            </S.Pop_form>
          </S.Pop_Container>
        </animated.div>
      </S.Pop_overlay>
    </>
  );
};

export default PopOptionForm;
