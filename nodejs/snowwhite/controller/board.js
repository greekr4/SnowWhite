const { getConnection, Connection } = require("../utils/dbUtils");
const { v1: uuidv1 } = require("uuid");

exports.select_board = async (req, res) => {
  const type = req.query.type;

  const qry = `
  select
  @ROWNUM := @ROWNUM + 1 as ROWNUM,
  @ROWNUM := @ROWNUM + 1 as id,
  T1.*,
  CASE WHEN T2.COMMENT_TITLE  is NOT NULL THEN 'Y' ELSE 'N' END AS ANSWER_CK,
  T2.COMMENT_WRITER,
  T2.COMMENT_REGDATE
from
  TB_BOARD T1
       left outer join
     tb_comment T2
     on(T1.BOARD_SID=T2.BOARD_SID)
  ,
  (
  select
      @ROWNUM := 0) R
where
  T1.BOARD_TYPE = '${type}'
  AND T1.BOARD_DELETE = 'N'
order by BOARD_REGDATE desc, ROWNUM desc
`;

  console.log(qry);

  const res_data = await getConnection(qry);
  return res.status(200).send(res_data.row);
};

exports.insert_board = async (req, res) => {
  const {
    USER_ID,
    BOARD_TYPE,
    BOARD_WRITER,
    BOARD_TITLE,
    BOARD_CONTENT,
    BOARD_TEL,
  } = req.body;

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
	BOARD_TYPE,
  BOARD_TEL
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
    '${BOARD_TYPE}',
    '${BOARD_TEL}'
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
    BOARD_CONTENT = '${BOARD_CONTENT}',
    BOARD_MODIDATE = NOW()
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

exports.select_comment = async (req, res) => {
  const { BOARD_SID } = req.query;
  const qry = `
select
	T1.*
from
	TB_COMMENT T1
where
  BOARD_SID = '${BOARD_SID}'
  `;

  const res_data = await getConnection(qry);
  if (res_data.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_data.row);
};

exports.insert_comment = async (req, res) => {
  const { BOARD_SID, USER_ID, COMMENT_WRITER, COMMENT_TITLE, COMMENT_CONTENT } =
    req.body;

  const sid = uuidv1();

  const qry = `
insert
	into
	TB_COMMENT (
  COMMENT_SID,
	BOARD_SID,
	USER_ID,
	COMMENT_WRITER,
	COMMENT_TITLE,
	COMMENT_CONTENT,
	COMMENT_FILE,
	COMMNET_HIT,
	COMMENT_REGDATE,
	COMMENT_MODIDATE,
	COMMENT_DELETE)
values(
'${sid}',
'${BOARD_SID}',
'${USER_ID}',
'${COMMENT_WRITER}',
'${COMMENT_TITLE}',
'${COMMENT_CONTENT}',
null,
null,
now(),
null,
'N'
);`;

  const res_qry = await getConnection(qry);
  if (res_qry.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};
