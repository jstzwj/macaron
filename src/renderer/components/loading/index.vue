<template>
  <div class="cpt-loading">
    <div class="loader">
      <div class="spinner-arc" :style="spinnerSize"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 22
    }
  },

  computed: {
    spinnerSize () {
      const size = `${this.size}px`
      return {
        width: size,
        height: size
      }
    }
  }
}
</script>

<style scoped>
  .cpt-loading {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .loader {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .spinner-arc {
    border-radius: 50%;
    border: 2.5px solid transparent;
    border-top-color: var(--themeColor);
    border-right-color: var(--themeColor);
    animation: arc-rotate 0.8s linear infinite;
  }

  @keyframes arc-rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
