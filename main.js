import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
import serviceAccount from './proj-gr-2-wellness-app-firebase-adminsdk-nash5-df02dd3f00.json' with {type: 'json'};

initializeApp({
    credential: cert(serviceAccount)
  });


  const db = getFirestore();
  
  // ex of adding data 
  const postJournalEntry = async () => {
    const docRef = db.collection('Journal entries').doc('2')

    await docRef.set({
        'Body': 'oh no lots of snow very cold',
        'Emotion': 'Sad',
        'Title': 'Feeling cold'
    })
  }

const getSingleEntry = async () => {
  const snapshot = db.collection('Journal entries').doc('1');
  const entry  = await snapshot.get()
  console.log(entry.data())
  // console.log(snapshot.docs)
  // snapshot.forEach((doc) => {
  //   console.log(doc.id, '=>', doc.data());
  // });
}
