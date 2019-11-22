<template>
  <div class='test-min'>
    <sc-breadcrumb class="mb-10">
      <el-button type="primary">添加</el-button>
    </sc-breadcrumb>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :table-config="tableConfig"
                  @pagination-onSlotClick="onSlotClick"
                  @emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '../../lib/@types/sc-table.d';

const columns: ScTable.SetColumns = [
  ['头像', 'avatar', null, null, 'img'],
  ['昵称', 'nickname', 200],
  ['电话', 'phone', 150],
  ['工作时间', 'idCard', 220],
  ['创建时间', 'pnum', 150],
];

@Component
export default class MerchantInject extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler: ScTable.ColumnsHandler = ['del'];


  tableConfig = {
    api: this.$api.merchant.inject,
    // isSearch: false,

    // disabledRequest: true,
    table: {
      // storageKey: 'myTable',
    },
    isSetting: true,
    isExports: true,
  };

  onTableHandlerClick() {}

  onSlotClick() {
    console.log('1', 1);
  }
}
</script>
