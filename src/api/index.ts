/* 公共的接口 */
const url = process.env.NODE_ENV === 'development' ? '/api' : 'https://restaurant.isoft.mobi';

export default {
  test: {
    index: `${url}/index`,
    create: `${url}/create`,
    update: `${url}/update`,
    delete: `${url}/delete`,
    export: `${url}/export`,
    show: `${url}/show`,
  },
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
        /** 店铺的商品列表 */
        goods: {
          index: `${url}/admin/getUserGoodsList`,
        },
        /** 店铺类型 */
        types: `${url}/admin/getType`,
        show: `${url}/admin/getUserShop`,
        /** 设置商家加入保证金参数信息 */
        shopJoinShow: `${url}/admin/getShopjoin`,
        /** 设置商家加入保证金参数信息 */
        shopJoinUpdate: `${url}/admin/setShopjoin`,
        /** 下架 */
        prohibit: `${url}/admin/setUserShopProhibit`,

        /** 修改销量 */
        shopNum: `${url}/admin/setUserShopXnum`,
      },
      /** 商家入驻审核列表 */
      inject: {
        index: `${url}/admin/getShopToexamineList`,
        check: `${url}/admin/checkUserShop`,
        /** 商家审核驳回 */
        reject: `${url}/admin/setUserShopReject`,
      },
    },

    /** 会员管理 */
    vip: {
      /** 会员列表 */
      level: {
        index: `${url}/admin/levelList`,
        delete: `${url}/admin/memberDel`,
        create: `${url}/admin/agentInsert`,
      },
      /** 会员规则 */
      rules: {
        textShow: `${url}/admin/RuleText`,
        textUpdate: `${url}/admin/RuleTextUpdate`,
        update: `${url}/admin/SetUpUpdate`,
        index: `${url}/admin/SetUpList`,
      },
      /** 会员审核列表 */
      check: {
        index: `${url}/admin/agentDate`,
        update: `${url}/admin/agentDateUpdate`,
        agentList: `${url}/admin/agentList`,
      },
    },

    /** 活动管理 */
    activity: {
      index: {
        index: `${url}/admin/getHomeActivity`,
        /** 上传/修改首页活动图片 */
        setActivity: `${url}/admin/setHomeActivity`,
      },
      /** 发现好货活动/今日上新 */
      goods: {
        index: `${url}/admin/getFindGoods`,
        delete: `${url}/admin/delFindGoods`,
        create: `${url}/admin/setBindingGoods`,
      },

      /** 大牌榜单 */
      famous: {
        index: `${url}/admin/getFindGoods`,
        delete: `${url}/admin/delFindGoods`,
        create: `${url}/admin/setBrandShop`,
        show: `${url}/admin/setFindShop`,
      },
      /** 广告管理 */
      ads: {
        index: `${url}/admin/getBannerList`,
        create: `${url}/admin/setBanner`,
      },

      /** 审核 */
      audit: {
        index: `${url}/admin/getUserBannerList`,
        pass: `${url}/admin/passUserBanner`,
        reject: `${url}/admin/rejectUserBanner`,
      },
      /** 广告分类 */
      adsSorts: {
        index: `${url}/admin/getBanner`,
        create: `${url}/admin/doAddBanner`,
        show: `${url}/admin/getBannerDetail`,
      },
      /** 自营产品管理 > 优惠活动 */
      coupon: {
        index: `${url}/admin/getCouponList`,
        create: `${url}/admin/doAddCoupon`,
        delete: `${url}/admin/delCoupon`,
      },
    },

    /** 代运营管理 */
    thirdpartnar: {
      show: `${url}/admin/operation_package_find`,
      /** 奶爸代运营列表 */
      index: {
        index: `${url}/admin/operation_package`,
      },
      /** 代运营设置 */
      setting: {
        index: `${url}/admin/crm_operational_setup_find`,
        update: `${url}/admin/crm_operational_setup_update`,
      },

      /** 成本信息 */
      cost: {
        index: `${url}/admin/CostList`,
        delete: `${url}/admin/Costdel`,
        update: `${url}/admin/CostOneUpdate`,
      },
      /** 店铺诊断 */
      shops: {
        show: `${url}/admin/shopDiagnosis_find`,
        update: `${url}/admin/shopDiagnosis_update`,
      },
      /** 店铺装修 */
      finish: {
        show: `${url}/admin/shopDecoration_find`,
        update: `${url}/admin/shopDecoration_update`,
      },
      /** 数据维护 */
      maintain: {
        show: `${url}/admin/dataMaintenance_find`,
        update: `${url}/admin/dataMaintenance_update`,
      },

      /** 营销策划 */
      market: {
        show: `${url}/admin/marketingPlanning_find`,
        update: `${url}/admin/marketingPlanning_update`,
      },

      /** 客服 */
      service: {
        index: `${url}/admin/CustomerList`,
        /** 去运营列表 */
        shopIndex: `${url}/admin/stayOperateList`,

        update: `${url}/admin/stayOperateUpdate`,
      },

      /** 客服列表查看 */
      serviceLook: {
        index: `${url}/admin/CustomerOperateList`,
      },
    },

    /** 运营小知识 */
    operate: {
      /** 好差评模板列表 */
      template: {
        index: `${url}/admin/crm_template_content`,
        create: `${url}/admin/crm_template_content_add`,
        delete: `${url}/admin/crm_template_content_del`,
      },
      /** 好差评模板分类列表 */
      class: {
        index: `${url}/admin/crm_template_class`,
      },
      /** 图片精选，海报专场 */
      image: {
        index: `${url}/admin/crm_img_list`,
        create: `${url}/admin/crm_img_list_add`,
        delete: `${url}/admin/crm_img_list_del`,
      },
      imageClass: {
        index: `${url}/admin/crm_img_calss`,
      },
      /** 外卖学院 */
      takeOut: {
        index: `${url}/admin/crm_takeaway_college`,
        show: `${url}/admin/crm_img_list_find`,
        delete: `${url}/admin/crm_takeaway_college_del`,
        create: `${url}/admin/crm_takeaway_college_add`,
        update: `${url}/admin/crm_takeaway_college_updete`,
      },
    },

    /** 资金管理 */
    management: {
      /** 平台成交额 */
      show: `${url}/admin/NowTimeDataList`,
      /** 账房 */
      record: {
        index: `${url}/admin/AccountingOfficeShowData`,
      },
    },
  },

  /** 商家的接口 */
  merchant: {
    /** 商家店铺管理 */
    shop: {
      index: `${url}/admin/getUserShopList`,
      show: `${url}/admin/getUserShop`,
      update: `${url}/admin/setUserShop`,
      /** 客服 */
      service: {
        index: `${url}/admin/CustomerServiceList`,
        create: `${url}/admin/addCustomerService`,
        delete: `${url}/admin/deleteCustomerService`,
      },
    },

    /** 会员管理 */
    member: {
      index: `${url}/admin/Member_tail_List`,
      member: {
        statistics: `${url}/admin/MemberHead`,
        list: {
          index: `${url}/admin/membershipDetailsList`,
        },
      },
      agent: {
        statistics: `${url}/admin/agentHead`,
        list: {
          index: `${url}/admin/agentDetailsList`,
        },
      },
    },

    /**  经营管理 */
    manage: {
      index: `${url}/admin/DiscountRecord`,
      statistics: `${url}/admin/NowTimeData`,
      account: {
        index: `${url}/admin/AccountingOfficeShow`,
        export: `${url}/admin/AccountingOfficeShowExeclExport`,
      },
    },

    /** 商品管理 */
    product: {
      index: `${url}/admin/getGoodsList`,
      show: `${url}/admin/getGoodsdetail`,
      create: `${url}/admin/doAddGoods`,
      update: `${url}/admin/doAddGoods`,
      delete: `${url}/admin/delGoods`,
      types: `${url}/admin/getType`,
      shelves: `${url}/admin/saveGoodsStatus`,
      goodsType: `${url}/admin/getGoodsType`,
    },

    /** 营销管理 */
    market: {
      index: {
        entity: `${url}/admin/getMarketing`,
        virtual: `${url}/admin/getMarketingXu`,
      },
      show: {
        discount: `${url}/admin/getDiscount`,
        discountGoods: `${url}/admin/getDiscountgoods`,
        coupon: {
          entity: `${url}/admin/getCoupon`,
          virtual: `${url}/admin/getCouponXu`,
        },
      },
      update: {
        discount: `${url}/admin/doDiscount`,
        coupon: {
          entity: `${url}/admin/doCoupon`,
          virtual: `${url}/admin/doCouponXu`,
        },
      },
      mine: {
        entity: `${url}/admin/getYouhuiquna`,
      },
      analysis: `${url}/admin/getAnalysis`,
      addGoods: `${url}/admin/addGoodsCoupon`,
      discountGoods: `${url}/admin/getDiscountgoods`,
      delete: `${url}/admin/delYouhuiquna`,
    },

    /** 订单管理 */
    order: {
      index: `${url}/admin/getOrderList`,
      show: `${url}/admin/getOrderDetail`,
      close: `${url}/api/setCloseOrder`,
      confirm: `${url}/api/setConfirmOrderss`,
      delivery: `${url}/admin/setDeliverGoods`,
      expresses: `${url}/admin/getExpressList`,
      return: {
        index: `${url}/admin/refundOrderList`,
        show: `${url}/admin/refundOrderDetail`,
        return: `${url}/admin/confirmRefundOrder`,
        reject: `${url}/admin/rejectRefundOrder`,
      },
      logistics: `${url}/admin/getLogistics`,
      pay: `${url}/admin/setConfirmPayment`,
      comment: {
        index: `${url}/admin/getCommentList`,
        show: `${url}/admin/getCommenDatail`,
        reply: `${url}/admin/getDoCommenDatail`,
      },
      commentUser: {
        index: `${url}/admin/getCommenReply`,
      },
      address: {
        province: `${url}/admin/getProvinces`,
        city: `${url}/admin/getCities`,
        area: `${url}api/getAreas`,
        update: `${url}/admin/setUserAddress`,
      },
    },

    /** 广告管理 */
    ads: {
      index: `${url}/admin/AdvertisingPromotion`,
      user: `${url}/admin/userPromotion`,
      create: `${url}/admin/userAddBanner`,
      detail: `${url}/admin/getPromotionDetail`,
      buyPromotion: `${url}/admin/buyPromotion`,
      buyActivity: `${url}/admin/buyActivity`,
      bannerDetail: `${url}/admin/getUserBannerLook`,
      addGoods: `${url}/admin/userBindingGoods`,
    },
  },

  common: {
    /** 投诉管理 */
    complaints: {
      index: `${url}/admin/getComplaintList`,
      reply: `${url}/admin/complaint_reply`,
    },
  },
};
