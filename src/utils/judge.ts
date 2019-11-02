import { _DataTypeJudge } from './handlerData';

/** 环境判断 */
export const _IsDev = process.env.NODE_ENV === 'development';

/**
 * 判断是否是Object
 *
 * @param {*} param
 * @returns {boolean}
 */
export const _IsObject = (param: any): boolean => _DataTypeJudge(param) === '[object Object]';

/**
 * 判断是否是Null
 *
 * @param {*} param
 * @returns {boolean}
 */
export const _IsNull = (param: any): boolean => _DataTypeJudge(param) === '[object Null]';

/**
 * 判断是否是fucntion
 *
 * @param {*} param
 * @returns {boolean}
 */
export const _IsFunction = (param: any): boolean => _DataTypeJudge(param) === '[object Function]';

/**
 * 判断数据是否为空
 *
 * @param {any} data 判断数据
 * @param {any[]} [ignore=[]] ignore 忽略固定值
 * @returns {boolean}
 */
export const _DataIsEmpty = (data: any, ignore: any[] = []): boolean => {
  if (ignore.includes(data)) return true;
  let flag = false;
  if (_IsObject(data)) {
    flag = Boolean(Object.keys(data).length);
    if (ignore.includes(JSON.stringify(data))) return true;
  } else if (Array.isArray(data)) {
    flag = Boolean(data.length);
    if (ignore.includes(JSON.stringify(data))) return true;
  } else {
    flag = Boolean(data);
  }
  return flag;
};
