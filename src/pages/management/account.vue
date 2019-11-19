<template>
  <div class="management">
    <el-row :gutter="20">
      <el-col  v-for="item in 12" :key="item" :span="8">
        <div class="bg-white border-radius-8 p-15 mt-20">
          <div class="font-bold font-28">标题标题标题标题</div>
          <div class="font-bold font-22 mt-10">&yen;120.00 - &yen;200.00</div>
          <div class="mt-10 mb-10">
            介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍
          </div>
          <el-button type="primary">购买</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ManagementAccount extends Vue {}
</script>
