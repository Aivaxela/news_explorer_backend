const sql = require("mysql2");

const con = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "newsexplorer_db",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

const articlesTable = `CREATE TABLE IF NOT EXISTS articles (
id INT AUTO_INCREMENT PRIMARY KEY,
urlToImage VARCHAR(2048),
title VARCHAR(255),
description TEXT,
source VARCHAR(255),
publishedAt DATETIME,
url VARCHAR(2048),
keyword VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

const usersTable = `CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(255),
password VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

con.query(articlesTable, (err) => {
  if (err) throw err;
  console.log("Articles table created");
});

con.query(usersTable, (err) => {
  if (err) throw err;
  console.log("Users table created");
});

con.end();
