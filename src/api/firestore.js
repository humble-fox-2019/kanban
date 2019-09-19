import * as firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyBmfe1ofZM88duUVeLzDekD58w1bhRjFHQ',
  authDomain: 'todo-project-1565525647312.firebaseapp.com',
  projectId: 'todo-project-1565525647312'
})

const db = firebase.firestore()

export default db
