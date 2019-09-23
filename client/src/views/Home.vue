<template>
    <div>
        <input type="button" value="Create todo" @click="showForm = true" />
        <form v-show="showForm">
            <label>Title</label>
            <input type="text" v-model="toDo.title"/> 
            <label>Description</label>
            <input type="text" v-model="toDo.description"/> 
            <label>Assignee</label>
            <input type="text" v-model="toDo.assignee"/> 
            <label>Point</label>
            <input type="text" v-model="toDo.point"/> 
            <button type="button" @click="create">Create</button>
            <button type="button" @click="showForm = false">Close</button>
        </form>
        <div style="background-color : red">
            <h1>Back Logs</h1>
            <ul>
                <ToDo v-for="(toDo,index) in backLogs" :toDo='toDo' :key='index' @advance="advance" @delete="del" />
            </ul>
        </div>
        <div style="background-color : orange">
            <h1>To Dos</h1>
            <ul>
                <ToDo v-for="(toDo,index) in toDos" :toDo='toDo' :key='index' @advance="advance" @delete="del"/>
            </ul>
        </div>
        <div style="background-color : blue">
            <h1>On progress</h1>
            <ul>
                <ToDo v-for="(toDo,index) in onProgress" :toDo='toDo' :key='index' @advance="advance" @delete="del"/>
            </ul>
        </div>
        <div style="background-color : green">
            <h1>Finished</h1>
            <ul>
                <ToDo v-for="(toDo,index) in finished" :toDo='toDo' :key='index' @advance="advance" @delete="del"/>
            </ul>
        </div>
    </div>
</template>

<script>
import ToDo from '@/components/ToDo.vue'
import axios from 'axios'
import { todosCollection } from '../config/db'


export default {
    components : {
        ToDo
    },
    /* firebase : {
        toDos : db.ref('toDos')
    }, */
    data : function (){
        return {
            toDo : {
                title : "",
                description : "",
                assignee : "",
                point : 0,
                status : 'backLog'
            },
            backLogs : [],
            toDos : [],
            onProgress : [],
            finished : [],
            showForm : false
        }
    },
    firestore() {
        return {
            backLogs : todosCollection.where('status', '==', 'backLog').orderBy('createdAt', 'desc'),
            toDos : todosCollection.where('status', '==', 'toDo').orderBy('createdAt', 'desc'),
            onProgress : todosCollection.where('status', '==', 'on progress').orderBy('createdAt', 'desc'),
            finished : todosCollection.where('status', '==', 'finished').orderBy('createdAt', 'desc')
        }
    },
    methods : {
        create : function () {
            todosCollection.add({
                "title": this.toDo.title,
                "description": this.toDo.description,
                "assignee": this.toDo.assignee,
                "point": this.toDo.point,
                "status": this.toDo.status
            })
            .then ((document)=>{
                console.log(document + ' created')
            })
            .catch ((err)=>{
                console.log(err)
            })
        },
        del : function (id) {
            todosCollection.doc(id).delete();
        },
        advance : function (payload) {
            switch(payload.status){
                case 'backLog' :
                    todosCollection.doc(payload.id).update({status:'toDo'})
                    break;
                case 'toDo' :
                    todosCollection.doc(payload.id).update({status:'on progress'})
                    break;
                case 'on progress' :
                    todosCollection.doc(payload.id).update({status:'finished'})
                    break;
                default : 
                    console.log('woy')
            }
        }
    }
    /* ,
    mounted : function () {
        this.fetch('back-logs');
        this.fetch('to-dos');
        this.fetch('on-progress');
        this.fetch('finished');
    } */
}
</script>

<style>

</style>