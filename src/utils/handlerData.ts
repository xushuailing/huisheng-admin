import { Dictionary } from '@/@types/index.d';

/**
 * 深拷贝
 *
 * @param {Object} source 拷贝对象
 * @returns new Object
 */
export const _Clone = <T = any>(source: T): T => {
  let target: any;
  if (typeof source === 'object' && source !== null) {
    target = Array.isArray(source) ? [] : {};
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (typeof source[key] !== 'object') {
          target[key] = source[key];
        } else {
          target[key] = _Clone(source[key]);
        }
      }
    }
  } else {
    target = source;
  }
  return target;
};

/**
 * 处理金额格式
 *
 * @param {String,Number} num
 * @returns {string} 返回的是字符串23,245.12保留2位小数
 */
export const _ToMoney = (num: number | string): string => {
  num = Number(num).toFixed(2);
  num = parseFloat(num);
  num = num.toLocaleString();
  return num;
};

/**
 * 字符串分割数组
 *
 * @param {((any)[] | string)} data 数据
 * @param {string} [sign=','] 分割符
 * @returns {(any)[]}
 */
export const _DataTypeChange = (data: any[] | string, sign: string = ','): any[] => {
  if (data) {
    return Array.isArray(data) ? data : data.split(sign);
  }
  return [];
};

/**
 * 判断数据的类型 handler
 *
 * @param {*} data
 * @example
 * 'xxx' => "[object String]"
 * 123 => "[object Number]"
 * false => "[object Boolean]"
 * [] => "[object Array]"
 * {} => '[object Object]'
 * null => "[object Null]"
 * f=>f => "[object Function]"
 * undefined => "[object Undefined]"
 *
 * @returns [object *]
 */
export const _DataTypeJudge = (data: any): string => Object.prototype.toString.call(data);

/**
 * 处理 `tree` 的 `children:[]` 时
 *
 * 设置为 `children:null`
 *
 * @param {obj[]} data
 * @returns obj[]
 */
export const _HandlerTreeChildren = (data: Dictionary[]) => {
  data.forEach((e) => {
    if (e.children) {
      if (e.children.length) {
        _HandlerTreeChildren(e.children);
      } else {
        e.children = null;
      }
    } else {
      e.children = null;
    }
  });
  return data;
};
