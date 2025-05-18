const sql = require("mysql2");

const pool = sql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "1231231231",
  database: process.env.DB_NAME || "newsexplorer_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
