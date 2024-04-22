import React, { useEffect, useState } from "react";
import * as S from "../../styles/new_styles";
import { useSpring, animated } from "react-spring";
import axios from "axios";
import { useQuery } from "react-query";
import Card from "@mui/material/Card";
import { CardActionArea, CardContent, Divider } from "@mui/material";

const PopDeliveryForm = ({ openPopup, closePopup, popupData }) => {
  const [delis, setDelis] = useState([]);

  const { data } = useQuery("userinfo", { enabled: false });
  const USER_ID = data?.USER_ID;

  const fadeInAnimation = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { tension: 200, friction: 20 },
  });

  useEffect(() => {
    initdb();
  }, []);

  const initdb = async () => {
    setDelis(
      (
        await axios.post(process.env.REACT_APP_DB_HOST + "/api/delivery", {
          userid: USER_ID,
        })
      ).data
    );
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
              <S.Pop_Title>나의 배송지</S.Pop_Title>
              <div
                style={{
                  paddingRight: "1em",
                  overflowY: "scroll",
                  height: "460px",
                }}
              >
                {delis?.length > 0 ? (
                  delis?.map((el, index) => (
                    <Card variant="outlined" style={{ marginBottom: "0.5em" }}>
                      <CardActionArea
                        onClick={() => {
                          popupData.handleSetDeli(
                            el.DELI_REC,
                            el.DELI_TEL0,
                            el.DELI_POSTCODE,
                            el.DELI_ADDRESS,
                            el.DELI_ADD_ADDRESS
                          );
                        }}
                      >
                        <CardContent>
                          <S.PopDeliTable>
                            <tr>
                              <th>배송지</th>
                              <td>{el.DELI_NM}</td>
                            </tr>
                            <tr>
                              <th>주소</th>
                              <td>
                                {el.DELI_ADDRESS} ({el.DELI_POSTCODE}){" "}
                                {el.DELI_ADD_ADDRESS}
                              </td>
                            </tr>
                            <tr>
                              <th>받는분</th>
                              <td>{el.DELI_REC}</td>
                            </tr>
                            <tr>
                              <th>연락처</th>
                              <td>{el.DELI_TEL0}</td>
                            </tr>
                          </S.PopDeliTable>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))
                ) : (
                  <S.NoDelis>배송지를 추가해주세요.</S.NoDelis>
                )}
              </div>
              <S.Pop_Info_Wrap>
                <S.Pop_Info_Title>INFO</S.Pop_Info_Title>
                <S.Pop_Info_Desc>
                  회원님의 배송지를 선택해주세요.
                </S.Pop_Info_Desc>
                <S.Pop_Info_Desc>
                  배송지 추가 및 수정은 마이페이지에서 가능합니다.
                </S.Pop_Info_Desc>
              </S.Pop_Info_Wrap>
            </S.Pop_form>
          </S.Pop_Container>
        </animated.div>
      </S.Pop_overlay>
    </>
  );
};

export default PopDeliveryForm;
