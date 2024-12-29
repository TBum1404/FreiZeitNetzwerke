<template>
  <div class="container">
    <!-- Eine einzelne Karte -->
    <div
      class="card"
      ref="card"
      @mousedown="onMouseStart"
      @mousemove="onMouseMove"
      @mouseup="onMouseEnd"
      @mouseleave="onMouseEnd"
      @touchstart="onStart"
      @touchmove="onMove"
      @touchend="onEnd"
    >
      Karte 1
    </div>

    <!-- Popup -->
    <div id="popup" class="popup" v-show="showPopup">
      Popup: Swipe nach oben hat funktioniert!
    </div>

    <!-- Undo-Button -->
    <button id="undoButton" @click="resetCard">Karte zurücksetzen</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startX: 0,
      startY: 0,
      isDragging: false, // Verhindert unbeabsichtigtes Swipen
      showPopup: false, // Popup-Anzeige
    };
  },
  methods: {
    onStart(e) {
      const touch = e.touches[0];
      this.startInteraction(touch.clientX, touch.clientY);
    },
    onMove(e) {
      if (!this.isDragging) return;
      const touch = e.touches[0];
      this.moveCard(touch.clientX, touch.clientY);
    },
    onEnd() {
      if (!this.isDragging) return;
      this.endInteraction();
    },
    onMouseStart(e) {
      e.preventDefault();
      this.startInteraction(e.clientX, e.clientY);
    },
    onMouseMove(e) {
      if (!this.isDragging) return;
      this.moveCard(e.clientX, e.clientY);
    },
    onMouseEnd() {
      if (!this.isDragging) return;
      this.endInteraction();
    },
    startInteraction(x, y) {
      this.startX = x;
      this.startY = y;
      this.isDragging = true;
    },
    moveCard(currentX, currentY) {
      const deltaX = currentX - this.startX;
      const deltaY = currentY - this.startY;

      const cardElement = this.$refs.card;
      const rotation = deltaX / 10; // Neigung der Karte
      cardElement.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;
    },
    endInteraction() {
      const cardElement = this.$refs.card;
      const deltaX = parseFloat(cardElement.style.transform.split("translate(")[1]?.split("px,")[0] || 0);
      const deltaY = parseFloat(cardElement.style.transform.split(",")[1]?.split("px)")[0] || 0);

      if (deltaX > 40) {
        this.swipeCard("right");
      } else if (deltaX < -40) {
        this.swipeCard("left");
      } else if (deltaY < -40) {
        this.resetCard();
        this.showPopup = true;
      } else {
        this.resetCard();
      }

      this.isDragging = false;
    },
    swipeCard(direction) {
      const cardElement = this.$refs.card;
      if (direction === "right") {
        cardElement.style.transform = "translateX(500px) rotate(30deg)";
      } else if (direction === "left") {
        cardElement.style.transform = "translateX(-500px) rotate(-30deg)";
      }
      cardElement.style.opacity = "0";
    },
    resetCard() {
      const cardElement = this.$refs.card;
      cardElement.style.transform = "translate(0, 0) rotate(0deg)";
      cardElement.style.opacity = "1";
      this.showPopup = false;
    },
  },
};
</script>

<style scoped>
/* Container-Stile */
.container {
  position: relative;
  width: 300px;
  height: 400px;
  margin: auto;
}

/* Karten-Stile */
.card {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #8c8f88;
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
.popup {
  position: fixed;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  background-color: purple;
  color: white;
  padding: 20px;
  border-radius: 8px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease-in, transform 0.4s ease-in;
}

.popup[v-show="true"] {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0%);
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
