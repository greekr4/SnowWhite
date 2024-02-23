import React, { useState } from "react";
import * as S from "../../styles/new_styles";
import NoticeItem from "./NoticeItem";

const NoticeTable = ({ data }) => {
  return (
    <S.Glob_Table>
      <thead>
        <tr>
          {data.header.map((item, index) => (
            <th width={item.width}>{item.text}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((item, index) => (
          <NoticeItem item={item} key={index} />
        ))}
      </tbody>
    </S.Glob_Table>
  );
};

export default NoticeTable;

// {data.rows.map((item, index) => (
//     <React.Fragment>
//       <tr onClick={toggleVisible}>
//         {item.cell.map((i, index) => (
//           <td key={index}>{i.text}</td>
//         ))}
//       </tr>
//       <tr>
//         <td colSpan={data.header.length}>
//           <NoticeDetail desc={item.desc} isVisible={isVisible} />
//         </td>
//       </tr>
//     </React.Fragment>
//   ))}
