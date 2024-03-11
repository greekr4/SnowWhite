const jwt = require("jsonwebtoken");
const {
  makeToken,
  makeRefreshToken,
  refreshVerify,
  verify,
} = require("../utils/authMiddleware");
const { getConnection } = require("../utils/dbUtils");

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
