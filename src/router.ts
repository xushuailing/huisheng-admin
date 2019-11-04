import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'normalize.css/normalize.css';

Vue.use(Router);

const merchantRouter = Vue.extend({ render: (h) => h('router-view') });

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
              name: '首页',
              redirect: '/merchant/list',
              component: merchantRouter,
              children: [
                {
                  path: 'list',
                  name: '首页',
                  component: () => import('./pages/merchant-admin/list.vue'),
                },
              ],
            },
            {
              path: '/goods',
              name: '商品',
              component: () => import(/* webpackChunkName: "layout" */ './pages/goods/goods.vue'),
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
