import { Component, Vue } from 'vue-property-decorator';
import { _Shopid } from '../config';
import { obj } from '@/lib/@types/sc-param.d';

const _toPairs = require('lodash/toPairs');

interface Option {
  name: string;
  id: string;
}

@Component
export default class AddMixin extends Vue {
  get id() {
    return this.$route.query.id;
  }

  get isDetail() {
    // TODO: params 拿不到
    console.log('!!this.$route: ', this.$route);
    return !!this.$route.query.detail;
  }

  sorts: Option[] = [];

  form!: obj;

  async getDetail() {
    const loading = this.$utils._Loading.show();
    const api = this.$api.merchant.product.show;
    const params = { gid: this.id, shopid: _Shopid };
    try {
      const res = await this.$http.get(api, params);
      console.log('res: ', res);
      if (res.status) {
        const data = res.data || {};
        Object.keys(this.form).forEach((key) => {
          if (key in data) {
            if (key === 'image') {
              this.form.image[0] = data[key];
            } else {
              (this.form as obj)[key] = data[key];
            }
          }
        });
      } else {
        this.$message.error('获取商品数据失败');
      }
    } catch (error) {
      this.$utils._ResponseError(error);
    }
    loading.close();
  }

  async getSorts() {
    const api = this.$api.merchant.product.types;
    const res = await this.$http.get(api, { limit: 10e5 });
    this.sorts = res.data || [];
    // const api = this.$api.merchant.product.goodsType;
    // const res = await this.$http.get(api, { shopid: _Shopid });
    // this.sorts = res.data || [];
  }

  mounted() {
    this.getSorts();
    if (this.isDetail) {
      this.getDetail();
    }
  }
}
