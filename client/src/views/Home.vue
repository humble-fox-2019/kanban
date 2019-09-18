<template>
    <div class="home" style="background-color:blanchedalmond; min-height: 100vh;">
        <div class="container pt-3">
            <div class="row">
                <div v-for="( b, index ) in board" :key="index" class="col-sm-12 col-md-6 col-lg-6 col-xl-3 ">
                    <Board :kanban='kanban' :status='b' ></Board>  
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Board from '../components/Board'
export default {
  name: 'home',
  props : ['kanban'],
  data : function (){
      return {
          board:['backlog' , 'todo' , 'doing', 'done' ]
      }
  },
  components: {
    Board
  },
  created () {
      
  }
}
</script>

<style scoped>
    .board-list {
        display: flex; 
        justify-content: space-evenly;
    }
    body {
        background-color: blanchedalmond 

    }
</style>