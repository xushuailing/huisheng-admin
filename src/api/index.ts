/* 公共的接口 */
const url = process.env.NODE_ENV === 'development' ? '/api' : 'https://restaurant.isoft.mobi';

export default {
  login: `${url}/admin/admin_login`,

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
  admin: {
    index: `${url}/admin/getAdminLists`,
    create: `${url}/admin/getAdminLists`,
    delete: `${url}/admin/getAdminLists`,
    show: `${url}/admin/getAdminLists`,
  },
};
