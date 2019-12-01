import layoutView from '../layout/index.vue';

export default [
  {
    path: '/shop',
    name: '店铺管理',
    redirect: '/shop/baseinfo',
    component: layoutView,
    children: [
      {
        path: 'baseinfo',
        name: '信息修改',
        component: () => import('../pages/merchant/shop/baseinfo.vue'),
        meta: { breadcrumb: [{ title: '店铺管理' }, { title: '信息修改' }] },
      },
      {
        path: 'auth',
        name: '店铺认证',
        component: () => import('../pages/merchant/shop/auth.vue'),
        meta: {
          breadcrumbHide: true,
          breadcrumb: [{ title: '店铺管理' }, { title: '店铺基本设置' }],
        },
      },
      {
        path: 'service',
        name: '客服',
        component: () => import('../pages/merchant/shop/service.vue'),
        meta: { breadcrumb: [{ title: '店铺管理' }, { title: '客服列表' }] },
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
        component: () => import('../pages/merchant/product/list.vue'),
        meta: { breadcrumb: [{ title: '商品管理' }, { title: '全部商品' }] },
      },
      {
        path: 'shelves',
        name: '已下架',
        component: () => import('../pages/merchant/product/shelves.vue'),
        meta: { breadcrumb: [{ title: '商品管理' }, { title: '已下架' }] },
      },
      {
        path: 'add',
        name: '发布宝贝',
        component: () => import('../pages/merchant/product/add.vue'),
        meta: { breadcrumb: [{ title: '商品管理' }, { title: '发布宝贝' }] },
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
        component: () => import('../pages/merchant/market/index.vue'),
        meta: { breadcrumb: [{ title: '新增优惠券' }] },
      },
      {
        path: 'analysis',
        name: '优惠活动',
        component: () => import('../pages/merchant/market/analysis.vue'),
        meta: { breadcrumb: [{ title: '营销管理' }, { title: '分析概况' }] },
      },
      // 虚拟
      {
        path: 'add',
        name: '新增优惠券',
        component: () => import('../pages/merchant/market/add.vue'),
        meta: {
          breadcrumb: [{ title: '活动管理' }, { title: '优惠券' }, { title: '新增优惠券' }],
        },
      },
      // 实体
      {
        path: 'manjian',
        name: '新增优惠券',
        component: () => import('../pages/merchant/market/add-coupon.vue'),
        meta: {
          breadcrumb: [{ title: '营销管理' }, { title: '优惠券' }, { title: '新增优惠券' }],
        },
      },
      {
        path: 'coupon',
        name: '优惠券',
        component: () => import('../pages/merchant/market/condition.vue'),
        meta: { breadcrumb: [{ title: '营销管理' }, { title: '优惠券' }] },
      },
    ],
  },
  {
    path: '/member',
    name: '会员管理',
    redirect: '/member/index',
    component: layoutView,
    children: [
      {
        path: 'index',
        name: '会员管理页',
        meta: { breadcrumb: [{ title: '会员管理' }] },
        component: () => import('../pages/merchant/member/index.vue'),
      },
      {
        path: 'list',
        name: '收益明细',
        meta: { breadcrumb: [{ title: '会员管理' }, { title: '收益明细' }] },
        component: () => import('../pages/merchant/member/list.vue'),
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
        component: () => import('../pages/merchant/management/data.vue'),
        meta: { breadcrumb: [{ title: '经营管理' }, { title: '实时数据' }] },
      },
      {
        path: 'account',
        name: '账房',
        component: () => import('../pages/merchant/management/account.vue'),
        meta: { breadcrumb: [{ title: '经营管理' }, { title: '账房' }] },
      },
      {
        path: 'recode',
        name: '提现记录',
        component: () => import('../pages/merchant/management/recode.vue'),
        meta: { breadcrumb: [{ title: '经营管理' }, { title: '提现记录' }] },
      },
    ],
  },
  {
    path: '/order',
    name: '订单管理',
    redirect: '/order/index',
    component: layoutView,
    children: [
      {
        path: 'index',
        name: '全部订单',
        component: () => import('../pages/merchant/order/index.vue'),
        meta: { breadcrumb: [{ title: '订单管理' }, { title: '全部订单' }] },
      },
      {
        path: 'return',
        name: '退货管理',
        component: () => import('../pages/merchant/order/return.vue'),
        meta: { breadcrumb: [{ title: '订单管理' }, { title: '退货管理' }] },
      },
      {
        path: 'evaluate',
        name: '评价管理',
        component: () => import('../pages/merchant/order/evaluate.vue'),
        meta: { breadcrumb: [{ title: '订单管理' }, { title: '评价管理' }] },
      },
      {
        path: 'delivery',
        name: '待发货订单',
        component: () => import('../pages/merchant/order/delivery.vue'),
        meta: {
          breadcrumb: [{ title: '订单管理' }, { title: '待发货订单' }, { title: '发货' }],
        },
      },
      {
        path: 'detail',
        name: '详情',
        component: () => import('../pages/merchant/order/detail.vue'),
        meta: {
          breadcrumb: [{ title: '订单管理' }, { title: '订单列表' }, { title: '详情' }],
        },
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
        component: () => import('../pages/merchant/advertisement/list.vue'),
        meta: { breadcrumb: [{ title: '广告管理' }, { title: '广告推广' }] },
      },
      {
        path: 'mine-banner',
        name: '我的推广',
        component: () => import('../pages/merchant/advertisement/mine-banner.vue'),
        meta: { breadcrumb: [{ title: '广告管理' }, { title: '我的推广' }] },
      },
      {
        path: 'banner-active',
        name: '活动banner',
        component: () => import('../pages/merchant/advertisement/banner-active.vue'),
        meta: { breadcrumb: [{ title: '广告管理' }, { title: '活动banner' }] },
      },
      {
        path: 'banner-detail1',
        name: 'banner介绍',
        component: () => import('../pages/merchant/advertisement/banner-detail1.vue'),
        meta: { breadcrumb: [{ title: '广告管理' }, { title: 'banner介绍' }] },
      },
      {
        path: 'upload',
        name: '广告推广',
        component: () => import('../pages/merchant/advertisement/upload.vue'),
        meta: { breadcrumb: [{ title: '广告管理' }, { title: '广告推广' }, { title: '购买' }] },
      },
      {
        path: 'today-detail',
        name: '今日上新',
        component: () => import('../pages/merchant/advertisement/today-detail.vue'),
        meta: { breadcrumb: [{ title: '广告管理' }, { title: '今日上新' }] },
      },
    ],
  },
];
