const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/users");
const {
  validateNewUser,
  validateUserLogin,
} = require("../middleware/validation");
const NotFoundError = require("../errors/not-found");
const { pageNotFoundMessage } = require("../utils/error-messages");
const db = require("../config/database");

router.post("/signup", validateNewUser, signup);
router.post("/signin", validateUserLogin, signin);
router.use("/users", require("./users"));
router.use("/articles", require("./articles"));

// Example route using the database connection
router.get("/example", (req, res) => {
  db.query("SELECT * FROM your_table", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

router.use(() => {
  throw new NotFoundError(pageNotFoundMessage);
});

module.exports = router;
