const { getConnection } = require("../utils/dbUtils");

exports.cate = async (req, res) => {
  const qry = `
  select
	*
  from
	TB_CATEGORY
  `;

  const res_qry = await getConnection(qry);

  return res.status(200).send(res_qry.row);
};
