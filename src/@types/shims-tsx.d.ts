import Echarts from 'echarts';
import Vue, { VNode, VueConstructor } from 'vue';
import VueRouter from 'vue-router';
import { StoreOptions, Store } from 'vuex';


declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
  interface Window<T = any> {
    Vue: VueConstructor;
    AMap: T;
    store: Store<any>;
    router: VueRouter;
    echarts: typeof Echarts;
  }
}
