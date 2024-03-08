///

const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // JWT 모듈 연결
const SECRET_KEY = "MY-SECRET-KEY"; // JWT 시크릿 키
const { auth } = require("./authMiddleware");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

process.on("uncaughtException", (error) => {
  console.log(error);
});

let corsOptions = {
  origin: "http://localhost:3000",
  // origin: "http://175.213.96.31:3000",
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
  // 데이터베이스 연결
  const conn = await getConn();
  try {
    // 파라미터
    const { userid, userpw } = req.body;
    const query = `SELECT USER_NM,USER_PW FROM TB_USER WHERE USER_ID = '${userid}'`;
    let [rows, fields] = await conn.query(query, []);
    if (rows.length > 0) {
      if (rows[0].USER_PW === userpw) {
        console.log("로그인 성공");
        const nickname = rows[0].USER_NM;
        //토큰 생성
        token = jwt.sign(
          {
            type: "JWT",
            userid: userid,
          },
          SECRET_KEY,
          {
            expiresIn: "10m", //만료시간
            issuer: "nodeJS",
          }
        );
        return res.status(200).json({
          code: 200,
          message: "success",
          token: token,
        });
      } else {
        //비밀번호 틀릴 시
        return res.status(201).json({
          code: 201,
          message: "password-error",
        });
      }
    } else {
      //아이디가 없을 시
      return res.status(202).json({
        code: 202,
        message: "id-error",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) {
      await conn.release();
    }
  }
});

app.post("/userinfo", auth, async (req, res) => {
  const conn = await getConn();
  const userid = req.decoded.userid;
  try {
    console.log("d");
    const qry = `SELECT * FROM TB_USER WHERE USER_ID = '${userid}'`;
    let [row] = await conn.query(qry, []);
    if (row) {
      return res.status(200).json({
        code: 200,
        msg: "Success",
        data: row[0],
      });
    } else {
      return res.status(404).json({
        code: 404,
        msg: "not found",
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      msg: "Server Error",
      data: null,
    });
  } finally {
    if (conn) {
      await conn.release();
    }
  }
});

app.post("/join", async (req, res, next) => {
  // 데이터베이스 연결
  const conn = await getConn();
  try {
    // 파라미터
    const { userid, userpw, usernm } = req.body;

    // 아이디 중복 체크
    const selectId = `SELECT (1) FROM TB_USER WHERE USER_ID = '${userid}'`;
    let [rows] = await conn.query(selectId, []);
    if (rows.length > 0) {
      console.log("중복임");
      return res.status(200).json({
        code: 200,
        msg: "아이디 중복",
      });
    }

    const query = `INSERT INTO tb_user (user_id, user_pw, user_nm) VALUES (?, ?, ?)`;
    const [result] = await conn.query(query, [userid, userpw, usernm]);

    // 데이터베이스 연결 해제
    await conn.release();

    // 성공 응답
    return res.status(200).json({
      code: 200,
      msg: "회원가입 성공",
      data: {
        result: result,
      },
    });
  } catch (error) {
    // 에러 처리
    console.error("회원가입 중 에러 발생:", error);

    // 데이터베이스 연결 해제
    if (conn) {
      await conn.release();
    }

    // 클라이언트에 에러 응답
    return res.status(500).json({
      code: 500,
      message: "서버 오류",
    });
  }
});
