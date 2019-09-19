<template>
  <v-container>
    <v-row>
      <v-col v-for="board in boards" :key="board.name" cols="3">
        <Board :board-data="board" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Board from '@/components/Board.vue';
import db from '@/apis/firebase';

export default {
  components: {
    Board,
  },
  data() {
    return {
      boards: [{
        name: 'Backlog',
        color: 'pink darken-1',
        cards: [],
      },
      {
        name: 'Todo',
        color: 'orange darken-1',
        cards: [],
      },
      {
        name: 'Onprogress',
        color: 'cyan darken-1',
        cards: [],
      },
      {
        name: 'Done',
        color: 'green darken-1',
        cards: [],
      }],
    };
  },
  created() {
    db.collection('cards').onSnapshot((snapshot) => {
      const tmpBoard = this.boards;
      
      tmpBoard.forEach((el) => {
        el.cards = [];
      });

      snapshot.forEach((change) => {
        const tmpCard = {
          id: change.id,
          ...change.data(),
        };

        console.log(change.data().category);

        tmpBoard.forEach((el) => {
          if (el.name === change.data().category) {
            el.cards.push(tmpCard);
          }
        });
      });

      this.boards = tmpBoard;
    });
  },
};
</script>
