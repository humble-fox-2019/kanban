<template>
  <div>
    <div class="w-64 bg-gray-200 bg-gray flex flex-col items-center rounded-sm pb-2 pr-2 mb-4">
      <div class="container my-2">
        <h1 class="font-bold pl-2">{{ head }}</h1>
      </div>
      <div class="container">
        <div v-for="task in tasks" :key="task.id">
          <SingleTask :task="task"></SingleTask>
        </div>
        <NewTask :head="head"></NewTask>
      </div>
    </div>
  </div>
</template>

<script>
import SingleTask from './SingleTask'
import firebase from '../apis/firebase.js'
import NewTask from '../components/NewTask'
import EditTask from '../components/EditTask'
const { Task } = firebase

export default {
  props: ['head'],
  components: {
    SingleTask,
    NewTask,
    EditTask
  },
  data() {
    return {
      tasks: [],
      addStatus: false
    }
  },
  methods: {
    fetchTasks() {
      console.log(Task)
      Task.where('status', '==', this.head)
        .get()
        .then(querySnapshot => {
          const tempTasks = []
          querySnapshot.forEach(doc => {
            const newTask = {
              id: doc.id,
              ...doc.data()
            }

            tempTasks.push(newTask)
          })
          this.tasks = tempTasks
        })
        .catch(console.log)
    },
    snapShot() {
      Task.where('status', '==', this.head).onSnapshot(querySnapshot => {
        const tempTasks = []
        querySnapshot.forEach(doc => {
          const newTask = {
            id: doc.id,
            ...doc.data()
          }

          tempTasks.push(newTask)
        })
        this.tasks = tempTasks
      })
    }
  },
  created() {
    // this.fetchTasks()
    this.snapShot()
  }
}
</script>

<style scoped>
.bg-gray {
  background-color: #ebecf0;
}

.container {
  width: 95%;
}
</style>
