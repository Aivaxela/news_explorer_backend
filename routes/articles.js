const router = require("express").Router();
const { auth } = require("../middleware/auth");
const {
  getArticles,
  saveArticle,
  deleteArticle,
} = require("../controllers/articles");
const { searchArticles } = require("../utils/newsApi");

router.get("/search/:query", searchArticles);
router.get("/me", auth, getArticles);
router.post("/me", auth, saveArticle);
router.delete("/me/:id", auth, deleteArticle);

module.exports = router;
