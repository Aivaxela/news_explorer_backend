const router = require("express").Router();
const { auth } = require("../middleware/auth");
const { getArticles, saveArticle } = require("../controllers/articles");

router.get("/", auth, getArticles);
router.post("/", auth, saveArticle);

module.exports = router;
