<template>
  <div id="home">
    <cardContainer title="Todo" name="todo" :list="todos" @update="update"></cardContainer>
    <cardContainer title="Doing" name="doing" :list="doings" @update="update"></cardContainer>
    <cardContainer title="Done" name="done" :list="dones" @update="update"></cardContainer>
  </div>
</template>

<script>
// @ is an alias to /src
import cardContainer from '@/components/CardContainer.vue'
import db from '@/api/firestore.js'

export default {
  name: 'home',
  data: function () {
    return {
      todos: {
        name: 'todos',
        list: []
      },
      doings: {
        name: 'doings',
        list: []
      },
      dones: {
        name: 'dones',
        list: []
      }
    }
  },
  components: {
    cardContainer
  },
  methods: {
    update: () => {

    }
  },
  created () {
    db.collection('kanban')
      .onSnapshot((querySnapshot) => {
        this.todos.list = []
        this.doings.list = []
        this.dones.list = []
        querySnapshot.forEach((doc) => {
          let type = doc.data().type
          if (type === 'todos') {
            this.todos.list.push({
              id: doc.id,
              ...doc.data()
            })
          } else if (type === 'doings') {
            this.doings.list.push({
              id: doc.id,
              ...doc.data()
            })
          } else if (type === 'dones') {
            this.dones.list.push({
              id: doc.id,
              ...doc.data()
            })
          }
        })
      })
  }
}
</script>

<style>
#home{
  display: flex;
  justify-content: space-between;
  padding: 20px;
  height: 100vh;
}
</style>
