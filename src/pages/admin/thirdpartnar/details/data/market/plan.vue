<template>
  <div>
    <!-- <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns-props="{align:'center'}"
                  :columns="columns"
                  :editConfig="editConfig"
                  :table-config="tableConfig">
    </sc-min-table> -->
    <sc-edit mode="page"
             :api="tableConfig.api.create"
             :config="editConfig"></sc-edit>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';

const columns: ScTable.SetColumns = [['平台类型', 'type'], ['状态', 'status']];

@Component
export default class TpMarketPlan extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = ['detail', { name: 'upload', title: '上传' }];

  // TODO: 缺少接口
  tableConfig: ScTable.TableConfig = {
    api: this.$api.test,
    breadcrumbButtons: [],
  };

  editConfig: ScTable.Eidt = {
    // 'label-width':'85'
    width: '100%',
    formAttr: { 'label-position': 'left' },
    header: { title: '上传营销策划表' },
    data: [
      [
        {
          label: '主打活动：',
          prop: 'none1',
          tag: { attr: { type: 'textarea', rows: 4 } },
        },
        {
          label: '满减规则：',
          prop: 'none2',
          tag: { attr: { type: 'textarea', rows: 4 } },
        },
        {
          label: '抽点方式：',
          prop: 'none3',
          tag: { attr: { type: 'textarea', rows: 4 } },
        },
        {
          label: '最低起抽：',
          prop: 'none4',
          tag: { attr: { type: 'textarea', rows: 4 } },
        },
        {
          label: '利润控制：',
          prop: 'none5',
          tag: { attr: { type: 'textarea', rows: 4 } },
        },
        {
          label: '利润控制：',
          prop: 'none6',
          tag: { attr: { type: 'textarea', rows: 4 } },
        },
        {
          label: '满减条件：',
          prop: 'none7',
        },
        {
          label: '商品名称：',
          prop: 'none8',
          tag: { tagType: 'select', options: [] },
        },
        { label: '成本：', prop: 'none9' },
        { label: '定价：', prop: 'none10' },
        { label: '折扣：', prop: 'none11' },
        { label: '餐盒费：', prop: 'none12' },
        { label: '配送费：', prop: 'none13' },
        { label: '抽点费：', prop: 'none14' },
        { label: '补贴：', prop: 'none15' },
        { label: '成本价抽点：', prop: 'none16' },
        { label: '实付价抽点：', prop: 'none17' },
      ],
    ],
  };
}
</script>
