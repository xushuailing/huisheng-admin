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
      path: '/vip',
      name: '会员管理',
      component: layoutView,
      redirect: '/vip/list',
      children: [
        {
          path: 'list',
          name: '列表',
          meta: { breadcrumb: [{ title: '会员管理' }, { title: '列表' }] },
          component: () => import('./pages/vip-manage/list.vue'),
        },
        {
          path: 'check-list',
          name: '审核列表',
          meta: { breadcrumb: [{ title: '会员管理' }, { title: '审核列表' }] },
          component: () => import('./pages/vip-manage/check-list.vue'),
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
          meta: { breadcrumb: [{ title: '商品管理' }, { title: '全部商品' }] },
        },
        {
          path: 'demo',
          name: ' 测试',
          component: () => import('./pages/product/demo.vue'),
          meta: { breadcrumb: [{ title: '商品管理' }, { title: '测试' }] },
        },
      ],
    },
    {
      path: '/member',
      name: '会员管理',
      redirect: '/member/member',
      component: layoutView,
      children: [
        {
          path: 'member',
          name: '会员',
          component: () => import('./pages/member/member.vue'),
          meta: { breadcrumb: [{ title: '会员管理' }, { title: '会员' }] },
        },
        {
          path: 'agent',
          name: '代理',
          component: () => import('./pages/member/agent.vue'),
          meta: { breadcrumb: [{ title: '会员管理' }, { title: '代理' }] },
        },
        {
          path: 'agent-detail',
          name: '代理明细',
          component: () => import('./pages/member/agent-detail.vue'),
          meta: { breadcrumb: [{ title: '会员管理' }, { title: '代理明细' }] },
        },
        {
          path: 'member-detail',
          name: '会员明细',
          component: () => import('./pages/member/member-detail.vue'),
          meta: { breadcrumb: [{ title: '会员管理' }, { title: '会员明细' }] },
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
      redirect: '/shop/baseinfo',
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
        {
          path: 'kefu',
          name: '客服',
          component: () => import('./pages/shop/kefu.vue'),
          meta: {
            breadcrumbHide: true,
            breadcrumb: [{ title: '店铺管理' }, { title: '客服' }],
          },
        },
      ],
    },
    {
      path: '/management',
      name: '经营管理',
      redirect: '/management/data',
      component: layoutView,
      children: [
        {
          path: 'data',
          name: '实时数据',
          component: () => import('./pages/management/data.vue'),
          meta: { breadcrumb: [{ title: '经营管理' }, { title: '实时数据' }] },
        },
        {
          path: 'account',
          name: '账房',
          component: () => import('./pages/management/account.vue'),
          meta: { breadcrumb: [{ title: '经营管理' }, { title: '账房' }] },
        },
        {
          path: 'recode',
          name: '提现记录',
          component: () => import('./pages/management/recode.vue'),
          meta: { breadcrumb: [{ title: '经营管理' }, { title: '提现记录' }] },
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
