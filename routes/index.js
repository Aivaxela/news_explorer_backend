const router = require("express").Router();
const { signup, signin } = require("../controllers/users");
const {
  validateNewUser,
  validateUserLogin,
} = require("../middleware/validation");
const NotFoundError = require("../errors/not-found");
const { pageNotFoundMessage } = require("../utils/error-messages");

router.post("/signup", validateNewUser, signup);
router.post("/signin", validateUserLogin, signin);
router.use("/users", require("../routes/users"));
router.use("/articles", require("../routes/articles"));

router.use(() => {
  throw new NotFoundError(pageNotFoundMessage);
});

module.exports = router;
