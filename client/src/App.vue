<template>
  <div id="app">
    <div>
      <navbar @forSearch="forSearch"></navbar>
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>-->
      <h2></h2>
    </div>
    <router-view :textSearch="textSearch"/>
  </div>
</template>
<script>
import db from './api/firestore'
import navbar from './components/navbar'

export default {
  data(){
    return {
      textSearch: ""
    }
  },
  components: {
    navbar
  },
  methods : {
    
    forSearch(value){
      // console.log(value)
      this.textSearch = value
    }

  },
  created () {

  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
