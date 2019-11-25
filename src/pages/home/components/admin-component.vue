<template>

  <el-row :gutter="20">
    <el-col :span="12">
      <div class="home-title">平台运营</div>
      <div style="height:400px"
           class="border-radius-8 bg-white p-10 flex-column">
        <div v-for="(platform,index) in platforms"
             :key="index"
             :class="{'border-top':index>0}"
             class="flex-1 flex-wrap p-10">
          <div v-for="item in platform"
               :key="item.id"
               class="p-15 text-center flex-3 flex-column flex-jsa">
            <div class="font-primary font-18">{{item.num}}</div>
            <div class=" font-18 pb-10 pt-10">{{item.text}}</div>
            <div class="font-text-secondary">{{item.docs}}</div>
          </div>
        </div>

      </div>
    </el-col>
    <el-col :span="12">
      <div class="home-title">资金统计</div>
      <div style="height:400px"
           class="border-radius-8 bg-white p-20 flex-column">
        <div class="pt-5 pb-5 flex-jsb flex-ac">
          <div class="font-18">
            <span>钱包余额</span>
            <span class="ml-20 font-primary">&yen;888.88</span>
          </div>
          <span class="font-text-secondary">交易记录</span>
        </div>

        <div class="pt-20 flex-1 flex-column flex-jsb">
          <div class="bg-background-color-base mb-10 flex-1 flex">
            <div class="flex-1 flex-ac flex-column flex-jsa p-20">
              <div class="font-primary font-20">&yen;888.88</div>
              <div class="pt-5 font-text-secondary">总资产</div>
            </div>
            <div class="flex-1 flex-ac flex-column flex-jsa p-20">
              <div class="font-primary font-20">&yen;888.88</div>
              <div class="pt-5 font-text-secondary">总资产</div>
            </div>
          </div>
          <div class="bg-background-color-base mt-10 flex-1 flex">
            <div class="flex-1 flex-ac flex-column flex-jsa p-20">
              <div class="font-primary font-20">&yen;888.88</div>
              <div class="pt-5 font-text-secondary">总资产</div>
            </div>
            <div class="flex-1 flex-ac flex-column flex-jsa p-20">
              <div class="font-primary font-20">&yen;888.88</div>
              <div class="pt-5 font-text-secondary">总资产</div>
            </div>
          </div>
        </div>

      </div>
    </el-col>
  </el-row>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class HomeAdminComponent extends Vue {
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
}
</script>
<style lang="scss" >
.home {
  &-title {
    font-size: 20px;
    padding-bottom: 20px;
  }
}
</style>
