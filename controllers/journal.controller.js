import {
	fetchJournalByUser,
	createJournalEntry,
	fetchJournalEntryById,
	banishJournalEntry,
	updateJournalEntry,
} from '../models/journal.model.js';

const getJournalEntries = async (req, res, next) => {
	try {
		const { id } = req.params;
		const entries = await fetchJournalByUser(id);
		res.status(200).send({ entries });
	} catch (err) {
		console.log(err);
	}
};

const postJournalEntry = async (req, res, next) => {
	try {
		const { id } = req.params;
		const newEntry = req.body;

		const postedEntry = await createJournalEntry(id, newEntry);
		res.status(201).send({ entry: postedEntry });
	} catch (err) {
		console.log(err);
	}
};

const getJournalEntryById = async (req, res, next) => {
	try {
		const { id, journal_id } = req.params;
		const journalEntry = await fetchJournalEntryById(id, journal_id);
		res.status(200).send({ journalEntry });
	} catch (error) {
		console.log(error);
	}
};

const deleteJournalEntry = async (req, res, next) => {
	try {
		const { id, journal_id } = req.params;
		await banishJournalEntry(id, journal_id);
		res.status(204).send();
	} catch (error) {
		console.log(error);
	}
};

const patchJournalEntry = async (req, res, next) => {
	try {
		const { id, journal_id } = req.params;
		const updatedInfo = req.body;
		const updatedEntry = await updateJournalEntry(id, journal_id, updatedInfo);
		res.status(200).send({ updatedEntry });
	} catch (error) {
		console.log(error);
	}
};

export {
	getJournalEntries,
	postJournalEntry,
	getJournalEntryById,
	deleteJournalEntry,
	patchJournalEntry,
};
