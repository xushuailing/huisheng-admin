import { GetterTree, MutationTree, ActionTree } from 'vuex';
import { obj } from '@/lib/@types/sc-param.d';
import $api from '../api';
import $http from '../axios';

export interface State {
  /** 商家类型分类 */
  shopTypes: ({ value: string; label: string } & obj)[];
}

const _state = {
  shopTypes: null,
};

const getters: GetterTree<State, any> = {
  /** 商家类型分类 */
  shopTypes: (state) => state.shopTypes,
};
const mutations: MutationTree<State> = {
  _setShopTypes(state, data) {
    state.shopTypes = data;
  },
};
const actions: ActionTree<State, any> = {
  /** get商家类型分类 */
  getShopTypes({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state && state.shopTypes && state.shopTypes.length) {
        resolve(state.shopTypes);
        return;
      }
      const api = $api.admin.merchant.shop.types;
      $http
        .get<State['shopTypes']>(api, { limit: 1e6 })
        .then(({ data }) => {
          if (!data) return;
          const types = data.map((v: any) => ({ label: v.title, value: v.id }));
          commit('_setShopTypes', types);
          resolve(types);
        });
    });
  },
};
export default {
  state: _state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
