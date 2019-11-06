import { ScTable, ScTableColumn } from '@/lib/@types/sc-table.d';
import { ScDetail, ScDetailColumn } from '@/lib/@types/sc-detail.d';

const handleColumns = <T, R>(values: R[][], key: string[]): T[] => {
  const isNull = (v: any) => v === null || v === undefined;
  const val = values.map((value) => value.reduce((pre, cur, i) => {
    if (!isNull(cur)) pre[key[i]] = cur;
    return pre;
  }, Object.create(null)));
  return val;
};

/**
 * 设置 `Sc-Table` `Columns` 属性
 *
 * 用于简单一点的需求
 *
 * @param {ScTable.SetColumns} values
 *
 * @example
 * const column: ScTable.SetColumns = [
 *  ['头像', 'avatar', null, null, 'img'],
 *  ['微信昵称', 'nickname', 200],
 *  ['姓名', 'name', 120],
 * ]
 * columns = this.$utils._SetTableColumns(column);
 *
 * @returns {ScTable.Columns}
 */
export const _SetTableColumns = (values: ScTable.SetColumns): ScTable.Columns => {
  const key = ['label', 'prop', 'width', 'sortable', 'special', 'isHide', 'isRevise', 'isMustShow'];
  return handleColumns<ScTableColumn, ScTable.SetColumns>(values as any, key);
};

/**
 * 设置 `Sc-Detail-Table` `data` 属性
 *
 * 用于简单一点的需求
 *
 * @param {ScTable.SetColumns} values
 *
 * @example
 * const detailData:ScDetail.Columns = [
 *  ['姓名', 'name', null],
 *  ['手机号', 'iPhone', null],
 *  ['头像', 'avatar', null, 'img', true],
 * ]
 * detailDatas = this.$utils._SetDetailColumns(detailData);
 *
 * @returns {ScDetail.Columns}
 */
export const _SetDetailColumns = (values: ScDetail.SetColumns): ScDetail.Columns => {
  const key = ['label', 'prop', 'value', 'tagType', 'isFull'];
  return handleColumns<ScDetailColumn, ScDetail.SetColumns>(values as any, key);
};
