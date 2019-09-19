<template>
  <div>
    <nav>
      <div class="new-task">
        <h4>
          <a href="#">NEW TASK</a>
        </h4>
      </div>
      <h2 style="color: #33363d">TamvanKanban</h2>
      <i class="far fa-trash-alt"></i>
      <div class="form" v-if="showForm">
        <form @submit.prevent="addTask">
          <input type="text" placeholder="todo" v-model="todo" />
          <input type="text" placeholder="description" v-model="description" />
          <input type="submit" value="ADD TASK" />
        </form>
      </div>
    </nav>
    <div class="row">
      <div class="col">
        <div class="title yellow">
          <h3>TODO</h3>
        </div>
        <draggable class="list-group" :list="list1" group="people" @change="log">
          <div class="list-group-item yellow" v-for="(element) in list1" :key="element.name">
            {{ element.todo }}
            <hr />
            <p>{{ element.description }}</p>
          </div>
        </draggable>
      </div>

      <div class="col">
        <div class="title blue">
          <h3>ON PROGRESS</h3>
        </div>
        <draggable class="list-group" :list="list2" group="people" @change="log">
          <div class="list-group-item blue" v-for="(element) in list2" :key="element.name">
            {{ element.todo }}
            <hr />
            <p>{{ element.description }}</p>
          </div>
        </draggable>
      </div>

      <div class="col">
        <div class="title green">
          <h3>DONE</h3>
        </div>
        <draggable class="list-group" :list="list3" group="people" @change="log">
          <div class="list-group-item green" v-for="(element) in list3" :key="element.name">
            {{ element.todo }}
            <hr />
            <p>{{ element.description }}</p>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import db from "./apis/firebase.js";
export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable
  },
  data() {
    return {
      todo: "",
      description: "",
      list1: [],
      list2: [],
      list3: [],
      showForm: false
    };
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    },
    addTask: function() {
      db.collection("todos")
        .add({
          todo: this.todo,
          description: this.description,
          status: "todo"
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  },
  watch: {
    list1() {
      for (let todo of this.list1) {
        if (todo.status !== "todo") {
          db.collection("todos")
            .doc(todo.id)
            .update({
              status: "todo"
            })
            .then(console.log)
            .catch(console.log);
        }
      }
    },
    list2() {
      for (let todo of this.list2) {
        if (todo.status !== "onprogress") {
          db.collection("todos")
            .doc(todo.id)
            .update({
              status: "onprogress"
            })
            .then(console.log)
            .catch(console.log);
        }
      }
    },
    list3() {
      for (let todo of this.list3) {
        if (todo.status !== "done") {
          db.collection("todos")
            .doc(todo.id)
            .update({
              status: "done"
            })
            .then(console.log)
            .catch(console.log);
        }
      }
    }
  },
  created() {
    db.collection("todos").onSnapshot(snapshot => {
      this.list1 = [];
      this.list2 = [];
      this.list3 = [];

      snapshot.forEach(obj => {
        console.log(obj.data());
        const id = obj.id;
        const data = obj.data();
        if (data.status === "todo") {
          this.list1.push({
            id,
            todo: data.todo,
            description: data.description,
            status: data.status
          });
        } else if (data.status === "onprogress") {
          this.list2.push({
            id,
            todo: data.todo,
            description: data.description,
            status: data.status
          });
        } else if (data.status === "done") {
          this.list3.push({
            id,
            todo: data.todo,
            description: data.description,
            status: data.status
          });
        }
      });
    });
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Lato", sans-serif;
}

.new-task {
  background-color: black;
  height: 30px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

nav {
  color: #33363d;
  background-color: lightblue;
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;
  padding: 0 20px;
}
nav a {
  text-decoration: none;
  color: white;
}
.row {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
}

.col {
  width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-content: start;
  background-color: #33363d;
  min-height: 100px;
}

.todo {
  background-color: yellow;
}

.onprogress {
  background-color: lightgreen;
}

.done {
  background-color: lightslategray;
}

.title {
  border: none;
  color: #33363d;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.yellow {
  background-color: #f4ce46;
}

.blue {
  background-color: #2a92bf;
}

.green {
  background-color: #00b961;
}

.list-group-item {
  color: #33363d;
  height: 100px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5px;
}
</style>
