<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title">
        <h2>{{ title }}</h2>
      </div>
    </div>
    <div class="card-description">
      <p> {{ description }} </p>
    </div>
    <div class="card-action">
      <span @click="showConfirm"><i class="fas fa-trash"></i></span>
      <div class="card-confirmation" v-if="isConfirm">
        <p>Delete ?</p>
        <span style="padding: 5px" @click="deleteTask(id)">Yes</span><span @click="hideConfirm" style="padding: 5px">No</span>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/api/firestore.js'
export default {
  props: ['title', 'description', 'type', 'id'],
  data () {
    return {
      isConfirm: false
    }
  },
  methods: {
    showConfirm () {
      this.isConfirm = true
    },
    hideConfirm () {
      this.isConfirm = false
    },
    deleteTask (id) {
      db.collection('kanban').doc(id).delete()
        .then(() => {
          this.isConfirm = false
        })
    }
  }
}
</script>

<style>
.card{
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 0px rgba(0,0,0,.1);
  border-radius: 5px;
  margin-bottom: 20px;
  cursor: pointer;
  position: relative;
}
.card-title h2{
  font-size: 14pt;
}
.card-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.card-description p{
  color: #5e5e5e;
}
.card-action{
  background-color: #ffffff;
  border-radius: 5px;
  display: inline-block;
  box-shadow: 0 0 10px rgba(0,0,0,.1);
  position: absolute;
  top: -10px;
  right: 0;
  color: #cc5757;
}
.card-action > span{
  padding: 5px 8px;
  display: inline-block;
}
.card-action:hover{
  color: #f16262;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
}
.card-confirmation{
  position: absolute;
  padding: 5px;
  background-color: #e99d9d;
  color: #ffffff;
  width: 80px;
  left: -90px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 5px;
}
.card-confirmation > span:hover{
  font-weight: bold;
}
</style>
