import Vue from 'vue';
import utils from '@/utils';
import axios from '@/axios';
import api from '@/api';

type api = typeof api;
type axios = typeof axios;
type utils = typeof utils;

declare module 'vue/types/vue' {
  interface Vue {
    _uid: number;
    $api: api;
    $http: axios;
    $utils: utils;
  }
}
