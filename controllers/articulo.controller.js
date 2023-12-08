const ArticleService = require('../services/articulo.services');

exports.getAllArticles = async (req, res) => {
  const articles = await ArticleService.getAllArticles();
  res.json(articles);
};

exports.getArticleById = async (req, res) => {
  const article = await ArticleService.getArticleById(req.params.id);
  res.json(article);
};

exports.createArticle = async (req, res) => {
  const article = await ArticleService.createArticle(req.body);
  res.json(article);
};

exports.updateArticle = async (req, res) => {
  const article = await ArticleService.updateArticle(req.params.id, req.body);
  res.json(article);
};

exports.deleteArticle = async (req, res) => {
  await ArticleService.deleteArticle(req.params.id);
  res.json({ message: 'Article deleted successfully' });
};
