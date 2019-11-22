<template>
  <div class='setting-role-list'>

    <sc-breadcrumb class="w100 pr-30 text-e">
      <el-button type="primary"
                 @click="visible=true">添加</el-button>
    </sc-breadcrumb>

    <el-tabs v-model="active">
      <el-tab-pane label="好评模板"
                   name="good">
        <sc-min-table stripe
                      ref="table"
                      :columns-handler="good.columnsHandler"
                      :columns-props="{align:'center'}"
                      :columns="good.columns"
                      :table-config="good.tableConfig">
        </sc-min-table>
      </el-tab-pane>
      <el-tab-pane label="差评模板"
                   name="bad">
        <sc-min-table stripe
                      ref="table"
                      :columns-handler="bad.columnsHandler"
                      :columns-props="{align:'center'}"
                      :columns="bad.columns"
                      :table-config="bad.tableConfig">
        </sc-min-table>
      </el-tab-pane>
    </el-tabs>

    <sc-add-form :visible.sync="visible"
                 :api="addApi"
                 :config="addConfig">
    </sc-add-form>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';

const columns: ScTable.SetColumns = [
  ['头像', 'none1', null, null, 'img'],
  ['名称', 'none2'],
  ['内容', 'none3'],
  ['模板分类', 'none4'],
  ['创建时间', 'created_at'],
];

@Component
export default class OperatePraise extends Vue {
  active = 'good';

  good = this.getTableConfig();

  bad = this.getTableConfig('bad');

  getTableConfig(type = 'good') {
    const columnsConfig = this.$utils._SetTableColumns(columns);
    const columnsHandler = ['del'];
    const tableConfig = {
      api: type === 'good' ? this.$api.role : this.$api.role,
      index: type === 'good' ? {} : {},
      breadcrumbButtons: ['add'],
    };

    return {
      columns: columnsConfig,
      tableConfig,
      columnsHandler,
    };
  }

  visible = false;

  addApi = this.$api.role.create;

  addConfig: ScForm.Add = {
    data: [
      [
        {
          label: '评价类型：',
          prop: 'none',
          tag: {
            tagType: 'checkbox',
            options: [{ label: '好评模板', value: 1 }, { label: '差评模板', value: 0 }],
            attr: { limit: 100, fileSize: 10000, custom: { timeout: 2e6 } },
          },
        },
        {
          label: '评价分类：',
          prop: 'none4',
          tag: {
            tagType: 'select',
            options: [],
            attr: { placeholder: '请选择评价分类' },
          },
        },
        {
          label: '评价内容：',
          prop: 'none3',
          tag: { attr: { type: 'textarea', rows: 8 } },
        },
      ],
    ],
  };
}
</script>
