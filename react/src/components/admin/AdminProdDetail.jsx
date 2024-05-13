import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "../../styles/new_styles";
import GlobProdItem from "../products/GlobProdItem";
import CustomQuill from "../global/CustomQuill";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";

const AdminProdDetail = () => {
  const { prod_sid } = useParams();
  const [prod, setProd] = useState();
  const [cate, setCate] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  const [images, setImages] = useState([]);
  const quillRef = useRef(null);

  const findChildCate = (CATE_SID) => {
    console.log(cate.filter((el) => el.CATE_PID === CATE_SID));
    return cate.filter((el) => el.CATE_PID === CATE_SID);
  };

  const handleSeleted = (index) => {
    const updated = [...selectedOption];
    updated[index] = !updated[index];
    setSelectedOption(updated);
    console.log(updated);
  };

  const handleAllSeleted = (e) => {
    const updated = [...selectedOption];
    updated.map((el, index) => {
      el = updated[index] = e.target.checked;
    });
    console.log(updated);
    setSelectedOption(updated);
  };

  const findIndexByOptionSid = (array1, optionSid) => {
    for (let i = 0; i < array1.length; i++) {
      if (array1[i].OPTION_SID === optionSid) {
        return i;
      }
    }
    return -1; // 찾지 못한 경우
  };

  const initdb = async () => {
    axios
      .post(process.env.REACT_APP_DB_HOST + "/api/admin/prods/detail", {
        prod_sid: prod_sid,
      })
      .then((res) => {
        console.log(res.data);
        setProd(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .post(process.env.REACT_APP_DB_HOST + "/api/cate")
      .then((res) => {
        setCate(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .post(process.env.REACT_APP_DB_HOST + "/api/admin/options")
      .then((res) => {
        setOptions(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .post(process.env.REACT_APP_DB_HOST + "/api/product/images", {
        prod_sid: prod_sid,
      })
      .then((res) => {
        setImages(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    const res_option_price = (
      await axios.get(process.env.REACT_APP_DB_HOST + "/api/admin/option_price")
    ).data;
    setOptions_DataRows(res_option_price);

    const res_paper = (
      await axios.get(process.env.REACT_APP_DB_HOST + "/api/admin/paper")
    ).data;
    setPaper_DataRows(res_paper);
  };

  useEffect(() => {
    initdb();
  }, []);

  useEffect(() => {
    initState();
  }, [prod]);

  useEffect(() => {
    initOption();
    // const initialSelectedOptions = Array.from(
    //   { length: options?.length },
    //   () => false
    // );
    // console.log("z", initialSelectedOptions);

    // setSelectedOption(initialSelectedOptions);

    // axios
    //   .post(process.env.REACT_APP_DB_HOST + "/api/admin/prodoptions", { prod_sid: prod_sid })
    //   .then((res) => {
    //     const initChecked = [...selectedOption];

    //     options.forEach((e) => {
    //       initChecked[findIndexByOptionSid(res.data, e.OPTION_SID)] = true;
    //       setSelectedOption(initChecked);
    //     });
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  }, [options]);

  const initOption = async () => {
    const initialSelectedOptions = Array.from(
      { length: options?.length },
      () => false
    );

    axios
      .post(process.env.REACT_APP_DB_HOST + "/api/admin/prodoptions", {
        prod_sid: prod_sid,
      })
      .then((res) => {
        const initChecked = [...initialSelectedOptions];

        options.forEach((e) => {
          initChecked[findIndexByOptionSid(res.data, e.OPTION_SID)] = true;
          setSelectedOption(initChecked);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //////////////함수들

  const [inputCate, setInputCate] = useState();
  const [inputPriority, setInputPriorty] = useState();
  const [inputProdNm, setInputProdNm] = useState();
  const [inputProdDesc, setInputProdDesc] = useState();
  const [inputProdPrice, setInputProdPrice] = useState();
  const [inputProdUnit, setInputProdUnit] = useState();
  const [inputProdStandard, setInputProdStandard] = useState();
  const [inputProdQuantity, setInputProdQuantity] = useState();
  const [inputProdDetail, setInputProdDetail] = useState("");
  const ProdDetailRefs = useRef([null]);
  const [inputProdNoti, setInputProdNoti] = useState("");
  const ProdNotiRefs = useRef([null]);
  const [prodContent, setProdContent] = useState();

  const initState = () => {
    // State초기화
    setInputCate(prod?.CATE_SID);
    setInputPriorty(prod?.PROD_PRIORITY);
    setInputProdNm(prod?.PROD_NM);
    setInputProdDesc(prod?.PROD_DESC);
    setInputProdPrice(prod?.PROD_PRICE);
    setInputProdUnit(prod?.PROD_UNIT);
    setInputProdStandard(prod?.PROD_STANDARD);
    setInputProdQuantity(prod?.PROD_QUANTITY);
    setInputProdDetail(prod?.PROD_DETAIL);
    setInputProdNoti(prod?.PROD_NOTI);
    setProdContent(prod?.PROD_CONTENT);
  };

  const handleSetCate = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_DB_HOST + "/api/admin/prod/update_cate",
        {
          prod_sid: prod?.PROD_SID,
          prod_catecode: parseInt(inputCate),
        }
      );
      alert(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetPriority = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_DB_HOST + "/api/admin/prod/update_priority",
        {
          prod_sid: prod?.PROD_SID,
          prod_priority: parseInt(inputPriority),
        }
      );
      alert(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetProdNm = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_DB_HOST + "/api/admin/prod/update_nm",
        {
          prod_sid: prod?.PROD_SID,
          prod_nm: inputProdNm,
        }
      );
      alert(res.data);
      initdb();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetThumbnail = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "admin");
      formData.append("userid", "admin");
      try {
        const result = await axios.post(
          process.env.REACT_APP_DB_HOST + "/api/upload_design",
          formData
        );
        const IMG_URL = result.data;

        const res = await axios.post(
          process.env.REACT_APP_DB_HOST + "/api/admin/prod/update_thumnail",
          {
            prod_sid: prod_sid,
            image_location: IMG_URL,
          }
        );

        alert(res.data);
        initdb();
      } catch (error) {
        console.log("실패");
      }
    });
  };

  const handleSetProdDesc = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_DB_HOST + "/api/admin/prod/update_desc",
        {
          prod_sid: prod?.PROD_SID,
          prod_desc: inputProdDesc,
        }
      );
      alert(res.data);
      initdb();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetProdDetail = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_DB_HOST + "/api/admin/prod/update_detail",
        {
          prod_sid: prod?.PROD_SID,
          prod_detail: inputProdDetail,
        }
      );
      alert(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetProdNoti = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_DB_HOST + "/api/admin/prod/update_noti",
        {
          prod_sid: prod?.PROD_SID,
          prod_noti: inputProdNoti,
        }
      );
      alert(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetPrice = async () => {
    if (!inputProdPrice || !inputProdUnit || !inputProdQuantity) {
      alert("상품 가격, 판매 단위, 구매 단위를 모두 입력해주세요.");
      return false;
    }

    try {
      const res = await axios.post(
        process.env.REACT_APP_DB_HOST + "/api/admin/prod/update_price",
        {
          prod_sid: prod?.PROD_SID,
          prod_price: inputProdPrice,
          prod_unit: inputProdUnit,
          prod_quantity: inputProdQuantity,
        }
      );
      alert(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetContent = async () => {
    console.log(prodContent);
    try {
      const res = await axios.post(
        process.env.REACT_APP_DB_HOST + "/api/admin/prod/update_content",
        {
          prod_sid: prod?.PROD_SID,
          prod_content: prodContent,
        }
      );
      alert(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  ///////////////////////

  const options_columns = [
    { field: "id", headerName: "순번", width: 150 },
    {
      field: "OPTION_NM",
      headerName: "후가공이름",
      width: 150,
      editable: true,
    },
    {
      field: "OPTION_DETAIL",
      headerName: "후가공상세",
      width: 200,
      editable: true,
    },
    {
      field: "OPTION_DEFAULT_QTY",
      headerName: "기본수량",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <>{new Intl.NumberFormat("ko-KR").format(params.value)}</>
      ),
    },
    {
      field: "OPTION_DEFAULT_AMT",
      headerName: "기본금액",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <>{new Intl.NumberFormat("ko-KR").format(params.value)}</>
      ),
    },
    {
      field: "OPTION_ADD_QTY",
      headerName: "추가수량",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <>{new Intl.NumberFormat("ko-KR").format(params.value)}</>
      ),
    },
    {
      field: "OPTION_ADD_AMT",
      headerName: "추가금액",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <>{new Intl.NumberFormat("ko-KR").format(params.value)}</>
      ),
    },
    {
      field: "OPTION_ETC",
      headerName: "비고",
      width: 200,
      editable: true,
    },
    {
      field: "OPTION_REGDATE",
      headerName: "추가일",
      // type: "number",
      width: 150,
      editable: false,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        const formattedTime = `${String(date.getHours()).padStart(
          2,
          "0"
        )}:${String(date.getMinutes()).padStart(2, "0")}:${String(
          date.getSeconds()
        ).padStart(2, "0")}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: "OPTION_MODIDATE",
      headerName: "수정일",
      // type: "number",
      width: 150,
      editable: false,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        const formattedTime = `${String(date.getHours()).padStart(
          2,
          "0"
        )}:${String(date.getMinutes()).padStart(2, "0")}:${String(
          date.getSeconds()
        ).padStart(2, "0")}`;
        return <span>{formattedDate}</span>;
      },
    },
  ];
  const [Options_dataRows, setOptions_DataRows] = useState([]);
  const [Paper_dataRows, setPaper_DataRows] = useState([]);
  const apiRef = useGridApiRef();
  const Paper_apiRef = useGridApiRef();

  const Paper_columns = [
    { field: "id", headerName: "순번", width: 150 },
    {
      field: "PAPER_CATE",
      headerName: "카테고리",
      width: 150,
      editable: true,
    },
    {
      field: "PAPER_NM",
      headerName: "판형",
      width: 150,
      editable: true,
    },
    {
      field: "PAPER_WEIGHT",
      headerName: "평량 (g)",
      width: 200,
      editable: true,
    },
    {
      field: "PAPER_QTY",
      headerName: "설정수량",
      width: 200,
      editable: true,
    },
    {
      field: "PAPER_AMT",
      headerName: "설정가격",
      width: 200,
      editable: true,
    },
    {
      field: "PAPER_PRIORITY",
      headerName: "순서",
      width: 200,
      editable: true,
    },
    {
      field: "PAPER_REGDATE",
      headerName: "추가일",
      // type: "number",
      width: 150,
      editable: false,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        const formattedTime = `${String(date.getHours()).padStart(
          2,
          "0"
        )}:${String(date.getMinutes()).padStart(2, "0")}:${String(
          date.getSeconds()
        ).padStart(2, "0")}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: "PAPER_MODIDATE",
      headerName: "수정일",
      // type: "number",
      width: 150,
      editable: false,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        const formattedTime = `${String(date.getHours()).padStart(
          2,
          "0"
        )}:${String(date.getMinutes()).padStart(2, "0")}:${String(
          date.getSeconds()
        ).padStart(2, "0")}`;
        return <span>{formattedDate}</span>;
      },
    },
  ];

  /////////////////////

  const handleSetShow = async (value) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_DB_HOST + "/api/admin/prod/prod_show",
        { prod_sid: prod_sid, prod_show: value }
      );

      alert(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <S.MainLayout>
      <S.AdminWrapper>
        <S.AdminProdDetailHeader>
          <div className="left">
            {prod?.PROD_NM} (상품코드 : {prod?.PROD_SID})
          </div>
          <div className="right">
            등록일 : {formatDate(prod?.PROD_REGDATE)} 수정일 :{" "}
            {formatDate(prod?.PROD_MODIDATE)}
          </div>
        </S.AdminProdDetailHeader>
        <S.AdminSection>
          <div className="title">진열</div>
          <div className="content">
            <table>
              <tr>
                <th>카테고리</th>
                <td>
                  <select
                    value={inputCate}
                    onChange={(e) => {
                      setInputCate(e.target.value);
                    }}
                  >
                    {cate
                      .filter((el) => el.CATE_PID === null)
                      .map((el, index) => (
                        <option value={el.CATE_SID} key={index}>
                          {el.CATE_NM}
                        </option>
                      ))}
                  </select>
                  <S.Btn margin="0.25rem" onClick={handleSetCate}>
                    설정
                  </S.Btn>
                </td>
              </tr>
              <tr>
                <th>상품 순서</th>
                <td>
                  <input
                    value={inputPriority}
                    onChange={(e) => {
                      setInputPriorty(e.target.value);
                    }}
                  />
                  <S.Btn margin="0.25rem" onClick={handleSetPriority}>
                    설정
                  </S.Btn>
                </td>
              </tr>
              <tr>
                <th>메인 화면</th>
                <td>
                  <S.Btn
                    margin="0.25rem"
                    onClick={() => {
                      handleSetShow(1);
                    }}
                  >
                    진열
                  </S.Btn>
                  <S.Btn
                    margin="0.25rem"
                    onClick={() => {
                      handleSetShow(0);
                    }}
                  >
                    해제
                  </S.Btn>
                </td>
              </tr>
            </table>
          </div>
        </S.AdminSection>
        <S.AdminSection>
          <div className="title">썸네일</div>
          <div className="content">
            <table>
              <tr>
                <th>상품명</th>
                <td>
                  <input
                    value={inputProdNm}
                    onChange={(e) => setInputProdNm(e.target.value)}
                  />
                  <S.Btn margin="0.25rem" onClick={handleSetProdNm}>
                    설정
                  </S.Btn>
                </td>
              </tr>
              <tr>
                <th>썸네일</th>
                <td>
                  <img
                    className="small"
                    src={prod?.IMAGE_LOCATION}
                    alt="썸네일"
                    style={{ cursor: "pointer" }}
                    onClick={handleSetThumbnail}
                  />
                </td>
              </tr>
              <tr>
                <th>썸네일 설명</th>
                <td>
                  <textarea
                    cols="50"
                    rows="3"
                    value={inputProdDesc}
                    onChange={(e) => {
                      setInputProdDesc(e.target.value);
                    }}
                  />
                  <br />
                  <S.Btn margin="0.25rem" onClick={handleSetProdDesc}>
                    설정
                  </S.Btn>
                </td>
              </tr>
              <tr>
                <th>미리보기</th>
                <td>
                  <S.GlobProdList>
                    <GlobProdItem item={prod} />
                  </S.GlobProdList>
                </td>
              </tr>
            </table>
          </div>
        </S.AdminSection>
        <S.AdminSection>
          <div className="title">상품</div>
          <div className="content">
            <table>
              {/* <tr>
                <th>상품가격</th>
                <td>
                  <input
                    value={inputProdPrice}
                    onChange={(e) => {
                      setInputProdPrice(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>판매 단위</th>
                <td>
                  <input
                    value={inputProdUnit}
                    onChange={(e) => {
                      setInputProdUnit(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  상품 구매 단위
                  <br />
                  (, 로 구분)
                </th>
                <td>
                  <input
                    value={inputProdQuantity}
                    onChange={(e) => {
                      setInputProdQuantity(e.target.value);
                    }}
                  />
                  <br />
                  <S.Btn margin="0.5rem 0" onClick={handleSetPrice}>
                    가격 설정
                  </S.Btn>
                </td>
              </tr>
              <tr>
                <th>상품 규격</th>
                <td>
                  <input
                    value={inputProdStandard}
                    onChange={(e) => {
                      setInputProdStandard(e.target.value);
                    }}
                  />
                </td>
              </tr> */}
              <tr>
                <th>상품 기본 설명</th>
                <td>
                  {inputProdDetail?.split("|")?.map((el, index) => (
                    <>
                      <input
                        key={index}
                        ref={(el) => (ProdDetailRefs.current[index] = el)}
                        value={inputProdDetail?.split("|")[index]}
                        onChange={(e) => {
                          const filteredRefs = ProdDetailRefs.current.filter(
                            (ref) => ref !== null
                          );
                          let updated = [];
                          let final_str = "";
                          console.log(filteredRefs);
                          filteredRefs.forEach((el, elindex) => {
                            if (index === elindex) {
                              updated.push(filteredRefs[index].value);
                            } else {
                              updated.push(filteredRefs[elindex].value);
                            }
                          });

                          console.log(updated);
                          updated.forEach((el, index) => {
                            if (index != updated.length - 1) {
                              final_str += el + "|";
                            } else {
                              final_str += el;
                            }
                          });
                          console.log(final_str);

                          setInputProdDetail(final_str);
                        }}
                      />
                      <S.Btn
                        margin="0.25rem"
                        onClick={() => {
                          let updated = inputProdDetail;
                          let first = "";
                          let last = "";
                          if (inputProdDetail?.split("|")?.length === 1) {
                            setInputProdDetail("");
                            return false;
                          }
                          if (
                            index ===
                            inputProdDetail?.split("|")?.length - 1
                          ) {
                            console.log("zz");
                            const lastindex = inputProdDetail.indexOf(
                              ProdDetailRefs.current[index].value
                            );
                            console.log(updated);
                            console.log(lastindex);
                            updated = updated.slice(0, lastindex - 1);
                          } else {
                            first = updated.slice(
                              0,
                              inputProdDetail.indexOf(
                                ProdDetailRefs.current[index].value
                              )
                            );
                            last = updated.slice(
                              inputProdDetail.indexOf(
                                ProdDetailRefs.current[index].value
                              ) +
                                ProdDetailRefs.current[index].value.length +
                                1
                            );
                            updated = first + last;
                          }

                          setInputProdDetail(updated);
                        }}
                      >
                        삭제
                      </S.Btn>
                      <br />
                    </>
                  ))}
                  <S.Btn
                    margin="0.25rem"
                    onClick={() => {
                      if (inputProdDetail === null) {
                        setInputProdDetail("");
                      } else {
                        setInputProdDetail(inputProdDetail + "|");
                      }
                    }}
                  >
                    추가
                  </S.Btn>
                  <S.Btn margin="0.25rem" onClick={handleSetProdDetail}>
                    적용
                  </S.Btn>
                </td>
              </tr>
              <tr>
                <th>상품 주의사항</th>
                <td>
                  {inputProdNoti?.split("|")?.map((el, index) => (
                    <>
                      <input
                        key={index}
                        ref={(el) => (ProdNotiRefs.current[index] = el)}
                        value={inputProdNoti?.split("|")[index]}
                        onChange={(e) => {
                          const filteredRefs = ProdNotiRefs.current.filter(
                            (ref) => ref !== null
                          );
                          let updated = [];
                          let final_str = "";
                          console.log(filteredRefs);
                          filteredRefs.forEach((el, elindex) => {
                            if (index === elindex) {
                              updated.push(filteredRefs[index].value);
                            } else {
                              updated.push(filteredRefs[elindex].value);
                            }
                          });

                          updated.forEach((el, index) => {
                            if (index != updated.length - 1) {
                              final_str += el + "|";
                            } else {
                              final_str += el;
                            }
                          });
                          console.log(final_str);

                          setInputProdNoti(final_str);
                        }}
                      />
                      <S.Btn
                        margin="0.25rem"
                        onClick={() => {
                          let updated = inputProdNoti;
                          let first = "";
                          let last = "";
                          if (inputProdNoti?.split("|")?.length === 1) {
                            setInputProdNoti("");
                            return false;
                          }
                          if (index === inputProdNoti?.split("|")?.length - 1) {
                            console.log("zz");
                            const lastindex = inputProdNoti.indexOf(
                              ProdNotiRefs.current[index].value
                            );

                            updated = updated.slice(0, lastindex - 1);
                          } else {
                            first = updated.slice(
                              0,
                              inputProdNoti.indexOf(
                                ProdNotiRefs.current[index].value
                              )
                            );
                            last = updated.slice(
                              inputProdNoti.indexOf(
                                ProdNotiRefs.current[index].value
                              ) +
                                ProdNotiRefs.current[index].value.length +
                                1
                            );
                            updated = first + last;
                          }

                          setInputProdNoti(updated);
                        }}
                      >
                        삭제
                      </S.Btn>
                      <br />
                    </>
                  ))}
                  <S.Btn
                    margin="0.25rem"
                    onClick={() => {
                      if (inputProdNoti === null) {
                        setInputProdNoti("");
                      } else {
                        setInputProdNoti(inputProdNoti + "|");
                      }
                    }}
                  >
                    추가
                  </S.Btn>
                  <S.Btn margin="0.25rem" onClick={handleSetProdNoti}>
                    적용
                  </S.Btn>
                </td>
              </tr>
            </table>
          </div>
        </S.AdminSection>
        <S.AdminSection>
          <div className="title">옵션</div>
          <div className="content">
            <table>
              <tr>
                <th>용지</th>
                <td>
                  <Button
                    variant="outlined"
                    onClick={async () => {
                      const PAPER_SIDS = [];
                      Array.from(
                        Paper_apiRef.current.getSelectedRows().values()
                      ).map((el, index) => {
                        PAPER_SIDS.push(el.PAPER_SID);
                      });

                      console.log(PAPER_SIDS);
                      const result = await axios.post(
                        process.env.REACT_APP_DB_HOST + "/api/admin/prod_paper",
                        { PAPER_SIDS: PAPER_SIDS, PROD_SID: prod_sid }
                      );

                      if (result.status === 200) {
                        alert("적용되었습니다.");
                        initdb();
                      } else {
                        alert("적용 실패");
                      }
                    }}
                  >
                    적용
                  </Button>
                  <Box sx={{ height: 500, width: "100%", display: "grid" }}>
                    <DataGrid
                      apiRef={Paper_apiRef}
                      rows={Paper_dataRows}
                      columns={Paper_columns}
                      // processRowUpdate={(updatedRow, originalRow) => {
                      //   handleClickOpen(updatedRow);
                      //   return updatedRow;
                      // }}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 10,
                          },
                        },
                      }}
                      pageSizeOptions={[5]}
                      checkboxSelection
                      disableRowSelectionOnClick
                    />
                  </Box>
                </td>
              </tr>
              <tr>
                <th>후가공</th>
                <td>
                  <Button
                    variant="outlined"
                    onClick={async () => {
                      const OPTION_SIDS = [];
                      Array.from(apiRef.current.getSelectedRows().values()).map(
                        (el, index) => {
                          OPTION_SIDS.push(el.OPTION_SID);
                        }
                      );
                      const result = await axios.post(
                        process.env.REACT_APP_DB_HOST +
                          "/api/admin/prod_option",
                        { OPTION_SIDS: OPTION_SIDS, PROD_SID: prod_sid }
                      );

                      if (result.status === 200) {
                        alert("적용되었습니다.");
                        initdb();
                      } else {
                        alert("적용 실패");
                      }
                    }}
                  >
                    적용
                  </Button>

                  <Box sx={{ height: 500, width: "100%", display: "grid" }}>
                    <DataGrid
                      apiRef={apiRef}
                      rows={Options_dataRows}
                      columns={options_columns}
                      // processRowUpdate={(updatedRow, originalRow) => {
                      //   handleClickOpen(updatedRow);
                      //   return updatedRow;
                      // }}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 10,
                          },
                        },
                      }}
                      pageSizeOptions={[5]}
                      checkboxSelection
                      disableRowSelectionOnClick
                    />
                  </Box>
                </td>
              </tr>
            </table>
          </div>
        </S.AdminSection>
        <S.AdminSection>
          <div className="title">상품 상세 </div>
          <div className="content">
            <table>
              <tr>
                <th>이미지</th>
                <td>
                  <S.AdminProdImgBox>
                    {images.map((el, index) => (
                      <div className="item">
                        <div className="btnbox">
                          <S.Btn
                            onClick={() => {
                              axios
                                .post(
                                  process.env.REACT_APP_DB_HOST +
                                    "/api/admin/prodimages/delete",
                                  {
                                    prod_sid: prod_sid,
                                    image_location: el.IMAGE_LOCATION,
                                    image_priority: el.IMAGE_PRIORITY,
                                    image_cate: "detail",
                                  }
                                )
                                .then((res) => {
                                  alert("삭제 완료");
                                  initdb();
                                })
                                .catch((e) => {
                                  console.log(e);
                                });
                            }}
                          >
                            삭제
                          </S.Btn>
                        </div>
                        <img src={el.IMAGE_LOCATION} alt="이미지" key={index} />
                      </div>
                    ))}
                    <div
                      className="item plus"
                      onClick={() => {
                        const input = document.createElement("input");
                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "image/*");
                        input.click();
                        input.addEventListener("change", async () => {
                          const file = input.files[0];
                          const formData = new FormData();
                          formData.append("file", file);
                          formData.append("type", "admin");
                          formData.append("userid", "admin");
                          try {
                            const result = await axios.post(
                              process.env.REACT_APP_DB_HOST +
                                "/api/upload_design",
                              formData
                            );
                            const IMG_URL = result.data;

                            axios
                              .post(
                                process.env.REACT_APP_DB_HOST +
                                  "/api/admin/prodimages/add",
                                {
                                  prod_sid: prod_sid,
                                  image_location: IMG_URL,
                                }
                              )
                              .then((res) => {
                                console.log(res);
                                alert("업로드 완료");
                                initdb();
                              })
                              .catch((e) => {
                                console.log(e);
                              });
                          } catch (error) {
                            console.log("실패");
                          }
                        });
                      }}
                    />
                  </S.AdminProdImgBox>
                </td>
              </tr>
              <tr>
                <th>상세설명</th>
                <td>
                  <CustomQuill
                    setContent={setProdContent}
                    initContent={prodContent}
                  />
                  <S.Btn margin="0.5rem 0" onClick={handleSetContent}>
                    저장
                  </S.Btn>
                </td>
              </tr>
            </table>
          </div>
        </S.AdminSection>
      </S.AdminWrapper>
    </S.MainLayout>
  );
};

export default AdminProdDetail;
