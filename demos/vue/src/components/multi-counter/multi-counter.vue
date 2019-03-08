<template lang="html">
  <div class="multicounter">
    <div class="counters">
      <counter
        v-for="counter in counters"
        :label="counter.label"
        @increment="updateTotal"
      ></counter>
    </div>
    <div class="total">{{ totalLabel || 'Total' }}: {{ total }}</div>
  </div>
</template>

<script>
export default {
  props: ['counters', 'total-label'],
  data() {
    return {
      total: 0
    };
  },
  methods: {
    updateTotal() {
      this.total++;
    }
  }
};
</script>

<style>
.multicounter {
  font-family: monospace;
}
.multicounter .counter {
  margin-right: 10px;
}
.multicounter .total {
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 10px;
  padding: 11px;
  border-top: 1px solid #ddd;
}
</style>
