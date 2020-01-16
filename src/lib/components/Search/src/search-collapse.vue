<template>
  <el-form :model="form"
           class='sc-search-collapse pt-20 pb-20 pl-15 bg-white border-radius-8'
           ref="form">
    <el-row>
      <template>

        <el-col v-for="item in columns"
                :key="item.prop"
                :span="8">
          <el-form-item class="mr-15"
                        v-bind="bindFormItemAttr({'label-width':'100px'})"
                        :label="item.label"
                        :prop="`${item.prop}.value`">
            <sc-form-tag ref="scFormTag"
                         :data="item"
                         :form="form[item.prop]"></sc-form-tag>
          </el-form-item>

        </el-col>
        <el-col>
          <div class="text-e pt-10 pl-20 pr-15">
            <el-button @click="onSearchSubmit()">提交</el-button>
            <el-button @click="onResetFields">重置</el-button>
          </div>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>
<script>
import mixins from '../mixins';

export default {
  name: 'ScSearchCollapse',
  mixins: [mixins],

  data() {
    return {
      searchConfig: this.config,
      columns: [],
      form: {},
    };
  },
  mounted() {
    this.$nextTick(this.init);
  },
  methods: {
    init() {
      const { data } = this.searchConfig;
      let { num } = this.searchConfig;
      const obj = {};
      const arr = [];

      if (!num) num = data.length;

      const tempArr = data.filter((v, i) => num > i && !v.isHide);

      this.columns = tempArr;

      tempArr.forEach((e, i) => {
        obj[e.prop] = {
          value: e.default,
          prop: e.prop,
        };
      });

      this.form = obj;
    },
    async onSearchSubmit(form) {
      const data = form || this.form;

      let formData = form || this.handleNullObject(data);
      // this.onResetFields()

      const { handleSubmit: handle } = this.searchConfig;

      formData =
        formData &&
        formData.reduce((p, s) => {
          if (s && s.prop) p[s.prop] = s.value;
          return p;
        }, {});

      formData = handle ? await handle(formData || {}, this) : formData;
      // 为 null 时, 为清空查询条件
      if (!this.$utils._DataIsEmpty(formData, ['{}']) && formData !== null) return;

      this.$emit('emitSearchSubmit', formData, 'searchForm');
    },
    emitSearchSorts(data) {
      this.$emit('emitSearchSorts', data);
    },
    onResetFields() {
      this.$refs.form.resetFields();
      this.$emit('emitSearchReset');
    },
    // 字段选择
    onChangaSelectKey(prop, index, i) {
      const { data } = this.searchConfig;
      const obj = data.filter((v) => v.prop === prop)[0];

      this.$set(this.columns, index, obj);
      // this.columns[index] = obj

      this.$set(this.form.data[index], 'value', obj.default);
      // this.form.data[index].value = obj.default

      this.$set(this.form.data[index], 'prop', obj.prop);
      // this.form.data[index].prop = obj.prop

      // this.$set(this.form.data[index], 'operate', this.OPERATE(obj.operateType)[0].value);
      // this.form.data[index].operate = this.OPERATE(obj.operateType)[0].value
    },

    // 处理空字段
    handleNullObject(option) {
      const clone = this.$utils._Clone;
      const { type } = this.searchConfig;
      const data = clone(option.data || option);
      const s = toString || Object.prototype.toString;
      let handleData;
      if (s.call(data) === '[object Array]') {
        handleData = data.filter((v) => {
          const obj = v;
          if (s.call(obj.value) === '[object Array]') {
            obj.value = obj.value.join(',');
          }
          return obj.value === 0 || obj.value;
        });

        handleData = handleData.length ? handleData : null;
      } else if (s.call(data) === '[object Object]') {
        const arr = [];
        for (const k in data) {
          const e = data[k];
          if (s.call(e.value) === '[object Array]') {
            e.value = e.value.join(',');
          }
          if (e.value || e.value === 0) arr.push(e);
        }
        handleData = arr.length ? arr : null;
      }
      return handleData;
    },
  },
};
</script>
<style lang='scss' scoped>
.sc-search-collapse {
  background: #f5f7fa;
  // .el-form-item {
  // margin-bottom: 5px;
  // }
}
</style>
