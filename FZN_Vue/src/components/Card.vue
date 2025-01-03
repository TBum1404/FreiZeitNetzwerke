<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import Popup from './Popup.vue';

const startX = ref(0);
const startY = ref(0);
const currentX = ref(0);
const currentY = ref(0);
const isDragging = ref(false);
const hasDragged = ref(false);
const isPopupVisible = ref(false);

const card = ref(null);
const popup = ref(null);

const showPopup = () => {
  if (!popup.value) {
    console.error("Popup reference not found!");
    return;
  }
  console.log("Popup reference found:", popup.value);
  nextTick(() => {
    popup.value.$el.style.transform = 'translate(-50%, -50%)';
    popup.value.$el.style.opacity = '1';
    console.log("Popup styles applied:", popup.value.$el.style.transform, popup.value.$el.style.opacity);
    isPopupVisible.value = true;
  });
};

const hidePopup = () => {
  if (!popup.value) {
    console.error("Popup reference not found!");
    return;
  }
  popup.value.$el.style.transform = 'translate(-50%, 100%)';
  popup.value.$el.style.opacity = '0';
  isPopupVisible.value = false;
};

const togglePopup = () => {
  if (isPopupVisible.value) {
    hidePopup();
  } else {
    showPopup();
  }
};

const handleClick = (event) => {
  if (!popup.value.$el.contains(event.target)) {
    hidePopup();
  }
};

const startDrag = (event) => {
  isDragging.value = true;
  hasDragged.value = false;
  startX.value = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
  startY.value = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('touchmove', onDrag);
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);
};

const onDrag = (event) => {
  if (!isDragging.value) return;
  hasDragged.value = true;
  currentX.value = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX;
  currentY.value = event.type === 'mousemove' ? event.clientY : event.touches[0].clientY;
  const deltaX = currentX.value - startX.value;
  const deltaY = currentY.value - startY.value;
  const angle = deltaX / 10; // Adjust the divisor to control the angle
  card.value.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${angle}deg)`;
};

const endDrag = () => {
  isDragging.value = false;
  const deltaX = currentX.value - startX.value;
  const deltaY = currentY.value - startY.value;
  if (hasDragged.value && Math.abs(deltaX) > 100) {
    // Swipe left or right with angle
    const angle = deltaX / 10; 
    card.value.style.transform = `translate(${deltaX > 0 ? '100%' : '-100%'}, 0) rotate(${angle}deg)`;
    card.value.style.opacity = '0';
  } else if (hasDragged.value && deltaY < -100) {
    // Swipe up
    showPopup();
    resetCard();
  } else {
    // Reset position
    card.value.style.transform = 'translate(0, 0) rotate(0deg)';
  }
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('mouseup', endDrag);
  document.removeEventListener('touchend', endDrag);
};

const resetCard = () => {
  card.value.style.transform = 'translate(0, 0) rotate(0deg)';
  card.value.style.opacity = '1';
};

onMounted(() => {
  // Add any necessary mounted logic here
});

onBeforeUnmount(() => {
  // Add any necessary before destroy logic here
});
</script>

<template>
  <div class="container" >
    <!-- Eine einzelne Karte -->
    <div class="card"ref="card" @mousedown="startDrag" @touchstart="startDrag">
      
      <div class="gradient">
          <div class="text-3xl pt-10 px-5">Eventname</div>
          
          <div class="flex flex-row items-center justify-start">
              <div class="pi pi-map-marker pr-3 pl-5 text-lg"></div>
              <div class="text-base">Adress</div>
          </div>
    
          <div class="flex flex-row items-center justify-start">
            <div class="pi pi-map  pr-3 text pl-5 text-lg"></div>
            <div class="text-base">Distance</div>
          </div>
      </div>

      <div class="banner">
        <div class="text-base">
          Text
        </div>

        <div class="text-base">
          Text2
        </div>


        <div class="text-base">
          Text3
        </div>
        <div class="pi pi-info-circle pr-3m text-green-700"></div>
      </div>
      
    </div>

    <!-- Popup-Komponente -->
    <Popup ref="popup"  />

    <!-- Toggle Popup Button -->
    <button id="togglePopupButton" @click="togglePopup">Toggle Popup</button>

    <!-- Undo-Button -->
    <button id="undoButton" @click="resetCard">Karte zurücksetzen</button>
  </div>
</template>


<style scoped>
/* Container-Stile */

.gradient{
  
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(255, 0, 0, 0));
  width: 100%;
  height: 45%;

  display: flex;
  flex-direction: column;


  color: #AACC00;

}

.banner{
  background: #FFFFFF;
  
  width: 80%;
  height: 4rem;
  margin-bottom: 10%;
  
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;

  padding-left: 10px;
  padding-right: 10px;;
  
}

.container {
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 300px;
  height: 600px;
 
}

/* Karten-Stile */
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background: #ffffff;
  background-image: url('../assets/images/Bouldering.jpg');
  background-size: cover;
  background-position: center;

  width: 300px;
  height: 500px;
  position: absolute;
  
  
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
 
  font-size: 24px;
  cursor: grab;
  user-select: none;
  transition: transform 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

/* Popup-Stile */

/* Toggle Popup Button */
#togglePopupButton {
  position: fixed;
  top: 150px;
  right: 50px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#togglePopupButton:hover {
  background-color: #218838;
}

/* Undo-Button */
#undoButton {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#undoButton:hover {
  background-color: #0056b3;
}
</style>