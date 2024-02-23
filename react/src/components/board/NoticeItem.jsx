import React, { useState } from "react";
import NoticeItemDetail from "./NoticeItemDetail";

const NoticeItem = ({ item }) => {
  const [isVisible, SetIsVisible] = useState(false);

  const toggleVisible = () => {
    console.log("dd");
    isVisible ? SetIsVisible(false) : SetIsVisible(true);
  };

  return (
    <React.Fragment>
      <tr onClick={toggleVisible}>
        {item.cell.map((i, index) => (
          <td key={index}>{i.text}</td>
        ))}
      </tr>
      {isVisible ? (
        <tr>
          <td colSpan={item.cell.length}>
            <NoticeItemDetail desc={item.desc} isVisible={isVisible} />
          </td>
        </tr>
      ) : null}

      {/* {isVisible ? (
        <tr>
          <td colSpan={item.cell.length}>
            <NoticeItemDetail desc={item.desc} isVisible={isVisible} />
          </td>
        </tr>
      ) : null} */}
    </React.Fragment>
  );
};

export default NoticeItem;
