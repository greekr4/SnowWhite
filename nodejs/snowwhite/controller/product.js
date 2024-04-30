const { getConnection, Connection } = require("../utils/dbUtils");

exports.select_banner = async (req, res) => {
  const { cate, code } = req.query;

  const where = [];

  if (code) {
    where.push(`and BANNER_CODE = ${code}`);
  }

  const qry = `
select
	BANNER_SID as id,
	BANNER_CATE,
	BANNER_CODE,
	BANNER_IMAGE,
  BANNER_PRIORITY
from
	TB_BANNER TB
where 
	BANNER_CATE = ?
	${where.toString()}
order by BANNER_PRIORITY

  `;

  const res_data = await getConnection(qry, [cate, code]);
  if (res_data.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_data.row);
};

exports.select_products_thumbnail = async (req, res) => {
  const { cateid } = req.body;
  const qry = `
select
  T1.PROD_SID,
  T1.PROD_CATECODE ,
  T1.PROD_NM ,
  T1.PROD_DESC,
  T2.IMAGE_LOCATION
from
  TB_PRODUCT T1
left outer join TB_PRODUCT_IMAGE T2
on
  T1.PROD_SID = T2.PROD_SID
where
  T2.IMAGE_CATE = 'thumbnail'
  and
  T1.PROD_CATECODE = ?
  and
  T1.PROD_DELCODE = 0
`;

  const res_data = await getConnection(qry, [cateid]);
  if (res_data.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_data.row);
};

exports.select_products_detail = async (req, res) => {
  const { prod_sid } = req.body;
  // * 수정해야함
  const qry = `
select
	T1.*
from
	TB_PRODUCT T1
where
	T1.PROD_SID = ?
  `;

  const res_data = await getConnection(qry, [prod_sid]);
  if (res_data.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_data.row[0]);
};

exports.select_products_images = async (req, res) => {
  const { prod_sid } = req.body;
  // * 수정해야함
  const qry = `
select
	*
from
	TB_PRODUCT_IMAGE
where 
	IMAGE_CATE = 'DETAIL'
	and 
	PROD_SID = ?
order by
	IMAGE_PRIORITY asc
  `;

  const res_data = await getConnection(qry, [prod_sid]);
  if (res_data.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_data.row);
};

exports.select_products_options = async (req, res) => {
  const { prod_sid } = req.body;
  // * 수정해야함
  const qry = `
select
	*
from
	TB_OPTION T1
inner join TB_PRODUCT_OPTION T2
	on
	T1.OPTION_SID = T2.OPTION_SID
where
	PROD_SID = ?
  AND OPTION_DELETE = 'N'
  `;

  const res_data = await getConnection(qry, [prod_sid]);
  if (res_data.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_data.row);
};

exports.select_cart = async (req, res) => {
  const { userid } = req.body;
  // * 수정해야함
  const qry = `
select
	T1.*,
	T2.*,
	T3.*,
	T4.*
from
	TB_CART T1
inner join TB_CUSTOM_PROD T2
on
	T1.ITEM_SID = T2.ITEM_SID
left outer join TB_PRODUCT T3
on
	T2.PROD_SID = T3.PROD_SID
left outer join (
	select
		PROD_SID,
		IMAGE_LOCATION
	from
		TB_PRODUCT_IMAGE
	where
		IMAGE_CATE = 'THUMBNAIL') T4
on
	T4.PROD_SID = T3.PROD_SID
where
	T1.USER_ID = ?
  AND T1.CART_STATUS = 1
order by T1.CART_REGDATE DESC
`;

  const res_data = await getConnection(qry, [userid]);

  if (res_data.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_data.row);
};

exports.insert_custom_prod_and_cart = async (req, res) => {
  const {
    // ITEM_SID,
    PROD_SID,
    ITEM_OPTION,
    ITEM_QUANTITY,
    ITEM_AMOUNT,
    ITEM_DESIGN,
    USER_ID,
    ITEM_FILE_LOCATION,
    // CART_SID,
  } = req.body;
  let conn;

  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const select_cnt_qry = `
  select
    COUNT(1) as CNT
  from 
    TB_CART
  where
    CART_REGDATE like '${year}-${month}-${day}%'
    AND USER_ID = '${USER_ID}'
  `;

  const cnt = await getConnection(select_cnt_qry);
  if (cnt.state === false) return res.status(401).send("DB Error.");
  const seq = (parseInt(cnt.row[0].CNT) + 1).toString().padStart(8, "0");

  const ITEM_SID = `${USER_ID}-${year}-${month}-${day}-${seq}`;
  const CART_SID = `${USER_ID}-${year}-${month}-${day}-${seq}`;

  try {
    conn = await Connection();

    await conn.beginTransaction();
    const qry1 = `
    INSERT INTO TB_CUSTOM_PROD (
      ITEM_SID,
      PROD_SID,
      ITEM_OPTION,
      ITEM_QUANTITY,
      ITEM_AMOUNT,
      ITEM_REGDATE,
      ITEM_MODIDATE,
      ITEM_DESIGN,
      USER_ID,
      ITEM_FILE_LOCATION
  ) VALUES (
      ?,
      ?,
      ?,
      ?,
      ?,
      NOW(),
      NOW(),
      ?,
      ?,
      '${ITEM_FILE_LOCATION}'
  )`;
    const qry2 = `
    INSERT INTO tb_cart (
      CART_SID,
      ITEM_SID,
      USER_ID,
      CART_STATUS,
      CART_REGDATE,
      CART_MODIDATE
  ) VALUES (
      ?,
      ?,
      ?,
      '1',
      NOW(),
      NOW()
  )
  `;

    await conn.query(qry1, [
      ITEM_SID,
      PROD_SID,
      ITEM_OPTION,
      ITEM_QUANTITY,
      ITEM_AMOUNT,
      ITEM_DESIGN,
      USER_ID,
    ]);
    await conn.query(qry2, [CART_SID, ITEM_SID, USER_ID]);

    // 모든 쿼리가 성공했으므로 트랜잭션 커밋
    await conn.commit();

    console.log("All queries executed successfully");
    res.status(200).send("All queries executed successfully");
  } catch (error) {
    if (conn) {
      await conn.rollback();
    }
    console.error("Error executing queries:", error);
    res.status(500).send("Error executing queries");
  } finally {
    // 커넥션 반환
    if (conn) {
      conn.release();
    }
  }
};

/**
 * 장바구니 삭제
 * TB_CART만 삭제하고 TB_CUSTOM_PROD는 남김
 */

exports.delete_cart = async (req, res) => {
  const { cart_sid } = req.body;
  const qry = `
  DELETE
  FROM
    TB_CART
  WHERE
    CART_SID IN (?)
  `;
  console.log(qry);
  const res_delete = await getConnection(qry, [cart_sid]);
  if (res_delete.state === false) return res.status(401).send("DB Error.");
  if (res_delete.row.affectedRows == 0)
    return res.status(401).send("삭제할 게 없음");
  console.log(res_delete);

  return res.status(200).send("OK");
};

exports.select_order = async (req, res) => {
  const { item_sid } = req.body;
  // * 수정해야함
  const qry = `
select
	T1.*,
	T2.*,
	T3.*,
	T4.*
from
	TB_CART T1
inner join TB_CUSTOM_PROD T2
on
	T1.ITEM_SID = T2.ITEM_SID
left outer join TB_PRODUCT T3
on
	T2.PROD_SID = T3.PROD_SID
left outer join (
	select
		PROD_SID,
		IMAGE_LOCATION
	from
		TB_PRODUCT_IMAGE
	where
		IMAGE_CATE = 'THUMBNAIL') T4
on
	T4.PROD_SID = T3.PROD_SID
where
	T1.ITEM_SID IN (?)
  AND T1.CART_STATUS = 1
order by ITEM_REGDATE desc
`;

  const res_data = await getConnection(qry, [item_sid]);

  if (res_data.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_data.row);
};

exports.select_paper = async (req, res) => {
  const { PROD_SID } = req.query;

  const qry = `
select
	*
from
	TB_PAPER
where
	PROD_SID = '${PROD_SID}'  
order by PAPER_PRIORITY
  `;

  const res_data = await getConnection(qry);

  if (res_data.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_data.row);
};
