import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'normalize.css/normalize.css';

Vue.use(Router);

const merchantRouter = Vue.extend({ render: (h) => h('router-view') });
const AdminRouter = Vue.extend({ render: (h) => h('router-view') });

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "index" */ './layout/index.vue'),
      children: [
        {
          path: '/',
          component: () => import(/* webpackChunkName: "main" */ './layout/main.vue'),
          children: [
            {
              path: '/',
              name: '首页',
              component: () => import(/* webpackChunkName: "home" */ './pages/home/home.vue'),
            },
            {
              path: '/merchant',
              name: '商家管理',
              redirect: '/merchant/inject',
              component: merchantRouter,
              children: [
                {
                  path: 'inject',
                  name: '商家入驻审核列表页',
                  component: () => import('./pages/merchant/inject-list.vue'),
                },
                {
                  path: 'shop',
                  name: '商家店铺管理',
                  component: () => import('./pages/merchant/shop-list.vue'),
                },
              ],
            },
            {
              path: '/admin',
              name: '系统管理',
              component: AdminRouter,
              redirect: '/admin/setting',
              children: [
                {
                  path: 'setting',
                  name: '平台管理',
                  component: () => import(/* webpackChunkName: "setting" */ './pages/admin/setting/index.vue'),
                },
                {
                  path: 'rootname',
                  name: '总账号管理',
                  component: () => import(/* webpackChunkName: "setting" */ './pages/admin/setting/root-name.vue'),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      component: () => import('./pages/login/login.vue'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
