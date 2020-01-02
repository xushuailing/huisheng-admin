<template>
  <div class='admin-manage-record'>
    <el-radio-group v-model="currentTab"
                    size="medium"
                    @change="onTabChange">
      <el-radio-button v-for="(item,i) in tabs"
                       :key="i"
                       :label="item.value">{{item.label}}</el-radio-button>
    </el-radio-group>

    <sc-min-table stripe
                  ref="table"
                  class="mt-20"
                  :columns="columns"
                  :search-config="searchConfig"
                  :table-config="tableConfig">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Ref } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class ManagementAccount extends Vue {
  @Ref('table') $table!: ScTable;

  tabs = [
    { label: '账户日汇总', value: 1 },
    { label: '账户月汇总', value: 2 },
    { label: '账户年汇总', value: 3 },
  ];

  currentTab = this.tabs[0].value;

  onTabChange(tab: number) {
    this.tableConfig.index.typetime = tab;
    this.$table.setDataTable({});
  }

  columns: ScTable.Columns = [
    { label: '日期', prop: 'time' },
    { label: '支出项目', prop: 'title' },
    {
      label: '本月交易额',
      prop: 'money',
      formater: (row, col) => {
        const isNegative = row[col.prop].includes('-');
        const style = isNegative ? 'font-danger' : 'font-primary';
        const value = row[col.prop].replace('-', '');
        const operate = isNegative ? '-' : '+';
        return [{ class: style }, `${operate}￥${value}`];
      },
    },
  ];

  tableConfig = {
    api: this.$api.admin.management.record,
    index: { classify: 1, typetime: 1 },
  };

  searchConfig: ScTable.Search = {
    handleSubmit: (data: any) => {
      data.classify = 2;
      if (data.typetime) delete data.typetime;
      if (data.createtime) {
        const [start, end] = data.createtime.split(',');
        data.firsttime = start;
        data.lasttime = end;
      }
      delete data.createtime;
      return data;
    },
    attr: { 'label-width': 'auto', 'label-position': 'right' },
    data: [
      {
        label: '',
        prop: 'createtime',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetimerange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间',
          },
        },
      },
    ],
  };
}
</script>
<style lang="scss">
.admin-manage-record {
  .el-row {
    display: flex;
    .el-form-item {
      margin: 0 !important;
    }
    .text-e.pt-10.pl-20.pr-15 {
      padding-top: 0 !important;
    }
  }
}
</style>
