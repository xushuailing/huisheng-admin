<template>
  <div class="order-delivery bg-white border-radius-4 p-30 mb-20">
    <h3 class="mt-0">确认交易详情</h3>
    <div class="flex-jsb font-info">
      <span>订单编号：{{data.id}}</span>
      <span>创建时间：{{data.createtime}}</span>
      <!-- <span>订单类型：{{data.parameter}}</span> -->
    </div>

        <goods-table :header="header"
                     :list="list"></goods-table>

    <el-form ref="form"
             :model="form"
             :rules="rules"
             size="small"
             class="mt-30"
             label-position="left">
      <el-form-item label="实收款："
                    prop="collection"
                    class="font-danger">
        <el-input v-model="form.collection"
                  type="number"></el-input>
      </el-form-item>
      <h3 class="mt-0">确认收货信息</h3>
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
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import GoodsTable from '../goods-table.vue';
import { obj } from '@/lib/@types/sc-param.d';

@Component({ components: { GoodsTable } })
export default class OrderDelivery extends Vue {
  data = {
    id: '12345678910',
    createtime: '2017-07-04  15:36',
    parameter: '虚拟产品订单',
  };

  header = {
    info: '商品信息',
    price: '单价',
    num: '数量',
    amount: '商品总价',
  };

  list: obj[] = [
    {
      info: '商品名称商品名称商品名称',
      price: '125.00',
      num: 1,
      amount: '￥140.00',
      image:
        'https://didulv.didu86.com/restaurant/storage/app/uploads/2019-11-04/3bed2e7bc036770f93bcd19335ad0868.jpg',
    },
  ];

  form = {
    collection: '',
    name: '',
    phone: '',
    address: '',
  };

  rules = {};

  handleSubmit() {
    //
  }
}
</script>
<style lang='scss' scoped>
  .order-delivery {
    .table-header,
    .table-row {
      display: grid;
      grid-template-columns: 2fr repeat(3, 1fr);
      grid-template-rows: auto;
    }
  }
</style>
<style lang="scss">
  .order-delivery {
    .font-danger {
      .el-form-item__label,
      .el-input__inner {
        color: inherit;
      }
    }
  }
</style>
