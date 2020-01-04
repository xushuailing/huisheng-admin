<template>
  <div class='manage-account'>
    <el-tabs class="sc-tabs"
             v-model="currentTab"
             @tab-click="onTabChange">
      <el-tab-pane v-for="(item,i) in tabs"
                   :label="item.label"
                   :key="i"
                   :name="item.value">
      </el-tab-pane>
    </el-tabs>

    <sc-min-table stripe
                  ref="table"
                  class="mt-20"
                  :columns="columns"
                  :search-config="searchConfig"
                  :table-config="tableConfig"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Ref } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';
import { _Shopid, _AccountType } from '../config';

@Component
export default class ManagementAccount extends Vue {
  @Ref('table') $table!: ScTable;

  userInfo = this.$utils._Storage.get('user_info');

  tabs = [
    { label: '账户日汇总', value: '1' },
    { label: '账户月汇总', value: '2' },
    { label: '账户年汇总', value: '3' },
  ];

  currentTab = this.tabs[0].value;

  onTabChange(tab: any) {
    this.tableConfig.index!.typetime = tab.name;
    this.$table.setDataTable({});
  }

  columns: ScTable.Columns = [
    { label: '日期', prop: 'time' },
    {
      label: '支出项目',
      prop: 'title',
      // 2 提现 4 订单收入
      formater: (row, col) => (row[col.prop] == 2 ? '提现' : '订单收入'),
    },
    {
      label: '本月交易额',
      prop: 'money',
      formater: (row, col) => (row[col.prop] ? `￥ ${row[col.prop]}` : ''),
    },
    {
      label: '项目类别',
      prop: 'type',
      formater: (row, col) => (_AccountType as obj)[row[col.prop]] || '',
    },
  ];

  // TODO：导出按钮没有了
  tableConfig = {
    api: this.$api.merchant.manage.account,
    index: { shopid: _Shopid, classify: 1, typetime: 1 },
  };

  searchConfig: ScTable.Search = {
    handleSubmit: (data: any) => {
      if (data) {
        data.classify = 2;
        if (data.createtime) {
          const [start, end] = data.createtime.split(',');
          data.firsttime = start;
          data.lasttime = end;
          delete data.createtime;
        }
      }
      return data;
    },
    attr: { 'label-width': '82px', 'label-position': 'right' },
    data: [
      {
        label: '日期',
        prop: 'createtime',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetimerange',
            'range-separator': '至',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间',
          },
        },
      },
      {
        label: '项目类别：',
        prop: 'type',
        tag: {
          tagType: 'select',
          options: Object.entries(_AccountType).map(([k, v]) => ({ label: v, value: k })),
          attr: { 'label-width': '100px', placeholder: '请选择订单类型' },
        },
      },
    ],
  };

  onTableHandlerClick({ row, type }: any) {
    if (type === 'export') {
      //
    }
  }

  // setSearchStyle() {
  //   const content = document.querySelectorAll('.el-form-item__content');
  //   const lastItem = content[content.length - 1];
  //   lastItem && ((lastItem as any).style['margin-left'] = '83px');
  // }

  // mounted() {
  //   setTimeout(() => {
  //     this.setSearchStyle();
  //   }, 100);
  // }
}
</script>
