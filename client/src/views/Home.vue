<template>
  <div>
    <div style="display:flex;flex-direction:row;justify-content:space-around;">
      <TaskList v-for="(board, i) in boards" :key="i" :board="board"></TaskList>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import db from "../apis/firestore";
import TaskList from "../components/TaskList";
import draggable from "vuedraggable";

export default {
  name: "home",
  components: {
    TaskList
  },
  data() {
    return {
      boards: [
        { name: "backlog" },
        { name: "todo" },
        { name: "doing" },
        { name: "done" }
      ]
      //currentTasks: [],
      // statusList : [ {name:'backlog',col:[]},{name:'todo',col:[]}
      // ,{name:'doing',col:[]},{name:'done',col:[]}]
    };
  }
  // created() {
  //   db.collection("task").onSnapshot(querySnapshot => {
  //     this.currentTasks = [];
  //     this.todo = [];
  //     this.doing = [];
  //     this.backlog = [];
  //     this.done = [];
  //     querySnapshot.forEach(doc => {
  //       let data = {
  //         id: doc.id,
  //         ...doc.data()
  //       };

  //       if (data.status === "todo") {
  //         this.todo.push(data);
  //       }
  //       if (data.status === "doing") {
  //         this.doing.push(data);
  //       }
  //       if (data.status === "backlog") {
  //         this.backlog.push(data);
  //       }
  //       if (data.status === "done") {
  //         this.done.push(data);
  //       }
  //        this.currentTasks.push(data);
  //     });
  //     console.log(this.doing);
  //     console.log(this.done);
  //   });
  // }
};
</script>
