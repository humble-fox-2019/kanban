<template>
    <li>
        <div style="background-color:yellow;margin:50px;">
            <h2>{{toDo.title}}</h2>
            <p>{{toDo.assignee}}</p>
            <p>{{toDo.point}}</p>
            <input type="button" @click="showToDoDetail" v-show="!showDetail" value="Show Detail">
            <div v-show="showDetail">
                <p>{{toDo.description}}</p>
                <p>{{toDo.status}}</p>
                <input type="button" @click="$emit('advance',toDo)" value="Advance">
                <input type="button" value="Close" @click="hideToDoDetail">
                <input type="button" value="Delete" @click="$emit('delete', toDo.id)">
            </div>
        </div>
    </li>
</template>

<script>
export default {
    data : function (){
        return {
            showDetail : false
        }
    },
    props : {
        toDo : {
            type : Object,
            required : true
        }
    },
    methods : {
        showToDoDetail : function () {
            this.showDetail = true
        },
        hideToDoDetail : function () {
            this.showDetail = false
        }
    }
}
</script>

<style>

</style>