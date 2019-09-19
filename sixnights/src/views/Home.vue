<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-card class="indigo ma-3 pa-3" outlined tile dark>
          <v-card-title>Backlog</v-card-title>
          <v-card
            class="mx-auto ma-3"
            max-width="300"
            light
            v-for="backlog in backlogs"
            :key="backlog.id"
          >
            <v-card-title class="red" outlined>
              <p class="title">{{backlog.title}}</p>
            </v-card-title>
            <v-card-text>
              <div class="text--primary">{{backlog.description}}</div>
            </v-card-text>
            <v-card-actions class="d-flex flex-column">
              <v-btn
                text
                color="deep-purple accent-2"
                @click="toggleDialog(true, false, backlog.id)"
              >Detail</v-btn>
              <div class="d-flex flex-column">
                <span class="caption">Created: {{backlog.createdAt.toString().substring(0, 15)}}</span>
                <!-- >Created: {{backlog.createdAt.toString().substring(0, 15)}}</span> -->
                <span class="caption">Updated: {{backlog.updatedAt.toString().substring(0, 15)}}</span>
              </div>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="deep-purple ma-3 pa-3" outlined tile dark>
          <v-card-title>Work-in-Progress</v-card-title>
          <v-card class="mx-auto" max-width="300" light v-for="wip in wips" :key="wip.id">
            <v-card-title>
              <p class="title">{{wip.title}}</p>
            </v-card-title>
            <v-card-text>
              <div class="text--primary">{{wip.description}}</div>
            </v-card-text>
            <v-card-actions class="d-flex flex-column">
              <v-btn
                text
                color="deep-purple accent-2"
                @click="toggleDialog(true, false, wip.id)"
              >Detail</v-btn>
              <div class="d-flex flex-column">
                <span class="caption">Created: {{wip.createdAt.toString().substring(0, 15)}}</span>
                <span class="caption">Updated: {{wip.updatedAt.toString().substring(0, 15)}}</span>
              </div>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="cyan ma-3 pa-3" outlined tile dark>
          <v-card-title>Validation</v-card-title>
          <v-card
            class="mx-auto"
            max-width="300"
            light
            v-for="validation in validations"
            :key="validation.id"
          >
            <v-card-title>
              <p class="title">{{validation.title}}</p>
            </v-card-title>
            <v-card-text>
              <div class="text--primary">{{validation.description}}</div>
            </v-card-text>
            <v-card-actions class="d-flex flex-column">
              <v-btn
                text
                color="deep-purple accent-2"
                @click="toggleDialog(true, false, validation.id)"
              >Detail</v-btn>
              <div class="d-flex flex-column">
                <span class="caption">Created: {{validation.createdAt.toString().substring(0, 15)}}</span>
                <span class="caption">Updated: {{validation.updatedAt.toString().substring(0, 15)}}</span>
              </div>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="teal ma-3 pa-3" outlined tile dark>
          <v-card-title>Complete</v-card-title>
          <v-card
            class="mx-auto"
            max-width="300"
            light
            v-for="complete in completes"
            :key="complete.id"
          >
            <v-card-title>
              <p class="title">{{complete.title}}</p>
            </v-card-title>
            <v-card-text>
              <div class="text--primary">{{complete.description}}</div>
            </v-card-text>
            <v-card-actions class="d-flex flex-column">
              <v-btn
                text
                color="deep-purple accent-2"
                @click="toggleDialog(true, false, complete.id)"
              >Detail</v-btn>
              <div class="d-flex flex-column">
                <span class="caption">Created: {{complete.createdAt.toString().substring(0, 15)}}</span>
                <span class="caption">Updated: {{complete.updatedAt.toString().substring(0, 15)}}</span>
              </div>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialogParent" persistent max-width="600px">
        <!-- <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
        </template>-->
        <v-card>
          <v-card-title>
            <span class="headline" v-if="isCreate">Create TO-DO</span>
            <span class="headline" v-else>Edit TO-DO</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Title*" hint="required" v-model="title" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea outlined label="Todo description" v-model="description"></v-textarea>
                </v-col>
                <v-col cols="12" class="d-flex">
                  <v-select :items="todoStatus" label="Status*" v-model="status" outlined required></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-btn color="red darken-1" text @click="deleteTodo(todoId)">Delete</v-btn>
            <div class="flex-grow-1"></div>
            <v-btn color="blue darken-1" text @click="toggleDialog(false)">Close</v-btn>
            <v-btn color="blue darken-1" text v-if="isCreate" @click="createTodo">Create</v-btn>
            <v-btn color="blue darken-1" text v-else @click="updateTodo(todoId)">Edit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import cardContent from "@/components/Card.vue";
import db from "../apis/firebase";
const Todos = db.collection("todos");

export default {
  name: "home",
  props: ["dialogParent"],
  components: {
    cardContent
  },
  data() {
    return {
      title: "",
      description: "",
      createdAt: null,
      updatedAt: null,
      status: null,
      isCreate: true,
      todoId: null,
      createdDate: null,
      todoStatus: ["Backlog", "Work-in-Progress", "Validation", "Completed"],
      backlogs: [],
      wips: [],
      validations: [],
      completes: []
    };
  },
  methods: {
    toggleDialog(command, status = true, id = null) {
      if (status) this.clearForm();
      this.$emit("changeDialogStatus", command);
      this.todoId = id;
      this.isCreate = status;

      if (id) {
        Todos.doc(id)
          .get()
          .then(doc => {
            let { title, description, status, createdAt } = doc.data();
            let arr = this.todoStatus;
            this.title = title;
            this.description = description;
            this.status = arr[arr.indexOf(status)];
            this.createdDate = createdAt.toDate();
          })
          .catch(err => {});
      }
    },
    clearForm() {
      setTimeout(() => {
        this.title = "";
        this.description = "";
        this.status = this.todoStatus[0];
      }, 500);
    },
    createTodo() {
      Todos.add({
        title: this.title,
        description: this.description,
        status: this.status,
        createdAt: new Date(),
        updatedAt: new Date()
      })
        .then(result => {
          this.clearForm();
          this.$emit("changeDialogStatus", false);
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateTodo(id) {
      Todos.doc(id)
        .update({
          title: this.title,
          description: this.description,
          status: this.status,
          createdAt: this.createdDate,
          updatedAt: new Date()
        })
        .then(result => {
          this.clearForm();
          this.$emit("changeDialogStatus", false);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteTodo(id) {
      Todos.doc(id)
        .delete()
        .then(result => {
          this.clearForm();
          this.$emit("changeDialogStatus", false);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  created() {
    let self = this;
    Todos.onSnapshot(
      function(snapshot) {
        let backlog = [];
        let wip = [];
        let validation = [];
        let complete = [];

        snapshot.forEach(el => {
          const data = el.data();
          data.createdAt = data.createdAt.toDate();
          data.updatedAt = data.updatedAt.toDate();
          if (data.status === "Backlog") backlog.push({ id: el.id, ...data });
          if (data.status === "Work-in-Progress")
            wip.push({ id: el.id, ...data });
          if (data.status === "Validation")
            validation.push({ id: el.id, ...data });
          if (data.status === "Completed")
            complete.push({ id: el.id, ...data });
          self.backlogs = backlog;
          self.wips = wip;
          self.validations = validation;
          self.completes = complete;
        });
      },
      function(err) {
        console.log(err);
      }
    );
  }
};
</script>
