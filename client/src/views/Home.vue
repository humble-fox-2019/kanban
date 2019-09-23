<template>
  <div class="home">
   <Navbar></Navbar>
    <div class="row d-flex justify-content-center pt-5">
      <Content
        v-for="status in something"
        :key="status.name"
        v-bind:name="status.name"
        v-bind:color="status.color"
        v-bind:something="something"
      />
    </div>
    <!-- <div class="row d-flex justify-content-center">
      <Content v-bind:title="'Back - Log'" v-bind:color="'red'" />
      <Content v-bind:title="'To-Don'" v-bind:color="'blue'" />
      <Content v-bind:title="'Doing'" v-bind:color="'yellow'" />
      <Content v-bind:title="'Done'" v-bind:color="'green'" />
    </div>-->
  </div>
</template>

<script>
// @ is an alias to /src
import Content from "../components/Content";
import Navbar from '../components/Navbar'
import db from "./db";

export default {
  name: "home",
  components: {
    Content,
    Navbar
  },
  data() {
    return {
      something: [
        {
          name: "Back - Log",
          color: "red"
        },
        {
          name: "To - Do",
          color: "blue"
        },
        {
          name: "Doing",
          color: "yellow"
        },
        {
          name: "Done",
          color: "green"
        }
      ]
    };
  },
  created() {}
};
</script>
