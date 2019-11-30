<template>
  <div class='complaints-list'>
    <sc-min-table stripe
                  ref="table"
                  :columns-type="['selection']"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :columns-schema="columnsSchema"
                  :table-config="tableConfig"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
    <dialog-textarea title="请输入回复内容"
                     placeholder="请输入回复内容~"
                     api='123'
                     prop="reject"
                     :id="replyForm.id"
                     :visible.sync="replyForm.visible" />

  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';
import dialogTextarea from '@/components/dialogTextarea.vue';

const columns: ScTable.SetColumns = [
  ['投诉人', 'username', 200],
  ['投诉内容', 'text'],
  ['创建时间', 'createtime', 150],
  ['状态', 'status', 100],
];

@Component({ components: { dialogTextarea } })
export default class ComplaintsList extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = [{ name: 'reply', title: '回复' }];

  columnsSchema: ScTable.ColumnsSchema = {
    // 状态: {
    //   // formater: (row, col) => [{ class: 'font-primary' }, status[row[col.prop]]],
    // },
  };

  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.complaints,
  };

  replyForm = {
    id: null,
    visible: false,
  };

  // TODO: 缺少投诉回复接口

  onTableHandlerClick({ row, index, type }: ScTable.Event.TableHandlerClick) {
    console.log('row :', row);
    console.log('index :', index);
    console.log('type :', type);
    if (type === 'reply') {
      this.replyForm.visible = true;
      this.replyForm.id = row.id;
    }
  }
}
</script>
