<template>

  <el-dialog :visible.sync="dialogVisible">
    <div slot="title"
         class="text-center">
      {{title}}
    </div>
    <div>
      <el-input type="textarea"
                :autofocus="{ minRows: 4, maxRows: 6 }"
                :rows="4"
                :placeholder="placeholder"
                v-model="value" />
    </div>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary"
                 @click="onConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class DialogTextarea extends Vue {
  @Prop({ type: Boolean, required: true, default: false }) visible = false;

  @Prop({ type: String, required: true }) prop!: string;

  @Prop({ type: Object, default: () => ({}) }) id!: { [x: string]: number | string };

  @Prop({ type: String, required: true }) api!: string;

  @Prop({ type: String, default: '' }) title!: string;

  @Prop({ type: String, default: '' }) placeholder!: string;

  @Prop({ type: String, default: '' }) msg!: string;

  value = '';

  dialogVisible = this.visible;

  @Watch('visible')
  handlerVisible(val: boolean) {
    this.dialogVisible = val;
  }

  @Watch('dialogVisible')
  handlerDialogVisible(val: boolean) {
    this.$emit('update:visible', val);
  }

  onCancel() {
    this.dialogVisible = false;
    this.$emit('onCancel');
  }

  async onConfirm() {
    try {
      console.log('this.id :', this.id);
      await this.$http.get(this.api, { [this.prop]: this.value, ...this.id });
      this.$emit('onConfirm', true);
      this.$message.success(`${this.msg}成功`);
    } catch (error) {
      this.$emit('onError', false);
      this.$message.error(`${this.msg}失败`);
      console.log('error :', error);
    }
    this.dialogVisible = false;
  }
}
</script>
