<template>
  <div class='test-min'>
      <el-row :gutter="20" class="mb-20">
      <el-col :span="12">
       <div style="height:400px" class="bg-white border-radius-8 mt-20">
          <div class="p-15">
            <div class="">一级代理</div>
            <div class=" mt-10">本月收益： &yen;120.00</div>
          </div>
          <div class="p-15">
            <div class="mb-10">
              剩余黄金会员： 10/20
            </div>
            <div class="mb-10">
              剩余钻石会员： 0/20
            </div>
            <div class="mb-10">
              剩余铂金会员： 0/20
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="height:400px" class="bg-white border-radius-8 p-15 mt-20">
            <el-radio-group v-model="radio1">
                <el-radio-button label="日成交额"></el-radio-button>
                <el-radio-button label="周成交额"></el-radio-button>
                <el-radio-button label="月成交额"></el-radio-button>
            </el-radio-group>
            <ve-histogram height="100%"
                            :extend="histogram.extend"
                            :legend-visible="false"
                            :data="histogram.chartData"></ve-histogram>
        </div>
      </el-col>
    </el-row>
    <sc-min-table stripe
                  ref="table"
                  :columns-type="['selection']"
                  :columns="columns"
                  :table-config="tableConfig"
                  @pagination-onSlotClick="onSlotClick"
                  @emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '../../lib/@types/sc-table.d';

const columns: ScTable.SetColumns = [
  ['会员头像', 'avatar', null, null, 'img'],
  ['名称', 'nickname', 200],
  ['会员类型', 'name', 120],
  ['会员金额', 'idCard', 220],
  ['佣金比例', 'idCard', 220],
  ['创建时间', 'phone', 150],
];

@Component
export default class AgentList extends Vue {
    radio1: any = ''

    histogram = {
      extend: {
        series: {
          label: { show: true, position: 'top' },
        },
      },
      chartData: {
        columns: ['日期', '访问用户'],
        rows: [
          { 日期: '1/1', 访问用户: 1393 },
          { 日期: '1/2', 访问用户: 3530 },
          { 日期: '1/3', 访问用户: 2923 },
          { 日期: '1/4', 访问用户: 1723 },
          { 日期: '1/5', 访问用户: 3792 },
          { 日期: '1/6', 访问用户: 4593 },
        ],
      },
    };

  columns = this.$utils._SetTableColumns(columns);

  tableConfig = {
    api: this.$api.merchant.inject,
    // isSearch: false,

    // disabledRequest: true,
    table: {
      // storageKey: 'myTable',
    },
    isSetting: true,
    isExports: true,
  };


  onTableHandlerClick() {}

  onSlotClick() {
    console.log('1', 1);
  }
}
</script>
