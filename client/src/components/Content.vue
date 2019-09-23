<template>
  <div class="card col-xl-2 col-lg-4 col-md-4 col-sm-4 m-3" style="padding : 0;">
    <div class="card-header" :style="{'background-color' : this.color}">
      <strong>{{this.name}}</strong>
    </div>
    <div class="card-body">
      <div
        v-for="(canban , index) in CanbanList"
        :key="canban.id + index + canban.name + Math.floor(Math.random() * 99)"
      >
        <draggable
          group="kanban"
          @start="drag=true"
          @end="drag=false; jalan($event , canban)"
          @change="jalan($event , canban)"
        >
          <div class="card mt-3" v-if="canban.status == name">
            <div>
              <div class="card-header">
                <h5>
                  <strong>{{canban.title}}</strong>
                </h5>
              </div>
              <div class="card-body d-flex flex-column align-items-start">
                <div class="p-1">
                  <p class="card-text">Point: {{canban.point}}</p>
                </div>
                <div class="p-1">
                  <p class="card-text">Assigned To: {{canban.assigned}}</p>
                </div>
                <div class="p-1">
                  <button class="btn btn-danger" @click="deleteCanban(canban.id)">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../views/db"
import draggable from "vuedraggable";
export default {
  props: ["name", "color", "something"],
  created() {
    db.collection("kanban")
    .orderBy("createdAt" , "desc")
    .onSnapshot(doc => {
      this.CanbanList = [];
      doc.forEach(el => {
        console.log(el.data().status, this.name, el.id);
        let obj = { ...el.data(), id: el.id };
        this.CanbanList.push(obj);
      });
      console.log(" ini canba list :", this.CanbanList);
    });
  },
  data() {
    return {
      CanbanList: [],
      tes: ""
    };
  },
  components: {
    draggable
  },
  methods: {
    pencet (title) {
      console.log(title, " ini yaaaaa");
    },
    deleteCanban (id) {
      db.collection("kanban")
        .doc(id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        })
    },
    handleChange () {
      console.log("changed");
    },
    start(tes) {
      return tes;
      // console.log('ksdmfkdsmfkdsmfdskfmdskfmf0ei')
    },
    jalan(name, canban) {
      let { id, title, point, description, assigned } = canban;
      console.log(
        name.to.offsetParent.lastElementChild.offsetParent.innerText.split(
          "\n"
        )[0]
      )
      db.collection("kanban")
        .doc(id)
        .set(
          {
            title,
            point,
            description,
            assigned,
            status: name.to.offsetParent.lastElementChild.offsetParent.innerText.split(
              "\n"
            )[0]
          },
          { merge: true }
        )
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  },
  watch: {
    tes: function(val) {
      console.log(val);
    }
  }
};
</script>

<style>
</style>