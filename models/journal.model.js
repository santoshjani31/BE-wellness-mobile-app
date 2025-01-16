import db from '../connection.js';

const fetchJournalByUser = async (id) => {
	const userRef = db.collection('users').doc(id)
    const userGet = await userRef.get()
    const journal = await userRef.collection('journal').get();
    
    const entryArray = []

    journal.forEach((entry)=> {
		entryArray.push(entry.data())
    })

    return entryArray
};

const createJournalEntry = async (id, body) => {
	console.log(body)
}

export {fetchJournalByUser, createJournalEntry};