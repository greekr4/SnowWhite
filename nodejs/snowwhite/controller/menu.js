const { getConnection } = require("../utils/dbUtils");

exports.cate = async (req, res) => {
  const { all } = req.body;

  let qry = ``;
  console.log(all);
  if (all === true) {
    qry = `
  select
    *
  from
    TB_CATEGORY
  WHERE 
    CATE_SID != 99999    
    ORDER BY CATE_PRIORITY
    `;
  } else {
    qry = `
  select
    *
  from
    TB_CATEGORY
  WHERE 
    CATE_SHOW = 1
    AND CATE_SID != 99999
    ORDER BY CATE_PRIORITY

    `;
  }

  const res_qry = await getConnection(qry);

  return res.status(200).send(res_qry.row);
};

exports.subcate = async (req, res) => {
  const qry = `
select
	PROD_CATECODE,
	PROD_SID,
	PROD_NM
from
	TB_PRODUCT
where
	PROD_SHOW = 1
  AND PROD_DELCODE != 1
`;

  const res_qry = await getConnection(qry);

  return res.status(200).send(res_qry.row);
};
