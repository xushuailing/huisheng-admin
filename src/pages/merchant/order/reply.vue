<template>
  <div class="order-reply bg-white border-radius-4 p-30 mb-20">
    <h3 class="mt-0">订单详情</h3>
    <div class="flex-jsb font-info"
         style="width:60%">
      <span>订单编号：{{data.id}}</span>
      <span>创建时间：{{data.createtime}}</span>
      <span>订单类型：{{data.type}}</span>
    </div>

    <goods-table :header="header"
                 :list="list"></goods-table>

    <div class="mt-20 font-danger font-16">实收款：280</div>
    <div class="mt-10 font-info font-12">运费：0.00</div>
    <div class="mt-30">
      <strong class="font-16">收货信息</strong>
      <p>收货地址：某某某，12345678910，浙江省杭州市滨江区卓信大厦</p>
    </div>
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
import { Component, Vue, Prop } from 'vue-property-decorator';
import GoodsTable from './goods-table.vue';
import { obj } from '@/lib/@types/sc-param.d';

@Component({ components: { GoodsTable } })
export default class OrderReply extends Vue {
  @Prop({ type: String, required: true })
  id!: string;

  $refs!: {
    form: any;
  };

  data = {
    id: '12345678910',
    createtime: '2017-07-04  15:36',
    type: '虚拟产品订单',
  };

  header = {
    info: '商品信息',
    size: '规格',
    price: '单价',
    num: '数量',
    amount: '商品总价',
  };

  get columns() {
    return Object.keys(this.header);
  }

  list: obj[] = [
    {
      info: '商品名称商品名称商品名称',
      size: '规格1：规格2',
      price: '125.00',
      num: 1,
      amount: '￥140.00',
      image:
        'https://didulv.didu86.com/restaurant/storage/app/uploads/2019-11-04/3bed2e7bc036770f93bcd19335ad0868.jpg',
    },
  ];

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

  // TODO: 缺接口
  getDetail() {
    const api = this.$api.merchant.order.show;
    const param = { gid: this.id, shopid: '' };
    this.$http.post(api, param).then((res) => {
      console.log('res: ', res);
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
