<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline">
        <span>iKanban by jackbloo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
        <addTask />
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid class="my-5">
        <v-layout row wrap>
          <v-flex xs12 sm3 v-for="(b,i) in boards" :key="i">
            <board :boardss="b" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import addTask from "./components/addTask";
import db from "../api/firestore";
import board from "./components/board";

export default {
  name: "App",
  components: {
    addTask,
    board
  },
  data: () => ({
    boards: [
      {
        name: "Back-Log",
        color: "red",
        kanbans: []
      },
      {
        name: "To-Do",
        color: "orange",
        kanbans: []
      },
      {
        name: "Doing",
        color: "blue",
        kanbans: []
      },
      {
        name: "Done",
        color: "green",
        kanbans: []
      }
    ]
  }),
  methods: {
    getData() {
      db.collection("kanban")
      .onSnapshot(querySnapshot => {
        let collections = [];
        for (let i = 0; i < this.boards.length; i++) {
          this.boards[i].kanbans = [];
        }
        querySnapshot.forEach(doc => {
          collections.push({ id: doc.id, ...doc.data() });
        });
        for (let i = 0; i < collections.length; i++) {
          for (let j = 0; j < this.boards.length; j++) {
            if (collections[i].status == this.boards[j].name) {
              this.boards[j].kanbans.push(collections[i]);
            }
          }
        }
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped>
boards {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>