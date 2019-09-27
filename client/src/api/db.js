import firebase from '../config/firebase'

let db = firebase.firestore();
const Kanban = db.collection("kanban")
export default Kanban