import db from '../connection.js';

const fetchUserById = async (id) => {
	const userRef = await db.collection('users').doc(id).get()
    return userRef.data()
};

export default fetchUserById;