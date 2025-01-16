import fetchArticles from '../models/articles.model.js'

const getArticles = async (req, res, next) => {
    try{
        const articles = await fetchArticles()
        res.status(200).send({articles})

    } catch(err){
        console.log(err)
    }
}

export default getArticles