// import testData from '../data/testdata';
// import seed from '../seeds/seed';

const testData = require('../data/testdata') 
const seed = require('../seeds/seed.cjs')

beforeEach(() => seed(testData))

test ("silly test", () => {
    expect(8).toBe(8)
});