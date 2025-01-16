import fetchJournalEntries from '../models/journal.model.js';

const getJournalEntries = async (req, res, next) => {
	try {
		const entries = await fetchJournalEntries();
		res.status(200).send({ entries });
	} catch (err) {
		console.log(err);
	}
};

export default getJournalEntries;
