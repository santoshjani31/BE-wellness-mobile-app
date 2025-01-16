import fetchActivities from '../models/activities.model.js';

const getActivities = async (req, res, next) => {
	try {
		const activities = await fetchActivities();
		res.status(200).send({ activities });
	} catch (err) {
		console.log(err);
	}
};

export default getActivities;
