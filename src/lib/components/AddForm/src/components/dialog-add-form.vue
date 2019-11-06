<template>
  <sc-dialog class="sc-add-form"
             ref="dialog"
             @close="onCancel"
             v-on="dialogListeners"
             :width="config.width"
             :isDefaultFull="config.isDefaultFull"
             :isOpenFull="config.isOpenFull"
             :isMove="config.isMove"
             :header="config.header"
             :visible.sync="dialogVisible">
    <div slot="conter"
         v-if="form.data"
         class="sc-add-form_center">
      <slot name="addForm-header"></slot>
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
          <el-form v-show="stepsActive === i"
                   :model="form.data[i]"
                   :key="i"
                   :ref="`scAddForm${i}`"
                   :rules="config.rules ? config.rules[i] : null"
                   :style="formStyle"
                   status-icon
                   v-bind="formBind"
                   v-on="config.formListeners">
            <template v-for="(item, index) in config.data[i]">
              <el-form-item :prop="`${item.prop}.value`"
                            v-if="!item.isHide"
                            v-bind="compose(item,index)"
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
    </div>
    <div slot="footer"
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
  </sc-dialog>
</template>
<script>
import mixins from '../js/mixins';

export default {
  mixins: [mixins],
  watch: {
    visible(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      if (val) {
        this.init();
      } else {
        this.form.data = null;
        this.oldData = null;
      }
      this.$emit('update:visible', val);
    },
  },
};
</script>
