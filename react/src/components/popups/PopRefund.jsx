import * as S from "../../styles/new_styles";
import { useSpring, animated } from "react-spring";

const PopRefund = ({ openPopup, closePopup }) => {
  const fadeInAnimation = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { tension: 200, friction: 20 },
  });
  return (
    <>
      <S.Pop_overlay>
        <animated.div style={fadeInAnimation}>
          <S.Pop_Container
            widthValue="500"
            heightValue="400"
            style={{ height: "800px" }}
          >
            <S.Pop_Close_btn onClick={closePopup}>
              <S.Pop_Close_span>×</S.Pop_Close_span>
            </S.Pop_Close_btn>
            <S.Pop_form>
              <S.Pop_Title>환불 및 교환 정책</S.Pop_Title>

              <S.Pop_Policy_Wrap>
                <S.Pop_Policy_Content>
                  <h1>제16조(청약철회)</h1>
                  <p>
                    1. '회사'와 재화 등의 구매에 관한 계약을 체결한 '구매자'는
                    수신확인의 통지를 받은 날부터 7일 이내에 청약을 철회할 수
                    있습니다.
                  </p>
                  <p>
                    2. 다음 각호의 사유에 해당하는 경우, 배송받은 재화의 반품
                    또는 교환이 제한됩니다.
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    가. '구매자'에게 책임있는 사유로 재화 등이 멸실 또는 훼손된
                    경우(다만, 재화를 확인하기 위하여 포장 등을 훼손한 경우는
                    예외로 합니다)
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    나. '구매자'의 사용 또는 소비에 의하여 재화의 가치가 현저히
                    감소한 경우
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    다. 시간의 경과로 재판매가 곤란할 정도로 재화의 가치가
                    현저히 감소한 경우
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    라. 같은 성능을 지닌 재화 등으로 복제가 가능한 경우 그
                    원본이 되는 재화의 포장을 훼손한 경우
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    마. '구매자'의 주문에 의하여 개별적으로 생산한 상품으로서
                    청약철회 및 교환의 제한에 대하여 사전에 고지한 경우
                  </p>
                  <p>
                    3. '회사'가 전항의 청약철회 제한 사유를 '구매자'가 알기 쉽게
                    명시하거나, 시용상품을 제공하는 등의 조치를 취하지 않은 경우
                    '구매자'의 청약철회가 제한되지 않습니다.
                  </p>
                  <p>
                    4. '구매자'는 본조의 규정에도 불구하고 재화등의 내용이 표시,
                    광고내용과 다르거나 계약내용과 다르게 이행된 때에는 당해
                    재화를 공급받은 날로부터 3월 이내, 그 사실을 안날 또는 알 수
                    있었던 날부터 30일 이내에 청약철회 등을 할 수 있습니다.
                  </p>
                  <h1>제17조(청약철회의 효과)</h1>
                  <p>
                    1. '회사'는 '구매자'로부터 재화 등을 반환 받은 경우 3영업일
                    이내에 이미 지급받은 재화 등의 대금을 환급합니다. 이때
                    '회사'가 '구매자'에게 재화등의 환급을 지연한 때에는 그
                    지연기간에 대하여 전자상거래법 시행령 제21조의3 소정의
                    이율(연 15%)을 곱하여 산정한 지연이자를 지급합니다.
                  </p>
                  <p>
                    2. '회사'는 위 재화를 환급함에 있어서 '구매자'가 신용카드
                    또는 전자화폐 등의 결제수단을 사용한 경우에는 지체없이 당해
                    결제수단을 제공한 사업자로 하여금 재화등의 대금 청구를 정지
                    또는 취소하도록 요청합니다.
                  </p>
                  <p>
                    3. 청약철회의 경우 공급받은 재화등의 반환에 필요한 비용은
                    '구매자'가 부담합니다. 다만, 재화등의 내용이 표시 ·
                    광고내용과 다르거나 계약내용과 다르게 이행되어 청약철회를
                    하는 경우 재화 등의 반환에 필요한 비용은 '회사'가
                    부담합니다.
                  </p>
                  <p>
                    4. '회사'는 청약철회시 배송비 등 제반 비용을 누가 부담하는지
                    '구매자'가 알기 쉽도록 명확하게 표시합니다.
                  </p>
                  <h1>교환 및 반품안내</h1>
                  <p>
                    <b>신청 방법</b>
                  </p>
                  <p>
                    수령하신 날로부터 7일 이내로 유선 및 홈페이지 게시판 문의
                  </p>
                  <p>
                    <b>배송 비용</b>
                  </p>
                  <p>단순 변심은 왕복 택배비 6,000원</p>
                  <p>
                    <b>반품 주소</b>
                  </p>
                  <p>경기도 고양시 일산동구 장대길 42-13 (장항동)</p>
                  <p>
                    <b>유의사항</b>
                  </p>
                  <p>
                    - 단순 변심의 경우 수령일로부터 7일 이내까지 교환 및 반품이
                    가능합니다. (교환/반품비 고객 부담)
                  </p>
                  <p>
                    - 상품 하자, 오배송의 경우 수령일로부터 7일 이내 교환 및
                    반품이 가능합니다. (교환/반품비 무료)
                  </p>
                </S.Pop_Policy_Content>
              </S.Pop_Policy_Wrap>
              <S.Pop_Button_Wrap>
                <S.Global_Button onClick={closePopup}>확인</S.Global_Button>
              </S.Pop_Button_Wrap>
            </S.Pop_form>
          </S.Pop_Container>
        </animated.div>
      </S.Pop_overlay>
    </>
  );
};

export default PopRefund;
