import { Component, Vue } from 'vue-property-decorator';

const STATUS = {
  0: '全部订单',
  1: '未支付',
  2: '已支付，待发货',
  3: '已发货，待收货',
  4: '已收货，待评价',
  5: '交易完成',
  6: '申请售后',
  7: '取消/关闭订单',
};

@Component
export default class OrderMixin extends Vue {
  getStatus(status: keyof typeof STATUS) {
    return STATUS[status] || '退货退款中';
  }

  getWidth(width: any) {
    return { width: width ? `${width}px` : 'auto', flex: width ? 'none' : 1 };
  }
}
