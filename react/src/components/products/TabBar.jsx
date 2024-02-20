import React, { useState } from "react";
import * as S from "../../styles/new_styles";
import GlobalCard from "../global/GlobalCard";

const TabBar = () => {
  const [ShowIndex, SetShowIndex] = useState(0);

  const handleClickTab = (index) => {
    SetShowIndex(index);
  };

  const items = [
    { title: "명함", cont: "명함" },
    { title: "쿠폰", cont: "쿠폰" },
    { title: "티켓", cont: "티켓" },
  ];

  const items2 = [
    { title: "일반지", cont: "스노우 250g, 300g" },
    { title: "펄 용지", cont: "스타드림쿼츠 250g" },
    {
      title: "크라프트 용지",
      cont: "친환경 재생 용지로 종이 자체의 편안함을 가지고 있어요.",
    },
  ];
  return (
    <S.TabBarWrapper>
      <S.TabBarlist>
        <S.TabBarItem
          onClick={() => {
            handleClickTab(0);
          }}
          className={ShowIndex === 0 ? "selected" : null}
        >
          <S.TabBarItemText>상품 안내</S.TabBarItemText>
        </S.TabBarItem>
        <S.TabBarItem
          onClick={() => {
            handleClickTab(1);
          }}
          className={ShowIndex === 1 ? "selected" : null}
        >
          <S.TabBarItemText>작업 가이드</S.TabBarItemText>
        </S.TabBarItem>
        <S.TabBarItem
          onClick={() => {
            handleClickTab(2);
          }}
          className={ShowIndex === 2 ? "selected" : null}
        >
          <S.TabBarItemText>후가공 안내</S.TabBarItemText>
        </S.TabBarItem>
      </S.TabBarlist>

      {ShowIndex === 0 ? (
        <S.TabBarContent>
          <h1>다양한 용도</h1>
          <GlobalCard items={items} />
          <h1>다양한 용지</h1>
          <GlobalCard items={items2} />
        </S.TabBarContent>
      ) : ShowIndex === 1 ? (
        <S.TabBarContent>
          <h1>작업가이드</h1>
          <GlobalCard items={items} />
        </S.TabBarContent>
      ) : ShowIndex === 2 ? (
        <S.TabBarContent>
          <h1>후가공안내</h1>
          <GlobalCard items={items} />
        </S.TabBarContent>
      ) : null}
    </S.TabBarWrapper>
  );
};

export default TabBar;
