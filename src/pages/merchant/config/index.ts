import Storage from '@/utils/storage';

const userInfo = Storage.get('user_info');

export const _Uid = userInfo.id;

export const _Shopid = userInfo.shopid;

export const _PayType = { 1: '余额', 2: '微信支付', 3: '支付宝支付' };

export const _RefundStatus = { 0: '发起退款', 1: '商家受理同意', 2: '商家受理驳回' };
