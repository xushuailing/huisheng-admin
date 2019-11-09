<template>
  <div class="sc-add-form">
    <!-- <slot name="addForm-header">
      <sc-header class="mb-30"
                 :header="config.header">
        <slot name="addForm-header-btn"></slot>
      </sc-header>
    </slot> -->
    <div v-if="form.data"
         :style="{ width: config.width || '50%' }"
         class="sc-add-form_center">
      <div>
        <el-steps :active="stepsActive"
                  v-if="config.data.length > 1"
                  class="mb-20"
                  finish-status="success"
                  simple
                  v-bind="config.stepsAttr">
          <el-step v-for="(item, index) in config.steps"
                   v-bind="item"
                   :key="index"> </el-step>
        </el-steps>
      </div>
      <div class="sc-add-form_form">
        <template v-for="(t, i) in config.data.length">
          <el-form v-show="stepsActive===i"
                   :model="form.data[i]"
                   :key="i"
                   :ref="`scAddForm${i}`"
                   :rules="config.rules ? config.rules[i] : null"
                   :style="formStyle"
                   class="h100"
                   status-icon
                   v-bind="formBind"
                   v-on="config.formListeners">
            <template v-for="(item, index) in config.data[i]">
              <el-form-item :prop="`${item.prop}.value`"
                            v-bind="compose(item,index)"
                            v-if="!item.isHide"
                            :key="item.prop">
                <span slot="label">
                  <span>{{ item.label }}</span>
                  <el-tooltip class="sc-add-form_tooltip"
                              :content="item.tooltip"
                              v-if="item.tooltip"
                              placement="top">
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </span>
                <sc-form-tag ref="scFormTag"
                             :data="item"
                             :form="form.data[i][item.prop]">
                </sc-form-tag>
              </el-form-item>
            </template>
          </el-form>
        </template>
      </div>
      <div :style="{ marginLeft: labelWidth }"
           :class="config.footerClass">
        <formFooterButton mode="add"
                          :isTemporarily="isTemporarily"
                          :stepsActive="stepsActive"
                          :dataLength="config.data.length"
                          :buttonList="config.buttons"
                          @resetClick="onResetForm()"
                          @cancelClick="onCancel"
                          @temporarilyClick="onTemporarily(form.data)"
                          @returnClick="onReturn"
                          @nextClick="onNext"
                          @submitClick="submitValidate"
                          @saveAddClick="submitValidate('saveAdd')">
          <template v-for="slot in slots">
            <slot :slot="slot"
                  :name="slot"></slot>
          </template>
        </formFooterButton>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from '../js/mixins';

export default {
  mixins: [mixins],
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
  .sc-add-form {
    &_center {
      // margin: 0 auto;
      padding: 0 10px;
    }
    &_footer {
      &.center {
        text-align: center;
      }
      &.right {
        text-align: right;
      }
    }
  }
</style>
