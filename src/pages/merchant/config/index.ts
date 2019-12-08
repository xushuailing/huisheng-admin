import Storage from '@/utils/storage';

const userInfo = Storage.get('user_info');

export const _Uid = userInfo.id;

export const _Shopid = userInfo.shopid;
