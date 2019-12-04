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
import { ScTable } from '@/lib/@types/sc-table.d';

@Component
export default class ManagementRecode extends Vue {
  userInfo = this.$utils._Storage.get('user_info');

  columns: ScTable.Columns = [
    {
      label: '提现金额',
      prop: 'money',
      formater: (row, col) => {
        const isNegative = row[col.prop].includes('-');
        const style = isNegative ? 'font-danger' : 'font-primary';
        const value = row[col.prop].replace('-', '');
        const operate = isNegative ? '-' : '+';
        return [{ class: style }, `${operate}￥${value}`];
      },
    },
    { label: '创建时期', prop: 'time' },
  ];

  tableConfig = {
    api: this.$api.merchant.manage.record,
    index: { shopid: this.userInfo.shopid },
  };

  searchConfig: ScTable.Search = {
    data: [
      {
        label: '创建时间',
        prop: 'time',
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
