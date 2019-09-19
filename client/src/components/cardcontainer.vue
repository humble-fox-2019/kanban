<template>
<b-col cols="3">
  <b-card-group deck style="display: flex; flex-direction: column; padding: 0; " >
    <b-card :header="status" style="padding: 0; min-height: 200px;" text-variant="black" :header-bg-variant="color">
      <draggable v-model="arrayOfJob" @start="drag=true" @end="drag=false" group="job" :emptyInsertThreshold="200">
        <transition-group>
        <card v-for="job in arrayOfJob" :key="job.id" :task="job"></card>
        </transition-group>
      </draggable>
    </b-card>
  </b-card-group>
</b-col>

</template>

<script>
import card from './card'
import db from '../apis/firebase'
import draggable from 'vuedraggable'
import Swal from 'sweetalert2'
export default {
  props: {
    status: String
  },
  components: {
    card,
    draggable
  },
  data() {
    return {
      color: '',
      arrayOfJob: []
    }
  },
  methods: {
    generateColor () {
      if (this.status == 'Back-log') {
        this.color = 'danger';
      }
      else if (this.status == 'To-do') {
        this.color = 'warning';
      }
      else if (this.status == 'On-going') {
        this.color = "info";
      }
      else {
        this.color = 'success';
      }
    },
    fetchData () {
      Swal.fire({
        title: 'please wait...'
      })
      Swal.showLoading()
      db.collection('kanbanfransnesa').where('status' , "==", this.status)
      .onSnapshot(snapshot => {
        Swal.close()
        this.arrayOfJob = []
        snapshot.forEach(doc => {
          const data = doc.data();
          const id = doc.id;
          this.arrayOfJob.push({
            id,
            ...data
          })
        })
      })
    }
  },
  created() {
    this.generateColor()
    this.fetchData()
  },
  watch: {
    arrayOfJob() {
      const arrayOfUpdate = this.arrayOfJob.filter((el) => { return el.status !== this.status})
      arrayOfUpdate.forEach((el) => {
        db.collection('kanbanfransnesa').doc(el.id)
        .update({
          status: this.status
        })
        .then(() => {
          console.log('succesfully update')
        })
        .catch(console.log)
      })
    }
  }
}
</script>

<style>

</style>
