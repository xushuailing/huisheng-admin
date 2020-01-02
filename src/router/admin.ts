import layoutView from '../layout/index.vue';

export default [
  // 系统管理
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
        component: () => import('../pages/admin/setting/index.vue'),
      },
      {
        path: 'root-name',
        name: '平台管理员账号',
        meta: {
          breadcrumb: [{ title: '系统管理' }, { title: '总账号管理' }],
        },
        component: () => import('../pages/admin/setting/root-name.vue'),
      },
      {
        path: 'username-list',
        name: '平台管理员账号',
        meta: {
          breadcrumbHide: true,
          breadcrumb: [{ title: '系统管理' }, { title: '平台管理员账号' }],
        },
        component: () => import('../pages/admin/setting/platform-username-list.vue'),
      },
      {
        path: 'role-list',
        name: '角色管理',
        component: () => import('../pages/admin/setting/platform-role-list.vue'),
        meta: {
          breadcrumbHide: true,
          breadcrumb: [{ title: '系统管理' }, { title: '角色管理' }],
        },
      },
    ],
  },
  // 商家管理
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
        component: () => import('../pages/admin/merchant/inject-list.vue'),
      },
      {
        path: 'shop',
        name: '商家店铺管理',
        meta: { breadcrumb: [{ title: '商家管理' }, { title: '商家店铺管理' }] },
        component: () => import('../pages/admin/merchant/shop-list.vue'),
      },
      {
        path: 'shop-detail',
        name: '店铺基本信息',
        meta: {
          breadcrumb: [{ title: '商家管理' }, { title: '商家店铺管理' }, { title: '店铺基本信息' }],
        },
        component: () => import('../pages/admin/merchant/shop-detail.vue'),
      },
      {
        path: 'shop-join',
        name: '商家入驻信息',
        meta: {
          breadcrumb: [{ title: '商家管理' }, { title: '商家入驻信息' }],
        },
        component: () => import('../pages/admin/merchant/shop-join.vue'),
      },
    ],
  },
  // 会员管理
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
        component: () => import('../pages/admin/vip/list.vue'),
      },
      {
        path: 'check-list',
        name: '审核列表',
        meta: { breadcrumb: [{ title: '会员管理' }, { title: '审核列表' }] },
        component: () => import('../pages/admin/vip/check-list.vue'),
      },
      {
        path: 'rules-manage',
        name: '规则管理',
        meta: { breadcrumb: [{ title: '会员管理' }, { title: '规则管理' }] },
        component: () => import('../pages/admin/vip/rules-manage.vue'),
      },
      {
        path: 'rules-list',
        name: '会员规则',
        meta: { breadcrumb: [{ title: '会员管理' }, { title: '会员规则' }] },
        component: () => import('../pages/admin/vip/rules-list.vue'),
      },
      {
        path: 'agent',
        name: '添加代理',
        meta: { breadcrumb: [{ title: '会员管理' }, { title: '添加代理' }] },
        component: () => import('../pages/admin/vip/add-agent.vue'),
      },
    ],
  },
  // 活动管理
  {
    path: '/activity',
    name: '活动管理',
    redirect: '/activity/index',
    component: layoutView,
    children: [
      {
        path: 'index',
        name: '首页活动',
        component: () => import('../pages/admin/activity/index.vue'),
        meta: { breadcrumb: [{ title: '活动管理' }, { title: '首页活动' }] },
      },
      {
        path: 'ads-list',
        name: '广告管理',
        component: () => import('../pages/admin/activity/ads-list.vue'),
        meta: {
          breadcrumbHide: true,
          breadcrumb: [{ title: '活动管理' }, { title: '广告管理' }],
        },
      },
      {
        path: 'ads-sorts-list',
        name: '广告分类',
        component: () => import('../pages/admin/activity/ads-sorts-list.vue'),
        meta: {
          breadcrumbHide: true,
          breadcrumb: [{ title: '活动管理' }, { title: '广告分类' }],
        },
      },
      {
        path: 'ads-sorts-detail',
        name: '详情',
        component: () => import('../pages/admin/activity/ads-sorts-detail.vue'),
        meta: {
          breadcrumb: [{ title: '活动管理' }, { title: '广告分类' }, { title: '详情' }],
        },
      },
      {
        path: 'new-list',
        name: '今日上新',
        component: () => import('../pages/admin/activity/new-list.vue'),
        meta: { breadcrumbHide: true, breadcrumb: [{ title: '活动管理' }, { title: '今日上新' }] },
      },
      {
        path: 'famous-list',
        name: '大牌榜单',
        component: () => import('../pages/admin/activity/famous-list.vue'),
        meta: { breadcrumbHide: true, breadcrumb: [{ title: '活动管理' }, { title: '大牌榜单' }] },
      },
      {
        path: 'good-list',
        name: '发现好物',
        component: () => import('../pages/admin/activity/good-list.vue'),
        meta: { breadcrumbHide: true, breadcrumb: [{ title: '活动管理' }, { title: '发现好物' }] },
      },
      {
        path: 'preferential-list',
        name: '优惠活动',
        component: () => import('../pages/admin/activity/preferential-list.vue'),
        meta: { breadcrumb: [{ title: '自营产品管理' }, { title: '优惠活动' }] },
      },
      {
        path: 'preferential-add',
        name: '新增优惠券',
        component: () => import('../pages/admin/activity/preferential-add.vue'),
        meta: {
          breadcrumb: [{ title: '活动管理' }, { title: '优惠活动' }, { title: '新增优惠券' }],
        },
      },
      {
        path: 'audit-list',
        name: '审核列表',
        component: () => import('../pages/admin/activity/audit-list.vue'),
        meta: { breadcrumb: [{ title: '活动管理' }, { title: '审核列表' }] },
      },
    ],
  },
  // 代运营管理
  {
    path: '/thirdpartnar',
    name: '代运营管理',
    redirect: '/thirdpartnar/index',
    component: layoutView,
    children: [
      {
        path: 'index',
        name: '奶爸代运营列表',
        component: () => import('../pages/admin/thirdpartnar/index.vue'),
        meta: { breadcrumb: [{ title: '代运营管理' }, { title: '奶爸代运营列表' }] },
      },
      {
        path: 'detail',
        name: '奶爸代运营详情',
        component: () => import('../pages/admin/thirdpartnar/details/index.vue'),
        meta: {
          breadcrumb: [{ title: '代运营管理' }, { title: '奶爸代运营列表' }, { title: '详情' }],
        },
      },
      {
        path: 'shops',
        name: '店铺诊断',
        component: () => import('../pages/admin/thirdpartnar/details/data/shop/index.vue'),
        meta: {
          breadcrumb: [{ title: '代运营管理' }, { title: '奶爸代运营列表' }, { title: '店铺诊断' }],
        },
      },
      {
        path: 'market',
        name: '营销策划',
        component: () => import('../pages/admin/thirdpartnar/details/data/market/index.vue'),
        meta: {
          breadcrumb: [{ title: '代运营管理' }, { title: '奶爸代运营列表' }, { title: '营销策划' }],
        },
      },
      {
        path: 'promotion',
        name: '推广计划表',
        component: () => import('../pages/admin/thirdpartnar/details/data/promotion/index.vue'),
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
        component: () => import('../pages/admin/thirdpartnar/setting/index.vue'),
        meta: { breadcrumb: [{ title: '代运营管理' }, { title: '代运营设置' }] },
      },
      {
        path: 'service',
        name: '运营客服列表',
        component: () => import('../pages/admin/thirdpartnar/service/list.vue'),
        meta: { breadcrumb: [{ title: '客服管理' }, { title: '运营客服列表' }] },
      },
      {
        path: 'service-detail',
        name: '运营客服详情',
        component: () => import('../pages/admin/thirdpartnar/service/detail.vue'),
        meta: {
          breadcrumb: [{ title: '客服管理' }, { title: '运营客服列表' }, { title: '查看' }],
        },
      },
    ],
  },
  // 运营小知识
  {
    path: '/operate',
    name: '运营小知识',
    redirect: '/operate/evaluate-list',
    component: layoutView,
    children: [
      {
        path: 'evaluate-list',
        name: '评价模板',
        component: () => import('../pages/admin/operate/evaluate-list.vue'),
        meta: {
          breadcrumbHide: true,
          breadcrumb: [{ title: '运营小知识' }, { title: '评价模板' }],
        },
      },
      {
        path: 'poster-list',
        name: '海报专场',
        component: () => import('../pages/admin/operate/poster-list.vue'),
        meta: {
          breadcrumbHide: true,
          breadcrumb: [{ title: '运营管理' }, { title: '运营小知识' }, { title: '海报专场' }],
        },
      },
      {
        path: 'images-list',
        name: '图片精选',
        component: () => import('../pages/admin/operate/images-list.vue'),
        meta: {
          breadcrumbHide: true,
          breadcrumb: [{ title: '运营管理' }, { title: '运营小知识' }, { title: '图片精选' }],
        },
      },
      {
        path: 'take-out',
        name: '外卖学院',
        component: () => import('../pages/admin/operate/take-out/index.vue'),
        meta: {
          breadcrumbHide: true,
          breadcrumb: [{ title: '运营小知识' }, { title: '外卖学院' }],
        },
      },
    ],
  },
  // 资金管理
  {
    path: '/management',
    name: '资金管理',
    redirect: '/management/data',
    component: layoutView,
    children: [
      {
        path: 'data',
        name: '平台成交额',
        component: () => import('../pages/admin/management/data.vue'),
        meta: { breadcrumb: [{ title: '资金管理' }, { title: '平台成交额' }] },
      },
      {
        path: 'record',
        name: '账房',
        component: () => import('../pages/admin/management/record.vue'),
        meta: { breadcrumb: [{ title: '资金管理' }, { title: '账房' }] },
      },
      {
        path: 'check',
        name: '提现审核',
        component: () => import('../pages/admin/management/check.vue'),
        meta: { breadcrumb: [{ title: '资金管理' }, { title: '提现审核' }] },
      },
    ],
  },
];
