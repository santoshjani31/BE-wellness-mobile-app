import db from '../connection.js';

async function seed({
	activitiesData,
	moodData,
	userData,
	articlesData,
	journalEntriesData,
}) {
	try {
		await deleteCollection(db, 'moods', moodData.length);
		await deleteCollection(db, 'activities', activitiesData.length);

		const usersRef = await db.collection('users').get();

		for (const user of usersRef.docs) {
			await deleteCollection(db, `users/${user.id}/journal`, 50);
		}

		await deleteCollection(db, 'users', userData.length);
		await deleteCollection(db, 'articles', articlesData.length);

		for (const mood of moodData) {
			await db.collection('moods').doc(`${mood.emotion}`).set(mood);
		}

		for (const activity of activitiesData) {
			await db.collection('activities').doc(`${activity.title}`).set(activity);
		}

		for (const [index, user] of userData.entries()) {
			await db.collection('users').doc(`${index}`).set(user);
		}

		for (const [index, article] of articlesData.entries()) {
			await db.collection('articles').doc(`${index}`).set(article);
		}

		for (const [index, entry] of journalEntriesData.entries()) {
			const userRef = db.collection('users').doc('0');
			await userRef.collection('journal').doc(`${index}`).set(entry);
		}
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
