import db from '../connection.js';

const fetchJournalByUser = async (id) => {
	const userRef = db.collection('users').doc(id);
	// const userGet = await userRef.get()
	const journal = await userRef.collection('journal').get();

	const entryArray = [];

	journal.forEach((entry) => {
		entryArray.push(entry.data());
	});

	return entryArray;
};

const createJournalEntry = async (id, newEntry) => {
	const userRef = db.collection('users').doc(id);
	const journal = await userRef.collection('journal').add(newEntry);
	const postedEntry = await userRef.collection('journal').doc(journal.id).get();

	return postedEntry.data();
};

export { fetchJournalByUser, createJournalEntry };
