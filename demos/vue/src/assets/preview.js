import Vue from 'vue/dist/vue.js';

        

      import multiCounter from './../components/@multi-counter/multi-counter.vue';
Vue.component('multi-counter', multiCounter);
      import counter from './../components/@counter/counter.vue';
Vue.component('counter', counter);
      import foo from './../components/@foo/foo.vue';
Vue.component('foo', foo);

        new Vue({ el: '#prevue' });