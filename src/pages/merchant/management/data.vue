<template>
  <div class="management">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="bg-white border-radius-8 mt-20">
          <div class="flex-jsb p-15">
            <div class="flex-column">
              <div>总资产（元）</div>
              <div class="mt-15 font-primary font-20 font-bold">&yen; 120.00</div>
            </div>
            <div class="flex-column">
              <el-link type="primary"
                       @click="toRecord">提现记录</el-link>
            </div>
          </div>
          <div class="p-15 border-top">
            <div class="mb-10">本年销售额： &yen;7899898 </div>
            <div class="mb-10">本月销售额： &yen;7899898</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="bg-white border-radius-8 mt-20">
          <div class="p-15">
            <div class="">成交量（月）</div>
            <div class="mt-15 font-primary font-20 font-bold">&yen;120.00</div>
          </div>
          <div class="p-15 border-top">
            <div class="mb-10">本年成交量：391230898</div>
            <div class="mb-10">本月成交量：391230898</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="bg-white border-radius-8 p-15 mt-20">
          <div class="mb-15">收入支出</div>
          <div class="mb-10">昨日收入：&yen; 0.00</div>
          <div class="mb-10">昨日支出：&yen; 0.00</div>
          <div class="mb-10">昨日收入笔数：0</div>
          <div class="mb-10">昨日支出笔数：0</div>
        </div>
      </el-col>
    </el-row>
    <div style="height:400px"
         class="bg-white border-radius-8 p-15 mt-20">
      <h2>近七日变化趋势（元）</h2>
      <el-radio-group v-model="trendType"
                      size="medium">
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

  trendOptions = [
    { label: '总资产', value: '0' },
    { label: '店铺收入', value: '1' },
    { label: '店铺支出', value: '2' },
  ];

  trendType = '0';

  toRecord() {
    this.$router.push('recode');
  }
}
</script>
