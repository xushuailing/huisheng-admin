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

const columns: ScTable.SetColumns = [
  ['头像', 'avatar', 100, null, 'img'],
  ['昵称', 'nickname'],
  ['电话', 'phone'],
  ['工作时间', 'idCard'],
  ['创建时间', 'pnum'],
];

@Component
export default class ShopService extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  tableConfig = {
    api: this.$api.merchant.product,
    breadcrumbButtons: ['add'],
  };
}
</script>
