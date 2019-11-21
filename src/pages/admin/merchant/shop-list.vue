<template>
  <div>
    <sc-min-table stripe
                  ref="table"
                  :columns-type="['selection']"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :search-config="searchConfig"
                  :table-config="tableConfig"
                  :paginationConfig="paginationConfig"
                  @pagination-onSlotClick="onSlotClick"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';

const columns: ScTable.SetColumns = [
  ['门店名称', 'company'],
  ['公司名称', 'none2'],
  ['门店分类', 'keyword'],
  ['联系人', 'username', 100],
  ['公司电话', 'com_phone', 100],
  ['门店地址', 'address', 220],
  ['申请时间', 'createtime', 220],
  ['状态', 'none8', 80],
];

@Component
export default class MerchantShop extends Vue {
  $refs!: {
    table: ScTable;
  };

  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = ['look', 'del'];

  paginationConfig = {
    slotAttr: {
      isCheckbox: true,
      text: '通过',
    },
  };

  tableConfig = {
    api: this.$api.merchant.shop,
  };

  searchConfig = {
    num: 4,
    param: {},
    attr: { 'label-width': '120px' },
    data: [
      {
        label: '商家店铺名称：',
        prop: 'company',
        tag: {
          attr: {
            placeholder: '请输入商家店铺名称',
          },
        },
      },

      {
        label: '店铺类型：',
        prop: 'status',
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
            placeholder: '请选择店铺类型',
          },
        },
      },
      {
        label: '审核状态：',
        prop: 'typeid',
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
            placeholder: '请选择审核状态',
          },
        },
      },
      {
        label: '创建时间：',
        prop: 'createtime',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'daterange',
            'range-separator': '至',
            'start-placeholder': '开始日期',
            'end-placeholder': '结束日期',
          },
        },
      },
    ],
  };

  onTableHandlerClick() {}

  onSlotClick() {
    console.log('this.$refs.table', this.$refs.table.selectTableData);
  }
}
</script>
