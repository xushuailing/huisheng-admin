<template>
  <div class="admin-rootName bg-white p-15">
    <div class="p-20">
      <sc-add-form mode="page"
                   :api="addApi"
                   :config="getConfig"
                   @emitAddComplete="onAddComplete"> </sc-add-form>

    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScForm } from '../../../lib/@types/sc-form';
@Component
export default class AdminRootName extends Vue {
  isValidation = true;

  get getConfig() {
    return this.isValidation ? this.config1 : this.config2;
  }

  /** 系统管理 >总账号管理 */
  config1: ScForm.Config = {
    handleSubmit: () => false,
    buttons: [
      {
        mode: 'submit',
        text: '更换密码',
      },
    ],
    // rules: [
    //   {
    //     nickname: {
    //       value: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    //     },
    //     phone: {
    //       value: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
    //     },
    //   },
    // ],
    data: [
      [
        {
          label: '用户名',
          prop: 'nickname',
          default: '',
          tag: {
            attr: { disabled: true, placeholder: '请输入用户名' },
          },
        },
        {
          label: '手机号',
          prop: 'phone',
          default: '',
          tag: {
            attr: { disabled: true, placeholder: '请输入手机号', maxlength: 13 },
          },
        },
      ],
    ],
  };

  // TODO: 请求方式 为GET
  config2: ScForm.Config = {
    buttons: [
      {
        mode: 'submit',
        text: '确认更改',
        sort: 1,
      },
      {
        mode: 'cancel',
        sort: 2,
        listeners: {
          click: () => {
            this.switchConfig();
          },
        },
      },
    ],
    rules: [
      {
        oldPsw: {
          value: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        },
        newPsw: {
          value: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        },
      },
    ],
    data: [
      [
        {
          label: '原密码',
          prop: 'old_login_pass',
          tag: {
            attr: { placeholder: '请输入原密码' },
          },
        },
        {
          label: '新密码',
          prop: 'login_pass',
          tag: {
            attr: { placeholder: '请输入新密码' },
          },
        },
      ],
    ],
  };

  get addApi() {
    return this.$api.admin.setting.rootName.update;
  }

  mounted() {
    this.getRootName();
  }

  async getRootName() {
    const api = this.$api.admin.setting.rootName.show;
    const { data } = await this.$http.get(api);
    const nickname = this.$utils._GetConfigItemData(this.config1.data, 'nickname');
    const phone = this.$utils._GetConfigItemData(this.config1.data, 'phone');

    if (nickname) nickname.default = data.nickname;
    if (phone) phone.default = data.phone;
  }

  switchConfig() {
    this.isValidation = !this.isValidation;
  }

  onAddComplete() {
    this.switchConfig();
  }
}
</script>
