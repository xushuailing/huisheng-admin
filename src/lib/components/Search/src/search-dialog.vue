<template>
  <div class='sc-search-dialog'>
    <sc-dialog ref="scDialog"
               :header='{title:"高级搜索"}'
               :width="searchConfig.width"
               :visible.sync="searchFormVisible">
      <div slot="conter">
        <el-form :model="form"
                 resetFields
                 ref="form">
          <el-row>
            <template v-if="searchConfig.type==='senior'">

              <el-col :key="index"
                      style="padding-left:5%"
                      class="flex-je"
                      v-for="(item,index) in columns">
                <div style="width:100px">
                  <el-form-item v-if="index>0"
                                :prop="`${item.prop}.lr`"
                                style="width:100px">
                    <el-select v-model="form[item.prop].lr"
                               size="mini"
                               class="pr-10">
                      <el-option v-for="val in LR"
                                 :key="val.prop"
                                 :label="val.label"
                                 :value="val.prop"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <el-form-item class="mr-15"
                              :label="item.label"
                              :prop="`${item.prop}.value`"
                              v-bind="bindFormItemAttr({'label-width':'100px'})"
                              style="flex:1;">
                  <sc-form-tag ref="scFormTag"
                               :data="item"
                               :form="form[item.prop]"></sc-form-tag>

                </el-form-item>
              </el-col>
            </template>
            <template v-if="searchConfig.type==='specialty'">
              <el-col :key="index"
                      class="flex-je"
                      v-for="(item,index) in columns">
                <div style="width:320px"
                     class="flex-je">
                  <el-form-item style="width:90px"
                                :prop="`data[${index}].lr`"
                                v-if="index>0">
                    <el-select v-model="form.data[index].lr"
                               size="mini"
                               class="pr-10">
                      <el-option v-for="val in LR"
                                 :key="val.prop"
                                 :label="val.label"
                                 :value="val.prop"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="width:120px">
                    <el-select v-model="form.data[index].prop"
                               @change="onChangaSelectKey(form.data[index].prop,index)"
                               size="mini"
                               class="pr-10">
                      <el-option v-for="val in searchConfig.data"
                                 :key="val.prop"
                                 :label="val.label"
                                 :value="val.prop"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="width:110px"
                                :prop="`data[${index}].operate`">
                    <el-select v-model="form.data[index].operate"
                               size="mini"
                               class="pr-10">
                      <el-option v-for="val in OPERATE(item.operateType)"
                                 :key="val.value"
                                 :label="val.label"
                                 :value="val.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <el-form-item style="flex:1;"
                              v-bind="bindFormItemAttr()"
                              :prop="`data[${index}].value`">
                  <sc-form-tag ref="scFormTag"
                               :data="item"
                               :form="form.data[index]"></sc-form-tag>
                </el-form-item>
              </el-col>
            </template>
            <template v-if="!searchConfig.type||searchConfig.type==='plain'">

              <el-col v-for="item of columns"
                      :key="item.prop">
                <el-form-item class="mr-15"
                              :label="item.label"
                              :prop="`${item.prop}.value`"
                              v-bind="bindFormItemAttr({'label-width':'100px'})">
                  <sc-form-tag ref="scFormTag"
                               :data="item"
                               :form="form[item.prop]"></sc-form-tag>
                </el-form-item>
              </el-col>
            </template>

          </el-row>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="searchFormVisible = false">取 消</el-button>
        <el-button @click="onResetFields">重 置</el-button>
        <el-button type="primary"
                   @keyup.enter.native="onSearchSubmit"
                   @click="onSearchSubmit">搜 索</el-button>
      </div>
    </sc-dialog>
  </div>
</template>
<script>
// import { LR, OPERATE } from '../../../config/operate';
import mixins from '../mixins';

export default {
  mixins: [mixins],
  name: 'ScSearchDialog',
  data() {
    return {
      searchConfig: this.config,
      form: {},
      columns: [],
    };
  },

  methods: {
    init() {
      const { data } = this.searchConfig;
      let { num, type } = this.searchConfig;
      if (!num) num = data.length;
      if (!type) type = 'plain';
      const obj = {};
      const arr = [];
      this.columns = data.filter((v, i) => num > i && !v.isHide);
      this.columns.forEach((e, i) => {
        obj[e.prop] = {
          value: e.default,
          prop: e.prop,
        };
      });
      this.form = obj;
    },
    // 提交搜索表单
    async onSearchSubmit() {
      const { type } = this.searchConfig;

      const data = this.form;
      let formData = this.handleNullObject(data);

      this.searchFormVisible = false;

      // if (!formData) return

      // TODO 提交后再次搜索,重置将会保留上次记录
      // this.onResetFields()

      const { handleSubmit: handle } = this.searchConfig;

      formData = handle ? await handle(formData, this) : formData;

      // 为 null 时, 为清空查询条件
      if (!this.$utils._DataIsEmpty(formData) && formData !== null) return;

      this.$emit('emitSearchSubmit', formData, 'searchForm');
    },

    // 清空表单
    onResetFields() {
      this.$refs.form.resetFields();
      this.$emit('emitSearchReset');
    },

    // 字段选择
    onChangaSelectKey(prop, index) {
      const { data } = this.searchConfig;
      const obj = data.filter((v) => v.prop === prop)[0];
      this.columns[index] = obj;

      this.$set(this.form.data[index], 'value', obj.default);
      // this.form.data[index].value = obj.default

      this.$set(this.form.data[index], 'prop', obj.prop);
      // this.form.data[index].prop = obj.prop
    },

    // 处理空字段
    handleNullObject(option) {
      const clone = this.$utils._Clone;
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
        handleData = handleData.length ? [{ exps: handleData }] : null;
      } else if (s.call(data) === '[object Object]') {
        const arr = [];
        for (const k in data) {
          const e = data[k];
          if (s.call(e.value) === '[object Array]') {
            e.value = e.value.join(',');
          }
          if (e.value || e.value === 0) arr.push(e);
        }
        handleData = arr.length ? [{ exps: arr }] : null;
      }
      return handleData;
    },
  },
};
</script>
