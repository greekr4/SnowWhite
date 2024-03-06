///

const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql2/promise");
const cors = require("cors");

const jwt = require("jsonwebtoken"); // JWT 모듈 연결
const SECRET_KEY = "MY-SECRET-KEY"; // JWT 시크릿 키
const { auth } = require("./authMiddleware");

let corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "SNOW",
  password: "1",
  database: "snowdb",
});

const getConn = async () => {
  return await pool.getConnection(async (conn) => conn);
};

app.use(cors(corsOptions));

app.post("/testSelect", async (req, res) => {
  const conn = await getConn();
  const query = "SELECT * FROM TB_USER";
  let [rows, fields] = await conn.query(query, []);
  conn.release();

  res.send(rows);
});

app.listen("3030", () => {
  console.log("Server started");
});

app.post("/login", async (req, res, next) => {
  //파라미터 처리
  console.log(req);
  const pram_userid = req.query.userid;
  const pram_userpw = req.query.userpw;

  const conn = await getConn();
  const query = `SELECT USER_NM,USER_PW FROM TB_USER WHERE USER_ID = '${pram_userid}'`;
  let [rows, fields] = await conn.query(query, []);

  console.log(query);
  console.log(rows);

  if (rows.length > 0) {
    if (rows[0].USER_PW === pram_userpw) {
      console.log("로그인 성공");

      const nickname = rows[0].USER_NM;

      //토큰 생성
      token = jwt.sign(
        {
          type: "JWT",
          nickname: nickname,
        },
        SECRET_KEY,
        {
          expiresIn: "10m",
          issuer: "nodeJS",
        }
      );

      return res.status(200).json({
        code: 200,
        message: "토큰발급완료",
        token: token,
      });
    } else {
      console.log("로그인 실패 (비밀번호 불일치)");
      return res.status(500).json({
        code: 500,
        message: "로그인 실패",
      });
    }
  } else {
    console.log("로그인 실패 (아이디 불일치)");
    return res.status(500).json({
      code: 500,
      message: "로그인 실패",
    });
  }
});

app.get("/payload", auth, (req, res) => {
  const nickname = req.decoded.nickname;
  const profile = req.decoded.profile;
  return res.status(200).json({
    code: 200,
    message: "토큰은 정상입니다.",
    data: {
      nickname: nickname,
      profile: profile,
    },
  });
});

app.post("/join", async (req, res, next) => {
  console.log(req);
  const pram_userid = req.query.userid;
  const pram_userpw = req.query.userpw;
  const pram_usernm = req.query.usernm;

  const conn = await getConn();
  const query = `insert into tb_user (user_id,user_pw,user_nm ) values ('${pram_userid}','${pram_userpw}','${pram_usernm}')`;
  let [result] = await conn.query(query, []);

  console.log(result);

  return res.status(200).json({
    code: 200,
    message: "회원가입 성공",
    data: {
      result: result,
    },
  });
});
