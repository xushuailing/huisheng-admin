<template>
  <sc-min-table stripe
                ref="table"
                :columns-type="['index']"
                :columns-handler="columnsHandler"
                :columns="columns"
                :columns-props="{align:'center'}"
                :table-config="tableConfig"
                @table-emitTableHandlerClick="onTableHandlerClick">
  </sc-min-table>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '../../lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';

const columns: ScTable.SetColumns = [['类型', 'type'], ['图片', 'pic', null, null, 'img']];

@Component
export default class ActvIndex extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler: ScTable.ColumnsHandler = [
    {
      name: 'change',
      title: '更换图片',
    },
    {
      name: 'upload',
      title: '上传图片',
    },
  ];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.merchant.inject,
  };

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'change') {
      console.log('%c更改图片', 'color:#40b883;font-weight:bold');
    } else {
      console.log('%c上传图片', 'color:#40b883;font-weight:bold');
    }
  }
}
</script>
