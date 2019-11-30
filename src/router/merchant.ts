import layoutView from '../layout/index.vue';

export default [
  // {
  //   path: '/product',
  //   name: '商品管理',
  //   redirect: '/product/list',
  //   component: layoutView,
  //   children: [
  //     {
  //       path: 'list',
  //       name: '商品列表',
  //       component: () => import('../pages/product/list.vue'),
  //       meta: { breadcrumb: [{ title: '商品管理' }, { title: '全部商品' }] },
  //     },
  //     {
  //       path: 'shelves',
  //       name: '已下架',
  //       component: () => import('../pages/product/shelves.vue'),
  //       meta: { breadcrumb: [{ title: '商品管理' }, { title: '已下架' }] },
  //     },
  //     {
  //       path: 'add',
  //       name: '发布宝贝',
  //       component: () => import('../pages/product/add.vue'),
  //       meta: { breadcrumb: [{ title: '商品管理' }, { title: '发布宝贝' }] },
  //     },
  //   ],
  // },
  // {
  //   path: '/member',
  //   name: '会员管理',
  //   redirect: '/member/member',
  //   component: layoutView,
  //   children: [
  //     {
  //       path: 'member',
  //       name: '会员',
  //       component: () => import('../pages/member/member.vue'),
  //       meta: { breadcrumb: [{ title: '会员管理' }, { title: '会员' }] },
  //     },
  //     {
  //       path: 'agent',
  //       name: '代理',
  //       component: () => import('../pages/member/agent.vue'),
  //       meta: { breadcrumb: [{ title: '会员管理' }, { title: '代理' }] },
  //     },
  //     {
  //       path: 'agent-detail',
  //       name: '代理明细',
  //       component: () => import('../pages/member/agent-detail.vue'),
  //       meta: { breadcrumb: [{ title: '会员管理' }, { title: '代理明细' }] },
  //     },
  //     {
  //       path: 'member-detail',
  //       name: '会员明细',
  //       component: () => import('../pages/member/member-detail.vue'),
  //       meta: { breadcrumb: [{ title: '会员管理' }, { title: '会员明细' }] },
  //     },
  //   ],
  // },
  // {
  //   path: '/advertisement',
  //   name: '广告管理',
  //   redirect: '/advertisement/list',
  //   component: layoutView,
  //   children: [
  //     {
  //       path: 'list',
  //       name: '广告推广',
  //       component: () => import('../pages/advertisement/list.vue'),
  //       meta: { breadcrumb: [{ title: '广告管理' }, { title: '广告推广' }] },
  //     },
  //     {
  //       path: 'mine-banner',
  //       name: '我的推广',
  //       component: () => import('../pages/advertisement/mine-banner.vue'),
  //       meta: { breadcrumb: [{ title: '广告管理' }, { title: '我的推广' }] },
  //     },
  //     {
  //       path: 'banner-active',
  //       name: '活动banner',
  //       component: () => import('../pages/advertisement/banner-active.vue'),
  //       meta: { breadcrumb: [{ title: '广告管理' }, { title: '活动banner' }] },
  //     },
  //     {
  //       path: 'banner-detail1',
  //       name: 'banner介绍',
  //       component: () => import('../pages/advertisement/banner-detail1.vue'),
  //       meta: { breadcrumb: [{ title: '广告管理' }, { title: 'banner介绍' }] },
  //     },
  //     {
  //       path: 'today-detail',
  //       name: '今日上新',
  //       component: () => import('../pages/advertisement/today-detail.vue'),
  //       meta: { breadcrumb: [{ title: '广告管理' }, { title: '今日上新' }] },
  //     },
  //   ],
  // },
  // {
  //   path: '/shop',
  //   name: '店铺管理',
  //   redirect: '/shop/baseinfo',
  //   component: layoutView,
  //   children: [
  //     {
  //       path: 'baseinfo',
  //       name: '信息修改',
  //       component: () => import('../pages/shop/baseinfo.vue'),
  //       meta: { breadcrumb: [{ title: '店铺管理' }, { title: '信息修改' }] },
  //     },
  //     {
  //       path: 'auth',
  //       name: '店铺认证',
  //       component: () => import('../pages/shop/auth.vue'),
  //       meta: {
  //         breadcrumbHide: true,
  //         breadcrumb: [{ title: '店铺管理' }, { title: '店铺基本设置' }],
  //       },
  //     },
  //     {
  //       path: 'kefu',
  //       name: '客服',
  //       component: () => import('../pages/shop/kefu.vue'),
  //       meta: {
  //         breadcrumbHide: true,
  //         breadcrumb: [{ title: '店铺管理' }, { title: '客服' }],
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/management',
  //   name: '经营管理',
  //   redirect: '/management/data',
  //   component: layoutView,
  //   children: [
  //     {
  //       path: 'data',
  //       name: '实时数据',
  //       component: () => import('../pages/management/data.vue'),
  //       meta: { breadcrumb: [{ title: '经营管理' }, { title: '实时数据' }] },
  //     },
  //     {
  //       path: 'account',
  //       name: '账房',
  //       component: () => import('../pages/management/account.vue'),
  //       meta: { breadcrumb: [{ title: '经营管理' }, { title: '账房' }] },
  //     },
  //     {
  //       path: 'recode',
  //       name: '提现记录',
  //       component: () => import('../pages/management/recode.vue'),
  //       meta: { breadcrumb: [{ title: '经营管理' }, { title: '提现记录' }] },
  //     },
  //   ],
  // },
  // {
  //   path: '/market',
  //   name: '营销管理',
  //   redirect: '/market/index',
  //   component: layoutView,
  //   children: [
  //     {
  //       path: 'index',
  //       name: '优惠活动',
  //       component: () => import('../pages/market/index.vue'),
  //       meta: { breadcrumb: [{ title: '新增优惠券' }] },
  //     },
  //     {
  //       path: 'add',
  //       name: '新增优惠券',
  //       // component: () => import('../pages/market/preferential-add.vue'),
  //       meta: {
  //         breadcrumb: [{ title: '活动管理' }, { title: '优惠活动' }, { title: '新增优惠券' }],
  //       },
  //     },
  //     {
  //       path: 'analysis',
  //       name: '优惠活动',
  //       component: () => import('../pages/market/analysis.vue'),
  //       meta: { breadcrumb: [{ title: '营销管理' }, { title: '分析概况' }] },
  //     },
  //   ],
  // },
];
