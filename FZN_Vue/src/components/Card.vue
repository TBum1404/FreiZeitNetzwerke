<template>
  <div class="container" @click="handleClick">
    <!-- Eine einzelne Karte -->
    <div
      class="card"
      ref="card"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      Karte 1
    </div>

    <!-- Popup-Komponente -->
    <Popup ref="popup" @click.stop />

    <!-- Undo-Button -->
    <button id="undoButton" @click="resetCard">Karte zurücksetzen</button>
  </div>
</template>

<script>
import Popup from './Popup.vue';

export default {
  components: {
    Popup,
  },
  mounted() {
    // ...existing code...
  },
  beforeDestroy() {
    // ...existing code...
  },
  data() {
    return {
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      isDragging: false,
      hasDragged: false,
      // ...existing code...
    };
  },
  methods: {
    // showPopup() {
    //   this.$refs.popup.$el.style.transform = 'translate(-50%, -50%)';
    //   this.$refs.popup.$el.style.opacity = '1';
    // },

    showPopup() {
      console.log(this.$refs.popup); // Debugging
      if (!this.$refs.popup) {
        console.error("Popup reference not found!");
        return;
      }
      this.$refs.popup.$el.style.transform = 'translate(-50%, -50%)';
      this.$refs.popup.$el.style.opacity = '1';
    },


    hidePopup() {
      this.$refs.popup.$el.style.transform = 'translate(-50%, 100%)';
      this.$refs.popup.$el.style.opacity = '0';
    },
    handleClick(event) {
      if (!this.$refs.popup.$el.contains(event.target)) {
        this.hidePopup();
      }
    },
    startDrag(event) {
      this.isDragging = true;
      this.hasDragged = false;
      this.startX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
      this.startY = event.type === 'mousedown' ? event.clientY : event.touches[0].clientY;
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('touchmove', this.onDrag);
      document.addEventListener('mouseup', this.endDrag);
      document.addEventListener('touchend', this.endDrag);
    },
    onDrag(event) {
      if (!this.isDragging) return;
      this.hasDragged = true;
      this.currentX = event.type === 'mousemove' ? event.clientX : event.touches[0].clientX;
      this.currentY = event.type === 'mousemove' ? event.clientY : event.touches[0].clientY;
      const deltaX = this.currentX - this.startX;
      const deltaY = this.currentY - this.startY;
      const angle = deltaX / 10; // Adjust the divisor to control the angle
      this.$refs.card.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${angle}deg)`;
    },
    endDrag() {
      this.isDragging = false;
      const deltaX = this.currentX - this.startX;
      const deltaY = this.currentY - this.startY;
      if (this.hasDragged && Math.abs(deltaX) > 100) {
        // Swipe left or right with angle
        const angle = deltaX / 10; // Adjust the divisor to control the angle
        this.$refs.card.style.transform = `translate(${deltaX > 0 ? '100%' : '-100%'}, 0) rotate(${angle}deg)`;
        this.$refs.card.style.opacity = '0';
      } else if (this.hasDragged && deltaY < -100) {
        // Swipe up
        this.showPopup();
        
        this.resetCard();
      } else {
        // Reset position
        this.$refs.card.style.transform = 'translate(0, 0) rotate(0deg)';
      }
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('touchmove', this.onDrag);
      document.removeEventListener('mouseup', this.endDrag);
      document.removeEventListener('touchend', this.endDrag);
    },
    resetCard() {
      this.$refs.card.style.transform = 'translate(0, 0) rotate(0deg)';
      this.$refs.card.style.opacity = '1';
    },
    // ...existing code...
  },
};
</script>

<style scoped>
/* Container-Stile */
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  height: 500px;
  margin: auto;
}

/* Karten-Stile */
.card {
  width: 300px;
  height: 400px;
  position: absolute;
  
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: grab;
  user-select: none;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Popup-Stile */

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