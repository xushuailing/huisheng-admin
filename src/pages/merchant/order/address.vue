<template>
  <div class="order-address bg-white border-radius-8 p-30 mb-20">
    <h3 class="mt-0">收货信息</h3>
    <sc-edit v-if="isInit"
             mode="page"
             :api="api"
             :config="editConfig">
    </sc-edit>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Cascader from './cascader.vue';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';
import { _Uid } from '../config';

@Component
export default class OrderAddress extends Vue {
  $refs!: {
    form: any;
  };

  isInit = false;

  get id() {
    return this.$route.query.id;
  }

  get api() {
    return this.$api.merchant.order.address.update;
  }

  editConfig: ScForm.Edit = {
    type: 'plain',
    width: '820px',
    'label-width': '110px',
    requestMethod: 'get',
    params: { ordernumber: '' },
    buttons: [{ mode: 'submit', text: '确认修改' }],
    rules: [
      {
        phone: {
          value: [
            {
              trigger: ['blur'],
              validator: (rule, value, callback) => {
                if (this.$utils._ValidatePhone(value)) {
                  return callback();
                }
                return callback(new Error('手机号格式错误'));
              },
            },
          ],
        },
      },
    ],
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
          prop: 'address_title',
          tag: { attr: { placeholder: '请输入详细地址' } },
        },
      ],
    ],
    handleSubmit: (data) => {
      const res = { ...data, ...(data.address_group || {}) };
      delete res.address_group;
      return res;
    },
  };

  getDetail() {
    const loading = this.$utils._Loading.show();
    const api = this.$api.merchant.order.show;
    const param = { uid: _Uid, oid: this.id };
    this.$http
      .get(api, param)
      .then((res) => {
        const { ordernumber = '' } = (res.data && res.data.order) || {};
        this.editConfig.params!.ordernumber = ordernumber;

        const data = res.data && res.data.address;
        if (data) {
          data.address_group = {
            address_provinces_id: data.address_provinces_id,
            address_city_id: data.address_city_id,
            address_areas_id: data.address_areas_id,
          };
          this.editConfig.data.forEach((v, i) => {
            v.forEach((e, ii) => {
              const defaultData = e.handleEdit ?
                e.handleEdit(data[e.prop], e.prop, data) :
                data[e.prop];
              this.$set(this.editConfig.data[i][ii], 'default', defaultData);
            });
          });
        }
      })
      .finally(() => {
        this.isInit = true;
        loading.close();
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
