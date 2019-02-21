/* global window */
/* eslint import/no-unassigned-import: "off" */

import Vue from 'vue/dist/vue';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';
import VueCodemirror from 'vue-codemirror';
import VueJsonPretty from 'vue-json-pretty';
import VueSplit from 'vue-splitjs';

import 'codemirror/mode/css/css';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/addon/display/autorefresh';

import Navigation from './components/navigation';
import Error from './components/error';
import AppLink from './components/app-link';
import router from './router';

Vue.use(VueSocketio, io());
Vue.use(VueCodemirror, {
  options: {
    lineNumbers: true,
    readOnly: true,
    lineWrapping: true,
    autoRefresh: true
  }
});
Vue.component('split-pane', VueSplit);
Vue.component('vue-json-pretty', VueJsonPretty);
Vue.component('app-link', AppLink);
Vue.component('error', Error);

window.app = new Vue({
  el: '#app',
  data: {
    error: null,
    loading: false
  },
  components: {
    navigation: Navigation
  },
  router,
  sockets: {
    err(err) {
      if (err.status === 404) {
        return;
      }
      this.error = err;
    },
    updated() {
      this.error = null;
    }
  },
  mounted() {
    this.$on('loading', isLoading => {
      this.loading = isLoading;
    });
    this.$on('error', err => {
      if (err.response) return;
      this.error = err;
    });
    /*
     * Capture clicks in outside of Vue code and determine
     * whether to re-route them via vue-router.
     */
    window.addEventListener('click', event => {
      const { target } = event;
      if (target && target.matches("a:not([href*='://'])") && target.href) {
        if (target.matches('[href^="/preview/"]')) return;
        const { altKey, ctrlKey, metaKey, shiftKey, button, defaultPrevented } = event;
        if (metaKey || altKey || ctrlKey || shiftKey) return;
        if (defaultPrevented) return;
        if (button !== undefined && button !== 0) return;
        if (target && target.getAttribute) {
          const linkTarget = target.getAttribute('target');
          if (/\b_blank\b/i.test(linkTarget)) return;
        }
        const url = new URL(target.href);
        const to = url.pathname;
        const parts = target.href.split('/');
        if (window.location.pathname === to) {
          event.preventDefault();
        }
        if (parts[parts.length - 1].split('.').length === 1 && event.preventDefault) {
          event.preventDefault();
          this.$router.push(to);
        }
      }
    });
  }
});
