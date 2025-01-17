import testData from '../data/testdata';
import seed from '../seeds/seed';
import app from '../app.js';
import request from 'supertest';
import activities from '../data/testdata/activities.js';

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
							duration: expect.any(Number),
							difficulty: expect.any(String),
							description: expect.any(String),
							category: expect.any(String),
						});
					});
				});
		});
		describe('/activities Queries', () => {
			test('200: Returns the array of activities filtered to the input query', async () => {
				return request(app)
					.get('/activities?moodTag=happy')
					.expect(200)
					.then(({ body: { activities } }) => {
						expect(activities).toHaveLength(2);
						activities.forEach((activity) => {
							expect(activity).toHaveProperty('moodTag', 'happy');
						});
					});
			});
			test('200: Returns the array of activities filtered to the input queries with multiple conditions', async () => {
				return request(app)
					.get('/activities?moodTag=happy&category=breathing')
					.expect(200)
					.then(({ body: { activities } }) => {
						expect(activities).toHaveLength(1);
						activities.forEach((activity) => {
							expect(activity).toHaveProperty('category', 'breathing');
							expect(activity).toHaveProperty('moodTag', 'happy');
						});
					});
			});
		});
	});
	describe('GET /activities/:activity_title', () => {
		test('200: Returns the correct activity by the input title', async () => {
			return request(app)
				.get('/activities/activity 1')
				.expect(200)
				.then(({ body: { activity } }) => {
					expect(activity).toMatchObject({
						title: 'activity 1',
						description: 'meditate with us be calm',
						duration: 120,
						audioURL: '',
						imageURL: '',
						category: 'breathing',
						difficulty: 'advanced',
					});
				});
		});
	});
});

describe('/users', () => {
	describe(' GET/users/:id', () => {
		test('200: returns a user by id', async () => {
			return request(app)
				.get('/user/0')
				.expect(200)
				.then(({ body: { user } }) => {
					expect(user).toMatchObject({
						username: 'fakebrad123',
						email: 'fakebrad@gmail.com',
						firstName: 'Test Brad',
						lastName: 'Testsmith',
						profilePicture: '',
					});
				});
		});
	});

	describe('/journal', () => {
		describe('GET /user/:id/journal', () => {
			test('200: Returns the array of journal entries connected to a user', async () => {
				return request(app)
					.get('/user/0/journal')
					.expect(200)
					.then(({ body: { entries } }) => {
						entries.forEach((entry) => {
							expect(entry).toMatchObject({
								title: expect.any(String),
								emotion: expect.any(String),
								body: expect.any(String),
							});
						});
					});
			});
		});
		describe('POST /user/:id/journal', () => {
			test('201: Posts a new journal entry to the users journal', async () => {
				const newEntry = {
					title: 'I am feelling like fishing',
					emotion: 'anxious',
					body: 'I wouold like to go fishing, but Im scared of the hooks',
				};

				return request(app)
					.post('/user/0/journal')
					.send(newEntry)
					.expect(201)
					.then(({ body: { entry } }) => {
						expect(entry).toMatchObject(newEntry);
					});
			});
		});
        describe.skip('GET /user/:id/journal/:journal_id', () => {
            test('200: returns a journal entry by id', () => {
                return request(app)
                .get('/user/0/journal/1')
                .expect(200)
                .then(({body: {journalEntry}}) => {
                    expect(journalEntry).toMatchObject({
                        title: 'I am feelling like fishing',
                        emotion: 'anxious',
                        body: 'I wouold like to go fishing, but Im scared of the hooks',
                    })
                })})
            })
        })
        describe.skip('DELETE /users/:id/journal/:journal_id', () => {
            test('204: deletes a journal by its id from the users profile', () => {
                return request(app)
                .delete('/user/0/journal/4')
                .expect(204)
            })
        })
	});

describe('/articles', () => {
	describe('GET /articles', () => {
		test('200: Returns all articles', async () => {
			return request(app)
				.get('/articles')
				.expect(200)
				.then(({ body: { articles } }) => {
					expect(articles).toHaveLength(5);
					articles.forEach((article) => {
						expect(article).toMatchObject({
							title: expect.any(String),
							body: expect.any(String),
							mood: expect.any(String),
							picture: expect.any(String),
							author: expect.any(String),
						});
					});
				});
		});
	});
	describe('GET /articles/:article_id', () => {
		test('200: Returns the correct article by the input id', async () => {
			return request(app)
				.get('/articles/3')
				.expect(200)
				.then(({ body: { article } }) => {
					expect(article).toMatchObject({
						title: 'article 4',
						body: 'body of article 4',
						mood: 'mood 4',
						picture: 'picture of article 4',
						author: 'author 4',
					});
				});
		});
	});
});
