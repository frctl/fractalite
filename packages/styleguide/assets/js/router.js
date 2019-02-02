import Vue from 'vue/dist/vue.js';
import VueRouter from 'vue-router';
import Inspector from './inspector';
import Page from './page';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/inspect/:handle(.+)',
      component: Inspector,
      props: true
    },
    {
      path: '/',
      component: Page,
      props: { path: 'index' }
    },
    {
      path: '/:path(.+)',
      component: Page,
      props: true
    }
  ]
});
