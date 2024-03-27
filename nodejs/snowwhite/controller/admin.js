const { getConnection } = require("../utils/dbUtils");

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
