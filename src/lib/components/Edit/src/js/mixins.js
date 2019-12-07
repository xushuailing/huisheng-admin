import mixins from '../../../../mixins/form';
import formFooterButton from '../../../components/form-button.vue';

export default {
  mixins: [mixins],
  name: 'ScEdit',
  components: { formFooterButton },
  data() {
    return {
      dialogVisible: this.visible,
      form: null,
      labelWidth: 0,
      formItem: [],
      oldData: null,
    };
  },
  created() {
    this.$emit('emitEditThis', this);
  },

  computed: {
    isTabs() {
      const { data } = this.config;
      return data && data.length > 1;
    },

    rules() {
      const rule = this.config.rules || [];
      const obj = {};
      rule.forEach((e) => Object.assign(obj, e));
      return obj;
    },

    getTemporarilyKey() {
      return this.$utils._TemporarilyKey(this.$route, this.isTemporarily, 'edit');
    },

    slots() {
      return Object.keys(this.$slots).filter((v) => !v.includes('edit-header'));
    },

    formStyle() {
      const { type } = this.config;
      const getColumns = { plain: 1, senior: 2, specialty: 3 };
      const columns = getColumns[type] || 1;
      return { 'grid-template-columns': `repeat(${columns}, 1fr)` };
    },

    formBind() {
      const attr = {
        size: 'small',
        'label-width': '100px',
        'label-position': this.config.type === 'plain' ? 'right' : 'top',
      };
      return Object.assign(attr, this.config.formAttr);
    },
  },

  methods: {
    init(isInit) {
      const { data, temporarily: te } = this.config;

      // 拦截重复渲染
      if (!this.dialogVisible && this.mode !== 'page') return;
      if (JSON.stringify(data) === this.oldData && !isInit) return;
      this.oldData = JSON.stringify(data);

      const obj = Object.create(null);

      const isTemporarily = this.getTemporarilyData();

      this.formItem.length = 0;
      data.forEach((e, i) => {
        const item = {};
        e.forEach((ee) => {
          const { prop, handle, default: d } = ee;
          const formDataValue = this.handleFormData(this.form && this.form[prop]);

          let value = d;
          if (formDataValue) {
            value = formDataValue;
          } else if (isTemporarily) {
            const temporarilyData = isTemporarily[prop];
            value = te && te.handle ? te.handle(temporarilyData, prop) : temporarilyData;
          }

          obj[prop] = { value, prop };
          if (handle) obj[prop].handle = handle;
          item[prop] = ee;
        });

        this.formItem.push(item);
      });
      this.form = obj;
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
      // this.onResetForm('onCancel');
      this.$emit('emitCancel', this);
    },

    /**
     * 重置表单
     *
     * @param {string} handleType 操作类型
     */
    onResetForm(handleType) {
      this.$refs.editForm.resetFields();
      this.init(true);
      if (handleType === 'onCancel') return;
      this.$emit('emitReset', this);
    },

    /**
     * 验证表单
     */
    submitValidate() {
      this.$refs.editForm.validate((valid, err) => {
        if (valid) {
          this.submitForm();
        } else {
          let msg = null;

          Object.keys(err).forEach((e, v) => {
            if (v === 0) {
              msg = err[e] && err[e][0] && err[e][0].message;
            }
          });

          this.$message({
            type: 'error',
            message: msg,
            duration: 2000,
          });
        }
        return valid;
      });
    },

    /**
     * 提交表单
     */
    async submitForm() {
      const { handleSubmit, params, id } = this.config;
      const data = {};
      data.id = id;

      Object.keys(this.form).forEach((v) => {
        const e = this.form[v];
        if (
          Array.isArray(e.value) &&
          e.value.every((k) => ['string', 'number'].includes(typeof k))
        ) {
          data[v] = e.handle ? e.handle(e.value.join(','), v) : e.value.join(',');
        } else {
          data[v] = e.handle ? e.handle(e.value, v) : e.value;
        }
      });

      const allData = { ...data, ...params };
      let submitData = handleSubmit ? await handleSubmit(allData, this) : allData;

      if (this.config.bodyType === 'formData' || !this.config.bodyType) {
        submitData = this.jsonToFromData(submitData);
      }

      if (!this.$utils._DataIsEmpty(submitData)) {
        this.emitEditCompleteFun(allData, false, 'prevent', null);
        if (this.config.isPreventClose) {
          this.onCancel(this.mode);
        }
        return;
      }

      const Loading = this.$utils._Loading.show({ text: '修改中...' });
      this.$http
        .post(this.api, submitData)
        .then((res) => {
          const errmsg = (res.data && res.data.errmsg) || '修改成功';

          this.$message({ message: errmsg, type: 'success' });

          this.emitEditCompleteFun(submitData, true, 'success', res);

          if (this.getTemporarilyData()) {
            this.$utils._Storage.remove(this.getTemporarilyKey);
          }

          // 成功是否关闭弹框|页面
          if (this.config.isSuccessClose !== false) this.onCancel(this.mode);

          // if (this.mode === 'dialog') {
          //   this.dialogVisible = false;
          // } else {
          //   this.onCancelViews();
          // }
        })
        .catch((err) => {
          this.emitEditCompleteFun(submitData, false, 'error', { ...err });

          if (this.isTemporarily) {
            setTimeout(() => {
              this.onTemporarily(submitData, '修改失败，数据已经暂存');
            }, 1500);
          }
          // 失败是否关闭弹框|页面
          if (this.config.isFailClose) this.onCancel(this.mode);
        })
        .finally(() => {
          Loading.close();
        });
    },

    /**
     * 抛出提交事件
     */
    emitEditCompleteFun(data, status, info, response) {
      this.$emit('emitEditComplete', { status, data, info, response, vm: this });
    },

    getItemPropValue(prop) {
      return (this.form && this.form[prop] && this.form[prop].value) || null;
    },
  },
};
