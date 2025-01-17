import db from '../connection.js';

const fetchArticles = async () => {
	const articlesArr = [];
	const articleRef = await db.collection('articles').get();
	articleRef.forEach((article) => {
		articlesArr.push(article.data());
	});
	return articlesArr;
};

const fetchArticleById = async (article_id) => {
	const article = await db.collection('articles').doc(article_id).get();
	return article.data();
};

export { fetchArticles, fetchArticleById };
