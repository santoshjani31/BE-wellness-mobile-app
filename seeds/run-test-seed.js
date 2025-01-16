import testData from '../data/testdata/index.js';
import seed  from './seed.js';

const runSeed = () => {
	return seed(testData);
};

runSeed();
