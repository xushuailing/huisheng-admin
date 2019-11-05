<template>
  <div>
    <template v-for="btn in buttons">
      <template v-if="btn.mode==='slot'">
        <slot :name="btn.slotName"
              v-bind="btn.attrs"
              v-on="btn.listeners"></slot>
      </template>
      <el-button v-else-if="isShowButton(btn.mode)"
                 :key="btn.mode"
                 v-bind="btn.attrs"
                 v-on="btn.listeners">{{btn.text}}</el-button>
    </template>
  </div>
</template>
<script>
export default {
  name: 'formFooterButton',
  props: {
    mode: { type: String },
    isTemporarily: { type: String },
    stepsActive: { type: Number },
    dataLength: { type: Number },
    buttonList: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    defaultBtn(type) {
      const data = {
        reset: {
          text: '重 置',
          listeners: { click: () => this.$emit('resetClick') },
        },
        cancel: {
          text: '取 消',
          listeners: { click: () => this.$emit('cancelClick') },
        },
        temporarily: {
          text: '暂 存',
          listeners: { click: () => this.$emit('temporarilyClick') },
        },
        return: {
          text: '上一步',
          listeners: { click: () => this.$emit('returnClick') },
        },
        next: {
          text: '下一步',
          listeners: { click: () => this.$emit('nextClick') },
        },
        submit: {
          text: '提 交',
          listeners: { click: () => this.$emit('submitClick') },
        },
        saveAdd: {
          text: '提交并新增',
          listeners: { click: () => this.$emit('saveAddClick') },
        },
        slot: { slotName: this.mode === 'edit' ? 'edit-footer-btn' : 'addForm-footer-btn' },
      };
      const defaultBtn = {
        type: 'button',
        text: '按钮',
      };
      return data[type] || defaultBtn;
    },
    isShowButton(type) {
      const { stepsActive, isTemporarily, dataLength, buttonList, mode } = this;
      const isShowSubmit = mode === 'edit' ? true : stepsActive === dataLength - 1;
      const flag = {
        reset: true,
        cancel: !stepsActive,
        temporarily: Boolean(isTemporarily),
        return: stepsActive && stepsActive !== dataLength,
        next: stepsActive !== dataLength - 1,
        submit: isShowSubmit,
        saveAdd: (() => {
          if (mode !== 'edit' && isShowSubmit && Array.isArray(buttonList)) {
            return ~buttonList.findIndex((v) => v.mode === 'saveAdd');
          }
          return false;
        })(),
      };
      return flag[type];
    },
  },
  computed: {
    defaultButtonSort() {
      const add = ['reset', 'cancel', 'slot', 'return', 'next', 'temporarily', 'submit', 'saveAdd'];
      const edit = ['reset', 'cancel', 'slot', 'temporarily', 'submit'];
      return this.mode === 'edit' ? edit : add;
    },
    buttons() {
      const buttons = [];
      this.defaultButtonSort.forEach((v, i) => {
        const defaultParam = { ...this.defaultBtn(v), mode: v, sort: i }; // 默认按钮配置
        buttons.push(defaultParam);
      });
      this.buttonList.forEach((v) => {
        const defaultIndex = buttons.findIndex((e) => e.mode === v.mode); // 用户配置是否是默认按钮
        if (~defaultIndex && v.mode !== 'slot') {
          if (v.isHide) {
            buttons[defaultIndex] = {};
            return;
          }
          buttons[defaultIndex] = Object.assign({}, buttons[defaultIndex], v); // 合并配置
        } else {
          buttons.push(v);
        }
      });
      const hadnlerButtons = buttons.filter((v) => v.mode).sort((a, b) => a.sort - b.sort);
      return hadnlerButtons;
    },
  },
};
</script>
