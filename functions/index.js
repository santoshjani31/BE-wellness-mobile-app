// index.js

// Firebase and Express setup
const express = require('express');
const cors = require('cors');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./SDK.json');
const endpoints = require('./endpoints.json');
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

// Fetch Activities
const fetchActivities = async (moodTag, category) => {
  const activitiesArr = [];
  const activities = db.collection('activities');
  let snapshot = '';

  console.log('moodTag:', moodTag, 'category:', category);

  if (moodTag && category) {
    snapshot = await activities
      .where('moodTag', 'array-contains', moodTag)
      .where('category', '==', category)
      .get();
  } else if (moodTag) {
    snapshot = await activities
      .where('moodTag', 'array-contains', moodTag)
      .get();
  } else if (category) {
    snapshot = await activities.where('category', '==', category).get();
  } else {
    snapshot = await activities.get();
  }

  snapshot.forEach((activity) => {
    activitiesArr.push(activity.data());
  });

  return activitiesArr;
};

// Fetch Activity By ID
const fetchActivityById = async (activity_title) => {
  const activity = await db.collection('activities').doc(activity_title).get();
  return activity.data();
};

// Get Activities
const getActivities = async (req, res) => {
  try {
    const { moodTag, category } = req.query;
    const activities = await fetchActivities(moodTag, category);
    res.status(200).send({ activities });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch activities' });
  }
};

// Get Activity By ID
const getActivityById = async (req, res) => {
  try {
    const { activity_title } = req.params;
    const activity = await fetchActivityById(activity_title);
    res.status(200).send({ activity });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to fetch activity' });
  }
};

// Combined Articles Controller and Model
// Get Articles
const fetchArticles = async (mood) => {
  const articlesArr = [];
  const articleRef = db.collection('articles');
  let articles = '';

  if (mood) {
    articles = await articleRef.where('mood', '=', mood).get();
  } else {
    articles = await articleRef.get();
  }

  articles.forEach((article) => {
    articlesArr.push(article.data());
  });

  return articlesArr;
};

// Get Articles by Id
const fetchArticleById = async (article_id) => {
  const article = await db.collection('articles').doc(article_id).get();
  return article.data();
};

const getArticles = async (req, res, next) => {
  try {
    const { mood } = req.query;
    const articles = await fetchArticles(mood);
    res.status(200).send({ articles });
  } catch (err) {
    console.log(err);
  }
};

const getArticleById = async (req, res) => {
  try {
    const { article_id } = req.params;
    const article = await fetchArticleById(article_id);
    res.status(200).send({ article });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to fetch article' });
  }
};

//Journal Helper Functions
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

const fetchJournalEntryById = async (id, journal_id) => {
  const userRef = db.collection('users').doc(id);
  const journalEntry = await userRef
    .collection('journal')
    .doc(journal_id)
    .get();
  return journalEntry.data();
};

const banishJournalEntry = async (id, journal_id) => {
  const entryToDelete = await fetchJournalEntryById(id, journal_id);

  if (entryToDelete !== undefined) {
    const userRef = db.collection('users').doc(id);
    await userRef.collection('journal').doc(journal_id).delete();
  } else {
    throw { status: 404, msg: 'Not found' };
  }
};

const updateJournalEntry = async (id, journal_id, updatedInfo) => {
  const userRef = db.collection('users').doc(id);
  await userRef.collection('journal').doc(journal_id).update(updatedInfo);
  const updatedEntry = await fetchJournalEntryById(id, journal_id);
  return updatedEntry;
};

//Journal Controller Functions
const getJournalEntries = async (req, res) => {
  try {
    const { id } = req.params;
    const entries = await fetchJournalByUser(id);
    res.status(200).send({ entries });
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(500).send({ error: 'Failed to create journal entry' });
  }
};

const getJournalEntryById = async (req, res) => {
  try {
    const { id, journal_id } = req.params;
    const journalEntry = await fetchJournalEntryById(id, journal_id);
    res.status(200).send({ journalEntry });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to fetch journal entry' });
  }
};

const deleteJournalEntry = async (req, res) => {
  try {
    const { id, journal_id } = req.params;
    await banishJournalEntry(id, journal_id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      res.status(404).send({ error: error.msg });
    } else {
      res.status(500).send({ error: 'Failed to delete journal entry' });
    }
  }
};

const patchJournalEntry = async (req, res) => {
  try {
    const { id, journal_id } = req.params;
    const updatedInfo = req.body;
    const updatedEntry = await updateJournalEntry(id, journal_id, updatedInfo);
    res.status(200).send({ updatedEntry });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to update journal entry' });
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
app.get('/', (req, res) => res.status(200).send({ endpoints }));
app.get('/moods', getMoods);
app.get('/articles', getArticles);
app.get('/articles/:article_id', getArticleById);
app.get('/activities', getActivities);
app.get('/activities/:activity_title', getActivityById);
app.get('/user/:id', getUsersById);
app.get('/user/:id/journal', getJournalEntries);
app.post('/user/:id/journal', postJournalEntry);
app.get('/user/:id/journal/:journal_id', getJournalEntryById);
app.delete('/user/:id/journal/:journal_id', deleteJournalEntry);
app.patch('/user/:id/journal/:journal_id', patchJournalEntry);

// app.listen(4000, () => console.log('Server running on port 4000'));
// Firebase Function Export
const functions = require('firebase-functions');

exports.api = functions.https.onRequest(app);
