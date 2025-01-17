import {
	fetchActivities,
	fetchActivityById,
} from '../models/activities.model.js';

const getActivities = async (req, res, next) => {
	try {
		const activities = await fetchActivities();
		res.status(200).send({ activities });
	} catch (err) {
		console.log(err);
	}
};

const getActivityById = async (req, res, next) => {
	try {
		const { activity_title } = req.params;
		const activity = await fetchActivityById(activity_title);
		res.status(200).send({ activity });
	} catch (err) {
		console.log(err);
	}
};

export { getActivities, getActivityById };
