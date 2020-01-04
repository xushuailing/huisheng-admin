<template>
  <div class='pb-30'>
    <sc-breadcrumb>
      <el-button @click="onAddTemplate">添加</el-button>
    </sc-breadcrumb>
    <el-tabs class="sc-tabs"
             v-model="activeName">
      <el-tab-pane label="好评模板"
                   lazy
                   name="1">
        <sc-min-table stripe
                      ref="table1"
                      :columns-handler="good.columnsHandler"
                      :columns="good.columns"
                      :table-config="good.tableConfig">
        </sc-min-table>
      </el-tab-pane>
      <el-tab-pane label="差评模板"
                   lazy
                   name="2">
        <sc-min-table stripe
                      ref="table2"
                      :columns-handler="poor.columnsHandler"
                      :columns="poor.columns"
                      :table-config="poor.tableConfig">
        </sc-min-table>
      </el-tab-pane>
    </el-tabs>

    <sc-add-form :visible.sync="visible"
                 :api="addApi"
                 :config="addConfig"
                 @emitAddComplete="onAddComplete">
    </sc-add-form>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Ref } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '../../../lib/@types/sc-form';

const columns: ScTable.SetColumns = [
  ['用户头像', 'head_portrait', 100, null, 'img'],
  ['名称', 'user_name'],
  ['内容', 'content'],
  ['模板分类', 'class_name'],
  ['创建时间', 'time'],
];
@Component
export default class OperateEvaluate extends Vue {
  @Ref('table1') table1!: ScTable;

  @Ref('table2') table2!: ScTable;

  good = {
    columns: this.$utils._SetTableColumns(columns),
    columnsHandler: ['del'],
    tableConfig: {
      api: this.$api.admin.operate.template,
      index: { type: 1 },
    },
  };

  poor = {
    columns: this.$utils._SetTableColumns(columns),
    columnsHandler: ['del'],
    tableConfig: {
      api: this.$api.admin.operate.template,
      index: { type: 2 },
    },
  };

  visible = false;

  activeName = '1';

  templateClass: any[] = [];

  addConfig: ScForm.Add = {
    buttons: [
      {
        mode: 'submit',
        text: '完成',
        sort: 2,
      },
      {
        mode: 'cancel',
        text: '取消',
        sort: 1,
      },
    ],
    header: { title: '添加模板' },
    data: [
      [
        {
          label: '评价类型：',
          prop: 'type',
          default: 1,
          tag: {
            tagType: 'radio',
            options: [{ value: 1, label: '好评模板' }, { value: 2, label: '差评模板' }],
            attr: { placeholder: '请选择评价类型' },
          },
        },
        {
          label: '评价分类：',
          prop: 'class_id',
          tag: {
            tagType: 'select',
            attr: { placeholder: '请选择评价分类' },
            options: this.getTemplateClass,
          },
        },
        {
          label: '评价内容：',
          prop: 'content',
          tag: { attr: { type: 'textarea', rows: 6, placeholder: '请输入评价内容' } },
        },
      ],
    ],
  };

  get addApi() {
    return this.$api.admin.operate.template.create;
  }

  onAddTemplate() {
    this.visible = true;
  }

  onAddComplete({ status }: ScForm.EventComplete) {
    if (status) {
      if (this.table1) this.table1.emitRefresh();
      if (this.table2) this.table2.emitRefresh();
    }
  }

  async getTemplateClass() {
    try {
      if (this.templateClass.length) {
        return this.templateClass;
      }
      const api = this.$api.admin.operate.class.index;
      const { data } = await this.$http.get<any[]>(api, { limit: 9e5 });

      const list = data.map((v) => ({ value: v.id, label: v.name }));
      this.templateClass = list;
      return list;
    } catch (error) {
      return [];
    }
  }
}
</script>
