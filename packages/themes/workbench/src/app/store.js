import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ready: false,
    isConnected: false,
    components: [],
    files: [],
    logs: [],
    ui: window.ui,
    appState: null,
    activeComponent: null
  },

  actions: {
    async initialise({ commit, dispatch }) {
      const response = await axios.get('/state.json');
      commit('SET_APP_STATE', response.data);
      commit('READY');
      return response;
    }
  },

  mutations: {
    SOCKET_CONNECT: state => {
      state.isConnected = true;
      state.logs.push({
        level: 'info',
        message: 'Websocket connected',
        date: new Date()
      });
    },

    SOCKET_STATE_UPDATED: (state, data) => {
      state.appState = data[0];
    },

    SOCKET_LOG: (state, msg) => {
      const message = Object.assign({}, msg[0], {
        date: new Date()
      });
      state.logs.push(message);
    },

    SET_APP_STATE: (state, appState) => {
      state.appState = appState;
    },

    SET_ACTIVE_COMPONENT: (state, name) => {
      state.activeComponent = name;
    },

    READY: state => {
      state.ready = true;
    }
  },

  getters: {
    component: state => {
      return state.activeComponent
        ? state.appState.components.find(c => c.name === state.activeComponent)
        : state.appState.components[0];
    },
    components: state => {
      return state.appState.components;
    },
    logs: state => {
      return state.logs.length
        ? state.logs
        : [{ message: 'No messages received', date: new Date() }];
    }
  }
});
