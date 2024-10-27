const mongoose = require("mongoose");
const Article = require("../models/article");

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .populate("owner", {
      _id: 1,
      urlToImage: 1,
      title: 1,
      description: 1,
      source: 1,
      publishedAt: 1,
      url: 1,
      keyword: 1,
    })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.saveArticle = (req, res, next) => {
  const { urlToImage, title, description, source, publishedAt, url, keyword } =
    req.body;

  Article.create({
    urlToImage,
    title,
    description,
    source,
    publishedAt,
    url,
    keyword,
    owner: req.user._id,
  }).then((article) => {
    Article.findById(article._id)
      .populate("owner", {
        _id: 1,
        urlToImage: 1,
        title: 1,
        description: 1,
        source: 1,
        publishedAt: 1,
        url: 1,
        keyword: 1,
      })
      .then((returnArticle) => res.send({ data: returnArticle }))
      .catch(next);
  });
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findOne({ _id: req.params.id })
    .populate("owner", {
      _id: 1,
      urlToImage: 1,
      title: 1,
      description: 1,
      source: 1,
      publishedAt: 1,
      url: 1,
      keyword: 1,
    })
    .then((article) => {
      const articleOwner = mongoose.Types.ObjectId(article.owner).toString();

      if (articleOwner === req.user._id) {
        return Article.findByIdAndDelete({ _id: article._id }).then(
          (returnArticle) => res.send({ data: returnArticle })
        );
      }
    })
    .catch((err) => console.error(err));
};
