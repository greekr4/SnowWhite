import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import * as S from "../../styles/new_styles";
import GlobProdItem from "../products/GlobProdItem";
import CustomQuill from "../global/CustomQuill";

const AdminProdDetail = () => {
  const { prod_sid } = useParams();
  const [prod, setProd] = useState();
  const [cate, setCate] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [content, setContent] = useState();
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

  const initdb = () => {
    axios
      .post("/api/admin/prods/detail", {
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
      .post("/api/cate")
      .then((res) => {
        setCate(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .post("/api/admin/options")
      .then((res) => {
        setOptions(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .post("/api/product/images", { prod_sid: prod_sid })
      .then((res) => {
        setImages(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    initdb();
  }, []);

  useEffect(() => {
    initState();
  }, [prod]);

  useEffect(() => {
    const initialSelectedOptions = Array.from(
      { length: options?.length },
      () => false
    );

    setSelectedOption(initialSelectedOptions);

    axios
      .post("/api/admin/prodoptions", { prod_sid: prod_sid })
      .then((res) => {
        const initChecked = [...selectedOption];

        options.forEach((e) => {
          initChecked[findIndexByOptionSid(res.data, e.OPTION_SID)] = true;
          setSelectedOption(initChecked);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [options]);

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
  };

  const handleSetCate = async () => {
    try {
      const res = await axios.post("/api/admin/prod/update_cate", {
        prod_sid: prod?.PROD_SID,
        prod_catecode: parseInt(inputCate),
      });
      alert(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetPriority = async () => {
    try {
      const res = await axios.post("/api/admin/prod/update_priority", {
        prod_sid: prod?.PROD_SID,
        prod_priority: parseInt(inputPriority),
      });
      alert(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetProdNm = async () => {
    try {
      const res = await axios.post("/api/admin/prod/update_nm", {
        prod_sid: prod?.PROD_SID,
        prod_nm: inputProdNm,
      });
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
      formData.append("img", file);
      try {
        const result = await axios.post("/api/upload", formData);
        const IMG_URL = result.data;

        const res = await axios.post("/api/admin/prod/update_thumnail", {
          prod_sid: prod_sid,
          image_location: IMG_URL,
        });

        alert(res.data);
        initdb();
      } catch (error) {
        console.log("실패");
      }
    });
  };

  const handleSetProdDesc = async () => {
    try {
      const res = await axios.post("/api/admin/prod/update_desc", {
        prod_sid: prod?.PROD_SID,
        prod_desc: inputProdDesc,
      });
      alert(res.data);
      initdb();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetProdDetail = async () => {
    try {
      const res = await axios.post("/api/admin/prod/update_detail", {
        prod_sid: prod?.PROD_SID,
        prod_detail: inputProdDetail,
      });
      alert(res.data);
      initdb();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetProdNoti = async () => {
    try {
      const res = await axios.post("/api/admin/prod/update_noti", {
        prod_sid: prod?.PROD_SID,
        prod_noti: inputProdNoti,
      });
      alert(res.data);
      initdb();
    } catch (e) {
      console.log(e);
    }
  };

  ///////////////////////

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
                  <S.Btn margin="0.25rem">진열</S.Btn>
                  <S.Btn margin="0.25rem">해제</S.Btn>
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
                <th>
                  썸네일 설명
                  <br />
                  (줄 수를 통일하는게 좋습니다.)
                </th>
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
              <tr>
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
                <th>상품 규격</th>
                <td>
                  <input
                    value={inputProdStandard}
                    onChange={(e) => {
                      setInputProdStandard(e.target.value);
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
                </td>
              </tr>
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
                <th>옵션</th>
                <td>
                  <S.Btn
                    onClick={() => {
                      console.log(selectedOption);

                      let options_ary = [];
                      selectedOption.forEach((el, index) => {
                        if (el) {
                          console.log(options[index]);
                          options_ary.push(options[index].OPTION_SID);
                        }
                      });
                      console.log(options_ary);
                    }}
                  >
                    적용
                  </S.Btn>
                  <table
                    style={{
                      textAlign: "center",
                      fontSize: "0.8rem",
                      width: "80%",
                      margin: "0.5rem 0",
                      padding: "0",
                    }}
                  >
                    <tr>
                      <th style={{ width: "2%" }}>
                        <input type="checkbox" onChange={handleAllSeleted} />
                      </th>
                      <th>옵션 카테고리</th>
                      <th>옵션 이름</th>
                      <th>옵션 설명</th>
                      <th>
                        옵션 가격
                        <br />
                        (판매 단위 x 옵션 가격)
                      </th>
                    </tr>
                    {options.map((el, index) => (
                      <tr>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedOption[index]}
                            onChange={() => handleSeleted(index)}
                          />
                        </td>
                        <td>{el.OPTION_CATE}</td>
                        <td>{el.OPTION_NM}</td>
                        <td>{el.OPTION_DETAIL}</td>
                        <td>{el.OPTION_PRICE.toLocaleString("ko-KR")}</td>
                      </tr>
                    ))}
                  </table>
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
                                .post("/api/admin/prodimages/delete", {
                                  prod_sid: prod_sid,
                                  image_location: el.IMAGE_LOCATION,
                                  image_priority: el.IMAGE_PRIORITY,
                                  image_cate: "detail",
                                })
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
                          formData.append("img", file);
                          try {
                            const result = await axios.post(
                              "/api/upload",
                              formData
                            );
                            const IMG_URL = result.data;

                            axios
                              .post("/api/admin/prodimages/add", {
                                prod_sid: prod_sid,
                                image_location: IMG_URL,
                              })
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
                  <CustomQuill setContent={setContent} />
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
