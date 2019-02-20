<template lang="html">
  <span class="counter" @click="handleClick">
    {{ label }}: <strong>{{ counter }}</strong>
  </span>
</template>

<script>
export default {
  props: ['label'],
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    handleClick() {
      this.counter++;
      this.$emit('increment');
    }
  }
};
</script>

<style lang="css">
.counter {
  font-family: monospace;
  display: inline-block;
  padding: 10px;
  background-color: #eee;
  border-radius: 5px;
  border: 1px solid #ccc;
  user-select: none;
  cursor: pointer;
  font-size: 15px;
}
</style>
