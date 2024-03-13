const jwt = require("jsonwebtoken");
const {
  makeToken,
  makeRefreshToken,
  refreshVerify,
  verify,
} = require("../utils/authMiddleware");
const { getConnection } = require("../utils/dbUtils");

/**
 * 로그인
 *
 */
exports.login = async (req, res) => {
  const { userid, userpw } = req.body;

  const SelectUser = (userid) => {
    return `select USER_ID,USER_PW from tb_user where USER_ID = '${userid}';`;
  };

  const InsertToken = (token) => {
    return `insert into tb_token values(?, ?) ON DUPLICATE KEY UPDATE token='${token}';`;
  };

  const res_id = await getConnection(SelectUser(userid));

  // DB에러
  if (res_id.state === false) return res.status(401).send("DB Error.");
  // 아이디 없음
  if (res_id.row.length === 0) return res.status(401).send("ID Error");
  // 비밀번호 불일치
  if (res_id.row[0].USER_PW != userpw) return res.status(401).send("PW Error");

  const accessToken = makeToken(userid);
  const refreshToken = makeRefreshToken();

  const res_insert = await getConnection(InsertToken(refreshToken), [
    userid,
    refreshToken,
  ]);

  if (res_insert.state === false) return resstatus(401).send("DB Error.");

  return res.status(200).send({ userid, accessToken, refreshToken });
};

/**
 * 리프레시토큰
 *
 */
exports.refresh = async (req, res) => {
  if (req.headers["authorization"] && req.headers["refresh"]) {
    const accessToken = req.headers["authorization"];
    const refreshToken = req.headers["refresh"];

    const authResult = verify(accessToken);
    const decoded = jwt.decode(accessToken);
    // 디코딩 결과가 없으면 권한이 없음을 응답.
    if (!decoded) {
      res.status(401).send(failResponse(401, "권한 없음!"));
    }

    // access 토큰 만료 시
    if (authResult.ok === false && authResult.message === "jwt expired") {
      // 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인해야합니다.
      const refreshResult = await refreshVerify(refreshToken, decoded.userid);
      if (refreshResult === false) {
        res
          .status(401)
          .send(failResponse(401, "No authorized! 다시 로그인해주세요."));
      } else {
        // 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급
        const newAccessToken = makeToken(decoded.userid);
        res.status(200).send(
          successResponse(200, {
            accessToken: newAccessToken,
            refreshToken,
          })
        );
      }
    } else {
      // 3. access token이 만료되지 않은경우 => refresh 할 필요가 없습니다.
      res.status(400).send(failResponse(400, "refresh할 필요가 없습니다."));
    }
  } else {
    // access token 또는 refresh token이 헤더에 없는 경우
    res.status(401).send(failResponse(401, "헤더에 없음"));
  }
};

const successResponse = (code, data) => {
  return {
    code: code,
    data: data,
  };
};

const failResponse = (code, message) => {
  return {
    code: code,
    message: message,
  };
};

/**
 * 유저 인포
 *
 */
exports.userinfo = async (req, res) => {
  const userid = req.decoded.userid;
  const SelectUserInfo = `
  select
	T1.USER_ID,
	T1.USER_NM,
	T1.USER_TEL0,
	T1.USER_TEL1,
	T1.USER_POINT,
	T1.USER_GRADE,
	T2.DELI_ADDRESS,
	T2.DELI_POSTCODE,
  CASE WHEN T2.DELI_ADD_ADDRESS IS NULL THEN '' ELSE T2.DELI_ADD_ADDRESS END AS DELI_ADD_ADDRESS
from
	TB_USER T1
left outer join TB_DELIVERY_ADDRESS T2 on
	T1.DELI_CODE = T2.DELI_CODE
where
	T1.USER_ID = '${userid}'
  `;
  const res_userinfo = await getConnection(SelectUserInfo);
  if (res_userinfo.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_userinfo.row[0]);
};

exports.delivery = async (req, res) => {
  const { userid } = req.body;
  const qry = `
select
	DELI_CODE,
	DELI_ADDRESS,
  DELI_ADD_ADDRESS,
  DELI_POSTCODE,
	DELI_TEL0,
	DELI_TEL1,
	DELI_NM ,
	DELI_REC
from
	TB_DELIVERY_ADDRESS
where
	USER_ID = '${userid}'
  `;

  const res_delivery = await getConnection(qry);
  if (res_delivery.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_delivery.row);
};

/**
 * 회원가입
 *
 */
exports.join = async (req, res) => {
  const { userid, userpw, usernm } = req.body;

  const selectUser = `SELECT (1) FROM TB_USER WHERE USER_ID = '${userid}'`;
  const res_id = await getConnection(selectUser);

  if (res_id.row.length != 0) return res.status(401).send("ID 중복");

  const insertUser = `INSERT INTO tb_user (user_id, user_pw, user_nm) VALUES (?, ?, ?)`;
  const res_insert = await getConnection(insertUser, [userid, userpw, usernm]);

  if (res_insert.state === false) return res.status(401).send("DB Error.");

  return res.status(200).send("OK");
};

/**
 * 배송지 추가
 *
 */

exports.insert_delivery = async (req, res) => {
  const {
    userid,
    delinm,
    delirec,
    deliaddress,
    deliaddaddress,
    delipostcode,
    delitel,
  } = req.body;
  const qry = `
INSERT
	INTO
	TB_DELIVERY_ADDRESS (
	USER_ID,
	DELI_NM,
	DELI_REC,
	DELI_ADDRESS,
  DELI_ADD_ADDRESS,
	DELI_POSTCODE,
	DELI_TEL0
	)
VALUES (
?,
?,
?,
?,
?,
?,
?
)
`;
  const res_insert = await getConnection(qry, [
    userid,
    delinm,
    delirec,
    deliaddress,
    deliaddaddress,
    delipostcode,
    delitel,
  ]);
  if (res_insert.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

/**
 * 배송지 수정
 *
 */

exports.update_delivery = async (req, res) => {
  const {
    delicode,
    delinm,
    delirec,
    deliaddress,
    deliaddaddress,
    delipostcode,
    delitel,
  } = req.body;
  const qry = `
UPDATE
	TB_DELIVERY_ADDRESS 
SET
  DELI_NM = ?,
  DELI_REC = ?,
  DELI_ADDRESS = ?,
  DELI_ADD_ADDRESS = ?,
  DELI_POSTCODE = ?,
  DELI_TEL0 = ?
WHERE
DELI_CODE = ?
`;
  const res_update = await getConnection(qry, [
    delinm,
    delirec,
    deliaddress,
    deliaddaddress,
    delipostcode,
    delitel,
    delicode,
  ]);
  if (res_update.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

/**
 * 배송지 삭제
 *
 */

exports.delete_delivery = async (req, res) => {
  const { delicode } = req.body;
  const qry = `
  DELETE
  FROM
    TB_DELIVERY_ADDRESS
  WHERE
    DELI_CODE = ?
  `;
  console.log(qry);
  const res_delete = await getConnection(qry, [delicode]);
  if (res_delete.state === false) return res.status(401).send("DB Error.");
  if (res_delete.row.affectedRows == 0)
    return res.status(401).send("삭제할 게 없음");
  console.log(res_delete);

  return res.status(200).send("OK");
};

/**
 * 기본 배송지 설정
 * update tb_user.deli_code
 */

exports.default_deli = async (req, res) => {
  const { delicode, userid } = req.body;
  const qry = `
  update
	TB_USER
set
	DELI_CODE = ?
where
	USER_ID = ?
  `;

  const res_update = await getConnection(qry, [delicode, userid]);
  if (res_update.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send("OK");
};

exports.auth_pw = async (req, res) => {
  const { userid, authpw } = req.body;
  const qry = `
select
  USER_PW
from
  TB_USER
where
  USER_ID = ?
  `;
  const res_row = await getConnection(qry, [userid]);
  if (res_row.state === false) return res.status(401).send("DB Error.");
  if (res_row.row[0].USER_PW != authpw)
    return res.status(401).send("PW Error.");
  console.log(res_row);
  if (res_row.row[0].USER_PW === authpw) return res.status(200).send("OK");
};

exports.update_user = async (req, res) => {
  const { userid, userpw, usertel0, usertel1 } = req.body;
  const qry = `
  update
	TB_USER
set
	USER_PW = ?,
	USER_TEL0 = ?,
	USER_TEL1 = ?
where
	USER_ID = ?
  `;

  const res_update = await getConnection(qry, [
    userpw,
    usertel0,
    usertel1,
    userid,
  ]);
  if (res_update.state === false) return res.status(401).send("DB Error.");
  if (res_update.row.affectedRows === 0)
    return res.status(401).send("DB Error.");
  console.log(res_update);
  res.status(200).send("OK");
};
