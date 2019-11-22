<template>
  <div class='test-min'>
    <sc-min-table stripe
                  ref="table"
                  :columns="columns"
                  :search-config="searchConfig"
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
  ['提现金额', 'nickname'],
  ['创建时期', 'name'],
];

@Component
export default class ManagementRecode extends Vue {
  columns = this.$utils._SetTableColumns(columns);

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


  searchConfig = {
    num: 1,
    param: {},
    attr: { 'label-width': '120px' },
    data: [
      {
        label: '创建时间',
        prop: 'none2',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetime',
            placeholder: '时间',
          },
        },
      },
    ],
  };


  onTableHandlerClick() {}

  onSlotClick() {
    console.log('1', 1);
  }
}
</script>
