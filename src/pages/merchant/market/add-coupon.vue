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

const propNums = ['one', 'two', 'three'];

@Component
export default class AddCoupon extends Vue {
  get api() {
    return this.$api.merchant.market.update.coupon.entity;
  }

  isInit = false;

  config = this.getConfig();

  getConfig(): ScForm.Edit {
    return {
      width: '70%',
      'label-width': '130px',
      formAttr: { 'label-position': 'right' },
      bodyType: 'json',
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
                    return callback(new Error('使用条件未填写完整'));
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
                  if (!value) return callback(new Error('请选择有效时间'));
                  if (value.coupon_type && !value.date.length) {
                    return callback(new Error('请选择有效时间'));
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
            handle: (data) => {
              const condition = propNums.reduce((item, prop, i) => {
                item[`num_${prop}`] = data[i] && data[i].num;
                item[`coupon_price_${prop}`] = data[i] && data[i].coupon_price;
                return item;
              }, Object.create(null));
              return condition;
            },
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
            handle: (data) => {
              const [strtime, endtime] = data.date;
              return { coupon_type: data.coupon_type, strtime, endtime };
            },
            handleEdit: (data, prop, allData) => {
              const time = {
                coupon_type: data,
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
        const formData = { ...data, ...data.condition, ...data.coupon_type };
        delete formData.condition;
        console.log('formData: ', formData);
        // return {};
        return formData;
      },
    };
  }

  getData() {
    const api = this.$api.merchant.market.show.coupon.entity;
    const params = { id: this.$route.query.id, shopid: _Shopid };
    const loading = this.$utils._Loading.show({ target: (this.$refs.form as any).$el });
    this.$http
      .get(api, params)
      .then((res) => {
        console.log('res.data: ', res.data);
        const data: obj = res.data || {};
        data.condition = propNums.map((prop) => {
          const item: obj = {};
          item.num = data[`num_${prop}`];
          item.coupon_price = data[`coupon_price_${prop}`];
          return item;
        });

        this.config.data[0].forEach((item) => {
          item.default = item.handleEdit ?
            item.handleEdit(data[item.prop], item.prop, data) :
            data[item.prop];
        });
        this.isInit = true;
      })
      .catch((error) => {
        console.error('获取满减数据失败: ', error);
      })
      .finally(() => {
        loading.close();
      });
  }

  mounted() {
    this.getData();
  }
}
</script>
