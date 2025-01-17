import db from '../connection.js';

const fetchArticles = async (mood) => {
	const articlesArr = [];
	const articleRef = db.collection('articles');
	let articles = ''

	if(mood){
		articles = await articleRef.where('mood', '=', mood).get()
	} else {
		articles =await  articleRef.get()
	}

	articles.forEach((article) => {
		articlesArr.push(article.data());
	});

	return articlesArr;
};

const fetchArticleById = async (article_id) => {
	const article = await db.collection('articles').doc(article_id).get();
	return article.data();
};

export { fetchArticles, fetchArticleById };
