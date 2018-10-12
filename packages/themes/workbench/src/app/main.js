/* global window */

import 'babel-polyfill';
import Vue from 'vue';
import VueSocketio from 'vue-socket.io-extended';
import VueSelect from 'vue-select';
import io from 'socket.io-client';
import AsyncComputed from 'vue-async-computed';
import VueSplit from 'vue-split-panel';
import App from './App.vue';
import store from './store';

Vue.component('v-select', VueSelect);

if (window.ui.dev) {
  Vue.use(VueSocketio, io(), { store });
}

Vue.use(VueSplit);
Vue.use(AsyncComputed);

export default new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
