<template>
  <div class="management">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="bg-white border-radius-8 mt-20">
          <div class="p-15">
            <div class="">总资产（元）</div>
            <div class=" mt-10">&yen;120.00</div>
          </div>
          <div class="p-15">
            <div class="mb-10">
              本年销售额： &yen;7899898
            </div>
            <div class="mb-10">
              本月销售额： &yen;7899898
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="bg-white border-radius-8 mt-20">
          <div class="p-15">
            <div class="">成交量（月）</div>
            <div class=" mt-10">&yen;120.00</div>
          </div>
          <div class="p-15">
            <div class="mb-10">
              本年成交量：391230898
            </div>
            <div class="mb-10">
              本月成交量：391230898
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="bg-white border-radius-8 p-15 mt-20">
          <div class="">收入支出</div>
          <div class="mt-10 mb-10">
            昨日收入：&yen; 0.00
          </div>
          <div class="mt-10 mb-10">
            昨日支出：&yen; 0.00
          </div>
          <div class="mt-10 mb-10">
            昨日收入笔数：0
          </div>
          <div class="mt-10 mb-10">
            昨日支出笔数：0
          </div>
        </div>
      </el-col>
    </el-row>
    <div style="height:400px" class="bg-white border-radius-8 p-15 mt-20">
      <h2>近七日变化趋势（元）</h2>
      <ve-histogram height="100%"
                    :extend="histogram.extend"
                    :legend-visible="false"
                    :data="histogram.chartData"></ve-histogram>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ManagementData extends Vue {
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
}
</script>
