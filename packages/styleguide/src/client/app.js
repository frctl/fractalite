import '@fortawesome/fontawesome-free/js/all.js';
import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';

import Navigation from './components/navigation';
import Error from './components/error';
import router from './router';

Vue.use(VueSocketio, io());

Vue.component('error', Error);

const app = new Vue({
  el: '#app',
  data: {
    error: null
  },
  components: { Navigation },
  router,
  sockets: {
    err(err) {
      this.error = err;
    },
    updated() {
      this.error = null;
    }
  },
  mounted() {
    this.$on('error', err => {
      if (err.response) return;
      this.error = err;
    });
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
        if (window.location.pathname == to) {
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
