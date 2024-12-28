<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import Navigation from './components/Navigation.vue'


</script>
<!-- alles was hier drin steht, ist überall angewendet also in about view und homeview etc.. -->
<template>
  <header>
    <Navigation />
  </header>

 
  
    

  <RouterView />
</template>

<style scoped>

</style>
