import testData from '../data/testdata';
import seed from '../seeds/seed';
import app from '../app.js';
import request from 'supertest';

beforeEach(() => seed(testData));

describe('GET /moods', () => {
	test('200: Returns the array of moods', () => {
		return request(app)
			.get('/moods')
			.expect(200)
			.then(({ body: { moods } }) => {
				expect(moods.length).toBe(4);
				moods.forEach((mood) => {
					expect(typeof mood).toBe('string');
				});
			});
	});
});
