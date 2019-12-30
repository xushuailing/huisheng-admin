<template>
  <el-dialog :visible.sync="dialogVisible"
             width="50%"
             center>
    <div slot="title">选择时间</div>
    <div class="flex-jc">
      <el-form label-position="left"
               style="width:60%">
        <el-form-item label="banner 价格：">{{price}}</el-form-item>
        <el-form-item label="选择购买时间：">
          <el-select v-model="value">
            <el-option v-for="month in 12"
                       :key="month"
                       :value="month"></el-option>
          </el-select>
          <span class="ml-5">个月</span>
        </el-form-item>
        <el-form-item label="总价格："><span class="font-danger">{{totalPrice}}</span></el-form-item>
      </el-form>
    </div>
    <span slot="footer"
          class="dialog-footer">
      <el-button type="primary"
                 @click="onConfirm">提交申请</el-button>
    </span>
  </el-dialog>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { _Shopid } from '../config';

@Component
export default class BuyBanner extends Vue {
  @Prop({ type: Boolean, required: true, default: false }) visible = false;

  @Prop({ type: [String, Number] }) id!: string | number;

  @Prop({ type: String }) type!: string;

  @Prop({ type: String, default: '' }) price!: string;

  value = null;

  get totalPrice() {
    return Number(this.value || 0) * Number(this.price);
  }

  dialogVisible = this.visible;

  @Watch('visible')
  handlerVisible(val: boolean) {
    this.dialogVisible = val;
  }

  @Watch('dialogVisible')
  handlerDialogVisible(val: boolean) {
    this.$emit('update:visible', val);
  }

  async onConfirm() {
    try {
      console.log('this.id :', this.id);
      const apis = this.$api.merchant.ads;
      const api = this.type === 'banner' ? apis.buyPromotion : apis.buyActivity;
      const idProp = this.type === 'banner' ? 'bannerid' : 'activity_id';
      await this.$http.get(api, { shopid: _Shopid, [idProp]: this.id, num: this.value });
      this.$message.success('已提交申请');
    } catch (error) {
      this.$message.error('提交申请失败');
      console.log('error :', error);
    }
    this.dialogVisible = false;
  }
}
</script>
