import Vue from 'vue';
import ElementUI from 'element-ui';
import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api';
import axios from './axios';
import utils from './utils';
import '@/styles/index.scss';

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$utils = utils;
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
