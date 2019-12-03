<template>
  <div class="order-return-detail bg-white border-radius-4 p-30 mb-20">
    <status :status="data.status"
            :time="data.time"></status>

    <div class="mt-30">
      <h3>订单详情</h3>
      <div class="flex-jsb font-info"
           style="width:60%">
        <span>订单编号：{{data.order.ordernumber}}</span>
        <span>创建时间：{{data.order.createtime}}</span>
        <span>订单类型：{{data.order.type}}</span>
      </div>
      <goods-table :header="header"
                   :list="list"></goods-table>

      <h3 class="mt-30">买家详情</h3>
      <p>{{logisticsInfo}}</p>

      <el-form ref="form"
               :model="form"
               size="small"
               class="mt-30"
               label-position="left">
        <el-form-item label="申请退款理由："
                      prop="refund_reason"
                      class="font-bold font-danger">
          <el-input v-model="form.refund_reason"
                    type="number"
                    placeholder="请输入申请退款理由"></el-input>
        </el-form-item>
        <div class="font-primary font-bold">付款方式：{{data.pay_type}}</div>
        <div class="mt-30 pt-20 font-danger font-16">实收款：￥{{data.pay_price}}</div>
        <div class="mt-5 font-info">运费：{{data.freight}}</div>
        <el-form-item class="mt-30 font-danger"
                      label="应退款："
                      prop="yuan_price">
          <el-input v-model="form.yuan_price"
                    type="number"
                    placeholder="请输入应退款"></el-input>
        </el-form-item>
        <el-form-item class="mt-30 pt-20 font-16">
          <el-button type="primary"
                     class="pl-30 pr-30"
                     @click="handleReturn">退款</el-button>
        </el-form-item>
      </el-form>
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
export default class OrderReturnDetail extends Mixins(Mixin) {
  get id() {
    return this.$route.query.id;
  }

  data: obj = {
    status: null,
    time: '72:00:00',
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
    refund_reason: '不想要了',
    username: '测试',
    phone: '18094714282',
    address_provinces: '浙江省',
    address_areas: '滨江区',
    address: '我桌信大厦31',
    pay_type: 2,
    pay_price: '70.21',
    freight: '10',
  };

  get logisticsInfo() {
    const { username, phone, address_provinces, address_areas, address } = this.data;
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

  // TODO: 缺接口
  async handleReturn() {
    const api = this.$api.merchant.order.pay;
    const param = { ...this.form, oid: this.id, uid: '' };
    const Loading = this.$utils._Loading.show({ text: '退货中...' });
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
    refund_reason: '',
    yuan_price: '',
  };

  async handlePay() {
    const api = this.$api.merchant.order.pay;
    const param = { ...this.form, oid: this.id, uid: '' };
    const Loading = this.$utils._Loading.show({ text: '确认中...' });
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
  .order-return-detail {
    .font-danger {
      .el-form-item__label,
      .el-input__inner {
        color: inherit;
      }
    }
    .font-16 {
      .el-form-item__label {
        font-size: 16px;
      }
    }
  }
</style>
