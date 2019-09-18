<template>
  <v-container>
    <v-row>
      <v-col v-for="board in boards" :key="board.name" cols="3">
        <Board :board-config="board" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Board from '@/components/Board.vue';
import db from "@/api/firebase";

export default {
  components: {
    Board,
  },
  data() {
    return {
      boards: [{
        name: 'Backlog',
        color: 'deep-purple accent-4',
        todos: []
      },
      {
        name: 'Todo',
        color: 'deep-purple accent-4',
        todos: []
      },
      {
        name: 'Onprogress',
        color: 'deep-purple accent-4',
        todos: []
      },
      {
        name: 'Done',
        color: 'deep-purple accent-4',
        todos: []
      }],
    };
  },
  created() {
    db.collection("Card").onSnapshot(snapshot => {
      console.log(snapshot);
    });
  }
};
</script>
