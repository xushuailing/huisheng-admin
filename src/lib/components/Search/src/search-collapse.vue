<template>
  <el-collapse-transition>
    <el-form :model="form"
             v-if="searchFormVisible"
             class='sc-search-collapse pt-5'
             ref="form">
      <el-row>
        <template v-if="searchConfig.type==='senior'">
          <el-col v-for="(item,index) in columns"
                  :key="index"
                  class="flex-je"
                  :span="12">

            <el-form-item v-if="index>0"
                          :prop="`${item.prop}.lr`"
                          style="width:12%;min-width:100px">
              <el-select v-model="form[item.prop].lr"
                         size='small'
                         class="pr-10">
                <el-option v-for="val in LR"
                           :key="val.prop"
                           :label="val.label"
                           :value="val.prop"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="mr-15"
                          style="width:80%"
                          v-bind="bindFormItemAttr({'label-width':'100px'})"
                          :label="item.label"
                          :prop="`${item.prop}.value`">
              <sc-form-tag ref="scFormTag"
                           :data="item"
                           :form="form[item.prop]"></sc-form-tag>
            </el-form-item>
          </el-col>
        </template>
        <template v-if="searchConfig.type==='specialty'">
          <el-col v-for="(item,index) in columns"
                  :key="index"
                  class="flex">
            <div class="flex-je"
                 style="margin: 0 auto; width:70%">
              <div style="width:340px"
                   class="flex-je">
                <el-form-item style="width:90px"
                              :prop="`data[${index}].lr`"
                              v-if="index>0">
                  <el-select v-model="form.data[index].lr"
                             size='small'
                             class="pr-10">
                    <el-option v-for="val in LR"
                               :key="val.prop"
                               :label="val.label"
                               :value="val.prop"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item style="width:130px">
                  <el-select v-model="form.data[index].prop"
                             size='small'
                             @change="onChangaSelectKey(form.data[index].prop,index)"
                             class="pr-10">
                    <el-option v-for="val in searchConfig.data"
                               :key="val.prop"
                               :label="val.label"
                               :value="val.prop"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item style="width:120px"
                              :prop="`data[${index}].operate`">
                  <el-select v-model="form.data[index].operate"
                             size='small'
                             class="pr-10">
                    <el-option v-for="val in OPERATE(item.operateType)"
                               :key="val.value"
                               :label="val.label"
                               :value="val.value"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <el-form-item style="flex:1"
                            class="mr-15"
                            v-bind="bindFormItemAttr()"
                            :prop="`data[${index}].value`">
                <sc-form-tag ref="scFormTag"
                             :data="item"
                             :form="form.data[index]"></sc-form-tag>
              </el-form-item>
            </div>
          </el-col>
        </template>
        <el-col v-if="searchConfig.type==='groupSenior'"
                style="padding: 0 5%">
          <div class="flex w100">
            <template v-for="(it,i) in form.data">
              <div style="flex:1"
                   :key="i">
                <div class="flex"
                     v-for="(item,index) in columns"
                     :key="index">
                  <div style="width:90px"
                       class="flex-je">
                    <el-form-item style="width:90px"
                                  :prop="`data[${i}].${item.prop}.lr`"
                                  v-if="index>0">
                      <el-select v-model="form.data[i][item.prop].lr"
                                 size='small'
                                 class="pr-10">
                        <el-option v-for="val in LR"
                                   :key="val.prop"
                                   :label="val.label"
                                   :value="val.prop"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <el-form-item style="flex:1"
                                v-bind="bindFormItemAttr({'label-width':'20%'})"
                                :label="item.label"
                                :prop="`data[${i}].${item.prop}.value`">
                    <sc-form-tag ref="scFormTag"
                                 :data="item"
                                 :form="form.data[i][item.prop]">
                    </sc-form-tag>

                  </el-form-item>
                </div>
              </div>
              <div style="width:100px;margin:0 3%;"
                   :key="i+3"
                   v-if="i==0"
                   class="flex-jc-ac">
                <el-form-item prop="lr">
                  <el-select v-model="form.lr"
                             size='small'>
                    <el-option v-for="val in LR"
                               :key="val.prop"
                               :label="val.label"
                               :value="val.prop">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </template>
          </div>
        </el-col>
        <el-col v-if="searchConfig.type==='groupSpecialty'"
                style="padding: 0 5%">
          <div class="flex w100">
            <template v-for="(it,i) in form.data">

              <div style="flex:1"
                   :key="i">
                <div class="flex"
                     v-for="(item,index) in columns.data[i]"
                     :key="index">
                  <div style="width:310px"
                       class="flex-je">
                    <el-form-item style="width:90px"
                                  :prop="`data[${i}][${index}].lr`"
                                  v-if="index>0">
                      <el-select v-model="form.data[i][index].lr"
                                 size="mini"
                                 class="pr-10">
                        <el-option v-for="val in LR"
                                   :key="val.prop"
                                   :label="val.label"
                                   :value="val.prop"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item style="width:120px">
                      <el-select v-model="form.data[i][index].prop"
                                 @change="onChangaSelectKey(form.data[i][index].prop,index,i)"
                                 size="mini"
                                 class="pr-10">
                        <el-option v-for="val in searchConfig.data"
                                   :key="val.prop"
                                   :label="val.label"
                                   :value="val.prop"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item style="width:90px"
                                  :prop="`data[${i}][${index}].operate`">
                      <el-select v-model="form.data[i][index].operate"
                                 size="mini"
                                 class="pr-10">
                        <el-option v-for="val in OPERATE(item.operateType)"
                                   :key="val.value"
                                   :label="val.label"
                                   :value="val.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <el-form-item style="flex:1"
                                v-bind="bindFormItemAttr()"
                                :prop="`data[${i}][${index}].value`">
                    <sc-form-tag ref="scFormTag"
                                 :data="item"
                                 :defaultBind="{size:'mini'}"
                                 :form="form.data[i][index]">
                    </sc-form-tag>
                  </el-form-item>
                </div>
              </div>
              <div style="width:100px"
                   :key="i+3"
                   v-if="i==0"
                   class="flex-jc-ac mr-20 ml-20">
                <el-form-item prop="lr">
                  <el-select size="mini"
                             v-model="form.lr">
                    <el-option v-for="val in LR"
                               :key="val.prop"
                               :label="val.label"
                               :value="val.prop">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </template>
          </div>
        </el-col>
        <el-col v-if="searchConfig.type==='filter'">
          <div class="p-10">
            <sc-filter :config="searchConfig.filter"
                       :data="searchConfig.data"
                       @emitSorts="emitSearchSorts"
                       @emitQuery="onSearchSubmit">
            </sc-filter>
          </div>
        </el-col>
        <template v-if="!searchConfig.type||searchConfig.type==='plain'">

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
        </template>
        <el-col v-if="searchConfig.type!=='filter'">
          <el-form-item class="text-c pt-10"
                        v-if="searchConfig.type==='groupSpecialty'">
            <el-button size="small"
                       @click="onSearchSubmit()">提交</el-button>
            <el-button size="small"
                       @click="onResetFields('form')">重置</el-button>
            <el-button size="small"
                       @click="onResetFields('form')">保存</el-button>
            <el-select size="small"
                       class="ml-10 mr-10"
                       clearable
                       v-model="localTemplate.model">
              <el-option v-for="val in localTemplate.data"
                         :key="val"
                         :label="val"
                         :value="val">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="text-c pt-10"
                        v-else>
            <el-button size="small"
                       @click="onSearchSubmit()">提交</el-button>
            <el-button size="small"
                       @click="onResetFields">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-collapse-transition>
</template>
<script>
import { LR, OPERATE } from '../../../config/operate';
import mixins from '../mixins';

export default {
  name: 'ScSearchCollapse',
  mixins: [mixins],

  data() {
    return {
      searchConfig: this.config,
      columns: [],
      LR,
      OPERATE,
      form: {},
      localTemplate: {
        data: ['默认查询', '模板一', '模板二'],
        model: '默认查询',
      },
    };
  },
  methods: {
    init() {
      const { data } = this.searchConfig;
      let { type, num } = this.searchConfig;
      if (type === 'filter') return;
      let obj = {};
      const arr = [];

      if (!num) num = data.length;
      if (!type) type = 'plain';

      const tempArr = data.filter((v, i) => num > i && !v.isHide);
      if (type === 'groupSpecialty') {
        const col = tempArr;
        const o1 = JSON.parse(JSON.stringify(col));
        const o2 = JSON.parse(JSON.stringify(col));
        this.columns = { data: [o1, o2] };
      } else {
        this.columns = tempArr;
      }

      tempArr.forEach((e, i) => {
        if (type === 'plain') {
          obj[e.prop] = {
            value: e.default,
            prop: e.prop,
            operate: OPERATE(e.operateType)[0].value,
            lr: !i ? undefined : this.LR[0].prop,
          };
        } else if (type === 'senior') {
          obj[e.prop] = {
            value: e.default,
            prop: e.prop,
            operate: OPERATE(e.operateType)[0].value,
            lr: !i ? undefined : this.LR[0].prop,
          };
        } else if (type === 'specialty' || type === 'groupSpecialty') {
          obj[e.prop] = {
            value: e.default,
            lr: !i ? undefined : this.LR[0].prop,
            prop: e.prop,
            operate: this.OPERATE(e.operateType)[0].value,
          };
          arr.push(obj[e.prop]);
        } else if (type === 'groupSenior') {
          obj[e.prop] = {
            value: e.default,
            prop: e.prop,
            lr: !i ? undefined : this.LR[0].prop,
            operate: this.OPERATE(e.operateType)[0].value,
          };
        }
      });
      if (type === 'groupSenior' || type === 'groupSpecialty') {
        const temp = arr.length ? arr : obj;
        const obj1 = JSON.parse(JSON.stringify(temp));
        const obj2 = JSON.parse(JSON.stringify(temp));
        obj = {
          data: [obj1, obj2],
          lr: this.LR[0].prop,
        };
      }
      if (type === 'specialty') {
        this.form = { data: arr };
      } else {
        this.form = obj;
      }
    },
    async onSearchSubmit(form) {
      const data = form || this.form;

      let formData = form || this.handleNullObject(data);
      // this.onResetFields()

      const { handleSubmit: handle } = this.searchConfig;

      formData = handle ? await handle(formData, this) : formData;

      // 为 null 时, 为清空查询条件
      if (!this.$utils._DataIsEmpty(formData) && formData !== null) return;

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
      const { data, type } = this.searchConfig;
      const obj = data.filter((v) => v.prop === prop)[0];

      // vue 改变数组或对象的属性时,不渲染 dom
      if (type === 'groupSpecialty') {
        this.$set(this.columns.data[i], index, obj);
        // this.columns.data[i][index] = obj

        this.$set(this.form.data[i][index], 'value', obj.default);
        // this.form.data[i][index].value = obj.default

        this.$set(this.form.data[i][index], 'prop', obj.prop);
        // this.form.data[i][index].prop = obj.prop

        this.$set(this.form.data[i][index], 'operate', this.OPERATE(obj.operateType)[0].value);
        // this.form.data[i][index].operate = this.OPERATE(obj.operateType)[0].value
      } else {
        this.$set(this.columns, index, obj);
        // this.columns[index] = obj

        this.$set(this.form.data[index], 'value', obj.default);
        // this.form.data[index].value = obj.default

        this.$set(this.form.data[index], 'prop', obj.prop);
        // this.form.data[index].prop = obj.prop

        this.$set(this.form.data[index], 'operate', this.OPERATE(obj.operateType)[0].value);
        // this.form.data[index].operate = this.OPERATE(obj.operateType)[0].value
      }
    },

    // 处理空字段
    handleNullObject(option) {
      const clone = this.$utils._Clone;
      const { type } = this.searchConfig;
      const data = clone(option.data || option);
      const s = toString || Object.prototype.toString;
      let handleData;
      if (s.call(data) === '[object Array]') {
        if (type === 'groupSpecialty') {
          handleData = data
            .map((v) => ({
              exps: v.filter((e) => {
                if (s.call(e.value) === '[object Array]') {
                  e.value = e.value.join(',');
                }
                return e.value === 0 || e.value;
              }),
            }))
            .filter((arr) => arr.exps.length);
          if (handleData[1]) handleData[1].lr = option.lr;
        } else if (type === 'groupSenior') {
          handleData = data
            .map((v) => {
              const arr = [];
              for (const k in v) {
                const e = v[k];
                if (s.call(e.value) === '[object Array]') {
                  e.value = e.value.join(',');
                }
                if (e.value || e.value === 0) arr.push(e);
              }
              return arr.length ? { lv: option.lr, exps: arr } : null;
            })
            .filter((e) => e);
        } else {
          handleData = data.filter((v) => {
            const obj = v;
            if (s.call(obj.value) === '[object Array]') {
              obj.value = obj.value.join(',');
            }
            return obj.value === 0 || obj.value;
          });
          handleData = handleData.length ? [{ exps: handleData }] : [];
        }
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
        handleData = arr.length ? [{ exps: arr }] : null;
      }
      return handleData;
    },
  },
};
</script>
<style lang='scss' scoped>
.sc-search-collapse {
  background: #f5f7fa;
  .el-form-item {
    margin-bottom: 5px;
  }
}
</style>
