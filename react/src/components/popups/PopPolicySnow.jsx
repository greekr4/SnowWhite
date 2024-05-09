import * as S from "../../styles/new_styles";
import { useSpring, animated } from "react-spring";

const PopPolicySnow = ({ openPopup, closePopup2 }) => {
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
            <S.Pop_Close_btn onClick={closePopup2}>
              <S.Pop_Close_span>×</S.Pop_Close_span>
            </S.Pop_Close_btn>
            <S.Pop_form>
              <S.Pop_Title>스노우플래닛 이용 약관</S.Pop_Title>

              <S.Pop_Policy_Wrap>
                <S.Pop_Policy_Content>
                  <h1>제1조(목적)</h1>
                  <p>
                    1. 본 약관은 스노우화이트가 운영하는 온라인 쇼핑몰
                    'https://snowplanet.co.kr/'에서 제공하는 서비스(이하
                    '서비스'라 합니다)를 이용함에 있어 당사자의 권리 의무 및
                    책임사항을 규정하는 것을 목적으로 합니다.
                  </p>
                  <p>
                    2. PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그
                    성질에 반하지 않는 한 본 약관을 준용합니다.
                  </p>
                  <h1>제2조(정의)</h1>
                  <p>
                    1. '회사'라 함은, '스노우화이트'가 재화 또는 용역을
                    이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여
                    재화등을 거래할 수 있도록 설정한 가상의 영업장을 운영하는
                    사업자를 말하며, 아울러 'https://snowplanet.co.kr/'을 통해
                    제공되는 전자상거래 관련 서비스의 의미로도 사용합니다.
                  </p>

                  <p>
                    2. '이용자'라 함은, '사이트'에 접속하여 본 약관에 따라
                    '회사'가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
                  </p>
                  <p>
                    3. '회원'이라 함은, '회사'에 개인정보를 제공하고 회원으로
                    등록한 자로서, '회사'의 서비스를 계속하여 이용할 수 있는
                    자를 말합니다.
                  </p>
                  <p>
                    4. '비회원'이라 함은, 회원으로 등록하지 않고, '회사'가
                    제공하는 서비스를 이용하는 자를 말합니다.
                  </p>
                  <p>
                    5. '상품'이라 함은 '사이트'를 통하여 제공되는 재화 또는
                    용역을 말합니다.
                  </p>
                  <p>
                    6. '구매자'라 함은 '회사'가 제공하는 '상품'에 대한
                    구매서비스의 이용을 청약한 '회원' 및 '비회원'을 말합니다.
                  </p>

                  <h1>제3조(약관 외 준칙)</h1>
                  <p>
                    본 약관에서 정하지 아니한 사항은 법령 또는 회사가 정한
                    서비스의 개별 약관, 운영정책 및 규칙(이하 '세부지침'이라
                    합니다)의 규정에 따릅니다. 또한 본 약관과 세부지침이 충돌할
                    경우에는 세부지침이 우선합니다.
                  </p>
                  <h1>제4조(약관의 명시 및 개정)</h1>
                  <p>
                    1. '회사'는 이 약관의 내용과 상호 및 대표자 성명, 영업소
                    소재지, 전화번호, 모사전송번호(FAX), 전자우편주소,
                    사업자등록번호, 통신판매업신고번호 등을 이용자가 쉽게 알 수
                    있도록 '회사' 홈페이지의 초기 서비스화면에 게시합니다. 다만
                    본 약관의 내용은 '이용자'가 연결화면을 통하여 확인할 수
                    있도록 할 수 있습니다.
                  </p>
                  <p>
                    2. '회사'는 '이용자'가 약관에 동의하기에 앞서 약관에 정해진
                    내용 중 청약철회, 배송책임, 환불조건 등과 같은 내용을
                    '이용자'가 이해할 수 있도록 별도의 연결화면 또는 팝업화면
                    등을 통하여 '이용자'의 확인을 구합니다.
                  </p>
                  <p>
                    3. '회사'는 '전자상거래 등에서의 소비자보호에 관한 법률',
                    '약관의 규제에 관한 법률','전자거래기본법', '정보통신망
                    이용촉진등에 관한 법률', '소비자보호법' 등 관련법령(이하
                    '관계법령'이라 합니다)에 위배되지 않는 범위내에서 본 약관을
                    개정할 수 있습니다.
                  </p>
                  <p>
                    4. '회사'가 본 약관을 개정하고자 할 경우, 적용일자 및
                    개정사유를 명시하여 현행약관과 함께 온라인 쇼핑몰의
                    초기화면에 그 적용일자 7일전부터 적용일자 전날까지
                    공지합니다. 다만, '이용자'에게 불리한 내용으로 약관을
                    변경하는 경우 최소 30일 이상 유예기간을 두고 공지합니다.
                  </p>
                  <p>
                    5. '회사'가 본 약관을 개정한 경우, 개정약관은 적용일자 이후
                    체결되는 계약에만 적용되며 적용일자 이전 체결된 계약에
                    대해서는 개정 전 약관이 적용됩니다. 다만, 이미 계약을 체결한
                    '이용자'가 개정약관의 내용을 적용받고자 하는 뜻을 '회사'에
                    전달하고 '회사'가 여기에 동의한 경우 개정약관을 적용합니다.
                  </p>
                  <p>
                    6. 본 약관에서 정하지 아니한 사항 및 본 약관의 해석에
                    관하여는 관계법령 및 건전한 상관례에 따릅니다.
                  </p>
                  <h1>제5조(제공하는 서비스)</h1>
                  <p>'회사'는 다음의 서비스를 제공합니다.</p>
                  <p>1. 재화 또는 용역에 대한 정보 제공 및 구매계약 체결</p>
                  <p>2. 구매계약이 체결된 재화 또는 용역의 배송</p>
                  <p>
                    3. 결제대금 보호서비스, 이용자 문의서비스, 상품 구매평 등
                    기타 정보 제공
                  </p>
                  <p>4. 직접 또는 제휴사와 공동으로 제공하는 이벤트 등</p>
                  <p>5. 기타 '회사'가 정하는 업무</p>
                  <h1>제6조(서비스의 중단 등)</h1>
                  <p>
                    1. '회사'가 제공하는 서비스는 연중무휴, 1일 24시간 제공을
                    원칙으로 합니다. 다만 '회사' 시스템의 유지 · 보수를 위한
                    점검, 통신장비의 교체 등 특별한 사유가 있는 경우 서비스의
                    전부 또는 일부에 대하여 일시적인 제공 중단이 발생할 수
                    있습니다.
                  </p>
                  <p>
                    2. '회사'는 전시, 사변, 천재지변 또는 이에 준하는
                    국가비상사태가 발생하거나 발생할 우려가 있는 경우,
                    전기통신사업법에 의한 기간통신사업자가 전기통신서비스를
                    중지하는 등 부득이한 사유가 발생한 경우 서비스의 전부 또는
                    일부를 제한하거나 중지할 수 있습니다.
                  </p>
                  <p>
                    3. '쇼핑몰'은 재화 또는 용역이 품절되거나 상세 내용이
                    변경되는 경우 장차 체결되는 계약에 따라 제공할 재화나 용역의
                    내용을 변경할 수 있습니다. 이 경우 변경된 재화 또는 용역의
                    내용 및 제공일자를 명시하여 즉시 공지합니다.
                  </p>
                  <p>
                    4. '회사'가 서비스를 정지하거나 이용을 제한하는 경우 그 사유
                    및 기간, 복구 예정 일시 등을 지체 없이 '이용자'에게
                    알립니다.
                  </p>
                  <h1>제7조(회원가입)</h1>
                  <p>
                    1. '회사'가 정한 양식에 따라 '이용자'가 회원정보를 기입한 후
                    본 약관에 동의한다는 의사표시를 함으로써 회원가입을
                    신청합니다.
                  </p>
                  <p>
                    2. '회사'는 전항에 따라 회원가입을 신청한 '이용자' 중 다음
                    각호의 사유가 없는 한 '회원'으로 등록합니다.
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    가. 가입신청자가 본 약관에 따라 회원자격을 상실한 적이 있는
                    경우. 다만, '회사'의 재가입 승낙을 얻은 경우에는 예외로
                    합니다.
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    나. 회원정보에 허위, 기재누락, 오기 등 불완전한 부분이 있는
                    경우
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    다. 기타 회원으로 등록하는 것이 '회사'의 운영에 현저한
                    지장을 초래하는 것으로 인정되는 경우
                  </p>
                  <p>
                    3. 회원가입 시기는 '회사'의 가입승낙 안내가 '회원'에게
                    도달한 시점으로 합니다.
                  </p>
                  <h1>제8조(회원탈퇴 및 자격상실 등)</h1>
                  <p>
                    1. '회원'은 '회사'에 언제든지 탈퇴를 요청할 수 있으며,
                    '회사'는 지체없이 회원탈퇴 요청을 처리합니다. 다만 이미
                    체결된 거래계약을 이행할 필요가 있는 경우에는 본약관이 계속
                    적용됩니다.
                  </p>
                  <p>
                    2. '쇼핑몰'은 다음 각호의 사유가 발생한 경우 '회사'의 자격을
                    제한 또는 정지시킬 수 있습니다.
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    가. 회원가입 시 허위정보를 기재한 경우
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    나. 다른 이용자의 정상적인 이용을 방해하는 경우
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    다. 관계법령 또는 본 약관에서 금지하는 행위를 한 경우
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    라. 공서양속에 어긋나는 행위를 한 경우
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    마. 기타 '회원'으로 등록하는 것이 적절하지 않은 것으로
                    판단되는 경우
                  </p>
                  <p>
                    3. '회사'의 서비스를 1년 동안 이용하지 않는 '회원'의 경우
                    휴면계정으로 전환하고 서비스 이용을 제한할 수 있습니다.
                  </p>
                  <p>
                    4. 휴면계정 전환 시 계정 활성을 위해 필요한 아이디(ID),
                    비밀번호, 이름, 중복가입 방지를 위한 본인 인증값(DI),
                    휴대전화 번호를 제외한 나머지 정보는 별도로 저장 및
                    관리됩니다. 다만, 관계법령에 의해 보존할 필요가 있는 경우
                    '회사'는 정해진 기간 동안 회원정보를 보관합니다.
                  </p>

                  <h1>제9조(회원에 대한 통지)</h1>
                  <p>
                    1. '회사'는 '회원' 회원가입 시 기재한 전자우편,
                    이동전화번호, 주소 등을 이용하여 '회원'에게 통지 할 수
                    있습니다.
                  </p>
                  <p>
                    2. '회사'가 불특정 다수 '회원'에게 통지하고자 하는 경우
                    1주일 이상 '사이트'의 게시판에 게시함으로써 개별 통지에
                    갈음할 수 있습니다. 다만 '회원'이 서비스를 이용함에 있어
                    중요한 사항에 대하여는 개별 통지합니다.
                  </p>
                  <h1>제10조(구매신청)</h1>
                  <p>
                    '이용자'는 온라인 쇼핑몰 상에서 다음 방법 또는 이와 유사한
                    방법에 따라 구매를 신청할 수 있으며, '회사'는 '이용자'를
                    위하여 다음 각호의 내용을 알기 쉽게 제공하여야 합니다.
                  </p>
                  <p>1. 재화 또는 용역의 검색 및 선택</p>
                  <p>2. 성명, 주소, 연락처, 전자우편주소 등 구매자 정보 입력</p>
                  <p>
                    3. 약관내용, 청약철회가 제한되는 서비스, 배송료 등
                    비용부담과 관련된 내용에 대한 확인 및 동의 표시
                  </p>
                  <p>4. 재화 또는 용역 등에 대한 구매신청 및 확인 </p>
                  <p>5. 결제방법 선택 및 결제 </p>
                  <p>6. '회사'의 최종 확인</p>
                  <h1>제11조(계약의 성립)</h1>
                  <p>
                    1. '회사'는 다음 각호의 사유가 있는 경우 본 약관의
                    '구매신청' 조항에 따른 구매신청을 승낙하지 않을 수 있습니다.
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    가. 신청 내용에 허위, 누락, 오기가 있는 경우
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    나. 회원자격이 제한 또는 정지된 고객이 구매를 신청한 경우
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    다. 재판매, 기타 부정한 방법이나 목적으로 구매를
                    신청하였음이 인정되는 경우
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    라. 기타 구매신청을 승낙하는 것이 '회사'의 기술상 현저한
                    지장을 초래하는 것으로 인정되는 경우
                  </p>
                  <p>
                    2. '회사'의 승낙이 본 약관의 '수신확인통지' 형태로
                    이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다.
                  </p>
                  <p>
                    3. '회사'가 승낙의 의사표시를 하는 경우 이용자의 구매신청에
                    대한 확인 및 판매가능여부, 구매신청의 정정 및 취소 등에 관한
                    정보가 포함되어야 합니다.
                  </p>
                  <h1>제12조(결제방법 및 일반회원의 이용 수수료)</h1>
                  <p>
                    1. '회사'의 '사이트'에서 구매한 상품에 대한 대금은 다음
                    각호의 방법으로 결제할 수 있습니다.
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    가. 폰뱅킹, 인터넷뱅킹 등 각종 계좌이체
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    나. 선불카드, 직불카드, 신용카드 등 각종 카드결제
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    다. '회사'가 지급한 결제 가능한 적립금에 의한 결제
                  </p>
                  <p>
                    2. '회사'는 '구매자'가 결제수단에 대한 정당한 사용권한을
                    가지고 있는지 여부를 확인할 수 있으며, 이에 대한 확인이
                    완료될 때까지 거래 진행을 중지하거나, 확인이 불가능한 거래를
                    취소할 수 있습니다.
                  </p>
                  <p>
                    3. '회사'의 정책 및 결제업체(이동통신사, 카드회사 등) 또는
                    결제대행업체(PG)의 기준에 따라 이용자 당 월 누적 결제액 및
                    충전한도정당한 사용권한을 가지고 있는지 여부를 확인할 수
                    있으며, 이에 대한 확인이 완료될 때까지 거래 진행을
                    중지하거나, 확인이 불가능한 거래를 취소할 수 있습니다.
                  </p>
                  <p>
                    4. '회사'의 정책 및 결제업체(이동통신사, 카드회사 등) 또는
                    결제대행업체(PG)의 기준에 따라 '구매자' 당 월 누적 결제액 및
                    충전한도가 제한될 수 있습니다.
                  </p>
                  <p>
                    5. 대금의 지급 또는 결제를 위하여 입력한 정보에 대한 책임은
                    '구매자'가 전적으로 부담합니다.
                  </p>
                  <p>
                    6. 일반회원은 회사의 서비스 이용대가로 수수료, 회원료 등 각
                    상품의 구매시 또는 별도로 회사가 정한 회사가 정한 요율이나
                    기준에 따라 서비스 이용료를 지급해야 합니다.
                  </p>
                  <h1>제13조(수신확인통지, 구매신청 변경 및 취소)</h1>
                  <p>
                    1. '회사'는 '구매자'가 구매신청을 한 경우 '구매자'에게
                    수신확인통지를 합니다.
                  </p>
                  <p>
                    2. 수신확인통지를 받은 '구매자'는 의사표시의 불일치가 있는
                    경우 수신확인통지를 받은 후 즉시 구매신청 내용의 변경 또는
                    취소를 요청할 수 있고, '회사'는 배송 준비 전 '구매자'의
                    요청이 있는 경우 지체없이 그 요청에 따라 변경 또는 취소처리
                    하여야 합니다. 다만 이미 대금을 지불한 경우 본 약관의
                    '청약철회 등'에서 정한 바에 따릅니다.
                  </p>
                  <h1>제14조(재화 등의 공급)</h1>
                  <p>
                    1. '회사'는 별도의 약정이 없는 이상, '구매자'가 청약을 한
                    날부터 7일 이내에 재화 등을 배송할 수 있도록 주문제작, 포장
                    등 기타 필요한 조치를 취합니다. 다만 '회사'가 이미 대금의
                    전부 또는 일부를 받은 경우에는 대금을 받은 날부터 3 영업일
                    이내에 필요한 조치를 취합니다.
                  </p>
                  <p>
                    2. 전항의 경우 '회사'는 '구매자'가 상품 등의 공급 절차 및
                    진행 상황을 확인할 수 있도록 적절한 조치를 취해야합니다.
                  </p>
                  <h1>제15조(환급)</h1>
                  <p>
                    '회사'는 '구매자'가 신청한 '상품'이 품절, 생산중단 등의
                    사유로 인도 또는 제공할 수 없게된 경우 지체없이 그 사유를
                    '구매자'에게 통지합니다. 이 때 '구매자'가 재화 등의 대금을
                    지불한 경우 대금을 받은 날 부터 3 영업일 이내에 환급하거나
                    이에 필요한 조치를 취합니다.
                  </p>
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
                  <h1>제18조(개인정보보호)</h1>
                  <p>
                    1. '회사'는 '구매자'의 정보수집시 다음의 필수사항 등
                    구매계약 이행에 필요한 최소한의 정보만을 수집합니다.
                  </p>
                  <p style={{ paddingLeft: "1em" }}>가. 성명</p>
                  <p style={{ paddingLeft: "1em" }}>
                    나. 주민등록번호 또는 외국인등록번호
                  </p>
                  <p style={{ paddingLeft: "1em" }}>다. 주소</p>
                  <p style={{ paddingLeft: "1em" }}>
                    라. 전화번호(또는 이동전화번호)
                  </p>
                  <p style={{ paddingLeft: "1em" }}>마. 아이디(ID)</p>
                  <p style={{ paddingLeft: "1em" }}>바. 비밀번호</p>
                  <p style={{ paddingLeft: "1em" }}>사. 전자우편(e-mail)주소</p>
                  <p>
                    2. 회사'가 개인정보보호법 상의 고유식별정보 및 민감정보를
                    수집하는 때에는 반드시 대상자의 동의를 받습니다.
                  </p>
                  <p>
                    3. '회사'는 제공된 개인정보를 '구매자'의 동의 없이 목적외
                    이용, 또는 제3자 제공할 수 없으며 이에 대한 모든 책임은
                    '회사'가 부담합니다. 다만 다음의 경우에는 예외로 합니다.
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    가. 배송업무상 배송업체에게 배송에 필요한 최소한의
                    정보(성명, 주소, 전화번호)를 제공하는 경우
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    나. 통계작성, 학술연구 또는 시장조사를 위하여 필요한
                    경우로서 특정 개인을 식별할 수 없는 형태로 제공하는 경우
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    다. 재화 등의 거래에 따른 대금정산을 위하여 필요한 경우
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    라. 도용방지를 위하여 본인 확인이 필요한 경우
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    마. 관계법령의 규정에 따른 경우
                  </p>
                  <p>
                    4. 본 약관에 기재된 사항 이외의 개인정보보호에 관항 사항은
                    '회사'의 '개인정보처리방침'에 따릅니다.
                  </p>
                  <h1>제19조('회사'의 의무)</h1>
                  <p>
                    1. '회사'는 관계법령, 본 약관이 금지하거나 공서양속에 반하는
                    행위를 하지 않으며 약관이 정하는 바에 따라 지속적 ·
                    안정적으로 재화 및 용역을 제공하는데 최선을 다하여야 합니다.
                  </p>
                  <p>
                    2. '회사'는 '이용자'가 안전하게 인터넷 서비스를 이용할 수
                    있도록 개인정보(신용정보 포함)보호를 위한 보안 시스템을
                    갖추어야 합니다.
                  </p>
                  <p>
                    3. '회사'가 상품에 대하여 '표시 · 광고의 공정화에 관한 법률'
                    제3조 소정의 부당한 표시 · 광고행위를 하여 '이용자'가 손해를
                    입은 때에는 이를 배상할 책임을 집니다.
                  </p>
                  <p>
                    4. '회사'는 '이용자'의 수신동의 없이 영리목적으로 광고성
                    전자우편, 휴대전화 메시지, 전화, 우편 등을 발송하지
                    않습니다.
                  </p>
                  <h1>제20조(이용자 및 회원의 의무)</h1>
                  <p>
                    1. '이용자'는 회원가입 신청 시 사실에 근거하여 신청서를
                    작성해야 합니다. 허위, 또는 타인의 정보를 등록한 경우
                    '회사'에 대하여 일체의 권리를 주장할 수 없으며, '회사'는
                    이로 인하여 발생한 손해에 대하여 책임을 부담하지 않습니다.
                  </p>
                  <p>
                    2. '이용자'는 본 약관에서 규정하는 사항과 기타 '회사'가 정한
                    제반 규정 및 공지사항을 준수하여야 합니다. 또한 '이용자'는
                    '회사'의 업무를 방해하는 행위 및 '회사'의 명예를 훼손하는
                    행위를 하여서는 안 됩니다.
                  </p>
                  <p>
                    3. '이용자'는 주소, 연락처, 전자우편 주소 등 회원정보가
                    변경된 경우 즉시 이를 수정해야 합니다. 변경된 정보를
                    수정하지 않거나 수정을 게을리하여 발생하는 책임은 '이용자'가
                    부담합니다.
                  </p>
                  <p>4. '이용자'는 다음의 행위를 하여서는 안됩니다.</p>
                  <p style={{ paddingLeft: "1em" }}>
                    가. '회사'에 게시된 정보의 변경
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    나. '회사'가 정한 정보 외의 다른 정보의 송신 또는 게시
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    다. '회사' 및 제3자의 저작권 등 지식재산권에 대한 침해
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    라. '회사' 및 제3자의 명예를 훼손하거나 업무를 방해하는 행위
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    마. 외설 또는 폭력적인 메시지, 화상, 음성 기타 관계법령 및
                    공서양속에 반하는 정보를 '회사'의 '사이트'에 공개 또는
                    게시하는 행위
                  </p>
                  <p>
                    5. '회원'은 부여된 아이디(ID)와 비밀번호를 직접 관리해야
                    합니다.
                  </p>
                  <p>
                    6. '회원'이 자신의 아이디(ID) 및 비밀번호를 도난당하거나
                    제3자가 사용하고 있음을 인지한 경우에는 바로 '회사'에
                    통보하고 안내에 따라야 합니다.
                  </p>
                  <h1>제21조(저작권의 귀속 및 이용)</h1>
                  <p>
                    1. '쇼핑몰'이 제공하는 서비스 및 이와 관련된 모든
                    지식재산권은 '회사'에 귀속됩니다
                  </p>
                  <p>
                    2. '이용자'는 '쇼핑몰'에게 지식재산권이 있는 정보를 사전
                    승낙없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여
                    영리목적으로 이용하거나, 제3자가 이용하게 하여서는 안됩니다.
                  </p>
                  <p>
                    3. '이용자'가 서비스 내에 게시한 게시물, 이용후기 등
                    콘텐츠(이하 '콘텐츠')의 저작권은 해당 '콘텐츠'의 저작자에게
                    귀속됩니다.
                  </p>
                  <p>
                    4. 전항의 규정에도 불구하고 '회사'는 서비스의 운영, 전시,
                    전송, 배포, 홍보 등의 목적으로 별도의 허락 없이 무상으로
                    저작권법 및 공정한 거래관행에 합치되는 범위 내에서 다음
                    각호와 같이 '이용자'가 등록한 저작물을 이용할 수 있습니다.
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    가. '회사'가 제공하는 서비스 내에서 '이용자'가 작성한
                    '콘텐츠'의 복제, 수정, 전시, 전송, 배포 등 저작권을 침해하지
                    않는 범위 내의 2차적 저작물 또는 편집 저작물 작성을 위한
                    사용. 다만 '이용자'가 해당 '콘텐츠'의 삭제 또는 사용중지를
                    요청하는 경우 관련법에 따라 보존해야하는 사항을 제외하고
                    관련 '콘텐츠'를 모두 삭제 또는 사용중지합니다.
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    나. 서비스의 운영, 홍보, 서비스 개선 및 새로운 서비스 개발을
                    위한 범위내의 사용
                  </p>
                  <p style={{ paddingLeft: "1em" }}>
                    다. 미디어, 통신사 등을 통한 홍보목적으로 '콘텐츠'를 제공,
                    전시하도록 하는 등의 사용
                  </p>
                  <h1>제22조(분쟁의 해결)</h1>
                  <p>
                    1. '회사'는 '이용자'가 제기하는 불만사항 및 의견을 지체없이
                    처리하기 위하여 노력합니다. 다만 신속한 처리가 곤란한 경우
                    '이용자'에게 그 사유와 처리일정을 즉시 통보해 드립니다.
                  </p>
                  <p>
                    2. '회사'와 '이용자'간 전자상거래에 관한 분쟁이 발생한 경우,
                    '이용자'는 한국소비자원, 전자문서 · 전자거래분쟁조정위원회
                    등 분쟁조정기관에 조정을 신청할 수 있습니다.
                  </p>
                  <p>
                    3. '회사'와 '이용자'간 발생한 분쟁에 관한 소송은
                    민사소송법에 따른 관할법원에 제기하며, 준거법은 대한민국의
                    법령을 적용합니다.
                  </p>
                  <br />
                  <h1>부칙</h1>
                  <h1>제1조(시행일)</h1>
                  <p>본 약관은 2024.05.01.부터 적용합니다. </p>
                </S.Pop_Policy_Content>
              </S.Pop_Policy_Wrap>
              <S.Pop_Button_Wrap>
                <S.Global_Button onClick={closePopup2}>확인</S.Global_Button>
              </S.Pop_Button_Wrap>
            </S.Pop_form>
          </S.Pop_Container>
        </animated.div>
      </S.Pop_overlay>
    </>
  );
};

export default PopPolicySnow;
