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
		const {body} = req.body

		return 

	} catch(err){
		console.log(err)
	}
}
export default  {getJournalEntries, postJournalEntry}
