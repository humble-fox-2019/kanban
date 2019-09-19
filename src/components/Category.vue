<template>
    <div style="display: flex; ">
      <div v-for="category in categories" :key="category.name" class="card" style="width: 19rem;">
        <div class="card-header" >
            {{ category.title }}
        </div>
        <div class="card-body" style="height: auto" >
          <draggable v-model="category.tasks" group="todo" @start="drag=true" @end="drag=false">
            <Task v-for="element in category.tasks" :key="element.id" :task="element"></Task>
          </draggable>
        </div>
      </div>
    </div>
</template>

<script>
import Task from './Task'
import draggable from 'vuedraggable'
import db from '../apis/firebase'
const tasksCollection = db.collection('tasks')

export default {
  name: 'Category',
  //props: ['category', 'tasks'],
  components: { Task, draggable },
  data() {
      return {
        categories: [
        {
          name: 'backlog',
          title: 'Backlog',
          color: 'orange',
          tasks: []
        },
        {
          name: 'todo',
          title: 'Todo',
          color: 'blue',
          tasks: []
        },
        {
          name: 'doing',
          title: 'Doing',
          color: 'yellow',
          tasks: []
        },
        {
          name: 'done',
          title: 'Done',
          color: 'green',
          tasks: []
        },
      ]
      }
  },
  watch: {
    categories: {
      deep: true,
      handler(newVal, oldVal) {
        console.log('categories has changed!')
        console.log(newVal)
        newVal.forEach(category => {
          category.tasks.forEach(task => {
            if(category.name !== task.status) {
              tasksCollection.doc(task.id).update({
                status: category.name
              });
            }
          })
        })
      }
    }
  },
  created() {
    tasksCollection.onSnapshot((querySnapshot) => {
      this.categories.forEach(category => {
        category.tasks = [];
      })
      console.log('changes', querySnapshot)
        // let listCategories = this.categories
        querySnapshot.forEach(doc => {
          const status = doc.data().status;
          const index = this.categories.findIndex(el => el.name == status);
          const payload = {
            id: doc.id,
            ...doc.data()
          }

          this.categories[index].tasks.push(payload);
          
        })
      })
  }
}
</script>

<style>
</style>