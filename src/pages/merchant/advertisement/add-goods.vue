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
    buttons: [{ mode: 'submit', text: ' 上传' }],
    rules: [],
    data: [
      [
        {
          label: '添加商品：',
          prop: 'none2',
          tag: { attr: { type: 'url', placeholder: '请输入商品ID' } },
        },
      ],
    ],
  };
}
</script>
