export const PriceCalc = (
  priceTable,
  priceTable_global,
  prodNm,
  SelectOptions,
  optionList
) => {
  console.log("SelectOptions", SelectOptions);
  console.log("optionList", optionList);

  let print_price = 0;
  let option_price = 0;

  // ===일반지===
  if (prodNm === "일반지") {
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

      const osi_unit_price = filterByQty(
        osiTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

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

    // 미싱 계산
    if (SelectOptions[prodNm]?.미싱) {
      const missingTable = priceTable.filter(
        (item) =>
          item.PRICE_OPTION_CATE === "미싱" &&
          item.PRICE_OPTION_NM === optionList[prodNm]?.미싱
      );

      const missing_unit_price = filterByQty(
        missingTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      if (missing_unit_price !== undefined) {
        if (
          optionList[prodNm]?.미싱 === "3줄" &&
          missing_unit_price * SelectOptions[prodNm]?.수량 < 7500
        ) {
          option_price += 7500;
        } else if (
          optionList[prodNm]?.미싱 !== "3줄" &&
          missing_unit_price * SelectOptions[prodNm]?.수량 < 6500
        ) {
          option_price += 6500;
        } else {
          option_price += missing_unit_price * SelectOptions[prodNm]?.수량;
        }
      }
    }

    // 타공 계산
    if (SelectOptions[prodNm]?.타공) {
      const punchingTable = priceTable.filter(
        (item) => item.PRICE_OPTION_CATE === "타공"
      );

      const punching_unit_price = filterByQty(
        punchingTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      if (punching_unit_price !== undefined) {
        if (punching_unit_price * SelectOptions[prodNm]?.수량 < 9000) {
          option_price += 9000;
        } else {
          option_price += punching_unit_price * SelectOptions[prodNm]?.수량;
        }
      }
    }
  }
  // ===일반지 끝===

  // ===고급지===
  if (prodNm === "고급지") {
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

      const osi_unit_price = filterByQty(
        osiTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

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

    // 미싱 계산
    if (SelectOptions[prodNm]?.미싱) {
      const missingTable = priceTable.filter(
        (item) =>
          item.PRICE_OPTION_CATE === "미싱" &&
          item.PRICE_OPTION_NM === optionList[prodNm]?.미싱
      );

      const missing_unit_price = filterByQty(
        missingTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      if (missing_unit_price !== undefined) {
        if (
          optionList[prodNm]?.미싱 === "3줄" &&
          missing_unit_price * SelectOptions[prodNm]?.수량 < 7500
        ) {
          option_price += 7500;
        } else if (
          optionList[prodNm]?.미싱 !== "3줄" &&
          missing_unit_price * SelectOptions[prodNm]?.수량 < 6500
        ) {
          option_price += 6500;
        } else {
          option_price += missing_unit_price * SelectOptions[prodNm]?.수량;
        }
      }
    }

    // 타공 계산
    if (SelectOptions[prodNm]?.타공) {
      const punchingTable = priceTable.filter(
        (item) => item.PRICE_OPTION_CATE === "타공"
      );

      const punching_unit_price = filterByQty(
        punchingTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      if (punching_unit_price !== undefined) {
        if (punching_unit_price * SelectOptions[prodNm]?.수량 < 9000) {
          option_price += 9000;
        } else {
          option_price += punching_unit_price * SelectOptions[prodNm]?.수량;
        }
      }
    }
  }
  // ===고급지 끝===

  // ===전단지===
  if (prodNm === "전단지") {
    // 용지 계산
    const paperTable_global = priceTable_global.filter(
      (item) =>
        item.PRICE_OPTION_CATE === "용지" &&
        item.PRICE_OPTION_NM === SelectOptions[prodNm]?.용지
    );

    const paper_unit_price = filterByQty(
      paperTable_global,
      SelectOptions[prodNm]?.수량
    )?.PRICE_PRICE;

    // A4의 가로 * 세로 = 62370
    // 62370을 기준으로 가격을 계산

    const standardValue =
      Math.round(
        ((SelectOptions[prodNm]?.가로 * SelectOptions[prodNm]?.세로) / 62370) *
          1000
      ) / 1000;

    console.log(standardValue);

    let paper_price = paper_unit_price / 4000;
    let multiple_1 = 1; //용지 규격별 배수
    let multiple_2 = 1; //매수 별 배수
    let add_price = 0; //양면 단면 인쇄비용

    if (standardValue > 1) {
      multiple_1 *= 2;
    } else if (standardValue === 1) {
      multiple_1 *= 1;
    } else if (standardValue >= 0.498) {
      multiple_1 *= 0.6;
    } else if (standardValue >= 0.249) {
      multiple_1 *= 0.36;
    } else {
      multiple_1 *= 0.252;
    }

    if (SelectOptions[prodNm]?.수량 >= 2001) {
      multiple_2 *= 1;
    } else if (SelectOptions[prodNm]?.수량 >= 1001) {
      multiple_2 *= 1.2;
    } else if (SelectOptions[prodNm]?.수량 >= 501) {
      multiple_2 *= 1.5;
    } else if (SelectOptions[prodNm]?.수량 >= 201) {
      multiple_2 *= 2;
    } else if (SelectOptions[prodNm]?.수량 >= 101) {
      multiple_2 *= 3.5;
    } else {
      multiple_2 *= 4;
    }

    if (SelectOptions[prodNm]?.인쇄 === "양면") {
      paper_price += 100;
    } else if (SelectOptions[prodNm]?.인쇄 === "단면") {
      paper_price += 50;
    }

    console.log("용지 1장당 기준 가격 >>>", paper_price);
    console.log("용지 규격별 배수 >>> ", multiple_1);
    console.log("매수별 배수 >>> ", multiple_2);
    console.log(
      "용지 1장당 기준 가격 >>>",
      paper_price * multiple_1 * multiple_2
    );
    console.log(
      "가격 >>>",
      paper_price * multiple_1 * multiple_2 * SelectOptions[prodNm].수량
    );

    print_price =
      paper_price * multiple_1 * multiple_2 * SelectOptions[prodNm].수량;

    if (print_price < 3000) {
      print_price = 3000;
    }

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
        let default_price = 0;
        if (optionList[prodNm]?.코팅.indexOf("단면") !== -1) {
          default_price = 3000;
        } else if (optionList[prodNm]?.코팅.indexOf("양면") !== -1) {
          default_price = 4000;
        }

        option_price +=
          coating_unit_price * SelectOptions[prodNm]?.수량 + default_price;
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
        if (round_unit_price * SelectOptions[prodNm]?.수량 < 1000) {
          option_price += 1000;
        } else {
          option_price += round_unit_price * SelectOptions[prodNm]?.수량;
        }
      }
    }

    // 오시 계산
    if (SelectOptions[prodNm]?.오시) {
      const osiTable = priceTable.filter(
        (item) =>
          item.PRICE_OPTION_CATE === "오시" &&
          item.PRICE_OPTION_NM === optionList[prodNm]?.오시
      );

      const osi_unit_price = filterByQty(
        osiTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

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

    // 미싱 계산
    if (SelectOptions[prodNm]?.미싱) {
      const missingTable = priceTable.filter(
        (item) =>
          item.PRICE_OPTION_CATE === "미싱" &&
          item.PRICE_OPTION_NM === optionList[prodNm]?.미싱
      );

      const missing_unit_price = filterByQty(
        missingTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      if (missing_unit_price !== undefined) {
        if (
          optionList[prodNm]?.미싱 === "3줄" &&
          missing_unit_price * SelectOptions[prodNm]?.수량 < 7500
        ) {
          option_price += 7500;
        } else if (
          optionList[prodNm]?.미싱 !== "3줄" &&
          missing_unit_price * SelectOptions[prodNm]?.수량 < 6500
        ) {
          option_price += 6500;
        } else {
          option_price += missing_unit_price * SelectOptions[prodNm]?.수량;
        }
      }
    }

    // 타공 계산
    if (SelectOptions[prodNm]?.타공) {
      const punchingTable = priceTable.filter(
        (item) => item.PRICE_OPTION_CATE === "타공"
      );

      const punching_unit_price = filterByQty(
        punchingTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      if (punching_unit_price !== undefined) {
        if (punching_unit_price * SelectOptions[prodNm]?.수량 < 9000) {
          option_price += 9000;
        } else {
          option_price += punching_unit_price * SelectOptions[prodNm]?.수량;
        }
      }
    }
  }
  // ===전단지 끝===

  // ===엽서===
  if (prodNm === "엽서") {
    // 용지 계산
    const paperTable_global = priceTable_global.filter(
      (item) =>
        item.PRICE_OPTION_CATE === "용지" &&
        item.PRICE_OPTION_NM === SelectOptions[prodNm]?.용지
    );

    const paper_unit_price = filterByQty(
      paperTable_global,
      SelectOptions[prodNm]?.수량
    )?.PRICE_PRICE;

    // A4의 가로 * 세로 = 62370
    // 62370을 기준으로 가격을 계산

    const standardValue =
      Math.round(
        ((SelectOptions[prodNm]?.가로 * SelectOptions[prodNm]?.세로) / 62370) *
          1000
      ) / 1000;

    console.log(standardValue);

    let paper_price = paper_unit_price / 4000;
    let multiple_1 = 1; //용지 규격별 배수
    let multiple_2 = 1; //매수 별 배수
    let add_price = 0; //양면 단면 인쇄비용

    if (standardValue > 1) {
      multiple_1 *= 2;
    } else if (standardValue === 1) {
      multiple_1 *= 1;
    } else if (standardValue >= 0.498) {
      multiple_1 *= 0.6;
    } else if (standardValue >= 0.249) {
      multiple_1 *= 0.36;
    } else {
      multiple_1 *= 0.252;
    }

    if (SelectOptions[prodNm]?.수량 >= 2001) {
      multiple_2 *= 1;
    } else if (SelectOptions[prodNm]?.수량 >= 1001) {
      multiple_2 *= 1.2;
    } else if (SelectOptions[prodNm]?.수량 >= 501) {
      multiple_2 *= 1.5;
    } else if (SelectOptions[prodNm]?.수량 >= 201) {
      multiple_2 *= 2;
    } else if (SelectOptions[prodNm]?.수량 >= 101) {
      multiple_2 *= 3.5;
    } else {
      multiple_2 *= 4;
    }

    if (SelectOptions[prodNm]?.인쇄 === "양면") {
      paper_price += 100;
    } else if (SelectOptions[prodNm]?.인쇄 === "단면") {
      paper_price += 50;
    }

    console.log("용지 1장당 기준 가격 >>>", paper_price);
    console.log("용지 규격별 배수 >>> ", multiple_1);
    console.log("매수별 배수 >>> ", multiple_2);
    console.log(
      "용지 1장당 기준 가격 >>>",
      paper_price * multiple_1 * multiple_2
    );
    console.log(
      "가격 >>>",
      paper_price * multiple_1 * multiple_2 * SelectOptions[prodNm].수량
    );

    print_price =
      paper_price * multiple_1 * multiple_2 * SelectOptions[prodNm].수량;

    if (print_price < 3000) {
      print_price = 3000;
    }

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
        let default_price = 0;
        if (optionList[prodNm]?.코팅.indexOf("단면") !== -1) {
          default_price = 3000;
        } else if (optionList[prodNm]?.코팅.indexOf("양면") !== -1) {
          default_price = 4000;
        }

        option_price +=
          coating_unit_price * SelectOptions[prodNm]?.수량 + default_price;
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
        if (round_unit_price * SelectOptions[prodNm]?.수량 < 1000) {
          option_price += 1000;
        } else {
          option_price += round_unit_price * SelectOptions[prodNm]?.수량;
        }
      }
    }

    // 오시 계산
    if (SelectOptions[prodNm]?.오시) {
      const osiTable = priceTable.filter(
        (item) =>
          item.PRICE_OPTION_CATE === "오시" &&
          item.PRICE_OPTION_NM === optionList[prodNm]?.오시
      );

      const osi_unit_price = filterByQty(
        osiTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

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

    // 미싱 계산
    if (SelectOptions[prodNm]?.미싱) {
      const missingTable = priceTable.filter(
        (item) =>
          item.PRICE_OPTION_CATE === "미싱" &&
          item.PRICE_OPTION_NM === optionList[prodNm]?.미싱
      );

      const missing_unit_price = filterByQty(
        missingTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      if (missing_unit_price !== undefined) {
        if (
          optionList[prodNm]?.미싱 === "3줄" &&
          missing_unit_price * SelectOptions[prodNm]?.수량 < 7500
        ) {
          option_price += 7500;
        } else if (
          optionList[prodNm]?.미싱 !== "3줄" &&
          missing_unit_price * SelectOptions[prodNm]?.수량 < 6500
        ) {
          option_price += 6500;
        } else {
          option_price += missing_unit_price * SelectOptions[prodNm]?.수량;
        }
      }
    }

    // 타공 계산
    if (SelectOptions[prodNm]?.타공) {
      const punchingTable = priceTable.filter(
        (item) => item.PRICE_OPTION_CATE === "타공"
      );

      const punching_unit_price = filterByQty(
        punchingTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      if (punching_unit_price !== undefined) {
        if (punching_unit_price * SelectOptions[prodNm]?.수량 < 9000) {
          option_price += 9000;
        } else {
          option_price += punching_unit_price * SelectOptions[prodNm]?.수량;
        }
      }
    }
  }
  // ===엽서 끝===

  // ===리플릿===
  if (prodNm === "리플릿") {
    // 용지 계산
    const paperTable_global = priceTable_global.filter(
      (item) =>
        item.PRICE_OPTION_CATE === "용지" &&
        item.PRICE_OPTION_NM === SelectOptions[prodNm]?.용지
    );

    const paper_unit_price = filterByQty(
      paperTable_global,
      SelectOptions[prodNm]?.수량
    )?.PRICE_PRICE;

    // A4의 가로 * 세로 = 62370
    // 62370을 기준으로 가격을 계산

    const standardValue =
      Math.round(
        ((SelectOptions[prodNm]?.가로 * SelectOptions[prodNm]?.세로) / 62370) *
          1000
      ) / 1000;

    console.log("standardValue", standardValue);

    let paper_price = paper_unit_price / 4000;
    let multiple_1 = 1; //용지 규격별 배수
    let multiple_2 = 1; //매수 별 배수
    let add_price = 0; //양면 단면 인쇄비용

    if (standardValue > 2) {
      multiple_1 *= 4;
    } else if (standardValue > 1) {
      multiple_1 *= 2;
    } else if (standardValue === 1) {
      multiple_1 *= 1;
    } else if (standardValue >= 0.498) {
      multiple_1 *= 0.6;
    } else if (standardValue >= 0.249) {
      multiple_1 *= 0.36;
    } else {
      multiple_1 *= 0.252;
    }

    if (SelectOptions[prodNm]?.수량 >= 2001) {
      multiple_2 *= 1;
    } else if (SelectOptions[prodNm]?.수량 >= 1001) {
      multiple_2 *= 1.2;
    } else if (SelectOptions[prodNm]?.수량 >= 501) {
      multiple_2 *= 1.5;
    } else if (SelectOptions[prodNm]?.수량 >= 201) {
      multiple_2 *= 2;
    } else if (SelectOptions[prodNm]?.수량 >= 101) {
      multiple_2 *= 3.5;
    } else {
      multiple_2 *= 4;
    }

    if (SelectOptions[prodNm]?.인쇄 === "양면") {
      paper_price += 100;
    } else if (SelectOptions[prodNm]?.인쇄 === "단면") {
      paper_price += 50;
    }

    console.log("용지 1장당 기준 가격 >>>", paper_price);
    console.log("용지 규격별 배수 >>> ", multiple_1);
    console.log("매수별 배수 >>> ", multiple_2);
    console.log(
      "용지 1장당 기준 가격 >>>",
      paper_price * multiple_1 * multiple_2
    );
    console.log(
      "가격 >>>",
      paper_price * multiple_1 * multiple_2 * SelectOptions[prodNm].수량
    );

    print_price =
      paper_price * multiple_1 * multiple_2 * SelectOptions[prodNm].수량;

    if (print_price < 3000) {
      print_price = 3000;
    }

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
        let default_price = 0;
        if (optionList[prodNm]?.코팅.indexOf("단면") !== -1) {
          default_price = 3000;
        } else if (optionList[prodNm]?.코팅.indexOf("양면") !== -1) {
          default_price = 4000;
        }

        option_price +=
          coating_unit_price * SelectOptions[prodNm]?.수량 + default_price;
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
        if (round_unit_price * SelectOptions[prodNm]?.수량 < 1000) {
          option_price += 1000;
        } else {
          option_price += round_unit_price * SelectOptions[prodNm]?.수량;
        }
      }
    }

    // 오시 계산
    if (SelectOptions[prodNm]?.오시) {
      const osiTable = priceTable.filter(
        (item) =>
          item.PRICE_OPTION_CATE === "오시" &&
          item.PRICE_OPTION_NM === optionList[prodNm]?.오시
      );

      const osi_unit_price = filterByQty(
        osiTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

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

    // 미싱 계산
    if (SelectOptions[prodNm]?.미싱) {
      const missingTable = priceTable.filter(
        (item) =>
          item.PRICE_OPTION_CATE === "미싱" &&
          item.PRICE_OPTION_NM === optionList[prodNm]?.미싱
      );

      const missing_unit_price = filterByQty(
        missingTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      if (missing_unit_price !== undefined) {
        if (
          optionList[prodNm]?.미싱 === "3줄" &&
          missing_unit_price * SelectOptions[prodNm]?.수량 < 7500
        ) {
          option_price += 7500;
        } else if (
          optionList[prodNm]?.미싱 !== "3줄" &&
          missing_unit_price * SelectOptions[prodNm]?.수량 < 6500
        ) {
          option_price += 6500;
        } else {
          option_price += missing_unit_price * SelectOptions[prodNm]?.수량;
        }
      }
    }

    // 타공 계산
    if (SelectOptions[prodNm]?.타공) {
      const punchingTable = priceTable.filter(
        (item) => item.PRICE_OPTION_CATE === "타공"
      );

      const punching_unit_price = filterByQty(
        punchingTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      if (punching_unit_price !== undefined) {
        if (punching_unit_price * SelectOptions[prodNm]?.수량 < 9000) {
          option_price += 9000;
        } else {
          option_price += punching_unit_price * SelectOptions[prodNm]?.수량;
        }
      }
    }
  }
  // ===리플릿 끝===

  // ===단행본===
  if (
    prodNm === "단행본" ||
    prodNm === "브로슈어" ||
    prodNm === "스프링노트" ||
    prodNm === "제안서" ||
    prodNm === "노트"
  ) {
    prodNm = "책자";
    // 표지 계산
    const paperTable_global = priceTable_global.filter(
      (item) =>
        item.PRICE_OPTION_CATE === "용지" &&
        item.PRICE_OPTION_NM === SelectOptions[prodNm]?.표지
    );

    const cover_paper_unit_price = filterByQty(
      paperTable_global,
      SelectOptions[prodNm]?.수량
    )?.PRICE_PRICE;

    // A4의 가로 * 세로 = 62370
    // 62370을 기준으로 가격을 계산
    const standardValue =
      Math.round(
        ((SelectOptions[prodNm]?.가로 * SelectOptions[prodNm]?.세로) / 62370) *
          1000
      ) / 1000;
    console.log("standardValue", standardValue);

    let cover_paper_price = cover_paper_unit_price / 4000;
    let multiple_1 = 1; //용지 규격별 배수
    let multiple_2 = 1; //매수 별 배수
    let add_price = 0; //양면 단면 인쇄비용

    if (standardValue > 2) {
      multiple_1 *= 4;
    } else if (standardValue > 1) {
      multiple_1 *= 2;
    } else if (standardValue === 1) {
      multiple_1 *= 1;
    } else if (standardValue >= 0.498) {
      multiple_1 *= 0.6;
    } else if (standardValue >= 0.249) {
      multiple_1 *= 0.36;
    } else {
      multiple_1 *= 0.252;
    }

    //부수 별 배수
    if (SelectOptions[prodNm]?.수량 >= 200) {
      multiple_2 *= 1.25;
    } else if (SelectOptions[prodNm]?.수량 >= 150) {
      multiple_2 *= 1.3;
    } else if (SelectOptions[prodNm]?.수량 >= 100) {
      multiple_2 *= 1.5;
    } else if (SelectOptions[prodNm]?.수량 >= 50) {
      multiple_2 *= 1.7;
    } else if (SelectOptions[prodNm]?.수량 >= 20) {
      multiple_2 *= 1.8;
    } else {
      multiple_2 *= 2;
    }

    if (SelectOptions[prodNm]?.표지인쇄 === "양면") {
      cover_paper_price += 100;
    } else if (SelectOptions[prodNm]?.표지인쇄 === "단면") {
      cover_paper_price += 50;
    }

    const coverAmt =
      cover_paper_price *
      multiple_1 *
      multiple_2 *
      4 *
      SelectOptions[prodNm]?.수량;

    //내지 계산
    const paperTable_global_inner = priceTable_global.filter(
      (item) =>
        item.PRICE_OPTION_CATE === "용지" &&
        item.PRICE_OPTION_NM === SelectOptions[prodNm]?.내지
    );

    const inner_paper_unit_price = filterByQty(
      paperTable_global_inner,
      SelectOptions[prodNm]?.수량
    )?.PRICE_PRICE;

    let inner_paper_price = inner_paper_unit_price / 4000;

    if (SelectOptions[prodNm]?.내지인쇄 === "양면") {
      inner_paper_price += 100;
    } else if (SelectOptions[prodNm]?.내지인쇄 === "단면") {
      inner_paper_price += 50;
    }

    let inner_paper_qty =
      SelectOptions[prodNm]?.내지인쇄 === "양면"
        ? SelectOptions[prodNm]?.페이지 / 2
        : SelectOptions[prodNm]?.페이지;

    console.log("??>", inner_paper_qty);
    const innerAmt =
      inner_paper_price *
      inner_paper_qty *
      multiple_1 *
      multiple_2 *
      SelectOptions[prodNm]?.수량;

    console.log("내지 가격 >> ", innerAmt);
    console.log("표지 가격 >> ", coverAmt);

    print_price = innerAmt + coverAmt;

    //제본 계산
    if (SelectOptions[prodNm]?.제본 !== undefined) {
      const bindingTable = priceTable_global.filter(
        (item) =>
          item.PRICE_OPTION_CATE === "제본" &&
          item.PRICE_OPTION_NM === SelectOptions[prodNm]?.제본
      );

      const binding_unit_price = filterByQty(
        bindingTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      option_price += binding_unit_price * SelectOptions[prodNm]?.수량;
    }

    // 코팅 계산
    if (optionList[prodNm]?.표지코팅) {
      const coatingTable = priceTable_global.filter(
        (item) =>
          item.PRICE_OPTION_CATE === "표지코팅" &&
          item.PRICE_OPTION_NM === "표지코팅"
      );

      const coating_unit_price = filterByQty(
        coatingTable,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      if (coating_unit_price !== undefined) {
        option_price += coating_unit_price * SelectOptions[prodNm]?.수량;
      }
    }

    // 박
    if (SelectOptions[prodNm].박) {
      option_price += 150000;
    }
    if (SelectOptions[prodNm].형압) {
      option_price += 150000;
    }
    if (SelectOptions[prodNm].부분코팅) {
      option_price += 200000;
    }
  }
  // ===단행본 끝===

  // ===X배너===
  if (prodNm === "X배너") {
    let Xbanner_Material =
      SelectOptions[prodNm]?.규격 === "600x1800"
        ? "일반"
        : SelectOptions[prodNm]?.규격 === "500x720"
        ? "미니"
        : "비규격";

    //일반일 경우 소재까지 선택
    if (Xbanner_Material === "일반") {
      Xbanner_Material += SelectOptions[prodNm]?.소재;
    }

    const Standard_Price_Table = priceTable.filter(
      (item) =>
        item.PRICE_OPTION_CATE === "소재" &&
        item.PRICE_OPTION_NM === Xbanner_Material
    );

    // 일반이나 미니일 경우 1개당 가격
    // 비규격일 경우 1회배당 가격
    const Standard_Price = filterByQty(
      Standard_Price_Table,
      SelectOptions[prodNm]?.수량
    )?.PRICE_PRICE;

    if (Xbanner_Material === "비규격") {
      let Imposition =
        (SelectOptions[prodNm]?.가로 * SelectOptions[prodNm]?.세로) / 1000000;

      print_price += Standard_Price * Imposition * SelectOptions[prodNm]?.수량;
    } else {
      print_price += Standard_Price * SelectOptions[prodNm]?.수량;
    }

    //후가공
    if (SelectOptions[prodNm]?.후가공) {
      const Finishing_Price_Table = priceTable.filter(
        (item) =>
          item.PRICE_OPTION_CATE === "후가공" &&
          item.PRICE_OPTION_NM === SelectOptions[prodNm]?.후가공
      );

      const Finishing_Price = filterByQty(
        Finishing_Price_Table,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      if (typeof Finishing_Price === "number") {
        option_price += Finishing_Price * SelectOptions[prodNm]?.수량;
      }
    }

    //열재단
    if (SelectOptions[prodNm]?.열재단) {
      const Fire_Price_Table = priceTable.filter(
        (item) =>
          item.PRICE_OPTION_CATE === "열재단" &&
          item.PRICE_OPTION_NM === SelectOptions[prodNm]?.열재단
      );

      const Fire_Price = filterByQty(
        Fire_Price_Table,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      if (typeof Fire_Price === "number") {
        option_price += Fire_Price * SelectOptions[prodNm]?.수량;
      }
    }

    //거치대
    if (SelectOptions[prodNm]?.거치대) {
      const Holder_Price_Table = priceTable.filter(
        (item) =>
          item.PRICE_OPTION_CATE === "거치대" &&
          item.PRICE_OPTION_NM === SelectOptions[prodNm]?.거치대
      );

      const Holder_Price = filterByQty(
        Holder_Price_Table,
        SelectOptions[prodNm]?.거치대수량
      )?.PRICE_PRICE;

      if (typeof Holder_Price === "number") {
        option_price += Holder_Price * SelectOptions[prodNm]?.거치대수량;
      }
    }
  }
  // ===X배너 끝===

  // ===배너===
  if (prodNm === "현수막") {
    let Imposition =
      (SelectOptions[prodNm]?.가로 * SelectOptions[prodNm]?.세로) / 1000000;

    let Banner_Material = SelectOptions[prodNm]?.소재;

    if (Imposition >= 4 && Banner_Material === "일반현수막") {
      Banner_Material = "일반현수막4회배";
    }

    const Standard_Price_Table = priceTable.filter(
      (item) =>
        item.PRICE_OPTION_CATE === "소재" &&
        item.PRICE_OPTION_NM === Banner_Material
    );

    const Base_Price = filterByQty(
      Standard_Price_Table,
      SelectOptions[prodNm]?.수량
    )?.PRICE_PRICE;

    const Standard_Price = filterByQty(
      Standard_Price_Table,
      SelectOptions[prodNm]?.수량
    )?.PRICE_PRICE;

    if (Imposition < 1) {
      if (
        ["일반현수막", "켈", "켈그레이"].includes(SelectOptions[prodNm]?.소재)
      ) {
        print_price +=
          (Base_Price + 2000) * Imposition * SelectOptions[prodNm]?.수량;
      } else {
        print_price +=
          (Base_Price + 3000) * Imposition * SelectOptions[prodNm]?.수량;
      }
    } else {
      print_price += Standard_Price * Imposition * SelectOptions[prodNm]?.수량;
    }

    //후가공
    if (SelectOptions[prodNm]?.후가공) {
      const Finishing_Price_Table = priceTable.filter(
        (item) =>
          item.PRICE_OPTION_CATE === "후가공" &&
          item.PRICE_OPTION_NM === SelectOptions[prodNm]?.후가공
      );

      const Finishing_Price = filterByQty(
        Finishing_Price_Table,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      if (typeof Finishing_Price === "number") {
        option_price += Finishing_Price * SelectOptions[prodNm]?.수량;
      }
    }

    //열재단
    if (SelectOptions[prodNm]?.열재단) {
      const Fire_Price_Table = priceTable.filter(
        (item) =>
          item.PRICE_OPTION_CATE === "열재단" &&
          item.PRICE_OPTION_NM === SelectOptions[prodNm]?.열재단
      );

      const Fire_Price = filterByQty(
        Fire_Price_Table,
        SelectOptions[prodNm]?.수량
      )?.PRICE_PRICE;

      if (typeof Fire_Price === "number") {
        option_price += Fire_Price * SelectOptions[prodNm]?.수량;
      }
    }
  }
  // ===배너 끝===

  //최종 단가
  const final_price = {
    print: print_price,
    option: option_price,
  };

  return final_price;
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
