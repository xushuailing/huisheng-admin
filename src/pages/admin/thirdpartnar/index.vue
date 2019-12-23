<template>
  <sc-min-table stripe
                ref="table"
                :columns-handler="columnsHandler"
                :columns="columns"
                :columns-props="{align:'center'}"
                :table-config="tableConfig"
                :search-config="searchConfig"
                @table-emitTableHandlerClick="onTableHandlerClick">
  </sc-min-table>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Info from '@/components/img-name';
import { ScTable } from '@/lib/@types/sc-table.d';
import { obj } from '@/lib/@types/sc-param.d';

// TODO: 缺少列表，详情，运营，套餐类型，状态
@Component
export default class TpIndex extends Vue {
  columns: ScTable.Columns = [
    { label: '套餐类型', prop: 'package_name' },
    { label: '店铺名称', prop: 'shop_name' },
    { label: '平台选择', prop: 'platform' },
    { label: '有效期', prop: 'start_time|end_time' },
    { label: '入驻时间', prop: 'time' },
    {
      label: '状态',
      prop: 'status',
      formater: (row, col) => {
        const value = row[col.prop];
        return [{ class: value === '正在运营' ? 'sc-font-danger' : 'sc-font-primary' }, value];
      },
    },
  ];

  columnsHandler: ScTable.ColumnsHandler = [
    'look',
    { name: 'operate', title: '运营' },
    { name: 'upload', title: '上传' },
  ];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.thirdpartnar.index,
  };

  searchConfig: ScTable.Search = {
    attr: { 'label-width': '150px' },
    data: [
      {
        label: '代运营套餐类型：',
        prop: 'none1',
        tag: {
          tagType: 'select',
          options: [],
          attr: { placeholder: '请选择代运营套餐类型' },
        },
      },
      {
        label: '商家店铺名称：',
        prop: 'none2',
        tag: {
          attr: { placeholder: '请输入商家店铺名称' },
        },
      },
      {
        label: '状态：',
        prop: 'none6',
        tag: {
          tagType: 'select',
          options: [],
          attr: { placeholder: '请选择运营状态' },
        },
      },
      {
        label: '创建时间：',
        prop: 'none7',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetime',
            placeholder: '开始时间',
          },
        },
      },
    ],
  };

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'look') {
      this.$router.push({ name: '奶爸代运营详情', query: { id: row.id } });
    } else if (type === 'operate') {
      console.log('%c运营', 'color:#fff;background:#40b883;border-radius:5px;padding:2px 5px;');
    } else {
      console.log('%c 服务', 'color:#40b883;font-weight:bold');
    }
  }
}
</script>
