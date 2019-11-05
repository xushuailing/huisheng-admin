<template>
  <div class="sc-dialog"
       ref="scDialog"
       :data-uid="_uid"
       v-if="dialogVisible">
    <div :class="['sc-dialog_box', { 'sc-dialog_isFull': isFull }]">
      <el-dialog :class="[isImage ? 'flex-jc pt-25 sc-dialog_isImage' : 'flex-jc-ac']"
                 v-bind="attrs"
                 :fullscreen="isFull"
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
          <button type="button"
                  v-if="Full"
                  @click="onDialogFull"
                  class="el-dialog__headerbtn title_full ">
            <i :class="['el-dialog__close', 'iconfont', 'dialog__close', icon]"></i>
          </button>
        </div>
        <div :style="{ 'max-height': dialogHeight }"
             class="sc-dialog_center">
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
import $ from 'jquery';
import { obj } from '@/lib/@types/sc-param.d';

@Component({ name: 'ScDialog' })
export default class ScDialog extends Vue {
  @Prop({ required: true, type: Boolean })
  visible!: boolean;

  @Prop({ type: Object, default: () => ({}) })
  header!: obj;

  @Prop({ type: Boolean, default: true })
  isMove!: boolean;

  @Prop({ type: Boolean, default: false })
  isDefaultFull!: boolean;

  @Prop({ type: Boolean, default: true })
  isOpenFull!: boolean;

  dialogVisible = this.visible;

  isFull = this.isDefaultFull;

  dialogHeight: string = '';

  flag = this.isDefaultFull;

  get attrs() {
    const data = {
      'modal-append-to-body': false,
      'close-on-click-modal': false,
      'lock-scroll': true,
      modal: false,
      'custom-class': 'sc-dialog_main sc-dialog_full',
    };
    return Object.assign({}, data, this.$attrs, { top: '0vh' });
  }

  get listeners() {
    return this.$listeners;
  }

  get icon() {
    let icon = 'icon-max';
    if (this.isFull) {
      icon = 'icon-min';
    }
    return icon;
  }

  get Full() {
    const customClass = this.$attrs['custom-class'];
    const isImg = customClass && !customClass.includes('sc-dialog__img');

    return isImg ? false : this.isOpenFull;
  }

  get isImage() {
    return this.$attrs['custom-class'] === 'sc-dialog__img';
  }

  @Watch('visible')
  handleVisible(val: boolean) {
    if (val) this.$nextTick(this.init);
    this.dialogVisible = val;
    if (!val) this.isFull = false;
  }

  @Watch('dialogVisible')
  handleDialogVisible(val: boolean) {
    if (val && this.isDefaultFull) this.flag = val;
    this.$emit('update:visible', val);
  }

  init(isLoad = false) {
    if (!isLoad) {
      const el =
        document.querySelector('#appMain') && document.querySelector('#appMain')!.children[0];
      if (!el) return;
      if (this.$el) el.appendChild(this.$el);
    }

    const scrollTop = $('.app-wrapper').scrollTop() || 0;

    if (this.isImage) {
      this.$nextTick(() => {
        const imgdialogDom = this.getDom('.el-dialog.sc-dialog__img');
        const center = this.getDom('.el-dialog.sc-dialog__img .sc-dialog_center');

        if (imgdialogDom) {
          const Header_Tabs_Height = 60 + 50;
          const header = scrollTop > Header_Tabs_Height ? Header_Tabs_Height : 60;
          const centerHeightHalf = center.offsetHeight / 2;
          const results = centerHeightHalf + header - scrollTop;
          imgdialogDom.style.marginTop = `calc(50vh - ${results}px)`;
        }
      });
    }

    const dialogDom = this.getDom('.sc-dialog_main.el-dialog');
    const dialogHeader = this.getDom('.sc-dialog_main .el-dialog__header');
    if (!dialogDom) return;

    this.dialogMaxHeight();

    dialogHeader.style.cursor = 'move';

    const dialogDomTop = this.flag ? `calc(0vh + ${scrollTop}px)` : `calc(7vh + ${scrollTop}px)`;

    dialogDom.style.top = dialogDomTop;

    if (this.isDefaultFull && this.flag) {
      this.onDialogFull();
      this.flag = false;
      return;
    }

    const getStyle = (() => (dom: Element, attr: any) => window.getComputedStyle(dom)[attr])();

    let disX: number;
    let disY: number;
    let styL: string | number;
    let styT: string | number;
    dialogHeader.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      disX = e.clientX - dialogHeader.offsetLeft;
      disY = e.clientY - dialogHeader.offsetTop;

      // 获取到的值带px 正则匹配替换
      styL = getStyle(dialogDom, 'left');
      styT = getStyle(dialogDom, 'top');

      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.replace(/%/g, '') / 100);
        styT = +document.body.clientHeight * (+styT.replace(/%/g, '') / 100);
      } else {
        styL = +styL.replace(/\px/g, '');
        styT = +styT.replace(/\px/g, '');
      }

      document.onmousemove = (ee) => {
        // 通过事件委托，计算移动的距离
        const left = ee.clientX - disX;
        const top = ee.clientY - disY;

        // 移动当前元素
        dialogDom.style.left = `${left + Number(styL)}px`;
        dialogDom.style.top = `${top + Number(styT)}px`;
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }

  onDialogFull() {
    const dialogHeader = this.getDom('.sc-dialog_main .el-dialog__header');
    const dialogDom = this.getDom('.sc-dialog_main.el-dialog');
    if (dialogDom) {
      dialogDom.style.top = '7vh';
      dialogDom.style.left = 'initial';
    }

    this.isFull = !this.isFull;
    if (this.isFull) {
      dialogDom.style.top = 'initial';
      dialogDom.style.left = 'initial';
    }
    if (this.isFull || !this.isMove) {
      dialogHeader.onmousedown = null;
      dialogHeader.style.cursor = 'default';
      this.dialogMaxHeight();
    } else {
      dialogHeader.style.cursor = 'move';
      this.init(true);
    }

    this.$emit('emitChangeFull', this.isFull, this);
  }

  dialogMaxHeight() {
    // const mainTop = this.getDom('.sc-dialog_main').offsetTop;
    // const dialogHeight = this.$refs.scDialog;
    // const dialogMaxHeight = `${dialogHeight.offsetHeight - 80 - 54 - 70 - mainTop}px`;
    this.dialogHeight = this.isFull ? '100%' : '55vh';
  }

  getDom(el: string) {
    const uid = this._uid;
    const dialogDom = document.querySelector(`.sc-dialog[data-uid="${uid}"] ${el}`) as HTMLElement;

    return dialogDom;
  }

  mounted() {}
}
</script>


<style lang='scss'>
.sc-dialog {
  text-align: initial;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
  &_box {
    height: 100%;
  }
  &_center {
    overflow: hidden;
    display: flex;
    height: 100%;
    max-height: 60vh;
    > * {
      flex: 1;
      overflow: auto;
    }
  }
  &_main {
    position: absolute;
    top: 7vh;
    margin: 0;
  }
  &_isFull {
    .sc-dialog_full {
      width: 100% !important;
      display: flex;
      flex-direction: column;
    }
  }
  .el-dialog__wrapper {
    position: absolute;
    overflow: hidden;
  }
  .el-dialog__body {
    padding: 20px;
    flex: 1;
  }
  .el-dialog__header {
    user-select: none;
    .el-dialog__headerbtn {
      &.title_full {
        font-size: 15px;
        top: 22px;
        right: 45px;
      }
      font-size: 20px;
    }
  }
  // &_isImage {
  //   padding-top: 25px;
  // }
  // 图片
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
