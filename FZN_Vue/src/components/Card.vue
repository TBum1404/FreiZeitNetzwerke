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
    <div id="popup" class="popup" ref="popup">
      Popup
    </div>

    <!-- Undo-Button -->
    <button id="undoButton" @click="resetCard">Karte zurücksetzen</button>
  </div>
</template>

<script>
export default {
  mounted() {
    document.addEventListener('click', this.handleOutsideClick);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleOutsideClick);
  },
  data() {
    return {
      startX: 0,
      startY: 0,
      isDragging: false, // Verhindert unbeabsichtigtes Swipen
    };
  },
  methods: {
    handleOutsideClick(event) {
      const card = this.$refs.card;
      const popup = this.$refs.popup;
      if (popup.style.opacity === '1' && !card.contains(event.target)) {
        popup.style.opacity = '0';
        popup.style.transform = 'translate(-50%, 100%)';
      }
    },
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
        this.showPopup();
        this.resetCard();
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

    },
    showPopup() {
      const popup = this.$refs.popup;
      popup.style.display = 'block';
      setTimeout(() => {
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.opacity = '1';
      }, 10); // Delay to ensure transition works

    },
    hidePopup() {
      const popup = this.$refs.popup;
      popup.style.transform = 'translate(-50%, 100%)';
      popup.style.opacity = '0';
      popup.addEventListener('transitionend', () => {
        popup.style.display = 'none';
      }, { once: true });
      document.removeEventListener('click', this.closePopup);
      document.removeEventListener('touchstart', this.closePopup);
    },
    closePopup(e) {
      const popup = this.$refs.popup;
      if (!popup.contains(e.target)) {
        this.hidePopup();
      }
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
.popup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  overflow: auto;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transform: translate(-50%, 100%);
  background-color: rgba(169, 169, 169, 0.909);
  color: rgb(0, 0, 0);
  padding: 20px;
  border-radius: 10px;
  opacity: 0;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
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