<template>
  <div class="card-inside mb-5">
    <h3>{{title}}</h3>
    <p>Desc : {{description}}</p>
    <p>Point : {{point}}</p>
    <p>Assigned to : {{assigned}}</p>

    <div class="btn-list">
      <button
        class="btn btn-outline-primary mr-2"
        v-if="status !== 'backlog'"
        @click="updateBack(id,status)"
      >BACK</button>
      <button class="btn btn-outline-danger m-2" @click="deleteList(id)">DELETE</button>
      <button
        class="btn btn-outline-success ml-2"
        v-if="status != 'done'"
        @click="updateNext(id, status)"
      >NEXT</button>
    </div>
  </div>
</template>

<script>
import db from "@/apis/firebase";

export default {
  props: ["id", "title", "description", "point", "assigned", "status"],
  methods: {
    deleteList(id) {
      db.collection("todos")
        .doc(id)
        .delete()
        .then(data => {
          console.log(data, "<<< APAKAH YANG TERDELETE?");
          console.log("document successfully deleted");
        })
        .catch(err => {
          console.log(err);
        });
    },

    updateNext(id, status) {
      let newStatus = "";
      if (status == "backlog") {
        newStatus = "todo";
      } else if (status == "todo") {
        newStatus = "doing";
      } else if (status == "doing") {
        newStatus = "done";
      }

      db.collection("todos")
        .doc(id)
        .update({
          status: newStatus
        })
        .then(data => {
          console.log("berhasil terupdate");
        })
        .catch(err => {
          console.log(err, "<<< DISINI ERRNYA");
        });
    },
    updateBack(id, status) {
      let newStatus = "";
      if (status == "done") {
        newStatus = "doing";
      } else if (status == "doing") {
        newStatus = "todo";
      } else if (status == "todo") {
        newStatus = "backlog";
      }

      db.collection("todos")
        .doc(id)
        .update({
          status: newStatus
        })
        .then(data => {
          console.log("berhasil terupdate");
        })
        .catch(err => {
          console.log(err, "<<< DISINI ERRNYA");
        });
    }
  },
  created: function() {
    console.log(status);
  }
};
</script>

<style>
</style>