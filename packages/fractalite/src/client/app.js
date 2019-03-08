/* global window, document */

import Vue from 'vue/dist/vue';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';
import Navigation from './components/navigation';
import Search from './components/search';
import Error from './components/error';
import JSONExplorer from './components/json-explorer';
import SourceCode from './components/source-code';
import AppLink from './components/app-link';
import Split from './components/split';
import router from './router';
import store from './store';
import eventBus from './events';

Vue.use(VueSocketio, io(), { store });

Vue.component('split-pane', Split);
Vue.component('app-link', AppLink);
Vue.component('json-explorer', JSONExplorer);
Vue.component('source-code', SourceCode);

window.app = new Vue({
  el: '#app',
  props: {
    loading: false
  },
  components: {
    Error,
    Navigation,
    Search
  },
  router,
  store,
  methods: {
    resetSearch() {
      this.$refs.search.resetSearch();
    }
  },
  computed: {
    navItems() {
      return this.$store.state.nav.items;
    },
    searchTargets() {
      return this.$store.state.search.targets;
    }
  },
  async mounted() {
    document.querySelector('body').classList.remove('loading');

    eventBus.$on('loading.start', () => {
      this.loading = true;
    });

    eventBus.$on('loading.stop', () => {
      this.loading = false;
    });

    await this.$store.dispatch('updateState');

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
