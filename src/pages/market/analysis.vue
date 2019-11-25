<template>
  <div class="flex">
    <!-- 营销分析 -->
    <div class="bg-white border-radius-8 h100 flex-1 flex-column">
      <div class="pt-15 pb-15 pl-20 pr-20 font-20">营销分析</div>
      <div v-for="(item,key) in analysis"
           :key="key"
           class="border-top flex p-20">
        <span class="flex-1">{{item.label}}</span>
        <span class="flex-1 font-primary">{{item.value}}</span>
      </div>
    </div>

    <!-- 增长趋势 -->
    <div class="ml-10 pb-10 bg-white border-radius-8 flex-2 flex-column">
      <div class="p-15 mb-10 border-bottom font-16">营业额增长趋势</div>
      <ve-line height="290px"
               :legend-visible="false"
               :data="growth.data"
               :settings="growth.settings"
               :extend="growth.extend"></ve-line>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class MarketAnalysis extends Vue {
  analysis = {
    none1: { label: '待付款订单', value: '123455' },
    none2: { label: '待发货订单', value: '123455' },
    none3: { label: '待收货订单', value: '123455' },
    none4: { label: '全额退款订单', value: '123455' },
    none5: { label: '退款退货订单', value: '123455' },
  };

  // TODO：加竖线
  growth = {
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
    },
    data: {
      columns: ['周次', '营业额'],
      rows: [
        { 周次: '周一', 营业额: 3000 },
        { 周次: '周二', 营业额: 6000 },
        { 周次: '周三', 营业额: 4000 },
        { 周次: '周四', 营业额: 5000 },
        { 周次: '周五', 营业额: 4500 },
        { 周次: '周六', 营业额: 5803 },
        { 周次: '周日', 营业额: 3892 },
      ],
    },
  };
}
</script>
<style lang='scss' scoped>
  .MarketAnalysis {
  }
</style>
