/* 公共的接口 */
const url =
  process.env.NODE_ENV === 'development' ?
    '/api' :
    'https://restaurant.isoft.mobi';

export default {
  login: `${url}/admin/admin_login`,
};
