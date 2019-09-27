<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view :kanban="kanban"/>
  </div>
</template>


<script>
import Kanban  from './api/db'
import Navbar from './components/Navbar'
import Swal from 'sweetalert2'
export default {
    // status : backlog , todo , doing , done
    name : "App",
    data: function() {
        return {
            kanban : []
        }
    },
    methods: {
        fetchAll() {
            Kanban.orderBy('created').onSnapshot( ( querySnapshot ) => {
                const kanbanData = []
                querySnapshot.forEach( doc => {
                    kanbanData.push({
                        id : doc.id,
                        ...doc.data()
                    })
                }) 
                this.kanban = kanbanData;
            })

        }
    },
    created () {

        this.fetchAll()
    },
    components : {
        Navbar
    }
}
</script>


<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    body {
        margin : 0;
        padding: 0;
    }
    * {
    }
</style>
