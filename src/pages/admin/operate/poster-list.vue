<template>
  <sc-min-table stripe
                ref="table"
                :columns="columns"
                :columns-handler="columnsHandler"
                :columns-schema="columnsSchema"
                :table-config="tableConfig"
                :formAddConfig="addConfig">
  </sc-min-table>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

const columns: ScTable.SetColumns = [
  ['海报分类', 'none1'],
  ['图片', 'none2', 200, null, 'img'],
  ['创建时间', 'createtime'],
];

@Component
export default class OperatePoster extends Vue {
  columns: ScTable.Columns = this.$utils._SetTableColumns(columns);

  columnsHandler: ScTable.ColumnsHandler = ['del'];

  columnsSchema: ScTable.ColumnsSchema = {
    图片: {
      propsHandler: (prop) => ({ ...prop, height: 70, width: 100 }),
    },
  };

  // TODO: 缺少接口
  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.activity.ads,
    breadcrumbButtons: ['add'],
    handleWidth: 100,
  };

  addConfig: ScForm.Add = {
    buttons: [
      {
        mode: 'submit',
        text: '确认添加',
      },
    ],
    rules: [
      {
        none1: {
          value: [{ required: true, message: '请输入海报分类', trigger: 'change' }],
        },
        none2: {
          value: [{ required: true, message: '请添加图片', trigger: 'change' }],
        },
      },
    ],
    data: [
      [
        {
          label: '海报图片：',
          prop: 'none2',
          tag: {
            tagType: 'upload-img',
            attr: { limit: 1 },
          },
        },
        {
          label: '海报分类：',
          prop: 'none1',
          tag: { options: [], tagType: 'select', attr: { placeholder: '请输入海报分类' } },
        },
      ],
    ],
  };
}
</script>
