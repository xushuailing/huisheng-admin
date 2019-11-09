import icon from './icon';

const component = {
  functional: true,
  props: ['row', 'col', 'column'],
  render(h, data) {
    const { row, col } = data.props;
    const { _v: text } = data;
    const { formater } = col;

    const v = formater ? formater(row, col, data.parent) : row[col.prop];
    const vv = v || v === 0 ? v : '';

    if (Array.isArray(vv) && vv.length === 2) {
      if (Object.prototype.toString.call(vv[0]) === '[object Object]') {
        return h('span', ...vv);
      }
    }

    /** 默认使用 createTextVNode 渲染 */
    return (text && text(vv)) || vv;
  },
};

export const COLUMNS_HANDLER = icon;
export const COLUMN_PROPS = { component };
export const TYPES = ['selection', 'expand', 'index'];
export const BOOLEAN_KEYS = [
  'fit',
  'stripe',
  'border',
  'show-header',
  'highlight-current-row',
  'default-expand-all',
  'show-summary',
];
