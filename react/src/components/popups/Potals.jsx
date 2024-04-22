import ReactDOM from "react-dom";
import PopLogin from "./PopLogin";
import PopJoin from "./PopJoin";
import PopFindPw from "./PopFindPw";
import PopPolicySnow from "./PopPolicySnow";
import PopPolicyPriv from "./PopPolicyPriv";
import PopReviewForm from "./PopReviewForm";
import PopOrderDetail from "./PopOrderDetail";
import PopOptionForm from "./PopOptionForm";
import PopReviewDetail from "./PopReviewDetail";
import PopLogisDetail from "./PopLogisDetail";
import PopDeliveryForm from "./PopDeliveryForm";
import PopDeliveryRecentForm from "./PopDeliveryRecentForm";

/////포탈1
const ModalPortal = ({
  isOpen,
  openPopup,
  closePopup,
  popupIndex,
  openPopup2,
  closePopup2,
  popupData,
}) => {
  const el = document.getElementById("modal");
  const el2 = document.getElementById("modal2");

  if (!isOpen) return null;

  // 인덱스
  // 0 : 로그인
  // 1 : 회원가입
  // 2 : 비밀번호 찾기
  // 3 : 이용약관
  // reviewForm : 리뷰폼
  // reviewDetail : 리뷰디테일

  switch (popupIndex) {
    case 0:
      return ReactDOM.createPortal(
        <PopLogin openPopup={openPopup} closePopup={closePopup} />,
        el
      );
    case 1:
      return ReactDOM.createPortal(
        <PopJoin
          openPopup={openPopup}
          closePopup={closePopup}
          openPopup2={openPopup2}
          closePopup2={closePopup2}
        />,
        el
      );
    case 2:
      return ReactDOM.createPortal(
        <PopFindPw openPopup={openPopup} closePopup={closePopup} />,
        el
      );
    case "reviewForm":
      return ReactDOM.createPortal(
        <PopReviewForm closePopup={closePopup} popupData={popupData} />,
        el
      );
    case "orderDetail":
      return ReactDOM.createPortal(
        <PopOrderDetail closePopup={closePopup} popupData={popupData} />,
        el
      );
    case "optionForm":
      return ReactDOM.createPortal(
        <PopOptionForm closePopup={closePopup} popupData={popupData} />,
        el
      );
    case "reviewDetail":
      return ReactDOM.createPortal(
        <PopReviewDetail closePopup={closePopup} popupData={popupData} />,
        el
      );
    case "logisDetail":
      return ReactDOM.createPortal(
        <PopLogisDetail closePopup={closePopup} popupData={popupData} />,
        el
      );
    case "deliveryForm":
      return ReactDOM.createPortal(
        <PopDeliveryForm closePopup={closePopup} popupData={popupData} />,
        el
      );
    case "deliveryForm_Recent":
      return ReactDOM.createPortal(
        <PopDeliveryRecentForm closePopup={closePopup} popupData={popupData} />,
        el
      );
    default:
      return null;
  }
};

/////포탈2
const ModalPortal2 = ({ isOpen2, openPopup2, closePopup2, popupIndex2 }) => {
  const el2 = document.getElementById("modal2");

  if (!isOpen2) return null;

  // 인덱스
  // 0 : 로그인
  // 1 : 회원가입

  switch (popupIndex2) {
    case 0:
      return ReactDOM.createPortal(
        <PopPolicySnow openPopup2={openPopup2} closePopup2={closePopup2} />,
        el2
      );
    case 1:
      return ReactDOM.createPortal(
        <PopPolicyPriv openPopup2={openPopup2} closePopup2={closePopup2} />,
        el2
      );

    default:
      return null;
  }
};

export default { ModalPortal, ModalPortal2 };
