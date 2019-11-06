import { VueConstructor } from 'vue';
import ScTags from './sc-form-tags.d';
import { Query } from './sc-param.d';
// eslint-disable-next-line import/no-cycle
import { ScFilter } from './sc-filter.d';

/** 简单模式 / 高级模式 / 专业模式 / 组高级模式 / 组专业模式 */
type Type = 'plain' | 'senior' | 'specialty' | 'groupSenior' | 'groupSpecialty' | 'filter';

/** 简易 / 弹框 / 伸缩 */
type ModelType = 'ordinary' | 'dialog' | 'collapse';

interface SearchConfig {
  /**
   * 搜索模式的类型
   *
   * 默认值: `plain`
   */
  type?: Type;

  /**
   * form-item 属性配置
   *
   * 支持 element 所有属性
   */
  attr?: object;

  /**
   * 搜索条件数量
   *
   * (不可大于 `data.length` )
   *
   * 默认值: `data.length`
   */
  num?: number;

  /** 配置数据 */
  data?: SearchConfigData[];

  /** 筛选配置项(`type=filter` 必填)  */
  filter?: ScFilter.Config;

  /** 搜索提交前处理事件 */
  handleSubmit?: (data: { exps: Query[] }[], vm?: VueConstructor) => { exps: Query[] }[] | false;
}

interface SearchConfigData {
  /** 字段名 */
  label: string;

  /** 后端对应的字段 */
  prop: string;

  /** 操作符(默认值: `string`) */
  // operateType?: OperateType;

  /** 是否使用简易搜索(默认值: `false`) */
  isSelect?: boolean;

  /** 是否隐藏(默认值: `false`) */
  isHide?: boolean;

  /** 搜索默认值(不能使用 Boolean,后端不支持) */
  default?: any;

  /** 是否通栏(默认值: `false`) `type=filter` 有效 */
  isFull?: boolean;

  /** 是否排序(默认值: `false`) `type=filter` 有效 */
  isSorts?: boolean;

  /** 全选文字 `type=filter` 有效 */
  allText?: string;

  /** 查询前数据处理, 返回处理后的数据 `type=filter` 有效 */
  formater?: (Option: ScFilter.Option[]) => ScFilter.Option[];

  /** 标签配置参考 tag */
  tag?: ScTags;
}

/** 搜索配置 */
export interface ScSearch {
  /**
   * 是否显示，支持.sync修饰符
   *
   * 默认值: `false`
   */
  visible?: boolean;

  /**
   * 搜索模式
   *
   * 默认值: `ordinary`
   */
  model?: ModelType;

  /** 搜索配置 */
  config?: SearchConfig;
}

declare namespace ScSearch {
  /** 搜索模式 (`简易` / `弹框` / `伸缩`) */
  type Model = ModelType;

  /** 搜索表单配置 */
  interface ConfigData extends SearchConfigData {}

  /** 搜索基本配置 */
  interface Config extends SearchConfig {}
}
