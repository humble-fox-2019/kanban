<template>
  <v-card class="text-xs-center ma-3 pa-2">
    <v-card-title>{{isi.title}}</v-card-title>
    <v-card-text>{{isi.description}}</v-card-text>
    <v-card-actions v-if="isi.status === 'Back-Log'" row>
      <v-btn text small @click="deleteItem(isi.id)">Delete</v-btn>
      <v-btn text small @click="changeTodo(isi)">To-Do</v-btn>
    </v-card-actions>
    <v-card-actions v-if="isi.status === 'To-Do'">
      <v-btn text small @click="changeBackLog(isi)">Back-Log</v-btn>
      <v-btn text small @click="deleteItem(isi.id)">Delete</v-btn>
      <v-btn text small @click="changeDoing(isi)">Doing</v-btn>
    </v-card-actions>
    <v-card-actions v-if="isi.status === 'Doing'">
      <v-btn text small @click="changeTodo(isi)">To-Do</v-btn>
      <v-btn text small @click="deleteItem(isi.id)">Delete</v-btn>
      <v-btn text small @click="changeDone(isi)">Done</v-btn>
    </v-card-actions>
    <v-card-actions v-if="isi.status === 'Done'">
      <v-btn text small @click="changeDoing(isi)">Doing</v-btn>
      <v-btn text small @click="deleteItem(isi.id)">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Swal from "sweetalert2";
import db from "../../api/firestore";
export default {
  props: ["isi"],
  methods: {
    deleteItem(input) {
      let id = input;
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          db.collection("kanban")
            .doc(id)
            .delete()
            .then(function() {
              console.log("Document successfully deleted!");
            })
            .catch(function(error) {
              console.error("Error removing document: ", error);
            });
        }
      });
    },
    changeBackLog(input) {
      let id = input.id;
      db.collection("kanban")
        .doc(id)
        .set({
          title: input.title,
          description: input.description,
          status: "Back-Log"
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    changeTodo(input) {
      let id = input.id;
      db.collection("kanban")
        .doc(id)
        .set({
          title: input.title,
          description: input.description,
          status: "To-Do"
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    changeDoing(input) {
      let id = input.id;
      db.collection("kanban")
        .doc(id)
        .set({
          title: input.title,
          description: input.description,
          status: "Doing"
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    },
    changeDone(input) {
      let id = input.id;
      db.collection("kanban")
        .doc(id)
        .set({
          title: input.title,
          description: input.description,
          status: "Done"
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  }
};
</script>

<style>
</style>