<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import MainContainer from '../components/MainContainer.vue'
import Card from '../components/Card.vue'
import TitleCaption from '@/components/TitleCaption.vue';
import CardMini from '@/components/CardMini.vue';
</script>

<template>
  <!-- <div class="flex items-center justify-center w-full h-[900px] bg-red-200">
    <MainContainer />
  </div> -->

  <div class="frame">
    
    
    <!-- <div class="flex justify-center w-1/2 bg-green-200">
      

    </div> -->
    
    <div class="w-1/2 bg-red-200 flex flex-col justify-center items-center">
  
      <TitleCaption title="Swipeable-Cards" caption="Diese Komponente in unserem Projekt ist die Hauptfunktion. 
      Mit dieser Karte ist es möglich Aktivitäten hinzuzufügen oder als uninteressant zu markieren.
      "
       />

      <TitleCaption title="blank" caption="Um mehr Informationen über die Aktivität zu bekommen, wischt man nach oben." />
    </div>

    <div class="flex justify-center w-1/2  bg-green-200">
      <Card />
    </div>

  </div>

  <div class="frame">
    
    
    

    <div class="flex flex-col justify-center items-center w-1/2  bg-green-200">
      <div class="scrollEvents">
        <CardMini />
        <CardMini />
        <CardMini />
        <CardMini />
      </div>
    </div>

    <div class="w-1/2 bg-red-200 flex flex-col justify-center items-center">
  
      <TitleCaption title="Swipeable-Cards" caption="Diese Komponente in unserem Projekt ist die Hauptfunktion. 
      Mit dieser Karte ist es möglich Aktivitäten hinzuzufügen oder als uninteressant zu markieren."/>

      <TitleCaption title="blank" caption="Um mehr Informationen über die Aktivität zu bekommen, wischt man nach oben." />
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
  
  height:auto;
  
  /* background-color: rgb(137, 50, 50); */
}

.scrollEvents{
  display:flex;
  flex-direction: column;
  height:400px;

  overflow-y: scroll;
}
</style>