import fetchUserById from '../models/users.model.js';

const getUsersById = async (req, res, next) => {
	try {
        const {id} = req.params
		const user = await fetchUserById(id);
		res.status(200).send({ user });
	} catch (error) {
		next(error);
	}
};

export default getUsersById;