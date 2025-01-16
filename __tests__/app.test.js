import testData from '../data/testdata';
import seed from '../seeds/seed';
import app from '../app.js';
import request from 'supertest';

// beforeEach(async () => await seed(testData));

describe('/moods', () => {
	describe('GET /moods', () => {
		test('200: Returns the array of moods', async () => {
			return request(app)
				.get('/moods')
				.expect(200)
				.then(({ body: { moods } }) => {
					expect(moods).toHaveLength(4);
					moods.forEach((mood) => {
						expect(typeof mood).toBe('string');
					});
				});
		});
	});
});

describe('/activities', () => {
	describe('GET /activities', () => {
		test('200: Returns the array of activities', async () => {
			return request(app)
				.get('/activities')
				.expect(200)
				.then(({ body: { activities } }) => {
					expect(activities).toHaveLength(3);
					activities.forEach((activity) => {
						expect(activity).toMatchObject({
							title: expect.any(String),
							duration: expect.any(String),
							difficulty: expect.any(String),
							description: expect.any(String),
							category: expect.any(String),
						});
					});
				});
		});
	});
});
