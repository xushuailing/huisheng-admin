<template>
  <div class="order-address bg-white border-radius-8 p-30 mb-20">
    <h3 class="mt-0">收货信息</h3>
    <sc-edit mode="page"
             :api="api"
             :config="editConfig">
      <template slot="edit-header">&nbsp;</template>
    </sc-edit>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Cascader from './cascader.vue';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class OrderAddress extends Vue {
  $refs!: {
    form: any;
  };

  get id() {
    return this.$route.query.id;
  }

  get api() {
    return ''; //  this.$api.admin.activity.adsSorts.create;
  }

  editConfig: ScForm.Edit = {
    type: 'plain',
    width: '750px',
    'label-width': '110px',
    buttons: [{ mode: 'cancel', isHide: false, sort: 7 }, { mode: 'submit', text: '确认修改' }],
    rules: [],
    data: [
      [
        {
          label: '收货人姓名：',
          prop: 'username',
          tag: { attr: { placeholder: '请输入收货人姓名' } },
        },
        {
          label: '收货人手机号：',
          prop: 'phone',
          tag: { attr: { type: 'tel', placeholder: '请输入收货人手机号' } },
        },
        {
          label: '所属辖区：',
          prop: 'address_group',
          tag: { tagType: 'component', components: Cascader },
        },
        {
          label: '详细地址：',
          prop: 'address',
          tag: { attr: { placeholder: '请输入详细地址' } },
        },
      ],
    ],
    handleSubmit: (data) => {
      console.log('data :', data);
    },
  };

  // TODO: 缺接口
  getDetail() {
    const api = this.$api.merchant.order.show;
    const param = { gid: this.id, shopid: '' };
    this.$http.post(api, param).then((res) => {
      console.log('res: ', res);
    });
  }

  mounted() {
    this.getDetail();
  }
}
</script>
<style lang='scss'>
  .order-address {
    .sc-edit_center {
      margin: 0;
    }
  }
</style>
