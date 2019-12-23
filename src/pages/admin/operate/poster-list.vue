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
  ['海报分类', 'class_name'],
  ['图片', 'img', 200, null, 'img'],
  ['创建时间', 'time'],
];

const type = 2; // 图片

@Component
export default class OperatePoster extends Vue {
  columns: ScTable.Columns = this.$utils._SetTableColumns(columns);

  columnsHandler: ScTable.ColumnsHandler = ['del'];

  columnsSchema: ScTable.ColumnsSchema = {
    图片: {
      propsHandler: (prop) => ({ ...prop, height: 70, width: 100 }),
    },
  };

  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.operate.image,
    index: { type },
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
        class_id: {
          value: [{ required: true, message: '请输入海报分类', trigger: 'change' }],
        },
        img: {
          value: [{ required: true, message: '请添加图片', trigger: 'change' }],
        },
      },
    ],
    data: [
      [
        {
          label: '海报图片：',
          prop: 'img',
          tag: {
            tagType: 'upload-img',
            attr: { limit: 1 },
          },
        },
        {
          label: '海报分类：',
          prop: 'class_id',
          tag: {
            options: this.getImageClass,
            tagType: 'select',
            attr: { placeholder: '请输入海报分类' },
          },
        },
      ],
    ],
    handleSubmit: (data) => ({ ...data, type }),
  };

  imageClass: any[] = [];

  async getImageClass() {
    try {
      if (this.imageClass.length) {
        return this.imageClass;
      }
      const api = this.$api.admin.operate.imageClass.index;
      const { data } = await this.$http.get<any[]>(api, { limit: 9e5, type });
      console.log('data', data);
      const list = data.map((v) => ({ value: v.id, label: v.name }));
      this.imageClass = list;
      return list;
    } catch (error) {
      return [];
    }
  }
}
</script>
