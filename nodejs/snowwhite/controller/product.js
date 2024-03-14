const { getConnection } = require("../utils/dbUtils");

exports.select_banner = async (req, res) => {
  const { cate, code } = req.body;
  const qry = `
select
	BANNER_SID,
	BANNER_CATE,
	BANNER_CODE,
	BANNER_IMAGE
from
	TB_BANNER TB
where 
	BANNER_CATE = ?
	and BANNER_CODE = ?
  `;

  const res_data = await getConnection(qry, [cate, code]);
  if (res_data.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_data.row[0]);
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
	*
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
  `;

  const res_data = await getConnection(qry, [prod_sid]);
  if (res_data.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_data.row);
};
