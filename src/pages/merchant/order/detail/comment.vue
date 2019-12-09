<template>
  <div class="order-reply bg-white border-radius-4 p-30 mb-20">
    <h3 class="mt-0">订单详情</h3>
    <div class="flex-jsb font-info"
         style="width:60%">
      <span>订单编号：{{order.ordernumber}}</span>
      <span>创建时间：{{order.createtime}}</span>
    </div>

    <goods-table :header="header"
                 :list="list"></goods-table>

    <div class="mt-20 font-danger font-16">实收款：{{price.payPrice}}</div>
    <div class="mt-10 font-info font-12">运费：{{price.freight}}</div>

    <address title="收货信息"
             :data="address"></address>
    <div class="mt-30">
      <strong class="font-16">评价详情：</strong>
      <span>4星</span>
    </div>

    <el-form ref="form"
             :model="form"
             :rules="rules"
             size="small"
             class="mt-30"
             label-position="left">
      <el-form-item label=""
                    prop="reply">
        <el-input v-model="form.reply"
                  type="textarea"
                  :rows="8"
                  placeholder="请输入回复内容"></el-input>
      </el-form-item>
      <el-form-item class="pt-20">
        <el-button type="primary"
                   class="pl-30 pr-30"
                   @click="handleSubmit">回复</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';
import GoodsTable from '../goods-table.vue';
import GetValue from '../mixin';
import Detail from './mixin';

@Component({ components: { GoodsTable } })
export default class OrderReply extends Mixins(Detail, GetValue) {
  $refs!: {
    form: any;
  };

  header = {
    info: '商品信息',
    size: '规格',
    price: '单价',
    num: '数量',
    amount: '商品总价',
  };

  get price() {
    const order = this.data.order || {};
    const { shop_goods_pay_price = '', freight = '' } = order;
    return { payPrice: shop_goods_pay_price, freight };
  }

  form = {
    reply: '',
  };

  rules = {
    reply: { required: true, message: '请输入回复内容', trigger: 'blur' },
  };

  handleSubmit() {
    this.$refs.form.validate((valid: boolean) => {
      if (valid) {
        this.submit();
      } else {
        this.$message.error('请输入回复内容');
      }
    });
  }

  submit() {
    const api = this.$api.merchant.order.comment.reply;
    const param = { id: this.id, reply_content: this.form.reply };
    this.$http
      .get(api, param)
      .then((res: obj) => {
        if (res.status) {
          this.$message.success('回复成功');
        } else {
          this.$message.error(res.message);
        }
      })
      .catch((err) => {
        this.$utils._ResponseError(err);
      });
  }

  getDetail() {
    const api = this.$api.merchant.order.comment.show;
    const param = { id: this.id };
    this.$http.get(api, param).then((res) => {
      this.data = res.data || {};
    });
  }

  mounted() {
    this.getDetail();
  }
}
</script>
<style lang='scss' scoped>
  .order-reply {
    .table-header,
    .table-row {
      display: grid;
      grid-template-columns: 2fr repeat(4, 1fr);
      grid-template-rows: auto;
    }
  }
</style>
