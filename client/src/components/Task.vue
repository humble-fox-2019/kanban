<template>
  <div>
   <b-card
        border-variant="primary"
        header="Primary"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
      >
        <b-card-text>{{task.title}}</b-card-text>
        <b-card-text>{{task.description}}</b-card-text>
        <button class="btn btn-danger" @click="deleteData(task.id)">Delete</button>
    </b-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import db from '../apis/firestore'

export default {
  props: ["task"],
  methods:{
    deleteData(id){
      db.collection('task').doc(id).delete()
      .then(function(){
        console.log('deleted!');
      })
      .catch(error => function(){
        console.log(error);
      })
    }
  }
};
</script>

<style scoped>

</style>