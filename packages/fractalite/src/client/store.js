import Vue from 'vue/dist/vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nav: {
      open: []
    }
  },
  mutations: {
    toggleNavOpenId(state, id) {
      const index = state.nav.open.indexOf(id);
      if (index > -1) {
        state.nav.open.splice(index, 1);
      } else {
        state.nav.open.push(id);
      }
    }
  },
  getters: {
    hasNavOpenId: state => id => {
      return state.nav.open.indexOf(id) > -1;
    }
  }
});
