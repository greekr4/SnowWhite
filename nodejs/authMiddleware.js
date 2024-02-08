const jwt = require("jsonwebtoken");
const SECRET_KEY = "MY-SECRET-KEY"; // JWT 시크릿 키

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
