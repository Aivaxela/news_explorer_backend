const router = require("express").Router();
const { auth } = require("../middleware/auth");
const { getCurrentUser } = require("../controllers/users");

router.get("/", auth, getCurrentUser);

module.exports = router;
