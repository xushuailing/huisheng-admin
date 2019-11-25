<template>
  <div class='test-min'>
    <sc-min-table stripe
                  ref="table"
                  :columns-type="['selection']"
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
  ['会员头像', 'avatar', null, null, 'img'],
  ['名称', 'nickname', 200],
  ['会员费用', 'idCard', 220],
  ['会员类型', 'name', 120],
  ['创建时间', 'phone', 150],
  ['获得返利', 'pnum', 150],
];

@Component
export default class AgentDetail extends Vue {
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
    num: 4,
    param: {},
    attr: { 'label-width': '120px' },
    data: [
      {
        label: '下线名称',
        prop: 'none1',
        default: '',
        tag: {
          attr: {
            placeholder: '请输入下线名称',
          },
        },
      },

      {
        label: '会员类型：',
        prop: 'none3',
        tag: {
          tagType: 'select',
          options: [
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
            placeholder: '请选择会员类型：',
          },
        },
      },
      {
        label: '选择时间：',
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
