<template>
  <div class="popup" ref="popup" @mousedown="startDrag" @touchstart="startDrag">
    <div class="text-3xl text-">Event</div>
    <div class="text-lg">Adress</div>
    <div class="text-lg">Distance</div>
    <div class="text-xl">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      isDragging: false,
    };
  },
  mounted() {
    this.$refs.popup.style.opacity = '0';
    this.$refs.popup.style.transform = 'translate(-50%, 100%)';
  },
  methods: {
    startDrag(event) {
      this.isDragging = true;
      this.startX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
      this.startY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('touchmove', this.onDrag);
      document.addEventListener('mouseup', this.endDrag);
      document.addEventListener('touchend', this.endDrag);
    },
    onDrag(event) {
      if (!this.isDragging) return;
      this.currentX = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX;
      this.currentY = event.type === 'mousemove' ? event.clientY : event.touches[0].clientY;
      const deltaX = this.currentX - this.startX;
      const deltaY = this.currentY - this.startY;
      if (deltaY > 5 && this.$refs.popup.scrollTop === 0) {
        this.hidePopup();
      } else {
        this.$refs.popup.scrollTop -= deltaY;
        this.$refs.popup.scrollLeft -= deltaX;
      }
      this.startX = this.currentX;
      this.startY = this.currentY;
    },
    endDrag() {
      this.isDragging = false;
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('touchmove', this.onDrag);
      document.removeEventListener('mouseup', this.endDrag);
      document.removeEventListener('touchend', this.endDrag);
    },
    hidePopup() {
      this.$refs.popup.style.transform = 'translate(-50%, 100%)';
      this.$refs.popup.style.opacity = '0';
    },
  },
};
</script>

<style scoped>
.popup {
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
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