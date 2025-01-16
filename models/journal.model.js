import db from '../connection.js';

const fetchJournalEntries = async () => {
	const entriesArr = [];
	const entries = await db.collection('journal entries').get();
	entries.forEach((entry) => {
		entriesArr.push(entry.data());
	});
	return entriesArr;
};

export default fetchJournalEntries;
