<template>
  <sc-min-table stripe
                ref="table"
                :columns-handler="columnsHandler"
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
    { label: '店铺名称', prop: 'shop_name' },
    { label: '代运营类型', prop: 'package_name' },
    {
      label: '开始时间',
      prop: 'start_time',
    },
    {
      label: '结束时间',
      prop: 'end_time',
    },
    {
      label: '状态',
      prop: 'status',
      // formater: (row, col) => {
      //   const value = row[col.prop];
      //   return [{ class: value === '运营中' ? 'sc-font-danger' : 'sc-font-primary' }, value];
      // },
    },
  ];

  columnsHandler = ['look'];

  get tableConfig(): ScTable.TableConfig {
    return {
      api: this.$api.admin.thirdpartnar.serviceLook,
      index: { id: this.$route.query.id },
    };
  }

  // created() {
  //   this.tableConfig.index!.id = this.$route.query.id;
  // }

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'look') {
      this.$router.push('/thirdpartnar/shops');
    }
  }
}
</script>
