import * as firebase from 'firebase/app'
import 'firebase/firestore'

// in the future , seprate initialize app in config

firebase.initializeApp({
  apiKey: 'AIzaSyB3EfVn8V6lojy86t5LOgpRyig-Aucs9YM',
  authDomain: 'kanbanism-bdcd4.firebaseapp.com',
  projectId: 'kanbanism-bdcd4'
})

const db = firebase.firestore()
export default db
