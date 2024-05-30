const { getConnection } = require("../utils/dbUtils");

exports.calcPrice = async (req, res) => {
  const {
    PAPER_PRICE_NM,
    PAPER_PRICE_WEIGHT,
    UNIT_PRICE_CATE,
    UNIT_PRICE_UNIT,
    SIZE_PRICE_NM,
    PRINT_TYPE,
    QTY,
  } = req.query;

  //종이 종류 (백상지,일반지,고급지)
  //종이 평량
  //종이 사이즈 (A3/B4,A4/B5,A5/B6,A6,105*148)
  //인쇄 방식 (단면 = 50,양면 = 100)
  //카테고리 (책자내지,홍보물)
  //주문 단위 (n장)

  const qry = `
select
  PAPER_PRICE_PRICE
from
  TB_PAPER_PRICE
where
  PAPER_PRICE_NM = '${PAPER_PRICE_NM}'
  and PAPER_PRICE_WEIGHT = ${PAPER_PRICE_WEIGHT}
  `;

  const qry2 = `
select
	UNIT_PRICE_MULTI
from
	TB_UNIT_PRICE
where
	UNIT_PRICE_CATE = '${UNIT_PRICE_CATE}'
	and UNIT_PRICE_UNIT = '${UNIT_PRICE_UNIT}'
  `;

  const qry3 = `
select
  SIZE_PRICE_MULTI
from
  TB_SIZE_PRICE
where
  SIZE_PRICE_NM = '${SIZE_PRICE_NM}'
  `;

  const res_qry = await getConnection(qry);
  const res_qry2 = await getConnection(qry2);
  const res_qry3 = await getConnection(qry3);

  if (res_qry.state === false) return res.status(401).send("DB Error.");
  if (res_qry2.state === false) return res.status(401).send("DB Error.");
  if (res_qry3.state === false) return res.status(401).send("DB Error.");

  const mainPrice = res_qry.row[0].PAPER_PRICE_PRICE;

  const A4Price = mainPrice / 4000;
  const A4Price_single = A4Price + 50;
  const A4Price_double = A4Price + 100;
  const UNIT_PRICE_MULTI = res_qry2.row[0].UNIT_PRICE_MULTI;
  const SIZE_PRICE_MULTI = res_qry3.row[0].SIZE_PRICE_MULTI;

  if (PRINT_TYPE === "single") {
    const final_price =
      Math.round(
        (UNIT_PRICE_MULTI * A4Price_single * SIZE_PRICE_MULTI * QTY) / 10
      ) * 10;
    return res.status(200).json({ final_price });
  } else if (PRINT_TYPE === "double") {
    const final_price =
      Math.round(
        (UNIT_PRICE_MULTI * A4Price_double * SIZE_PRICE_MULTI * (QTY / 2)) / 10
      ) * 10;

    return res.status(200).json({ final_price });
  }

  /////

  return res.status(200).send("OK");
};
