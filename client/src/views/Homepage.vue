<template>
  <div class="row">
    <div style="width: 100%; display: flex; justify-content: center; margin-top:5vh;">
      <form @submit.prevent="writeAct" style="display:flex; flex-direction: column; ">
        <input style="margin-bottom: 2vh; padding: 0.8vw; font-size:0.8rem;" v-model="author" placeholder="Who are you ?" type="text">
        <input style="margin-bottom: 2vh; padding: 0.8vw; font-size:0.8rem;" v-model="text" placeholder="what do you want to do" type="text">
        <button style="margin-bottom: 2vh; padding: 0.8vw; font-size:0.8rem;">Submit</button>
      </form>
    </div>
    <div style="display: flex; justify-content: space-evenly; margin-top: 10vh; align-items:start">
      <div class="background">
        <div class="title">
          <p style="font-size: 1.2rem; margin: 0;">Backlog</p>
        </div>
        <draggable class="area" :list="arr1" group="activity">
          <cont v-for="(act, index) in arr1" :key="index" :isi="act" />
        </draggable>
      </div>

      <div class="background">
          <div  class="title">
            <p style="font-size: 1.2rem; margin: 0;">Todo</p>
          </div>
          <draggable class="area" :list="arr2" group="activity">
            <cont v-for="(act, index) in arr2" :key="index" :isi="act" />
          </draggable>
      </div>
      <div class="background">
          <div  class="title">
            <p style="font-size: 1.2rem; margin: 0;">In-progress</p>
          </div>
          <draggable class="area" :list="arr3" group="activity">
            <cont v-for="(act, index) in arr3" :key="index" :isi="act" />
          </draggable>
      </div>
      <div class="background">
          <div  class="title">
            <p style="font-size: 1.2rem; margin: 0;">Done</p>
          </div>
          <draggable class="area" :list="arr4" group="activity">
            <cont v-for="(act, index) in arr4" :key="index" :isi="act" />
          </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import db from '../apis/firebase'
import draggable from "vuedraggable";
import cont from '../components/Content.vue'
const  activity  = db.collection('activity')
export default {

  components: {
    draggable,
    cont
  },
  data() {
    return {
      text: "",
      author: "",
      status:"",
      arr1:[],    
      arr2: [],
      arr3:[],
      arr4:[]
    };
  },
  methods: {
    writeAct(){

      Swal.showLoading()
      activity.add({
        author: this.author,
        text: this.text,
        status: 'backlog'
      })
      .then(docRef =>{
        this.text = "",
        this.author = ""
        Swal.close()
      })
      .catch(err => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: `${err}`
        })
      })
      
    }
  },
  watch:{
    arr1(){
      for(let el of this.arr1){
        if(el.status !== 'backlog'){
          activity.doc(el.id).update({
            status: 'backlog'
          })
          .then(console.log)
          .catch(console.log)
        }
      }
    },
    arr2(){
      for(let el of this.arr2){
        if(el.status !== 'todo'){
          activity.doc(el.id).update({
            status: 'todo'
          })
          .then(console.log)
          .catch(console.log)
        }
      }
    },
    arr3(){
      for(let el of this.arr3){
        if(el.status !== 'inprogress'){
          console.log(el.id)
          activity.doc(el.id).update({
            status: 'inprogress'
          })
          .then(console.log)
          .catch(console.log)
        }
      }
    },
    arr4(){
      for(let el of this.arr4){
        if(el.status !== 'done'){
          activity.doc(el.id).update({
            status: 'done'
          })
          .then(console.log)
          .catch(console.log)
        }
      }
    }
  },
  created(){
    activity.onSnapshot((snapshot) => {
      this.arr1 = []
      this.arr2 = []
      this.arr3 = []
      this.arr4 = []
      snapshot.forEach(obj =>{
        const id = obj.id
        const data = obj.data()
        if(data.status === 'backlog'){
          this.arr1.push({
            id,
            text: data.text,
            author: data.author,
            status: data.status
          })
        }
        else if(data.status === 'todo'){
          this.arr2.push({
            id,
            text: data.text,
            author: data.author,
            status: data.status
          })
        }
        else if(data.status === 'inprogress'){
          this.arr3.push({
            id,
            text: data.text,
            author: data.author,
            status: data.status
          })
        }else if(data.status === 'done'){
          this.arr4.push({
            id,
            text: data.text,
            author: data.author,
            status: data.status
          })
        }
      })
    })
  }
};
</script>
<style scoped>
  .title{
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #b5b5b5;
  }
  .row {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .background {
    width: 20vw;
    overflow: hidden;
    border-radius: 10px;
    -webkit-box-shadow: 6px 9px 14px -5px rgba(0,0,0,0.75);
    -moz-box-shadow: 6px 9px 14px -5px rgba(0,0,0,0.75);
    box-shadow: 6px 9px 14px -5px rgba(0,0,0,0.75);
  }

</style>