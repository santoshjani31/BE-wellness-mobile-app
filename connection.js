import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from'firebase-admin/firestore';
import serviceAccount from './SDK.json' with {type:'json'};
import testServiceAccount from './testSDK.json' with {type:'json'};
import 'dotenv/config';

if (process.env.NODE_ENV === 'test') {
  initializeApp({
    
    credential: cert(testServiceAccount),
  })
  
} else {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

export default db;