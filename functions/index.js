// index.js

// Firebase and Express setup
const express = require('express');
const cors = require('cors');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./SDK.json');
//require('dotenv/config');

// Initialize Firebase Admin SDK
if (process.env.NODE_ENV === 'test') {
  initializeApp({
    credential: cert(require('./testSDK.json')), // Use test credentials if in test environment
  });
} else {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

// Express app setup
const app = express();
app.use(cors());
app.use(express.json());

// Controller Functions

// Activities Controller
const fetchActivities = async () => {
  const activitiesArr = [];
  const activities = await db.collection('activities').get();
  activities.forEach((activity) => {
    activitiesArr.push(activity.data());
  });
  return activitiesArr;
};

const getActivities = async (req, res) => {
  try {
    const activities = await fetchActivities();
    res.status(200).send({ activities });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Failed to fetch activities' });
  }
};

// Articles Controller
const fetchArticles = async () => {
  const articlesArr = [];
  const articleRef = await db.collection('articles').get();
  articleRef.forEach((article) => {
    articlesArr.push(article.data());
  });
  return articlesArr;
};

const getArticles = async (req, res) => {
  try {
    const articles = await fetchArticles();
    res.status(200).send({ articles });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Failed to fetch articles' });
  }
};

// Journal Controller
const fetchJournalByUser = async (id) => {
  const userRef = db.collection('users').doc(id);
  const journal = await userRef.collection('journal').get();

  const entryArray = [];
  journal.forEach((entry) => {
    entryArray.push(entry.data());
  });

  return entryArray;
};

const createJournalEntry = async (id, newEntry) => {
  const userRef = db.collection('users').doc(id);
  const journal = await userRef.collection('journal').add(newEntry);
  const postedEntry = await userRef.collection('journal').doc(journal.id).get();

  return postedEntry.data();
};

const getJournalEntries = async (req, res) => {
  try {
    const { id } = req.params;
    const entries = await fetchJournalByUser(id);
    res.status(200).send({ entries });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Failed to fetch journal entries' });
  }
};

const postJournalEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const newEntry = req.body;

    const postedEntry = await createJournalEntry(id, newEntry);
    res.status(201).send({ entry: postedEntry });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Failed to post journal entry' });
  }
};

// Moods Controller
const fetchMoods = async () => {
  const moodsArr = [];
  const moodsRef = await db.collection('moods').get();
  moodsRef.forEach((mood) => {
    moodsArr.push(mood.data().emotion);
  });
  return moodsArr;
};

const getMoods = async (req, res) => {
  try {
    const moods = await fetchMoods();
    res.status(200).send({ moods });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Failed to fetch moods' });
  }
};

// Users Controller
const fetchUserById = async (id) => {
  const userRef = await db.collection('users').doc(id).get();
  return userRef.data();
};

const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await fetchUserById(id);
    res.status(200).send({ user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Failed to fetch user by ID' });
  }
};

// Routes
app.get('/moods', getMoods);
app.get('/articles', getArticles);
app.get('/activities', getActivities);
app.get('/user/:id', getUsersById);
app.get('/user/:id/journal', getJournalEntries);
app.post('/user/:id/journal', postJournalEntry);

//app.listen(4000, () => console.log('Server running on port 4000'));
// Firebase Function Export
const functions = require('firebase-functions');

exports.api = functions.https.onRequest(app);
