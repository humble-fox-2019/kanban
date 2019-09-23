<template>
  <div>
    <div id="nav">
      <Navbar></Navbar>
      <Home></Home>
    </div>
    <!-- <router-view/> -->
  </div>
</template>
<script>
import Home from '../src/views/Home'
import Navbar from '../src/components/Navbar'
export default {
  data() {
    return {};
  },
  components: {
    Home,
    Navbar
  }
}
</script>
<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
