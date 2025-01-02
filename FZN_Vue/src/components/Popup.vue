<template>
  <div class="popup" ref="popup">
    Popup
  </div>
</template>

<script>
export default {
  mounted() {
    this.$refs.popup.style.opacity = '0';
  },
};
</script>

<style scoped>
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
</style>