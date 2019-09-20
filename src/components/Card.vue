<template>
  <v-card class="mx-auto mt-2 myCard" outlined>
    <v-card-text>
      <h4>{{cardData.title}}</h4>
    </v-card-text>
    <v-btn text @click.stop="dialog = true" small>
      <v-icon>mdi-format-align-left</v-icon>
    </v-btn>
    <p></p>

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>{{cardData.title}}</v-card-title>
          <v-divider></v-divider>
          <v-container>
            <strong>Description</strong>
            <p>{{cardData.description}}</p>

            <strong>Point</strong>
            <p>{{cardData.point}}</p>

            <strong>Assigned To</strong>
            <p>{{cardData.assignedTo}}</p>
          </v-container>
          <v-card-actions>
            <v-btn color="error" text @click="dialog = false">Close</v-btn>
            <v-btn color="error" @click.prevent="deleteCard(cardData.id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-card>
</template>

<script>
import draggable from 'vuedraggable';
import swal from 'sweetalert';
import db from '@/apis/firebase';

export default {
  name: 'card',
  props: ['cardData'],
  data() {
    return {
      valid: true,
      dialog: false,
    };
  },
  components: {
    draggable,
  },
  methods: {
    deleteCard(id) {
      swal({
        title: 'Are you sure, remove the card?',
        text:
          'Once removed, You cannot restor this card!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            return db
              .collection('cards')
              .doc(id)
              .delete();
          }
          return null;
        })
        .then((data) => {
          if (data !== null) {
            swal('Poof! Your todo has been deleted!', {
              icon: 'success',
            });
          } else {
            swal('Deletion canceled!');
          }
        })
        .catch((error) => {
          console.log('Error deleting file:', error);
        });
    },
  },
};
</script>

<style>
.myCard {
  cursor: grab;
}
.myCard:active {
  cursor: grabbing;
}
</style>
