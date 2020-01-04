<template>
  <div class="management">
    <el-row>
      <el-col :span="12">
        <div class="bg-white border-radius-8">
          <div class="flex-jsb p-15">
            <div class="flex-column">
              <div>账户余额</div>
              <div class="mt-15 font-primary font-20 font-bold">&yen; {{money.total_money}}</div>
            </div>
            <div class="flex-column flex-jsb">
              <el-link type="primary"
                       @click="toCheck">提现审核</el-link>
              <el-link type="primary"
                       @click="toRecord">提现记录</el-link>
            </div>
          </div>
          <div class="p-15 border-top">
            <div class="mb-10">总成交量： &yen;{{money.total_number}}</div>
            <div class="mb-10">本月成交量： &yen;{{money.month_number}}</div>
            <div class="mb-10">本周成交量： &yen;{{money.week_number}}</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div style="height:400px"
         class="bg-white border-radius-8 p-15 mt-20">
      <el-radio-group v-model="trendType"
                      size="medium"
                      @change="onToggleData">
        <el-radio-button v-for="(item,i) in trendOptions"
                         :key="i"
                         :label="item.value">{{item.label}}</el-radio-button>
      </el-radio-group>
      <ve-histogram height="100%"
                    :extend="histogram.extend"
                    :legend-visible="false"
                    :dataEmpty="histogram.dataEmpty"
                    :loading="histogram.loading"
                    :data="histogram.chartData"></ve-histogram>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

const columns = ['日期', '交易量'];

@Component
export default class ManagementData extends Vue {
  histogram = {
    extend: {
      series: {
        label: { show: true, position: 'top' },
      },
    },
    chartData: {
      columns,
      rows: [],
    },
    loading: true,
    dataEmpty: true,
  };

  money = {
    total_number: 0,
    month_number: 0,
    week_number: 0,
    year_number: 0,
    total_money: 0,
    list: null,
  };

  trendOptions = [
    { label: '日成交量', value: 'day' },
    { label: '月成交量', value: 'month' },
    { label: '年成交量', value: 'year' },
  ];

  trendType = this.trendOptions[0].value;

  mounted() {
    this.getData();
  }

  toRecord() {
    this.$router.push('record');
  }

  toCheck() {
    this.$router.push('check');
  }

  onToggleData(data: any) {
    if (this.money.list) {
      this.setHistogram(this.money.list![data]);
    }
  }

  async getData() {
    const api = this.$api.admin.management.show;
    const { data } = await this.$http.get(api);

    this.money = data;

    this.setHistogram(data.list.day);
  }

  setHistogram(data: any) {
    const label = data[7] as string[];
    const val = data;
    const num = 6;
    const rows = [];

    for (let i = 0; i < num; i++) {
      rows.push({ [columns[0]]: label[i], [columns[1]]: val[i] });
    }

    this.$set(this.histogram.chartData, 'rows', rows);

    this.histogram.loading = false;

    this.histogram.dataEmpty = !rows.length;
  }
}
</script>
