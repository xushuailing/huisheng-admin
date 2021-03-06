import { obj } from '@/lib/@types/sc-param.d';
import ScTags from '@/lib/@types/sc-form-tags.d';
import { ScTableColumn } from '@/lib/@types/sc-table.d';

/** 表头和对应列表单配置项 */
export interface EditTableColumn extends ScTableColumn {
  /** 对应列的标题 (必填) */
  prop: string;

  /** 对应列的字段名 (必填) */
  label: string;

  /** 宽度 默认值:auto */
  width?: string | number;

  /** 最小宽度 默认值:auto */
  'min-width'?: string | number;

  /** 对应列的是否可编辑，默认 true */
  editable?: boolean;

  /**
   * 对应列每行的默认值
   * 当类型为 Array 时，数组中的每一项为对应行的默认值，否则为所有行的默认值
   * TODO: 多选的默认值？
   */
  default?: {
    /**
     * 每行统一的默认值：`ScTags.tagType` 对应的 `value` 类型
     * `multiple` 为 `true` 时，传数组，对应每行默认值：[1, 2, 3]
     */
    value: any;
    /**
     * 是否设置多行默认值
     * 默认：`false`, 每行统一默认值
     */
    multiple?: boolean;
  };

  /** 对应列表单配置项，默认 input */
  tag?: ScTags;
}

/** 表单数据格式 */
interface EditForm {
  data: obj[];
}

/** 工具栏设置 */
interface ToolbarConfig {
  /** 表格字段名 */
  title?: string;

  /**
   * 是否使用图标按钮
   * 默认: false
   */
  useIcon?: boolean;

  /**
   * 是否显示重置按钮
   * 默认: false
   */
  reset?: boolean;

  /**
   * 是否显示新增按钮
   * 默认: true
   */
  add?: boolean;

  /**
   * 是否显示编辑按钮，为 true 时表格默认为不可编辑状态
   * 默认: false
   */
  edit?: boolean;

  /**
   * 导出配置
   * 若不传则不显示导出按钮
   */
  export?: {
    /** 导出接口 */
    api: string;
    /** 表头数据 */
    columns: EditTableColumn[];
    /** 导出接口自定义参数 */
    params?: Object;
    /** 选择的表格数据 */
    selectTableData?: [];
    /** 搜索的表格数据 */
    queryTable?: [];
  };

  /** 绑定属性 */
  attr?: {
    /** 表格字段名属性 */
    title?: obj;
    /** 工具栏默认图标属性 */
    icon?: obj;
  };
}

// eslint-disable-next-line import/prefer-default-export
export namespace ScEditTable {
  type Toolbar = ToolbarConfig;

  /** 表格配置项 */
  interface TableConfig {
    /**
     * 是否生成行 id
     * 默认: false
     */
    rowId?: boolean;

    /** 行 id 前缀 */
    rowKey?: string;

    /**
     * 初始化空行数
     * 默认: 1
     */
    emptyRows?: number;

    /**
     * 默认显示行数，超出隐藏
     * 默认: 不限
     */
    rows?: number;

    /** 最大行数 */
    max?: number;

    /**
     * 新增行位置
     * 默认: `top`
     */
    addPosition?: 'top' | 'bottom';

    /**
     * 是否显示必填 * 号
     * 默认: `false`
     */
    showRequired?: boolean;

    /**
     * `input` 输入内容对齐方式
     * 默认: `right`
     */
    inputAlign?: 'left' | 'center' | 'right' | null;

    /**
     * 是否禁止编辑
     * 默认: `false`
     */
    disabled?: boolean;
  }

  /** 表单配置项 */
  interface FormConfig {
    /**
     * 是否显示重置按钮
     * 默认: false
     */
    reset?: boolean;

    /**
     * 是否显示新增按钮
     * 默认: true
     */
    add?: boolean;

    /** 表单属性 `form-attributes` */
    attr?: obj;
  }

  /** formTag 数据格式 */
  interface FormTag {
    [key: string]: {
      prop: string;
      value: any;
    };
  }

  type Columns = EditTableColumn[];
  type Form = EditForm;
}
