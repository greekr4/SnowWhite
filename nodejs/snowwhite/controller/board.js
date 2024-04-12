const { getConnection, Connection } = require("../utils/dbUtils");

exports.select_board = async (req, res) => {
  const type = req.query.type;

  const qry = `
select
  @ROWNUM := @ROWNUM + 1 as ROWNUM,
  T1.*
from
  TB_BOARD T1,
  (
  select
      @ROWNUM := 0) R
where
  T1.BOARD_TYPE = '${type}'
  AND T1.BOARD_DELETE = 'N'
order by ROWNUM desc
`;

  console.log(qry);

  const res_data = await getConnection(qry);
  return res.status(200).send(res_data.row);
};

exports.insert_board = async (req, res) => {
  const { USER_ID, BOARD_TYPE, BOARD_WRITER, BOARD_TITLE, BOARD_CONTENT } =
    req.body;

  const cnt_qry = `
select
	COUNT(1) as CNT
from
	TB_BOARD
`;

  const res_cnt = await getConnection(cnt_qry);
  console.log(res_cnt);
  const cnt = (parseInt(res_cnt.row[0].CNT) + 1).toString().padStart(8, "0");

  const BOARD_SID = `${BOARD_TYPE}${cnt}`;

  const qry = `
insert
	into
	TB_BOARD
(
    BOARD_SID,
	USER_ID,
	BOARD_WRITER,
	BOARD_TITLE,
	BOARD_CONTENT,
	BOARD_FILE,
	BOARD_HIT,
	BOARD_REGDATE,
	BOARD_TYPE
    )
values(
    '${BOARD_SID}',
    '${USER_ID}',
    '${BOARD_WRITER}',
    '${BOARD_TITLE}',
    '${BOARD_CONTENT}',
    null,
    0,
    now(),
    '${BOARD_TYPE}'
)
`;

  const res_insert = await getConnection(qry);
  if (res_insert.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.update_board = async (req, res) => {
  const { BOARD_TYPE, BOARD_WRITER, BOARD_TITLE, BOARD_CONTENT, BOARD_SID } =
    req.body;

  const qry = `
update
    TB_BOARD
set
    BOARD_TYPE = '${BOARD_TYPE}',
    BOARD_WRITER = '${BOARD_WRITER}',
    BOARD_TITLE = '${BOARD_TITLE}',
    BOARD_CONTENT = '${BOARD_CONTENT}'
where
    BOARD_SID = '${BOARD_SID}'
  `;

  console.log(qry);

  const res_qry = await getConnection(qry);
  if (res_qry.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.delete_board = async (req, res) => {
  const { BOARD_SID } = req.body;
  const qry = `
update
    TB_BOARD  
set
    BOARD_DELETE = 'Y'
where
    BOARD_SID = '${BOARD_SID}' 
  `;

  const res_qry = await getConnection(qry);
  if (res_qry.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};
