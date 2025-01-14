const { initializeApp, cert } = require ('firebase-admin/app')
const { getFirestore } = require ('firebase-admin/firestore');
const serviceAccount = require ('./SDK.json');
const testServiceAccount = require('./testSDK.json')
require('dotenv').config()


if (process.env.NODE_ENV === 'test') {
  initializeApp({
    credential: cert(testServiceAccount),
  });
  
} else {
  console.log('inside dev enviroment')
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

module.exports = db