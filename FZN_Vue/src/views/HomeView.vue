<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import MainContainer from '../components/MainContainer.vue'
import Card from '../components/Card.vue'
</script>

<template>
  <!-- <div class="flex items-center justify-center w-full h-[900px] bg-red-200">
    <MainContainer />
  </div> -->

  <div class="frame">
    
    
    <!-- <div class="flex justify-center w-1/2 bg-green-200">
      

    </div> -->
    
    
    <div class="flex justify-center w-1/2 h-full bg-green-200">
      <Card />
    </div>

  </div>
</template>

<style scoped>

.frame{
  padding: 20px;
  display:flex;
  flex-direction: row;
  justify-content: center;
  position:relative;
  width: 100%;
  height: 100%;
  height:auto;
  overflow: hidden; 
  /* background-color: rgb(137, 50, 50); */
}
</style>