<template>
  <div class="home">

    <div style="display:flex;flex-direction:row;justify-content:space-around;">
      <TaskList :status="backlog" :taskFromParent="backlogTasks"></TaskList>
      <TaskList :status="todo" :taskFromParent="todoTasks"></TaskList>
      <TaskList :status="doing" :taskFromParent="doingTasks"></TaskList>
      <TaskList :status="done" :taskFromParent="doneTasks"></TaskList>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import db from '../api/firestore'
import TaskList from '../components/TaskList'

export default {
  props : {
    textSearch : String
  },
  name: 'home',
  components: {
    TaskList
  },
  data () {
    return {
      backlog: 'Back-log',
      todo: 'Todo',
      doing: 'Doing',
      done: 'Done',
      allTasks: [],
      message: ' ahada',
      backlogTasks: [],
      tempbacklogTasks:[],
      todoTasks: [],
      tempTodoTasks : [],
      doingTasks: [],
      tempdoingTask :[],
      doneTasks: [],
      tempdoneTasks:[]
    }
  },
  methods: {
    getAll () {
      db.collection('task')
        .onSnapshot((querySnapshot) => {
          this.backlogTasks = []
          this.tempbacklogTasks = []
          this.todoTasks = []
          this.tempTodoTasks = []
          this.doingTasks = []
          this.tempdoingTask = []
          this.doneTasks = []
          this.tempdoneTasks =[]
          querySnapshot.forEach((doc) => {
            let obj = {
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              assigned: doc.data().assigned,
              status: doc.data().status
            }
            if (obj.status == 0) {
              this.backlogTasks.push(obj)
              this.tempbacklogTasks.push(obj)
            } else if (obj.status == 1) {
              this.todoTasks.push(obj)
              this.tempTodoTasks.push(obj)
            } else if (obj.status == 2) {
              this.doingTasks.push(obj)
              this.tempdoingTask.push(obj)
            } else if (obj.status == 3) {
              this.doneTasks.push(obj)
              this.tempdoneTasks.push(obj)
            }
          })
        })
    },
    filtered(val){
      let title = new RegExp(val, "i")
      this.doneTasks =this.tempdoneTasks.filter(el=>{
        return title.test(el.title)
      })
      this.doingTasks = this.tempdoingTask.filter(el =>{
       return title.test(el.title)
      })
      this.todoTasks = this.tempTodoTasks.filter(el =>{
       return title.test(el.title)
      })
      this.backlogTasks = this.tempbacklogTasks.filter(el =>{
        return title.test(el.title)
      })
    }

  },
  watch : {

    textSearch(newVal,old){
      this.filtered(newVal)
      // console.log(old)
      // console.log(newVal)
    }

  },
  created () {
    this.getAll()

    // console.log(this.allTask)

  // console.log('adad')
    // console.log(this.allTask[0]);
    // this.putTask()
    // console.log(this.allTask)
  }
}
</script>
