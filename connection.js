import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
import serviceAccount from './SDK.json' with {type: 'json'};
import testServiceAccount from './test-SDK.json' with {type: 'json'}

const devDbConfig = {
  credential: cert(serviceAccount)
}

const testDbConfig = {
  credential: cert(testServiceAccount)
}

const devDbInstance = initializeApp(devDbConfig, 'devDbInstance');

const testDbInstance = initializeApp(testDbConfig, 'testDbInstance')

const devDb = devDbInstance.getFirestore();
const testDb = testDbInstance.database();

// const db = getFirestore();


export {devDb, testDb}