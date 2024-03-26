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
