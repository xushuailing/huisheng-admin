export interface Dictionary<T = any> {
  [x: string]: T;
}
export interface UserInfo {
  com_phone: string;
  company: string;
  id: string | number;
  level: string;
  nickname: string;
  phone: string;
  shopid: string | number;
  shopname: string;
  typeid: string | number;
  username: string;
}

export interface LoginDate {
  access_token: string;
  data: UserInfo;
}
