import React, { useEffect, useState } from "react";
import * as S from "../styles/new_styles";
import { QueryClient, useQuery } from "react-query";
import axios from "axios";
import { Cookies } from "react-cookie";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useSpring } from "react-spring";

const MyPage = ({ queryClient }) => {
  const { data } = useQuery("userinfo", { enabled: false });
  const cookies = new Cookies();
  const USER_ADDRESS = data?.DELI_ADDRESS
    ? `${data?.DELI_ADDRESS} (${data?.DELI_POSTCODE}) ${data?.DELI_ADD_ADDRESS}`
    : "기본 배송지를 설정해주세요.";
  const USER_POINT = Math.round(data?.USER_POINT).toLocaleString("en-US") || 0;
  const USER_ID = data?.USER_ID;
  const USER_NM = data?.USER_NM || "이름";
  const USER_TEL0 = data?.USER_TEL0 || "";
  const USER_TEL1 = data?.USER_TEL1 || "";

  const [delis, setDelis] = useState([]);

  const [allSelected, setAllSelected] = useState(false);
  const [seletedDelis, setSeletedDelis] = useState([]);

  // 배송지 추가/수정 state

  const [popupVisible, setPopupVisible] = useState(false);
  const [addressVisible, setAddressVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [inputDelicode, setInputDelicode] = useState();
  const [inputAddress, setInputAddress] = useState("");
  const [inputAddAddress, setInputAddAddress] = useState("");
  const [inputPostcode, setInputPostcode] = useState("");
  const [inputNm, setInputNm] = useState();
  const [inputRec, setInputRec] = useState();
  const [inputTel, setInputTel] = useState();

  // 회원정보수정 state

  const [userEditVisible, setUserEditVisible] = useState(false);
  const [inputUserId, setInputUserId] = useState();
  const [inputAuthPw, setInputAuthPw] = useState();
  const [inputUserPw, setInputUserPw] = useState();
  const [inputUserPwck, setInputUserPwck] = useState();
  const [inputUserNm, setInputUserNm] = useState();
  const [inputUserTel0_0, setInputUserTel0_0] = useState();
  const [inputUserTel0_1, setInputUserTel0_1] = useState();
  const [inputUserTel0_2, setInputUserTel0_2] = useState();
  const [inputUserTel1_0, setInputUserTel1_0] = useState();
  const [inputUserTel1_1, setInputUserTel1_1] = useState();
  const [inputUserTel1_2, setInputUserTel1_2] = useState();

  const SlideDown = useSpring({
    height: userEditVisible ? "300px" : "0px",
  });

  const resetInput = () => {
    setInputAddress("");
    setInputAddAddress("");
    setInputPostcode("");
    setInputNm("");
    setInputRec("");
    setInputTel("");
  };

  const handleEditUser = () => {
    if (inputUserPw != inputUserPwck) {
      alert("비밀번호가 다릅니다.");
      return false;
    }
    const usertel0 = `${inputUserTel0_0}-${inputUserTel0_1}-${inputUserTel0_2}`;
    const usertel1 = `${inputUserTel1_0}-${inputUserTel1_1}-${inputUserTel1_2}`;

    axios
      .post("/api/mypage/edituser", {
        userid: USER_ID,
        userpw: inputUserPw,
        usertel0: usertel0,
        usertel1: usertel1,
      })
      .then((res) => {
        console.log(res);
        alert("성공");
        setUserEditVisible(false);
      })
      .catch((error) => {
        console.log(error);
        alert("실패");
      });
  };

  const handleAddDeli = () => {
    if (!inputAddress || !inputPostcode || !inputNm || !inputRec || !inputTel) {
      alert("정확히 입력 해주세요!");
      return false;
    }

    axios
      .post("/api/delivery/add", {
        userid: USER_ID,
        delinm: inputNm,
        delirec: inputRec,
        deliaddress: inputAddress,
        deliaddaddress: inputAddAddress,
        delipostcode: inputPostcode,
        delitel: inputTel,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("등록 완료");
          getDelis();
          setPopupVisible(false);
          setAddressVisible(false);
          resetInput();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditDeli = () => {
    if (!inputAddress || !inputPostcode || !inputNm || !inputRec || !inputTel) {
      alert("정확히 입력 해주세요!");
      return false;
    }

    axios
      .post("/api/delivery/edit", {
        delicode: inputDelicode,
        delinm: inputNm,
        delirec: inputRec,
        deliaddress: inputAddress,
        deliaddaddress: inputAddAddress,
        delipostcode: inputPostcode,
        delitel: inputTel,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("수정 완료");
          getDelis();
          setPopupVisible(false);
          setAddressVisible(false);
          resetInput();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelDeli = (delicode) => {
    axios
      .post("/api/delivery/del", {
        delicode: delicode,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("삭제 완료");
          getDelis();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAllDelDeli = () => {
    const hasTrue = seletedDelis.some((item) => item === true);

    if (hasTrue) {
      alert("삭제합니다.");
    } else {
      alert("선택해주세요.");
      return false;
    }

    seletedDelis.map((el, index) => {
      if (el) {
        console.log(index);
        console.log(delis[index]);
        axios
          .post("/api/delivery/del", {
            delicode: delis[index].DELI_CODE,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              getDelis();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleSeleted = (index) => {
    const updated = [...seletedDelis];
    updated[index] = !updated[index];
    setSeletedDelis(updated);

    console.log(seletedDelis);
    console.log(delis);
  };

  const handleAllSeleted = () => {
    setAllSelected(!allSelected);
    const updated = seletedDelis.map(() => !allSelected);
    setSeletedDelis(updated);
  };

  const getDelis = () => {
    const token = cookies.get("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    axios
      .post(
        "/api/delivery",
        {
          userid: USER_ID,
        },
        { headers: headers }
      )
      .then((res) => {
        setDelis(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDelis();
    setInputUserId(USER_ID);
    setInputUserNm(USER_NM);
    setInputUserTel0_0(USER_TEL0.split("-")[0]);
    setInputUserTel0_1(USER_TEL0.split("-")[1]);
    setInputUserTel0_2(USER_TEL0.split("-")[2]);
    setInputUserTel1_0(USER_TEL1.split("-")[0]);
    setInputUserTel1_1(USER_TEL1.split("-")[1]);
    setInputUserTel1_2(USER_TEL1.split("-")[2]);
  }, [data]);

  useEffect(() => {
    const initialSelectedDelis = Array.from(
      { length: delis.length },
      () => false
    );
    setSeletedDelis(initialSelectedDelis);
  }, [delis]);

  return (
    <S.MainLayout>
      <S.MainSection bgc="aliceblue">
        <S.MyPageTopWrapper>
          <S.MyPageTopBox>
            <S.MyPageTopLeft>
              <S.MyPageUserInfoBox>
                <S.MyPageUserInfoIcon></S.MyPageUserInfoIcon>
                <S.MyPageUserInfoTextBox>
                  <h1>개인회원</h1>
                  <h2>{USER_NM}</h2>
                  <h3>기본배송지</h3>
                  <h4>{USER_ADDRESS}</h4>
                </S.MyPageUserInfoTextBox>
              </S.MyPageUserInfoBox>
              <S.MyPageUserBtnBox>
                <S.Btn>회원 등급</S.Btn>
                <S.Btn>정보 수정</S.Btn>
                <S.Btn>배송지 관리</S.Btn>
              </S.MyPageUserBtnBox>
            </S.MyPageTopLeft>
            <S.MyPageTopRight>
              <S.MyPageCardBox>
                <S.MyPageCardItem>
                  <h1>포인트</h1>
                  <h2>{USER_POINT}</h2>
                  <h3>0</h3>
                </S.MyPageCardItem>
                <S.MyPageCardItem>
                  <h1>쿠폰</h1>
                  <h4>1</h4>
                  <h5>0</h5>
                </S.MyPageCardItem>
              </S.MyPageCardBox>
            </S.MyPageTopRight>
          </S.MyPageTopBox>
        </S.MyPageTopWrapper>
      </S.MainSection>
      <S.MainSection>
        <S.MyPageStateWrapper>
          <S.MyPageStateTitleBox>
            <h1>진행중인 주문</h1>
            <p>* 발송완료는 최근 7일 이내 발송완료된 주문건수입니다.</p>
          </S.MyPageStateTitleBox>
          <S.MyPageStateCellBox>
            <h1>주문 상품</h1>
            <S.MyPageStateCellList>
              <S.MyPageStateCellItem>
                <h1>주문접수</h1>
                <p>2</p>
              </S.MyPageStateCellItem>
              <S.MyPageStateCellItem>
                <h1>결제대기</h1>
                <p>0</p>
              </S.MyPageStateCellItem>
              <S.MyPageStateCellItem>
                <h1>결제완료</h1>
                <p>2</p>
              </S.MyPageStateCellItem>
              <S.MyPageStateCellItem>
                <h1>시안확인중</h1>
                <p>1</p>
              </S.MyPageStateCellItem>
              <S.MyPageStateCellItem>
                <h1>제작진행</h1>
                <p>1</p>
              </S.MyPageStateCellItem>
              <S.MyPageStateCellItem>
                <h1>발송완료</h1>
                <p>3</p>
              </S.MyPageStateCellItem>
            </S.MyPageStateCellList>
          </S.MyPageStateCellBox>
          <S.MyPageStateCellBox>
            <S.MyPageStateCardList>
              <S.MyPageStateCardItem>
                <h1>장바구니</h1>
                <p>2건</p>
              </S.MyPageStateCardItem>
              <S.MyPageStateCardItem>
                <h1>주문진행</h1>
                <p>1건</p>
              </S.MyPageStateCardItem>
              <S.MyPageStateCardItem>
                <h1>고객문의</h1>
                <p>0건</p>
              </S.MyPageStateCardItem>
              <S.MyPageStateCardItem>
                <h1>세금계산서</h1>
                <p>신청하기</p>
              </S.MyPageStateCardItem>
            </S.MyPageStateCardList>
          </S.MyPageStateCellBox>
        </S.MyPageStateWrapper>
      </S.MainSection>
      <S.MainSection>
        <S.MyPageStateEditWrapper>
          <S.MyPageStateEditBox>
            <h1>회원정보수정</h1>
            <S.userEditAnimated style={SlideDown}>
              <table>
                <tbody>
                  <tr>
                    <th>아이디</th>
                    <td>
                      <input value={inputUserId} disabled></input>
                    </td>
                  </tr>
                  <tr>
                    <th>이름</th>
                    <td>
                      <input value={inputUserNm} disabled></input>
                    </td>
                  </tr>
                  <tr>
                    <th>비밀번호</th>
                    <td>
                      <input
                        value={inputUserPw}
                        onChange={(e) => {
                          setInputUserPw(e.target.value);
                        }}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th>비밀번호 확인</th>
                    <td>
                      <input
                        value={inputUserPwck}
                        onChange={(e) => {
                          setInputUserPwck(e.target.value);
                        }}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th>휴대폰번호</th>
                    <td>
                      <input
                        className="tel"
                        value={inputUserTel0_0}
                        onChange={(e) => {
                          if (e.target.value.length > 3) return false;
                          setInputUserTel0_0(e.target.value);
                        }}
                      ></input>
                      <input
                        className="tel"
                        value={inputUserTel0_1}
                        onChange={(e) => {
                          if (e.target.value.length > 4) return false;
                          setInputUserTel0_1(e.target.value);
                        }}
                      ></input>
                      <input
                        className="tel"
                        value={inputUserTel0_2}
                        onChange={(e) => {
                          if (e.target.value.length > 4) return false;
                          setInputUserTel0_2(e.target.value);
                        }}
                      ></input>
                    </td>
                  </tr>
                  <tr>
                    <th>전화번호</th>
                    <td>
                      <input
                        className="tel"
                        value={inputUserTel1_0}
                        onChange={(e) => {
                          if (e.target.value.length > 3) return false;
                          setInputUserTel1_0(e.target.value);
                        }}
                      ></input>
                      <input
                        className="tel"
                        value={inputUserTel1_1}
                        onChange={(e) => {
                          if (e.target.value.length > 4) return false;
                          setInputUserTel1_1(e.target.value);
                        }}
                      ></input>
                      <input
                        className="tel"
                        value={inputUserTel1_2}
                        onChange={(e) => {
                          if (e.target.value.length > 4) return false;
                          setInputUserTel1_2(e.target.value);
                        }}
                      ></input>
                    </td>
                  </tr>
                  {/* <tr>
                  <th>이메일</th>
                  <td>
                    <input className="email" value="snow"></input>
                    <span>@</span>
                    <input className="email" value="naver.com"></input>
                  </td>
                </tr> */}
                </tbody>
              </table>

              <S.MyPageStateEditBtns>
                <S.Btn
                  className="edit"
                  btnBgc="#469cff"
                  fontColor="#fff"
                  btnBgcHover="#7cb9ff"
                  borderCHover="none"
                  onClick={handleEditUser}
                >
                  변경
                </S.Btn>
                <S.Btn
                  className="cancle"
                  onClick={() => {
                    setUserEditVisible(false);
                  }}
                >
                  취소
                </S.Btn>
              </S.MyPageStateEditBtns>
            </S.userEditAnimated>

            {!userEditVisible && (
              <S.MyPagePasswordWrapper>
                <div className="box">
                  <h1>본인 인증</h1>
                  <div className="btns">
                    <input
                      type="password"
                      placeholder="비밀번호를 입력해주세요."
                      value={inputAuthPw}
                      onChange={(e) => {
                        setInputAuthPw(e.target.value);
                      }}
                    />
                    <S.Btn
                      onClick={() => {
                        axios
                          .post("/api/mypage/auth", {
                            userid: USER_ID,
                            authpw: inputAuthPw,
                          })
                          .then((res) => {
                            console.log(res);
                            if (res.status === 200) {
                              setUserEditVisible(true);
                            }
                          })
                          .catch((error) => {
                            console.log(error);
                            alert("비밀번호 오류");
                          });
                      }}
                    >
                      확인
                    </S.Btn>
                  </div>
                </div>
              </S.MyPagePasswordWrapper>
            )}
          </S.MyPageStateEditBox>
          <S.MyPageStateEditDeliveryBox>
            <h1>배송지 관리</h1>
            <table>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleAllSeleted}
                    />
                  </th>
                  <th>배송지명</th>
                  <th>받는사람</th>
                  <th>주소</th>
                  <th>연락처</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {delis.length > 0 ? (
                  delis.map((el, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          onChange={() => {
                            handleSeleted(index);
                          }}
                          checked={seletedDelis[index]}
                        />
                        <input type="hidden" value={el.DELI_CODE} />
                      </td>
                      <td>{el.DELI_NM}</td>
                      <td>{el.DELI_REC}</td>
                      <td>
                        {el.DELI_ADDRESS} ({el.DELI_POSTCODE}){" "}
                        {el.DELI_ADD_ADDRESS}
                      </td>
                      <td>{el.DELI_TEL0}</td>
                      <td>
                        <S.Btn
                          className="del"
                          btnBgc="#469cff"
                          fontColor="#fff"
                          btnBgcHover="#7cb9ff"
                          borderCHover="none"
                          margin="0 0.5rem 0 0"
                          onClick={() => {
                            setPopupVisible(true);
                            setAddressVisible(false);
                            setEditVisible(true);
                            setInputDelicode(el.DELI_CODE);
                            setInputNm(el.DELI_NM);
                            setInputRec(el.DELI_REC);
                            setInputAddress(el.DELI_ADDRESS);
                            setInputAddAddress(el.DELI_ADD_ADDRESS);
                            setInputPostcode(el.DELI_POSTCODE);
                            setInputTel(el.DELI_TEL0);
                          }}
                        >
                          수정
                        </S.Btn>
                        <S.Btn
                          onClick={() => {
                            handleDelDeli(el.DELI_CODE);
                          }}
                        >
                          삭제
                        </S.Btn>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>배송지를 추가해주세요.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <S.MyPageStateEditBtns>
              <S.Btn
                className="del"
                btnBgc="#469cff"
                fontColor="#fff"
                btnBgcHover="#7cb9ff"
                borderCHover="none"
                margin="0 0.5rem 0 0"
                width="80px"
                onClick={() => {
                  const trueCount = seletedDelis.filter(
                    (item) => item === true
                  ).length;

                  if (trueCount != 1) {
                    alert("1개만 선택 가능합니다.");
                    return false;
                  }

                  const trueIndex = seletedDelis.indexOf(true);
                  axios
                    .post("/api/delivery/default", {
                      userid: USER_ID,
                      delicode: delis[trueIndex].DELI_CODE,
                    })
                    .then((res) => {
                      queryClient.refetchQueries("userinfo");
                      alert("성공");
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                기본 배송지
              </S.Btn>
              <S.Btn className="del" width="80px" onClick={handleAllDelDeli}>
                선택 삭제
              </S.Btn>
              <S.Btn
                className="add"
                btnBgc="#469cff"
                fontColor="#fff"
                btnBgcHover="#7cb9ff"
                borderCHover="none"
                width="80px"
                onClick={() => {
                  setPopupVisible(true);
                  setAddressVisible(false);
                  setEditVisible(false);
                  resetInput();
                }}
              >
                추가
              </S.Btn>
              <div></div>
            </S.MyPageStateEditBtns>
          </S.MyPageStateEditDeliveryBox>
        </S.MyPageStateEditWrapper>
      </S.MainSection>
      {popupVisible && (
        <>
          <S.MypagePopWrap>
            <table>
              <tr>
                <th style={{ width: "12%" }}>배송지명</th>
                <th style={{ width: "12%" }}>받는사람</th>
                <th colSpan={2}>주소</th>
                <th style={{ width: "9%" }}></th>
                <th style={{ width: "15%" }}>연락처</th>
                <th style={{ width: "9%" }}></th>
              </tr>
              <tr>
                <td>
                  <input
                    placeholder="배송지 명을 입력해주세요."
                    value={inputNm}
                    onChange={(e) => {
                      setInputNm(e.target.value);
                    }}
                  />
                </td>
                <td>
                  <input
                    placeholder="받는 분을 입력해주세요."
                    value={inputRec}
                    onChange={(e) => {
                      setInputRec(e.target.value);
                    }}
                  />
                </td>
                <td>
                  <input
                    disabled
                    placeholder="주소 찾기를 이용해주세요."
                    value={inputAddress && `${inputAddress} (${inputPostcode})`}
                  />
                </td>
                <td style={{ width: "15%" }}>
                  <input
                    placeholder="나머지 주소 (동/호)"
                    value={inputAddAddress}
                    onChange={(e) => {
                      setInputAddAddress(e.target.value);
                    }}
                  />
                </td>
                <td>
                  <S.Btn
                    onClick={() => {
                      setAddressVisible(true);
                    }}
                  >
                    주소찾기
                  </S.Btn>
                </td>
                <td>
                  <input
                    placeholder="연락처를 입력해주세요."
                    value={inputTel}
                    onChange={(e) => {
                      const input = e.target.value.replace(/-/g, ""); // 기존의 하이픈 제거
                      let formattedInput;

                      if (input.length <= 3) {
                        formattedInput = input;
                      } else if (input.length <= 7) {
                        formattedInput = `${input.slice(0, 3)}-${input.slice(
                          3
                        )}`;
                      } else if (input.length < 11) {
                        formattedInput = `${input.slice(0, 3)}-${input.slice(
                          3,
                          6
                        )}-${input.slice(6, 11)}`;
                      } else if (input.length === 11) {
                        formattedInput = `${input.slice(0, 3)}-${input.slice(
                          3,
                          7
                        )}-${input.slice(7, 12)}`;
                      } else {
                        formattedInput = `${input.slice(0, 3)}-${input.slice(
                          3,
                          7
                        )}-${input.slice(7, 11)}`;
                      }

                      setInputTel(formattedInput);
                    }}
                  />
                </td>
                <td>
                  {editVisible ? (
                    <S.Btn
                      btnBgc="#469cff"
                      fontColor="#fff"
                      btnBgcHover="#7cb9ff"
                      borderCHover="none"
                      width="60px"
                      onClick={handleEditDeli}
                    >
                      수정
                    </S.Btn>
                  ) : (
                    <S.Btn
                      btnBgc="#469cff"
                      fontColor="#fff"
                      btnBgcHover="#7cb9ff"
                      borderCHover="none"
                      width="60px"
                      onClick={handleAddDeli}
                    >
                      등록
                    </S.Btn>
                  )}
                </td>
              </tr>
            </table>
            {addressVisible && (
              <div className="postWrapper">
                <DaumPostcodeEmbed
                  onComplete={(data) => {
                    setInputAddress(data.address);
                    setInputPostcode(data.zonecode);
                    setAddressVisible(false);
                  }}
                />
              </div>
            )}
          </S.MypagePopWrap>
          <S.MypagePopOverRay
            onClick={() => {
              setPopupVisible(false);
            }}
          />
        </>
      )}
    </S.MainLayout>
  );
};

export default MyPage;
