import { Component, Vue } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';
import { _Shopid, _IsVirtual } from '../config';

interface CouponsItem {
  id: string;
  title: string;
  desc?: string;
}

@Component
export default class Market extends Vue {
  list: CouponsItem[] = [];

  onOpen({ id, type }: obj<string>) {
    const path = type === 'discount' || _IsVirtual ? 'add' : 'add-discount';
    this.$router.push({ path, query: { id } });
  }

  getList() {
    const loading = this.$utils._Loading.show();
    const api = _IsVirtual ? 'virtual' : 'entity';
    this.$http
      .get(this.$api.merchant.market.index[api], { shopid: _Shopid })
      .then((res) => {
        let { discount = [], coupon = [] } = res.data || {};
        discount = discount.map((e: obj) => ({ ...e, type: 'discount' }));
        coupon = coupon.map((e: obj) => ({ ...e, type: 'coupon' }));
        this.list = [...discount, ...coupon];
      })
      .catch((err) => {
        this.$utils._ResponseError(err);
      })
      .finally(() => {
        loading.close();
      });
  }

  mounted() {
    this.getList();
  }
}
