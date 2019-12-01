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
import { ScForm } from '../../lib/@types/sc-form';
import Condition, { SortItem } from './condition.vue';
import Time from './time.vue';

/**
 router
      {
        path: 'manjian',
        name: '新增优惠券',
        component: () => import('../pages/满减/index.vue'),
        meta: {
          breadcrumb: [{ title: '营销管理' }, { title: '优惠券' }, { title: '新增优惠券' }],
        },
      },
 */

@Component
export default class SettingRoleList extends Vue {
  get api() {
    return ''; //  this.$api.admin.activity.adsSorts.create;
  }

  addConfig: ScForm.Add = {
    width: '70%',
    'label-width': '130px',
    buttons: [{ mode: 'cancel', isHide: false, sort: 7 }, { mode: 'submit', text: '保存' }],
    rules: [
      {
        none1: { value: [{ required: true, trigger: 'blur', message: '请输入优惠券名称' }] },
        none2: {
          value: [
            {
              trigger: 'blur',
              validator: (rule, value: SortItem, callback) => {
                if (value) {
                  if (
                    !(
                      value.checked &&
                      value.data.every((v: any) => Object.keys(v).filter((e) => v[e]).length)
                    )
                  ) {
                    return callback(new Error('请填写完整'));
                  }
                }
                return callback();
              },
            },
          ],
        },
        none3: { value: [{ required: true, trigger: 'change', message: '请输入发放日期' }] },
        none4: {
          value: [
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (value) {
                  if (!(value.radio == 2 && value.date.length)) {
                    return callback(new Error('请填写完整'));
                  }
                }
                return callback();
              },
            },
          ],
        },
      },
    ],
    data: [
      [
        {
          label: '优惠券名称：',
          prop: 'none1',
          tag: { attr: { placeholder: '请输入优惠券名称' } },
        },
        {
          label: '使用条件：',
          prop: 'none2',
          tag: { tagType: 'component', components: Condition },
        },
        {
          label: '发放日期：',
          prop: 'none3',
          tag: {
            tagType: 'date-picker',
            attr: { type: 'datetime', placeholder: '请输入发放日期' },
          },
        },
        {
          label: '有效时间：',
          prop: 'none4',
          tag: { tagType: 'component', components: Time },
        },
        {
          label: '会员规则说明：',
          prop: 'none5',
          tag: { attr: { type: 'textarea', rows: 6, placeholder: '请输入会员规则说明' } },
        },
      ],
    ],
    handleSubmit: (data) => {
      console.log('data :', data);
    },
  };
}
</script>
