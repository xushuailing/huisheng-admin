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
      path: '/setting',
      name: '系统管理',
      component: layoutView,
      redirect: '/setting/index',
      children: [
        {
          path: 'index',
          name: '平台管理',
          meta: { breadcrumb: [{ title: '系统管理' }, { title: '平台管理' }] },
          component: () => import('./pages/admin/setting/index.vue'),
        },
        {
          path: 'root-name',
          name: '平台管理员账号',
          meta: {
            breadcrumb: [{ title: '系统管理' }, { title: '总账号管理' }],
          },
          component: () => import('./pages/admin/setting/root-name.vue'),
        },
        {
          path: 'username-list',
          name: '平台管理员账号',
          meta: {
            breadcrumbHide: true,
            breadcrumb: [{ title: '系统管理' }, { title: '平台管理员账号' }],
          },
          component: () => import('./pages/admin/setting/platform-username-list.vue'),
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
      path: '/merchant',
      name: '商家管理',
      redirect: '/merchant/inject',
      component: layoutView,
      children: [
        {
          path: 'inject',
          name: '商家入驻审核列表页',
          meta: { breadcrumb: [{ title: '商家管理' }, { title: '商家入驻审核列表' }] },
          component: () => import('./pages/admin/merchant/inject-list.vue'),
        },
        {
          path: 'shop',
          name: '商家店铺管理',
          meta: { breadcrumb: [{ title: '商家管理' }, { title: '商家店铺管理' }] },
          component: () => import('./pages/admin/merchant/shop-list.vue'),
        },
        {
          path: 'shop-detail',
          name: '店铺基本信息',
          meta: {
            breadcrumb: [
              { title: '商家管理' },
              { title: '商家店铺管理' },
              { title: '店铺基本信息' },
            ],
          },
          component: () => import('./pages/admin/merchant/shop-detail.vue'),
        },
        {
          path: 'shop-join',
          name: '商家入驻信息',
          meta: {
            breadcrumb: [{ title: '商家管理' }, { title: '商家入驻信息' }],
          },
          component: () => import('./pages/admin/merchant/shop-join.vue'),
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
          component: () => import('./pages/admin/vip/list.vue'),
        },
        {
          path: 'check-list',
          name: '审核列表',
          meta: { breadcrumb: [{ title: '会员管理' }, { title: '审核列表' }] },
          component: () => import('./pages/admin/vip/check-list.vue'),
        },
        {
          path: 'rules-manage',
          name: '规则管理',
          meta: { breadcrumb: [{ title: '会员管理' }, { title: '规则管理' }] },
          component: () => import('./pages/admin/vip/rules-manage.vue'),
        },
        {
          path: 'rules-list',
          name: '会员规则',
          meta: { breadcrumb: [{ title: '会员管理' }, { title: '会员规则' }] },
          component: () => import('./pages/admin/vip/rules-list.vue'),
        },
        {
          path: 'agent',
          name: '添加代理',
          meta: { breadcrumb: [{ title: '会员管理' }, { title: '添加代理' }] },
          component: () => import('./pages/admin/vip/add-agent.vue'),
        },
      ],
    },
    {
      path: '/complaints',
      name: '投诉管理',
      component: layoutView,
      redirect: '/complaints/list',
      children: [
        {
          path: 'list',
          name: '投诉列表',
          meta: { breadcrumb: [{ title: '投诉管理' }, { title: '投诉列表' }] },
          component: () => import('./pages/admin/complaints/list.vue'),
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
          path: 'shelves',
          name: '已下架',
          component: () => import('./pages/product/shelves.vue'),
          meta: { breadcrumb: [{ title: '商品管理' }, { title: '已下架' }] },
        },
        {
          path: 'add',
          name: '发布宝贝',
          component: () => import('./pages/product/add.vue'),
          meta: { breadcrumb: [{ title: '商品管理' }, { title: '发布宝贝' }] },
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
            breadcrumb: [{ title: '店铺管理' }, { title: '店铺基本设置' }],
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
          component: () => import('./pages/admin/activity/index.vue'),
          meta: { breadcrumb: [{ title: '活动管理' }, { title: '首页活动' }] },
        },
        {
          path: 'ads-list',
          name: '广告管理',
          component: () => import('./pages/admin/activity/ads-list.vue'),
          meta: {
            breadcrumbHide: true,
            breadcrumb: [{ title: '活动管理' }, { title: '广告管理' }],
          },
        },
        {
          path: 'ads-sorts',
          name: '广告分类',
          component: () => import('./pages/admin/activity/ads-sorts.vue'),
          meta: {
            breadcrumbHide: true,
            breadcrumb: [{ title: '活动管理' }, { title: '广告分类' }],
          },
        },
        {
          path: 'ads-sorts-detail',
          name: '详情',
          component: () => import('./pages/admin/activity/ads-sorts-detail.vue'),
          meta: {
            breadcrumb: [{ title: '活动管理' }, { title: '广告分类' }, { title: '详情' }],
          },
        },
        {
          path: 'new',
          name: '今日上新',
          component: () => import('./pages/admin/activity/new-list.vue'),
          meta: { breadcrumb: [{ title: '活动管理' }, { title: '今日上新' }] },
        },
        {
          path: 'famous',
          name: '大牌榜单',
          component: () => import('./pages/admin/activity/famous-list.vue'),
          meta: { breadcrumb: [{ title: '活动管理' }, { title: '大牌榜单' }] },
        },
        {
          path: 'good',
          name: '发现好物',
          component: () => import('./pages/admin/activity/good-list.vue'),
          meta: { breadcrumb: [{ title: '活动管理' }, { title: '发现好物' }] },
        },
        {
          path: 'preferential',
          name: '优惠活动',
          component: () => import('./pages/admin/activity/preferential-list.vue'),
          meta: { breadcrumb: [{ title: '自营产品管理' }, { title: '优惠活动' }] },
        },
        {
          path: 'preferential-add',
          name: '新增优惠券',
          component: () => import('./pages/admin/activity/preferential-add.vue'),
          meta: {
            breadcrumb: [{ title: '活动管理' }, { title: '优惠活动' }, { title: '新增优惠券' }],
          },
        },
        {
          path: 'audit',
          name: '审核列表',
          component: () => import('./pages/admin/activity/audit-list.vue'),
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
      path: '/market',
      name: '营销管理',
      redirect: '/market/index',
      component: layoutView,
      children: [
        {
          path: 'index',
          name: '优惠活动',
          component: () => import('./pages/market/index.vue'),
          meta: { breadcrumb: [{ title: '新增优惠券' }] },
        },
        {
          path: 'add',
          name: '新增优惠券',
          // component: () => import('./pages/market/preferential-add.vue'),
          meta: {
            breadcrumb: [{ title: '活动管理' }, { title: '优惠活动' }, { title: '新增优惠券' }],
          },
        },
        {
          path: 'analysis',
          name: '优惠活动',
          component: () => import('./pages/market/analysis.vue'),
          meta: { breadcrumb: [{ title: '营销管理' }, { title: '分析概况' }] },
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
