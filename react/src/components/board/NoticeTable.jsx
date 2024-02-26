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
