<template>
    <div class="rounded border my-8 task shadow-md">
        <div class="font-extrabold text-base rounded-t border-b p-4 tasktitle">
            {{ task.title }}
        </div>
        <div class="m-4 taskdesc font-semibold">
            {{ task.description }}
            <div class="mt-3">
                <button 
                    @click.prevent="getDetail"
                    class="rounded w-full px-5 py-1 focus:outline-none bg-white border font-semibold button">detail
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['task'],
    methods: {
        getDetail() {
            this.$emit('getDetail', this.task)
        },
        backToProducts() {

        }
    }
}
</script>

<style>

.task {
    background-color: #eaebed;
}

.task:hover {
    background-color: white;
}

.tasktitle {
    background-color: #444d5a;
    opacity: 0.7;
    color: white;
}

.taskdesc {
    color: #444d5a;
}

.button {
    border-color: #2ebc60;
    color: #2ebc60;
    background-color: white;
}

.button:hover {
    background-color: #2ebc60;
    color: white;
}

</style>