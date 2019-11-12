<template>
  <div class="advdetail">
    <el-row :gutter="20">
      <el-col v-for="item in 12"
              :key="item"
              :span="12">
        <div class="bg-white border-radius-8 p-15 mt-20 banner">
          <div class="banner-item mt-10">
            <span class="label">推广名称:</span>
            <span class="content">首页banner</span>
          </div>
          <div class="banner-item mt-10">
            <span class="label">推广种类:</span>
            <span class="content">首页banner</span>
          </div>
          <div class="banner-item mt-10">
            <span class="label">价格:</span>
            <span class="content">首页banner</span>
          </div>
          <div class="banner-item mt-10">
            <span class="label">有效期:</span>
            <span class="content">首页banner</span>
          </div>
          <div class="banner-item mt-10">
            <span class="label">banner图片:</span>
            <span class="content">首页banner</span>
          </div>
          <div class="banner-item mt-10">
            <span class="label">商品ID:</span>
            <span class="content">首页banner</span>
          </div>
          <el-button class="mt-10" type="primary">上传信息</el-button>
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
.banner {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.banner-item {
  width: 100%;
  display: flex;
}
.label {
  width: 50%;
  text-align: right;
  padding-right: 5px;
}
.content {
  width: 50%;
  padding-left: 5px;
}
</style>
