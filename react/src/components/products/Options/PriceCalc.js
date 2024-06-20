export const PriceCalc = (priceTable, prodNm, SelectOptions, optionList) => {
  console.log("SelectOptions", SelectOptions);
  console.log("optionList", optionList);

  // 일반지
  if (prodNm === "일반지") {
    let print_price = 0;
    let option_price = 0;

    // 용지 계산
    const paperTable = priceTable.filter(
      (item) =>
        item.PRICE_OPTION_CATE === "용지" &&
        item.PRICE_OPTION_NM === SelectOptions[prodNm]?.용지
    );

    const paper_unit_price = filterByQty(
      paperTable,
      SelectOptions[prodNm]?.수량
    )?.PRICE_PRICE;

    print_price = paper_unit_price * SelectOptions[prodNm]?.수량;

    // 코팅 계산
    if (optionList[prodNm]?.코팅) {
      const coatingTable = priceTable.filter(
        (item) =>
          item.PRICE_OPTION_CATE === "코팅" &&
          item.PRICE_OPTION_NM === optionList[prodNm]?.코팅
      );

      const coating_unit_price = filterByQty(
        coatingTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      if (coating_unit_price !== undefined) {
        option_price += coating_unit_price * SelectOptions[prodNm]?.수량;
      }
    }

    // 귀도리 계산
    if (SelectOptions[prodNm]?.귀도리) {
      const roundTable = priceTable.filter(
        (item) => item.PRICE_OPTION_CATE === "귀도리"
      );

      const round_unit_price = filterByQty(
        roundTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      if (round_unit_price !== undefined) {
        option_price += round_unit_price * SelectOptions[prodNm]?.수량;
      }
    }

    // 오시 계산
    if (SelectOptions[prodNm]?.오시) {
      const osiTable = priceTable.filter(
        (item) =>
          item.PRICE_OPTION_CATE === "오시" &&
          item.PRICE_OPTION_NM === optionList[prodNm]?.오시
      );

      console.log("테스트", osiTable);
      const osi_unit_price = filterByQty(
        osiTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      console.log("테스트", osi_unit_price);

      if (osi_unit_price !== undefined) {
        if (
          optionList[prodNm]?.오시 === "3줄" &&
          osi_unit_price * SelectOptions[prodNm]?.수량 < 11000
        ) {
          option_price += 11000;
        } else if (
          optionList[prodNm]?.오시 !== "3줄" &&
          osi_unit_price * SelectOptions[prodNm]?.수량 < 5000
        ) {
          option_price += 5000;
        } else {
          option_price += osi_unit_price * SelectOptions[prodNm]?.수량;
        }
      }
    }

    //최종 단가
    const final_price = {
      print: print_price,
      option: option_price,
    };

    return final_price;
  }
};

function filterByQty(data, qty) {
  // qty 이하의 PRICE_QTY 값을 필터링하여 리스트로 만듦
  const filteredData = data.filter((item) => item.PRICE_QTY <= qty);

  // 필터링된 리스트가 비어있지 않다면 가장 큰 PRICE_QTY 값을 가진 항목을 반환
  if (filteredData.length > 0) {
    return filteredData.reduce((max, item) =>
      item.PRICE_QTY > max.PRICE_QTY ? item : max
    );
  } else {
    return null; // 적절한 데이터가 없는 경우 처리 방법
  }
}
