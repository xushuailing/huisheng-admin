<template>
  <div class="home-line">
    <div class="home-title">7天商家入驻数量统计</div>
    <div class="bg-white border-radius-8">
      <ve-line :data="admin.chartData"
               :settings="admin.chartSettings"></ve-line>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class HomeLine extends Vue {
  admin = {
    chartSettings: {
      area: true,
      xAxisType: 'time',
    },

    chartData: {
      columns: ['日期', '访问用户'],
      rows: [
        { 日期: '2018-01-01', 访问用户: 1393 },
        { 日期: '2018-01-02', 访问用户: 3530 },
        { 日期: '2018-01-03', 访问用户: 2923 },
        { 日期: '2018-01-05', 访问用户: 1723 },
        { 日期: '2018-01-10', 访问用户: 3792 },
        { 日期: '2018-01-20', 访问用户: 4593 },
      ],
    },
  };
}
</script>
