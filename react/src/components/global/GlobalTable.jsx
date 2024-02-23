import React from "react";
import * as S from "../../styles/new_styles";

const GlobalTable = ({ data }) => {
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
          <tr>
            {item.cell.map((i, index) => (
              <td>{i.text}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </S.Glob_Table>
  );
};

export default GlobalTable;
