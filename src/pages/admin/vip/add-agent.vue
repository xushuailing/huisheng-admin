<template>
  <div class="admin-rootName bg-white p-15">
    <div class="p-20">
      <sc-add-form mode="page"
                   :api="addApi"
                   :config="config">
      </sc-add-form>
    </div>

  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScForm } from '../../../lib/@types/sc-form';
@Component
export default class AdminRootName extends Vue {
  dialogShow = false;

  config: ScForm.Config = {
    buttons: [
      {
        mode: 'submit',
        text: '添加',
      },
    ],
    data: [
      [
        {
          label: '代理姓名：',
          prop: 'name',
          tag: {
            attr: { placeholder: '请输入代理姓名' },
          },
        },
        {
          label: '电话：',
          prop: 'phone',
          tag: {
            attr: { placeholder: '请输入电话' },
          },
        },
        {
          label: '代理级别：',
          prop: 'agent_level',
          tag: {
            tagType: 'select',
            options: [
              {
                value: 1,
                label: '1',
              },
              {
                value: 2,
                label: '2',
              },
              {
                value: 3,
                label: '3',
              },
            ],
            attr: { placeholder: '请选择代理级别' },
          },
        },
      ],
    ],
    rules: [
      {
        name: {
          value: [{ required: true, message: '请输入代理姓名', trigger: 'blur' }],
        },
        phone: {
          value: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        },
        agent_level: {
          value: [{ required: true, message: '请输入代理级别', trigger: 'change' }],
        },
      },
    ],
  };

  get addApi() {
    return this.$api.admin.vip.level.create;
  }
}
</script>
