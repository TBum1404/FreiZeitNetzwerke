<template>
  <div class="popup" ref="popup" @mousedown="startDrag" @touchstart="startDrag">
    
    <div class="text-3xl pt-5">Event name</div>

    <div class="flex flex-row items-center justify-start">
      <div class="pi pi-map-marker pr-3 "></div>
      <div class="text-base">Adress</div>
    </div>
    
    <div class="flex flex-row items-center justify-start">
      <div class="pi pi-map  pr-3 text"></div>
      <div class="text-base">Distance</div>
    </div>

    <TextBox title="Changed the default"></TextBox>
    <TextBox></TextBox>

    

    <div class="text-xl text-transparent">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TextBox from './TextBox.vue';

const startX = ref(0);
const startY = ref(0);
const currentX = ref(0);
const currentY = ref(0);
const isDragging = ref(false);

const popup = ref(null);

const startDrag = (event) => {
  isDragging.value = true;
  startX.value = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
  startY.value = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('touchmove', onDrag);
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchend', endDrag);
};

const onDrag = (event) => {
  if (!isDragging.value) return;
  currentX.value = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX;
  currentY.value = event.type === 'mousemove' ? event.clientY : event.touches[0].clientY;
  const deltaX = currentX.value - startX.value;
  const deltaY = currentY.value - startY.value;
  if (deltaY > 5 && popup.value.scrollTop === 0) {
    hidePopup();
  } else {
    popup.value.scrollTop -= deltaY;
    popup.value.scrollLeft -= deltaX;
  }
  startX.value = currentX.value;
  startY.value = currentY.value;
};

const endDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('mouseup', endDrag);
  document.removeEventListener('touchend', endDrag);
};

const hidePopup = () => {
  popup.value.style.transform = 'translate(-50%, 100%)';
  popup.value.style.opacity = '0';
};

onMounted(() => {
  popup.value.style.opacity = '0';
  popup.value.style.transform = 'translate(-50%, 100%)';
});
</script>

<style scoped>
.popup {
  display: flex;
  flex-direction: column;
  justify-content: top;
  
  position: absolute;
  overflow: auto;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 400px;
  box-sizing: border-box;
  transform: translate(-50%, 100%);
  background-color: rgba(227, 227, 227, 0.95);
  color: #007F5F;
  padding: 20px;
  border-radius: 10px;
  opacity: 0;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}
</style>