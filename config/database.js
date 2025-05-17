const sql = require("mysql2");

const connection = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "1231231231",
  database: "newsexplorer_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

module.exports = connection;
