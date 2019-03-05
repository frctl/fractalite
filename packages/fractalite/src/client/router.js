import Vue from 'vue/dist/vue';
import VueRouter from 'vue-router';
import Inspector from './components/inspector';
import Page from './components/page';
import eventBus from './events';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'inspect',
      path: '/inspect/:componentName/:scenarioName?',
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

router.beforeEach((to, from, next) => {
  eventBus.$emit('loading.start');
  next();
});

export default router;
