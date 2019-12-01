<template>
  <sc-min-table stripe
                ref="table"
                :columns="columns"
                :search-config="searchConfig"
                :table-config="tableConfig">
  </sc-min-table>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';

const columns: ScTable.SetColumns = [
  ['会员头像', 'none1', 120, null, 'img'],
  ['名称', 'none2'],
  ['会员类型', 'none4'],
  ['创建时间', 'created_at'],
  ['佣金比例', 'none5'],
];

@Component
export default class SettingRoleList extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  tableConfig = {
    api: this.$api.merchant.product,
  };

  searchConfig: ScTable.Search = {
    data: [
      {
        label: '下线名称：',
        prop: 'name',
        tag: { attr: { placeholder: '请输入会员名称' } },
      },
      {
        label: '会员类型：',
        prop: 'type',
        tag: {
          tagType: 'select',
          options: [],
          attr: { placeholder: '请选择会员类型' },
        },
      },
      {
        label: '选择时间：',
        prop: 'createtime',
        tag: {
          tagType: 'date-picker',
          attr: { type: 'datetime', placeholder: '请选择开始时间' },
        },
      },
    ],
  };
}
</script>
