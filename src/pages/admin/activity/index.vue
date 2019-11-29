<template>
  <sc-min-table stripe
                ref="table"
                :columns-type="['index']"
                :columns-handler="columnsHandler"
                :columns-schema="columnsSchema"
                :columns-events='columnsEvents'
                :columns="columns"
                :table-config="tableConfig"
                @table-emitTableHandlerClick="onTableHandlerClick">
  </sc-min-table>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';

const columns: ScTable.SetColumns = [
  ['图片', 'goods_image', 200, null, 'img'],
  ['类型', 'activity_title'],
];

@Component
export default class ActvIndex extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler: ScTable.ColumnsHandler = [{ name: 'upload', title: '上传图片' }];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.activity.index,
    handleWidth: 200,
  };

  columnsSchema: ScTable.ColumnsSchema = {
    图片: {
      propsHandler: (prop) => ({ ...prop, height: 70, width: 100 }),
    },
  };

  columnsEvents = {
    index: {
      width: 200,
    },
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
