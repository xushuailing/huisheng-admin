import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'normalize.css/normalize.css';
import commonRouter from './common';
import adminRouter from './admin';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('../layout/index.vue'),
      children: [
        {
          path: '/',
          name: '首页',
          component: () => import('../pages/home/home.vue'),
        },
      ],
    },
    {
      path: '/login',
      component: () => import('../pages/login/login.vue'),
    },
    ...commonRouter,
    ...adminRouter,
  ],
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
