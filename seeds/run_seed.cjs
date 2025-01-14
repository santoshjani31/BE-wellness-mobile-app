const devData = require ('../data/devdata/index.js');
const seed = require ('./seed.cjs');

const runSeed = () => {
	return seed(devData);
};

runSeed();
