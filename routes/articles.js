const router = require("express").Router();
const { auth } = require("../middleware/auth");
const {
  getArticles,
  saveArticle,
  deleteArticle,
} = require("../controllers/articles");
const { searchArticles } = require("../utils/newsApi");
const { validateId, validateNewArticle } = require("../middleware/validation");

router.get("/search/:query", searchArticles);
router.get("/", auth, getArticles);
router.post("/", auth, validateNewArticle, saveArticle);
router.delete("/:id", auth, validateId, deleteArticle);

module.exports = router;
