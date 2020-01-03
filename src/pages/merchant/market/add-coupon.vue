<template>
  <div ref="form"
       class='border-radius-8 bg-white p-30'>
    <sc-edit v-if="isInit"
             mode="page"
             :api="api"
             :config="config">
    </sc-edit>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ScForm } from '@/lib/@types/sc-form.d';
import Condition, { SortItem } from './condition.vue';
import Time from './time.vue';
import { _IsVirtual, _Shopid } from '../config';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class AddCoupon extends Vue {
  get api() {
    return this.$api.merchant.market.show.coupon.entity;
  }

  isInit = false;

  config = this.getConfig();

  getConfig(): ScForm.Edit {
    return {
      width: '70%',
      'label-width': '130px',
      params: { id: this.$route.query.id, shopid: _Shopid },
      buttons: [{ mode: 'cancel', isHide: false, sort: 7 }, { mode: 'submit', text: '保存' }],
      rules: [
        {
          title: { value: [{ required: true, trigger: 'blur', message: '请输入优惠券名称' }] },
          condition: {
            value: [
              {
                trigger: 'blur',
                validator: (rule, value: SortItem[], callback) => {
                  if (!value) return callback(new Error('缺少限制条件'));
                  if (value.some((v: any) => !Object.keys(v).filter((e) => v[e]).length)) {
                    return callback(new Error('请填写完整'));
                  }
                  return callback();
                },
              },
            ],
          },
          granttime: { value: [{ required: true, trigger: 'change', message: '请输入发放日期' }] },
          coupon_type: {
            value: [
              {
                trigger: 'blur',
                validator: (rule, value, callback) => {
                  if (!value) return callback(new Error('请填写有效时间'));
                  if (!(value.radio == 2 && value.date.length)) {
                    return callback(new Error('请填写完整'));
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
            prop: 'title',
            tag: { attr: { placeholder: '请输入优惠券名称' } },
          },
          {
            label: '使用条件：',
            prop: 'condition',
            tag: { tagType: 'component', components: Condition },
          },
          {
            label: '发放日期：',
            prop: 'granttime',
            tag: {
              tagType: 'date-picker',
              attr: { type: 'datetime', placeholder: '请输入发放日期' },
            },
          },
          {
            label: '有效时间：',
            prop: 'coupon_type',
            handleEdit: (data, prop, allData) => {
              const time = {
                radio: data,
                date: [allData.strtime, allData.endtime],
              };
              return time;
            },
            tag: { tagType: 'component', components: Time },
          },
          {
            label: '满减规则说明：',
            prop: 'introduction',
            tag: { attr: { type: 'textarea', rows: 6, placeholder: '请输入满减规则说明' } },
          },
        ],
      ],
      handleSubmit: (data) => {
        console.log('data :', data);
      },
    };
  }

  getData() {
    const api = this.$api.merchant.market.show.coupon.entity;
    const params = { id: this.$route.query.id, shopid: _Shopid };
    const loading = this.$utils._Loading.show({ target: (this.$refs.form as any).$el });
    // this.$http
    //   .get(api, params)
    //   .then((res) => {
    // console.log('res.data: ', res.data);

    const re = {
      status: true,
      login_code: 1,
      message: '请求成功',
      data: {
        id: 1, // 数据id
        shopid: 1,
        title: '满减优惠活动', // 数据id
        num_one: 100, // 条件1满100
        coupon_price_one: '10.00', // 减10
        num_two: 300, // 条件2满300
        coupon_price_two: '20.00', // 减20
        num_three: 500, // 条件3满500 。最多三个条件
        coupon_price_three: '30.00', // 减30
        granttime: '2019-12-30 20:43:44', // 发放日期
        coupon_type: 0, // 有效时间类型 0永久有效 1时间段有效
        strtime: null, // 时间段有效，开始时间
        endtime: null, // 时间段有效，结束时间
        introduction: '这是满减活动', // 规则介绍
        createtime: '2019-12-30 20:43:44', // 创建时间
      },
    };
    const data: obj = re.data || {};
    const propNums = ['one', 'two', 'three'];
    data.condition = propNums.map((prop) => {
      const item: obj = {};
      item[`num_${prop}`] = data[`num_${prop}`];
      item[`coupon_price_${prop}`] = data[`coupon_price_${prop}`];
      return item;
    });

    this.config.data[0].forEach((item) => {
      this.$set(item, 'default', data[item.prop]);
    });
    this.isInit = true;
    // })
    // .catch((error) => {
    //   console.error('获取满减数据失败: ', error);
    // })
    // .finally(() => {
    loading.close();
    // });
  }

  mounted() {
    this.getData();
  }
}
</script>
