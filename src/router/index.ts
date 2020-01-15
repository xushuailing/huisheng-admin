import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'normalize.css/normalize.css';
import commonRouter from './common';
import adminRouter from './admin';
import merchantRouter from './merchant';

Vue.use(Router);

const errView = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/pages/login/login.vue'),
  },
  { path: '/401', component: () => import(/* webpackChunkName: "401" */ '@/pages/error/401.vue') },
  { path: '/404', component: () => import(/* webpackChunkName: "404" */ '@/pages/error/404.vue') },
  { path: '*', component: () => import(/* webpackChunkName: "404" */ '@/pages/error/404.vue') },
];

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
    ...commonRouter,
    ...adminRouter,
    ...merchantRouter,
    ...errView,
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
