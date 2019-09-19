<template>
    <div class="h-20 flex items-center" id="nav">
        <div>
            <h1 class="font-extrabold text-2xl flex items-center"><i class="fab fa-vuejs fa-2x mr-2"></i>KANGBANG</h1>
        </div>
        <div class="ml-auto">
            <button 
                @click.prevent="newTask"
                class="rounded mx-auto px-5 py-2 focus:outline-none bg-transparent border font-semibold button">
                add new task</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        newTask() {
            this.$emit('newTask')
        }
    }
}
</script>

<style scoped>

#nav {
    margin: 0 11%;
    color: #444d5a;
}

.button {
    border-color: #2ebc60;
    color: #2ebc60;
}

.button:hover {
    background-color: #2ebc60;
    color: white;
}

</style>