const { getTodaysDate, getDateSevenDaysAgo } = require("../utils/getDates");
const { NEWS_API_KEY } = require("../utils/config");

module.exports.searchArticles = (req, res, next) => {
  return fetch(
    `https://nomoreparties.co/news/v2/everything?q=${
      req.params.query
    }&from=${getDateSevenDaysAgo()}&to=${getTodaysDate()}&pageSize=100
    language=en&apiKey=${NEWS_API_KEY}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((data) => {
      if (data.ok) {
        return data.json();
      }
    })
    .then((data) => res.send(data))
    .catch((err) => console.error(err));
};