<template>
  <div class="home w-full flex justify-center bg-blue-500 h-screen">
    <div class="z-10 w-full flex-col">
      <NavBar></NavBar>
      <div class="flex h-auto w-3/4 justify-between flex-wrap mx-auto">
        <TaskContainer :head="'Idea'"></TaskContainer>
        <TaskContainer :head="'Todo'"></TaskContainer>
        <TaskContainer :head="'On Progress'"></TaskContainer>
        <TaskContainer :head="'Done'"></TaskContainer>
      </div>
    </div>
  </div>
</template>

<script>
import TaskContainer from '@/components/TaskContainer'
import NavBar from '@/components/NavBar'

export default {
  name: 'home',
  components: {
    TaskContainer,
    NavBar
  }
}
</script>
