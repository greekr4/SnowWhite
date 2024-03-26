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
  select_products_detail,
  select_products_options,
  select_products_images,
  select_cart,
  insert_custom_prod_and_cart,
  delete_cart,
  select_order,
} = require("./snowwhite/controller/product");
const {
  select_admin_prods,
  select_admin_prod_detail,
  select_admin_options,
  select_admin_prod_options,
  select_admin_prod_detail_images,
} = require("./snowwhite/controller/admin");
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

app.post("/api/product/detail", select_products_detail);

app.post("/api/product/images", select_products_images);

app.post("/api/product/options", select_products_options);

app.post("/api/cart", auth, select_cart);

app.post("/api/cart/add", auth, insert_custom_prod_and_cart);

app.post("/api/cart/del", auth, delete_cart);

app.post("/api/order", auth, select_order);

app.post("/api/banner", select_banner);

app.post("/api/admin/prods", auth, select_admin_prods);

app.post("/api/admin/prods/detail", auth, select_admin_prod_detail);

app.post("/api/admin/options", auth, select_admin_options);

app.post("/api/admin/prodoptions", auth, select_admin_prod_options);

app.post("/api/admin/prodimages", auth, select_admin_prod_detail_images);

app.get("/api", () => {
  refreshVerify("123123", "a");
});
