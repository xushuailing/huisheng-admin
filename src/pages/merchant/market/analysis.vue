<template>
  <div class="pb-30">
    <el-row :gutter="10">
      <!-- 营销分析 -->
      <el-col :span="8">
        <div class="bg-white border-radius-8 flex-column">
          <div class="pt-15 pb-15 pl-20 pr-20 font-20">营销分析</div>
          <div v-for="(item,key) in analysis"
               :key="key"
               class="border-top flex p-20">
            <span class="flex-1">{{item.label}}</span>
            <span class="flex-1 font-primary">{{item.value}}</span>
          </div>
        </div>
      </el-col>

      <!-- 增长趋势 -->
      <el-col :span="16">
        <div class="pb-10 bg-white border-radius-8 flex-column">
          <div class="p-15 mb-10 border-bottom font-16">营业额增长趋势</div>
          <ve-line height="290px"
                   :legend-visible="false"
                   :data="growth.data"
                   :settings="growth.settings"
                   :extend="growth.extend"></ve-line>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10"
            class="mt-20">
      <!-- 订购数量 -->
      <el-col :span="8">
        <div class="bg-white border-radius-8 h100 flex-4 flex-column">
          <div class="pt-15 pb-15 pl-20 pr-20 font-20">订购数量</div>
          <ve-histogram height="400px"
                        :extend="order.extend"
                        :legend-visible="false"
                        :data="order.data"></ve-histogram>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';
import { _Shopid } from '../config';

/**
 * status1: 待付款
 * status2: 待发货
 * status3: 待收货
 * status4: 全额退款
 * status5: 退货退款
 */
type AnalysisKeys = 'status1' | 'status2' | 'status3' | 'status4' | 'status5';
type Analysis = {
  [K in AnalysisKeys]: {
    label: string;
    value: number;
  };
};

type Turnover = {
  date: string;
  price: number;
  week: string;
};

/**
 * status1: 今日订购量
 * status2: 待付款
 * status3: 已付款
 * status4: 已退货
 */
type TodayKeys = 'status1' | 'status2' | 'status3' | 'status4';
type Today = { [K in AnalysisKeys]: number };

interface AnalysisData {
  analysis: Analysis;
  turnover: Turnover[];
  today: Today;
}

interface Chart<T = obj> {
  extend: obj;
  settings: obj;
  data: {
    columns: string[];
    rows: T[];
  };
}

type OrderData = {
  type: string;
  prop: TodayKeys;
  num: number;
};

@Component
export default class MarketAnalysis extends Vue {
  analysis: Analysis = {
    status1: { label: '待付款订单', value: 0 },
    status2: { label: '待发货订单', value: 0 },
    status3: { label: '待收货订单', value: 0 },
    status4: { label: '全额退款订单', value: 0 },
    status5: { label: '退款退货订单', value: 0 },
  };

  // TODO：加竖线
  growth: Chart = {
    extend: {
      grid: {
        left: '20',
        right: '20',
        top: '10',
        bottom: '3%',
        containLabel: true,
      },
      yAxis: { show: true },
      series: { smooth: false },
    },
    settings: {
      yAxisType: ['KMB'],
      labelMap: { week: '周次', price: '营业额' },
    },
    data: {
      columns: ['week', 'price'],
      rows: [
        // { 周次: '周一', 营业额: 3000 },
        // { 周次: '周二', 营业额: 6000 },
        // { 周次: '周三', 营业额: 4000 },
        // { 周次: '周四', 营业额: 5000 },
        // { 周次: '周五', 营业额: 4500 },
        // { 周次: '周六', 营业额: 5803 },
        // { 周次: '周日', 营业额: 3892 },
      ],
    },
  };

  order: Chart<OrderData> = {
    extend: {
      grid: {
        left: '20',
        right: '20',
        top: '6%',
        bottom: '10%',
        containLabel: true,
      },
    },
    settings: {
      labelMap: { week: '类别', num: '订购量' },
    },
    data: {
      columns: ['type', 'num'],
      rows: [
        { type: '今日订购量', num: 10, prop: 'status1' },
        { type: '待付款', num: 0, prop: 'status2' },
        { type: '已付款', num: 0, prop: 'status3' },
        { type: '已退货', num: 0, prop: 'status4' },
      ],
    },
  };

  getData() {
    const api = this.$api.merchant.market.analysis;
    this.$http.get<AnalysisData>(api, { shopid: _Shopid }).then((res) => {
      const { analysis = {}, turnover = [], today = {} } = res.data || {};
      Object.keys(analysis).forEach((k) => {
        if (k in this.analysis) {
          // @ts-ignore TODO: 这里的类型推论无法判断 k 属于 analysis
          this.analysis[k].value = analysis[k];
        }
      });
      this.growth.data.rows = turnover;
      this.order.data.rows.forEach((item) => {
        // @ts-ignore TODO: today 为{}时没有 key
        item.num = today[item.prop];
      });
    });
  }

  mounted() {
    this.getData();
  }
}
</script>
