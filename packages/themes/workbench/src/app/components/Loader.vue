<template>
  <div class="loader">
    <v-icon name="spinner" scale="1.5" spin/>
  </div>
</template>

<script>
import 'vue-awesome/icons/spinner';
export default {
  components: {}
};
</script>

<style scoped>
.loader {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  opacity: 0.3;
}
</style>
