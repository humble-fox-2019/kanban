<template>
  <div id="app">
    <b-navbar toggleable="lg" type="faded" variant="light" class="shadow p-2 mb-4 bg-white rounded" >
      <b-navbar-brand tag="h2">KanBang</b-navbar-brand>
    </b-navbar>
    <b-container fluid>
      <b-button v-b-modal.modal-1>Add Task</b-button>
      <br /><br/>
      <b-modal id="modal-1">
        <b-form @submit.prevent="addTask" id="formTask">
          <b-form-group label="Enter title: " label-for="title">
            <b-form-input
              type="text"
              v-model="form.title"
              placeholder="Enter title"
              id="title"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="PIC: " label-for="person">
            <b-form-input type="text" v-model="form.assign" placeholder="Enter the PIC" id="assign"></b-form-input>
          </b-form-group>
          <b-form-group label="Description: " label-for="description">
            <b-form-textarea
              v-model="form.description"
              placeholder="Write description"
              rows="3"
              max-rows="7"
            ></b-form-textarea>
          </b-form-group>
          <b-form-group label="Status: " label-for="status">
            <b-form-select id="status" v-model="form.status" :options="optionstatus" required></b-form-select>
          </b-form-group>
        </b-form>
        <div slot="modal-footer">
          <b-button variant="primary" type="submit" form="formTask">Confirm</b-button>
        </div>
      </b-modal>
      <h5>Drag the sticky note if you want to update the status</h5>
      <b-row style="margin-top: 30px;">
        <cardcontainer v-for="task in statustask" :key="task" :status="task"></cardcontainer>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import db from '@/apis/firebase.js'
import Swal from 'sweetalert2'
import cardcontainer from './components/cardcontainer'
export default {
  components: {
    cardcontainer
  },
  data () {
    return {
      status: '',
      statustask: ['Back-log', 'To-do', 'On-going', 'Complete'],
      form: {
        title: '',
        assign: '',
        description: '',
        status: 'Back-log'
      },
      optionstatus: [
        { text: 'Select One', value: null },
        'Back-log',
        'To-do',
        'On-going',
        'Complete'
      ]
    }
  },
  methods: {
    addTask() {
      Swal.fire({
        title: "please wait.."
      });
      Swal.showLoading();
      db.collection("kanbanfransnesa")
        .add({
          description: this.form.description,
          title: this.form.title,
          assign: this.form.assign,
          status: this.form.status,
          createdAt: new Date()
        })
        .then(ref => {
          Swal.close();
          Swal.fire({
            title: "Successfully Create",
            text: "Task has been created",
            type: "success",
            timer: 2000,
            showConfirmButton: false
          });
          this.$bvModal.hide("modal-1");
          this.form.title = "";
          this.form.assign = "";
          this.form.description = "";
          this.form.status = "";
        })
        .catch(console.log);
    }
  }
}
</script>
<style>
</style>
