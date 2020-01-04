<template>
  <div class='setting-role-list'>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :search-config="searchConfig"
                  :table-config="tableConfig">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';

const level_id = [
  { value: 1, label: '黄金会员' },
  { value: 2, label: '铂金会员' },
  { value: 3, label: '钻石会员' },
];

const columns: ScTable.SetColumns = [
  ['头像', 'avatarurl', 100, null, 'img'],
  ['名称', 'nickname'],
  ['会员金额', 'money'],
  ['会员类型', 'member_name'],
  ['创建时间', 'createtime'],
  ['上级信息', 'none5'],
];

@Component
export default class SettingRoleList extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = ['del'];

  // TODO: 缺少删除接口
  tableConfig = {
    api: this.$api.admin.vip.level,
    // breadcrumbButtons: ['add'],
  };

  searchConfig = {
    data: [
      {
        label: '会员名称：',
        prop: 'nickname',
        tag: {
          attr: {
            placeholder: '请输入会员名称',
          },
        },
      },
      {
        label: '会员类型：',
        prop: 'level_id',
        tag: {
          tagType: 'select',
          options: level_id,
          attr: {
            placeholder: '请选择会员类型',
          },
        },
      },
      {
        label: '创建时间：',
        prop: 'createtime',
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
          options: [],
          attr: {
            placeholder: '请选择创建方式',
          },
        },
      },
    ],
  };
}
</script>
