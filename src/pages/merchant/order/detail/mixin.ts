import { Component, Vue, Prop } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class Detail extends Vue {
  get id() {
    return this.$route.query.id;
  }

  data: obj = {};

  get order() {
    const order = this.data.order || {};
    const { ordernumber = '', createtime = '' } = order;
    return { ordernumber, createtime };
  }

  get list() {
    return this.data.order_goods || [];
  }

  get address() {
    return this.data.address;
  }
}
