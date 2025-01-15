import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from'firebase-admin/firestore';
import serviceAccount from './SDK.json' with {type:'json'};
import testServiceAccount from './testSDK.json' with {type:'json'};
import 'dotenv/config';
import express from 'express';

if (process.env.NODE_ENV === 'test') {
  initializeApp({
    credential: cert(testServiceAccount),
    // databaseURL: process.env.test-mindfulness-db.firebaseio.com
  // "https://test-mindfulness-db.firebaseio.com?"
  })
  
} else {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

const app = express();

/*
const app = express()
corse 
firebase functions 

then use app to create routes with req and res ie: 
app.get('users', (req,res) => {
  return res.status(200).send(....)})

  CRUD in express

  need to init with firebase functions and install cors 
*/

export {db, app}