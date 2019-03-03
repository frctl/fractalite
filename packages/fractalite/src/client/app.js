/* global window */

import Vue from 'vue/dist/vue';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';
import VueSplit from 'vue-splitjs';
import Navigation from './components/navigation';
import Search from './components/search';
import Error from './components/error';
import JSONExplorer from './components/json-explorer';
import SourceCode from './components/source-code';
import AppLink from './components/app-link';
import router from './router';
import store from './store';

Vue.use(VueSocketio, io());

Vue.component('split-pane', VueSplit);
Vue.component('app-link', AppLink);
Vue.component('json-explorer', JSONExplorer);
Vue.component('source-code', SourceCode);

window.app = new Vue({
  el: '#app',
  data: {
    error: null,
    loading: false,
    mode: 'browse'
  },
  components: {
    Error,
    Navigation,
    Search
  },
  router,
  store,
  sockets: {
    err(err) {
      if (err.status === 404) {
        return;
      }
      this.error = err;
    },
    'state.updated'() {
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
