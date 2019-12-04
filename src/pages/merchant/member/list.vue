<template>
  <sc-min-table stripe
                ref="table"
                :columns="columns"
                :columns-schema="columnsSchema"
                :search-config="searchConfig"
                :table-config="tableConfig">
  </sc-min-table>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';

const columns: ScTable.SetColumns = [
  ['会员头像', 'avatarurl', 100, null, 'img'],
  ['名称', 'nickname'],
  ['会员类型', 'member_name'],
  ['创建时间', 'createtime'],
  ['佣金比例', 'divide_comparisons'],
  ['获得佣金', 'money'],
];

@Component
export default class SettingRoleList extends Vue {
  userInfo = this.$utils._Storage.get('user_info');

  columns = this.$utils._SetTableColumns(columns);

  columnsSchema: ScTable.ColumnsSchema = {
    获得佣金: {
      formater: (row, col) => {
        const value = row[col.prop];
        return [{ class: 'font-primary' }, value ? `+${value}` : value];
      },
    },
  };

  tableConfig = {
    api: this.$api.merchant.member.list,
    index: { uid: this.userInfo.id },
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
        prop: 'level_type',
        tag: {
          tagType: 'select',
          options: [
            { label: '黄金会员', value: 1 },
            { label: '铂金会员', value: 2 },
            { label: '钻石会员', value: 3 },
          ],
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
