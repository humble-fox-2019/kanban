<template>
  <div>
    <b-card
      tag="article"
      style="width: 100%; padding: 0; margin: 0;"
      class="mb-2"
      :header="task.title"
      header-text-variant="white"
      header-bg-variant="info"
    >
      <b-card-text style="padding: 0;">
        PIC: {{ task.assign }}
      </b-card-text>
       <b-card-text style="padding: 0;">
        created at: {{ new Date(task.createdAt.seconds * 1000).toDateString() }}
      </b-card-text>
      
      <div style="display: flex; width: 100%; justify-content: space-between;">
        <b-button variant="danger" @click.prevent="deleteTask(task.id)" style="width: 80px; padding: 5px;">Delete</b-button>
        <b-button variant="success" v-b-modal="task.id" style="width: 80px; padding: 5px;">Detail</b-button>
      </div>
      <b-modal :id="task.id">
        <b-form @submit.prevent="updateTask(task.id)" id="formTask">
          <b-form-group label="Enter title: " label-for="title">
            <b-form-input type="text" v-model="form.title" placeholder="Enter title" id="title" required></b-form-input>
          </b-form-group>
          <b-form-group label="PIC: " label-for="person">
            <b-form-input type="text" v-model="form.assign" placeholder="Enter person" id="person"></b-form-input>
          </b-form-group>
          <b-form-group label="Description: " label-for="description">
            <b-form-textarea v-model="form.description" placeholder="Write description" rows="3" max-rows="6"></b-form-textarea>
          </b-form-group>
        </b-form>
        <div slot="modal-footer">
          <b-button variant="primary" type="submit" form="formTask">Update</b-button>
        </div>
      </b-modal>
    </b-card>
</div>
</template>

<script>
import db from '../apis/firebase'
import Swal from 'sweetalert2'
export default {
  props: {
    task: Object
  },
  data() {
    return {
      form: {
        title: this.task.title,
        description: this.task.description,
        assign: this.task.assign
      }
    }
  },
  methods: {
    seeDetail() {
      Swal.fire({
        title: this.task.title,
        text: this.task.description,
        text: this.task.status
      })
    },
    updateTask (id) {
      Swal.fire({
        title: "Are You sure want to update?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      })
      .then(result => {
        if (result.value) {
          Swal.fire({
            title: 'please wait..'
          })
          Swal.showLoading()
          db.collection('kanbanfransnesa').doc(`${id}`)
          .update({
            title: this.form.title,
            assign: this.form.assign,
            description: this.form.description,
          })
          .then(() => {
            Swal.close()
              Swal.fire({
                title: 'Successfully Update',
                type: 'success',
                timer: 2000,
                showConfirmButton: false
              }
            )
            this.$bvModal.hide(`${id}`)
          })
        }
      })
    },
    deleteTask (id) {
      Swal.fire({
        title: "Are you sure want to delete this?",
        text: "You won't be able to revert this",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      })
      .then(result => {
        Swal.fire({
          title: "please wait..",
          allowOutsideClick: () => !Swal.isLoading()
        })
        Swal.showLoading()
        db.collection('kanbanfransnesa').doc(`${id}`).delete()
        .then(() => {
          if (result.value) {
              Swal.close()
              Swal.fire({
                title: 'Successfully Delete',
                text: 'Your task has been deleted',
                type: 'success',
                timer: 1500,
                showConfirmButton: false
              }
            )
          }
        })
        .catch(err => {
            Swal.fire(
              'Error!',
              'Sorry, Something error with our server'
            )
        })
      })
    }
  }
}
</script>

<style>
</style>