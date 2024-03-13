///

const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // JWT 모듈 연결
const {
  auth,
  makeToken,
  makeRefreshToken,
  refreshVerify,
} = require("./snowwhite/utils/authMiddleware");
const { getConnection } = require("./snowwhite/utils/dbUtils");
const {
  login,
  refresh,
  userinfo,
  delivery,
  join,
  insert_delivery,
  delete_delivery,
  update_delivery,
  default_deli,
  auth_pw,
  update_user,
} = require("./snowwhite/controller/user");
const { cate } = require("./snowwhite/controller/menu");
const {
  select_products_main,
  select_products_thumbnail,
  select_banner,
} = require("./snowwhite/controller/product");
const SECRET_KEY = "MY-SECRET-KEY"; // JWT 시크릿 키

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

app.listen("3030", () => {
  console.log("Server started");
});

app.post("/api/cate", cate);

app.post("/api/login", login);

app.post("/api/refresh", refresh);

app.post("/api/userinfo", auth, userinfo);

app.post("/api/join", join);

app.post("/api/delivery", auth, delivery);

app.post("/api/delivery/add", auth, insert_delivery);

app.post("/api/delivery/edit", auth, update_delivery);

app.post("/api/delivery/del", auth, delete_delivery);

app.post("/api/delivery/default", auth, default_deli);

app.post("/api/mypage/auth", auth, auth_pw);

app.post("/api/mypage/edituser", auth, update_user);

app.post("/api/product/thumbnail", select_products_thumbnail);

app.post("/api/banner", select_banner);

app.get("/api", () => {
  refreshVerify("123123", "a");
});
