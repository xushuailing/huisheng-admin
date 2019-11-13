/* 公共的接口 */
const url = process.env.NODE_ENV === 'development' ? '/api' : 'https://restaurant.isoft.mobi';

export default {
  login: `${url}/admin/admin_login`,
  files: {
    upload: `${url}/api/insert_img`,
  },

  merchant: {
    inject: {
      index: `${url}/service-uaa/sys/user/index`,
      create: `${url}/service-uaa/sys/user/create`,
      update: `${url}/service-uaa/sys/user/update`,
      delete: `${url}/service-uaa/sys/user/delete`,
      export: `${url}/service-uaa/sys/user/export`,
      show: `${url}/service-uaa/sys/user/show`,
    },
  },

  /** 系统管理 平台管理员 */
  platform: {
    index: `${url}/admin/getAdminLists`,
    create: `${url}/admin/setAdmin`,
    delete: `${url}/admin/getAdminLists`,
    show: `${url}/admin/getAdminLists`,
  },

  /** 系统管理 角色 */
  role: {
    index: `${url}/admin/getUserRoleList`,
    create: `${url}/admin/setUserRole`,
  },
};
