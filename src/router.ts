import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'normalize.css/normalize.css';
import layoutView from './layout/index.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "index" */ './layout/index.vue'),
      children: [
        {
          path: '/',
          name: '首页',
          component: () => import(/* webpackChunkName: "home" */ './pages/home/home.vue'),
        },
      ],
    },
    {
      path: '/merchant',
      name: '首页',
      redirect: '/merchant/list',
      component: layoutView,
      children: [
        {
          path: 'list',
          name: '首页',
          component: () => import('./pages/merchant-admin/list.vue'),
        },
      ],
    },
    {
      path: '/admin',
      name: '系统管理',
      component: layoutView,
      redirect: '/admin/setting',
      children: [
        {
          path: 'setting',
          name: '平台管理',
          component: () => import(/* webpackChunkName: "setting" */ './pages/admin/setting/index.vue'),
        },
        {
          path: 'rootname',
          name: '总账号管理',
          component: () => import(/* webpackChunkName: "setting" */ './pages/admin/setting/root-name.vue'),
        },
      ],
    },
    {
      path: '/login',
      component: () => import('./pages/login/login.vue'),
    },
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
