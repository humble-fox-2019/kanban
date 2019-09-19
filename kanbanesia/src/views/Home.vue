<template>
  <div class="home">
    <div class="homeContent d-flex row mt-5">
      <!-- BACKLOG -->

      <div class="backlog col-3">
        <div class="titleBacklog">
          <p>BACKLOG</p>
        </div>

        <div
          class="list d-flex flex-column align-items-center backlogBox ml-2"
          style="border: 5px solid blue;border-radius:1em"
        >
          <taskCard
            v-for="key in backlog"
            :key="key.id"
            :id="key.id"
            :title="key.title"
            :description="key.description"
            :assigned="key.assigned"
            :point="key.point"
            :status="key.status"
          ></taskCard>
        </div>
      </div>

      <!-- TODO -->
      <div class="todo col-3">
        <div class="titleTodo">
          <p>TODO</p>
        </div>
        <div
          class="list d-flex flex-column align-items-center todoBox"
          style="border: 5px solid red; border-radius:1em"
        >
          <taskCard
            v-for="key in todo"
            :key="key.id"
            :id="key.id"
            :title="key.title"
            :description="key.description"
            :assigned="key.assigned"
            :status="key.status"
            :point="key.point"
          ></taskCard>
        </div>
      </div>

      <!-- DOING -->
      <div class="doing col-3">
        <div class="titleDoing">
          <p>DOING</p>
        </div>

        <div
          class="list d-flex flex-column align-items-center doingBox"
          style="border: 5px solid yellow; border-radius:1em"
        >
          <taskCard
            v-for="key in doing"
            :key="key.id"
            :id="key.id"
            :title="key.title"
            :description="key.description"
            :assigned="key.assigned"
            :point="key.point"
            :status="key.status"
          ></taskCard>
        </div>
      </div>

      <!-- DONE -->
      <div class="done col-3">
        <div class="titleDone">
          <p>DONE</p>
        </div>
        <div
          class="list d-flex flex-column align-items-center doneBox mr-2"
          style="border: 5px solid green; border-radius:1em"
        >
          <taskCard
            v-for="key in done"
            :key="key.id"
            :id="key.id"
            :title="key.title"
            :description="key.description"
            :assigned="key.assigned"
            :point="key.point"
            :status="key.status"
          ></taskCard>
        </div>
      </div>
    </div>

    <div>
      <div>
        <b-button v-b-modal.modal-1 variant="outline-warning" class="mt-5 mb-5">Add More Todos</b-button>

        <b-modal id="modal-1" title="Kanbanesia">
          <div class="register text-center align-items-center">
            <div class="registerPart" style="border: 1px solid black; border-radius:1em;">
              <h1 class="text-center">Add Todos</h1>
              <form action>
                <!-- UNTUK TITLE -->
                <div class="form-group mt-5 mb-5 d-flex flex-column text-center">
                  <label for="inputTitle">Title</label>
                  <input
                    class="text-center"
                    type="text"
                    placeholder="enter title"
                    v-model="newTodo.title"
                    style="background-color:#FEFEDF"
                    required
                  />
                  <small id="title-small" class="form-text text-muted">Start small write your title.</small>
                </div>
                <!-- UNTUK DESCRIPTION -->
                <div class="form-group d-flex flex-column text-center">
                  <label for="inputDescription">Description</label>
                  <input
                    class="text-center"
                    type="text"
                    placeholder="enter description"
                    v-model="newTodo.description"
                    style="background-color:#FEFEDF"
                    required
                  />
                </div>
                <div class="form-group d-flex flex-column text-center">
                  <label for="inputPoint">Point</label>
                  <input
                    class="text-center"
                    type="number"
                    placeholder="enter point"
                    v-model="newTodo.point"
                    style="background-color:#FEFEDF"
                    required
                  />
                </div>
                <div class="form-group d-flex flex-column text-center">
                  <label for="inputAssigned">Assigned To</label>
                  <input
                    class="text-center"
                    type="text"
                    placeholder="enter assign to who"
                    v-model="newTodo.assigned"
                    style="background-color:#FEFEDF"
                    required
                  />
                  <small
                    id="title-small"
                    class="form-text text-muted"
                  >Place input to whom you want this task to.</small>
                </div>

                <button
                  class="btn"
                  type="submit"
                  @click.prevent="addTodos"
                  style="font-weight: bold"
                >Click Me to Register</button>
                <!-- <button class="btn" type="submit" @click.prevent="hideRegister">BACK HOME</button> -->
              </form>
            </div>
          </div>
        </b-modal>
      </div>
      <footers class="bottom"></footers>
    </div>

    <!-- untuk trigger muncul tidaknya dari register -->
  </div>
</template>



<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import taskCard from "../components/taskCard";
import jumbotron from "../components/jumbotron";
import db from "@/apis/firebase";
import footers from "../components/footer";
``;
export default {
  name: "home",
  components: {
    taskCard,
    footers

    // HelloWorld
  },
  data() {
    return {
      backlog: [],
      todo: [],
      doing: [],
      done: [],
      newTodo: {
        title: "",
        description: "",
        point: "",
        assigned: "",
        status: "backlog",
        createdAt: new Date()
      },
      registerBTN: false
    };
  },
  methods: {
    hideRegister() {
      console.log("masuk bro ke reveal");
      console.log(this.registerBTN, "<<<< INI REGISTERNYA");
      this.registerBTN = false;
    },

    revealRegister() {
      console.log("masuk bro ke reveal");
      console.log(this.registerBTN, "<<<< INI REGISTERNYA");
      this.registerBTN = true;
    },

    getAll() {
      db.collection("todos").onSnapshot(querySnapshot => {
        this.backlog = [];
        this.todo = [];
        this.doing = [];
        this.done = [];

        querySnapshot.forEach(data => {
          // console.log(data, "<<<< INI DATANYA");
          let file = {
            id: data.id,
            title: data.data().title,
            description: data.data().description,
            point: data.data().point,
            status: data.data().status,
            assigned: data.data().assigned,
            createdAt: new Date()
          };
          if (file.status == "backlog") {
            this.backlog.push(file);
          } else if (file.status == "todo") {
            this.todo.push(file);
          } else if (file.status == "doing") {
            this.doing.push(file);
          } else {
            this.done.push(file);
          }
        });
      });
    },

    addTodos() {
      console.log("masooook ke bagian todos");

      console.log(this.newTodo, "<< TITLENYA");
      console.log(this.newTodo.status, "<<<<< INI STATUSNYA");
      // console.log(this.description, "<< TITLENYA");
      // console.log(this.point, "<< TITLENYA");
      // console.log(this.assigned, "<< TITLENYA");
      // console.log(this.status, "<< TITLENYA");

      db.collection("todos")
        .add({
          title: this.newTodo.title,
          description: this.newTodo.description,
          point: this.newTodo.point,
          assigned: this.newTodo.assigned,
          status: this.newTodo.status,
          createdAt: this.newTodo.createdAt
        })
        .then(data => {
          this.newTodo.title = "";
          this.newTodo.description = "";
          this.newTodo.point = "";
          this.newTodo.assigned = "";
          this.newTodo.status = "";
          this.newTodo.createdAt = "";
          console.log(data, "<<< MASUK");
        })
        .catch(err => {
          console.log(err, "<<< ERRnya");
        });
    }
  },
  created: function() {
    this.getAll();
  }
};
</script>


<style>
.titleBacklog p {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  font-size: 40px;
  background: #000046; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #000046,
    #1cb5e0
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #000046,
    #1cb5e0
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  /* background: -webkit-linear-gradient(#eee, #333); */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.titleTodo p {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  font-size: 40px;
  background: #e1eec3; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #e1eec3,
    #f05053
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #e1eec3,
    #f05053
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.titleDoing p {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  font-size: 40px;
  background: #f09819; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f09819,
    #edde5d
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f09819,
    #edde5d
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.titleDone p {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
  font-size: 40px;

  background: #f1f2b5; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f1f2b5,
    #135058
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f1f2b5,
    #135058
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>