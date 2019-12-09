<template>
  <div class="">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="bg-white border-radius-8 p-15">
          <div class="font-22">{{info.name}}</div>
          <div class="mt-20 flex-jsb">
            <span class="font-20">本月收益：&yen;{{info.income}}</span>
            <el-button class="font-primary"
                       type="text"
                       @click="showDetail">查看明细</el-button>
          </div>
          <div class="mt-10 pt-5 border-top">
            <div class="mt-10">
              <span class="mr-30">剩余黄金会员：</span>
              <span><b class="font-primary">{{info.gold}}</b>/20</span>
            </div>
            <div class="mt-10">
              <span class="mr-30">剩余钻石会员：</span>
              <span><b class="font-primary">{{info.diamond}}</b>/20</span>
            </div>
            <div class="mt-10">
              <span class="mr-30">剩余铂金会员：</span>
              <span><b class="font-primary">{{info.platinum}}</b>/20</span>
            </div>
            <div v-if="isAgent"
                 class="mt-10">
              <span class="font-info mr-30">我的上级代理：</span>
              <span>{{info.agent}}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="bg-white border-radius-8 p-15">
          <el-radio-group v-model="trendType"
                          size="mini">
            <el-radio-button v-for="(item,i) in trendOptions"
                             :key="i"
                             :label="item.value">{{item.label}}</el-radio-button>
          </el-radio-group>
          <ve-histogram height="200px"
                        :extend="histogram.extend"
                        :legend-visible="false"
                        :data="histogram.chartData"></ve-histogram>
        </div>
      </el-col>
    </el-row>

    <sc-min-table stripe
                  ref="table"
                  class="mt-30"
                  :columns="columns"
                  :columns-props="{align:'center'}"
                  :table-config="tableConfig">
    </sc-min-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { _Uid } from '../config';

@Component
export default class Vip extends Vue {
  userInfo = this.$utils._Storage.get('user_info');

  isAgent = true;

  info = {
    name: '黄金会员',
    income: '4587.00',
    gold: '10',
    diamond: '10',
    platinum: '10',
    agent: '一级代理 — 哎呦喂',
  };

  histogram = {
    extend: {
      grid: {
        left: '20',
        right: '20',
        top: '15%',
        bottom: '0',
        containLabel: true,
      },
      yAxis: { show: true },
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
    { label: '日成交额', value: '0' },
    { label: '周成交额', value: '1' },
    { label: '月成交额', value: '2' },
  ];

  trendType = '0';

  get columns(): ScTable.Columns {
    return [
      { label: '会员头像', prop: 'avatarurl', width: 100, special: 'img' },
      { label: '名称', prop: 'nickname' },
      { label: '会员类型', prop: 'member_name' },
      {
        label: '会员金额',
        prop: 'money',
        formater: (row, col) => (row[col.prop] ? `￥${row[col.prop]}` : ''),
      },
      {
        label: '佣金比例',
        prop: 'divide_comparisons',
        formater: (row, col) => `${row[col.prop]}%`,
      },
      { label: '创建时间', prop: 'createtime' },
    ];
  }

  tableConfig: ScTable.TableConfig = {
    api: this.$api.merchant.member,
    index: { uid: _Uid },
  };

  showDetail() {
    this.$router.push('list');
  }
}
</script>
