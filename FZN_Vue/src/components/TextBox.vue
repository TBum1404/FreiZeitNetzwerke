


<script setup>
   
    import {defineProps, ref} from 'vue';

    defineProps({
        
        title: {
            type: String,
            default: 'Title Placeholder',
        },
        content: {
            type: String,
            default: 'Content Placeholder for Content which describes the Content of the Place / Location where the Content/ Event will happen',
        },
    });
</script>

<template>

    <div class="container">

        <div class="text-base font-bold ">{{ title }}</div>

        <div class=" text-black text-sm" > {{ content }} </div>

    </div>

</template>

<style scoped>
.container{
    padding-top: 2rem;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
  
    align-items: center;
}
</style>