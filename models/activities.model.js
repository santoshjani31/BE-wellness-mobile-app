import db from '../connection.js';

const fetchActivities = async (moodTag, category) => {
	const activitiesArr = [];
	const activities = db.collection('activities');
	let snapshot = '';

	if (moodTag) {
		snapshot = await activities.where('moodTag', '==', moodTag).get();
	} else if (category) {
		snapshot = await activities.where('category', '==', category).get();
	} else {
		snapshot = await activities.get();
	}
	snapshot.forEach((activity) => {
		activitiesArr.push(activity.data());
	});
	return activitiesArr;
};

const fetchActivityById = async (activity_title) => {
	const activity = await db.collection('activities').doc(activity_title).get();
	return activity.data();
};

export { fetchActivities, fetchActivityById };
