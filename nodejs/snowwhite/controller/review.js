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
  const { prod_sid, cate_sid, review_sid, order_sid } = req.body;

  const qry = `
select
	T1.*,
	T2.IMAGE_LOCATION,
	T3.ORDER_CORE_OPTION,
	T4.PROD_NM
from
	TB_REVIEW T1
left outer join TB_PRODUCT_IMAGE T2
  on
	T1.PROD_SID = T2.PROD_SID
left outer join TB_ORDER T3
 on
	T1.PROD_SID = T3.ORDER_CORE_PROD_SID
left outer join TB_PRODUCT T4
 on
	T1.PROD_SID = T4.PROD_SID
  `;

  let where_qry = `
  where
  T2.IMAGE_CATE = 'THUMBNAIL'
  `;

  let order_by = `
  order by T1.REVIEW_SID desc
  `;

  if (prod_sid) {
    where_qry += create_where(where_qry, `T1.PROD_SID = '${prod_sid}'`);
  }
  if (cate_sid) {
    where_qry += create_where(where_qry, `T1.CATE_SID = '${cate_sid}'`);
  }
  if (review_sid) {
    where_qry += create_where(where_qry, `T1.REVIEW_SID = '${cate_sid}'`);
  }
  if (order_sid) {
    where_qry += create_where(where_qry, `T1.ORDER_SID = '${order_sid}'`);
  }

  console.log(order_sid);

  console.log(qry + where_qry + order_by);
  const res_data = await getConnection(qry + where_qry + order_by);
  if (res_data.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_data.row);
};

exports.insert_review = async (req, res) => {
  const {
    order_sid,
    user_id,
    review_title,
    review_content,
    review_star,
    cate_sid,
    prod_sid,
  } = req.body;

  const insert_qry = `
insert
	into
	TB_REVIEW
(
	ORDER_SID,
	USER_ID,
	REVIEW_TITLE,
	REVIEW_CONTENT,
	REVIEW_HIT,
	REVIEW_REGDATE,
	CATE_SID,
	PROD_SID,
	REVIEW_STAR
)
values(
'${order_sid}',
'${user_id}',
'${review_title}',
'${review_content}',
0,
now(),
'${cate_sid}',
${prod_sid},
${review_star}
)
`;

  const update_qry = `
update
  TB_ORDER
set
  ORDER_REVIEW = 'Y'
where
  ORDER_SID = '${order_sid}'
`;

  const res_insert = await getConnection(insert_qry);
  const res_update = await getConnection(update_qry);
  if (res_insert.state === false && res_update.state === false)
    return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};
