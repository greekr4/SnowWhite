import { useEffect, useRef, useState } from "react";
import * as S from "../../styles/new_styles";
import { useSpring, animated } from "react-spring";
import axios from "axios";

const PopOrderDetail = ({ openPopup, closePopup, popupData }) => {
  const [items, setItems] = useState([]);
  const fadeInAnimation = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { tension: 200, friction: 20 },
  });

  useEffect(() => {
    initdb();
  }, [popupData]);

  const initdb = async () => {
    const item_sids = popupData.ITEMS.split(",");
    const items = (
      await axios.post("/api/orderlist/item", {
        item_sids: item_sids,
      })
    ).data;

    setItems(items);
  };

  return (
    <>
      <S.Pop_overlay>
        <animated.div style={fadeInAnimation}>
          <S.Pop_Container
            widthValue="440"
            heightValue="300"
            style={{ overflow: "auto", height: "650px" }}
          >
            <S.Pop_Close_btn onClick={closePopup}>
              <S.Pop_Close_span>×</S.Pop_Close_span>
            </S.Pop_Close_btn>
            <S.Pop_form>
              <S.Pop_Title>주문상세</S.Pop_Title>

              {items?.map((el, index) => (
                <S.Pop_OrderDetail_ProdBox key={index}>
                  <img src={el.IMAGE_LOCATION} />
                  <h1>{el.PROD_NM}</h1>
                  <h2>
                    {el.ITEM_OPTION.map((option, index) =>
                      index < el.ITEM_OPTION.length - 1 ? (
                        <>
                          {option.OPTION_CATE}-{option.OPTION_NM} /{" "}
                        </>
                      ) : (
                        <>
                          {option.OPTION_CATE}-{option.OPTION_NM}
                        </>
                      )
                    )}
                  </h2>
                  <p>
                    {el.ITEM_QUANTITY.toLocaleString("ko-kr")}
                    {"EA"}
                  </p>
                  <p> {el.ITEM_AMOUNT.toLocaleString("ko-kr")}원</p>
                </S.Pop_OrderDetail_ProdBox>
              ))}

              <S.Pop_Button_Wrap>
                <S.Global_Button onClick={closePopup}>닫기</S.Global_Button>
              </S.Pop_Button_Wrap>
            </S.Pop_form>
          </S.Pop_Container>
        </animated.div>
      </S.Pop_overlay>
    </>
  );
};

export default PopOrderDetail;
