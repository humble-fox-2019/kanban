<template>
  <div class="col-sm-12 col-md-6 col-lg-6 col-xl-3" style="height: 100%">
    <div class="card p-0 bg-white rounded">
      <div
        class="card-title d-flex justify-content-center align-items-center m-0"
        :class="kotak.bg"
      >
        <h3 class="m-0 p-2">{{kotak.name}}</h3>
      </div>
      <div class="card-body p-3">
        <ToDoBoxList v-for="task in kotak.tasks" :key="task.id" :list="task" :boxName="kotak.name"></ToDoBoxList>
      </div>
    </div>
  </div>
</template>

<script>
import ToDoBoxList from "./ToDoBoxList";
export default {
  props: ["kotak"],
  components: {
    ToDoBoxList
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
.card {
  transition: 0.7s all;
  height: 100%;
}
.card:hover {
  transition: 0.7s all;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
h3 {
  font-weight: bolder;
  font-family: "Roboto", sans-serif;
}
</style>