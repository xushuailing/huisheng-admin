<template>
  <div class='test-min'>
    <sc-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  @pagination-onSlotClick="onSlotClick"
                  @emitTableHandlerClick="onTableHandlerClick">
    </sc-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '../../lib/@types/sc-table.d';

const columns: ScTable.SetColumns = [
  ['投诉人', 'nickname'],
  ['投诉内容', 'content'],
  ['创建时间', 'createat'],
];

@Component
export default class ComplaintList extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = ['回复'];

  onTableHandlerClick() {}

  onSlotClick() {
    console.log('1', 1);
  }
}
</script>
