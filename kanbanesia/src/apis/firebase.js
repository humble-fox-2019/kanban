import firebase from 'firebase/app'
import 'firebase/firestore'

console.log(process.env.VUE_APP_APIKEY, '<<< APIKEY')
console.log(process.env.VUE_APP_AUTHDOMAIN, '<<< AUTH DOMAIN')
console.log(process.env.VUE_APP_AUTHDOMAIN, '<<< PROJECTID')
firebase.initializeApp({

    // apiKey: process.env.VUE_APP_APIKEY,
    // authDomain: process.env.VUE_APP_AUTHDOMAIN,
    // projectId: process.env.VUE_APP_PROJECTID

    apiKey: "AIzaSyCbfNBS8tYlWh-lHU926kXIXM5kqNh2qiw",
    authDomain: "project-id.firebaseapp.com",
    projectId: "kanbanesia"

});

let db = firebase.firestore();

export default db