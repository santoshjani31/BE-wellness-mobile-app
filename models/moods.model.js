import db from '../connection.js';

const fetchMoods = async () => {
	// const moodsArr = [];
	const moodsRef = db.collection('Moods');
	const allMoods = await moodsRef.get();
	// allMoods.forEach((mood) => {
	// 	console.log(mood.id, '=>', mood.data(), '<-- mood in array');
	// 	moodsArr.push(mood.data().emotion);
	// });
	const moodsArr = allMoods.docs.map((mood) => mood.data().emotion);
	console.log(moodsArr, '<-- moodsArr in model');
	return moodsArr;
};

export default fetchMoods;
