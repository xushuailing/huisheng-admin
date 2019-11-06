export interface ScLimit {
  /** 权限标识符 (空则有权限) */
  key: string | string[];

  /**
   * 权限控制模式
   *
   * 可选值值: `disabled` / `delete` / `warning`
   *
   * 默认值: `disabled`
   */
  mode?: string;

  /**
   * 警告提示语
   *
   * `mode=warning` 时生效
   *
   * 默认值: `您的权限不足，无法操作！`
   */
  msg?: string;
}

export interface obj<T = any> {
  [key: string]: T;
}

/** 搜索类型 */
export interface Query {
  /** 搜索关联 */
  lr?: 'and' | 'or' | string;
  /** 搜索方式 */
  operate: 'EQ' | 'LIKE' | 'BTW' | 'IN' | string;
  /** 搜索字段 */
  prop: string;
  /** 搜索值 */
  value: any;
}

/** 筛选字段 */
export interface Sorts {
  /** 筛选字段 */
  orderField: string;
  /** 筛选类型 */
  orderType: 'DESC' | 'ASC' | string;
}
