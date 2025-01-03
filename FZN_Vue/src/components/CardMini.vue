<script setup>

</script>

        <!-- <div class="pi pi-times pr-3m text-red-500"></div>
        <div class="pi pi-star-fill pr-3m text-yellow-500"></div>
        <div class="pi pi-ban pr-3m text-red-500"></div>
        <div class="pi pi-minus-circle pr-3m text-red-500"></div> -->

<template>
    
    <div class="addedEvents">
        
        <div class="flex flex-row justify-between px-5 pt-5">
            <div class="text-3xl  ">Eventname</div>
            <div class="flex flex-col justify-between align-center">
                <div class="pi pi-star-fill pr-3m text-yellow-500"></div>
                <div class="pi pi-minus-circle pr-3m text-red-500"></div>
            </div>
        </div>
        
          
          <div class="flex flex-row items-center justify-start">
              <div class="pi pi-map-marker pr-3 pl-5 text-lg"></div>
              <div class="text-base">Adress</div>
          </div>
    
          <div class="flex flex-row items-center justify-start">
            <div class="pi pi-map  pr-3 text pl-5 text-lg"></div>
            <div class="text-base">Distance</div>
          </div>



        
        <div>

        </div>



    </div>

</template>

<style scoped>
.addedEvents{
    display: flex;
    flex-direction: column;
    
    background-color: #6b86bc;

    width:300px;
    height: 150px;

    padding-bottom: 10px;

    border-radius: 10px;

    margin:5px;

    color: #AACC00;

    background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4)),url('../assets/images/Bouldering.jpg');
    background-size: cover;
    background-position: top;


}
</style>