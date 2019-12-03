<template>
  <div class="adv-detail">
    <el-row :gutter="20">
      <el-col  v-for="item in 12" :key="item" :span="24">
        <div class="adv-detail__item bg-white border-radius-8 p-15 mt-20">
          <el-button type="primary" size="small" class="adv-detail__buy">购买</el-button>
          <div class="font-bold font-28">标题标题标题标题</div>
          <div class="font-bold font-22 mt-10">&yen;120.00 - &yen;200.00</div>
          <div class="mt-10 mb-10">
            有效期：2019.08.29 - 2019.09.29
          </div>
          <div class="mt-10 mb-10">
            介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Advertisement extends Vue {}
</script>
<style lang="scss" scoped>
.adv-detail{
  &__item{
    position: relative;
  }
  &__buy{
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>
