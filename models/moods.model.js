import db from '../connection.js';

const fetchMoods = async () => {
	const moodsArr = [];
	const moodsRef = await db.collection('moods').get();
	moodsRef.forEach((mood) => {
		moodsArr.push(mood.data().emotion);
	});
	return moodsArr;
};

export default fetchMoods;
