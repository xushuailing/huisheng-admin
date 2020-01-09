import { RouteConfig } from 'vue-router/types/router.d';
import layoutView from '../layout/index.vue';
import _Storage from '@/utils/storage';

const router: RouteConfig[] = [
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
        meta: { breadcrumbHide: true, breadcrumb: [{ title: '店铺管理' }, { title: '客服列表' }] },
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
        name: '商品列表（虚拟）',
        component: () => import('../pages/merchant/product/list/list.vue'),
        meta: { breadcrumbHide: true, breadcrumb: [{ title: '产品列表' }, { title: '全部产品' }] },
      },
      {
        path: 'list-physical',
        name: '商品列表（实体）',
        component: () => import('../pages/merchant/product/list/list.vue'),
        meta: {
          breadcrumbHide: true,
          breadcrumb: [{ title: '商品列表' }, { title: '已上架商品' }],
        },
      },
      {
        path: 'add',
        name: '发布宝贝',
        component: () => import('../pages/merchant/product/add/add.vue'),
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
        path: 'mine',
        name: '我的优惠券',
        component: () => import('../pages/merchant/market/mine.vue'),
        meta: { breadcrumb: [{ title: '营销管理' }, { title: '优惠券' }] },
      },
      {
        path: 'index',
        name: '优惠券列表',
        component: () => import('../pages/merchant/market/index.vue'),
        meta: { breadcrumb: [{ title: '营销管理' }, { title: '新增优惠券' }] },
      },
      {
        path: 'analysis',
        name: '分析概况',
        component: () => import('../pages/merchant/market/analysis.vue'),
        meta: { breadcrumb: [{ title: '营销管理' }, { title: '分析概况' }] },
      },
      // 虚拟：满减/ 实体：折扣
      {
        path: 'add',
        name: '新增优惠券-虚拟满减/实体折扣',
        component: () => import('../pages/merchant/market/add.vue'),
        meta: {
          breadcrumb: [{ title: '活动管理' }, { title: '优惠券' }, { title: '新增优惠券' }],
        },
      },
      // 实体:满减
      {
        path: 'add-discount',
        name: '新增优惠券-实体满减',
        component: () => import('../pages/merchant/market/add-coupon.vue'),
        meta: {
          breadcrumb: [{ title: '营销管理' }, { title: '优惠券' }, { title: '新增优惠券' }],
        },
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
        path: 'member',
        name: '会员管理',
        meta: { breadcrumb: [{ title: '会员管理' }] },
        component: () => import('../pages/merchant/member/index.vue'),
      },
      {
        path: 'member-detail',
        name: '收益明细',
        meta: { breadcrumb: [{ title: '会员管理' }, { title: '收益明细' }] },
        component: () => import('../pages/merchant/member/list.vue'),
      },
      {
        path: 'agent',
        name: '代理',
        meta: { breadcrumb: [{ title: '会员管理' }] },
        component: () => import('../pages/merchant/member/index.vue'),
      },
      {
        path: 'agent-detail',
        name: '代理明细',
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
        path: 'index-virtual',
        name: '全部订单',
        component: () => import('../pages/merchant/order/virtual/index.vue'),
        meta: { breadcrumb: [{ title: '订单管理' }, { title: '全部订单' }] },
      },
      {
        path: 'return',
        name: '退货管理',
        component: () => import('../pages/merchant/order/return.vue'),
        meta: { breadcrumb: [{ title: '订单管理' }, { title: '退货管理' }] },
      },
      {
        path: 'comment',
        name: '评价管理',
        component: () => import('../pages/merchant/order/comment.vue'),
        meta: { breadcrumb: [{ title: '订单管理' }, { title: '评价管理' }] },
      },
      {
        path: 'comment-user',
        name: '评价管理',
        component: () => import('../pages/merchant/order/comment-user.vue'),
        meta: { breadcrumb: [{ title: '订单管理' }, { title: '评价管理' }, { title: '查看' }] },
      },
      {
        path: 'comment-detail',
        name: '评价详情',
        component: () => import('../pages/merchant/order/detail/comment.vue'),
        meta: { breadcrumb: [{ title: '订单管理' }, { title: '详情' }] },
      },
      {
        path: 'pay-detail',
        name: '待付款订单详情',
        component: () => import('../pages/merchant/order/detail/pay.vue'),
        meta: {
          breadcrumb: [{ title: '订单管理' }, { title: '待付款订单' }, { title: '详情' }],
        },
      },
      {
        path: 'send-detail',
        name: '待发货订单详情',
        component: () => import('../pages/merchant/order/detail/send.vue'),
        meta: { breadcrumb: [{ title: '订单管理' }, { title: '待发货订单' }, { title: '详情' }] },
      },
      {
        path: 'receive-detail',
        name: '收货与物流信息',
        component: () => import('../pages/merchant/order/detail/receive.vue'),
        meta: { breadcrumb: [{ title: '订单管理' }, { title: '收货与物流信息' }] },
      },
      {
        path: 'return-detail',
        name: '退货详情',
        component: () => import('../pages/merchant/order/detail/return.vue'),
        meta: { breadcrumb: [{ title: '退货管理' }, { title: '详情' }] },
      },
      {
        path: 'invalid-detail',
        name: '取消/虚拟待付款/待评价详情',
        component: () => import('../pages/merchant/order/detail/invalid.vue'),
        meta: { breadcrumb: [{ title: '订单管理' }, { title: '详情' }] },
      },
      {
        path: 'finish-detail',
        name: '已完成详情',
        component: () => import('../pages/merchant/order/detail/finish.vue'),
        meta: { breadcrumb: [{ title: '订单管理' }, { title: '详情' }] },
      },
      {
        path: 'address',
        name: '修改地址',
        component: () => import('../pages/merchant/order/address.vue'),
        meta: {
          breadcrumb: [
            { title: '订单管理' },
            { title: '待发货订单' },
            { title: '发货' },
            { title: '修改地址' },
          ],
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
        path: 'buy',
        name: 'banner购买',
        component: () => import('../pages/merchant/advertisement/banner-detail.vue'),
        meta: { breadcrumb: [{ title: '广告管理' }, { title: '广告推广' }, { title: '详情' }] },
      },
      {
        path: 'buy',
        name: '今日上新购买',
        component: () => import('../pages/merchant/advertisement/banner-detail.vue'),
        meta: { breadcrumb: [{ title: '广告管理' }, { title: '广告推广' }, { title: '详情' }] },
      },
      {
        path: 'mine',
        name: '我的推广',
        component: () => import('../pages/merchant/advertisement/mine-banner.vue'),
        meta: { breadcrumb: [{ title: '广告管理' }, { title: '我的推广' }] },
      },
      {
        path: 'upload',
        name: '上传banner图',
        component: () => import('../pages/merchant/advertisement/upload.vue'),
        meta: { breadcrumb: [{ title: '广告管理' }, { title: '广告推广' }, { title: '购买' }] },
      },
      {
        path: 'add-goods',
        name: '添加商品id',
        component: () => import('../pages/merchant/advertisement/add-goods.vue'),
        meta: { breadcrumb: [{ title: '广告管理' }, { title: '广告推广' }, { title: '详情' }] },
      },
      {
        path: 'today-detail',
        name: '今日上新详情',
        component: () => import('../pages/merchant/advertisement/today-detail.vue'),
        meta: {
          breadcrumbHide: true,
          breadcrumb: [{ title: '广告管理' }, { title: '广告推广' }, { title: '详情' }],
        },
      },
    ],
  },
];

export default router.map((item: RouteConfig) => {
  item.beforeEnter = (to, from, next) => {
    const userInfo = _Storage.get('user_info');
    if (userInfo) {
      next();
      return;
    }
    next('/login');
  };
  return item;
});
