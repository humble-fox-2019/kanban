<template>
    <div class="card" style="width: 19rem;">
        <div class="card-header">
            {{ category }}
        </div>
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Category',
  props: ['category']
}
</script>

<style>
    slot{
        
    }
</style>