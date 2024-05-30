const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const logger = require("../../winston/logger");

const {
  makeToken,
  makeRefreshToken,
  refreshVerify,
  verify,
  auth,
} = require("../utils/authMiddleware");
const { getConnection, Connection } = require("../utils/dbUtils");
const { sendMail } = require("./mail");

/**
 * 로그인
 *
 */
exports.login = async (req, res) => {
  logger.info("login");
  const { userid, userpw } = req.body;
  const incode_pw = crypto.createHash("sha512").update(userpw).digest("base64");
  const SelectUser = (userid) => {
    return `select USER_ID,USER_PW from tb_user where USER_ID = '${userid}';`;
  };

  const InsertToken = (token) => {
    return `insert into tb_token values(?, ?) ON DUPLICATE KEY UPDATE token='${token}';`;
  };

  const UpdateCount = (userid) => {
    return `
  update
    TB_USER
  set
    LOGIN_CNT = LOGIN_CNT + 1
  where
    USER_ID = '${userid}'
    `;
  };

  const res_id = await getConnection(SelectUser(userid));

  // DB에러
  if (res_id.state === false) return res.status(401).send("DB Error.");
  // 아이디 없음
  if (res_id.row.length === 0) return res.status(201).send("ID Error");
  // 비밀번호 불일치
  if (res_id.row[0].USER_PW != incode_pw)
    return res.status(201).send("PW Error");

  const accessToken = makeToken(userid);
  const refreshToken = makeRefreshToken();

  const res_insert = await getConnection(InsertToken(refreshToken), [
    userid,
    refreshToken,
  ]);

  const res_update = await getConnection(UpdateCount(userid));

  if (res_insert.state === false && res_update.state)
    return resstatus(401).send("DB Error.");

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
  T2.DELI_TEL0,
  T2.DELI_REC,
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

  const incode_pw = crypto.createHash("sha512").update(userpw).digest("base64");
  const selectUser = `SELECT (1) FROM TB_USER WHERE USER_ID = '${userid}'`;
  const res_id = await getConnection(selectUser);

  if (res_id.row.length != 0) return res.status(401).send("ID 중복");

  const insertUser = `INSERT INTO tb_user (user_id, user_pw, user_nm) VALUES (?, ?, ?)`;
  const res_insert = await getConnection(insertUser, [
    userid,
    incode_pw,
    usernm,
  ]);

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
    DELI_CODE IN (?)
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

exports.insert_order = async (req, res) => {
  const {
    userId,
    userTel,
    userEmail,
    item_sids,
    orderAmount,
    orderReceiver,
    orderTel,
    orderPostcode,
    orderAddress,
    orderAddAddress,
    orderReq,
    radioValue,
    order_core_prod,
    order_core_option,
    orderNm,
    pgOrderId,
    pgPaymentKey,
    pgPaymentType,
    pgPaymentAmount,
    orderStatus,
    ORDER_CORE_PROD_SID,
    ORDER_CORE_PROD_CATECODE,
  } = req.body;

  const item_sids_array = item_sids.split(",");

  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const select_cnt_qry = `
select
	COUNT(1) as CNT
from 
	TB_ORDER
where
	ORDER_DATE like '${year}-${month}-${day}%'
`;

  const cnt = await getConnection(select_cnt_qry);
  if (cnt.state === false) return res.status(401).send("DB Error.");
  const seq = (parseInt(cnt.row[0].CNT) + 1).toString().padStart(8, "0");

  const order_sid = `${year}${month}${day}-${seq}`;

  const insert_order_qry = `
  insert
	into
	TB_ORDER
(
  ORDER_SID,
	USER_ID,
	ITEM_SIDS,
	ORDER_DATE,
	ORDER_AMOUNT,
	ORDER_STATUS,
	ORDER_REC,
	REC_TEL,
	ORDER_POSTCODE,
	ORDER_ADDRESS,
	ORDER_ADD_ADDRESS,
	ORDER_REQ,
	ORDER_PAYMENT_TYPE,
  ORDER_CORE_PROD,
  ORDER_CORE_OPTION,
  ORDER_NM,
  ORDER_TEL,
  PG_ORDERID,
  PG_PAYMENT_KEY,
  PG_PAYMENT_TYPE,
  PG_PAYMENT_AMOUNT,
  ORDER_CORE_PROD_SID,
  ORDER_CORE_PROD_CATECODE
  ${orderStatus === 2 ? `,ORDER_PAYMENT_DATE` : ""}
  )
values(
'${order_sid}',
'${userId}',
'${item_sids}',
NOW(),
${orderAmount},
${orderStatus},
'${orderReceiver}',
'${orderTel}',
'${orderPostcode}',
'${orderAddress}',
'${orderAddAddress}',
'${orderReq}',
'${radioValue}',
'${order_core_prod}',
'${order_core_option}',
'${orderNm}',
'${userTel}',
'${pgOrderId}',
'${pgPaymentKey}',
'${pgPaymentType}',
'${pgPaymentAmount}',
'${ORDER_CORE_PROD_SID}',
'${ORDER_CORE_PROD_CATECODE}'
${orderStatus === 2 ? `,NOW()` : ""}
)
  `;

  const update_cart_qry = `
update
	TB_CART
set
	CART_STATUS = 2,
  CART_MODIDATE = NOW()
where
	ITEM_SID IN (?)
  `;

  let conn;

  try {
    conn = await Connection();

    await conn.beginTransaction();

    await conn.query(update_cart_qry, [item_sids_array]);
    await conn.query(insert_order_qry);
    await conn.commit();
    res.status(200).send("All queries executed successfully");
  } catch (error) {
    if (conn) {
      await conn.rollback();
    }
    console.error("Error executing queries:", error);
    res.status(500).send("Error executing queries");
  } finally {
    // 커넥션 반환
    if (conn) {
      conn.release();
    }
  }
};

exports.select_orderlist = async (req, res) => {
  const { userid } = req.body;
  const qry = `
select
	*
from
	TB_ORDER
where
	USER_ID = '${userid}'
order by ORDER_DATE DESC
  `;

  console.log(qry);

  const res_data = await getConnection(qry);
  if (res_data.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_data.row);
};

exports.select_order_item = async (req, res) => {
  const { item_sids } = req.body;

  console.log(item_sids);

  const qry = `
  select
  ITEM_SID,
	T2.PROD_SID,
	PROD_NM,
	PROD_CATECODE,
	ITEM_OPTION,
	ITEM_DESIGN,
	ITEM_AMOUNT,
	ITEM_QUANTITY,
	IMAGE_LOCATION,
  ITEM_FILE_NAME,
  ITEM_FILE_LOCATION,
  ITEM_STATUS
from
	TB_CUSTOM_PROD T1
left outer join TB_PRODUCT T2
	on
	T1.PROD_SID = T2.PROD_SID
left outer join TB_PRODUCT_IMAGE T3
on
	T1.PROD_SID = T3.PROD_SID
where
	T3.IMAGE_CATE = 'thumbnail'
  AND	T1.ITEM_SID in (?)
order by ITEM_REGDATE DESC
  `;

  console.log(qry);

  const res_data = await getConnection(qry, [item_sids]);
  if (res_data.state === false) return res.status(402).send("DB Error.");
  return res.status(200).send(res_data.row);
};

exports.select_mypage_info = async (req, res) => {
  const userid = req.query.userid;

  const qry = `
SELECT
  (SELECT COUNT(*) FROM TB_ORDER WHERE ORDER_STATUS  BETWEEN 1 AND 5 AND USER_ID = '${userid}') AS TOTAL_CNT,
  (SELECT COUNT(*) FROM TB_ORDER WHERE ORDER_STATUS = 1 AND USER_ID = '${userid}') AS CNT1,
  (SELECT COUNT(*) FROM TB_ORDER WHERE ORDER_STATUS = 2 AND USER_ID = '${userid}') AS CNT2,
  (SELECT COUNT(*) FROM TB_ORDER WHERE ORDER_STATUS = 3 AND USER_ID = '${userid}') AS CNT3,
  (SELECT COUNT(*) FROM TB_ORDER WHERE ORDER_STATUS = 4 AND USER_ID = '${userid}') AS CNT4,
  (SELECT COUNT(*) FROM TB_ORDER WHERE ORDER_STATUS = 5 AND USER_ID = '${userid}') AS CNT5  
  `;

  const res_data = await getConnection(qry);
  if (res_data.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_data.row[0]);
};

exports.select_recent_delis = async (req, res) => {
  const userid = req.query.userid;

  const qry = `
  select
	distinct
  ORDER_ADDRESS as DELI_ADDRESS,
	ORDER_ADD_ADDRESS as DELI_ADD_ADDRESS,
	REC_TEL as DELI_TEL0,
	ORDER_POSTCODE as DELI_POSTCODE,
	ORDER_REC as DELI_REC
from
	TB_ORDER
where
	USER_ID = '${userid}'
  `;

  const res_data = await getConnection(qry);
  if (res_data.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_data.row);
};

exports.update_cart_design = async (req, res) => {
  const { item_sid, item_file_location } = req.body;

  const qry = `
update
  tb_custom_prod
set
  ITEM_FILE_LOCATION = '${item_file_location}'
where
  ITEM_SID = '${item_sid}'
`;
  const res_data = await getConnection(qry);
  if (res_data.state === false) return res.status(401).send("DB Error.");
  return res.status(200).send(res_data.row);
};

function generateRandomCode(n) {
  let str = "";
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}

exports.email_auth_send = async (req, res) => {
  const { email } = req.body;

  const ck_qry = `
select
  COUNT(1) AS CNT
from
  TB_USER
where
  USER_ID = '${email}'
  `;

  const res_ck = await getConnection(ck_qry);

  if (res_ck.row[0].CNT !== 0) {
    return res.status(201).send("중복된 이메일");
  }

  const randomNumber = generateRandomCode(6);

  const auth_qry = `
insert
	into
	TB_EMAIL_AUTH (AUTH_EAMIL,
	AUTH_CODE)
values (
'${email}',
'${randomNumber}'
)
on
DUPLICATE key
update
	AUTH_CODE = values(AUTH_CODE);
  `;

  const res_auth = await getConnection(auth_qry);

  if (res_auth.state === false) return res.status(401).send("DB Error.");

  const mailTitle = "[스노우화이트] 이메일 인증번호";
  const mailContent = `
<div style="text-align: center;"><br></div><div style="text-align: center;"><span style="font-family: &quot;Malgun Gothic&quot;, &quot;맑은 고딕&quot;, sans-serif; font-size: 24px; font-weight: bold; color: rgb(64, 159, 255);"><br></span></div><table style="margin: 0px; padding: 0px; letter-spacing: -0.5px; line-height: 1.6; font-variant-ligatures: normal; font-variant-caps: normal; orphans: 2; text-align: left; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; width: 600px; border-collapse: collapse; border-spacing: 0px; table-layout: fixed;" data-workseditor="Table"><tbody><tr><td style="margin: 0px; padding: 0px; background-color: rgb(255, 255, 255); white-space: normal;"><p style="margin: 15px 0px; padding: 0px; letter-spacing: -0.4px;"></p><div style="text-align: center;"><font style="font-family:Malgun Gothic, Lucida Grande, Lucida Sans, Lucida Sans Unicode, Arial, Helvetica, Verdana, sans-serif,color:#333333"><span style="font-weight: bold; font-family: &quot;Malgun Gothic&quot;, &quot;맑은 고딕&quot;, sans-serif; font-size: 24px; color: rgb(64, 159, 255);">스노우화이트</span></font></div><div style="text-align: center;"><font style="font-family:Malgun Gothic, Lucida Grande, Lucida Sans, Lucida Sans Unicode, Arial, Helvetica, Verdana, sans-serif,color:#333333"><br></font></div><div style="text-align: center;"><span style="font-size: 14px; font-style: normal; font-weight: 400; font-family: &quot;Malgun Gothic&quot;, &quot;Lucida Grande&quot;, &quot;Lucida Sans&quot;, &quot;Lucida Sans Unicode&quot;, Arial, Helvetica, Verdana, sans-serif; color: rgb(51, 51, 51);"><span style="font-family: &quot;Malgun Gothic&quot;, &quot;맑은 고딕&quot;, sans-serif;">스노우화이트 가입을 위한 인증번호 입니다.</span><br></span></div><div style="text-align: center;"><span style="font-size: 14px; font-style: normal; font-weight: 400; font-family: &quot;Malgun Gothic&quot;, &quot;맑은 고딕&quot;, sans-serif; color: rgb(51, 51, 51);">아래 인증번호 확인 후 이메일 인증을 완료해 주세요.</span></div><p></p><div style="margin: 24px 0px 72px; padding: 24px 32px; background-color: rgb(255, 250, 228);"><h2 style="margin: 0px 0px 15px; padding: 0px; line-height: 22px; text-align: center;"><span style="font-size: 18px; font-style: normal; font-weight: 400; font-family: &quot;Malgun Gothic&quot;, &quot;맑은 고딕&quot;, sans-serif; color: rgb(51, 51, 51);">인증 번호</span></h2><div style="text-align: center;"><strong style="display: block; font-size: 28px; font-weight: bold; color: rgb(64, 159, 255); letter-spacing: -0.6px; text-align: center; font-style: normal; font-family: &quot;Malgun Gothic&quot;, &quot;맑은 고딕&quot;, sans-serif;">${randomNumber}</strong></div></div></td></tr></tbody></table><br>
`;
  sendMail(email, mailTitle, "", mailContent);

  return res.status(200).send("OK");
};

exports.email_auth_ck = async (req, res) => {
  const email = req.query.email;
  const code = req.query.code;

  const ck_qry = `
select
	AUTH_CODE
from
	TB_EMAIL_AUTH
where
	AUTH_EAMIL = '${email}'
`;

  const res_ck = await getConnection(ck_qry);

  if (code === res_ck.row[0].AUTH_CODE) {
    return res.status(200).send("OK");
  } else {
    return res.status(201).send("Inconsistency");
  }
};
