///

const express = require("express");
const https = require("https");
const os = require("os");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const cors = require("cors");
const busboy = require("connect-busboy");
const { createProxyMiddleware } = require("http-proxy-middleware");
const multer = require("multer");
const fs = require("fs");
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
  insert_order,
  select_orderlist,
  select_order_item,
  select_mypage_info,
  select_recent_delis,
  update_cart_design,
  email_auth,
  email_auth_send,
  email_auth_ck,
} = require("./snowwhite/controller/user");
const { cate, subcate } = require("./snowwhite/controller/menu");
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
  select_paper,
  select_option_price,
} = require("./snowwhite/controller/product");
const {
  select_admin_prods,
  select_admin_prod_detail,
  select_admin_options,
  select_admin_prod_options,
  select_admin_prod_detail_images,
  insert_products_images_detail,
  delete_products_images,
  update_products_cate,
  update_products_priority,
  update_products_nm,
  update_products_thumnail,
  update_products_desc,
  update_products_detail,
  update_products_noti,
  update_products_options,
  update_products_price,
  update_products_content,
  insert_products_dummy,
  update_products_delcode,
  update_category_priority,
  update_category_show,
  insert_category,
  delete_category,
  cate_modify,
  select_admin_orderlist,
  update_order_status,
  update_custom_item,
  insert_option,
  update_option,
  delete_option,
  select_admin_user,
  update_admin_user,
  insert_banner,
  delete_banner,
  update_banner,
  select_admin_paper,
  update_admin_paper,
  select_admin_option_price,
  insert_admin_paper,
  delete_admin_paper,
  insert_admin_option_price,
  delete_admin_option_price,
  update_admin_option_price,
  insert_products_option,
  insert_products_paper,
} = require("./snowwhite/controller/admin");
const {
  upload,
  upload_design,
  upload_global,
} = require("./snowwhite/controller/upload");
const {
  select_review,
  insert_review,
} = require("./snowwhite/controller/review");
const {
  insert_board,
  select_board,
  delete_board,
  update_board,
} = require("./snowwhite/controller/board");
const { tosspayConfirm } = require("./snowwhite/controller/tosspay");
const { paperExcelUpload } = require("./snowwhite/controller/excel");
const SECRET_KEY = "MY-SECRET-KEY"; // JWT 시크릿 키

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(busboy());

process.on("uncaughtException", (error) => {
  console.log(error);
});

let corsOptions = {
  origin: "*",
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

app.post("/api/cate", cate);

app.post("/api/subcate", subcate);

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

app.put("/api/order", auth, insert_order);

///////////////////////////////////////
app.post("/api/admin/prods", auth, select_admin_prods);

app.post("/api/admin/prods/detail", auth, select_admin_prod_detail);

app.post("/api/admin/options", auth, select_admin_options);

app.post("/api/admin/prodoptions", auth, select_admin_prod_options);

app.post("/api/admin/prodimages", auth, select_admin_prod_detail_images);

app.post("/api/admin/prodimages/add", auth, insert_products_images_detail);

app.post("/api/admin/prodimages/delete", auth, delete_products_images);

app.post("/api/admin/prod/update_cate", auth, update_products_cate);

app.post("/api/admin/prod/update_priority", auth, update_products_priority);

app.post("/api/admin/prod/update_nm", auth, update_products_nm);

app.post("/api/admin/prod/update_thumnail", auth, update_products_thumnail);

app.post("/api/admin/prod/update_desc", auth, update_products_desc);

app.post("/api/admin/prod/update_detail", auth, update_products_detail);

app.post("/api/admin/prod/update_noti", auth, update_products_noti);

app.post("/api/admin/prod/update_price", auth, update_products_price);

app.post("/api/admin/prod/update_options", auth, update_products_options);

app.post("/api/admin/prod/update_content", auth, update_products_content);

app.post("/api/admin/prod/add", auth, insert_products_dummy);

app.post("/api/admin/prod/del", auth, update_products_delcode);

app.post("/api/admin/cate/update_prioirty", auth, update_category_priority);

app.post("/api/admin/cate/update_show", auth, update_category_show);

app.post("/api/admin/cate/add", auth, insert_category);

app.post("/api/admin/cate/del", auth, delete_category);

app.patch("/api/admin/cate", auth, cate_modify);

app.post("/api/admin/orderlist", auth, select_admin_orderlist);

app.put("/api/admin/order", update_order_status);

app.put("/api/admin/custom_item", update_custom_item);

app.post("/api/review", select_review);

app.put("/api/review", auth, insert_review);

app.post("/api/orderlist", auth, select_orderlist);

app.post("/api/orderlist/item", auth, select_order_item);

const uploader = multer({ dest: "uploads/" });

app.post("/api/upload", auth, uploader.single("file"), upload);

app.post("/api/upload_design", auth, uploader.single("file"), upload_design);

app.post("/api/upload_global", auth, uploader.single("file"), upload_global);

app.get("/api", () => {
  refreshVerify("123123", "a");
});

// RESTFUL

app.post("/api/admin/option", auth, insert_option);
app.put("/api/admin/option", auth, update_option);
app.delete("/api/admin/option", auth, delete_option);

app.get("/api/board", select_board);
app.post("/api/board", auth, insert_board);
app.put("/api/board", auth, update_board);
app.delete("/api/board", auth, delete_board);

// 토스페이

app.post("/api/tosspay/confirm", tosspayConfirm);

//mypage

app.get("/api/mypage/info", auth, select_mypage_info);

app.get("/api/order/recentDelis", auth, select_recent_delis);

app.put("/api/cart/design", auth, update_cart_design);

//배너

app.get("/api/banner", select_banner);
app.post("/api/banner", auth, insert_banner);
app.delete("/api/banner", auth, delete_banner);
app.put("/api/banner", auth, update_banner);
//어드민 유저
app.get("/api/admin/user", auth, select_admin_user);
app.put("/api/admin/user", auth, update_admin_user);

//회원가입
app.get("/api/join/auth", email_auth_ck);
app.post("/api/join/auth", email_auth_send);

//용지
app.get("/api/paper", select_paper);

//후가공 가격
app.get("/api/option_price", select_option_price);

//어드민 용지
app.get("/api/admin/paper", auth, select_admin_paper);
app.post("/api/admin/paper", auth, insert_admin_paper);
app.put("/api/admin/paper", auth, update_admin_paper);
app.delete("/api/admin/paper", auth, delete_admin_paper);

//어드민 옵션 가격 테이블
app.get("/api/admin/option_price", auth, select_admin_option_price);
app.post("/api/admin/option_price", auth, insert_admin_option_price);
app.put("/api/admin/option_price", auth, update_admin_option_price);
app.delete("/api/admin/option_price", auth, delete_admin_option_price);

app.post("/api/paper_excel", auth, paperExcelUpload);

app.post("/api/admin/prod_option", auth, insert_products_option);

app.post("/api/admin/prod_paper", auth, insert_products_paper);

// app.listen("3030", () => {
//   console.log("Server started");
// });

if (os.type().indexOf("Windows") != -1) {
  //윈도우일떄
  app.listen("3030", () => {
    console.log("Server started");
  });
} else {
  //리눅스

  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/snowplanet.co.kr/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/snowplanet.co.kr/cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/snowplanet.co.kr/chain.pem",
    "utf8"
  );

  const options = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };

  const server = https.createServer(options, app);

  server.listen(3030, () => {
    console.log("HTTPS server listening");
  });
}
