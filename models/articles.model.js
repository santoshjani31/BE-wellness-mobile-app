import db from '../connection.js'

const fetchArticles = async () => {
    const articlesArr = []
    const articleRef = await db.collection('articles').get()
    articleRef.forEach((article) => {
        articlesArr.push(article.data())
    })
    return articlesArr
}

export default fetchArticles