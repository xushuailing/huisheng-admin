<template>
  <div class='sc-form-tag'>
    <el-date-picker v-if="tagType==='date-picker'"
                    v-model="formData.value"
                    v-on="listeners"
                    v-bind="tagBind">
    </el-date-picker>
    <el-time-select v-else-if="tagType==='time-select'"
                    v-model="formData.value"
                    v-on="listeners"
                    v-bind="tagBind">
    </el-time-select>
    <el-time-picker v-else-if="tagType==='time-picker'"
                    v-model="formData.value"
                    v-on="listeners"
                    v-bind="tagBind">
    </el-time-picker>
    <el-switch v-else-if="tagType==='switch'"
               v-model="formData.value"
               v-on="listeners"
               :active-value='1'
               :inactive-value="0"
               v-bind="tagBind">
    </el-switch>
    <el-input-number v-else-if="tagType==='input-number'"
                     v-model="formData.value"
                     v-on="listeners"
                     v-bind="tagBind">
    </el-input-number>
    <el-select v-else-if="tagType==='select'"
               v-model="formData.value"
               v-on="listeners"
               v-bind="tagBind">
      <el-option v-for="item in data.tag.options"
                 v-on="listeners.children"
                 v-bind="tagBind.children"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
    <template v-else-if="tagType==='checkbox'">
      <el-checkbox-group v-model="formData.value"
                         v-if="data.tag.options"
                         v-on="listeners"
                         v-bind="tagBind">
        <template v-if="data.tag.isButton">
          <el-checkbox-button v-for="item in data.tag.options"
                              v-on="listeners.children"
                              v-bind="tagBind.children"
                              :key="item.value"
                              :label="item.value">
            {{item.label}}
          </el-checkbox-button>
        </template>
        <template v-else>
          <el-checkbox v-for="item in data.tag.options"
                       v-on="listeners.children"
                       v-bind="tagBind.children"
                       :key="item.value"
                       :label="item.value">
            {{item.label}}
          </el-checkbox>
        </template>
      </el-checkbox-group>
    </template>
    <el-cascader v-else-if="tagType==='cascader'"
                 v-model="formData.value"
                 v-on="listeners"
                 :options="data.tag.options"
                 v-bind="tagBind">
    </el-cascader>
    <template v-else-if="tagType==='radio'">
      <el-radio-group v-model="formData.value"
                      v-if="data.tag.options"
                      v-on="listeners"
                      v-bind="tagBind">
        <template v-if="data.tag.isButton">
          <el-radio-button v-for="item in data.tag.options"
                           v-on="listeners.children"
                           v-bind="tagBind.children"
                           :key="item.value"
                           :label="item.value">
            {{item.label}}
          </el-radio-button>
        </template>
        <template v-else>
          <el-radio v-for="item in data.tag.options"
                    v-on="listeners.children"
                    v-bind="tagBind.children"
                    :key="item.value"
                    :label="item.value">
            {{item.label}}
          </el-radio>
        </template>
      </el-radio-group>
    </template>
    <el-rate v-else-if="tagType==='rate'"
             v-model="formData.value"
             v-on="listeners"
             v-bind="tagBind"
             class="mt-10">
    </el-rate>
    <sc-upload v-else-if="tagType==='upload-img'"
               v-on="listeners"
               v-model="formData.value"
               v-bind="tagBind"
               ref="scUploadImg"
               type="img"
               class="inline-block">
    </sc-upload>
    <sc-upload v-else-if="tagType==='upload-file'"
               v-on="listeners"
               v-model="formData.value"
               v-bind="tagBind"
               ref="scUploadFile"
               type="file"
               class="inline-block">
    </sc-upload>
    <!-- <sc-map v-else-if="tagType==='map-dot' || tagType==='map-fence'"
            v-bind="tagBind"
            v-on="listeners"
            v-model="formData.value"
            ref="scMap"
            :type="tagType">
    </sc-map> -->
    <!-- <sc-tag v-else-if="tagType==='add-tags'"
            v-bind="tagBind"
            v-on="listeners"
            v-model="formData.value"
            ref="scTag"
            :type="tagType">
    </sc-tag> -->
    <!-- <sc-tree-select v-else-if="tagType==='tree-select'"
                    v-bind="tagBind"
                    v-on="listeners"
                    v-model="formData.value"
                    ref="scTreeSelect">
    </sc-tree-select> -->
    <sc-editor v-else-if="tagType==='editor'"
               v-bind="tagBind"
               v-on="listeners"
               v-model="formData.value"
               ref="scEditor">
    </sc-editor>
    <component v-else-if="tagType==='component'"
               v-bind="tagBind"
               v-on="listeners"
               :is="data.tag.components"
               :value.sync="formData.value"
               ref="component">
    </component>
    <el-autocomplete v-else-if="tagType==='autocomplete'"
                     v-model="formData.value"
                     v-on="listeners"
                     v-bind="tagBind"
                     clearable>
    </el-autocomplete>
    <el-input v-else
              v-model="formData.value"
              v-on="listeners"
              v-bind="tagBind"
              clearable>
      <template v-if="tagBind.slot">
        <component :is="tagBind.slot.component"
                   v-on="tagBind.slot.listeners"
                   v-bind="tagBind.slot.attr" />
      </template>
    </el-input>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ScFormData } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

interface FormData {
  prop: string;
  value: any;
}

@Component({ name: 'ScFormTag' })
export default class ScFormTag extends Vue {
  /** 表单项配置 */
  @Prop({ type: Object })
  data!: ScFormData;

  /** 表单项数据 */
  @Prop({ type: Object })
  form!: FormData;

  /** 默认属性 */
  @Prop({ type: Object, default: () => ({}) })
  defaultBind!: obj;

  formData = this.form;

  @Watch('form')
  handleForm(val: FormData) {
    this.formData = val;
  }

  get tagType() {
    return this.data.tag && this.data.tag.tagType;
  }

  get tagBind() {
    const { attr = {}, tagType = 'input' } = this.data.tag || {};
    // , size: 'small'
    const option: obj = { class: `w100 ${attr.class || ''}` };
    if (tagType === 'date-picker') {
      if (attr.type === 'date' || attr.type === 'daterange') {
        option['value-format'] = 'yyyy-MM-dd';
      } else {
        option['value-format'] = 'yyyy-MM-dd HH:mm:ss';
      }
    }
    // if (tagType === 'tree-select') {
    //   option['select-size'] = 'small';
    // }
    if (tagType === 'input-number') {
      option.class = '';
    }
    if (tagType === 'select') {
      option.clearable = true;
    }
    return Object.assign({}, option, this.defaultBind, attr);
  }

  get listeners() {
    const { listeners = {} } = this.data.tag || {};
    return listeners;
  }

  async created() {
    const { tagType = 'input', options } = this.data.tag || {};
    const { value } = this.formData;

    if (tagType === 'input-number' && !value) {
      this.formData.value = 0;
    }

    if (
      tagType === 'add-tags' ||
      tagType === 'cascader' ||
      tagType === 'checkbox' ||
      tagType === 'tree-select'
    ) {
      this.formData.value = this.$utils._DataTypeChange(value);
    }
    if (tagType === 'select' && this.tagBind.multiple) {
      this.formData.value = this.$utils._DataTypeChange(value);
    }
    if (options && typeof options === 'function') {
      this.data.tag!.options = ((await options) as any)();
    }
  }
}
</script>
<style lang='scss'>
.sc-form-tag {
  height: 100%;
}
</style>
