<template>
  <div class='border-radius-8 bg-white p-30'>
    <sc-add-form mode="page"
                 :api="api"
                 :config="addConfig">
    </sc-add-form>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScForm } from '@/lib/@types/sc-form.d';

@Component
export default class SettingRoleList extends Vue {
  get api() {
    return ''; //  this.$api.admin.activity.adsSorts.create;
  }

  addConfig: ScForm.Add = {
    buttons: [{ mode: 'cancel', isHide: true }, { mode: 'submit', text: ' 上传' }],
    rules: [
      {
        none1: {
          value: [{ required: true, trigger: ['blur', 'change'], message: '请上传 banner 图' }],
        },
        none2: { value: [{ required: true, trigger: 'blur', message: '请输入跳转链接' }] },
      },
    ],
    data: [
      [
        {
          label: '上传banner：',
          prop: 'none1',
          tag: {
            tagType: 'upload-img',
            attr: { limit: 1, fileSize: 10000 },
          },
        },
        {
          label: '跳转链接：',
          prop: 'none2',
          tag: { attr: { type: 'url', placeholder: '请输入跳转链接' } },
        },
      ],
    ],
    handleSubmit: (data) => {
      console.log('data :', data);
    },
  };
}
</script>
