<template>
  <div class="advdetail">
    <el-row :gutter="20">
      <el-col v-for="item in 12"
              :key="item"
              :span="12">
        <div class="bg-white border-radius-8 p-15 mt-20 banner pt-30">
          <div v-for="a in list"
               :key="a.label"
               class="banner-item mb-20">
            <span class="label">{{a.label}}</span>
            <span class="content">{{a.value}}</span>
          </div>
          <el-button class="mb-20"
                     type="primary"
                     @click="onUpload">上传信息</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Advertisement extends Vue {
  list = [
    { label: '推广名称：', value: '首页banner' },
    { label: '推广种类：', value: '首页banner' },
    { label: '价格：', value: '首页banner' },
    { label: '有效期：', value: '首页banner' },
    { label: 'banner图片：', value: '首页banner' },
    { label: '商品ID：', value: '首页banner' },
  ];

  onUpload() {
    this.$router.push('upload');
  }
}
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
