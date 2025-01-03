


<script setup>
   
    import {defineProps, ref} from 'vue';

    defineProps({
        
        title: {
            type: String,
            default: 'Title Placeholder',
        },
        caption: {
            type: String,
            default: 'Placeholder Caption'
        ,},
    });
</script>

<template>
    <!-- input string or caption = 'blank' to hide the element -->
    <div class="container">

        <div v-if="title !== 'blank' "class="text-base font-bold ">{{ title }}</div>

        <div v-if="caption !== 'blank'" class="text-base text-black text-sm" > {{ caption }} </div>

    </div>

</template>

<style scoped>
.container{
    padding-top: 1rem;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    width:80%;
    align-items: center;
}
</style>