<template>
  <div class='ads-list'>
    <sc-min-table stripe
                  ref="table"
                  :columns="columns"
                  :columns-handler="columnsHandler"
                  :columns-schema="columnsSchema"
                  :table-config="tableConfig"
                  :search-config="searchConfig"
                  :formAddConfig="addConfig"
                  @table-emitTableHandlerClick="onTableHandlerClick">
    </sc-min-table>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { ScTable } from '@/lib/@types/sc-table.d';
import { ScForm } from '@/lib/@types/sc-form.d';
import { obj } from '@/lib/@types/sc-param.d';

const columns: ScTable.SetColumns = [
  ['店铺信息', 'none1'],
  ['推广类型', 'title'],
  ['图片', 'image', 200, null, 'img'],
  ['有效期', 'endtime'],
  ['申请时间', 'createtime'],
];
// TODO: 缺少店铺信息 跳转类型：

@Component
export default class ActvAdsList extends Vue {
  columns: ScTable.Columns = this.$utils._SetTableColumns(columns);

  columnsHandler: ScTable.ColumnsHandler = ['look'];

  columnsSchema: ScTable.ColumnsSchema = {
    图片: {
      propsHandler: (prop) => ({ ...prop, height: 70, width: 100 }),
    },
  };

  tableConfig: ScTable.TableConfig = {
    api: this.$api.admin.activity.ads,
    breadcrumbButtons: ['add'],
  };

  searchConfig: ScTable.Search = {
    attr: { 'label-width': '110px' },
    data: [
      {
        label: '商家店铺名称：',
        prop: 'none1',
        tag: {
          attr: { placeholder: '请输入商家店铺名称' },
        },
      },
      {
        label: '推广类型：',
        prop: 'title',
        tag: {
          tagType: 'select',
          options: [],
          attr: { placeholder: '请选择推广类型' },
        },
      },
      {
        label: '申请时间：',
        prop: 'createtime',
        tag: {
          tagType: 'date-picker',
          attr: {
            type: 'datetime',
            placeholder: '请选择申请时间',
          },
        },
      },
    ],
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
        url: {
          value: [
            { required: true, message: '请输入跳转地址', trigger: 'blur' },
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (this.$utils._ValidateURL(value)) {
                  return callback();
                }
                return callback(new Error('地址不正确'));
              },
            },
          ],
        },
        image: {
          value: [{ required: true, message: '请添加图片', trigger: 'change' }],
        },
        none6: {
          value: [{ required: true, message: '请输入跳转类型', trigger: 'blur' }],
        },
      },
    ],
    data: [
      [
        {
          label: '添加图片',
          prop: 'image',
          tag: {
            tagType: 'upload-img',
            attr: { limit: 1 },
          },
        },
        {
          label: '跳转地址：',
          prop: 'url',
          tag: { attr: { placeholder: '请输入跳转地址' } },
        },
        {
          label: '跳转类型：',
          prop: 'none6',
          tag: {
            attr: { placeholder: '请输入跳转类型' },
          },
        },
      ],
    ],
  };

  onTableHandlerClick({ row, type }: { row: obj; type: string }) {
    if (type === 'detail') {
      console.log('%c查看', 'color:#40b883;font-weight:bold');
    }
  }
}
</script>
