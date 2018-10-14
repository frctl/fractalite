/* global window */

import 'babel-polyfill';
import Vue from 'vue';
import VueSocketio from 'vue-socket.io-extended';
import VueSelect from 'vue-select';
import io from 'socket.io-client';
import AsyncComputed from 'vue-async-computed';
import VueSplit from 'vue-split-panel';
import VueCodemirror from 'vue-codemirror';
import App from './App.vue';
import store from './store';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/addon/display/autorefresh.js';

Vue.component('v-select', VueSelect);

if (window.ui.dev) {
  Vue.use(VueSocketio, io(), { store });
}

Vue.use(VueSplit);
Vue.use(AsyncComputed);
Vue.use(VueCodemirror);

export default new Vue({
  el: '#app',
  store,
  data: {
    ui: window.ui
  },
  render: h => h(App)
});
