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
    initState();
  }, []);

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

  const initState = () => {
    // State초기화
    setInputCate(prod?.CATE_SID);
  };

  const handleSetCate = async () => {
    try {
      const res = await axios.post("/api/cart");
      console.log(res);
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
                <td>{prod?.PROD_PRIORITY}</td>
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
                <td>{prod?.PROD_NM}</td>
              </tr>
              <tr>
                <th>썸네일</th>
                <td>
                  <img
                    className="small"
                    src={prod?.IMAGE_LOCATION}
                    alt="썸네일"
                  />
                </td>
              </tr>
              <tr>
                <th>썸네일 설명</th>
                <td>{prod?.PROD_DESC}</td>
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
                <td>{prod?.PROD_PRICE}</td>
              </tr>
              <tr>
                <th>판매 단위</th>
                <td>{prod?.PROD_UNIT}</td>
              </tr>
              <tr>
                <th>상품 규격</th>
                <td>{prod?.PROD_STANDARD}</td>
              </tr>
              <tr>
                <th>
                  상품 구매 단위
                  <br />
                  (, 로 구분)
                </th>
                <td>{prod?.PROD_QUANTITY}</td>
              </tr>
              <tr>
                <th>상품 기본 설명</th>
                <td>
                  {prod?.PROD_DETAIL?.split("|")?.map((el, index) => (
                    <>
                      - {el}
                      {index !== prod.PROD_DETAIL?.split("|")?.length - 1 && (
                        <br />
                      )}
                    </>
                  ))}
                </td>
              </tr>
              <tr>
                <th>상품 주의사항</th>
                <td>
                  {prod?.PROD_NOTI?.split("|")?.map((el, index) => (
                    <>
                      - {el}
                      {index !== prod.PROD_DETAIL?.split("|")?.length - 1 && (
                        <br />
                      )}
                    </>
                  ))}
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
                  <S.Btn>적용</S.Btn>
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
