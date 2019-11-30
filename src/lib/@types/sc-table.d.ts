import Vue, { VueConstructor } from 'vue';
import { Table } from 'element-ui';
import { obj, ScLimit } from './sc-param.d';
import { ScSearch } from './sc-search.d';
import { ScForm, FormRule } from './sc-form.d';
import ScTags from './sc-form-tags.d';

interface Handler {
  /** 按钮名称 */
  name: string;

  /** 按钮图标 */
  icon?: string;

  /** 按钮提示 */
  title?: string;

  /** 颜色 */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';

  /** 按钮权限配置 */
  limit?: string | string[] | ScLimit;
}

type Sortable = true | false | 'custom';

type Special = 'img' | 'switch' | 'tag' | 'video' | 'audio' | 'file' | 'component';

type ScColumnsType = 'index' | 'selection' | 'expand';

export interface Scope {
  row: obj;
  column: obj;
  $index: number;

  store: obj;
  _self: Vue;
}

interface TableForm {
  /** 是否占一整行(默认值: `false`) */
  isFull?: boolean;

  /** 默认值 */
  default?: any;

  /** 帮助说明 */
  tooltip?: string;

  /** 标签配置 */
  tag?: ScTags;

  /** 是否隐藏 (默认值 `false`) */
  isHide?: boolean;

  /** 处理提交之前表单的数据，返回处理后的数据 */
  handle?(data: any, prop: string): any;

  /**
   * 处理显示前接口获取的数据，返回处理后的数据
   *
   * `data` 当前配置回显数据
   *
   * `prop` 当前配置字段
   *
   * `allData` 全部配置回显数据
   *  */
  handleEdit?(data: any, prop: string, allData: any): any;

  /** 验证规则 */
  rule?: FormRule[];
}

export type ScTableSetColumn = [
  string,
  string,
  (number | string | null)?,
  (Sortable | null)?,
  (Special | null)?,
  (boolean | null)?,
  (boolean | null)?,
  (boolean | null)?,
];

export interface ScTableColumn {
  /** 对应列内容的字段名 (必填) */
  prop: string;

  /** 显示的标题 (必填) */
  label: string;

  /** 是否禁止修改宽度 默认值:false */
  isRevise?: boolean;

  /** 是否必选 默认值:false */
  isMustShow?: boolean;

  /** 是否隐藏 默认值:false */
  isHide?: boolean;

  /** 特殊列表渲染方式
   *
   * 可选值: `img` / `switch` / `tag` / `video` / `audio` / `file`
   */
  special?: Special;

  /** 是否排序 默认值:false */
  sortable?: Sortable;

  /** 宽度 默认值:auto */
  width?: string | number;

  /** 最小宽度 默认值:auto */
  'min-width'?: string | number;

  /**
   * 处理默认渲染函数列显示数据
   *
   * 自定义渲染函数不可用
   *
   * `row：`当前行的接口数据
   *
   * `col：`当前列的自定义属性
   *
   * 需要返回要显示数据
   */
  formater?(row: obj, col: ScTableColumn, that: Vue): any;

  /**
  处理特殊列表渲染方式和自定义函数渲染的属性

  当 `special` 值为有效值时生效

  接收一个对象：

  `row：`当前行的接口数据

  `col：`当前列的自定义属性

  `column：`当前列的全部属性

  需要返回处理后的数据
 */
  propsHandler?(data: { row: obj; col: obj; column: obj }): obj;

  /**
   * 当前列编辑表单配置项
   *
   * 若配置了 `form` 字段默认开启表格行内编辑，否则使用弹框编辑
   */
  form?: TableForm;

  [key: string]: any;
}

export interface ScTableApi extends obj {
  /** 表格列表 */
  index: string;

  /** 导出 */
  export?: string;

  /** 删除 */
  delete?: string;

  /** 新建 */
  create?: string;

  /** 更新 */
  update?: string;

  /** 获取单个数据 */
  show?: string;
}
interface ScTableConfigHeader {
  /**
   * 头部主标题
   *
   * 默认:`$router.name`
   */
  title: string;

  /**
   * 头部描述
   *
   * 默认: `$router.meta.description`
   */
  desc?: string;
}
interface ScTableConfig extends obj {
  table?: {
    /** 表格自定义存储排版字段 */
    storageKey?: string;

    /** 表格权限 */
    limit?: {
      /** 增加 */
      add?: ScLimit | string | string[];

      /** 删除 */
      delete?: ScLimit | string | string[];

      /** 表格设置 */
      setting?: ScLimit | string | string[];

      /** 导出 */
      exports?: ScLimit | string | string[];
    };
  };

  handleWidth?: number;

  breadcrumbButtons?: string[];

  /** `max-table`头部设置 */
  header?: ScTableConfigHeader;

  /** 禁止默认请求接口 默认: `false` */
  disableDefaultRequest?: boolean;

  /** 禁止每次请求接口 默认: `false` */
  disableEveryRequest?: boolean;

  /** 禁止点击树请求接口 默认: `false` */
  disableTreeClickRequest?: boolean;

  /** 是否使用表格设置 默认: `true` */
  isSetting?: boolean;

  /** 是否使用导出 默认: `true` */
  isExports?: boolean;

  /** 是否搜索 默认: `true` */
  isSearch?: boolean;

  /** 树的宽度 默认: `4` */
  treeSpan?: number;

  /** 接口配置 */
  api?: ScTableApi;

  /** 表格数据额外接口参数 */
  index?: obj;
}

export interface ScTable extends Table {
  /** 选中表格数据 */
  selectTableData: obj[];
  /** 设置表格数据 */
  setDataTable(option?: object): void;
  /** 刷新列表 */
  emitRefresh(): void;
}

export namespace ScTable {
  /**
   * 表格配置
   *
   * 兼容部分属性
   *
   * http://element-cn.eleme.io/2.6/#/zh-CN/component/table#table-column-attributes
   */
  type Columns = ScTableColumn[];

  /**
   * `1.label` `2.prop` `3.width` `4.sortable` `5.special` `6.isHide` `7.isRevise` `8.isMustShow`
   *
   * 详细信息参考 `Columns` 属性
   */
  type SetColumns = ScTableSetColumn[];

  /** 对应列的类型。如果设置了 selection 则显示多选框；如果设置了 index 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮 */
  export type ColumnsType = ScColumnsType | ScColumnsType[];

  /** 操作按钮配置 */
  export type ColumnsHandler = string | (string | Handler)[];

  /** 映射 `Columns` 配置中的部分字段 */
  export interface ColumnsKeyMap {
    /** 映射 `label`  */
    label?: string;

    /** 映射 `prop`  */
    prop?: string;
  }

  /**
   * 主要用于单独定义某一列的行为。
   *
   * 如果 `special` 值为 `component` 时,
   *
   * `columns.prop` 可以随便填
   *
   * `columns.label` 可以随便填
   */
  interface ColumnsSchema {
    /** `columns` 对应的 `label` */
    [x: string]: Partial<ScTableColumn> & {
      /** 自定义组件 */
      component?: VueConstructor;
      /** 用于监听 `component` 配置的自定义渲染组件内部 `$emit` 出的事件 */
      listeners?: { [x: string]: Function };
    };
  }

  /** 表格搜索配置 */
  export interface Search extends ScSearch.Config {
    /** 搜索接口额外参数 */
    param?: obj;

    /**
     * 搜索模式
     *
     * 默认值: `ordinary`
     */
    model?: ScSearch.Model;
  }

  /** 表格配置属性 */
  interface TableConfig extends ScTableConfig {}

  /** 新增表单配置 */
  export interface Add extends ScForm.Add {}

  /** 修改表单配置 */
  export interface Eidt extends ScForm.Edit {}

  export namespace Event {
    /** 表格操作触发事件 */
    interface TableHandlerClick<T = obj> {
      /** 当前行数据 */
      row: T;

      /** 下标 */
      index: number;

      /** 类型 */
      type: string;
    }
  }
}
