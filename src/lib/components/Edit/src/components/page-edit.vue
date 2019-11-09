<template>
  <div class='sc-edit sc-edit_page'>
    <slot name="edit-header">
      <sc-header class="mb-30"
                 :header="config.header">
        <slot name="edit-header-btn"></slot>
      </sc-header>
    </slot>
    <div v-if="form"
         :style="{width:config.width||'50%'}"
         class="sc-edit_center">
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
            <el-tab-pane v-for="(t,i) in config.data"
                         v-bind="config.tabs[i]"
                         :key="i"
                         :label="config.tabs[i].title">
              <div class="sc-edit_content"
                   :style="formStyle">
                <template v-for="(item,index) of Object.keys(formItem[i])">
                  <el-form-item :prop="`${item}.value`"
                                v-bind="compose(formItem[i][item],index)"
                                v-if="!formItem[i][item].isHide"
                                :key="item">
                    <span slot="label">
                      <span>{{formItem[i][item].label}}</span>
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
            <template v-for="(item,index) in Object.keys(formItem[0])">
              <el-form-item :prop="`${item}.value`"
                            v-bind="compose(formItem[0][item],index)"
                            v-if="!formItem[0][item].isHide"
                            :key="item">
                <span slot="label">
                  <span>{{formItem[0][item].label}}</span>
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
      <div class="pb-20 pt-20"
           :style="{paddingLeft:labelWidth}"
           :class="config.footerClass">
        <formFooterButton mode="edit"
                          :isTemporarily="isTemporarily"
                          :buttonList="config.buttons"
                          @temporarilyClick="onTemporarily(form)"
                          @submitClick="submitValidate"
                          @cancelClick="onCancel('page')"
                          @resetClick="onResetForm()"
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
  .sc-edit {
    &_center {
      margin: 0 auto;
    }
  }
</style>
