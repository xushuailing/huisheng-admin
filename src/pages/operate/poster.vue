<template>
  <sc-min-table stripe
                ref="table"
                :columns-handler="columnsHandler"
                :columns-props="{align:'center'}"
                :columns="columns"
                :table-config="tableConfig"
                :form-add-config="addConfig">
  </sc-min-table>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '../../lib/@types/sc-form.d';

const columns: ScTable.SetColumns = [
  ['海报分类', 'none1'],
  ['图片', 'none2', null, null, 'img'],
  ['创建时间', 'created_at'],
];

@Component
export default class OperatePoster extends Vue {
  columns = this.$utils._SetTableColumns(columns);

  columnsHandler = ['del'];

  active = 'good';

  tableConfig = {
    api: this.$api.role,
    breadcrumbButtons: ['add'],
  };

  addConfig: ScForm.Add = {
    type: 'plain',
    data: [
      [
        {
          label: '海报图片：',
          prop: 'none',
          tooltip: '只支持.jpg 格式',
          tag: {
            tagType: 'upload-img',
            attr: { limit: 100, fileSize: 10000, custom: { timeout: 2e6 } },
          },
        },
        {
          label: '海报分类：',
          prop: 'none6',
          tag: {
            tagType: 'select',
            options: [],
            attr: { placeholder: '请选择海报分类' },
          },
        },
      ],
    ],
  };
}
</script>
