<template>
  <div class="home-histogram">
    <div class="home-title">资金统计</div>
    <div style="height:300px"
         class="bg-white border-radius-8">
      <ve-histogram height="100%"
                    :extend="admin.extend"
                    :legend-visible="false"
                    :data="admin.chartData"></ve-histogram>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class HomeHistogram extends Vue {
  admin = {
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
}
</script>
