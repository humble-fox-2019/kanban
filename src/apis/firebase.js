
import db from '@/configs/firebase.js'

const Task = db.collection('tasks')

export default { Task }