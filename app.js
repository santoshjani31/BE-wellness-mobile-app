import express from 'express';
import cors from 'cors';
import getMoods from './controllers/moods.controller.js';
import getActivities from './controllers/activities.controller.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/moods', getMoods);

app.get('/activities', getActivities);

export default app;
