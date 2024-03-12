import React, { useEffect, useState } from "react";
import * as S from "../styles/new_styles";
import { QueryClient, useQuery } from "react-query";
import axios from "axios";
import { Cookies } from "react-cookie";
import DaumPostcodeEmbed from "react-daum-postcode";

const MyPage = () => {
  const queryClient = new QueryClient();
  const { data } = useQuery("userinfo", { enabled: false });
  const cookies = new Cookies();
  const USER_ADDRESS = data?.USER_ADDRESS || "기본 배송지를 설정해주세요.";
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
  const [inputPostcode, setInputPostcode] = useState("");
  const [inputNm, setInputNm] = useState();
  const [inputRec, setInputRec] = useState();
  const [inputTel, setInputTel] = useState();

  const resetInput = () => {
    setInputAddress("");
    setInputPostcode("");
    setInputNm("");
    setInputRec("");
    setInputTel("");
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
            <table>
              <tbody>
                <tr>
                  <th>아이디</th>
                  <td>
                    <input value={USER_ID} disabled></input>
                  </td>
                </tr>
                <tr>
                  <th>이름</th>
                  <td>
                    <input value={USER_NM} disabled></input>
                  </td>
                </tr>
                <tr>
                  <th>비밀번호</th>
                  <td>
                    <input value=""></input>
                  </td>
                </tr>
                <tr>
                  <th>비밀번호 확인</th>
                  <td>
                    <input value=""></input>
                  </td>
                </tr>
                <tr>
                  <th>휴대폰번호</th>
                  <td>
                    <input
                      className="tel"
                      value={USER_TEL0.split("-")[0]}
                    ></input>
                    <input
                      className="tel"
                      value={USER_TEL0.split("-")[1]}
                    ></input>
                    <input
                      className="tel"
                      value={USER_TEL0.split("-")[2]}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <th>전화번호</th>
                  <td>
                    <input
                      className="tel"
                      value={USER_TEL1.split("-")[0]}
                    ></input>{" "}
                    <input
                      className="tel"
                      value={USER_TEL1.split("-")[1]}
                    ></input>
                    <input
                      className="tel"
                      value={USER_TEL1.split("-")[2]}
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
              >
                변경
              </S.Btn>
              <S.Btn className="cancle">취소</S.Btn>
            </S.MyPageStateEditBtns>
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
                        {el.DELI_ADDRESS} ({el.DELI_POSTCODE})
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
              >
                기본 배송지
              </S.Btn>
              <S.Btn className="del" width="80px">
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
                <th style={{ width: "15%" }}>배송지명</th>
                <th style={{ width: "15%" }}>받는사람</th>
                <th>주소</th>
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
                    // onClick={() => {
                    //   setAddressVisible(true);
                    // }}
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
                      setInputTel(e.target.value);
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
