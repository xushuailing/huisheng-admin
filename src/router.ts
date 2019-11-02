import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'normalize.css/normalize.css';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import(/* webpackChunkName: "layout" */ './layout/index.vue'),
      children: [
        {
          path: '/',
          component: () => import(/* webpackChunkName: "layout" */ './layout/main.vue'),
          children: [
            {
              path: '/home',
              name: '首页',
              component: () => import(/* webpackChunkName: "layout" */ './pages/home/home.vue'),
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
