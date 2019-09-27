<template>
<div class="">
    <div class="card shadow mt-3 " >
        <div class="header">
            <h1>{{ status }}</h1>
        </div>
        <div v-for="( k , index ) in kanban" :key='index'>
            <div v-if="k.status == status"> 
                <Card :task='k'></Card>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import Card from '../components/Card'

export default {
    name: 'Board',
    props: ['kanban', 'status'],
    data: function () {
        return {
            
        }
    },
    components : {
        Card
    },
    created () {
    }
}
</script>

<style scoped>
    h1 {
        text-transform: uppercase
    }
    .header {
        background-color: black;
        color:white;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 10px;
    }
    .card {
        border-radius: 20px;
    }
</style>
