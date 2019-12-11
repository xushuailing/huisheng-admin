import { Component, Vue } from 'vue-property-decorator';
import { obj } from '@/lib/@types/sc-param.d';

@Component
export default class Detail extends Vue {
  get id() {
    return this.$route.query.id;
  }

  data: obj = {};

  get order() {
    const order = this.data.order || {};
    const {
      status = '',
      ordernumber = '',
      createtime = '',
      deliveryTime = '',
      finishTime = '',
    } = order;
    return { status, ordernumber, createtime, deliveryTime, finishTime };
  }

  get list() {
    return this.data.order_goods || [];
  }

  get address() {
    return this.data.address;
  }
}
