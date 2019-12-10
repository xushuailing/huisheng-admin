import Storage from '@/utils/storage';

const userInfo = Storage.get('user_info');

export const _Uid = userInfo.id;

export const _Shopid = userInfo.shopid;

export const _PayType = { 1: '余额', 2: '微信支付', 3: '支付宝支付' };
