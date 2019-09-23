<template>
  <div class="task-list m-4 d-flex flex-column">
    <h2>{{board.name}}</h2>
    <draggable v-model="selectedTasks" group="tasks" @start="drag=true" @end="drag=false">
      <Task v-for="task in  selectedTasks" :key="task.id" :task="task"></Task>
    </draggable>
  </div>
</template>

<script>
import Task from "@/components/Task.vue";
import draggable from "vuedraggable";
import db from "@/apis/firestore";

export default {
  props: ["board"],
  data() {
    return {
      selectedTasks: []
    };
  },
  components: {
    Task,
    draggable
  },

  created() {
    db.collection("task")
      .where("status", "==", this.board.name)
      .onSnapshot(querySnapshot => {
        this.selectedTasks = [];
        querySnapshot.forEach(doc => {
          let data = {
            id: doc.id,
            ...doc.data()
          };

          this.selectedTasks.push(data);
        });
      });
  },
  watch: {
    selectedTasks() {
      for (const task of this.selectedTasks) {
        if (task.status != this.board.name) {
          db.collection("task")
            .doc(task.id)
            .update({
              status: this.board.name
            })
            .then(function() {
              console.log(`Document Successfuly updated!`);
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
  }
};
</script>

<style scoped>
</style>