require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/newsexplorer_db");

const { PORT = 3002 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}/`)
);

app.use("/users", require("./routes/users"));
app.use("/articles", require("./routes/articles"));
app.use("/", require("./routes/index"));
