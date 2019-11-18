<template>
  <div>
    <!-- <sc-breadcrumb class="mb-10">
      <el-button type="primary">修改</el-button>
    </sc-breadcrumb> -->
    <div class='bg-white border-radius-8 container'>
      <div class="color-ebeef5 font-22">
        <img class="img"
             src="http://placehold.it/100x100">
        <p>亲爱的哎呦喂，您的身份</p>
        <h2>已通过验证</h2>
        <div class="line"></div>
        <div style="color:#808080;">
          请确保您账号绑定的身份信息真实有效，并确保账号为本人使用，请勿向他人装让，出租或借用账号
        </div>
      </div>
      <div class="content font-20">
        <p>认证信息：</p>
        <el-row class="mb-20"
                type="flex">
          <el-col :span="8">姓名：12222222</el-col>
          <el-col :span="8">电话：18672969766</el-col>
          <el-col :span="8">地址：湖北省武汉市东湖新技术开发区高新二路129号</el-col>
        </el-row>
        <el-row class="mb-20"
                type="flex">
          <el-col :span="8">证件号码：4207031993050463219</el-col>
          <el-col :span="8">认证通过实践：2019年11月11日 19:25:30</el-col>
        </el-row>
        <el-row class="mb-20"
                type="flex">
          <el-col :span="8">经营品类：店铺装修 - 平面设计</el-col>
          <el-col class="flex"
                  :span="8">营业执照：
            <el-image fit="contain"
                      style="width:200px;height:200px;"
                      src="http://placehold.it/200x100"
                      :preview-src-list="['http://placehold.it/200x100']"></el-image>
          </el-col>
        </el-row>
      </div>
      <!-- <sc-sku></sc-sku> -->
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class ShopAuth extends Vue {}
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  overflow: hidden;
}
.color-ebeef5 {
  position: relative;
  padding: 35px 100px;
  padding-left: 320px;
  background: #ebeef5;
  .img {
    width: 150px;
    height: 150px;
    position: absolute;
    border-radius: 100%;
    top: 50%;
    transform: translateY(-50%);
    left: 140px;
  }
  .line {
    background: #c0c4cc;
    width: 100%;
    height: 1px;
    margin-bottom: 40px;
  }
}
.content {
  padding: 30px 100px;
  padding-left: 140px;
}
</style>
<style>
.el-image-viewer__close {
  color: #fff !important;
}
</style>
