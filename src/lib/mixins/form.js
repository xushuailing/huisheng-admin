export default {
  props: {
    api: String,
    mode: String,
    visible: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    isTemporarily() {
      return this.config.temporarily && this.config.temporarily.key;
    },
    formStyle() {
      const { type } = this.config;
      const getColumns = { plain: 1, senior: 2, specialty: 3 };
      const columns = getColumns[type] || 1;
      return { 'grid-template-columns': `repeat(${columns}, 1fr)` };
    },
    formBind() {
      const { type } = this.config;
      const attr = {
        size: 'small',
        'label-width': '100px',
        'label-position': !type || type === 'plain' ? 'right' : 'top',
      };
      return Object.assign(attr, this.config.formAttr);
    },

    dialogListeners() {
      const dialogName = 'dialog';
      const dialogEvents = {};

      Object.keys(this.listeners).forEach((eventName) => {
        const re = new RegExp(`^${dialogName}`, 'gm');
        if (re.test(eventName)) {
          const handleName = eventName.replace(`${dialogName}-`, '');
          dialogEvents[handleName] = this.listeners[eventName];
        }
      });

      return dialogEvents;
    },

    listeners() {
      return this.$listeners;
    },
  },
  methods: {
    onTemporarily(data, msg) {
      const obj = {};
      // data: [{a: {prop: a, value: 'xx'}}, {b: {prop: b, value:'xxx'}}]
      if (Array.isArray(data)) {
        data.forEach((e) => {
          // e: {a: {prop: a, value: 'xx'}}
          Object.keys(e).forEach((key) => {
            // e[key]: {prop: a, value: 'xx'}
            const value = e[key] && e[key].value;
            if (this.$utils._DataIsEmpty(value, [0, false])) {
              obj[key] = value;
            }
          });
        });
      } else {
        // data: {a: {prop: a, value: 'xx'}, b: {prop: b, value:'xxx'}}
        // data: {a: 'xx', b: 'xx'}
        Object.keys(data).forEach((key) => {
          const temp = data[key];
          let val = temp;
          if (this.$utils._DataTypeJudge(temp) === '[object Object]') {
            val = temp.value;
          }
          if (this.$utils._DataIsEmpty(val, [0, false])) {
            obj[key] = val;
          }
        });
      }

      // obj: {a: 'xx', b: 'xx'}
      this.getTemporarily(obj, msg);
    },

    /**
     * 暂存数据
     */
    getTemporarily(data, msg = '暂存成功') {
      this.$utils._Storage.set(this.getTemporarilyKey, data);
      this.$message({ message: msg, type: 'success' });
      this.$emit('emitTemporarily', data, this);
    },

    /**
     * 处理表单数据
     */
    handleFormData(data) {
      const flag = this.$utils._DataIsEmpty(data && data.value, [0]);
      return flag ? data.value : null;
    },

    /**
     * 获取暂存数据
     */
    getTemporarilyData() {
      return this.isTemporarily && this.$utils._Storage.get(this.getTemporarilyKey);
    },

    /**
     * 表单显示模式
     */
    compose(item, index) {
      const { isFull, inline = true } = item;
      const { type } = this.config;
      const attr = { class: [] };
      if (type === 'senior') {
        attr.class = ['pl-10 pr-10', { isFull }];
      } else if (type === 'specialty') {
        attr.class = [
          { 'pl-5 pr-5': index % 3 === 1 },
          { 'pr-10': index % 3 === 0 },
          { 'pl-10': index % 3 === 2 },
          {
            p0: isFull,
            isFull,
          },
        ];
      } else {
        attr['label-width'] = this.config['label-width'] || item['label-width'] || '100px';
      }
      this.labelWidth = attr['label-width'];

      if (this.formBind['label-position'] !== 'top' && !inline) {
        attr.class.push('vertical');
      }

      return attr;
    },

    /**
     * 关闭当前路由
     */
    onCancelViews() {
      const view = this.$route;
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        const latestView = views.slice(-1)[0];
        if (latestView) {
          this.$router.push(latestView.fullPath);
        } else {
          this.$utils._GoHomeRouter(this.$router);
        }
      });
    },
  },
  watch: {
    'config.data': {
      handler() {
        this.init();
      },
      deep: true,
    },
  },
};
