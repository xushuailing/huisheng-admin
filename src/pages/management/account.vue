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
  ['日期', 'nickname'],
  ['支出项目', 'name'],
  ['本月交易额', 'phone'],
  ['项目类别', 'idCard'],
];

@Component
export default class ManagementAccount extends Vue {
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
    num: 3,
    param: {},
    attr: { 'label-width': '120px' },
    data: [
      {
        label: '日期',
        prop: 'none2',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetime',
            placeholder: '开始时间',
          },
        },
      },
      {
        label: '至',
        prop: 'none2',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetime',
            placeholder: '结束时间',
          },
        },
      },
      {
        label: '项目类别',
        prop: 'none3',
        tag: {
          tagType: 'select',
          options: [
            {
              value: 2,
              label: '全部',
            },
            {
              value: 1,
              label: '启用',
            },
            {
              value: 0,
              label: '不启用',
            },
          ],
          attr: {
            placeholder: '项目类别',
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
