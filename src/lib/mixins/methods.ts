import { Component, Vue } from 'vue-property-decorator';
import { obj } from '../@types/sc-param.d';

export const tableMethods = (ref: string) => {
  //  TABLE_METHODS {table 事件}  http://element-cn.eleme.io/2.4/#/zh-CN/component/table#table-methods
  const TABLE_METHODS = [
    'clearSelection',
    'toggleRowSelection',
    'toggleRowExpansion',
    'setCurrentRow',
    'clearSort',
    'clearFilter',
    'doLayout',
    'sort',
  ];
  const tableMethod: obj = {};
  TABLE_METHODS.forEach((name) => {
    tableMethod[name] = function (...args: any) {
      const scTable = this.$refs[ref];
      if (scTable && scTable[name]) {
        scTable[name](...args);
      }
    };
  });
  return { methods: tableMethod };
};

@Component
export class tableMethodsMixin extends Vue {
  tableMethod(ref: string) {
    const { methods } = tableMethods(ref);
    Object.keys(methods).forEach((k) => {
      (this as obj)[k] = methods[k];
    });
  }
}

export const treeMethods = (ref: string) => {
  const TREE_METHODS = [
    'filter',
    'updateKeyChildren',
    'getCheckedNodes',
    'setCheckedNodes',
    'getCheckedKeys',
    'setCheckedKeys',
    'setChecked',
    'getHalfCheckedNodes',
    'getHalfCheckedKeys',
    'getCurrentKey',
    'getCurrentNode',
    'setCurrentKey',
    'setCurrentNode',
    'getNode',
    'remove',
    'append',
    'insertBefore',
    'insertAfter',
  ];
  const treeMethod: obj = {};
  TREE_METHODS.forEach((name) => {
    treeMethod[name] = function (...args: any) {
      const scTree = this.$refs[ref];
      if (scTree && scTree[name]) {
        scTree[name](...args);
      }
    };
  });
  return { methods: treeMethod };
};
