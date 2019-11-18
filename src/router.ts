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
          meta: { breadcrumb: [{ title: '系统管理' }, { title: '平台管理' }] },
          component: () => import('./pages/admin/setting/index.vue'),
        },
        {
          path: 'username-list',
          name: '平台管理员账号',
          meta: {
            breadcrumbHide: true,
            breadcrumb: [{ title: '系统管理' }, { title: '平台管理员账号' }],
          },
          component: () => import('./pages/admin/setting/root-name.vue'),
          // component: () => import('./pages/admin/setting/platform-username-list.vue'),
        },
        {
          path: 'role-list',
          name: '角色管理',
          component: () => import('./pages/admin/setting/platform-role-list.vue'),
          meta: {
            breadcrumbHide: true,
            breadcrumb: [{ title: '系统管理' }, { title: '角色管理' }],
          },
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
          name: '商品列表',
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
          name: '广告推广',
          component: () => import('./pages/advertisement/list.vue'),
          meta: { breadcrumb: [{ title: '广告管理' }, { title: '广告推广' }] },
        },
        {
          path: 'mine-banner',
          name: '我的推广',
          component: () => import('./pages/advertisement/mine-banner.vue'),
          meta: { breadcrumb: [{ title: '广告管理' }, { title: '我的推广' }] },
        },
        {
          path: 'banner-active',
          name: '活动banner',
          component: () => import('./pages/advertisement/banner-active.vue'),
          meta: { breadcrumb: [{ title: '广告管理' }, { title: '活动banner' }] },
        },
        {
          path: 'banner-detail1',
          name: 'banner介绍',
          component: () => import('./pages/advertisement/banner-detail1.vue'),
          meta: { breadcrumb: [{ title: '广告管理' }, { title: 'banner介绍' }] },
        },
        {
          path: 'today-detail',
          name: '今日上新',
          component: () => import('./pages/advertisement/today-detail.vue'),
          meta: { breadcrumb: [{ title: '广告管理' }, { title: '今日上新' }] },
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
          meta: { breadcrumb: [{ title: '投诉管理' }] },
        },
      ],
    },
    {
      path: '/shop',
      name: '店铺管理',
      redirect: '/complaint/baseinfo',
      component: layoutView,
      children: [
        {
          path: 'baseinfo',
          name: '信息修改',
          component: () => import('./pages/shop/baseinfo.vue'),
          meta: { breadcrumb: [{ title: '店铺管理' }, { title: '信息修改' }] },
        },
        {
          path: 'auth',
          name: '店铺认证',
          component: () => import('./pages/shop/auth.vue'),
          meta: {
            breadcrumbHide: true,
            breadcrumb: [{ title: '店铺管理' }, { title: '店铺认证' }],
          },
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
