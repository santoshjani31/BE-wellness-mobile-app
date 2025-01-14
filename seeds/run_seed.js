import devData from '../data/devdata/index.js';
import seed from './seed.js';

const runSeed = () => {
	return seed(devData);
};

runSeed();
