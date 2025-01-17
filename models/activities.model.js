import db from '../connection.js';

const fetchActivities = async () => {
	const activitiesArr = [];
	const activities = await db.collection('activities').get();
	activities.forEach((activity) => {
		activitiesArr.push(activity.data());
	});
	return activitiesArr;
};

const fetchActivityById = async (activity_title) => {
	const activity = await db.collection('activities').doc(activity_title).get();
	return activity.data();
};

export { fetchActivities, fetchActivityById };
