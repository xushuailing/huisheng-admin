import ScTags from './sc-form-tags.d';
import { obj, Query, Sorts, OperateType } from './sc-param.d';
// eslint-disable-next-line import/no-cycle
import { ScSearch } from './sc-search.d';

type FilterSize = 'medium' | 'small' | 'mini';
type FilterFieldNames = { value: string; label: string; children: string };

interface FilterResults extends obj {
  query: Query[];
  sorts: Sorts[];
}

interface FilterOption {
  /** ID */
  id: string;

  /** 父ID */
  pId: string;

  /** 显示内容 */
  label: string;

  /** 提交值 */
  value: string;

  /** 提交字段 */
  prop?: string;

  /** 子节点 */
  children?: FilterOption[];
}

interface FilterDataItem extends ScSearch.ConfigData {}

interface FilterForm extends obj {
  /** 查询条件 */
  query: obj<Query[]>;
  /** 筛选条件 */
  sorts: obj<Sorts[]>;
}

interface FilterConfig {
  /** 控制每列放几条数据 (默认值: `medium`) */
  size?: FilterSize;

  /**
   * 映射数据选项中的`value、label、children` 字段
   *
   * 默认值:
   * ```js
   * {value:'id',label:'label',children:'children' }
   * ```
   */
  fieldNames?: FilterFieldNames;

  /** 接口数据 */
  options?: obj<FilterOption[]>;

  /** 查询前数据处理，返回处理后的数据 */
  formater?: (data: FilterResults) => FilterResults;
}

/** 筛选 */
export interface ScFilter {}

export namespace ScFilter {
  /** 配置项 */
  type Config = FilterConfig;

  /** 数据配置项 */
  type DataItem = FilterDataItem;

  /** 单个筛选配置项 */
  type Option = FilterOption;

  /** 映射数据选项中字段 */
  type FieldNames = FilterFieldNames;

  /** 筛选提交表单 */
  type Form = FilterForm;

  /** 结果 */
  type Results = FilterResults;
}
