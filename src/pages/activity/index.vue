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

// TODO：不加宽度图片看不到，加了排版有问题
const columns: ScTable.SetColumns = [
  ['类型', 'activity_title', 600],
  ['图片', 'goods_image', null, null, 'img'],
];

@Component
export default class ActvIndex extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  // TODO：缺少原型和接口
  columnsHandler: ScTable.ColumnsHandler = [
    { name: 'change', title: '更换图片' },
    { name: 'upload', title: '上传图片' },
  ];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.activity.index,
    breadcrumbButtons: [],
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
