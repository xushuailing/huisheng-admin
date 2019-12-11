import { AxiosResponse } from 'axios';
import Vue, { VueConstructor } from 'vue';
import { obj } from './sc-param.d';
import ScTags from './sc-form-tags.d';

interface Temporarily {
  /** 暂存标识符(空则不显示暂存) */
  key: string;

  /**
   * 存储模式
   *
   * 可选值: `api` / `local`
   *
   * 默认值: `local`
   */
  mode: string;
}

interface FormEventComplete<T = obj> {
  /** 提交是否成功 */
  status: boolean;

  /** 提交的表单数据 */
  data: T;

  /** 提交后标识符 */
  info: 'prevent' | 'success' | 'error';

  /** 请求返回数据 */
  response: AxiosResponse;

  /** 表单组件实例 */
  vm: Vue;
}

declare class FormCommon {
  /** 风格设置 (默认值: `dialog`) */
  mode?: 'page' | 'dialog';

  /** 风格设置 (默认值: `dialog`)
   *
   * `mode` 为 `page` 时，可以不传
   */
  visible?: boolean;

  /** 新增接口链接 */
  api?: string;

  config: FormConfig;
}

export type FormRulesType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'method'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'array'
  | 'object'
  | 'enum'
  | 'date'
  | 'url'
  | 'hex'
  | 'email';

export interface FormRule {
  /** 是否必填 */
  required?: boolean;
  /** 数据类型 */
  type?: FormRulesType;
  /** 错误提示 */
  message?: string;
  /** 触发类型 */
  trigger?: 'blur' | 'change' | string[];
  /** 最大长度 */
  max?: number;
  /** 最小长度 */
  min?: number;
  /** 已定义回调 */
  validator?(rule: any, value: any, callback: Function): Function | Promise<any>;
  /** 长度 */
  len?: number;
}

/** 验证规则 */
interface FormRules {
  /** 验证字段名 */
  [key: string]: {
    /** value 固定字段 */
    value: FormRule[];
  };
}

interface FormHeader {
  /**
   * 头部主标题
   *
   * 默认值: `mode`值为`page`时,默认值为 `标题`
   *
   */
  title?: String;

  /**
   * 头部描述
   *
   * 默认值: `mode`值为`page`时,默认值为 `描述`
   */
  desc?: String;
}

interface FormButtons {
  /**
   * 按钮类型
   *
   * 默认按钮选项
   */
  mode?: 'reset' | 'cancel' | 'slot' | 'return' | 'next' | 'temporarily' | 'submit' | 'saveAdd';

  /**
   * 按钮文字
   *
   * 根据 `mode` 显示不同的文字
   */
  text?: String;

  /**
   * 按钮顺序
   * 根据默认按钮顺序排列
   */
  sort?: Number;

  /** 是否隐藏 (默认值 `false`) */
  isHide?: boolean;

  /** 按钮自定义事件 */
  listeners?: Object;

  /**
   * 按钮自定义属性
   *
   * 支持 `Element Button` 属性
   */
  attrs?: Object;

  /**
   * 卡槽名字
   *
   * `mode=slot` 时(必填)
   */
  slotName?: String;

  /**
   * 添加保存时是否清空表单 (默认值 `false`)
   *
   * `mode=saveAdd` 时有效
   */
  isClearData?: boolean;
}

/** 表单 `data` 配置项 */
export interface ScFormData {
  /** 字段名 */
  label: string;

  /** 后端对应的字段 */
  prop: string;

  /** 是否占一整行(默认值: `false`) */
  isFull?: boolean;

  /** `label-position` 不为 `top` 时，是否行内显示(默认值: `true`) */
  inline?: boolean;

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
}

declare class FormConfig {
  /**
   * 新增模式类型
   *
   * 可选值: `plain`/`senior`/`specialty`
   *
   * 默认值: `plain`
   */
  public type?: 'plain' | 'senior' | 'specialty';

  /** 表单配置 */
  public data: ScFormData[][];

  /** 表单属性 `form-attributes` */
  public formAttr?: obj;

  /** 表单域标签的的宽度 */
  public 'label-width'?: string;

  /** 表单事件 `form-events` */
  public formListeners?: obj;

  /** 接口请求方式（默认：`post`） */
  public requestMethod?: 'post' | 'get';

  /** 接口额外参数 */
  public params?: obj;

  /** 标题配置 */
  public header?: FormHeader;

  /** 暂存 */
  public temporarily?: Temporarily;

  /** 表单验证配置 */
  public rules?: FormRules[];

  /** 按钮配置 */
  public buttons?: FormButtons[];

  /** 控制宽度 (默认: `50%`) */
  public width?: string;

  /** 底部类名 */
  public footerClass?: string;

  /**
   * 是否可以移动 (默认: `true`)
   *
   * `mode=dialog` 时有效
   */
  public isMove?: boolean;

  /**
   * 是否可以移动 (默认: `true`)
   *
   * `mode=dialog` 时有效
   */
  public isOpenFull?: boolean;

  /**
   * 是否可以移动 (默认: `false`)
   *
   * `mode=dialog` 时有效
   */
  public isDefaultFull?: boolean;

  /** 是否在拦截提交数据后关闭(弹框/页面) (默认值 `false`) */
  public isPreventClose?: boolean;

  /** 是否在成功提交数据后关闭(弹框/页面) (默认值 `true`) */
  public isSuccessClose?: boolean;

  /** 是否再失败提交数据后关闭(弹框/页面) (默认值 `false`) */
  public isFailClose?: boolean;

  /** 请求体类型 (默认值: `json`) */
  public bodyType?: 'json' | 'formData';

  /**
   * 上一步之前的钩子
   *
   * 如果返回值为false不进行后续操作
   *
   * 1.表单的所有值，2.当前步骤
   */
  public handleReturn?(data: obj, index: string): boolean;

  /**
   * 下一步之前的钩子
   *
   * 如果返回值为false不进行后续操作
   *
   * 1.表单的所有值，2.当前步骤
   */
  public handleNext?(data: obj, index: string): boolean;

  /**
   * 提交数据之前的钩子
   *
   * 返回处理后的数据
   *
   * 1.表单的所有值，2.组件实例
   */
  public handleSubmit?(data: obj, vm: VueConstructor): any;
}

export interface ScForm {
  /** 获取表单数据中`prop`对应的值 */
  getItemPropValue<T = any>(prop: string): T;
}

declare namespace ScForm {
  class Add extends FormConfig {
    /** 表单步骤属性(参考 `Element steps`) */
    public stepsAttr?: obj;

    /** 表单步骤配置 */
    public steps?: obj[];
  }
  class Edit extends FormConfig {
    /** 表单步骤属性(参考 `Element tabs`) */
    public tabsAttr?: obj;

    /** 表单步骤配置 */
    public tabs?: obj[];
  }

  /** 表单配置 */
  interface Config extends FormConfig {}

  /** 表单验证 */
  interface Rules extends Array<FormRules> {}

  /** 表单数据 */
  interface Data extends Array<ScFormData[]> {}

  /**
   * 提交表单事件返回值
   *
   * ```js
   * status: '提交是否成功'
   * data: '提交的表单数据'
   * info: '提交后标识符'
   * response: '请求返回数据'
   * vm: '表单组件实例'
   * ```
   */
  interface EventComplete<T = obj> extends FormEventComplete<T> {}
}
