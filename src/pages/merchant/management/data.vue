<template>
  <div class="management">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="bg-white border-radius-8">
          <div class="flex-jsb p-25">
            <div class="flex-column">
              <div>总资产（元）</div>
              <div class="mt-15 font-primary font-20 font-bold">&yen; {{money.total_money}}</div>
            </div>
            <div class="flex-column">
              <el-link type="primary"
                       @click="toRecord">提现记录</el-link>
            </div>
          </div>
          <div class="p-25 border-top">
            <div v-for="item in moneyTotal"
                 :key="item.prop"
                 class="mb-10">
              {{item.label}} &yen; {{money[item.prop]}}
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="bg-white border-radius-8">
          <div class="p-25">
            <div class="">成交量（月）</div>
            <div class="mt-15 font-primary font-20 font-bold">{{money.month_number}}</div>
          </div>
          <div class="p-25 border-top">
            <div v-for="item in numTotal"
                 :key="item.prop"
                 class="mb-10">
              {{item.label}} {{money[item.prop]}}
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="bg-white border-radius-8 p-25 pb-30">
          <div class="mb-30">收入支出</div>
          <div v-for="(item,i) in inoutTotal"
               :key="item.prop"
               :class="['mb-15',i===inoutTotal.length-1?'pb-10':'']">
            {{item.label}}<span v-if="item.type === 'money'"> &yen; </span>{{money[item.prop]}}
          </div>
        </div>
      </el-col>
    </el-row>
    <div style="height:450px"
         class="bg-white border-radius-8 p-25 mt-20">
      <h2 class="mt-0">近七日变化趋势（元）</h2>
      <el-radio-group v-model="trendType"
                      size="medium"
                      @change="onTrendTypeChange">
        <el-radio-button v-for="(item,i) in trendOptions"
                         :key="i"
                         :label="item.value">{{item.label}}</el-radio-button>
      </el-radio-group>
      <ve-histogram height="100%"
                    :extend="histogram.extend"
                    :legend-visible="false"
                    :data="histogram.chartData"></ve-histogram>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { _Uid, _IsVirtual } from '../config';
import { obj } from '@/lib/@types/sc-param.d';

interface WeekData {
  Total: number[];
  income: number[];
  expenditure: number[];
  time?: string[];
}

interface ResData {
  total_money: number;
  year_money: number;
  month_money: number;
  day_money: number;
  year_number: number;
  month_number: number;
  day_number: number;
  day_income: number;
  day_expenditure: number;
  day_income_num: number;
  day_expenditure_num: number;
  week_data: WeekData;
}

@Component
export default class ManagementData extends Vue {
  get moneyTotal() {
    const entity = [
      { label: '本年销售额：', prop: 'year_money' },
      { label: '上一月销售额：', prop: 'month_money' },
      { label: '本日销售额：', prop: 'day_money' },
    ];
    const virtual = [
      { label: '本年销售额：', prop: 'year_money' },
      { label: '本月销售额：', prop: 'month_money' },
    ];
    return _IsVirtual ? virtual : entity;
  }

  get numTotal() {
    const entity = [
      { label: '本年成交量：', prop: 'year_number' },
      { label: '上一月成交量：', prop: 'month_number' },
      { label: '本日成交量：', prop: 'day_number' },
    ];
    const virtual = [
      { label: '本年成交量：', prop: 'year_money' },
      { label: '本月成交量：', prop: 'month_money' },
    ];
    return _IsVirtual ? virtual : entity;
  }

  inoutTotal = [
    { label: '昨日收入：', prop: 'day_income', type: 'money' },
    { label: '昨日支出：', prop: 'day_expenditure', type: 'money' },
    { label: '昨日收入笔数：', prop: 'day_income_num' },
    { label: '昨日支出笔数：', prop: 'day_expenditure_num' },
  ];

  money = {
    total_money: 0,
    year_money: 0,
    month_money: 0,
    day_money: 0,
    year_number: 0,
    month_number: 0,
    day_number: 0,
    day_income: 0,
    day_expenditure: 0,
    day_income_num: 0,
    day_expenditure_num: 0,
  };

  columns = ['日期', '金额'];

  histogram: obj = {
    extend: {
      series: {
        label: { show: true, position: 'top' },
      },
    },
    chartData: {
      columns: this.columns,
      rows: [],
    },
  };

  trendOptions = [
    { label: '总资产', value: 'Total' },
    { label: '店铺收入', value: 'income' },
    { label: '店铺支出', value: 'expenditure' },
  ];

  trendData: WeekData = { Total: [], income: [], expenditure: [] };

  @Watch('trendData', { deep: true })
  onTrendDataChange(data: obj) {
    this.histogram.chartData.rows = data[this.trendType];
  }

  trendType: keyof WeekData = 'Total';

  onTrendTypeChange() {
    this.histogram.chartData.rows = this.trendData[this.trendType];
  }

  toRecord() {
    this.$router.push('recode');
  }

  async getData() {
    const api = this.$api.merchant.manage.statistics;
    const loading = this.$utils._Loading.show();
    const { data } = await this.$http.get<ResData>(api, { uid: _Uid });

    this.money = data;
    const weekData = data.week_data;
    Object.keys(this.trendData).forEach((key) => {
      // @ts-ignore
      this.trendData[key] = this.getChartData(weekData.time!, weekData[key]);
    });
    loading.close();
  }

  getChartData(times: string[], data: number[]) {
    const { columns } = this;
    return times.map((time, i) => ({ [columns[0]]: time, [columns[1]]: data[i] }));
  }

  mounted() {
    this.getData();
  }
}
</script>
