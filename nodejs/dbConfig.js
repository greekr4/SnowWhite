module.exports = {
  user: process.env.NODE_ORACLEDB_USER || "SNOW",
  password: process.env.NODE_ORACLEDB_PASSWORD || "1",
  connectString:
    process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost:1521/ORCL",
  externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,
};
