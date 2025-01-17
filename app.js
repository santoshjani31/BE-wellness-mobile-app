import express from 'express';
import cors from 'cors';
import endpoints from './endpoints.json' with {type: 'json'};
import getMoods from './controllers/moods.controller.js';
import {
	getActivities,
	getActivityById,
} from './controllers/activities.controller.js';
import {
	getJournalEntries,
	postJournalEntry,
} from './controllers/journal.controller.js';
import getUsersById from './controllers/users.controller.js';
import {
	getArticles,
	getArticleById,
} from './controllers/articles.controller.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.status(200).send({ endpoints }));

app.get('/moods', getMoods);

app.get('/articles', getArticles);

app.get('/articles/:article_id', getArticleById);

app.get('/activities', getActivities);

app.get('/activities/:activity_title', getActivityById);

app.get('/user/:id', getUsersById);

app.get('/user/:id/journal', getJournalEntries);

app.post('/user/:id/journal', postJournalEntry);

export default app;
