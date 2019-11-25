<template>
  <div class="sc-dialog"
       ref="scDialog"
       :data-uid="_uid"
       v-if="dialogVisible">
    <div :class="['sc-dialog_box']">
      <el-dialog :class="[isImage ? 'flex-jc pt-25 sc-dialog_isImage' : 'flex-jc-ac']"
                 v-bind="attrs"
                 v-on="listeners"
                 :visible.sync="dialogVisible">
        <div slot="title"
             ref="scDialogTitle"
             class="sc-dialog_title">
          <slot name="title">
            <span class="font-17">{{ header.title }}</span>
            <span style="color:#333;"
                  :class="['font-12', { 'ml-10': header.desc }]">{{
              header.desc
              }}</span>
          </slot>

        </div>
        <div class="sc-dialog_center">
          <slot name="conter"></slot>
          <slot name="center"></slot>
          <slot></slot>
        </div>
        <span slot="footer">
          <slot name="footer"></slot>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

@Component({ name: 'ScDialog' })
export default class ScDialog extends Vue {
  @Prop({ required: true, type: Boolean })
  visible!: boolean;

  @Prop({ type: Object, default: () => ({}) })
  header!: obj;

  dialogVisible = this.visible;

  get attrs() {
    const data = {
      'close-on-click-modal': false,
      'lock-scroll': true,
      'custom-class': 'sc-dialog_main sc-dialog_full',
      'destroy-on-close': true,
    };
    return Object.assign({}, data, this.$attrs);
  }

  get listeners() {
    return this.$listeners;
  }

  get isImage() {
    return this.$attrs['custom-class'] === 'sc-dialog__img';
  }

  @Watch('visible')
  handleVisible(val: boolean) {
    if (val) this.$nextTick(this.init);
    this.dialogVisible = val;
  }

  @Watch('dialogVisible')
  handleDialogVisible(val: boolean) {
    this.$emit('update:visible', val);
  }

  init(isLoad = false) {}

  mounted() {}
}
</script>


<style lang='scss'>
.sc-dialog {
  &__img {
    width: min-content;
    max-width: 100%;
    background-color: transparent;
    box-shadow: none;
    .el-dialog {
      &__footer {
        padding: 0;
      }
      &__header {
        padding: 0;
        .el-dialog__headerbtn {
          top: -25px;
          right: -25px;
        }
      }
      &__body {
        font-size: 0;
        text-align: center;
        padding: 0;
        background-color: #fff;
        border-radius: 10px;

        .sc-dialog_center {
          display: inline-block;
        }
        img {
          max-height: 60vh;
          max-width: 70vw;
        }
      }
    }
    .el-icon-close {
      // font-size: 24px;
      color: #fff;
    }
  }
}
</style>
