import firebase from '@/config/configFirebase';

const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true,
});

export default db;
