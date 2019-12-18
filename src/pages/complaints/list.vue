<template>
  <div class='complaints-list'>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :columns-schema="columnsSchema"
                  :table-config="tableConfig"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
    <dialog-textarea title="请输入回复内容"
                     placeholder="请输入回复内容~"
                     :api='replyApi'
                     prop="reply_text"
                     :id="{id:replyForm.id}"
                     :visible.sync="replyForm.visible"
                     @onSuccess="onSuccess" />

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

const status = ['', '未处理', '已处理'];

@Component({ components: { dialogTextarea } })
export default class ComplaintsList extends Vue {
  $refs!: {
    table: ScTable;
  };

  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = [{ name: 'reply', title: '回复' }];

  columnsSchema: ScTable.ColumnsSchema = {
    状态: {
      formater: (row, col) => [
        { class: row[col.prop] == '1' ? 'font-primary' : 'font-success' },
        status[row[col.prop]],
      ],
    },
  };

  tableConfig: ScTable.TableConfig = {
    api: this.$api.common.complaints,
  };

  replyForm = {
    id: null,
    visible: false,
  };

  get replyApi() {
    return this.$api.common.complaints.reply;
  }

  onSuccess() {
    this.$refs.table.emitRefresh();
  }

  onTableHandlerClick({ row, index, type }: ScTable.Event.TableHandlerClick) {
    if (type === 'reply') {
      this.replyForm.visible = true;
      this.replyForm.id = row.id;
    }
  }
}
</script>
