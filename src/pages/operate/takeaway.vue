<template>
  <div class='setting-role-list'>

    <sc-breadcrumb class="w100 pr-30 text-e">
      <el-button type="primary"
                 @click="visible=true">添加</el-button>
    </sc-breadcrumb>

    <el-tabs v-model="active">
      <el-tab-pane v-for="tab in tabs"
                   :key="tab.name"
                   :label="tab.label"
                   :name="tab.name"
                   :lazy="true">
        <sc-min-table stripe
                      :ref="tab.name"
                      :columns-handler="tab.columnsHandler"
                      :columns-props="{align:'center'}"
                      :columns="tab.columns"
                      :table-config="tab.tableConfig">
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
import { obj } from '@/lib/@types/sc-param.d';

const columns: ScTable.SetColumns = [
  ['问题', 'none1'],
  ['回答', 'none2'],
  ['创建时间', 'created_at'],
];

@Component
export default class OperatePraise extends Vue {
  tabs = [
    { label: '新手入门', name: 'novice', ...this.getTableConfig('novice') },
    { label: '视频教学', name: 'video', ...this.getTableConfig('video') },
    { label: '经营之道', name: 'business', ...this.getTableConfig('business') },
    { label: '常见问题', name: 'faq', ...this.getTableConfig('faq') },
  ];

  names = this.tabs.map((tab) => tab.name);

  active = this.tabs[0].name;

  getTableConfig(type: string) {
    const columnsConfig = this.$utils._SetTableColumns(columns);
    const columnsHandler = ['del'];
    const aaa = typeof this.names;
    const api: obj<obj<string>> = {
      novice: this.$api.role,
      video: this.$api.role,
      business: this.$api.role,
      faq: this.$api.role,
    };
    const tableConfig = { api: api[type] };

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
          label: '选择类型：',
          prop: 'none',
          tag: {
            tagType: 'select',
            options: [],
            attr: { placeholder: '请选择选择类型' },
            listeners: {
              change: (type: string) => {
                this.changeAnswer(type);
              },
            },
          },
        },
        {
          label: '添加问题：',
          prop: 'none1',
        },
        {
          label: '回答：',
          prop: 'none2',
          tag: { attr: { type: 'textarea', rows: 8 } },
        },
        {
          label: '添加视频：',
          prop: 'none3',
          isHide: true,
          tag: {
            tagType: 'upload-file',
            attr: { limit: 1, fileSize: 10000, custom: { timeout: 2e6 } },
          },
        },
      ],
    ],
  };

  changeAnswer(type: string) {
    const hide = type !== '视频';
    const answer = this.$utils._GetConfigItemData(this.addConfig.data, 'none2');
    answer && this.$set(answer, 'isHide', !hide);
    const video = this.$utils._GetConfigItemData(this.addConfig.data, 'none3');
    video && this.$set(video, 'isHide', hide);
  }
}
</script>
