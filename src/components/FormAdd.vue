<template>
  <div id="form-container">
    <form @submit.prevent="addTodo">
      <div class="form-heading">
        <h2>Add new todo</h2>
      </div>
      <div class="form-body">
        <div class="input-group">
          <label for="title">Title</label>
          <input type="text" id="title" placeholder="todo title" v-model="title" autocomplete="off">
        </div>
        <div class="input-group">
          <label for="description">Description</label>
          <input type="text" id="description" placeholder="todo description" v-model="description" autocomplete="off">
        </div>
        <div class="input-group">
          <input type="submit" value="Add">
        </div>
        <div class="input-group">
          <input type="reset" value="Cancel" @click="hideForm">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/api/firestore.js'

export default {
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    hideForm () {
      this.$emit('hideForm')
    },
    addTodo () {
      db.collection('kanban').add({
        title: this.title,
        description: this.description,
        type: 'todos'
      })
        .then((docRef) => {
          this.$emit('hideForm')
        })
    }
  }
}
</script>

<style>
#form-container{
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.459);
}
#form-container form{
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}
.form-heading{
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.459);
}
.form-body{
  margin-top: 30px;
}
.input-group{
  margin-bottom: 10px;
}
.input-group > *{
  display: block;
}
input{
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}
</style>
