require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { limiter } = require("./middleware/limiter");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middleware/logger");
const { errorHandler, errorSender } = require("./middleware/error-handler");
const { DB_ADDRESS, DB_PORT } = require("./utils/config");

mongoose.set("strictQuery", true);
mongoose.connect(DB_ADDRESS);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);

app.use("/users", require("./routes/users"));
app.use("/articles", require("./routes/articles"));
app.use("/", require("./routes/index"));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler, errorSender);

app.listen(DB_PORT);
