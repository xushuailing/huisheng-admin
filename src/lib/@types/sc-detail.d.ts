import Vue, { VueConstructor } from 'vue';
import { obj } from './sc-param.d';

/** 文本展示 / 标签展示 / 图片展示 / 文件展示 / 隐藏展示 / 自定义组件 */
type TagType = 'text' | 'tags' | 'img' | 'file' | 'password' | 'component' | 'html';

export interface ScDetailColumn extends obj {
  /** 左侧表格数据 */
  label?: string;

  /** 左侧表格类名 */
  labelClass?: string;

  /** 右侧表格数据 */
  value?: string | number | any[] | null;

  /** 右侧表格类名 */
  valueClass?: string;

  /** 右侧表格子标签类名 */
  valueChildrenClass?: string;

  /** td子标签属性 */
  attr?: obj;

  /** 左侧表格数据(默认值: `false`) */
  isFull?: boolean;

  /** 自定义组件(`tagType` 必须为 `component`) */
  components?: VueConstructor;

  /** td 单个样式 */
  style?: {
    [key: string]: string | number | obj | undefined;
    /** td 子标签样式 */
    children?: obj;
  };

  /**
   *
   * 特殊数据展示
   *
   * 默认值: `text`
   * */
  tagType?: TagType;

  /**
   * 数据渲染前,处理数据方法
   *
   * @param {any} data 数据
   * @param {VueConstructor} vm 组件实例
   * @returns {any} 处理后的数据
   * @memberof DetailTableData
   */
  handle?(data: any, vm: VueConstructor): any;
}

export type ScDetailSetColumn = [
  (string | null)?,
  (string | null)?,
  (string | number | boolean | null)?,
  (TagType | null)?,
  (boolean)?
];

interface ScDetailConfig {
  /**
   * 控制每列放几条数据
   *
   * 默认值: `small`
   */
  size?: 'medium' | 'small' | 'mini';

  /* 表头全局样式 */
  labelStyle?: obj;

  /* td 全局样式 */
  valueStyle?: obj;

  /** 数据 */
  data: ScDetailColumn[];
}

export interface ScDetail {
  init?(): void;
}

export namespace ScDetail {
  /** 详情组件配置 */
  type Config = ScDetailConfig;

  /** 详情 `data` 配置项 */
  type Columns = ScDetailColumn[];

  /**
   * `1.label` `2.prop` `3.value` `4.tagType` `5.isFull`
   *
   * 详细信息参考 `DetailData` 属性
   */
  type SetColumns = ScDetailSetColumn[];
}
