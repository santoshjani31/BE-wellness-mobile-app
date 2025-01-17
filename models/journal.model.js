import db from '../connection.js';

const fetchJournalByUser = async (id) => {
	const userRef = db.collection('users').doc(id);
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

const fetchJournalEntryById = async (id, journal_id) => {
	const userRef = db.collection('users').doc(id);
	const journalEntry = await userRef
		.collection('journal')
		.doc(journal_id)
		.get();
	return journalEntry.data();
};

const banishJournalEntry = async (id, journal_id) => {
	const entryToDelete = await fetchJournalEntryById(id, journal_id);

	if (entryToDelete !== undefined) {
		const userRef = db.collection('users').doc(id);
		await userRef.collection('journal').doc(journal_id).delete();
		return;
	} else {
		return Promise.reject({ status: 404, msg: 'not found' });
	}
};

const updateJournalEntry = async (id, journal_id, updatedInfo) => {
	const userRef = db.collection('users').doc(id);
	await userRef.collection('journal').doc(journal_id).update(updatedInfo);
	const updatedEntry = await fetchJournalEntryById(id, journal_id);
	return updatedEntry;
};

export {
	fetchJournalByUser,
	createJournalEntry,
	fetchJournalEntryById,
	banishJournalEntry,
	updateJournalEntry,
};
