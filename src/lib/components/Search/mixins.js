export default {
  props: {
    visible: Boolean,
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      if (!val) {
        this.form = {};
      } else {
        this.init && this.init();
      }
      this.searchFormVisible = val;
    },
    searchFormVisible(val) {
      this.$emit('update:visible', val);
    },
  },
  data() {
    return { searchFormVisible: this.visible };
  },
  methods: {
    bindFormItemAttr(param = {}) {
      return Object.assign({}, param, this.searchConfig.attr);
    },
  },
};
