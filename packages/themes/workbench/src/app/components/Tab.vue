<template>
  <div v-show="isActive" class="tab"><slot></slot></div>
</template>

<script>
export default {
  props: {
    name: { required: true },
    selected: { default: false }
  },

  data() {
    return {
      isActive: false
    };
  },

  mounted() {
    this.isActive = this.selected;
  }
};
</script>

<style lang="scss">
.tab {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
