// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

// var firebaseConfig = {
//     apiKey: "AIzaSyDzhBszSH_9w9yXAx1YbfQ76lVHXX3-F2A",
//     authDomain: "kanbansrh.firebaseapp.com",
//     databaseURL: "https://kanbansrh.firebaseio.com",
//     projectId: "kanbansrh",
//     storageBucket: "kanbansrh.appspot.com",
//     messagingSenderId: "402887688400",
//     appId: "1:402887688400:web:0b883d8cb2308165"
//   };
import * as firebase from 'firebase/app';
import "firebase/firestore";
firebase.initializeApp({
    apiKey: process.env.VUE_APP_apiKey,
    authDomain: process.env.VUE_APP_authDomain,
    projectId: process.env.VUE_APP_projectId
});
const db = firebase.firestore();
export default db;

// firebase.initializeApp({
//     apiKey: 'AIzaSyDzhBszSH_9w9yXAx1YbfQ76lVHXX3-F2A',
//     authDomain: 'kanbansrh.firebaseapp.com',
//     projectId: 'kanbansrh'
// });
