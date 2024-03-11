const jwt = require("jsonwebtoken");
const { getConnection } = require("./dbUtils");
const SECRET_KEY = "MY-SECRET-KEY"; // JWT 시크릿 키

exports.makeToken = (userid) => {
  const token = jwt.sign(
    {
      type: "JWT",
      userid: userid,
    },
    SECRET_KEY,
    {
      expiresIn: "5", //만료시간
      issuer: "nodeJS",
    }
  );
  console.log("토큰생성와뇨");
  return token;
};

// refresh token 생성
exports.makeRefreshToken = () => {
  const refreshToken = jwt.sign({}, SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "24h",
  });
  console.log(refreshToken);
  return refreshToken;
};

// refresh token 유효성 검사
exports.refreshVerify = async (token, userid) => {
  const qry = `select TOKEN from tb_token WHERE USER_ID = '${userid}';`;
  try {
    const res = await getConnection(qry);
    if (res.row[0].TOKEN === token) {
      try {
        jwt.verify(token, SECRET_KEY);
        return true;
      } catch {
        // 검증에러
        return false;
      }
    }
  } catch (err) {
    // DB에러
    return false;
  }
};

exports.verify = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return {
      ok: true,
      id: decoded.userid,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};

exports.auth = (req, res, next) => {
  //인증 완료
  try {
    // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰을 req.decoded에 반환
    req.decoded = jwt.verify(req.headers.authorization, SECRET_KEY);
    return next();
  } catch (error) {
    // 유효시간 초과
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰 만료",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        code: 401,
        message: "유효하지 않은 토큰",
      });
    }
  }
};
