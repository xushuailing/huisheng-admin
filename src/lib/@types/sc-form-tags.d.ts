import { VueConstructor } from 'vue';
import { obj } from './sc-param.d';

type TagsType =
  | 'input'
  | 'input-number'
  | 'date-picker'
  | 'time-select'
  | 'time-picker'
  | 'switch'
  | 'select'
  | 'checkbox'
  | 'cascader'
  | 'radio'
  | 'rate'
  | 'add-tags'
  | 'upload-img'
  | 'upload-file'
  | 'map-dot'
  | 'map-fence'
  | 'tree-select'
  | 'editor'
  | 'component'
  | 'autocomplete';

interface TagsListenersOrAttr extends obj {
  children?: obj;
}

export default class ScTags<T = any> {
  /**
   * 标签类型
   *
   * 默认值: `input`
   */
  tagType?: TagsType;

  /** 标签属性支持 Element 表单标签的基本属性 */
  attr?: TagsListenersOrAttr;

  /** 多个选项的标签时的数据,如:<select>(同 Element) */
  options?: obj<T>[];

  /** 标签事件支持 Element 标签事件 */
  listeners?: TagsListenersOrAttr;

  /**
   * 自定义组件
   *
   * `tagType:component` 时生效
   */
  components?: VueConstructor;
}
