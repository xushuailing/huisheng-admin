const router = {
  平台: [
    {
      url: '/setting',
      title: '系统管理',
      children: [
        {
          url: '/setting/index',
          title: '平台管理',
        },
        {
          url: '/setting/root-name',
          title: '平台管理员账号',
        },
        {
          url: '/setting/username-list',
          title: '平台管理员账号',
        },
        {
          url: '/setting/role-list',
          title: '角色管理',
        },
      ],
    },
    {
      url: '/merchant',
      title: '商家管理',
      children: [
        {
          url: '/merchant/inject',
          title: '商家入驻审核列表页',
        },
        {
          url: '/merchant/shop',
          title: '商家店铺管理',
        },
        {
          url: '/merchant/shop-detail',
          title: '店铺基本信息',
        },
        {
          url: '/merchant/shop-join',
          title: '商家入驻信息',
        },
      ],
    },
    {
      url: '/vip',
      title: '会员管理',
      children: [
        {
          url: '/vip/list',
          title: '列表',
        },
        {
          url: '/vip/check-list',
          title: '审核列表',
        },
        {
          url: '/vip/rules-manage',
          title: '规则管理',
        },
        {
          url: '/vip/rules-list',
          title: '会员规则',
        },
        {
          url: '/vip/agent',
          title: '添加代理',
        },
      ],
    },
    {
      url: '/activity',
      title: '活动管理',
      children: [
        {
          url: '/activity/index',
          title: '首页活动',
        },
        {
          url: '/activity/ads-list',
          title: '广告管理',
        },
        {
          url: '/activity/ads-sorts-list',
          title: '广告分类',
        },
        {
          url: '/activity/ads-sorts-detail',
          title: '详情',
        },
        {
          url: '/activity/new-list',
          title: '今日上新',
        },
        {
          url: '/activity/famous-list',
          title: '大牌榜单',
        },
        {
          url: '/activity/good-list',
          title: '发现好物',
        },
        {
          url: '/activity/preferential-list',
          title: '优惠活动',
        },
        {
          url: '/activity/preferential-add',
          title: '新增优惠券',
        },
        {
          url: '/activity/audit-list',
          title: '审核列表',
        },
      ],
    },
    {
      url: '/thirdpartnar',
      title: '代运营管理',
      children: [
        {
          url: '/thirdpartnar/index',
          title: '奶爸代运营列表',
        },
        {
          url: '/thirdpartnar/detail',
          title: '奶爸代运营详情',
        },
        {
          url: '/thirdpartnar/shops',
          title: '店铺诊断',
        },
        {
          url: '/thirdpartnar/market',
          title: '营销策划',
        },
        {
          url: '/thirdpartnar/finish',
          title: '店铺装修',
        },
        {
          url: '/thirdpartnar/maintain',
          title: '数据维护',
        },
        {
          url: '/thirdpartnar/promotion',
          title: '推广计划表',
        },
        {
          url: '/thirdpartnar/setting',
          title: '代运营设置',
        },
        {
          url: '/thirdpartnar/service',
          title: '运营客服列表',
        },
        {
          url: '/thirdpartnar/service-detail',
          title: '运营客服详情',
        },
      ],
    },
    {
      url: '/operate',
      title: '运营小知识',
      children: [
        {
          url: '/operate/evaluate-list',
          title: '评价模板',
        },
        {
          url: '/operate/poster-list',
          title: '海报专场',
        },
        {
          url: '/operate/images-list',
          title: '图片精选',
        },
        {
          url: '/operate/take-out',
          title: '外卖学院',
        },
      ],
    },
    {
      url: '/money',
      title: '资金管理',
      children: [
        {
          url: '/money/data',
          title: '平台成交额',
        },
        {
          url: '/money/record',
          title: '账房',
        },
        {
          url: '/money/check',
          title: '提现审核',
        },
      ],
    },
    {
      url: '/complaints',
      title: '投诉管理',
      children: [
        {
          url: '/complaints/list',
          title: '投诉列表',
        },
      ],
    },
  ],
  商户: [
    {
      url: '/shop',
      title: '店铺管理',
      children: [
        {
          url: '/shop/baseinfo',
          title: '信息修改',
        },
        {
          url: '/shop/auth',
          title: '店铺认证',
        },
        {
          url: '/shop/service',
          title: '客服',
        },
      ],
    },
    {
      url: '/product',
      title: '商品管理',
      children: [
        {
          url: '/product/list',
          title: '商品列表（虚拟）',
        },
        {
          url: '/product/list-entity',
          title: '商品列表（实体）',
        },
        {
          url: '/product/add',
          title: '发布宝贝',
        },
      ],
    },
    {
      url: '/market',
      title: '营销管理',
      children: [
        {
          url: '/market/mine',
          title: '我的优惠券',
        },
        {
          url: '/market/index',
          title: '优惠券列表',
        },
        {
          url: '/market/analysis',
          title: '分析概况',
        },
        {
          url: '/market/add',
          title: '新增优惠券-虚拟满减/实体折扣',
        },
        {
          url: '/market/add-discount',
          title: '新增优惠券-实体满减',
        },
      ],
    },
    {
      url: '/member',
      title: '会员管理',
      children: [
        { url: '/member/member', title: '会员管理' },
        {
          url: '/member/member-detail',
          title: '收益明细',
        },
        { url: '/member/agent', title: '代理' },
        {
          url: '/member/agent-detail',
          title: '代理明细',
        },
      ],
    },
    {
      url: '/management',
      title: '经营管理',
      children: [
        {
          url: '/management/data',
          title: '实时数据',
        },
        {
          url: '/management/account',
          title: '账房',
        },
        {
          url: '/management/recode',
          title: '提现记录',
        },
      ],
    },
    {
      url: '/order',
      title: '订单管理',
      children: [
        {
          url: '/order/index',
          title: '全部订单',
        },
        {
          url: '/order/index-virtual',
          title: '全部订单',
        },
        {
          url: '/order/return',
          title: '退货管理',
        },
        {
          url: '/order/comment',
          title: '评价管理',
        },
        {
          url: '/order/comment-user',
          title: '评价管理',
        },
        {
          url: '/order/comment-detail',
          title: '评价详情',
        },
        {
          url: '/order/pay-detail',
          title: '待付款订单详情',
        },
        {
          url: '/order/send-detail',
          title: '待发货订单详情',
        },
        {
          url: '/order/receive-detail',
          title: '收货与物流信息',
        },
        {
          url: '/order/return-detail',
          title: '退货详情',
        },
        {
          url: '/order/invalid-detail',
          title: '取消/虚拟待付款/待评价详情',
        },
        {
          url: '/order/finish-detail',
          title: '已完成详情',
        },
        {
          url: '/order/address',
          title: '修改地址',
        },
      ],
    },
    {
      url: '/advertisement',
      title: '广告管理',
      children: [
        {
          url: '/advertisement/list',
          title: '广告推广',
        },
        {
          url: '/advertisement/buy',
          title: 'banner购买',
        },
        {
          url: '/advertisement/buy',
          title: '今日上新购买',
        },
        {
          url: '/advertisement/mine',
          title: '我的推广',
        },
        {
          url: '/advertisement/upload',
          title: '上传banner图',
        },
        {
          url: '/advertisement/add-goods',
          title: '添加商品id',
        },
        {
          url: '/advertisement/today-detail',
          title: '今日上新详情',
        },
      ],
    },
    {
      url: '/complaints',
      title: '投诉管理',
      children: [
        {
          url: '/complaints/list',
          title: '投诉列表',
        },
      ],
    },
  ],
};
