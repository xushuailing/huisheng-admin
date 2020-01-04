<template>
  <div class='recode'>
    <sc-min-table stripe
                  ref="table"
                  :columns="columns"
                  :columns-handler="columnsHandler"
                  :table-config="tableConfig">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';

// 头像，用户/店铺名称，提现金额，申请时间，操作：通过/驳回

const columns: ScTable.SetColumns = [
  ['头像', 'none1', 100, null, 'img'],
  ['用户', 'none2'],
  ['店铺名称', 'none3'],
  ['提现金额', 'none4'],
  ['申请时间', 'none5'],
];

@Component
export default class ManagementRecode extends Vue {
  columns: ScTable.Columns = this.$utils._SetTableColumns(columns);


  columnsHandler = [{ name: 'pass', title: '通过' }, { name: 'reject', title: '驳回' }];

  tableConfig = {
    api: this.$api.admin.management.record,
    // index: { shopid: _Shopid },
  };
}
</script>
