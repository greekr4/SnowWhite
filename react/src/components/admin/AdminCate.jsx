import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminCate = () => {
  const [cate, setCate] = useState([]);
  useEffect(() => {
    axios
      .post("/api/cate")
      .then((res) => {
        setCate(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const findChildCate = (CATE_SID) => {
    console.log(cate.filter((el) => el.CATE_PID === CATE_SID));
    return cate.filter((el) => el.CATE_PID === CATE_SID);
  };

  return (
    <>
      {cate
        .filter((el) => el.CATE_PID === null)
        .map((el, index) => (
          <>
            <ul>
              <li>{el.CATE_NM}</li>
              <ul>
                {findChildCate(el.CATE_SID).map((child, index) => (
                  <li key={child.CATE_SID}>
                    {"---"}
                    {child.CATE_NM}
                  </li>
                ))}
              </ul>
            </ul>
          </>
        ))}
    </>
  );
};

export default AdminCate;
