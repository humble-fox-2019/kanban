<template>
  <div id="app">
    <FormAdd v-if="isAdd" @hideForm="hideForm"></FormAdd>
    <Navbar @showForm="showForm"></Navbar>
    <router-view></router-view>

  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import FormAdd from '@/components/FormAdd.vue'
export default {
  data () {
    return {
      isAdd: false
    }
  },
  components: {
    Navbar,
    FormAdd
  },
  methods: {
    hideForm: function () {
      this.isAdd = false
    },
    showForm: function () {
      this.isAdd = true
    }
  }
}

</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Delius&display=swap');
*{
  margin: 0;
  padding: 0;
}
body{
  background-color: #ecf0f1;
  font-family: 'Delius', cursive;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
