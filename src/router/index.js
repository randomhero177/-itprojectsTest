import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to) {
    return to.meta.scrollToTop ? { x: 0, y: 0 } : true;
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/Home.vue'),
      meta: {
        title: 'To do list app',
      },
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: () => import('@/pages/Edit.vue'),
      meta: {
        title: 'Edit task',
      },
    },
    {
      path: '*',
      name: 'Error',
      meta: {
        title: 'Error!',
      },
      component: () => import('@/pages/Error.vue'),
    },
  ],
});


export default router;
