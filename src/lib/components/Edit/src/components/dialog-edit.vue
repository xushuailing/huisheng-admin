<template>
  <sc-dialog class="sc-edit"
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
         v-if="form"
         class="sc-edit_center">
      <slot name="edit-header"></slot>
      <div class="sc-edit_form">
        <el-form ref="editForm"
                 :model="form"
                 :rules="rules"
                 class="h100"
                 status-icon
                 v-bind="formBind"
                 v-on="config.formListeners">
          <el-tabs v-bind="config.tabsAttr"
                   v-on="config.tabsEvent"
                   class="wh100"
                   v-if="isTabs">
            <el-tab-pane v-for="(t, i) in config.data"
                         v-bind="config.tabs[i]"
                         :key="i"
                         :label="config.tabs[i].title">
              <div class="sc-edit_content"
                   :style="formStyle">
                <template v-for="(item, index) of Object.keys(formItem[i])">
                  <el-form-item :prop="`${item}.value`"
                                v-bind="compose(formItem[i][item],index)"
                                v-if="!formItem[i][item].isHide"
                                :key="item">
                    <span slot="label">
                      <span>{{ formItem[i][item].label }}</span>
                      <el-tooltip class="sc-edit_tooltip"
                                  :content="formItem[i][item].tooltip"
                                  v-if="formItem[i][item].tooltip"
                                  placement="top">
                        <i class="el-icon-question"></i>
                      </el-tooltip>
                    </span>
                    <sc-form-tag ref="scFormTag"
                                 :data="formItem[i][item]"
                                 type="edit"
                                 :form="form[item]">
                    </sc-form-tag>
                  </el-form-item>
                </template>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div v-else
               class="sc-edit_content"
               :style="formStyle">
            <template v-for="(item, index) in Object.keys(formItem[0])">
              <el-form-item :prop="`${item}.value`"
                            v-bind="compose(formItem[0][item],index)"
                            v-if="!formItem[0][item].isHide"
                            :key="item">
                <span slot="label">
                  <span>{{ formItem[0][item].label }}</span>
                  <el-tooltip class="sc-edit_tooltip"
                              :content="formItem[0][item].tooltip"
                              v-if="formItem[0][item].tooltip"
                              placement="top">
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </span>
                <sc-form-tag ref="scFormTag"
                             :data="formItem[0][item]"
                             :form="form[item]">
                </sc-form-tag>
              </el-form-item>
            </template>
          </div>
        </el-form>
      </div>
    </div>
    <div slot="footer"
         :class="config.footerClass">
      <formFooterButton mode="edit"
                        :isTemporarily="isTemporarily"
                        :buttonList="config.buttons"
                        @temporarilyClick="onTemporarily(form)"
                        @submitClick="submitValidate"
                        @cancelClick="onCancel"
                        @resetClick="onResetForm()">
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
        this.form = null;
        this.oldData = null;
      }
      this.$emit('update:visible', val);
    },
  },
};
</script>
