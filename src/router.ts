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
          path: 'banner-detail',
          name: 'banner详情',
          component: () => import('./pages/advertisement/banner-detail.vue'),
          meta: { breadcrumb: [{ title: '广告管理' }, { title: 'banner详情' }] },
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
      path: '/activity',
      name: '活动管理',
      redirect: '/activity/index',
      component: layoutView,
      children: [
        {
          path: 'index',
          name: '首页活动',
          component: () => import('./pages/activity/index.vue'),
          meta: { breadcrumb: [{ title: '活动管理' }, { title: '首页活动' }] },
        },
        {
          path: 'ads-list',
          name: '广告管理',
          component: () => import('./pages/activity/ads-list.vue'),
          meta: { breadcrumb: [{ title: '活动管理' }, { title: '广告管理' }] },
        },
        {
          path: 'ads-sorts',
          name: '广告分类',
          component: () => import('./pages/activity/ads-sorts.vue'),
          meta: { breadcrumb: [{ title: '活动管理' }, { title: '广告分类' }] },
        },
        {
          path: 'new',
          name: '今日上新',
          component: () => import('./pages/activity/new-list.vue'),
          meta: { breadcrumb: [{ title: '活动管理' }, { title: '今日上新' }] },
        },
        {
          path: 'famous',
          name: '大牌榜单',
          component: () => import('./pages/activity/famous-list.vue'),
          meta: { breadcrumb: [{ title: '活动管理' }, { title: '大牌榜单' }] },
        },
        {
          path: 'good',
          name: '发现好物',
          component: () => import('./pages/activity/good-list.vue'),
          meta: { breadcrumb: [{ title: '活动管理' }, { title: '发现好物' }] },
        },
        {
          path: 'preferential',
          name: '优惠活动',
          component: () => import('./pages/activity/preferential-list.vue'),
          meta: { breadcrumb: [{ title: '活动管理' }, { title: '优惠活动' }] },
        },
        {
          path: 'preferential-add',
          name: '新增优惠券',
          component: () => import('./pages/activity/preferential-add.vue'),
          meta: {
            breadcrumb: [{ title: '活动管理' }, { title: '优惠活动' }, { title: '新增优惠券' }],
          },
        },
        {
          path: 'audit',
          name: '审核列表',
          component: () => import('./pages/activity/audit-list.vue'),
          meta: { breadcrumb: [{ title: '活动管理' }, { title: '审核列表' }] },
        },
      ],
    },
    {
      path: '/thirdpartnar',
      name: '代运营管理',
      redirect: '/thirdpartnar/index',
      component: layoutView,
      children: [
        {
          path: 'index',
          name: '奶爸代运营列表',
          component: () => import('./pages/thirdpartnar/index.vue'),
          meta: { breadcrumb: [{ title: '代运营管理' }, { title: '奶爸代运营列表' }] },
        },
        {
          path: 'detail',
          name: '奶爸代运营详情',
          component: () => import('./pages/thirdpartnar/details/index.vue'),
          meta: {
            breadcrumb: [{ title: '代运营管理' }, { title: '奶爸代运营列表' }, { title: '详情' }],
          },
        },
        {
          path: 'shops',
          name: '店铺诊断',
          component: () => import('./pages/thirdpartnar/details/data/shop/index.vue'),
          meta: {
            breadcrumb: [
              { title: '代运营管理' },
              { title: '奶爸代运营列表' },
              { title: '店铺诊断' },
            ],
          },
        },
        {
          path: 'market',
          name: '营销策划',
          component: () => import('./pages/thirdpartnar/details/data/market/index.vue'),
          meta: {
            breadcrumb: [
              { title: '代运营管理' },
              { title: '奶爸代运营列表' },
              { title: '营销策划' },
            ],
          },
        },
        {
          path: 'promotion',
          name: '推广计划表',
          component: () => import('./pages/thirdpartnar/details/data/promotion/index.vue'),
          meta: {
            breadcrumb: [
              { title: '代运营管理' },
              { title: '奶爸代运营列表' },
              { title: '推广计划表' },
            ],
          },
        },
        {
          path: 'setting',
          name: '代运营设置',
          component: () => import('./pages/thirdpartnar/setting/index.vue'),
          meta: { breadcrumb: [{ title: '代运营管理' }, { title: '代运营设置' }] },
        },
        {
          path: 'service',
          name: '运营客服列表',
          component: () => import('./pages/thirdpartnar/service/list.vue'),
          meta: { breadcrumb: [{ title: '客服管理' }, { title: '运营客服列表' }] },
        },
        {
          path: 'service-detail',
          name: '运营客服详情',
          component: () => import('./pages/thirdpartnar/service/detail.vue'),
          meta: {
            breadcrumb: [{ title: '客服管理' }, { title: '运营客服列表' }, { title: '查看' }],
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
