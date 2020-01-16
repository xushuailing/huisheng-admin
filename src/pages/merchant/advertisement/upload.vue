<template>
  <div class='border-radius-8 bg-white p-30'>
    <sc-edit v-if="isInit"
             mode="page"
             :api="api"
             :config="config"
             @emitEditComplete="onEditComplete">
    </sc-edit>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class SettingRoleList extends Vue {
  api = this.$api.merchant.ads.create;

  data: obj = {};

  config: ScForm.Edit = {
    'label-width': '120px',
    params: { id: '' },
    requestMethod: 'get',
    buttons: [
      { mode: 'cancel', isHide: true },
      { mode: 'submit', isHide: false, text: ' 上传' },
    ],
    rules: [
      {
        image: {
          value: [{ required: true, trigger: ['blur', 'change'], message: '请上传 banner 图' }],
        },
        url: { value: [{ required: true, trigger: 'blur', message: '请输入跳转链接' }] },
      },
    ],
    data: [
      [
        {
          label: '上传banner：',
          prop: 'image',
          tag: {
            tagType: 'upload-img',
            attr: { disabled: false, limit: 1, fileSize: 10000 },
          },
        },
        {
          label: '跳转链接：',
          prop: 'url',
          tag: {
            attr: { disabled: false, type: 'url', placeholder: '请输入跳转链接' },
          },
        },
      ],
    ],
    handleSubmit: (data) => (data.id ? data : {}),
  };

  onEditComplete({ status }: { status: boolean }) {
    if (status) this.$router.go(-1);
  }

  isInit = false;

  async getData() {
    const api = this.$api.merchant.ads.bannerDetail;
    const res = await this.$http.get(api, { id: this.$route.query.id });
    const data = res.data || {};
    this.config.data[0].forEach((item) => {
      item.default = data[item.prop];
      item.tag!.attr!.disabled = !!data.image;
    });
    if (data.image) {
      const submitButton = this.config.buttons!.find((btn) => btn.mode === 'submit');
      submitButton && (submitButton.isHide = true);
    }
    this.isInit = true;
  }

  mounted() {
    this.config.params!.id = this.$route.query.id;
    this.getData();
  }
}
</script>
