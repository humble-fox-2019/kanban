<template>
  <v-container>
    <v-row>
      <v-col v-for="board in boards" :key="board.name" cols="3">
        <Board :color="board.color" :name="board.name" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Board from '@/components/Board.vue';

export default {
  components: {
    Board,
  },
  data() {
    return {
      boards: [{
        name: 'Backlog',
        color: 'deep-purple accent-4',
      },
      {
        name: 'Todo',
        color: 'deep-purple accent-4',
      },
      {
        name: 'Onprogress',
        color: 'deep-purple accent-4',
      },
      {
        name: 'Done',
        color: 'deep-purple accent-4',
      }],
    };
  },
};
</script>
