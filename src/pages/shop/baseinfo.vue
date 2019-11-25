<template>
  <div class='admin-rootName bg-white p-15'>
    <div class="p-20">
      <sc-add-form mode="page"
                   :api="api"
                   :config="config">
      </sc-add-form>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScForm } from '@/lib/@types/sc-form.d';

@Component
export default class ShopBaseInfo extends Vue {
  api = this.$api.merchant.shop.update;

  /** 店铺管理 >信息修改 */
  config: ScForm.Add = {
    buttons: [{ mode: 'submit', text: '上传审核', attrs: { plain: false, type: 'primary' } }],
    params: { shopid: '', uid: '' },
    rules: [
      {
        company: { value: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }] },
        com_logo: { value: [{ required: true, message: '请上传店铺标志', trigger: 'blur' }] },
        com_phone: { value: [{ required: true, message: '请输入服务电话', trigger: 'blur' }] },
        opentime: {
          value: [{ required: true, message: '请选择开店时间', trigger: ['blur', 'change'] }],
        },
        none222: { value: [{ required: true, message: '请输入经营品类', trigger: 'blur' }] },
        delivery: { value: [{ required: true, message: '请输入配送方式', trigger: 'blur' }] },
        license: {
          value: [{ required: true, message: '请上传营业执照', trigger: ['blur', 'change'] }],
        },
        id: {
          value: [{ required: true, message: '请上传身份证正反面', trigger: ['blur', 'change'] }],
        },
      },
    ],
    data: [
      [
        {
          label: '店铺名称：',
          prop: 'company',
          tag: { attr: { placeholder: '请输入店铺名称' } },
        },
        {
          label: '店铺标志：',
          prop: 'com_logo',
          tooltip: '只支持.jpg 或png格式，文件大小80k以内，建议尺寸80px*80px',
          tag: { tagType: 'upload-img', attr: { limit: 1 } },
        },
        {
          label: '掌柜名称：',
          prop: 'username',
          tag: { attr: { placeholder: '请输入掌柜名称' } },
        },
        {
          label: '服务电话：',
          prop: 'com_phone',
          tag: {
            attr: { placeholder: '请输入服务电话', type: 'number' },
          },
        },
        {
          label: '开店时间：',
          prop: 'opentime',
          tag: {
            tagType: 'date-picker',
            attr: { placeholder: '请选择开店时间', type: 'datetime' },
          },
        },
        {
          label: '营业时间：',
          prop: 'businesstime',
          tag: {
            tagType: 'time-picker',
            attr: {
              'start-placeholder': '营业开始时间',
              'end-placeholder': '营业结束时间',
              'is-range': true,
            },
          },
        },
        {
          label: '经营品类：',
          prop: 'none222',
          tag: {
            attr: { placeholder: '请输入经营品类', type: 'number' },
          },
        },
        {
          label: '配送方式：',
          prop: 'delivery',
          tag: { attr: { placeholder: '请输入配送方式' } },
        },
        {
          label: '营业执照：',
          prop: 'license',
          tag: {
            tagType: 'upload-img',
            attr: { limit: 1 },
          },
        },
        {
          label: '身份证：',
          prop: 'id',
          tag: {
            tagType: 'upload-img',
            attr: { limit: 2 },
          },
        },
      ],
    ],
    handleSubmit: (data) => {
      const [positive, back] = data.id && data.id.split(',');
      data.card_positive = positive;
      data.card_back = back;
      return data;
    },
  };
}
</script>
