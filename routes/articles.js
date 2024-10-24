const router = require("express").Router();
const { auth } = require("../middleware/auth");
const {
  getArticles,
  saveArticle,
  deleteArticle,
} = require("../controllers/articles");

router.get("/", auth, getArticles);
router.post("/", auth, saveArticle);
router.delete("/:id", auth, deleteArticle);

module.exports = router;
