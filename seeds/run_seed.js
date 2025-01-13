import devData from '../data/devdata/index.js';
import seed from './seed.js';
import { devDb } from '../connection.js';

const runSeed = () => {
	return seed(devDb, devData);
};

runSeed();
