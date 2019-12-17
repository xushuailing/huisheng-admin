<template>
  <div class='ads-sorts'>
    <sc-min-table stripe
                  ref="table"
                  :columns-handler="columnsHandler"
                  :columns="columns"
                  :table-config="tableConfig"
                  :search-config="searchConfig"
                  @table-emitTableHandlerClick="onTableHandlerClick">
      <template slot="breadcrumb">
        <el-button @click="onAdd()">新增</el-button>
      </template>
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import SortAdd from './components/ads-sorts-add.vue';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

export const ADS_TYPE: obj = {
  0: '广告',
  1: '活动',
};

@Component
export default class ActvAdsSorts extends Vue {
  // TODO: 缺少有效期广告类型
  columns: ScTable.Columns = [
    {
      label: '广告类型',
      prop: 'none',
      formater: (row, col) => ADS_TYPE[row[col.prop]] || '',
    },
    { label: '名称', prop: 'title' },
    {
      label: '价位',
      prop: 'price',
      formater: (row, col) => (row[col.prop] ? `￥ ${row[col.prop]}` : ''),
    },
    { label: '有效期', prop: 'none2' },
    { label: '创建时间', prop: 'createtime' },
  ];

  columnsHandler: ScTable.ColumnsHandler = ['look'];

  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.activity.adsSorts,
    breadcrumbButtons: ['add'],
  };

  // TODO: 查询需加字段：广告类型
  searchConfig: ScTable.Search = {
    data: [
      {
        label: '广告类型：',
        prop: 'type',
        tag: {
          tagType: 'select',
          options: Object.keys(ADS_TYPE).map((k) => ({ label: ADS_TYPE[k], value: k })),
          attr: { placeholder: '请选择广告类型' },
        },
      },
      {
        label: '创建时间：',
        prop: 'createtime',
        tag: {
          tagType: 'date-picker',
          attr: { type: 'datetime', placeholder: '请选择创建时间' },
        },
      },
    ],
  };

  onTableHandlerClick({ row, type }: ScTable.Event.TableHandlerClick) {
    if (type === 'look') {
      this.onAdd(row.id);
    }
  }

  onAdd(id?: string) {
    this.$router.push(`/activity/ads-sorts-detail${id ? `?id=${id}` : ''}`);
  }
}
</script>
