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

describe("/users", () => {
    describe(" GET/users/:id", () => {
        test("200: returns a user by id", async () => {
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
                    })
				});
        })
    });

    describe('/journal', () => {
        describe('GET /user/:id/journal', () => {
            test('200: Returns the array of journal entries connected to a user', async () => {
                return request(app)
                .get('/user/0/journal')
                .expect(200)
                .then(({body: {entries}}) => {
                    expect(entries).toHaveLength(1)
                    entries.forEach((entry) => {
                        expect(entry).toMatchObject({
                            title: expect.any(String),
                            emotion: expect.any(String),
                            body: expect.any(String),
                        })
                    })
                })
            });
        });
        describe('POST /user/:id/journal', () => {
            test("201: Posts a new journal entry to the users journal", async () => {
                const newEntry = {
                    title: "I am feelling like fishing",
                    emotion: "anxious",
                    body: "I wouold like to go fishing, but Im scared of the hooks",
                }

                return request(app)
                .post('/user/0/journal')
                .send(newEntry)
                .expect(201)
                .then(({body: {entry}}) => {
                    expect(entry).toMatchObject(newEntry)
                })
            })
        })
    });
    
});
