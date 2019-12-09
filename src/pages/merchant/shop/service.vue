<template>
  <div class='shop-service'>
    <!-- TODO: 缺少添加原型 -->
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="['del']"
                  :columns="columns"
                  :table-config="tableConfig">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { _Shopid } from '../config';

const columns: ScTable.SetColumns = [
  ['头像', 'default_img', 100, null, 'img'],
  ['昵称', 'name'],
  ['电话', 'phone'],
  ['工作时间', 'work_time'],
  ['创建时间', 'createtime'],
];

@Component
export default class ShopService extends Vue {
  userInfo = this.$utils._Storage.get('user_info');

  columns = this.$utils._SetTableColumns(columns);

  tableConfig = {
    api: this.$api.merchant.shop.service,
    index: { shopid: _Shopid },
    breadcrumbButtons: ['add'],
  };
}
</script>
