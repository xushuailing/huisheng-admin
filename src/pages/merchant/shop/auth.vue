<template>
  <div>
    <sc-breadcrumb class="mb-10">
      <el-button type="primary"
                 @click="handleEdit">修改</el-button>
    </sc-breadcrumb>
    <div class='bg-white border-radius-8 container'>
      <div class="color-ebeef5 font-22">
        <img class="img border-radius-100"
             width="150"
             height="150"
             :src="data.com_logo">
        <p>亲爱的{{data.username}}，您的身份</p>
        <h2>{{getStatus(data.status)}}</h2>
        <div class="line"></div>
        <div class="font-info">
          请确保您账号绑定的身份信息真实有效，并确保账号为本人使用，请勿向他人装让，出租或借用账号
        </div>
      </div>
      <div class="content font-20">
        <p>认证信息：</p>
        <el-row class="mb-20"
                type="flex">
          <el-col :span="8">姓名：{{data.username}}</el-col>
          <el-col :span="8">电话：{{data.com_phone}}</el-col>
          <el-col :span="8">认证通过时间：{{data.opentime}}</el-col>
        </el-row>
        <el-row class="mb-20"
                type="flex">
          <el-col :span="8">证件号码：{{data.number}}</el-col>
          <el-col :span="8">经营品类：{{getType(data.typeid)}}</el-col>
        </el-row>
        <el-row class="mb-20"
                type="flex">
          <el-col class="flex"
                  :span="8">营业执照：
            <el-image fit="contain"
                      style="width:200px;height:200px;"
                      :src="data.license"
                      :preview-src-list="[data.license]"></el-image>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { _Uid, _Shopid } from '../config';
import { State } from '@/store/common';
import { obj } from '@/lib/@types/sc-param.d';

const STATUS = {
  1: '提交申请，审核中',
  2: '审核通过',
  3: '审核不通过',
  4: '完成保证金支付',
  5: '下架，禁用账号',
};

@Component
export default class ShopAuth extends Vue {
  @(namespace('common').Action) getShopTypes!: () => Promise<State['shopTypes']>;

  data = {};

  typeList: obj[] = [];

  async getDetail() {
    const loading = this.$utils._Loading.show();
    try {
      const api = this.$api.merchant.shop.show;
      const params = { uid: _Uid, shopid: _Shopid };
      const res = await this.$http.get(api, params);
      if (res.status) {
        this.data = res.data;
      } else {
        this.$message.error('获取数据失败');
      }
    } catch (error) {
      this.$utils._ResponseError(error);
    }
    loading.close();
  }

  getStatus(status: keyof typeof STATUS) {
    return STATUS[status];
  }

  getType(id: string) {
    const item = this.typeList.find((v) => v.value === id);
    return item ? item.label : '';
  }

  handleEdit() {
    this.$router.push('/shop/baseinfo');
  }

  async mounted() {
    this.getDetail();
    this.typeList = await this.getShopTypes();
  }
}
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
      object-fit: cover;
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
