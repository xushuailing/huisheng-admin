<template>
  <div class='h100 bg-white p-30'>
    <sc-add-form mode="page"
                 :api="api"
                 :config="addConfig">
    </sc-add-form>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import EffectDate from './components/effective-date.vue';
import { ScForm } from '@/lib/@types/sc-form.d';

@Component
export default class ActvPreferentialAdd extends Vue {
  api = this.$api.admin.activity.coupon.create;

  addConfig: ScForm.Add = {
    'label-width': '150px',
    params: { shopid: 0, coupon_type: 0 },
    buttons: [{ mode: 'cancel', isHide: false, sort: 7 }, { mode: 'submit', text: '保存' }],
    rules: [
      {
        title: {
          value: [{ required: true, message: '请输入优惠券名称', trigger: 'blur' }],
        },
        c_price: {
          value: [{ required: true, message: '请输入面额', trigger: 'blur' }],
        },
        strtime: {
          value: [{ required: true, message: '请选择发放日期', trigger: 'change' }],
        },
      },
    ],
    data: [
      [
        {
          label: '优惠券名称：',
          prop: 'title',
          tag: { attr: { placeholder: '请输入优惠券名称' } },
        },
        {
          label: '面额：',
          prop: 'c_price',
          tag: {
            attr: {
              type: 'number',
              slot: {
                attr: { slot: 'append' },
                component: Vue.extend({
                  render(h) {
                    return h('span', {}, '元');
                  },
                }),
              },
              placeholder: '请输入面额',
            },
          },
        },
        {
          label: '使用条件：',
          prop: 'condition',
          handle: (data) => (data === '0' ? data : '1'),
          tag: { tagType: 'checkbox', options: [{ label: '无条件使用', value: '0' }] },
        },
        {
          label: '发放日期：',
          prop: 'strtime',
          tag: {
            tagType: 'date-picker',
            attr: { type: 'date', placeholder: '请选择发放日期' },
          },
        },
        // {
        //   label: '有效日期：',
        //   prop: 'endtime',
        //   tag: {
        //     tagType: 'component',
        //     components: EffectDate,
        //   },
        // },
      ],
    ],
  };
}
</script>
