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

const columns: ScTable.SetColumns = [
  ['日期', 'none1'],
  ['支出项目', 'none2'],
  ['本月交易', 'none3'],
];

@Component
export default class SettingRoleList extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = [{ name: 'look', title: '查看' }];

  tableConfig = {
    api: this.$api.role,
  };

  searchConfig = {
    num: 4,
    param: {},
    // attr: { 'label-width': '120px' },
    data: [
      {
        label: '',
        prop: 'created_at',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetime',
            placeholder: '开始时间',
          },
        },
      },
    ],
  };
}
</script>
