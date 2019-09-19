const firebase = require("firebase");
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyARVMmHBDzF2x0-XpE_Up6uKzcuDZARmdU",
    authDomain: "tamvankanban.firebaseapp.com",
    projectId: "tamvankanban"
});

const db = firebase.firestore();

export default db