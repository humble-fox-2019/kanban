<template>
  <div id="navbar">
    <div class="logo">
      <h1>J.</h1>
    </div>
    <div class="nav">
      <button @click="newTodo" class="btn-add"><i class="fas fa-plus"></i> New todo</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    newTodo () {
      this.$emit('showForm')
    }
  }
}
</script>

<style>
#navbar{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #ffffff;
  box-shadow: 0 0 20px rgba(0,0,0,.1);
}
.btn-add{
  padding: 10px;
  border: none;
  background-color: #2552b3;
  color: #ffffff;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}
.btn-add:hover{
  background-color: #3664c9;
}
.btn-add i{
  margin-right: 10px;
}
</style>
