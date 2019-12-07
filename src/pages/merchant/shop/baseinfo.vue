<template>
  <div class='shop-info bg-white p-15'>
    <div class="p-20">
      <sc-add-form v-if="isInit"
                   mode="page"
                   :api="api"
                   :config="config"
                   @emitAddComplete="onAddComplete">
      </sc-add-form>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue, Mixins } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import GetIds from '../mixins/getIds';
import UploadCard from './upload-card.vue';
import { ScForm } from '@/lib/@types/sc-form.d';
import { State } from '@/store/common';
import { obj } from '@/lib/@types/sc-param.d';

@Component({ components: { UploadCard } })
export default class ShopBaseInfo extends Mixins(GetIds) {
  @(namespace('common').Action) getShopTypes!: () => Promise<State['shopTypes']>;

  isInit = false;

  api = this.$api.merchant.shop.update;

  /** 店铺管理 >信息修改 */
  get config(): ScForm.Add {
    return {
      'label-width': '110px',
      buttons: [{ mode: 'submit', text: '上传审核', attrs: { plain: false, type: 'primary' } }],
      params: { shopid: this.shopid, uid: this.uid },
      rules: [
        {
          company: { value: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }] },
          com_logo: { value: [{ required: true, message: '请上传店铺标志', trigger: 'blur' }] },
          com_phone: { value: [{ required: true, message: '请输入服务电话', trigger: 'blur' }] },
          opentime: {
            value: [{ required: true, message: '请选择开店时间', trigger: ['blur', 'change'] }],
          },
          typeid: { value: [{ required: true, message: '请输入经营品类', trigger: 'blur' }] },
          delivery: { value: [{ required: true, message: '请输入配送方式', trigger: 'blur' }] },
          license: {
            value: [{ required: true, message: '请上传营业执照', trigger: ['blur', 'change'] }],
          },
          card: {
            value: [
              { required: true, message: '请上传身份证正反面', trigger: ['blur', 'change'] },
              { validator: this.checkCard, trigger: ['blur', 'change'] },
            ],
          },
        },
      ],
      data: [
        [
          {
            label: '店铺名称：',
            prop: 'shopname',
            tag: { attr: { placeholder: '请输入店铺名称' } },
          },
          {
            label: '店铺标志：',
            prop: 'com_logo',
            tooltip: '只支持.jpg 或png格式，文件大小80k以内，建议尺寸80px*80px',
            tag: { tagType: 'upload-img', attr: { limit: 1, returnType: 'url' } },
          },
          {
            label: '姓名：',
            prop: 'username',
            tag: { attr: { placeholder: '请输入姓名' } },
          },
          {
            label: '证件号码：',
            prop: 'username',
            tag: { attr: { placeholder: '请输入证件号码' } },
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
                'value-format': 'HH:mm:ss',
                'is-range': true,
              },
            },
          },
          {
            label: '经营品类：',
            prop: 'typeid',
            tag: {
              tagType: 'select',
              options: this.getShopTypes,
              attr: { placeholder: '请选择经营品类' },
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
            isFull: true,
            tag: {
              tagType: 'upload-img',
              attr: { limit: 1, returnType: 'url' },
            },
          },
          {
            label: '身份证：',
            prop: 'card',
            handleEdit: (d, p, all) => ({ positive: all.card_positive, back: all.card_back }),
            tag: {
              tagType: 'component',
              components: UploadCard,
            },
          },
        ],
      ],
      handleSubmit: (data) => {
        const { positive, back } = data.card || {};
        data.card_positive = positive;
        data.card_back = back;
        // data.status = 0;
        delete data.card;
        console.log('data: ', data);
        return data;
      },
    };
  }

  checkCard(rule: obj, value: obj, callback: Function) {
    const { positive, back } = value;
    if (!positive) {
      return callback(new Error('请上传身份证正面照片'));
    }
    if (!back) {
      return callback(new Error('请上传身份证反面照片'));
    }
    return callback();
  }

  async getDetail() {
    const loading = this.$utils._Loading.show();
    try {
      const api = this.$api.merchant.shop.show;
      const params = { uid: this.uid, shopid: this.shopid };
      const res = await this.$http.get(api, params);
      const data = res.data || {};
      if (res.status) {
        this.init(data);
      } else {
        this.$message.error('获取数据失败');
      }
    } catch (error) {
      this.$utils._ResponseError(error);
    }
    this.isInit = true;
    loading.close();
  }

  init(data: obj) {
    this.config.data.forEach((v, i) => {
      v.forEach((e, ii) => {
        const defaultData = e.handleEdit ? e.handleEdit(data[e.prop], e.prop, data) : data[e.prop];
        this.$set(this.config.data[i][ii], 'default', defaultData);
      });
    });
  }

  onAddComplete({ status }: { status: boolean }) {
    if (status) {
      this.$router.push('auth');
    }
  }

  mounted() {
    if (this.userInfo) this.getDetail();
  }
}
</script>
<style lang="scss">
  .shop-info {
    .el-form-item__content {
      line-height: inherit;
    }
  }
</style>
