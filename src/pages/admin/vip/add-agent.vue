<template>
  <div class="admin-rootName bg-white p-15">
    <div class="p-20">
      <sc-add-form mode="page"
                   :api="addApi"
                   :config="config"> </sc-add-form>
    </div>

  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class AdminRootName extends Vue {
  dialogShow = false;

  config = {
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
          prop: 'none1',
          tag: {
            attr: { placeholder: '请输入代理姓名' },
          },
        },
        {
          label: '电话：',
          prop: 'none2',
          tag: {
            attr: { placeholder: '请输入电话' },
          },
        },
        {
          label: '代理级别：',
          prop: 'none3',
          tag: {
            tagType: 'select',
            options: [
              {
                value: 1,
                label: '启用',
              },
              {
                value: 0,
                label: '不启用',
              },
              {
                value: 2,
                label: '不启用1',
              },
            ],
            attr: { placeholder: '请输入代理级别' },
          },
        },
      ],
    ],
  };

  get addApi() {
    return '';
  }
}
</script>
