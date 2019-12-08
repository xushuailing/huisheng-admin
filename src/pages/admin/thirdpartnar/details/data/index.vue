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

// TODO: 93、数据上传-列表，修改，发送感谢信。诊断方案，状态数据
@Component
export default class TpDetailData extends Vue {
  columns: ScTable.Columns = [
    { label: '运营名称', prop: 'none1' },
    { label: '诊断方案', prop: 'none2' },
    { label: '限时时间', prop: 'none3' },
    { label: '确认时间', prop: 'none4' },
    {
      label: '状态',
      prop: 'none5',
      formater: (row, col) => {
        const value = row[col.prop];
        const style: obj = {
          待客户确认: 'sc-font-danger',
          等待诊断: 'sc-font-info',
        };
        return [{ class: style[value] || 'sc-font-primary' }, value];
      },
    },
  ];

  columnsHandler = ['detail', 'edit', { name: 'upload', title: '上传数据' }];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.test,
    breadcrumbButtons: [],
  };

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'detail') {
      this.$router.push({ path: '/thirdpartnar/shops', query: { id: row.id } });
    } else if (type === 'upload') {
      this.$router.push({ name: '/thirdpartnar/market', query: { id: row.id } });
    }
  }
}
</script>
