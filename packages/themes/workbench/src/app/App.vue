<template>
  <div id="app">
    <template v-if="$store.state.ready">
      <header class="header">
        <h1 class="title"><span>&lt;</span> Workbench <span>/&gt;</span></h1>
        <v-select ref="select" :options="options" v-model="selectedComponent" placeholder="Select a component..."></v-select>
      </header>
      <viewer :component="component"></viewer>
    </template>
    <div class="loading" v-else>
      <p>Initialising...</p>
    </div>
  </div>
</template>

<script>
import { sortBy } from 'lodash';
import Viewer from './components/Viewer.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  components: { Viewer },
  data() {
    return {
      selectedComponent: null
    };
  },
  computed: {
    ...mapGetters(['components', 'component']),
    options() {
      return sortBy(
        this.components.map(component => ({
          value: component.name,
          label: component.label
        })),
        'label'
      );
    }
  },
  async mounted() {
    await this.$store.dispatch('initialise');
    this.selectedComponent = {
      label: this.component.label,
      value: this.component.name
    };
  },
  watch: {
    selectedComponent(option) {
      this.$store.commit('SET_ACTIVE_COMPONENT', option.value);
    }
  }
};
</script>

<style lang="scss">
@import 'codemirror/lib/codemirror.css';

*,
*:before,
*:after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-family: sans-serif;
  height: 100vh;
  width: 100vw;
  position: relative;
  font-size: 18px;
  color: #333;
}

body {
  height: 100%;
  width: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.header {
  flex: 0 0 auto;
  padding: 10px 20px;
  width: 100%;
  border-bottom: 1px solid #ddd;
  background: #f4f4f4;
  display: flex;
  align-items: center;
}

.title {
  font-size: 18px;
  font-family: monospace;
  font-weight: normal;
  color: #333;
  flex: 1 1 30%;
  padding-right: 20px;
  span {
    opacity: 0.5;
  }
}

.v-select {
  background-color: #fff;
  flex: 1 0 70%;
  font-size: 14px;
}

.v-select.open .open-indicator {
  margin-top: 7px;
}

.landing {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gutter.gutter-horizontal {
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.loading {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
