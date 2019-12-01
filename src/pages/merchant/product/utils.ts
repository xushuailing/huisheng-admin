import { obj } from '@/lib/@types/sc-param.d';

export interface TableColumns {
  row: obj;
  column: obj;
  rowIndex: number;
  columnIndex: number;
}
export interface MergeKey {
  [judgeKey: string]: string[];
}

/**
 * 获取表格每个单元格的合并行数
 *
 * @param {Object} mergeKeys
 * @param {*} tableData
 * @returns {Object} {列名: [ { 行号: 合并行数 } ]}
 */
export const _GetTableSpan = (mergeKeys: MergeKey, tableData: any): {} => {
  // console.log('mergeKeys, tableData: ', mergeKeys, tableData);

  const noTableData = tableData instanceof Array && tableData.length;
  const noMergeKeys = mergeKeys instanceof Object && Object.keys(mergeKeys).length;
  if (!noTableData || !noMergeKeys) return {};

  const spanObj: obj<number[]> = {};
  tableData.forEach((row: obj, index: number) => {
    Object.entries(mergeKeys).forEach(([judge, props]) => {
      // 是否需要合并，TODO: 当前仅判断值类型
      const isMerge = index > 0 ? tableData[index - 1][judge] === row[judge] : false;
      props.forEach((prop) => {
        if (!spanObj[prop]) {
          spanObj[prop] = [];
        }
        if (isMerge) {
          // 找到前一个合并行
          const copy = spanObj[prop].concat();
          const last = copy.reverse().findIndex((n) => !!n);
          const prev = spanObj[prop].length - 1 - last;
          // 合并行数 + 1，当前行补 0
          ~prev && spanObj[prop][prev]++;
          spanObj[prop].push(0);
        } else {
          spanObj[prop].push(1);
        }
      });
    });
  });
  // console.table(spanObj);

  return spanObj;
};

/** 合并单元格
 *
 * @param {Object} tableObj table组件 span-method 方法四个参数{ row, column, rowIndex, columnIndex } 的对象
 * @param {Array} mergeKeys 要合并的keys数组
 * @param {Object} rowspanObj 经过 handleTableSpan 方法处理tableData 数据，得到的单元格的合并行数对象
 * @param {Boolean} notEmpty 是否要合并有 ’/‘ 单元格，此参数非必传。默认不合并, notEmpty = true 则合并
 */

export const _ObjectSpanMethod = (
  tableObj: TableColumns,
  mergeKeys: string[],
  rowspanObj: obj<number[]>,
): any => {
  if (mergeKeys instanceof Array && rowspanObj instanceof Object) {
    const { row, column, rowIndex, columnIndex } = tableObj;
    for (let i = 0; i < mergeKeys.length; i++) {
      const term = column.property === mergeKeys[i];
      if (term) {
        const _row = rowspanObj[mergeKeys[i]][rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    }
  }
  return [1, 1];
};
