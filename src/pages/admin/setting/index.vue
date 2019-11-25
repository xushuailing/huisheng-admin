<template>
  <div class='admin-setting'>

    <div class=" p-15 bg-white mt-20 border-radius-4">
      <div class="flex flex-ac flex-jsb font-18">
        <span>用户指南</span>
        <el-button @click="onEditText('user_guide','用户指南')"
                   type="primary"
                   plain>修改</el-button>
      </div>
      <div class="mt-15 font-text-regular"
           style="white-space:pre-wrap">
        <span v-text="formData.user_guide||'暂无'"></span>
      </div>

    </div>
    <div class="p-15 bg-white mt-20 border-radius-4">
      <div class="flex flex-ac flex-jsb font-18">
        <span>用户协议</span>
        <el-button @click="onEditText('user_agreement','用户协议')"
                   type="primary"
                   plain>修改</el-button>
      </div>
      <div class="mt-15 font-text-regular"
           style="white-space:pre-wrap">
        <span v-text="formData.user_agreement||'暂无'"></span>
      </div>
    </div>
    <div class=" p-15 bg-white mt-20 border-radius-4">
      <div class="flex flex-ac flex-jsb font-18">
        <span>莱赶集规则及服务保障</span>
        <el-button @click="onEditText('user_rules','莱赶集规则及服务保障')"
                   type="primary"
                   plain>修改</el-button>
      </div>
      <div class="mt-15 font-text-regular">
        <span v-text="formData.user_rules||'暂无'"></span>
      </div>
    </div>
    <div class=" p-15 bg-white mt-20 border-radius-4">
      <div class="flex flex-ac flex-jsb font-18">
        <span>营业执照</span>
        <el-button @click="onEditText('business_license','营业执照')"
                   type="primary"
                   plain>修改</el-button>
      </div>
      <div class="mt-15">
        <div style="height:120px"
             v-if="imgs.length">
          <img v-for="img in imgs"
               :key="img"
               style="width:200px"
               class="h100 mr-15 border-horizontal border-vertical border-radius-8"
               :src="img"
               alt="">
        </div>
        <div v-else>
          暂无
        </div>
      </div>
    </div>
    <el-dialog :title="dialogConfig.title"
               :visible.sync="dialogConfig.visible">
      <div v-if="key!=='business_license'">
        <el-input type="textarea"
                  :autofocus="{ minRows: 4, maxRows: 6 }"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="value" />
      </div>
      <div v-else>
        <sc-upload ref="ElUpload"
                   :limit="2"
                   v-model="value"></sc-upload>
      </div>
      <span slot="footer">
        <el-button @click="dialogConfig.visible = false">取 消</el-button>
        <el-button type="primary"
                   @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { obj } from '../../../lib/@types/sc-param';
@Component
export default class AdminSetting extends Vue {
  dialogConfig = {
    visible: false,
    title: '修改内容',
  };

  key = '';

  value = '';

  textarea = '';

  // imageList = [];

  formData: obj = {
    id: '',
    user_guide: '',
    user_agreement: '',
    user_rules: '',
    business_license: [],
  };

  get imgs() {
    return this.$utils._DataTypeChange(this.formData.business_license);
  }

  mounted() {
    this.getFormData();
  }

  async getFormData() {
    const api = this.$api.admin.setting.platform.systemShow;
    const { data } = await this.$http.get(api);
    this.formData = data;
  }

  onEditText(prop: string, title: string, docs: string) {
    this.dialogConfig.title = title;
    this.dialogConfig.visible = true;
    this.key = prop;
    this.value = this.formData[prop];
  }

  onSubmit() {
    const api = this.$api.admin.setting.platform.systemUpdate;
    this.$http
      .post(api, {
        ...this.formData,
        [this.key]: this.value,
      })
      .then((res) => {
        this.formData[this.key] = this.value;
      })
      .finally(() => {
        this.dialogConfig.visible = false;
      });
  }
}
</script>
