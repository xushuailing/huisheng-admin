<template>
  <div class='setting-role-list'>
    <sc-breadcrumb>
      <el-button>添加</el-button>
    </sc-breadcrumb>

    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :search-config="searchConfig"
                  :table-config="tableConfig">
    </sc-min-table>

    <el-tabs v-model="active">
      <el-tab-pane label="好评模板"
                   name="good">好评模板</el-tab-pane>
      <el-tab-pane label="差评模板"
                   name="bad">差评模板</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';

const columns: ScTable.SetColumns = [
  ['头像', 'none1', null, null, 'img'],
  ['名称', 'none2'],
  ['内容', 'none3'],
  ['模板分类', 'none4'],
  ['创建时间', 'created_at'],
];

@Component
export default class SettingRoleList extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = ['del'];

  active = 'good';

  tableConfig = {
    api: this.$api.role,
    // breadcrumbButtons: ['add'],
  };

  searchConfig = {
    num: 4,
    param: {},
    // attr: { 'label-width': '120px' },
    data: [
      {
        label: '会员名称：',
        prop: 'none2',
        default: '',
        tag: {
          attr: {
            placeholder: '请输入会员名称',
          },
        },
      },
      {
        label: '会员类型：',
        prop: 'none4',
        tag: {
          tagType: 'select',
          options: [
            {
              value: 1,
              label: '启用',
            },
            {
              value: 0,
              label: '不启用',
            },
          ],
          attr: {
            placeholder: '请选择会员类型',
          },
        },
      },
      {
        label: '创建时间：',
        prop: 'created_at',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetime',
            placeholder: '开始时间',
          },
        },
      },
      {
        label: '创建方式：',
        prop: 'none6',
        tag: {
          tagType: 'select',
          options: [
            {
              value: 1,
              label: '启用',
            },
            {
              value: 0,
              label: '不启用',
            },
          ],
          attr: {
            placeholder: '请选择创建方式',
          },
        },
      },
    ],
  };
}
</script>
