/* eslint camelcase:"off" */

import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import axios from 'axios';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const persist = new VuexPersistence({
  reducer: state => ({
    nav: {
      expandedIds: state.nav.expandedIds
    }
  })
});

export default new Vuex.Store({
  plugins: [persist.plugin],

  state: {
    components: [],
    pages: [],
    inspectorData: [],
    nav: {
      items: [],
      expandedIds: []
    },
    search: {
      targets: []
    },
    error: null,
    initialised: false
  },

  mutations: {
    setNavigationItems(state, items) {
      state.nav.items = items;
    },

    toggleExpanded(state, item) {
      const { id } = item;
      const index = state.nav.expandedIds.indexOf(id);
      if (index > -1) {
        state.nav.expandedIds.splice(index, 1);
      } else {
        state.nav.expandedIds.push(id);
      }
    },

    setSearchTargets(state, items) {
      state.search.targets = items;
    },

    clearComponentCache(state) {
      state.components = [];
    },

    clearPageCache(state) {
      state.pages = [];
    },

    clearInspectorDataCache(state) {
      state.inspectorData = [];
    },

    setComponent(state, component) {
      state.components.push(component);
    },

    setPage(state, page) {
      state.pages.push(page);
    },

    setInspectorData(state, inspectorData) {
      state.inspectorData.push(inspectorData);
    },

    setError(state, err) {
      if (err.status === 404 || err.response) {
        return;
      }
      state.error = err;
    },

    clearError(state) {
      state.error = null;
    },

    initialised(state) {
      state.initialised = true;
    }
  },

  actions: {
    async socket_stateUpdated({ commit, dispatch }) {
      return dispatch('updateState');
    },

    socket_err({ commit }, err) {
      commit('setError', err[0]);
    },

    async updateState({ commit }) {
      try {
        commit('clearComponentCache');
        commit('clearPageCache');
        commit('clearInspectorDataCache');
        const [navigation, search] = await Promise.all([await axios.get('/api/navigation.json'), await axios.get('/api/search.json')]);
        commit('setNavigationItems', navigation.data.items);
        commit('setSearchTargets', search.data.components);
        commit('clearError');
        commit('initialised', true);
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },

    async fetchComponent({ commit, getters }, componentName) {
      try {
        const fetchedComponent = getters.getComponent(componentName);
        if (fetchedComponent) {
          return fetchedComponent;
        }
        const request = await axios.get(`/api/components/${componentName}.json`);
        const component = request.data;
        commit('setComponent', component);
        return component;
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },

    async fetchPage({ commit, getters }, path) {
      try {
        const fetchedPage = getters.getPage(path);
        if (fetchedPage) {
          return fetchedPage;
        }
        const request = await axios.get(`/api/pages/${path}.json`);
        const page = request.data;
        commit('setPage', page);
        return page;
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    },

    async fetchInspectorData({ commit, getters }, { component, scenario }) {
      try {
        const fetchedInspectorData = getters.getInspectorData(component, scenario);
        if (fetchedInspectorData) {
          return fetchedInspectorData;
        }
        const request = await axios.get(`/api/inspect/${component}/${scenario}.json`);
        const data = {
          id: `${component}/${scenario}`,
          ...request.data
        };
        commit('setInspectorData', data);
        return data;
      } catch (err) {
        commit('setError', err);
        throw err;
      }
    }
  },

  getters: {
    isExpanded: state => item => {
      return state.nav.expandedIds.indexOf(item.id) > -1;
    },

    getComponent: state => name => {
      return state.components.find(component => component.name === name);
    },

    getPage: state => path => {
      return state.pages.find(page => page.path === path);
    },

    getInspectorData: state => (componentName, scenarioName) => {
      return state.inspectorData.find(data => data.id === `${componentName}/${scenarioName}`);
    }
  }
});
