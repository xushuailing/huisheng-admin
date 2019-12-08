<template>
  <div class='pb-30'>
    <sc-breadcrumb>
      <el-button @click="onAddTemplate">添加</el-button>
    </sc-breadcrumb>
    <el-tabs v-model="activeName">
      <el-tab-pane label="好评模板"
                   lazy
                   name="1">
        <sc-min-table stripe
                      ref="table"
                      :columns-handler="good.columnsHandler"
                      :columns="good.columns"
                      :table-config="good.tableConfig">
        </sc-min-table>
      </el-tab-pane>
      <el-tab-pane label="差评模板"
                   lazy
                   name="2">
        <sc-min-table stripe
                      ref="table"
                      :columns-handler="poor.columnsHandler"
                      :columns="poor.columns"
                      :table-config="poor.tableConfig">
        </sc-min-table>
      </el-tab-pane>
    </el-tabs>

    <sc-add-form :visible.sync="visible"
                 :api="api"
                 :config="addConfig">
    </sc-add-form>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '../../../lib/@types/sc-form';

const columns: ScTable.SetColumns = [
  ['用户头像', 'none1', 100, null, 'img'],
  ['名称', 'none2'],
  ['内容', 'none3'],
  ['模板分类', 'none4'],
  ['创建时间', 'none5'],
];
@Component
export default class OperateEvaluate extends Vue {
  // 缺少好评,差评模板列表，添加，删除，评价分类接口
  good = {
    columns: this.$utils._SetTableColumns(columns),
    columnsHandler: ['del'],
    tableConfig: {
      api: this.$api.admin.merchant.shop.goods,
      // breadcrumbButtons: ['add'],
    },
  };

  poor = {
    columns: this.$utils._SetTableColumns(columns),
    columnsHandler: ['del'],
    tableConfig: {
      api: this.$api.admin.merchant.shop.goods,
    },
  };

  visible = false;

  activeName = '1';

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
          prop: 'none6',
          default: 1,
          tag: {
            tagType: 'radio',
            options: [{ value: 1, label: '好评模板' }, { value: 2, label: '差评模板' }],
            attr: { placeholder: '请选择评价类型' },
          },
        },
        {
          label: '评价分类：',
          prop: 'none7',
          tag: { tagType: 'select', attr: { placeholder: '请选择评价分类' }, options: [] },
        },
        {
          label: '评价内容：',
          prop: 'none8',
          tag: { attr: { type: 'textarea', rows: 6, placeholder: '请输入评价内容' } },
        },
      ],
    ],
  };

  // TODO: 接口没有
  get addApi() {
    return this.$api.admin.setting.platform.create;
  }

  onAddTemplate() {
    this.visible = true;
  }
}
</script>
