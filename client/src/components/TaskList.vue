<template>
<div class="card-column" style="display:flex; flex-direction:column;">
<h2> {{status}}</h2>

<Task v-for="theTask in taskFromParent" :key="theTask.id" :theTask="theTask"></Task>

</div>

</template>

<script>
import Task from '../components/Task'
export default {
  props: {
    status: String,
    taskFromParent: Array

  },
  name: 'TaskList',
  components: {
    Task
  },
  created () {

  }

}
</script>

<style>

</style>
