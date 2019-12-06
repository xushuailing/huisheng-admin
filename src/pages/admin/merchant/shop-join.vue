<template>
  <div class='admin-setting'>

    <div class=" p-15 bg-white mt-20 border-radius-4">
      <div class="flex flex-ac flex-jsb font-18">
        <span>商家入驻保证金额</span>
        <el-button @click="onEditText('bond_price','商家入驻保证金额')"
                   type="primary"
                   plain>修改</el-button>
      </div>
      <div class="mt-15 font-text-regular"
           style="white-space:pre-wrap">
        <span>&yen;</span>
        <span v-text="formData.bond_price"></span>
      </div>

    </div>
    <div class="p-15 bg-white mt-20 border-radius-4">
      <div class="flex flex-ac flex-jsb font-18">
        <span>商家入驻客服电话</span>
        <el-button @click="onEditText('bond_tel','商家入驻客服电话')"
                   type="primary"
                   plain>修改</el-button>
      </div>
      <div class="mt-15 font-text-regular"
           style="white-space:pre-wrap">
        <span v-text="formData.bond_tel"></span>
      </div>
    </div>
    <div class=" p-15 bg-white mt-20 border-radius-4">
      <div class="flex flex-ac flex-jsb font-18">
        <span>商家入驻常见问题</span>
        <el-button @click="onEditText('bond_questions','商家入驻常见问题')"
                   type="primary"
                   plain>修改</el-button>
      </div>
      <div class="mt-15 font-text-regular">
        <span v-text="formData.bond_questions"></span>
      </div>
    </div>

    <el-dialog :title="dialogConfig.title"
               :visible.sync="dialogConfig.visible">
      <div>
        <el-input v-if="key=='bond_questions'"
                  type="textarea"
                  :autofocus="{ minRows: 4, maxRows: 6 }"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="value">
        </el-input>
        <el-input v-else
                  placeholder="请输入内容"
                  maxlength="11"
                  clearable
                  v-model="value">
          <template slot="prepend"
                    v-if="key=='bond_price'">
            &yen;
          </template>
        </el-input>

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
    bond_price: '',
    bond_tel: '',
    bond_questions: '',
  };

  get imgs() {
    return this.$utils._DataTypeChange(this.formData.business_license);
  }

  mounted() {
    this.getFormData();
  }

  async getFormData() {
    const api = this.$api.admin.merchant.shop.shopJoinShow;
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
    const api = this.$api.admin.merchant.shop.shopJoinUpdate;
    this.$http
      .get(api, {
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
