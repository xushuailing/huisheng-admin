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
    <el-dialog title="投诉回复"
               :visible.sync="replyForm.visible">
      <div>
        <el-input type="textarea"
                  :autofocus="{ minRows: 4, maxRows: 6 }"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="replyForm.value" />
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="replyForm.visible = false">取 消</el-button>
        <el-button type="primary"
                   @click="onReplySubmit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '../../../lib/@types/sc-form.d';

const columns: ScTable.SetColumns = [
  ['投诉人', 'username', 200],
  ['投诉内容', 'text'],
  ['创建时间', 'createtime', 150],
  ['状态', 'status', 100],
];

@Component
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
    value: '',
    id: null,
    visible: false,
  };

  // TODO: 缺少投诉回复接口
  async onReplySubmit() {
    const api = '';
    try {
      const { data } = await this.$http.post(api, this.replyForm);
    } catch (error) {
      console.log('error :', error);
    }

    this.replyForm.visible = false;
  }

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
