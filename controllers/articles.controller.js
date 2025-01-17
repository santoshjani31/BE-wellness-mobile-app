import { fetchArticles, fetchArticleById } from '../models/articles.model.js';

const getArticles = async (req, res, next) => {
	try {
		const articles = await fetchArticles();
		res.status(200).send({ articles });
	} catch (err) {
		console.log(err);
	}
};

const getArticleById = async (req, res, next) => {
	try {
		const { article_id } = req.params;
		const article = await fetchArticleById(article_id);
		res.status(200).send({ article });
	} catch (error) {
		console.log(error);
	}
};

export { getArticles, getArticleById };
