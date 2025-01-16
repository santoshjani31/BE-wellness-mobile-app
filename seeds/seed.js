import db from '../connection.js';

async function seed({
	activitiesData,
	journalData,
	moodData,
	userData,
	articlesData,
}) {
	try {
		await deleteCollection(db, 'moods', moodData.length);
		await deleteCollection(db, 'activities', activitiesData.length);
		await deleteCollection(db, 'journal entries', journalData.length);
		await deleteCollection(db, 'users', userData.length);
		await deleteCollection(db, 'articles', articlesData.length);

		moodData.forEach(async (mood) => {
			const moodsRef = await db
				.collection('moods')
				.doc(`${mood.emotion}`)
				.set(mood);
		});

		activitiesData.forEach(async (activity) => {
			const activitiesRef = await db
				.collection('activities')
				.doc(`${activity.title}`)
				.set(activity);
		});

		journalData.forEach(async (entry, index) => {
			const journalRef = await db
				.collection('journal entries')
				.doc(`${index}`)
				.set(entry);
		});

		userData.forEach(async (user, index) => {
			const userRef = await db.collection('users').doc(`${index}`).set(user);
		});

		articlesData.forEach(async (article, index) => {
			const articlesRef = await db
				.collection('articles')
				.doc(`${index}`)
				.set(article);
		});
	} catch (err) {
		console.log(err);
	}
}

// From Firestore docs
async function deleteCollection(db, collectionPath, batchSize) {
	const collectionRef = db.collection(collectionPath);
	const query = collectionRef.orderBy('__name__').limit(batchSize);

	return new Promise((resolve, reject) => {
		deleteQueryBatch(db, query, resolve).catch(reject);
	});
}

async function deleteQueryBatch(db, query, resolve) {
	const snapshot = await query.get();

	const batchSize = snapshot.size;
	if (batchSize === 0) {
		// When there are no documents left, we are done
		resolve();
		return;
	}

	// Delete documents in a batch
	const batch = db.batch();
	snapshot.docs.forEach((doc) => {
		batch.delete(doc.ref);
	});
	await batch.commit();

	// Recurse on the next process tick, to avoid
	// exploding the stack.
	process.nextTick(() => {
		deleteQueryBatch(db, query, resolve);
	});
}

export default seed;
