import Vue from 'vue';
import ElementUI from 'element-ui';
import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import VCharts from 'v-charts';
import _ from 'lodash';
import App from './App.vue';
import router from './router';
import store from './store';
import UI from './lib/index';
import api from './api';
import axios from './axios';
import utils from './utils';
import '@/styles/index.scss';

Vue.use(UI);
Vue.use(ElementUI);
Vue.use(VCharts as any);

Vue.config.productionTip = false;
Vue.prototype.$utils = utils;
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
Vue.prototype._ = _;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
