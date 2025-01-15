import fetchMoods from '../models/moods.model.js';

const getMoods = async (req, res, next) => {
	try {
		const moods = await fetchMoods();
		res.status(200).send({ moods });
	} catch (error) {
		next(error);
	}
};

export default getMoods;
