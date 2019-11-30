<template>
  <div class='recode'>
    <sc-min-table stripe
                  ref="table"
                  :columns="columns"
                  :search-config="searchConfig"
                  :table-config="tableConfig">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '../../lib/@types/sc-table.d';

@Component
export default class ManagementRecode extends Vue {
  columns: ScTable.Columns = [
    {
      label: '提现金额',
      prop: 'price',
      formater: (row, col) => {
        const text = row[col.prop];
        const style = Number(text) > 0 ? '' : 'font-danger';
        return [{ class: style }, text];
      },
    },
    { label: '创建时期', prop: 'createtime' },
  ];

  tableConfig = {
    api: this.$api.merchant.product,
  };

  searchConfig = {
    param: {},
    data: [
      {
        label: '创建时间',
        prop: 'createtime',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'date',
            placeholder: '请选择时间',
          },
        },
      },
    ],
  };
}
</script>
