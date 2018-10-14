<template>
  <div class="tabs">
    <ul class="tabs__bar">
      <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }" class="tabs__trigger" @click="selectTab(tab)">
        <span >{{ tab.name }}</span>
      </li>
    </ul>
    <div class="tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: []
    };
  },

  created() {
    this.tabs = this.$children;
  },

  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name.toLowerCase() == selectedTab.name.toLowerCase();
      });
    }
  }
};
</script>

<style lang="scss">
.tabs {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__bar {
    flex: 0 1 auto;
    padding: 0 20px;
    display: flex;
    background: #eee;
    border-bottom: 1px solid #ddd;
    list-style: none;
    font-size: 12px;
    text-transform: uppercase;
  }

  &__trigger {
    cursor: pointer;
    color: #555;
    padding: 7px 2px 4px 2px;
    border-bottom: 2px solid transparent;

    &:hover {
      color: #222;
    }

    &.is-active {
      color: #333;
      border-color: #2ecc40;
    }
  }

  &__trigger + &__trigger {
    margin-left: 20px;
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
