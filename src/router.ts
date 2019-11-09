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
      redirect: '/merchant/inject',
      component: layoutView,
      children: [
        {
          path: 'inject',
          name: '商家入驻审核列表页',
          component: () => import('./pages/merchant/inject-list.vue'),
        },
        {
          path: 'shop',
          name: '商家店铺管理',
          component: () => import('./pages/merchant/shop-list.vue'),
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
          path: 'rootnamelist',
          name: '平台管理员账号',
          component: () => import('./pages/admin/setting/root-username-list.vue'),
        },
      ],
    },
    {
      path: '/product',
      name: '商品管理',
      redirect: '/product/list',
      component: layoutView,
      children: [
        {
          path: 'list',
          name: '首页',
          component: () => import('./pages/product/list.vue'),
        },
      ],
    },
    {
      path: '/advertisement',
      name: '广告管理',
      redirect: '/advertisement/list',
      component: layoutView,
      children: [
        {
          path: 'list',
          name: '首页',
          component: () => import('./pages/advertisement/list.vue'),
        },
        {
          path: 'mine-banner',
          name: '我的推广',
          component: () => import('./pages/advertisement/mine-banner.vue'),
        },
        {
          path: 'banner-detail',
          name: 'banner详情',
          component: () => import('./pages/advertisement/banner-detail.vue'),
        },
        {
          path: 'banner-detail1',
          name: 'banner介绍',
          component: () => import('./pages/advertisement/banner-detail1.vue'),
        },
        {
          path: 'today-detail',
          name: '今日上新',
          component: () => import('./pages/advertisement/today-detail.vue'),
        },
      ],
    },
    {
      path: '/complaint',
      name: '投诉管理',
      redirect: '/complaint/list',
      component: layoutView,
      children: [
        {
          path: 'list',
          name: '投诉列表',
          component: () => import('./pages/complaint/list.vue'),
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
