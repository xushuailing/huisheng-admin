<template>
  <div class='admin-vip-rules'>

    <div class=" p-15 bg-white mt-20 border-radius-4">
      <div class="flex flex-ac flex-jsb font-18">
        <span>用户须知</span>
        <el-button @click="onEditText('user','用户须知')"
                   type="primary"
                   plain>修改</el-button>
      </div>
      <div class="mt-15 font-text-regular"
           style="white-space:pre-wrap">
        <span v-text="formData.user||'暂无'"></span>
      </div>

    </div>
    <div class="p-15 bg-white mt-20 border-radius-4">
      <div class="flex flex-ac flex-jsb font-18">
        <span>会员说明</span>
        <el-button @click="onEditText('level','会员说明')"
                   type="primary"
                   plain>修改</el-button>
      </div>
      <div class="mt-15 font-text-regular"
           style="white-space:pre-wrap">
        <span v-text="formData.level||'暂无'"></span>
      </div>
    </div>
    <div class=" p-15 bg-white mt-20 border-radius-4">
      <div class="flex flex-ac flex-jsb font-18">
        <span>代理说明</span>
        <el-button @click="onEditText('agent','代理说明')"
                   type="primary"
                   plain>修改</el-button>
      </div>
      <div class="mt-15 font-text-regular"
           style="white-space:pre-wrap">
        <span v-text="formData.agent||'暂无'"></span>
      </div>
    </div>
    <el-dialog :title="dialogConfig.title"
               :visible.sync="dialogConfig.visible">
      <el-input type="textarea"
                :autofocus="{ minRows: 4, maxRows: 6 }"
                :rows="4"
                placeholder="请输入内容"
                v-model="value" />
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
export default class AdminVipRules extends Vue {
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
    user: '',
    level: '',
    agent: '',
  };

  get imgs() {
    return this.$utils._DataTypeChange(this.formData.business_license);
  }

  mounted() {
    this.getFormData();
  }

  async getFormData() {
    const api = this.$api.admin.vip.rules.textShow;
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
    const api = this.$api.admin.vip.rules.textUpdate;
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
