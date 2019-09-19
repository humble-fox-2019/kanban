<template>
    <div class="test">
        <p class="owner">By - {{isi.author}}</p>
        <p>{{isi.text}}</p>
        <button @click.prevent="del(isi.id)">delete</button>
    </div>
</template>

<script>
import db from '../apis/firebase'
const  activity  = db.collection('activity')
export default {
    props: ['isi'],
    data: function(){
        return {
            showOption: false
        }
    },
    methods:{
        openOption(){
            this.showOption = true
        },
        del(isiId){
            activity.doc(isiId).delete().then(console.log).catch(console.log)
        }
    }
}
</script>

<style scoped>
    .test{
        width: 100%;
        min-height: 15vh;
        position: relative;
        background-color: #fafafa;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .owner {
        position: absolute;
        top: 2%;
        left: 5%;
        font-family: Helvetica;
        font-size: 0.9rem;
    }
    button{
        position: absolute;
        bottom: 5%;
        right: 5%;
    }
</style>