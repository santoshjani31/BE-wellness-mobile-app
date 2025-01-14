import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './SDK.json' with {type: 'json'};
import 'dotenv/config';

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

if (process.env.NODE_ENV === 'test') {
  console.log('inside test node_env')
  // Connect to Firestore emulator if in test environment
  db.useEmulator('localhost', 9090);
}

export default db;