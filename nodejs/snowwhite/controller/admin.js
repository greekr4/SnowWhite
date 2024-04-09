const { getConnection, Connection } = require("../utils/dbUtils");

exports.select_admin_prods = async (req, res) => {
  const qry = `
  select
  T1.*,
  T2.*,
  T3.*
from
  TB_PRODUCT T1
left outer join TB_PRODUCT_IMAGE T2
on
  T1.PROD_SID = T2.PROD_SID
  inner join tb_category T3
  on
  T1.PROD_CATECODE  = T3.CATE_SID 
where
  T2.IMAGE_CATE = 'THUMBNAIL'
  AND
  T1.PROD_DELCODE = '0'
order by
  T1.PROD_SID desc
    `;

  const res_qry = await getConnection(qry);

  return res.status(200).send(res_qry.row);
};

exports.select_admin_prod_detail = async (req, res) => {
  const { prod_sid } = req.body;

  const qry = `
    select
    T1.*,
    T2.*,
    T3.*
  from
    TB_PRODUCT T1
  left outer join TB_PRODUCT_IMAGE T2
  on
    T1.PROD_SID = T2.PROD_SID
    inner join tb_category T3
    on
    T1.PROD_CATECODE  = T3.CATE_SID 
  where
    T2.IMAGE_CATE = 'THUMBNAIL' AND T1.PROD_SID = ?
  order by
    T1.PROD_SID desc
   
      `;

  const res_qry = await getConnection(qry, [prod_sid]);

  return res.status(200).send(res_qry.row[0]);
};

exports.select_admin_options = async (req, res) => {
  const qry = `
  select
  *
from
  TB_OPTION
order by
  OPTION_SID
      `;

  const res_qry = await getConnection(qry);

  return res.status(200).send(res_qry.row);
};

exports.select_admin_prod_options = async (req, res) => {
  const { prod_sid } = req.body;
  const qry = `
select
	*
from
	TB_PRODUCT_OPTION
where
	PROD_SID = ?
order by
	OPTION_SID
        `;

  const res_qry = await getConnection(qry, [prod_sid]);

  return res.status(200).send(res_qry.row);
};

exports.select_admin_prod_detail_images = async (req, res) => {
  const { prod_sid } = req.body;
  const qry = `
select
	*
from
	TB_PRODUCT_IMAGE
where
	IMAGE_CATE = 'DETAIL'
	and PROD_SID = ?
    `;

  const res_qry = await getConnection(qry, [prod_sid]);

  return res.status(200).send(res_qry.row);
};

exports.insert_products_images_detail = async (req, res) => {
  const { prod_sid, image_location } = req.body;

  const priority_qry = `
select
	max(IMAGE_PRIORITY) as value
from
	TB_PRODUCT_IMAGE TPI
where
	PROD_SID = ?
`;

  const res_priority = await getConnection(priority_qry, [prod_sid]);

  const priority = res_priority.row[0].value;
  const qry = `
insert
	into
	TB_PRODUCT_IMAGE
(
  PROD_SID,
	IMAGE_LOCATION,
	IMAGE_PRIORITY,
	IMAGE_CATE)
values(
?,
?,
?,
'detail'
);
  `;

  const res_insert = await getConnection(qry, [
    prod_sid,
    image_location,
    parseInt(priority) + 1,
  ]);
  if (res_insert.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.delete_products_images = async (req, res) => {
  const { prod_sid, image_location, image_priority, image_cate } = req.body;

  const qry = `
delete
from
	SNOWDB.TB_PRODUCT_IMAGE
where
	PROD_SID = ?
	and IMAGE_LOCATION = ?
	and IMAGE_PRIORITY = ?
	and IMAGE_CATE = ?
  `;

  const res_delete = await getConnection(qry, [
    prod_sid,
    image_location,
    image_priority,
    image_cate,
  ]);

  if (res_delete.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.update_products_cate = async (req, res) => {
  const { prod_sid, prod_catecode } = req.body;

  const qry = `
update
	TB_PRODUCT
set
	PROD_CATECODE = ?
where
	PROD_SID = ?
`;

  const res_update = await getConnection(qry, [prod_catecode, prod_sid]);
  if (res_update.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.update_products_priority = async (req, res) => {
  const { prod_sid, prod_priority } = req.body;

  const qry = `
update
	TB_PRODUCT
set
	PROD_PRIORITY = ?
where
	PROD_SID = ?
  `;
  const res_update = await getConnection(qry, [prod_priority, prod_sid]);
  if (res_update.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.update_products_nm = async (req, res) => {
  const { prod_sid, prod_nm } = req.body;

  const qry = `
update
	TB_PRODUCT
set
	PROD_NM = ?
where
	PROD_SID = ?
  `;
  const res_update = await getConnection(qry, [prod_nm, prod_sid]);
  if (res_update.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.update_products_thumnail = async (req, res) => {
  const { prod_sid, image_location } = req.body;

  const qry = `
update
	TB_PRODUCT_IMAGE
set
	IMAGE_LOCATION = ?
where
	PROD_SID = ?
	and IMAGE_CATE = 'THUMBNAIL'
  `;

  const res_update = await getConnection(qry, [image_location, prod_sid]);
  if (res_update.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.update_products_desc = async (req, res) => {
  const { prod_sid, prod_desc } = req.body;

  const qry = `
update
	TB_PRODUCT
set
	PROD_DESC = ?
where
	PROD_SID = ?
  `;

  const res_update = await getConnection(qry, [prod_desc, prod_sid]);
  if (res_update.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.update_products_detail = async (req, res) => {
  const { prod_sid, prod_detail } = req.body;

  const qry = `
update
	TB_PRODUCT
set
	PROD_DETAIL = ?
where
	PROD_SID = ?
  `;

  const res_update = await getConnection(qry, [prod_detail, prod_sid]);
  if (res_update.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.update_products_noti = async (req, res) => {
  const { prod_sid, prod_noti } = req.body;

  const qry = `
update
	TB_PRODUCT
set
	PROD_NOTI = ?
where
	PROD_SID = ?
  `;

  const res_update = await getConnection(qry, [prod_noti, prod_sid]);
  if (res_update.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.update_products_price = async (req, res) => {
  const { prod_sid, prod_price, prod_unit, prod_quantity } = req.body;

  const qry = `
update
	TB_PRODUCT
set
	PROD_PRICE = ?,
  PROD_UNIT = ?,
  PROD_QUANTITY = ?

where
	PROD_SID = ?
  `;

  const res_update = await getConnection(qry, [
    prod_price,
    prod_unit,
    prod_quantity,
    prod_sid,
  ]);
  if (res_update.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.update_products_options = async (req, res) => {
  const { prod_sid, options } = req.body;
  let conn;

  try {
    conn = await Connection();

    await conn.beginTransaction();
    const qry1 = `
  delete
    from
      TB_PRODUCT_OPTION
    where
      PROD_SID = ?
  `;
    const qry2 = `
  insert
    into
    TB_PRODUCT_OPTION
  (
  OPTION_SID,
    PROD_SID
  )
  values(
    ?,
    ?
  )
  `;

    await conn.query(qry1, [prod_sid]);

    for (const option of options) {
      await conn.query(qry2, [option, prod_sid]);
    }

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

exports.update_products_content = async (req, res) => {
  const { prod_sid, prod_content } = req.body;

  const qry = `
update
	TB_PRODUCT
set
  PROD_CONTENT = ?
where
	PROD_SID = ?
  `;

  const res_update = await getConnection(qry, [prod_content, prod_sid]);
  if (res_update.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.insert_products_dummy = async (req, res) => {
  let conn;

  try {
    conn = await Connection();

    await conn.beginTransaction();
    const qry1 = `
    insert
    into
    SNOWDB.TB_PRODUCT
  (
    PROD_CATECODE,
    PROD_NM,
    PROD_PRICE,
    PROD_HIT,
    PROD_SALES,
    PROD_DESC,
    PROD_SHOW,
    PROD_REGDATE,
    PROD_MODIDATE,
    PROD_DETAIL,
    PROD_NOTI,
    PROD_QUANTITY,
    PROD_DESIGN,
    PROD_UNIT,
    PROD_STANDARD,
    PROD_DO,
    PROD_PRIORITY,
    PROD_CONTENT,
    PROD_DELCODE
    )
  values(
  '99999',
  '더미데이터',
  null,
  0,
  0,
  null,
  0,
  Now(),
  Now(),
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  0
  )
  `;
    const qry2 = `
    insert
    into
    TB_PRODUCT_IMAGE (PROD_SID,
    IMAGE_LOCATION,
    IMAGE_PRIORITY,
    IMAGE_CATE)
  select
    PROD_SID,
    '/ASSERTS/PRODUCTS/NOIMG.PNG',
    0,
    'THUMBNAIL'
  from
    TB_PRODUCT
  where
    PROD_SID not in (
    select
      PROD_SID
    from
      TB_PRODUCT_IMAGE
    where
      IMAGE_CATE = 'THUMBNAIL'
      )
  `;

    await conn.query(qry1);

    await conn.query(qry2);

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

exports.update_products_delcode = async (req, res) => {
  const { prod_sids } = req.body;

  const qry = `
UPDATE
	TB_PRODUCT
SET
	PROD_DELCODE = 1
WHERE
	PROD_SID IN (?)
  `;

  const res_update = await getConnection(qry, [prod_sids]);
  if (res_update.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.update_category_priority = async (req, res) => {
  const { cate_priority, cate_sid } = req.body;

  const qry = `
update
	TB_CATEGORY
set
	CATE_PRIORITY = ?
where
	CATE_SID = ?
  `;

  for (let index = 0; index < cate_priority.length; index++) {
    const res_update = await getConnection(qry, [
      cate_priority[index],
      cate_sid[index],
    ]);
    if (res_update.state === false) return res.status(401).send("DB Error.");
  }

  return res.status(200).send("OK");
};

exports.update_category_show = async (req, res) => {
  const { cate_show, cate_sid } = req.body;
  const qry = `
update
	TB_CATEGORY
set
	CATE_SHOW = ?
where
	CATE_SID = ?
  `;
  const res_update = await getConnection(qry, [cate_show, cate_sid]);
  if (res_update.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.insert_category = async (req, res) => {
  const select_qry = `
select
	MAX(CATE_PRIORITY) as LAST_CATE_PRIORITY ,
	MAX(CATE_SID) as LAST_CATE_SID
from
	TB_CATEGORY TC
where
  CATE_SID != 99999
`;

  const res_select = await getConnection(select_qry);
  const priority = res_select.row[0].LAST_CATE_PRIORITY + 1;
  const sid = parseInt(res_select.row[0].LAST_CATE_SID) + 100;
  const insert_qry = `
insert
	into
	TB_CATEGORY
(CATE_SID,
	CATE_NM,
	CATE_PID,
	CATE_LINK,
	CATE_SHOW,
	CATE_PRIORITY)
values(
?,
'더미',
null,
null,
0,
?
)
`;

  const res_insert = await getConnection(insert_qry, [sid, priority]);
  if (res_insert.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.delete_category = async (req, res) => {
  const { cate_sid } = req.body;
  const qry = `
delete
  from
    TB_CATEGORY
  where
    CATE_SID = ?
  `;

  console.log(qry);
  const res_delete = await getConnection(qry, [cate_sid]);
  if (res_delete.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.cate_modify = async (req, res) => {
  const { cate_sid, cate_nm } = req.body;
  const updateField = [];
  if (cate_nm) {
    updateField.push(`CATE_NM = '${cate_nm}'`);
  }

  const qry = `
update
	TB_CATEGORY
set
	${updateField.join(",")}
where
  CATE_SID = ${cate_sid}
`;
  console.log(qry);
  const res_update = await getConnection(qry);
  if (res_update.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.select_admin_orderlist = async (req, res) => {
  const qry = `
select
	*
from
	TB_ORDER
order by ORDER_DATE desc
  `;

  const res_data = await getConnection(qry);
  if (res_data.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_data.row);
};

exports.update_order_status = async (req, res) => {
  const { field, order_sid, order_status } = req.body;

  const fields = [];

  if (field.indexOf("ORDER_STATUS") != -1) {
    fields.push(` ORDER_STATUS = ${order_status}\r\n `);
  }

  const qry = `
update
	TB_ORDER
set
${fields.toString()}
where
	ORDER_SID in (?)
  `;

  console.log(qry);
  const res_update = await getConnection(qry, [order_sid]);
  if (res_update.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};
