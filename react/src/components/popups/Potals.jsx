import ReactDOM from "react-dom";
import PopLogin from "./PopLogin";
import PopJoin from "./PopJoin";

const ModalPortal = ({ isOpen, openPopup, closePopup, popupIndex }) => {
  const el = document.getElementById("modal");

  console.log(popupIndex);
  if (!isOpen) return null;

  if (popupIndex === 0) {
    // 인덱스 0 : 로그인 팝업
    return ReactDOM.createPortal(
      <PopLogin openPopup={openPopup} closePopup={closePopup} />,
      el
    );
  } else if (popupIndex === 1) {
    // 인덱스 1 : 회원가입 팝업
    return ReactDOM.createPortal(
      <PopJoin openPopup={openPopup} closePopup={closePopup} />,
      el
    );
  }
};

export default ModalPortal;
