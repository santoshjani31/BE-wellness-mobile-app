import {fetchJournalByUser, createJournalEntry} from '../models/journal.model.js';

export const getJournalEntries = async (req, res, next) => {
	try {
		const {id} = req.params
		const entries = await fetchJournalByUser(id);
		res.status(200).send({ entries });
	} catch (err) {
		console.log(err);
	}
};


export const postJournalEntry = async (req, res, next) => {
	try{
		const {id} = req.params
		const newEntry = req.body

		const postedEntry = await createJournalEntry(id, newEntry)
		res.status(201).send({entry: postedEntry})

	} catch(err){
		console.log(err)
	}
}
export default  {getJournalEntries, postJournalEntry}
