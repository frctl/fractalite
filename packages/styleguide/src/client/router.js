import Vue from 'vue/dist/vue';
import VueRouter from 'vue-router';
import Inspector from './components/inspector';
import Page from './components/page';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'inspect',
      path: '/inspect/:componentName/:contextName?',
      component: Inspector,
      props: true
    },
    {
      name: 'index',
      path: '/',
      component: Page,
      props: { path: 'index' }
    },
    {
      name: 'page',
      path: '/:path(.+)',
      component: Page,
      props: true
    }
  ]
});
