<template>
  <sc-min-table stripe
                ref="table"
                :columns-type="['selection']"
                :columns-handler="columnsHandler"
                :columns="columns"
                :columns-props="{align:'center'}"
                :table-config="tableConfig"
                :search-config="searchConfig"
                @table-emitTableHandlerClick="onTableHandlerClick">
  </sc-min-table>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '../../lib/@types/sc-table.d';
import { ScForm } from '../../lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class ActvAdsList extends Vue {
  columns: ScTable.Columns = [
    { label: '店铺信息', prop: 'none1' },
    { label: '推广类型', prop: 'none2' },
    { label: '价格', prop: 'none' },
    { label: '有效期', prop: 'none3' },
    {
      label: '申请时间',
      prop: 'none4',
      formater: (row, col) => this.$utils._FormatDate(row[col.prop]),
    },
    {
      label: '状态',
      prop: 'none5',
      formater: (row, col) => {
        const value = row[col.prop];
        const style = value === '待审核' ? 'sc-font-danger' : 'sc-font-primary';
        return [{ class: style }, value];
      },
    },
  ];

  columnsHandler: ScTable.ColumnsHandler = [
    { name: 'pass', title: '通过' },
    { name: 'reject', title: '驳回', type: 'danger' },
  ];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.merchant.inject,
  };

  searchConfig: ScTable.Search = {
    attr: { 'label-width': '110px' },
    data: [
      {
        label: '商家店铺名称：',
        prop: 'none1',
        tag: {
          attr: { placeholder: '请输入商家店铺名称' },
        },
      },
      {
        label: '推广类型：',
        prop: 'none2',
        tag: {
          tagType: 'select',
          options: [],
          attr: { placeholder: '请选择推广类型' },
        },
      },
      {
        label: '申请时间：',
        prop: 'none4',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetime',
            placeholder: '请选择申请时间',
          },
        },
      },
    ],
  };

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'pass') {
      console.log('%c通过', 'color:#40b883;font-weight:bold');
    } else {
      console.log('%c驳回', 'color:#40b883;font-weight:bold');
    }
  }
}
</script>
