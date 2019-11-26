/* 公共的接口 */
const url = process.env.NODE_ENV === 'development' ? '/api' : 'https://restaurant.isoft.mobi';

export default {
  // test: {
  //   index: `${url}/service-uaa/sys/user/index`,
  //   create: `${url}/service-uaa/sys/user/create`,
  //   update: `${url}/service-uaa/sys/user/update`,
  //   delete: `${url}/service-uaa/sys/user/delete`,
  //   export: `${url}/service-uaa/sys/user/export`,
  //   show: `${url}/service-uaa/sys/user/show`,
  // },
  login: `${url}/admin/admin_login`,
  files: {
    upload: `${url}/api/insert_img`,
  },

  /** 管理的接口 */
  admin: {
    /** 系统管理 */
    setting: {
      /** 平台设置 */
      platform: {
        systemShow: `${url}/admin/getSystemList`,
        systemUpdate: `${url}/admin/setSystem`,
        index: `${url}/admin/getAdminLists`,
        create: `${url}/admin/setAdmin`,
        update: `${url}/admin/setAdmin`,
        delete: `${url}/admin/delAdmin`,
        show: `${url}/admin/lookAdmin`,
      },

      /** 系统管理 角色 */
      role: {
        index: `${url}/admin/getUserRoleList`,
        create: `${url}/admin/setUserRole`,
        update: `${url}/admin/setUserRole`,
        delete: `${url}/admin/delUserRole`,
        show: `${url}/admin/lookUserRole`,
      },

      rootName: {
        show: `${url}/admin/getAdminDetail`,
        update: `${url}/admin/getAdminDetail`,
      },
    },

    /** 商家管理 */
    merchant: {
      /** 商家店铺管理 */
      shop: {
        index: `${url}/admin/getUserShopList`,
      },
      /** 商家入驻审核列表 */
      inject: {
        index: `${url}/admin/getUserShopList`,
        create: `${url}/admin/getUserShopList`,
        update: `${url}/admin/getUserShopList`,
        delete: `${url}/admin/getUserShopList`,
        show: `${url}/admin/getUserShopList`,
        check: `${url}/admin/checkUserShop`,
      },
    },

    /** 投诉管理 */
    complaints: {
      index: `${url}/admin/getComplaintList`,
    },
  },

  /** 商家管理 */
  merchant: {
    /** 商家店铺管理 */
    shop: {
      index: `${url}/admin/getUserShopList`,
      show: `${url}/admin/getUserShop`,
      update: `${url}/admin/userJoinShop`,
    },

    /** 产品管理 */
    product: {
      index: `${url}/admin/getGoodsList`,
      show: `${url}/admin/getGoodsdetail`,
      create: `${url}/admin/doAddGoods`,
      update: `${url}/admin/doAddGoods`,
      delete: `${url}/admin/delGoods`,
    },

    /** 营销管理 */
    market: {
      index: `${url}/admin/getCouponList`,
      show: `${url}/admin/getGoodsdetail`,
      update: `${url}/admin/doAddCoupon`,
      delete: `${url}/admin/delCoupon`,
    },
    inject: {
      index: `${url}/service-uaa/sys/user/index`,
      create: `${url}/service-uaa/sys/user/create`,
      update: `${url}/service-uaa/sys/user/update`,
      delete: `${url}/service-uaa/sys/user/delete`,
      export: `${url}/service-uaa/sys/user/export`,
      show: `${url}/service-uaa/sys/user/show`,
    },
  },

  /** 活动管理 */
  activity: {
    index: {
      index: `${url}/admin/shopJoinActivityList`,
    },
    adsSorts: {
      index: `${url}/admin/getBanner`,
      create: `${url}/admin/doaAddBanner`,
      show: `${url}`,
    },
    coupon: {
      index: `${url}/admin/getCouponList`,
      create: `${url}/admin/doAddCoupon`,
      delete: `${url}/admin/delCoupon`,
    },
  },
};
