require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { limiter } = require("./middleware/limiter");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middleware/logger");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/newsexplorer_db");

const { PORT = 3002 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}/`)
);

app.use("/users", require("./routes/users"));
app.use("/articles", require("./routes/articles"));
app.use("/", require("./routes/index"));

app.use(errorLogger);
app.use(errors());
