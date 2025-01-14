import testData from '../data/testdata';
import seed from '../seeds/seed';

beforeEach(() => seed(testData))

test ("silly test", () => {
    expect(8).toBe(8)
});