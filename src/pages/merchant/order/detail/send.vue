<template>
  <div class="order-send-detail bg-white border-radius-4 p-30 mb-20">
    <status :status="order.status"></status>

    <div class="mt-30">
      <h3>确认交易详情</h3>
      <div class="flex-jsb font-info"
           style="width:60%">
        <span>订单编号：{{order.ordernumber}}</span>
        <span>创建时间：{{order.createtime}}</span>
        <!-- <span>订单类型：{{data.order.type}}</span> -->
      </div>
      <goods-table :header="header"
                   :list="list"></goods-table>
      <div class="mt-20 font-danger font-16">实收款：{{price.payPrice?'&yen; '+price.payPrice:''}}</div>
      <div class="mt-5 font-info">含运费：{{price.freight}}</div>

      <div class="pt-10">
        <order-address :data="address"
                       class="pt-10"></order-address>

        <el-button type="primary"
                   size="small"
                   @click="handleEditAddress">修改收货地址</el-button>
      </div>
      <div class="mt-40">
        <h3>选择物流服务</h3>
        <sc-edit mode="page"
                 :api="api"
                 :config="config"
                 style="margin-left:-10px"
                 @emitEditComplete="onEditComplete">
        </sc-edit>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';
import { _Uid } from '../../config';
import Mixin from './mixin';
import Status from './components/status.vue';
import GoodsTable from '../goods-table.vue';
import OrderAddress from './components/address.vue';

// const _GroupBy = require('lodash/groupBy');

@Component({ components: { Status, GoodsTable, OrderAddress } })
export default class OrderSendDetail extends Mixins(Mixin) {
  get id() {
    return this.$route.query.id;
  }

  api = this.$api.merchant.order.delivery;

  data: obj = {};

  header = {
    title: '商品信息',
    size: '规格',
    price: '单价',
    num: '数量',
    total_price: '商品总价',
  };

  get price() {
    const order = this.data.order || {};
    const { shop_goods_pay_price = '', freight = '' } = order;
    return { payPrice: shop_goods_pay_price, freight };
  }

  handleEditAddress() {
    this.$router.push({ path: 'address', query: { id: this.id } });
  }

  expresses: obj[] = [];

  get config(): ScForm.Edit {
    return {
      type: 'senior',
      'label-width': '180px',
      params: { oid: this.id },
      requestMethod: 'get',
      formAttr: { 'label-position': 'left', 'label-width': '110px' },
      data: [
        [
          {
            label: '选择快递：',
            prop: 'name',
            handle: (data) => {
              console.log('this.expresses, data: ', this.expresses, data);

              const item = this.expresses.find((e) => e.id == data);
              return (item && item.name) || '';
            },
            tag: {
              tagType: 'select',
              options: this.getexpresses,
              attr: { placeholder: '请选择物流公司', filterable: true },
            },
          },
          {
            label: '输入快递单号：',
            prop: 'number',
            tag: { attr: { placeholder: '输入快递单号' } },
          },
        ],
      ],
    };
  }

  onEditComplete({ status }: any) {
    if (status) {
      this.$message.success('发货成功！');
      this.$router.go(-1);
    }
  }

  getexpresses() {
    return new Promise<obj[]>((resolve) => {
      this.$http
        .get(this.$api.merchant.order.expresses)
        .then((res) => {
          const options =
            res.data && res.data.map((e: obj) => ({ ...e, label: e.title, value: e.id }));
          // const arrObj = _GroupBy(res.data, 'name');
          // console.log(
          //   '%c重复数据',
          //   'color:#fff;background:#40b883;border-radius:5px;padding:2px 5px;',
          // );
          // const arr: any = [];
          // Object.keys(arrObj).forEach((k) => {
          //   if (arrObj[k].length > 1) {
          //     arr.push(...arrObj[k]);
          //   }
          // });
          // console.table(arr);

          this.expresses = options;
          resolve(options || []);
        })
        .catch((err) => {
          resolve([]);
          this.$utils._ResponseError(err);
        });
    });
  }

  getDetail() {
    const loading = this.$utils._Loading.show();
    const api = this.$api.merchant.order.show;
    const param = { uid: _Uid, oid: this.id };
    this.$http
      .get(api, param)
      .then((res) => {
        this.data = res.data || {};
      })
      .finally(() => {
        loading.close();
      });
  }

  mounted() {
    this.getDetail();
    this.getexpresses();
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
