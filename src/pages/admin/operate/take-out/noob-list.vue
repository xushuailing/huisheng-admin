<template>
  <sc-min-table stripe
                :columns-handler="columnsHandler"
                :columns="columns"
                :table-config="tableConfig">
  </sc-min-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';

const columns: ScTable.SetColumns = [['问题', 'none1'], ['回答', 'none2'], ['创建时间', 'none3']];

@Component
export default class OperateNoob extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = ['del'];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.activity.coupon,
  };
}
</script>
