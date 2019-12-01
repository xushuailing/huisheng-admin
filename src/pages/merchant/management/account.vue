<template>
  <div class='manage-account'>
    <el-radio-group v-model="currentTab"
                    size="medium"
                    @change="onTabChange">
      <el-radio-button v-for="(item,i) in tabs"
                       :key="i"
                       :label="item.value">{{item.label}}</el-radio-button>
    </el-radio-group>

    <sc-min-table stripe
                  ref="table"
                  class="mt-30"
                  :columns="columns"
                  :search-config="searchConfig"
                  :table-config="tableConfig"
                  :columns-handler="columnsHandler"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';

const columns: ScTable.SetColumns = [
  ['日期', 'date'],
  ['支出项目', 'name'],
  ['本月交易额', 'price'],
  ['项目类别', 'type'],
];

@Component
export default class ManagementAccount extends Vue {
  tabs = [
    { label: '账户日汇总', value: 'date' },
    { label: '账户月汇总', value: 'month' },
    { label: '账户年汇总', value: 'year' },
  ];

  currentTab = this.tabs[0].value;

  onTabChange(tab: string) {
    console.log('tab: ', tab);
  }

  columns: ScTable.Columns = [
    { label: '日期', prop: 'date' },
    { label: '支出项目', prop: 'name' },
    {
      label: '本月交易额',
      prop: 'price',
      formater: (row, col) => (row[col.prop] ? `￥ ${row[col.prop]}` : ''),
    },
    { label: '项目类别', prop: 'type' },
  ];

  tableConfig = {
    api: this.$api.merchant.market,
  };

  columnsHandler: ScTable.ColumnsHandler = [{ name: 'export', title: '导出' }];

  searchConfig = {
    param: {},
    attr: { 'label-width': 'auto', 'label-position': 'right' },
    data: [
      {
        label: '',
        prop: 'id',
        tag: { attr: { placeholder: '请输入订单号' } },
      },
      {
        label: '',
        prop: 'createtime',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'daterange',
            'start-placeholder': '开始时间',
            'end-placeholder': '结束时间',
          },
        },
      },
      {
        label: '业务类别：',
        prop: 'type',
        tag: {
          tagType: 'select',
          options: [],
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

  setSearchStyle() {
    const content = document.querySelectorAll('.el-form-item__content');
    const lastItem = content[content.length - 1];
    lastItem && ((lastItem as any).style['margin-left'] = '83px');
  }

  mounted() {
    setTimeout(() => {
      this.setSearchStyle();
    }, 100);
  }
}
</script>
