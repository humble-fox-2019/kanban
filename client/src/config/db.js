import { initializeApp } from 'firebase'

const app = initializeApp ({
  apiKey: "AIzaSyBiLwnkCnL2N8d8hWZq3ZZznxe2GQlq4uA",
  authDomain: "pain-1287.firebaseapp.com",
  databaseURL: "https://pain-1287.firebaseio.com",
  projectId: "pain-1287",
  storageBucket: "pain-1287.appspot.com",
  messagingSenderId: "486246287217",
  appId: "1:486246287217:web:58e4487f025887e59b58d0"
});

export const db = app.firestore();
export const todosCollection = db.collection('toDos');