import mixins from '../../../../mixins/form';
import formFooterButton from '../../../components/form-button.vue';

export default {
  mixins: [mixins],
  name: 'ScAddForm',
  components: { formFooterButton },
  data() {
    return {
      dialogVisible: this.visible,
      stepsActive: 0,
      labelWidth: 0,
      form: { data: null },
      temporarilyData: null,
      oldData: null,
    };
  },

  created() {
    this.$emit('emitAddThis', this);
  },
  computed: {

    getTemporarilyKey() {
      return this.$utils._TemporarilyKey(this.$route, this.isTemporarily, 'add');
    },

    slots() {
      return Object.keys(this.$slots).filter((v) => !v.includes('addForm-header'));
    },
  },

  methods: {
    init() {
      const { data, temporarily: te } = this.config;
      // if (JSON.stringify(this.oldData) === JSON.stringify(data)) {
      //   this.oldData = null;
      //   return;
      // }
      this.oldData = data;

      const arr = [];

      const isTemporarily = this.getTemporarilyData();

      data.forEach((e, i) => {
        const formData = (this.form.data && this.form.data[i]) || {};
        const obj = {};
        e.forEach((ee) => {
          const { prop, handle, default: d } = ee;
          const formDataValue = this.handleFormData(formData[prop]);

          let value = d;
          if (formDataValue) {
            value = formDataValue;
          } else if (isTemporarily) {
            const temporarilyData = isTemporarily[prop];
            value = te && te.handle ? te.handle(temporarilyData, prop) : temporarilyData;
          }

          obj[prop] = { value, prop };
          if (handle) obj[prop].handle = handle;
        });
        arr.push(obj);
      });
      this.form.data = arr;
    },

    /**
     * 关闭表单
     *
     * @param {string} type 新增表单模式默认弹框模式
     */
    onCancel(type) {
      if (type === 'page') {
        this.onCancelViews();
      } else {
        this.dialogVisible = false;
      }
      const { data } = this.config;
      data.forEach((e, i) => {
        this.onResetForm(i, 'onCancel');
      });
      this.stepsActive = 0;
      this.$emit('emitCancel', this);
    },

    /**
     * 下一步
     */
    async onNext() {
      const { handleNext } = this.config;
      const status = handleNext ? await handleNext(this.form, this.stepsActive) : true;
      if (status) {
        this.submitValidate();
      } else {
        this.emitNextFun(status);
      }
    },

    /**
     * 上一步
     */
    async onReturn() {
      if (!this.stepsActive) return;
      const { handleReturn } = this.config;
      const status = handleReturn ? await handleReturn(this.form, this.stepsActive) : true;
      if (status) this.stepsActive--;
      this.$emit('emitReturn', { data: this.form, steps: this.stepsActive, status, vm: this });
    },

    /**
     * 验证表单
     */
    submitValidate(type) {
      this.$refs[`scAddForm${this.stepsActive}`][0].validate((valid) => {
        if (valid) {
          if (this.stepsActive === this.config.data.length - 1) {
            this.submitForm(type);
          } else {
            this.stepsActive++;
            this.emitNextFun(valid);
          }
          return true;
        }
        if (this.stepsActive !== this.config.data.length - 1) {
          this.emitNextFun(valid);
        }
        return false;
      });
    },

    /**
     * 重置表单
     *
     * @param {number} [step=this.stepsActive] 新增步骤
     * @param {string} handleType 操作类型
     */
    onResetForm(step = this.stepsActive, handleType) {
      this.$refs[`scAddForm${step}`][0].resetFields();
      if (handleType === 'onCancel') return;
      this.$emit('emitReset', this, step);
    },

    /**
     * 提交表单
     */
    async submitForm(submitType) {
      const { handleSubmit, params, data, requestMethod = 'post' } = this.config;
      const formData = {};
      this.form.data.forEach((e) => {
        for (const k in e) {
          if (
            Array.isArray(e[k].value) &&
            e[k].value.every((v) => ['string', 'number'].includes(typeof v))
          ) {
            formData[k] = e[k].handle ? e[k].handle(e[k].value.join(','), k) : e[k].value.join(',');
          } else {
            formData[k] = e[k].handle ? e[k].handle(e[k].value, k) : e[k].value;
          }
        }
      });

      const allData = { ...formData, ...params };
      let submitData = handleSubmit ? await handleSubmit(allData, this) : allData;

      if (requestMethod === 'post' && (this.config.bodyType === 'formData' || !this.config.bodyType)) {
        submitData = this.jsonToFromData(submitData);
      }

      if (!this.$utils._DataIsEmpty(submitData)) {
        this.emitAddCompleteFun(allData, false, 'prevent', null);
        if (this.config.isPreventClose) {
          this.onCancel(this.mode);
        }
        return;
      }

      const Loading = this.$utils._Loading.show({ text: '新增中...' });

      this.$http[requestMethod](this.api, submitData)
        .then((res) => {
          const errmsg = (res.data && res.data.errmsg) || '新增成功';

          this.$message({ message: errmsg, type: 'success' });

          this.emitAddCompleteFun(submitData, true, 'success', res);

          this.stepsActive = 0;

          // 如果有暂存则清除暂存
          if (this.getTemporarilyData()) {
            this.$utils._Storage.remove(this.getTemporarilyKey);
          }

          // 成功是否关闭弹框|页面
          if (submitType !== 'saveAdd') {
            if (this.config.isSuccessClose !== false) this.onCancel(this.mode);
            // if (this.mode === 'dialog') {
            //   this.dialogVisible = false;
            // } else {
            //   this.onCancelViews();
            // }
          } else {
            const buttons = this.config.buttons || [];
            const saveAddConfig = buttons.find((v) => v.name === 'saveAdd') || {};

            if (saveAddConfig.isClearData) {
              // 重置表单
              data.forEach((e, i) => {
                this.onResetForm(i);
              });
            } else {
              // 清空验证信息
              data.forEach((e, i) => {
                this.$refs[`scAddForm${i}`][0].clearValidate();
              });
            }
          }
        })
        .catch((err) => {
          this.stepsActive = 0;

          // 失败是否关闭弹框|页面
          if (this.config.isFailClose) this.onCancel(this.mode);

          this.emitAddCompleteFun(submitData, false, 'error', { ...err });

          if (this.isTemporarily) {
            setTimeout(() => {
              this.onTemporarily(submitData, '新增失败，数据已经暂存');
            }, 1500);
          }
        })
        .finally(() => {
          Loading.close();
        });
    },

    /**
     * 抛出提交事件
     */
    emitAddCompleteFun(data, status, info, response) {
      this.$emit('emitAddComplete', { status, data, info, response, vm: this });
    },

    emitNextFun(status) {
      this.$emit('emitNext', { data: this.form, steps: this.stepsActive, status, vm: this });
    },

    getItemPropValue(prop) {
      const { data } = this.form || [];
      for (const item of data) {
        if (prop in item) {
          return item[prop] && item[prop].value;
        }
      }
      return null;
    },
  },
};
