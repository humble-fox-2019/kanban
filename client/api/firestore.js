  import * as firebase from 'firebase/app'
  import 'firebase/firestore'

  const firebaseConfig = {
    apiKey: process.env.VUE_APP_APIKEY,
    authDomain: process.env.VUE_APP_AUTHDOMAIN,
    projectId: 'kanban-5c41c',
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore()

  export default db;