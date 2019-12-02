<template>
  <div class="order-send-detail bg-white border-radius-4 p-30 mb-20">
    <status :status="data.status"
            :time="data.time"></status>

    <div class="mt-30">
      <h3>确认交易详情</h3>
      <div class="flex-jsb font-info"
           style="width:60%">
        <span>订单编号：{{data.order.ordernumber}}</span>
        <span>创建时间：{{data.order.createtime}}</span>
        <span>订单类型：{{data.order.type}}</span>
      </div>
      <goods-table :header="header"
                   :list="list"></goods-table>
      <el-form v-if="isVirtual"
               ref="form"
               :model="form"
               size="small"
               class="mt-30"
               label-position="left">
        <el-form-item label="实收款："
                      prop="collection"
                      class="font-danger">
          <el-input v-model="form.collection"
                    type="number"></el-input>
        </el-form-item>
        <h3 class="mt-30">确认收货信息</h3>
        <el-form-item label="收货人姓名："
                      prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="收货人电话号码："
                      prop="phone">
          <el-input v-model="form.phone"
                    type="tel"></el-input>
        </el-form-item>
        <el-form-item label="收货地址："
                      prop="address">
          <el-input v-model="form.address"
                    style="width:50%"></el-input>
        </el-form-item>
        <el-form-item class="pt-20">
          <el-button type="primary"
                     class="pl-30 pr-30"
                     @click="handleSubmit">确认</el-button>
        </el-form-item>
      </el-form>
      <template v-else>
        <div class="mt-20 font-danger font-16">实收款：&yen; 280</div>
        <div class="mt-5 font-info">含运费：0.00</div>
        <div class="mt-40">
          <strong class="font-16">确认收货信息</strong>
          <p>收货地址：{{logisticsInfo}}</p>
          <el-button type="primary"
                     size="small"
                     class="mt-10"
                     @click="handleEditAddress">修改收货地址</el-button>
        </div>
        <div class="mt-40">
          <h3>选择物流服务</h3>
          <el-input v-model="awb"
                    placeholder="请输入运单号，在选择对应物流公司"
                    style="width:350px">
            <el-button slot="append"
                       :disabled="enableSubmit"
                       @click="handleSend">发货</el-button>
          </el-input>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import Mixin from '../mixin';
import Status from './status.vue';
import GoodsTable from '../goods-table.vue';
import { obj } from '@/lib/@types/sc-param.d';

const lodashString = require('lodash/string');

@Component({ components: { Status, GoodsTable } })
export default class OrderSendDetail extends Mixins(Mixin) {
  isVirtual = true;

  get id() {
    return this.$route.query.id;
  }

  data: obj = {
    name: '哎呦喂',
    phone: '12345678910',
    position: '浙江  杭州',
    status: 2,
    order: {
      ordernumber: '201909101622564',
      createtime: '12345678910',
      paytime: '2019-07-01  15:45',
      transactionNo: '201701234567894101235',
      payType: '支付宝',
      serialNumber: '123456789101112',
    },
    order_goods: [
      {
        title: '商品名称商品名称商品名称',
        size: '规格1：规格2',
        price: '125.00',
        num: 1,
        total_price: '￥140.00',
        image:
          'https://didulv.didu86.com/restaurant/storage/app/uploads/2019-11-04/3bed2e7bc036770f93bcd19335ad0868.jpg',
      },
    ],
    shop_goods_pay_price: '280.00',
    address: {
      username: '测试',
      phone: '18094714282',
      address_provinces: '浙江省',
      address_areas: '滨江区',
      address: '我桌信大厦31',
    },
  };

  get logisticsInfo() {
    const { username, phone, address_provinces, address_areas, address } = this.data.address;
    return `${username}，${phone}，${address_provinces}${address_areas}${address}`;
  }

  header = {
    title: '商品信息',
    size: '规格',
    price: '单价',
    num: '数量',
    total_price: '商品总价',
  };

  get list() {
    return this.data.order_goods || [];
  }

  getDetail() {
    const api = this.$api.merchant.order.show;
    const param = { uid: '', oid: '' };
    this.$http.get(api, param).then((res) => {
      console.log('res.data: ', res.data);
      this.data = res.data || {};
    });
  }

  handleEditAddress() {
    this.$router.push({ path: 'address', query: { id: this.id } });
  }

  awb = '';

  express = '';

  expressOptions = [];

  get enableSubmit() {
    return !this.awb;
  }

  async handleSend() {
    const api = this.$api.merchant.order.delivery;
    const param = { oid: this.id, name: this.express, number: this.awb };
    const Loading = this.$utils._Loading.show({ text: '发货中...' });
    try {
      const { status, message }: obj = await this.$http.get(api, param);
      this.$message.success(message);
      this.$nextTick(() => {
        this.$router.go(-1);
      });
    } catch (err) {
      this.$message.error(err.message);
    }
    Loading.close();
  }

  form = {
    collection: '',
    name: '',
    phone: '',
    address: '',
  };

  // 虚拟端缺接口
  async handleSubmit() {
    const api = this.$api.merchant.order.delivery;
    const param = { oid: this.id, name: this.express, number: this.awb };
    const Loading = this.$utils._Loading.show({ text: '发货中...' });
    try {
      const { status, message }: obj = await this.$http.get(api, param);
      this.$message.success(message);
      this.$nextTick(() => {
        this.$router.go(-1);
      });
    } catch (err) {
      this.$message.error(err.message);
    }
    Loading.close();
  }

  mounted() {
    // this.getDetail();
  }
}
</script>
<style lang="scss">
  .order-send-detail {
    .mt-40 {
      margin-top: 40px;
    }
    .font-danger {
      .el-form-item__label,
      .el-input__inner {
        color: inherit;
      }
    }
  }
</style>
