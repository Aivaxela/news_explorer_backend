const { JWT_SECRET = "4fG6Tz7U9nWq8RrL1dJ0sV5hKxM3yP2c" } = process.env;
const { NEWS_API_KEY = "a16de474931b4e5a83f83ad53ba3df69" } = process.env;
const { DB_ADDRESS = "mongodb://127.0.0.1:27017/newsexplorer_db" } =
  process.env;
const { DB_PORT = 3002 } = process.env;

module.exports = { JWT_SECRET, NEWS_API_KEY, DB_ADDRESS, DB_PORT };
