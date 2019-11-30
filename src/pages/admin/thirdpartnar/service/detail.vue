<template>
  <sc-min-table stripe
                ref="table"
                :columns-handler="columnsHandler"
                :columns-props="{align:'center'}"
                :columns="columns"
                :table-config="tableConfig"
                @table-emitTableHandlerClick="onTableHandlerClick">
  </sc-min-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class TpServiceDetail extends Vue {
  columns: ScTable.Columns = [
    { label: '店铺名称', prop: 'none1' },
    { label: '代运营类型', prop: 'none2' },
    {
      label: '开始时间',
      prop: 'none4',
      formater: (row, col) => this.$utils._FormatDate(row[col.prop]),
    },
    {
      label: '结束时间',
      prop: 'none5',
      formater: (row, col) => this.$utils._FormatDate(row[col.prop]),
    },
    {
      label: '状态',
      prop: 'none6',
      formater: (row, col) => {
        const value = row[col.prop];
        return [{ class: value === '运营中' ? 'sc-font-danger' : 'sc-font-primary' }, value];
      },
    },
  ];

  columnsHandler = ['detail'];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.platform,
    breadcrumbButtons: [],
  };

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'detail') {
      console.log('%c查看', 'color:#fff;background:#40b883;border-radius:5px;padding:2px 5px;');
    }
  }
}
</script>
<style lang='scss' scoped>
  .TpServiceDetail {
  }
</style>
