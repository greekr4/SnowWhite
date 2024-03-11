const mysql = require("mysql2/promise");
const config = require("./dbConfig.json");

const pool = mysql.createPool(config);

exports.getConnection = async (sql, params) => {
  try {
    let result = {};
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [rows] = await connection.query(sql, params);
      result.state = true;
      result.row = rows;
      connection.release();
      return result;
    } catch (err) {
      console.log(err);
      result.state = false;
      result.err = err;
      connection.release();
      return result;
    }
  } catch (err) {
    console.log(err);
    result.state = false;
    result.err = err;
    return result;
  }
};
