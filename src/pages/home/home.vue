<template>
  <div class="home">
    <div>
      <div class="home-statistics">
        <div class="home-title">新增数据统计</div>
        <el-row :gutter="20">
          <el-col :span='8'
                  v-for="item in statistics"
                  :key="item.id">
            <div class="p-15 bg-white flex-1 flex-jsb flex-ac border-radius-8">
              <div class="flex-ac ">
                <el-avatar :size="58"
                           shape="square"
                           :src="item.img"></el-avatar>
                <span class="font-28 ml-10 font-bold">{{item.num}}</span>
              </div>
              <span class="font-text-secondary">{{item.docs}}</span>
            </div>

          </el-col>
        </el-row>
      </div>
      <div class="mt-20">
        <div class="home-title">7天商家入驻数量统计</div>
        <div>
          <ve-line :data="line.chartData"
                   :settings="line.chartSettings"></ve-line>
        </div>
      </div>
      <el-row :gutter="20">
        <el-col class="mt-20"
                :span="12">
          <div class="home-title">平台运营</div>
          <div class="border-radius-8 bg-white p-10 "
               style="height:250px">
            <div v-for="(platform,index) in platforms"
                 :key="index"
                 :class="{'border-top':index>0}"
                 class="flex flex-wrap"
                 style="height:50%">
              <div v-for="item in platform"
                   :key="item.id"
                   class="p-10 text-center flex-3">
                <div class="font-primary font-18">{{item.num}}</div>
                <div class=" font-18 pb-10 pt-10">{{item.text}}</div>
                <div class="font-text-secondary">{{item.docs}}</div>
              </div>
            </div>

          </div>
        </el-col>
        <el-col class="mt-20"
                :span="12">
          <div class="home-title">资金统计</div>
          <div class="border-radius-8 bg-white p-15 flex-column"
               style="height:250px">
            <div class="pt-5 pb-5 flex-jsb flex-ac">
              <div class="font-18">
                <span>钱包余额</span>
                <span class="ml-20 font-primary">&yen;888.88</span>
              </div>
              <span class="font-text-secondary">交易记录</span>
            </div>
            <div class="pt-10 flex-1 flex-column flex-jsb">
              <div class="bg-background-color-base flex">
                <div class="flex-1 flex-ac  flex-column p-15">
                  <div class="font-primary font-20">&yen;888.88</div>
                  <div class="pt-5 font-text-secondary">总资产</div>
                </div>
                <div class="flex-1 flex-ac  flex-column p-15">
                  <div class="font-primary font-20">&yen;888.88</div>
                  <div class="pt-5 font-text-secondary">总资产</div>
                </div>
              </div>
              <div class="bg-background-color-base flex">
                <div class="flex-1 flex-ac flex-column p-15">
                  <div class="font-primary font-20">&yen;888.88</div>
                  <div class="pt-5 font-text-secondary">总资产</div>
                </div>
                <div class="flex-1 flex-ac flex-column p-15">
                  <div class="font-primary font-20">&yen;888.88</div>
                  <div class="pt-5 font-text-secondary">总资产</div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col class="mt-20"
                :span="12">
          <div class="home-title">消息中心</div>
          <div style="height:300px">
            <div class="pr-15 pl-15 bg-white border-radius-8">
              <div v-for="(item,index) in  messages"
                   :key="item.id"
                   :class="{'border-top':index>0}"
                   class="flex-ac pt-15 pb-15">
                <el-avatar :size="50"
                           :src="item.img"></el-avatar>
                <div class="ml-10">
                  <div class="font-bold font-18">{{item.name}}</div>
                  <div class="font-16">{{item.docs}}</div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col class="mt-20"
                :span="12">
          <div class="home-title">资金统计</div>
          <div style="height:300px"
               class="bg-white border-radius-8">
            <ve-histogram height="100%"
                          :extend="histogram.extend"
                          :legend-visible="false"
                          :data="histogram.chartData"></ve-histogram>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  statistics = [
    { id: 0, img: 'http://placehold.it/200x200', num: 200, docs: '描述' },
    { id: 1, img: 'http://placehold.it/200x200', num: 200, docs: '描述' },
    { id: 2, img: 'http://placehold.it/200x200', num: 200, docs: '描述' },
  ];

  messages = [
    { id: 0, img: 'http://placehold.it/200x200', name: '名字', docs: '描述' },
    { id: 1, img: 'http://placehold.it/200x200', name: '名字', docs: '描述' },
    { id: 2, img: 'http://placehold.it/200x200', name: '名字', docs: '描述' },
  ];

  platforms = [
    [
      { id: 0, text: '活跃人数', num: 200, docs: '描述' },
      { id: 1, text: '活跃人数', num: 200, docs: '描述' },
      { id: 2, text: '活跃人数', num: 200, docs: '描述' },
    ],
    [
      { id: 3, text: '活跃人数', num: 200, docs: '描述' },
      { id: 4, text: '活跃人数', num: 200, docs: '描述' },
      { id: 5, text: '活跃人数', num: 200, docs: '描述' },
    ],
  ];

  line = {
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
<style lang="scss" scoped>
.home {
  &-title {
    font-size: 20px;
    padding-bottom: 20px;
  }
}
</style>
