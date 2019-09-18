<template>
  <div>
    <Navbar></Navbar>
    <div class="boxbox p-5 m-0 shadow bg-white rounded d-flex justify-content-center row">
      <ToDoBox v-for="box in boxes" :key="box.name" :kotak="box"></ToDoBox>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import db from "../api/firebase";
import Navbar from "./components/Navbar";
import ToDoBox from "./components/ToDoBox";
export default {
  name: "home",
  components: {
    Navbar,
    ToDoBox
  },
  data: () => {
    return {
      boxes: [
        {
          name: "Backlog",
          bg: "bg-danger",
          tasks: []
        },
        {
          name: "To Do",
          bg: "bg-warning",
          tasks: []
        },
        {
          name: "Doing",
          bg: "bg-primary",
          tasks: []
        },
        {
          name: "Done",
          bg: "bg-success",
          tasks: []
        }
      ]
    };
  },
  methods: {
    resetBox() {
      this.boxes.forEach(box => {
        box.tasks = [];
      });
    }
  },
  created() {
    Swal.fire({
      title: "Loading Todo from data base"
    });
    Swal.showLoading();
    db.collection("todos")
      .orderBy("created", "desc")
      .onSnapshot(querySnapshot => {
        this.resetBox();
        let tasks = [];
        querySnapshot.forEach(doc => {
          let task = {
            id: doc.id,
            ...doc.data()
          };
          tasks.push(task);
        });
        for (let x = 0; x < this.boxes.length; x++) {
          for (let y = 0; y < tasks.length; y++) {
            if (this.boxes[x].name === tasks[y].status) {
              this.boxes[x].tasks.push(tasks[y]);
            }
          }
        }
        Swal.close();
      });
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.boxbox {
  min-height: 100vh;
  background-color: whitesmoke;
}
</style>