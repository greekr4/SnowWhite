const { getConnection, Connection } = require("../utils/dbUtils");

const create_where = (where, value) => {
  console.log(where.indexOf("where"));
  if (where.indexOf("where") === -1) {
    return `where ${value}`;
  } else {
    return ` AND ${value}`;
  }
};

exports.select_review = async (req, res) => {
  const { prod_sid, cate_sid, review_sid } = req.body;

  const qry = `
  select
  T1.*,
  T2.IMAGE_LOCATION
from
  TB_REVIEW T1
left outer join TB_PRODUCT_IMAGE T2
  on
  T1.PROD_SID = T2.PROD_SID
  `;

  let where_qry = `
  where
  T2.IMAGE_CATE = 'THUMBNAIL'
  `;

  if (prod_sid) {
    where_qry += create_where(where_qry, `T1.PROD_SID = ${prod_sid}`);
  }
  if (cate_sid) {
    where_qry += create_where(where_qry, `T1.CATE_SID = ${cate_sid}`);
  }
  if (review_sid) {
    where_qry += create_where(where_qry, `T1.REVIEW_SID = ${cate_sid}`);
  }

  const res_data = await getConnection(qry + where_qry);
  if (res_data.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_data.row);
};
