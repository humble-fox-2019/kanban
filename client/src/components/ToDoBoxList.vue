<template>
  <div class="card mb-4">
    <div class="card-title d-flex justify-content-start align-items-center m-0">
      <h5 class="m-3">{{list.title}}</h5>
    </div>
    <div class="card-body">
      <h6 class="m-0">Description :</h6>
      <p class="m-0">{{list.description}}</p>
    </div>
    <div>
      <div class="d-flex justify-content-center align-items-center" v-if="boxName === 'Backlog'">
        <button class="btn col-6" @click="deleteTask(list.id)">Delete</button>
        <button class="btn col-6" @click="nextStatus(list.id, list.status)">To Do</button>
      </div>
      <div class="d-flex justify-content-center align-items-center" v-if="boxName === 'To Do'">
        <button class="btn col-4" @click="backStatus(list.id, list.status)">Backlog</button>
        <button class="btn col-4" @click="deleteTask(list.id)">Delete</button>
        <button class="btn col-4" @click="nextStatus(list.id, list.status)">Doing</button>
      </div>
      <div class="d-flex justify-content-center align-items-center" v-if="boxName === 'Doing'">
        <button class="btn col-4" @click="backStatus(list.id, list.status)">To Do</button>
        <button class="btn col-4" @click="deleteTask(list.id)">Delete</button>
        <button class="btn col-4" @click="nextStatus(list.id, list.status)">Done</button>
      </div>
      <div class="d-flex justify-content-center align-items-center" v-if="boxName === 'Done'">
        <button class="btn col-6" @click="backStatus(list.id, list.status)">Doing</button>
        <button class="btn col-6" @click="deleteTask(list.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
// import Swal from "sweetalert2/dist/sweetalert2.js";
// import "sweetalert2/src/sweetalert2.scss";
import db from "../../api/firebase";
export default {
  props: ["list", "boxName"],
  methods: {
    backStatus(id, status) {
      let newStatus = "";
      if (status === "To Do") {
        newStatus = "Backlog";
      } else if (status === "Doing") {
        newStatus = "To Do";
      } else if (status === "Done") {
        newStatus = "Doing";
      }
      db.collection("todos")
        .doc(id)
        .update({
          status: newStatus
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    nextStatus(id, status) {
      let newStatus = "";
      if (status === "Backlog") {
        newStatus = "To Do";
      } else if (status === "To Do") {
        newStatus = "Doing";
      } else if (status === "Doing") {
        newStatus = "Done";
      }
      db.collection("todos")
        .doc(id)
        .update({
          status: newStatus
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    deleteTask(id) {
      db.collection("todos")
        .doc(id)
        .delete()
        .then(function() {
          sweetalert();
          Swal.fire("Success", "Success delete task", "success");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
/* font-family: 'Barriecito', cursive;
font-family: 'Walter Turncoat', cursive; */
.card {
  transition: 0.7s all;
  border: 1px solid grey;
  min-width: 100%;
  height: 15rem;
}
.card:hover {
  transition: 0.7s all;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
h5 {
  font-weight: bold;
}
h6 {
  font-weight: bold;
}
.card-title {
  border-bottom: 1px solid grey;
}
button {
  width: 100%;
  border: 2px solid gold;
  font-family: "Roboto", sans-serif;
  background-color: #262626;
  font-weight: bold;
  color: gold;
}
button:hover {
  transition: 0.5s all;
  border: 2px solid gold;
  background-color: gold;
  color: #262626;
}
</style>