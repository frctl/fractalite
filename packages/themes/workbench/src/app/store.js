import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ready: false,
    isConnected: false,
    components: [],
    files: []
  },

  actions: {
    async initialise({ commit, dispatch }) {
      const response = await axios.get('/state.json');
      commit('SET_COMPONENTS', response.data.components);
      commit('SET_FILES', response.data.files);
      return response;
    }
  },

  mutations: {
    SOCKET_CONNECT: state => {
      state.isConnected = true;
    },

    SOCKET_STATE_UPDATED: (state, data) => {
      if (Array.isArray(data)) {
        data = data[0];
      }
      state.components = data.components;
      state.files = data.files;
    },

    SET_COMPONENTS: (state, components = []) => {
      state.components = components;
    },

    SET_FILES: (state, files = []) => {
      state.files = files;
    }
  }
});
